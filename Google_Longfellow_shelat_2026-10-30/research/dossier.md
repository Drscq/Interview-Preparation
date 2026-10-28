# Longfellow ZK / abhi shelat / Matteo Frigo — Verified Fact Dossier

Compiled 2026-10-28 for the call on Fri 2026-10-30 11:00 ET.

Ground rules used here:
- Every fact has a URL and, where possible, a verbatim quote (quotes are copied from the primary document text, pdftotext-extracted for PDFs).
- **DERIVED** = my own arithmetic from a cited spec. It is not a published number.
- **UNVERIFIED** = I could not confirm it from a primary source.
- Section 0 lists the findings that change the pitch. Read it first.

---

## 0. Findings that change the pitch (read first)

1. **Google already has an ML-DSA verification circuit in Longfellow.** The repo holds `lib/circuits/tests/pq/ml_dsa/` with ML-DSA-44 and ML-DSA-65 parameter sets. Per `gh api` commit history, the files first landed 2026-02-27 and were last touched 2026-07-13. Source: https://github.com/longfellow-zk/longfellow-zk/tree/main/lib/circuits/tests/pq/ml_dsa
   - Header comment of `ml_dsa_circuit.h`: "This class defines the constraints and witness validation logic required to verify an ML-DSA (FIPS 204) signature within a Zero-Knowledge proof system."
   - The pipeline in the same header: "1. SampleInBall: Reconstructs the challenge polynomial 'c' from 'c_tilde' using a constrained Fisher-Yates shuffle over SHAKE256 output. 2. Matrix-Vector Multiplication: Computes w'_approx = A*z - c*t1*2^d in the NTT domain. 3. UseHint ... 'Interval Shifting' ... 4. Range Checks: Enforces strict infinity norm bounds on 'z' ... 5. Hash Commitment: Encodes w'_1 and asserts that SHAKE256(mu || encoded_w'_1) == c_tilde."
   - The field is `Fp24_6`, defined in `lib/algebra/fp24_6.h` as "Sextic extensions of Fp24(m), represented as P(x) mod (x^6 - beta)". The test instantiates it over the ML-DSA modulus: `Field6(ml_dsa::Fq(), kBeta)` with `kBeta = 7`, and `ml_dsa_shared.h` has "q: 2^23 - 2^13 + 1 = 8380417." So the lattice arithmetic is native mod q, lifted to F_{q^6} for soundness.
   - The SHA-3 circuit is labelled "!!!!! DO NOT USE IN PRODUCTION !!!!! This SHA3 circuit is an experimental implementation for research purposes." It "slices" (commits the state) every 6 rounds: `sha3_slicing.h`, `period = 6`.
   - `lib/circuits/tests/README.md`: "experimental circuits that are intended to provide performance benchmarks for interesting theorem statements. These circuits have not been carefully vetted ... should not be used in a production use case."
   - In the test (`make_ml_dsa_circuit`), the public key `(A_hat, nttt1, tr)` is input *before* `Q.private_input()`, so it is public. The signature, the witness and `mu` are private. **ExpandA and `tr = H(pk)` are therefore not computed in-circuit**: `A_hat` is supplied already expanded.
2. **They have presented it publicly.** At IETF 125 (2026-03-19) and IETF 126 (2026-07-22), Frigo and shelat showed "Proof of Possession of ML-DSA-44 Sig — 'Exists (r,s) such that Verify_Internal( pk=(Ahat,t1,tr) sig, mu) = 1.' BM_MLDSA44SigProver/1 858 ms (Mac M4)." https://datatracker.ietf.org/meeting/126/materials/slides-126-cfrg-longfellow-zk-00 (slide 15). The IETF 126 deck is titled **"libZK: PQ zero knowledge"**.
3. **shelat in the IETF 126 CFRG minutes:** "We have done formal verif for ECDSA. We have proven that our circuit is equivalent to the spec. ML-DSA is more difficult to do." and "there are at leats [sic] 3 other groups that are developping circuits". https://datatracker.ietf.org/doc/minutes-126-cfrg-202607220700/
4. **Three competing papers appeared in the past two weeks. All of them benchmark against Longfellow's ML-DSA circuit.**
   - **GordieHowe** (Sharp & Grubbs, U. Michigan; ePrint 2026/2615, received 2026-10-23, revised 2026-10-25): "With at least 116 bits against quantum adversaries, GordieHowe proves knowledge of an ML-DSA-44 signature on a private message in 87.3 ms with a 549 KiB proof, 70.2× faster and 29% smaller than an optimized Longfellow circuit." https://eprint.iacr.org/2026/2615
   - **Nowhere Man** (NTT; ePrint 2026/2472, 2026-10-14; accepted at IEEE S&P 2027): "just verifying one of them with respect to a (known) public key takes 850ms, making the resulting proof system impractical for real-world applications. The main source of inefficiency is that Longfellow takes the full ML-DSA verification algorithm as input and proves its correct execution in zero-knowledge, something that requires several calls to SHAKE". https://eprint.iacr.org/2026/2472
   - **Baum–Beckmann edaBitE** (DTU; ePrint 2026/2473, 2026-10-14): "the first blind signature whose issuer runs a NIST-standardized post-quantum signature scheme unmodified ... A blind signature is about 1 MB and takes under a second to produce". https://eprint.iacr.org/2026/2473
5. **Implication for the hook** (my reading, not a source claim): the observation that "ML-DSA-in-ZK is mostly a Keccak problem" is consistent with every one of these sources. It is not new to them, though. The open problems these sources point at are:
   - (a) hidden issuer/device public key, which forces ExpandA and `tr` into the circuit;
   - (b) the cost of the cross-field MAC that links the hashing field and the q-field;
   - (c) batching Keccak rounds instead of the single-copy GKR layout;
   - (d) QROM-concrete parameters;
   - (e) formal verification of the ML-DSA circuit, which shelat called "more difficult".

---

## 1. Longfellow ZK

