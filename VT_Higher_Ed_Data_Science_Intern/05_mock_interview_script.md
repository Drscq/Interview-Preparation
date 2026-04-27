# Mock Interview Script

Use this Tuesday evening. Set a timer for 45 minutes.

Do not aim for perfect wording. Aim for clear structure, honest reasoning, and calm recovery when you do not know a detail.

## 0. Setup - 3 Minutes

Open:

- `README.md`
- `02_project_mastery.md`
- `03_possible_questions.md`
- `04_vt_uaa_fit.md`

Then close them or put them aside.

You are practicing retrieval, not reading.

## 1. Opening - 5 Minutes

### Question 1

Tell us about yourself.

Target answer length: 60-90 seconds.

Must include:

- Ph.D. CS at Virginia Tech.
- Research rigor and privacy/security background.
- GTA experience.
- Interest in student outcomes data.

Self-score:

- 2 points: clear background.
- 2 points: connected teaching to student success.
- 2 points: connected technical skills to internship.
- 2 points: under 90 seconds.
- 2 points: sounded natural.

### Question 2

Why are you interested in this internship?

Target answer length: 60 seconds.

Must include:

- UAA mission/student success.
- Data for practical decisions.
- Your teaching perspective.

## 2. Project Deep Dive - 15 Minutes

### Question 3

Walk us through your GitHub project.

Target answer length: 2 minutes.

Structure:

1. Research question.
2. Data source.
3. Pipeline.
4. SQL.
5. Model.
6. Reports/communication.

Recovery phrase if you ramble:

> The short version is that I built a reproducible R and SQL pipeline for nested education outcomes data.

### Question 4

Why hierarchical linear modeling?

Target answer length: 90 seconds.

Must include:

- Students are nested in schools and countries.
- OLS independence assumption is not appropriate.
- Random intercepts let school/country baselines vary.
- This separates individual and context-level predictors.

### Question 5

What does ICC tell you?

Target answer length: 45 seconds.

Must include:

- How much outcome variation is between groups.
- Justifies taking clustering seriously.

### Question 6

What are the biggest limitations?

Target answer length: 90 seconds.

Must include:

- Observational, not causal.
- PISA survey weights/plausible values.
- Complete-case missing data.
- K-12 international data is not VT institutional data.

### Question 7

How did ChatGPT help with the project?

Target answer length: 60-90 seconds.

Must include:

- Be honest.
- Pair-programming/learning assistant.
- You reviewed the workflow and understand it now.
- No confidential student data in external AI tools.

## 3. Higher-Ed Outcomes Scenario - 10 Minutes

### Question 8

Suppose UAA wants to understand which students are at risk of not being retained after the first year. How would you approach it?

Target answer length: 2 minutes.

Structure:

1. Define cohort and outcome.
2. Check data definitions and privacy constraints.
3. Start with descriptive summaries.
4. Use interpretable model, likely logistic regression.
5. Validate performance and fairness.
6. Communicate results as support opportunities, not labels.

### Question 9

How would you evaluate whether academic coaching improves student outcomes?

Target answer length: 2 minutes.

Structure:

1. Define participation, comparison group, and outcome.
2. Identify selection bias.
3. Use descriptive analysis first.
4. Use matching/regression/difference-in-differences if appropriate.
5. Avoid causal claims unless design supports them.

### Question 10

How would you communicate findings to non-technical stakeholders?

Target answer length: 90 seconds.

Must include:

- Start with the decision.
- Use simple visuals.
- Explain uncertainty.
- Translate coefficients into plain language.
- Give actionable next steps.

## 4. Behavioral Round - 7 Minutes

### Question 11

Tell us about a time you explained something technical.

Use GTA experience.

Structure:

- Situation: students had different backgrounds.
- Action: examples, step-by-step explanation, checking understanding.
- Result: students could follow complex material.
- Connection: same skill needed for data communication.

### Question 12

Tell us about a time you learned something quickly.

Use education data project.

Structure:

- Situation: main research is not education data.
- Task: build role-relevant portfolio project.
- Action: learned PISA, R/tidyverse, SQL, HLM.
- Result: can now explain and adapt the workflow.

### Question 13

How do you handle ambiguity?

Target answer:

> I clarify definitions first, separate known facts from assumptions, document choices, and verify with domain experts before final reporting.

## 5. Your Questions - 5 Minutes

Ask three out loud:

1. What are the most important outcomes questions you hope the intern can help answer this summer?
2. What data sources and tools does the team currently use for outcomes analysis?
3. By the end of the summer, what would make this internship successful?

Optional:

> How does UAA balance proactive analytics with student privacy and equity?

## 6. Closing - 2 Minutes

Practice:

> Thank you for the opportunity to speak with you. I am excited about this position because it connects my technical background with student success at Virginia Tech. I would bring strong coding, modeling, and communication skills, and I would approach the work with care around privacy, equity, and practical usefulness.

## 7. Scoring

After the mock interview, score yourself from 1 to 5:

- Opening clarity.
- Project ownership.
- HLM explanation.
- Higher-ed scenario reasoning.
- Privacy/ethics awareness.
- Communication style.
- Ability to recover from uncertainty.

If any score is below 3, rehearse only that section again for 10 minutes.

## 8. Common Problems and Fixes

### Problem: You sound too technical.

Fix:

> Let me say that more simply...

Then give the plain-language version.

### Problem: You cannot remember an exact number.

Fix:

> I do not want to guess the exact number from memory, but the important interpretation is...

### Problem: You feel exposed about ChatGPT.

Fix:

> I used it as an assistant, and I take responsibility for understanding and verifying the work.

### Problem: You overclaim causality.

Fix immediately:

> More precisely, I should say "associated with," because this is observational data.

### Problem: You do not know their data system.

Fix:

> I would first learn the data dictionary, access rules, and existing reporting workflow before proposing a model.
