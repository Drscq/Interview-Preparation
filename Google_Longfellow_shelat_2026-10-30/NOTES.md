# Notes

- 用户用中文交流；技术名词、要说出口的英文句子保持英文原文。
- 写课（2026-10-28 用户纠正）：每课缩写首现即写全称 + 意思（顶部放「缩写速查」）；先定义 ZK 角色（谁提供 statement / witness、谁看得到）；每个组件先给「黑盒卡片」输入 → 输出，实现细节折叠进 `details.how`，不讲到函数内部写法；能画成图的概念尽量用内联 SVG 图展示。
- 偏好：详细的资料 + 一份能在面试时共享屏幕用的 beamer slide。
- 用户自己的工作事实以 `Internship2027/MASTER-PROFILE.md` 和 `reference/nvidia-fellowship/own-shield.md` 为准。
- 冷邮件原文（10-28 10:26）与 abhi 回信（10:50, cc Matteo）："That is great, let's meet and discuss the internship possibilty. Friday morning?"

## 2026-10-28 grilling 第一轮决定（用户）
- 定位：第一次见面，**重点放在自己做过什么 + 和他们的连接**，不是去指出他们的问题。
- 竞品（GordieHowe / Nowhere Man / edaBitE）：**不主动提**；只在对方提起时用 0004 课话术。
- 结构：全程共享屏幕，slide 顺序 = 自我介绍 → 做过的项目 → 我对 Longfellow 的理解 → 我能做什么。
- 用户没读过 ML-DSA 测试电路 → 新增 0006 课导读；读过之前不能说 "I looked at your circuit"。
- OPT / 工作授权：**这次不谈**。
- 结尾最重要的 ask：他们愿不愿意从 PhD SWE intern 池里把我要过去。
- 「项目提案」的含义要重新对齐：用户理解为「基于已有的 threshold ML-DSA / FALCON，下一步做什么」。

## 2026-10-28 grilling 第二轮决定（用户全部采纳推荐）
- 「下一步」故事线：签发侧已完成（SHIELD / FLOCK）→ 持有人侧（Longfellow）。B = SHIELD 签发 + 现成 ML-DSA 电路（零改动），先讲；F = Longfellow 里的 Falcon 电路（藏公钥 ≈ 9 vs ≈ 116 次 Keccak），看反应展开；A = 藏公钥 ML-DSA，备用；C 不上 slide。
- Slide 11 页：Title → About me → SHIELD → FLOCK + 修 bug → 我对 Longfellow 的理解 → 他们的 ML-DSA 电路 → 下一步 → Falcon 数字 → Questions → 池里点名 ask → Thank you。
- HERO：About me 一行 + 口头一句（FLORAM 连接），不单独成页。
- 第 6 页只写公开事实；口头是否说 "I went through your circuit" 等周四 grilling 时看用户能否讲清 SampleInBall index 校验和 UseHint interval shifting。
- 结尾 ask 原话见 0005 §6，说完停下等回答。
- Falcon 事实已按 round-3 规范 v1.2 Alg. 3 / Alg. 16 核实；FLOCK 对外说 "Falcon-compatible"。

## 2026-10-29 slide 修改（用户）
- SHIELD / FLOCK 页改为「它是什么 + 主要技术」的结构图；去掉 Keccak Mcycles 成本图（用户认为不需要讲）。
- 删掉 "What this says about me" 这类自我评价句，删掉复现 CCS artifact / 修 bug 那一栏。
- 顺序：About me → SHIELD → FLOCK → 重点放 Longfellow。FLOCK 事实取自 PaperSrc `usenix_version`（投稿版）摘要与 §3；`sp_version` 采样路径不同，不混用。
- 2026-10-29 用户纠正：「下一步」方案里**不出现 SHIELD / FLOCK**。Longfellow 只需要把发证方的 ECDSA 换成 ML-DSA 或 Falcon，发证方是否门限与他们无关；把 SHIELD 硬接进方案「特别古怪」。B 改为「ML-DSA 放进完整 mdoc 陈述并测端到端」，F 不再写「FLOCK 签出的签名」。与自身工作的连接只在被问时口头一句。
- 2026-10-29 用户决定：删掉「Your ML-DSA circuit: where the cost is」和「Why Falcon is interesting for the holder side」两页。现 deck 9 页：Title → About me → SHIELD → FLOCK → My reading of Longfellow → What comes next → Questions → pool ask → Thank you。0003 / 0007 课的 Keccak 计数保留为口头备用。
- 2026-10-29：「My reading of Longfellow」页改成三组件结构图（① Sumcheck → ② Ligero → ③ RS encoding）+ 两个域 / 随机 MAC 一行。
- 2026-10-29 用户决定：slide 上不再用 Keccak-f 次数比较 ML-DSA 与 Falcon（≈9 vs ≈116 只数了哈希，未含 Decompress、范数检查和跨域 MAC，不能当成「Falcon 更便宜」的结论）。改为定性描述：ML-DSA 藏公钥时 ExpandA 要进电路；Falcon 公钥是一个多项式、无需展开，值得测。次数只作口头备用。