### 1.1 The paper (confirmed)
- Title and authors: "Anonymous credentials from ECDSA", Matteo Frigo (Google) and abhi shelat (Google), Cryptology ePrint Archive 2024/2010. https://eprint.iacr.org/2024/2010
- ePrint history: "2026-04-27: last of 2 revisions / 2024-12-12: received". The versions page lists PDF updates 20241212, 20241220 and 20260427. https://eprint.iacr.org/archive/versions/2024/2010
- Venue: "Version that appears in Vol 3, Issue 1 in Communications in Cryptology." / "A major revision of an IACR publication in CIC 2026". The CiC paper is https://cic.iacr.org/p/3/1/7 (DOI https://doi.org/10.62056/a3qjmpgxq), "Received: 2025-10-08 Accepted: 2025-12-02". The PDF lists both authors at "Google, Cambridge, MA, USA".
- The headline numbers changed between versions:
  - Dec 2024 version: "Our proofs for ECDSA can be generated in 60ms. ... in 1.2 seconds on mobile devices depending on the credential size." https://eprint.iacr.org/archive/2024/2010/20241220:221050
  - Current version: "Our proofs for ECDSA can be generated in as little as ≈20ms. When incorporated into a fully standardized identity protocol such as the ISO MDOC standard, our system can generate a zero-knowledge proof for the MDOC presentation flow in a few hundred ms on mobile devices." https://eprint.iacr.org/2024/2010
- Assumption (abstract): "Furthermore, our proof system itself only relies on SHA-256 as its complexity assumption."
- Motivation (abstract): "standardized curves such as P256 use finite fields which do not support efficient number theoretic transforms. We overcome this bottleneck by designing a ZK proof system around sumcheck and the Ligero argument system, by designing efficient methods for Reed-Solomon encoding over the required fields, and by designing specialized circuits for ECDSA."

### 1.2 What statement is proven (mdoc / ISO 18013-5)
Source for this subsection: CiC PDF §6.2, Alg. 10, https://cic.iacr.org/p/3/1/7
- "ISO standard 18013-5 [18021] specifies a digital identity format that is used in mobile driver licenses and national identity formats."
- Alg. 10 "MDOC Verification". Public x = (PK_II, attr, Z, tr, time). The witness includes "a 2551 byte string MSO". The relations checked are:
  - `e1 = SHA256(MSO[0:len])`
  - `h2 = MSO[valueDigests][org.iso.18013.5.1][X]`
  - `h2 = SHA256(nonce, attr, Z)`
  - device key `(pkdx, pkdy) = MSO[deviceKeyInfo][deviceKey][−2,−3]`
  - validity `tstart < tnow < tend`
  - `true = p256.verify((r1,s1), e1, PK_II)` (issuer)
  - `true = p256.verify((r2,s2), H(tr||hdr), (pkdx,pkdy))` (device binding, with the device public key hidden)
- Why the device key must be hidden: "this requirement does not work when pk must be hidden in the witness commitment, e.g., when verifying the device-binding for mdoc signatures in which the device public key must be private." (§5.3)
- The privacy problem it fixes: "A more serious flaw enables the issuer of the MDOC to collaborate with the relying party in order to identity users across sessions. This flaw has delayed the deployment of MDOC for some applications." (§6.2)
- The ECDSA circuit is verified without inverses. Alg. 4: "Verify id = G · e + Q · r − R · s". Table 1 totals: "Total 12 [depth] 24,477 [quads] 49,646 [terms] 1,038 [inputs]".
- The repo README also mentions other formats: "legacy identity verification standards such as the ISO MDOC standard, the JWT standard, and W3 Verifiable Credentials." https://github.com/longfellow-zk/longfellow-zk

### 1.3 Proof-system architecture (Ligero commitment + sumcheck)
- The draft's one-paragraph version: "The scheme is constructed from two components: the first is the Ligero scheme, which provides a cryptographic commitment scheme that supports an efficient ZK argument system that enables proving linear and quadratic constraints on the committed witness, and the second is a public-coin interactive protocol (IP) for producing an argument that C(x,w)=0 ... The overall scheme works by having the Prover commit to the witness w as well as a pad used to commit the transcript of the IP, then to run the IP with the verifier in a way that produces a commitment to the transcript of the IP, and finally, by running the Ligero proof system to prove that the transcript in the commitment induces the IP verifier to accept." https://datatracker.ietf.org/doc/draft-irtf-cfrg-longfellow/ (§1.1)
- Slide version (IETF 126, slide 7): "Follows the oldest ZK 'recipe' from BGGHKMR88. Run an IP → Transcript. Commit to Transcript → Com. ZK for 'Com contains T and IP-verifier(T)=1'. IP: Sumcheck (Prover runs in O(C) time.) Commit/ZK: Ligero (IOP, only uses SHA256.)" https://datatracker.ietf.org/meeting/126/materials/slides-126-cfrg-longfellow-zk-00
- Protocol 2.5 in the paper, steps 2–6: "P samples pad ← F^ℓ and sets w′ ← (w, pad) as the witness. ... P computes com ← LigeroCommit(w′) ... Whenever Verify_P instructs the prover to send the ith message mi ∈ F to V, P sends t′i ← mi + padi ... Define the circuit C′(x, w′, T′) to first decrypt the transcript ... and then run checkV ... P and V run LigeroProve(C′ ...)". https://cic.iacr.org/p/3/1/7
- Why this is cheaper than plain Ligero: "The prover in line 2 commits to |w| + ℓ elements, which can be substantially smaller than the |C| elements that the Ligero prover must commit to if it is applied directly to C." Also: "Our formulation only requires Ligero to handle d quadratic constraints where d is the depth of the original circuit (typically a small integer < 20), whereas the original circuit may contain thousands of multiplications." (§2.3)
- Gate model: "we support only one (degree-2) 'gate' which computes the generic quadratic form: Vj[i] = Σ Qj[i, ℓ, r] · Vj+1[ℓ] · Vj+1[r] ... We call Q the quad". Another line from the same passage: "this quad form approach reduces the depth of the standard elliptic curve addition formula from 5 to 3." (§2.1)
- Two-field theorems are linked by a MAC: "we design a witness consistency protocol in which witnesses that are committed in two different ZK proofs over different fields can be proven to be consistent with high probability. Our approach is to include the evaluation of a random MAC on the witness". (§1)
- The draft's description of encrypted sumcheck: "Instead of running the sumcheck verifier directly, a commitment scheme is used to hide the one-time pad, and the sumcheck verifier is translated into a sequence of linear and quadratic constraints on the inputs and the one-time pad." (§5)
- Fiat–Shamir in the draft: "In the SHA256-AES256CTR ciphersuite ... derives a 32-byte key SEED = H(tr) using SHA-256. This seed initializes a Fiat-Shamir Pseudorandom Function (FsPrf) running AES-256 in counter mode." (§3.1)

