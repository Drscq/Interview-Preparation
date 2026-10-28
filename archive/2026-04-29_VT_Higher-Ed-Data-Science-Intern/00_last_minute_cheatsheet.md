# Last-Minute Cheat Sheet

Use this Wednesday morning.

Interview: Wednesday, April 29, 2026, 10:00 AM, 104 Burruss Hall.

## Your Core Message

> I am a CS Ph.D. student at Virginia Tech with strong technical research training, privacy-aware systems experience, and teaching experience. I want to apply data science to undergraduate outcomes in a way that is rigorous, responsible, and useful for student support.

## 60-Second "Tell Me About Yourself"

> I am a Ph.D. student in Computer Science at Virginia Tech. My research focuses on post-quantum cryptography, distributed trust, and privacy-preserving systems, so I am comfortable with rigorous technical work and sensitive data. I have also been a GTA for algorithms, machine learning with big data, and quantum computing, which gives me direct experience with undergraduate learning. I am interested in this internship because it connects my data and computing background with student outcomes, academic support, and evidence-based decision-making at Virginia Tech.

## Project in 6 Steps

1. Data: PISA 2018 student and school data.
2. Outcome: reading score.
3. Cleaning: select variables, rename, create SES/gender/internet indicators.
4. Feature engineering: join student and school data, compute school-level averages.
5. SQL: SQLite summaries by country, gender, school type, and internet access.
6. Modeling: hierarchical linear models because students are nested in schools and countries.

## HLM Explanation

> A simple regression treats every student as independent. In education data, students share school and country context. A hierarchical model lets schools and countries have different baselines while estimating student-level and school-level predictors.

Model phrase:

> Students nested in schools nested in countries: `(1 | country/school_id)`.

ICC:

> ICC estimates how much outcome variation is between groups rather than within groups.

## Honest ChatGPT Answer

> I used ChatGPT as a learning and pair-programming assistant to scaffold the project. I have reviewed it file by file and can explain the data cleaning, SQL, visualizations, model, and limitations. For real VT student data, I would follow university privacy rules and would not upload confidential records to external AI tools.

## Limitations to Name

- Observational data: say "associated with," not "caused."
- PISA survey design: formal analysis should handle weights and plausible values.
- Missing data: complete-case analysis can bias results.
- PISA is K-12 international data, not VT institutional data.
- Code could be improved with validation, package locking, and stronger reproducibility.

## Higher-Ed Analysis Framework

1. Clarify the decision and audience.
2. Define cohort and outcome.
3. Understand data sources, definitions, and privacy rules.
4. Start with descriptive summaries.
5. Use interpretable models.
6. Communicate limitations and actionable next steps.

## Questions to Ask Them

1. What are the most important outcomes questions you hope the intern can help answer this summer?
2. What data sources and tools does the team currently use?
3. What would a successful final deliverable look like?
4. How does UAA balance proactive analytics with student privacy and equity?

## Recovery Phrases

> Let me structure that in three parts.

> I do not want to overclaim; this is best interpreted as an association.

> I would verify the exact definition before final reporting.

> I do not remember the exact number, but the key interpretation is...

> My first step would be to clarify the cohort and outcome.
