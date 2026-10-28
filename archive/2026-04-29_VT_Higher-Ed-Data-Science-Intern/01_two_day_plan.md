# Two-Day Preparation Plan

Today is Monday, April 27, 2026. The interview is Wednesday, April 29, 2026 at 10:00 AM in 104 Burruss Hall.

The goal is not to become an education policy expert in two days. The goal is to become fluent enough to explain your project, connect it to VT undergraduate outcomes, and show that you are careful, teachable, and technically strong.

## Monday, April 27

### 1. Send the email reply - 10 minutes

Use `06_reply_email.md`.

Do this first so the scheduling part is settled.

### 2. Build your 90-second opening - 25 minutes

Practice this out loud until it sounds natural:

> I am a Ph.D. student in Computer Science at Virginia Tech. My main research is in post-quantum cryptography, distributed trust, and privacy-preserving systems, so I am comfortable working with complex data, rigorous methods, and reproducible technical workflows. I also have substantial teaching experience as a GTA for algorithms, machine learning with big data, and quantum computing, which gives me a direct connection to undergraduate learning and student success. For this internship, I am especially interested in applying data science to higher education outcomes: understanding patterns in student progress, support, and post-graduation outcomes, then communicating those findings in a way that helps advisors and academic leaders make better decisions.

Memorize the structure, not every word:

1. Who you are.
2. Technical strength.
3. Teaching/student-success connection.
4. Why this role.

### 3. Read the GitHub project like a story - 50 minutes

Use `02_project_mastery.md`.

Focus on these files in the project:

- `README.md`: what the project claims.
- `R/02_data_cleaning.R`: how the analysis dataset is built.
- `R/03_sql_demo.R` and `sql/queries.sql`: what SQL skill is shown.
- `R/05_multilevel_models.R`: the statistical core.
- `reports/executive_summary.Rmd`: communication to non-technical audiences.

By the end, you should be able to answer:

- What is the outcome variable?
- What are the main predictors?
- Why is the data nested?
- Why use hierarchical modeling instead of simple linear regression?
- What are the limitations?

### 4. Learn the honest AI-assisted answer - 20 minutes

Practice this:

> I used ChatGPT as a learning and coding assistant to help scaffold the project and check implementation details. After that, I reviewed the pipeline file by file so I could understand the data cleaning, SQL summaries, visualization choices, and hierarchical model. I would describe it as an AI-assisted portfolio project, not my primary research publication. What I can own in the interview is the reasoning: why the data is nested, why SQL and R are useful, how to interpret the model, and what limitations I would address in a production or institutional setting. For real student data, I would follow VT privacy policies and would not put confidential data into external AI tools.

This answer is important because it is honest and still professional.

### 5. Sleep with one-page confidence - 10 minutes

Before sleeping, read only:

- The core message in `README.md`.
- The "project pitch" in `02_project_mastery.md`.
- The "why UAA" answer in `04_vt_uaa_fit.md`.

Do not keep studying until you are exhausted. A clear mind will help more than one extra detail.

## Tuesday, April 28

### Morning: technical ownership - 75 minutes

Without looking at notes, explain the project on paper:

1. Data source: PISA 2018.
2. Unit of analysis: students, joined with school attributes.
3. Outcome: reading score.
4. Predictors: SES, gender, internet access, school average SES, public/private, staff shortage.
5. Workflow: acquire, clean, SQL, EDA, model, report.
6. Model: `reading_score ~ student predictors + school predictors + (1 | country/school_id)`.
7. Limitation: observational, simplified PISA treatment, missing data, survey weights/plausible values not fully handled.

Then check against `02_project_mastery.md`.

### Midday: higher-ed outcomes thinking - 60 minutes

Use `04_vt_uaa_fit.md`.

Practice answering:

- How would you analyze retention or graduation outcomes?
- How would you evaluate tutoring, advising, or academic support?
- How would you protect student privacy?
- How would you communicate findings to non-technical leaders?

Use this pattern:

1. Clarify the outcome and population.
2. Understand data definitions and privacy constraints.
3. Start with descriptive analysis.
4. Build a simple, interpretable model.
5. Check fairness and limitations.
6. Communicate actionable findings.

### Afternoon: question bank - 75 minutes

Use `03_possible_questions.md`.

Practice out loud. Record yourself once if possible.

Must-practice questions:

1. Tell us about yourself.
2. Why this internship?
3. Walk us through your project.
4. Why hierarchical linear modeling?
5. What does ICC mean?
6. How did you use SQL?
7. What are the weaknesses of your project?
8. How would you analyze VT student outcomes?
9. Tell us about communicating technical material.
10. What questions do you have for us?

### Evening: one full mock interview - 45 minutes

Use `05_mock_interview_script.md`.

Rules:

- Answer out loud.
- Keep most answers under two minutes.
- If stuck, pause and structure the answer.
- Do not restart every time you make a small mistake. Recover naturally.

### Night-before final review - 20 minutes

Read:

- `README.md`
- top answers in `03_possible_questions.md`
- questions to ask in `04_vt_uaa_fit.md`

Prepare:

- Resume copy.
- Notebook and pen.
- Interview address: 104 Burruss Hall.
- A few project notes, but do not read from them during the interview unless asked.

## Wednesday, April 29

### Morning review - 25 minutes

Do not cram. Review:

1. Opening pitch.
2. Project pitch.
3. HLM explanation.
4. ChatGPT-assisted answer.
5. Two questions to ask them.

### In the interview

Your style should be:

- Clear.
- Honest.
- Curious.
- Practical.
- Respectful of student privacy.

If you forget a detail, say:

> I do not want to overstate that detail from memory. My understanding is..., and I would verify the exact number or implementation before using it in a formal report.

That is much better than guessing.