### 1.4 Fields, Reed–Solomon, FFT
- P-256 field and NTT (§1): "Standardized curves for ECDSA, such as the NIST P256 curve, specify finite fields that do not have the roots of unity needed for efficient NTT algorithms. Consequently, prior work emulates the arithmetic of the P256 field ... this overhead amounts to 40–100x ... we design an NTT in a quadratic field extension which allows us to perform NTTs (in fields that do not have proper roots of unity) at only ≈ 1.5x the cost". https://cic.iacr.org/p/3/1/7
- Reed–Solomon over arithmetic progressions (§1): "Instead of defining the Reed-Solomon code as a polynomial interpolation over the roots of unity, we define the code as an interpolation over an arithmetic sequence of evaluation points in the base field. We present a method to perform the interpolation over these points using a linear convolution."
- GF(2^128) for SHA-256 (§1): "Following the work of Diamond and Posen [DP25, DP24], we confirm the speedup possible with using the extension field GF(2^k) to perform the sumcheck. ... we use the family of additive FFTs [LCH14]. Specifically, we develop a new bidirectional truncated additive FFT".
- GF(2^128) polynomial and subfield (§3.3): "We implement GF(2^128) as GF(2)[x]/(Q(x)) where Q(x) = x^128 + x^7 + x^2 + x + 1 ... we choose GF(2^16) as the subfield of GF(2^128) ... This allows us to encode elements in our commitment scheme with 16-bits instead of 128."
- The draft's field table (§7.2): "p256 0x01 ... GF(2^128) 0x04, GF(2^16) 0x05 ... The p256 prime ... is the base field used by the NIST P256 elliptic curve." https://datatracker.ietf.org/doc/draft-irtf-cfrg-longfellow/
- Parameters (paper §5): "We use SHA256 to implement the collision-resistant hash function, and the random oracle, resulting in a 128-bit computational security parameter. For our Ligero commitment, we use a rate 1/7 code and open 132 columns, which corresponds to roughly 110 bits of security."
- Parameters (draft §5.1): "(p256, 132, 7) / (GF(2^128), 132, 7)" are profiles "analyzed to provide at least 115 bits of security".
- Draft nits I noticed, with low confidence that they matter. Only raise them if invited. In draft-irtf-cfrg-longfellow-00:
  - Test vector B.3.2 is titled "s-gonal Circuit over P-256 (Field ID 2)" and says "P-256 Scalar Field (Field ID 2, order p = 1157...53951)". That prime is the P-256 *base* field, and the table assigns p256 = 0x01 (0x02 = p384).
  - §2 cites "RFC 6919", which is the April-1st "Further Key Words" RFC.

### 1.5 Performance numbers (paper, single thread)
All from https://cic.iacr.org/p/3/1/7.
- Hardware (§5): "an amd_64 machine, a cloud x86_64 machine, a Pixel 9 phone, an iPhone 15 plus, and an Apple M4 Macbook Air."
- ECDSA, Table 11, n=1 signature (Total ZK prover / Verifier):

  | Platform | Prover (ms) | Verifier (ms) |
  |---|---|---|
  | amd64 | 29.0 | 18.8 |
  | Pixel 9 | 53.3 | 33.5 |
  | iPhone 15+ | 30.7 | 20.8 |
  | M4 Air | 20.4 | 14.3 |

  Prose: "a zero knowledge proof of possession of a signature for ECDSA—which requires roughly 20ms to 50ms depending on the hardware—is within a small factor of performance for a basic BBS+ proof of possesion".
- MDOC age-over-18, Table 13, "MSO of at most 2231 bytes" (Prover / Verifier):

  | Platform | Prover (ms) | Verifier (ms) |
  |---|---|---|
  | amd_64 | 526 | 252 |
  | cloud | 589 | 286 |
  | Pixel 9 | 931 | 508 |
  | iPhone 15+ | 437 | 229 |
  | Mac M4 Air | 294 | 142 |

  Also: "The most expensive part of the proof generation concerns the SHA256 hash of the MSO."
- Toy credential, Table 12: "amd64 290 [ms] 291 [Proof size (kb)]". The paper gives no MDOC proof size in Table 13. Third-party measurement: GordieHowe reports Longfellow's ECDSA mDL at "657.3 [P ms] 318.6 [V ms] 352.0 [KiB]" (Table 4, ROM). https://eprint.iacr.org/2026/2615
- SHA-256 over GF(2^128), Table 7, Pixel 9 "Total Prover ZK": n=1 block 22.0 ms; n=32 blocks 426 ms.
- Comparisons:
  - "our system is at least roughly 20x faster [than pure Ligero] for n = 1, 2, or 4 block messages".
  - Woo et al.: "their prover runs in 900ms, or at least 25X slower than ours".
  - circom-ecdsa: "The trusted parameter is 973MB, and proof generation required 140,000ms".
- Newer numbers (IETF 125/126 slide 14): "BM_ECDSAZKProver/1 16.7 ms ... BM_ECDSAZKVerifier/1 10.3 ms (Mac M4)". Slide 13: "The scheme's performance has improved by >20% due to algorithmic improvements in Reed-Solomon encoding and Sumcheck." https://datatracker.ietf.org/meeting/126/materials/slides-126-cfrg-longfellow-zk-00
- Implementation (§5): "roughly 20,000 lines of C++ code". Slide 10 (IETF 126): "Rewritten in rust. Parts formalized in lean and verus."

### 1.6 Deployment and timeline
- **2025-04-29**, Google Wallet blog (Alan Stapelberg): "we are integrating Zero Knowledge Proof (ZKP) technology into Google Wallet, further ensuring there is no way to link the age back to your identity ... partner with apps like Bumble ... we will also open source our ZKP technology to other wallets and online services." https://blog.google/products-and-platforms/platforms/google-pay/google-wallet-age-identity-verifications/
- **2025-04-29**: GitHub repo created. `gh api repos/longfellow-zk/longfellow-zk` gives `created_at: 2025-04-29T12:41:54Z`. `google/longfellow-zk` now redirects to `longfellow-zk/longfellow-zk`.
- **2025-07-03**, open-source announcement (Alan Stapelberg): "Opening up 'Zero-Knowledge Proof' technology to promote privacy in age assurance". It mentions the EU: "The European Union's eIDAS Regulation set to take effect in 2026 encourages Member States to integrate privacy-enhancing technologies like ZKP into the European Digital Identity Wallet". https://blog.google/innovation-and-ai/technology/safety-security/opening-up-zero-knowledge-proof-technology-to-promote-privacy-in-age-assurance/
- **2025-11 (IETF 124 DISPATCH slides)**: "Deployed in Google Wallet, used to authenticate to Bumble" and "zk-cred-longfellow, Rust implementation by ISRG underway". https://datatracker.ietf.org/meeting/124/materials/slides-124-dispatch-longfellow-zero-knowledge-credentials-00
- shelat's homepage: "My current work has focused on developing the Longfellow ZK protocol and deploying it in the Google Wallet. ... My current interests are to formally verify this protocol's security proof, as well as its implementation." https://shelat.khoury.northeastern.edu/
- EU age verification, quoted on the IETF slides: "A next version of the Technical Specifications for Age Verification Solutions will include as an experimental feature the Zero-Knowledge Proof (ZKP) solution described in the paper 'Matteo Frigo and abhi shelat, Anonymous credentials from ECDSA' ... This zkSNARK-based solution was selected through a process where several alternatives were evaluated." The underlying page is https://ageverification.dev/Technical%20Specification/architecture-and-technical-specifications/#71-zero-knowledge-proofs (I read it as quoted on the slides, not directly).
- Security reviews: https://github.com/longfellow-zk/longfellow-zk/blob/main/docs/content/en/docs/reviews.md
  - Trail of Bits report dated 2025-08-18.
  - ISRG found an under-constrained MDOC circuit bug "patched on October 17th", fixed in v0.8.4.
  - "A group of 4 academic experts ... assembled by Ligero" wrote a report dated 2025-12-15. GordieHowe cites it as Cascudo, Hazay, Venkitasubramaniam, Yogev [CHVY25].
