# 蚂蚁技术研究院 密码学实验室 · 二面（老板面）

- 岗位：【蚂蚁星】助理研究员-后量子密码（实习），申请档案 `../../Internship2027/applications/2026-10-27-ant-group-蚂蚁星助理研究员-后量子密码实习.md`
- 一面：2026-11-04 王宇辰（约 2 小时，没录音）。二面：老板，熟 MPC。时间未定（用户自己定），定了把文件夹名里的 `TBD` 改成日期。
- AI Coding 笔试：一面面试官说可以不做 → 暂不做。

## 文件
| 文件 | 内容 |
|---|---|
| `slides/ant-round2-crib.pdf` | **自用小抄，不共享屏幕**。中文 + 英文术语 |
| `resume/Changqi_Sun_AntGroup_PQC2027.pdf` | 投递时用的简历（v2-crypto），**不改**，有出入的地方口头更正 |

## 已定的决定（2026-11-05 grilling）
- 小抄只给自己看；中文写，术语英文。
- 顺序：SHIELD → Falcon/FLOCK → masking → HERO → threshold ML-KEM → 概念讲解 → 速查。
- SHIELD 的「为什么」按「需求 → 选择」讲（R1 持钥方即敌手 → malicious；R2 n-of-n → dishonest majority；R3 bit-exact → 通用 MPC；R4 混合计算 → SPDZ+WRK17+daBits），主动承认软肋（可信 dealer 做 offline、MAC soundness、23 轮、端到端 ×≈4）。
- 简历 "890K→355K vs SCALE-MAMBA" 口头说成「相对我们最初的朴素编码」。
- masking 讲 high-level + A2B/B2A + 省内存三类思路；新场景（FIDO2，nRF52840）要不要讲由用户定。
- 组里说的是 **threshold ML-KEM**（不是 strict），他们也不确定可行 → 小抄里准备「可行性探索」。
- 用户之前说错/没意识到的概念单独成页（纠错总表 + E1–E6 讲解页），每个都带全称。

## 小抄里标【待确认】的，面试前自己过
- SHIELD 的 SPDZ 域是不是 F_q（论文只写 F_p）→ 决定 MAC soundness 是不是 2^-23。
- 被拒迭代里打开过的值是否也进 batch MAC check。
- 掩码 Kyber 文献的出处是凭记忆写的。
- ISW 的 d+1 份证明（Rivain–Prouff CHES 2010）出处凭记忆。
