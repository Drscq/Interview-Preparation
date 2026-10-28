# Mission: 拿下 abhi shelat / Matteo Frigo 的 Summer 2027 实习（Longfellow ZK × 后量子凭证）

## Why
2026-10-30（周五）11:00 ET 和 abhi shelat（Google Cloud Researcher + Northeastern）、Matteo Frigo（Google）
Zoom 面谈 "the internship possibility"。Google 实习 HC 极紧（Siyu 组 3 个已满 2 个），这是目前 Google 侧**唯一一个
host 主动约面**的机会。目标：让他们在 team matching 池里点名要 Changqi，并当场确定一个 Summer 2027 项目方向
（后量子凭证：在 Longfellow 里证明 ML-DSA 签名）。

## Success looks like
- 能用 2 分钟、不看稿讲清 Longfellow ZK 证明的是什么（mdoc + ECDSA + SHA-256）、用了什么证明系统（Ligero + sumcheck），为什么快。
- 能讲清 "ML-DSA 验签在 ZK 里主要是 Keccak 问题" —— 并能被追问到具体步骤（ExpandA / H / SampleInBall / UseHint / norm check）。
- 能用 SHIELD 的真实数字（Keccak 两步 341 Mcycles vs 多项式乘法 0.70 Mcycles，ML-DSA-44）支撑这个判断，且不越界。
- 能提出 1–2 个具体的 12 周项目，并说清第一周做什么、怎么衡量成功。
- 能回答 FLORAM / HERO、DKLs / SHIELD 的连接问题；能说清 F-1 工作授权路线（pre-completion OPT，需要 offer letter）。
- 会议结束时拿到明确的下一步（他在池里 request / 谁是 host / 时间线）。

## Constraints
- 只有 2 天（10-28 晚 → 10-30 11:00）；还有 CCS AE 审稿 DDL 和课程。
- 所有关于自己工作的说法必须能追溯到 `Internship2027/MASTER-PROFILE.md`；HERO 只说 untrusted helper，不提 SGX。
- 没有 ZK 证明系统的实做经验 —— 诚实说，靠 MPC-in-the-head 与 MPC 的同构关系建立可信度。

## Out of scope
- 深入 GKR 证明细节、FRI/STARK 全家族、椭圆曲线算术实现细节。
- 刷 LeetCode（这是 host 面谈不是技术面）。