- Formal verification: the README says "116-bit T-security for V1 and a 117-bit extraction bound for V2". The formal README says "Version 7 uses Ligero V1; version 8 uses Polygero." It also states: "These results do not constitute source-level verification of the Rust or C++ implementation; full V2 joint-view zero knowledge remains open." https://github.com/longfellow-zk/longfellow-zk/blob/main/formal/README.md
- **IETF standardization**:
  - draft-google-cfrg-libzk-00 was dated 3 March 2025; -03 was dated 23 September 2026.
  - It was replaced by **draft-irtf-cfrg-longfellow-00**, dated 19 October 2026. Datatracker status: "Active RG Document", "cfrg RG", Intended status Informational. https://datatracker.ietf.org/doc/draft-irtf-cfrg-longfellow/
  - So CFRG adopted it in October 2026. I did not find the adoption-call email itself.

### 1.7 The September 2026 donation to the PQCA, and what it says about post-quantum
- Blog post: "Google, the Linux Foundation building a more private digital world". Dated **2026-09-02** (`article:published_time` 2026-09-02T16:00:00Z). Byline **"Abhi Shelat, Researcher, Google Cloud"**. https://blog.google/products-and-platforms/platforms/google-pay/zero-knowledge-proof-library-linux-foundation/
- Verbatim: "We're taking another step toward a more private digital world by donating our Longfellow Zero-Knowledge Proof (ZKP) library, which we open-sourced last year, to the Post-Quantum Cryptography Alliance, a foundation under the Linux Foundation Europe."
- Verbatim, the only post-quantum claim in the post: "By transferring this cryptographic library to the Linux Foundation Europe, we're establishing vendor-neutral, open stewardship so the global community can trust, audit, and adopt it as a quantum-safe standard for digital identity applications."
- The post says nothing about ML-DSA, about ECDSA being quantum-vulnerable, or about Google Wallet by name.
- The PQCA now lists Longfellow as a project next to Open Quantum Safe, PQ Code Package and CBOMkit: https://pqca.org/projects/longfellow/

### 1.8 Is the proof system post-quantum while the ECDSA statement is not? Their own wording
- **The proof system is hash-based and transparent.**
  - IETF 126 slide 5: "Goal: specify and analyze a transparent, hash-based zero-knowledge argument system. Important use case: for proving statements about credentials signed with legacy algorithms (ECDSA, SHA-256)".
  - Slide 4: "Deploying (new) ECC crypto in 2026 is not responsible."
  - Slide 3: "Feedback from both the EU and organizations (e.g., Apple, Google) indicates a desire to avoid deploying new ECC-based schemes."
  - https://datatracker.ietf.org/meeting/126/materials/slides-126-cfrg-longfellow-zk-00
- **The paper's formal hook for quantum.** Theorem 4 restates Ligero [AHIV23, 5.4] for the BCS16-compiled protocol: "Adaptive soundness error ϵQFS(C,T,λ) = Θ(T·ϵFS(x)) and adaptive knowledge error ... against T − O(q(C) log(len(C)))-query quantum provers". https://cic.iacr.org/p/3/1/7 (§2.2)
- **The paper relies on the random oracle model**: "In practice, we instantiate our protocols in a non-interactive manner, and thus rely on the random oracle model for the soundness and zero-knowledge properties." (§1)
- **The statement is not post-quantum.** I found no Frigo–shelat sentence saying explicitly "ECDSA is broken by quantum computers, so the credential is not PQ". Their framing is "legacy algorithms (ECDSA, SHA-256)". The plainest third-party wording is GordieHowe's: "a proof about such a signature must also be sound against quantum adversaries. Otherwise a quantum prover could present a credential that it could not forge directly." https://eprint.iacr.org/2026/2615
- **Critique to be aware of** (GordieHowe on Longfellow): "Its security analyses are classical and give no parameters for quantum adversaries." GordieHowe also writes: "One of Longfellow's authors writes that it is unclear how to formulate the round-by-round argument for such forked transcripts, since the parallel subprotocols may have different numbers of rounds [as26]". It cites a shelat comment on longfellow-zk PR #190.

---

## 2. Polygero (ePrint 2026/2481)
- Matteo Frigo (Google), abhi shelat (Google, Northeastern). "Polygero: Proximity Testing From Polynomial Challenges". History: "2026-10-14: received / 2026-10-15: approved". Keywords: zero knowledge, succinct proof. https://eprint.iacr.org/2026/2481
- What it is (abstract): "We present a new proximity test for Reed–Solomon codes that admits a higher-agreement regime with soundness approaching the field's bit length."
- Key idea (abstract): "Our main insight is to instead use a low-degree polynomial challenge for each codeword. We prove that the low-dimensional spaces generated by polynomial challenges become maximum distance separable (MDS) after deleting a few coordinates".
- Proof technique (abstract): "an elementary counting proof ... We do not need the Polishchuk–Spielman lemma or Guruswami–Sudan decoding."
- Recursion (abstract): "Through recursion, Polygero produces proofs with a number of field elements logarithmic in the witness size, independently of the number of linear constraints. It does not require roots of unity in the finite field or out-of-domain sampling."
- Lean (abstract): "The soundness analysis, including the extractor and the recursive composition, and every reported parameter schedule are machine-checked in Lean 4."
- Mechanism (§1): "Instead of a scalar, the verifier sends a polynomial challenge: a polynomial Br of degree at most s for each committed word wr ... Scalar challenges are the case s = 0."
- Headline security (§1): "we are unaware of any previous result that is able to achieve more than 120 bits of security in a 128-bit field, whereas our approach can achieve 127 bits".
- Example parameters (§1): "over a field with 2^128 elements, a code of length 25724 and rate about 1/16, with s = 74 and 64 opened columns, has per-level error at most 2^−120".
- Asymptotics (§1): "For soundness error 2^−λ, a witness with N values and M multiplication gates then has proofs of O(λ(1 + log(N + M + 1))) field elements".
- Design choice tied to Longfellow (§2): "as shown by the Longfellow [Fs24] scheme, the most efficient use of an IOP requires only a small number of quadratic constraints, and so we optimize for that case."
- Numbers, Table 1. Prover-to-verifier proof bytes over a 2^128 field at λ=120, ZK, recursive:
  - 16K linear entries: 92,000 B
  - 1M: 195,520 B
  - 16M: 282,288 B

  Single invocation at the same λ, ZK, 1M: 678,624 B. Caption: "Every entry is exported from an exact Lean certificate."
- Scope caveat (§1): "oracles are ideal, and the binding of the commitment and the Fiat–Shamir transform are outside the analysis."
- AI statement (§1): "we have extensively used Gemini, Claude, and OpenAI to verify our result by producing Lean proofs of main theorems".
- Deployment link: the Longfellow formal README says "Version 7 uses Ligero V1; version 8 uses Polygero." https://github.com/longfellow-zk/longfellow-zk/blob/main/formal/README.md

---

## 3. Background primitives

### 3.1 Ligero (Ames, Hazay, Ishai, Venkitasubramaniam; CCS 2017)
- Full version: ePrint 2022/1608, "Published elsewhere. CCS 2017". Journal version: Des. Codes Cryptogr. 91(11):3379–3424, 2023 (as cited in the Longfellow paper). Polygero cites the CCS paper at "pages 2087–2104". https://eprint.iacr.org/2022/1608
- Abstract quotes:
  - "a simple zero-knowledge argument protocol for NP whose communication complexity is proportional to the square-root of the verification circuit size. The protocol can be based on any collision-resistant hash function."
  - "obtained by applying an optimized version of the general transformation of Ishai et al. (STOC 2007) [MPC-in-the-head] to a variant of the protocol for secure multiparty computation of Damgård and Ishai (CRYPTO 2006). It can be viewed as a simple zero-knowledge interactive PCP based on 'interleaved' Reed-Solomon codes."
  - "for verifying a SHA-256 preimage with 2^−40 soundness error, the communication complexity is roughly 35KB."
  - Keywords include "post-quantum".
- Frigo–shelat's one-line summary (CiC §2.2): "The Ligero [AHIV23] protocol is a zero-knowledge interactive PCP that represents an optimized instantiation of the 'MPC-in-the-head' technique. The proof size is roughly square-root in the size of the circuit, and the proof system only assumes the existence of a cryptographic hash function."
- Textbook: Thaler, Proofs, Arguments, and Zero-Knowledge, §10.5 "Ligero and Brakedown Polynomial Commitments". https://people.cs.georgetown.edu/jthaler/ProofsArgsAndZK.pdf

### 3.2 Sumcheck (Lund–Fortnow–Karloff–Nisan)
Source: Thaler, PAZK (version dated July 18, 2023), Chapter 4, §4.1, p. 33. https://people.cs.georgetown.edu/jthaler/ProofsArgsAndZK.pdf
- "Suppose we are given a v-variate polynomial g defined over a finite field F. The purpose of the sum-check protocol is for prover to provide the verifier with the following sum: H := Σ_{b∈{0,1}^v} g(b1,...,bv)."
- Round 1: "P sends the univariate polynomial g1(X1) claimed to equal Σ g(X1, x2,...,xv). V checks that C1 = g1(0) + g1(1)".
- Costs: "the verifier's runtime will be O(v + [the cost to evaluate g at a single input in F^v])"; the prover needs "O(2^v)" evaluations.
- Soundness, Proposition 4.1: "completeness error δc = 0 and soundness error δs ≤ vd/|F|." The Longfellow paper reuses it as its Theorem 1 ("[Tha22, Proposition 4.1]").

### 3.3 GKR (Goldwasser–Kalai–Rothblum, STOC 2008)
Source: Thaler, PAZK §4.6, pp. 57–59 (same URL).
- "the GKR protocol starts with a claim about the values of the output gates of the circuit ... the first iteration uses a sum-check protocol to reduce this claim ... to a claim about the gate values at layer [i+1] (more specifically, to a claim about an evaluation of the multilinear extension of the gate values) ... Eventually, V is left with a claim about the inputs to the circuit, and V can check this claim without any help."
- Costs: "the costs to the verifier in the GKR protocol is O(d log S) ... P's time can even be made linear in S [CMT12, Tha13, XZZ+19]."
- How Longfellow uses it (CiC §2.1): "as first shown in [GKR08], sumcheck can be applied to the task of verifying that C(x) = 0 where C a layered circuit ... We present an optimized variant in this family of protocols that builds on observations by Cormode et al. [CMT12], Thaler [Tha13], and other follow-ups [WJB+17, WTas+18]."
- shelat co-authored those follow-ups: [WJB+17] "Full accounting for verifiable outsourcing" (CCS 2017) and [WTas+18] "Doubly-efficient zkSNARKs without trusted setup" (Hyrax, S&P 2018). Both appear in the Longfellow paper's reference list.

---

## 4. ML-DSA verification (FIPS 204, final, August 2024)
Source for all of this section: https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.204.pdf

### 4.1 Algorithms
- Alg. 3 `ML-DSA.Verify(pk, M, σ, ctx)` builds `M′ ← BytesToBits(IntegerToBytes(0,1) ∥ IntegerToBytes(|ctx|,1) ∥ ctx) ∥ M` and calls Alg. 8.
- Alg. 8 `ML-DSA.Verify_internal(pk, M′, σ)`, verbatim steps:
  1. `(ρ, t1) ← pkDecode(pk)` (Alg. 23)
  2. `(c̃, z, h) ← sigDecode(σ)` (Alg. 27). "if h = ⊥ then return false".
  5. `Â ← ExpandA(ρ)` (Alg. 32). "Â is generated and stored in NTT representation".
  6. `tr ← H(pk, 64)`
  7. `μ ← H(BytesToBits(tr)||M′, 64)`. "message representative that may optionally be computed in a different cryptographic module".
  8. `c ∈ Rq ← SampleInBall(c̃)` (Alg. 29)
  9. `w′Approx ← NTT^−1(Â ∘ NTT(z) − NTT(c) ∘ NTT(t1 · 2^d))` (Alg. 41/42 NTT and inverse; Alg. 44–48 arithmetic)
  10. `w′1 ← UseHint(h, w′Approx)` (Alg. 40)
  12. `c̃′ ← H(μ||w1Encode(w′1), λ/4)` (Alg. 28 w1Encode)
  13. `return [[ ||z||∞ < γ1 − β ]] and [[ c̃ = c̃′ ]]`
- Hash wrappers (§3.7): "H(str, ℓ) = SHAKE256(str, 8ℓ)" and "G(str, ℓ) = SHAKE128(str, 8ℓ)". Also: "RejNTTPoly and ExpandA make use of the more efficient XOF G, whereas the other three procedures use the XOF H."
- ExpandA, Alg. 32: for each (r,s), "ρ′ ← ρ||IntegerToBytes(s,1)||IntegerToBytes(r,1); Â[r,s] ← RejNTTPoly(ρ′)". RejNTTPoly (Alg. 30) squeezes 3 bytes per candidate coefficient via `CoeffFromThreeBytes`.
- SampleInBall, Alg. 29: "The procedure is based on the Fisher-Yates shuffle. H is applied to ρ, and the first 8 bytes of the output are used to choose the signs ... Subsequent bytes are used to choose the positions".
- Loop/XOF caps, Appendix C, Table 3 (minimum allowable XOF output bytes): "RejNTTPoly ... 894" and "SampleInBall ... 221". Text: "If an implementation bounds ... it shall not use a limit lower than those presented in Table 3."

### 4.2 Parameters (Table 1, Table 2)

| | ML-DSA-44 | ML-DSA-65 | ML-DSA-87 |
|---|---|---|---|
| q | 8380417 | 8380417 | 8380417 |
| (k, ℓ) | (4,4) | (6,5) | (8,7) |
| τ | 39 | 49 | 60 |
| λ | 128 | 192 | 256 |
| γ1 | 2^17 | 2^19 | 2^19 |
| γ2 | (q−1)/88 | (q−1)/32 | (q−1)/32 |
| η | 2 | 4 | 2 |
| β | 78 | 196 | 120 |
| ω | 80 | 55 | 75 |
| pk / sig bytes | 1312 / 2420 | 1952 / 3309 | 2592 / 4627 |
| Category | 2 | 3 | 5 |

Also fixed: n = 256 (degree of Rq), d = 13, ζ = 1753. The text gives "q = 2^23 − 2^13 + 1 = 8380417".

### 4.3 Hashing vs arithmetic, and Keccak-f[1600] counts
- **Published counts.** GordieHowe gives the ExpandA count for ML-DSA-44: "ExpandA makes 16 SHAKE128 calls of 6 blocks each, 96 Keccak permutations in all. A proof of possession under a public key leaves ExpandA and the hash tr of the public key to the verifier and proves 10 permutations for the remaining hashing required for verification." Their circuits cap RejNTTPoly at 1008 bytes (6×168). https://eprint.iacr.org/2026/2615 (§7.5.2)
- **DERIVED (my arithmetic).** Rates: SHAKE128 = 168 B/permutation, SHAKE256 = 136 B/permutation. Padding needs at least 1 byte. Message M is 32 B with empty ctx.

  | Item | ML-DSA-44 | ML-DSA-65 | ML-DSA-87 |
  |---|---|---|---|
  | ExpandA, honest typical (≥768 B per poly → 5 perms) | 16×5 = 80 | 30×5 = 150 | 56×5 = 280 |
  | ExpandA, at FIPS minimum cap (894 B → 6 perms) | 96 | 180 | 336 |
  | tr = H(pk) | 1312 B → 10 | 1952 B → 15 | 2592 B → 20 |
  | μ (64+2+32 = 98 B) | 1 | 1 | 1 |
  | SampleInBall (cap 221 B) | 1–2 | 1–2 | 1–2 |
  | c̃′ = H(μ‖w1Encode) | 64+768 = 832 B → 7 | 64+768 = 832 B → 7 | 64+1024 = 1088 B → 9 (exact multiple, padding adds a block) |
  | **Total, public pk** | ≈ 10 | ≈ 10 | ≈ 12 |
  | **Total, hidden pk, capped** | ≈ 116 | ≈ 205 | ≈ 368 |

  - The ML-DSA-44 numbers match GordieHowe's 96 + 10.
  - The repo's `kCPrimeTildeBlocks = 7` for both 44 and 65 matches the c̃′ row.
  - w1Encode sizes come from Alg. 28: (q−1)/(2γ2) = 44 → 6-bit coefficients for ML-DSA-44; = 16 → 4-bit for ML-DSA-65/87.
- **DERIVED Boolean size.** About 116 × 38,400 ≈ 4.45 M AND gates of Keccak-f for hidden-pk ML-DSA-44. About 10 × 38,400 = 384 K for public pk.
- **DERIVED NTT arithmetic in step 9.** NTT of z (ℓ polys), of c (1) and of t1·2^d (k polys), plus k inverse NTTs. For ML-DSA-44 that is 9 forward + 4 inverse = 13 NTTs of 256 points (8 layers × 128 butterflies each). Then k·ℓ·256 = 4096 pointwise products for Â∘NTT(z) and k·256 for c∘t1. All of it is native mod q.
- **Third-party evidence that the Boolean/hash side dominates:**
  - GordieHowe: "the MACs account for ... 51.0% for our Longfellow baseline for ML-DSA-44, which shares 52 chunks".
  - GordieHowe, on the hidden-key mDL: "The device's signature therefore accounts for 77% of the prover time and 45% of the proof." Also: "In the baseline, Â makes up 736 of the MAC's 920 chunks of 128 bits."
  - Nowhere Man: "requires several calls to SHAKE".
- **Gap**: I found no single *published* table of Keccak-f counts for all three ML-DSA parameter sets. The table above is DERIVED.

---

## 5. Prior and concurrent work on PQ signatures in ZK and PQ anonymous credentials

| Work | What it proves | Reported cost | URL |
|---|---|---|---|
| Policharla, Westerbaan, Faz-Hernández, Wood, "Post-Quantum Privacy Pass via Post-Quantum Anonymous Credentials" (ePrint 2023/414, 2023-03) | STARK proof of a *modified* Dilithium. "using zkDilithium, our proposal for a STARK-friendly variation on Dilithium2" | "token size (85–175KB) and generation time (0.3–5s) with a proof security level of 115 bits. Verification ... 20–30ms" | https://eprint.iacr.org/2023/414 |
| Cloudflare blog (2025-10-30) on the same line | Says the speedup came from swapping the hash | "replacing the hash function SHA3 in ML-DSA with the zero-knowledge friendly Poseidon" | https://blog.cloudflare.com/pq-anonymous-credentials/ |
| Jeudy, Roux-Langlois, Sanders, "Lattice Signature with Efficient Protocols, Application to Anonymous Credentials" (CRYPTO 2023; ePrint 2022/509) | Bespoke lattice SEP; "the first lattice-based anonymous credentials system" | "proof of message-signature possession ... less than 650 KB" | https://eprint.iacr.org/2022/509 |
| Bootle, Lyubashevsky, Nguyen, Sorniotti, "A Framework for Practical Anonymous Credentials from Lattices" (CRYPTO 2023; ePrint 2023/560) | Lattice ACs under a new family of assumptions | "proofs being as small as a few dozen kilobytes" | https://eprint.iacr.org/2023/560 |
| Argo, Güneysu, Jeudy, Land, Roux-Langlois, Sanders, "Practical Post-Quantum Signatures for Privacy" (CCS 2024; ePrint 2024/131) | Lattice SEP plus a full implementation of the LNP22 ZK framework | "credentials of less than 80 KB". Note (08/2025): "improved from 79.58 KB to 53.98 KB" | https://eprint.iacr.org/2024/131 |
| Aardal, Aranha, Boudgoust, Kolby, Takahashi, "Aggregating Falcon Signatures with LaBRADOR" (CRYPTO 2024; ePrint 2024/311) | Lattice SNARK (LaBRADOR) over Falcon signatures, for aggregation | concrete size estimates (not read in detail) | https://eprint.iacr.org/2024/311 |
| Baum & Beckmann, "edaBitE and Issuer-Hiding Blind Signatures from ML-DSA and VOLE-in-the-Head" (ePrint 2026/2473, 2026-10-14) | VOLEitH proof of knowledge of an *unmodified* ML-DSA signature, with a binary↔prime batch consistency check | "about 1 MB and takes under a second to produce and half a second to verify" | https://eprint.iacr.org/2026/2473 |
| Abou Haidar, Kikuchi, Perez-Kempner, Tiepelt, "Nowhere Man: Device Binding for Post-Quantum Anonymous Credentials" (ePrint 2026/2472; IEEE S&P 2027) | ML-DSA device binding, with verification split into bit-oriented and lattice parts, run on Longfellow | Table 3 (ML-DSA-65, Longfellow rate 4, nreq 128): Bridged total "562 ms 334 ms 1069 kB"; Monolithic "485 ms 289 ms 852 kB"; "Longfellow's test PoP [56] 923 ms 499 ms 614 kB" | https://eprint.iacr.org/2026/2472 |
| Sharp & Grubbs, "Faster and Smaller Anonymous Credentials from Standardized Signatures" = GordieHowe (ePrint 2026/2615, 2026-10-23) | Multi-field language plus Lean-certified compiler. ML-DSA-44 PoP with QROM parameters | ML-DSA-44 QROM: "87.3 ms with a 549 KiB proof" (4 cores). Their Longfellow baseline: "6129.6 [ms] 3268.2 [ms] 777.8 [KiB]". ROM: "62.0 ms ... 213.5 KiB proof" vs baseline "2026.0 ms ... 380.7 KiB". ECDSA mDL "64.8 ms with a 276 KiB proof, 10.1× faster ... than Google's Longfellow" | https://eprint.iacr.org/2026/2615 |
| Kaviani & Setty, "Vega" (IEEE S&P 2026; ePrint 2025/2094) | Classical (non-PQ) folding and lookups over existing credentials | "for a 1920-byte credential, Vega achieves 92 ms proving time, 23 ms verification time, 108 kB proofs" | https://eprint.iacr.org/2025/2094 |

Notes:
- GordieHowe explains why its Longfellow baseline differs from Google's test circuit: "Longfellow's test implementation places the entire ML-DSA computation over Fq6 ... including the hashing, and it does not use subfield rows ... Longfellow's test implementation takes the message representative µ as a private input and does not check that it is computed from the message." This independently confirms what I read in the repo (§0).
- Shelat's IETF 125 slide on Vega: "Uses folding, which requires a homomorphic commitment, and does not support a traditional poly-time extraction algorithm in the security proof." Slide 16 of https://datatracker.ietf.org/meeting/125/materials/slides-125-cfrg-longfellow-zk-00

**Keccak-f[1600] cost as a Boolean circuit.** Bristol Fashion MPC circuits (Nigel Smart et al.), row "Keccak-f": "No. ANDs 38400, No. XORs 115200, No. INVs 38486". For comparison, SHA-256 compression: "22573 ANDs, 110644 XORs, 1856 INVs, depth 1607". https://nigelsmart.github.io/MPC-Circuits/
- DERIVED cross-check: χ is the only nonlinear step, with 5 ANDs per 5-bit row × 320 rows = 1600 per round, × 24 rounds = 38,400.

**Keccak in ZK, measured.**
- GordieHowe: "proves knowledge of a 1 KiB SHA3-256 preimage in 5.0 ms with a 60 KiB proof" (4 cores).
- GordieHowe on batching: "the batched permutations then have a 17.1× faster prover and a 20.3× faster verifier than a GKR circuit that commits the state every sixth round". The every-sixth-round circuit is Longfellow's `sha3_slicing.h` design.
- https://eprint.iacr.org/2026/2615

---

## 6. People

### 6.1 abhi shelat
- Current Google role: the 2026-09-02 blog byline is "Abhi Shelat, Researcher, Google Cloud". Polygero (Oct 2026) lists "Google, Northeastern". His homepage still says "I am a Professor at the Khoury College of Computer Sciences at Northeastern." https://shelat.khoury.northeastern.edu/
- Bio: "My PhD thesis, supervised by Silvio Micali, studied three aspects of non-interactive zero-knowledge proofs. After PhD, I worked at the Zurich IBM Research Lab. In Fall 2007, I joined the faculty in the CS department at U. of Virginia ... In 2016, I moved to Northeastern University". https://shelat.khoury.northeastern.edu/bio/
- **FLORAM.** Doerner & shelat, "Scaling ORAM for Secure Computation", ACM CCS 2017 (DOI 10.1145/3133956.3133967). https://eprint.iacr.org/2017/827
  - "our Distributed ORAM is derived from the new Function Secret Sharing scheme introduced by Boyle, Gilboa and Ishai. This significantly reduces the amount of secure computation required to implement an ORAM access, albeit at the cost of O(n) efficient local memory operations."
  - "despite its poor O(n) asymptotic complexity, it still outperforms the fastest previously known constructions, Circuit ORAM and Square-root ORAM, for datasets that are 32 KiB or larger".
  - "We are able to instantiate ORAMs that hold 2^34 bytes".
- **DKLs authorship (verified).**
  - Doerner, Kondi, Lee, shelat, "Secure Two-party Threshold ECDSA from ECDSA Assumptions", IEEE S&P 2018. https://eprint.iacr.org/2018/499
    - "two parties can jointly sign a message in just over three milliseconds".
    - Updated note: "The authors consider this work to be fully subsumed by the more recent three-round protocol of Doerner, Kondi, Lee, and shelat (2023)".
  - Same four authors, "Threshold ECDSA from ECDSA Assumptions: The Multiparty Case", IEEE S&P 2019. https://eprint.iacr.org/2019/523
  - Same four authors, "Threshold ECDSA in Three Rounds", IEEE S&P 2024. https://eprint.iacr.org/2023/765
  - His homepage also lists "Threshold BBS+ Signatures for Distributed Anonymous Credential Issuance".
- **Sumcheck/GKR lineage.** He co-authored Hyrax ("Doubly-efficient zkSNARKs without trusted setup", S&P 2018) and "Full accounting for verifiable outsourcing" (CCS 2017). Both are cited in the Longfellow paper as the basis for its sumcheck. https://cic.iacr.org/p/3/1/7 (references)

### 6.2 Matteo Frigo
- Affiliation: "Google, Cambridge, MA, USA" (CiC author info, https://cic.iacr.org/p/3/1/7). Longfellow "is named after the bridge outside the Google Cambridge office." https://github.com/longfellow-zk/longfellow-zk
- Longfellow role: first author of the paper, the IETF draft and Polygero, and IETF CFRG presenter.
- **FFTW.**
  - The canonical reference on fftw.org: "Matteo Frigo and Steven G. Johnson, 'The Design and Implementation of FFTW3,' Proceedings of the IEEE 93 (2), 216–231 (2005)." https://www.fftw.org/
  - NA Digest, 30 Jul 1999: "the 1999 Wilkinson Prize for Numerical Software has been won by Matteo Frigo and Steven Johnson of MIT for FFTW." https://netlib.org/na-digest-html/99/v99n31.html
- **Cilk.** "The Implementation of the Cilk-5 Multithreaded Language by Matteo Frigo, Charles E. Leiserson, and Keith H. Randall. 1998 ACM SIGPLAN Conference on Programming Language ... 2008 Most Influential PLDI Paper Award (for 1998)". From the abstract: "this 'work-first' principle". https://www.fftw.org/~athena/abstracts/abstract17.html
- Why FFTW matters here (my interpretation): Longfellow's core engineering is NTTs over fields without roots of unity, additive FFTs over GF(2^128), and RS encoding via convolution. That is FFT work.

---

## 7. Talks, standards and community traces (primary links)
- RWC 2025: "Anonymous Credentials from ECDSA (RWC 2025)", IACR YouTube. shelat's homepage calls it a "15m talk ... So rushed, and so much to say." https://www.youtube.com/watch?v=G52iNwkrF8E
- Simons Institute, Aug 2025: "The modern anonymous credential (how ZK landed in Google Wallet)". https://www.youtube.com/watch?v=S0sSTMDO2z8
- IETF 124 (Montreal, 2025-11-06), CFRG deck "libZK: a zero knowledge proof library": https://datatracker.ietf.org/meeting/124/materials/slides-124-cfrg-longfellow-zk-01
- IETF 124 DISPATCH/SECDISPATCH deck: https://datatracker.ietf.org/meeting/124/materials/slides-124-dispatch-longfellow-zero-knowledge-credentials-00
- IETF 125 (Shenzhen, 2026-03-19): first public ML-DSA-44 number (858 ms) and a PQ bitcoin-address example ("BM_BitaddrProver/1 87 ms"). https://datatracker.ietf.org/meeting/125/materials/slides-125-cfrg-longfellow-zk-00
- IETF 126 (Vienna, 2026-07-22), "libZK: PQ zero knowledge". Presenters: Frigo, shelat, Tim Geoghegan, David Cook (the last two from ISRG). https://datatracker.ietf.org/meeting/126/materials/slides-126-cfrg-longfellow-zk-00 — minutes: https://datatracker.ietf.org/doc/minutes-126-cfrg-202607220700/
- CFRG adopted draft: https://datatracker.ietf.org/doc/draft-irtf-cfrg-longfellow/
- Fiat–Shamir companion draft referenced: draft-irtf-cfrg-fiat-shamir-03 (16 Aug 2026). Cited in draft-irtf-cfrg-longfellow-00 references.
- W3C CCG meeting "Anonymous Credentials from ECDSA": https://www.w3.org/events/meetings/5d75b3cc-a2c8-45c6-a13a-54c667dcc91a (from search results; page content not read).
- GitHub PR #190, "multi-transcript forking", with a shelat comment cited by GordieHowe: https://github.com/longfellow-zk/longfellow-zk/pull/190 (not read directly).

---

## 8. UNVERIFIED / not found
1. The exact production launch date of ZKP age assurance in Google Wallet. The 2025-04-29 post says "integrating", and the Nov 2025 IETF slide says "Deployed ... used to authenticate to Bumble". No dated "now live" primary source was found.
2. Production prover times on phones and the MDOC proof size from Google. The paper's Table 13 gives times only. The proof-size figure comes from GordieHowe's measurement, not Google's.
3. Any public Google intern or Student Researcher project description for this group, or a public posting naming Longfellow or PQ ZK. Nothing found.
4. RWC 2026 or NIST talks by shelat or Frigo on Longfellow or PQ. None found; only RWC 2025, Simons 2025 and IETF 124–126.
5. Frigo's exact Google title. Only the affiliation "Google, Cambridge, MA" was verified.
6. Whether Google's internal ML-DSA circuit is ahead of the public `tests/pq/ml_dsa` code (last public touch 2026-07-13). Unknown.
7. Content of the YouTube talks. Only titles and dates were verified.
8. The Trail of Bits and Ligero-team review PDFs. Only the summaries on reviews.md were read.
9. The date the PQCA accepted Longfellow, and its governance (TAC, maintainers). The project page exists; details not found.
10. A published, peer-reviewed Keccak-f count for ML-DSA verify across all three parameter sets. Only GordieHowe's ML-DSA-44 numbers exist; the rest is DERIVED.
11. The exact theorem numbering inside the Ligero journal version (Thm 5.4 per the Longfellow citation). Not checked against Ligero's own PDF.
