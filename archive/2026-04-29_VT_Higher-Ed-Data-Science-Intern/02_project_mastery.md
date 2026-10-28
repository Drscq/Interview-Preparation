# Project Mastery Guide

Project GitHub: https://github.com/Drscq/education-data-impact

Project title on resume: Impact of School Resources on Student Reading Achievement

Use this guide to become fluent enough to discuss the project without sounding like you memorized a generated README.

## 1. The One-Minute Project Pitch

> I built an education data analysis project using PISA 2018 data to study how student background and school-level context relate to reading achievement. The workflow starts with data acquisition in R, then cleans and joins student and school data, creates derived variables such as internet access, gender indicators, centered socioeconomic status, and school-level averages, and stores the cleaned dataset for analysis. I also used SQLite queries to summarize outcomes by country, gender, school type, and internet access. The statistical core is a hierarchical linear model using `lme4`, because students are nested within schools and schools are nested within countries. The project helped me practice the type of work this internship may involve: turning messy educational data into interpretable results, respecting the structure of the data, and communicating findings to both technical and non-technical audiences.

Shorter version:

> It is a reproducible education-data pipeline in R and SQL, ending with a multilevel model for reading outcomes in nested student-school-country data.

## 2. Why This Project Fits the Internship

This project is not Virginia Tech institutional data, but it is a strong analogy for higher-ed outcomes work.

| Project concept | Higher-ed outcomes analogy |
|---|---|
| Students nested in schools/countries | Students nested in courses, departments, colleges, cohorts, or advisors |
| Reading score outcome | Course success, GPA, retention, graduation, progress to degree, first destination |
| Student SES, gender, internet access | Student background, preparation, engagement, access to support |
| School resources and average SES | Program context, course context, college-level resources, support environment |
| SQL summaries | Institutional reporting, dashboards, cohort tables |
| RMarkdown reports | Communicating to advisors, faculty, and leadership |
| HLM | Accounting for clustering and context instead of treating every student as independent |

The strongest interview framing:

> The project shows that I can think about educational outcomes at multiple levels: individual students and the institutional context around them.

## 3. File-by-File Walkthrough

### `R/01_data_acquisition.R`

Purpose: acquire raw PISA 2018 student and school data.

What it does:

- Loads R packages `tidyverse` and `learningtower`.
- Uses `load_student("2018")` to load PISA student data.
- Loads the `school` dataset and filters to year 2018.
- Prints quick summaries with `glimpse()`, `nrow()`, and `n_distinct()`.
- Saves raw student and school CSVs under `data/raw/`.

How to explain:

> This is the extraction step. I separated raw data acquisition from cleaning so that the pipeline is reproducible and each stage has a clear responsibility.

Improvement to mention if asked:

- The script should create `data/raw/` if it does not already exist.
- A production version should use `renv` or another environment lockfile to make package versions reproducible.

### `R/02_data_cleaning.R`

Purpose: create the final analysis dataset.

What it does:

- Reads raw student and school CSVs.
- Selects variables relevant to the analysis.
- Renames variables:
  - `read` to `reading_score`.
  - `math` to `math_score`.
  - `science` to `science_score`.
  - `stu_wgt` to `student_weight`.
  - `escs` to `ses_index`.
- Creates derived variables:
  - `has_internet`: 1 if internet is yes, else 0.
  - `has_computer`: 1 if computer is yes, else 0.
  - `gender_female`: 1 if female, else 0.
  - `ses_centered`: SES minus the overall mean SES.
- Cleans school data and creates `is_public`.
- Joins student and school data on `country` and `school_id`.
- Computes school-level aggregates:
  - average school reading score.
  - average school SES.
  - number of students sampled in the school.
  - percent with internet access.
- Saves `data/processed/analysis_data.csv`.

How to explain:

> This is the feature-engineering step. It turns raw survey-style data into an analysis table where each row is a student, but the row also includes school-level context. That structure is what makes the later multilevel model possible.

Key concept: centering SES

`ses_centered = ses_index - mean(ses_index, na.rm = TRUE)`

Why center?

- The intercept becomes easier to interpret: the expected reading score for an average-SES student, rather than a student with SES exactly zero.
- It can reduce collinearity when using interactions.
- It makes the individual SES coefficient easier to discuss.

Improvement to mention:

- `if_else(internet == "yes", 1L, 0L)` treats missing or unexpected values as 0 in some cases. A more careful version would preserve missingness explicitly.
- Formal PISA analysis should handle plausible values and survey weights more carefully.

### `R/03_sql_demo.R` and `sql/queries.sql`

Purpose: demonstrate SQL querying and database-style summaries.

What it does:

- Reads the cleaned analysis data.
- Creates a local SQLite database at `data/education.db`.
- Writes the analysis table as `students`.
- Runs SQL queries for:
  - top countries by average reading score.
  - gender gap in reading by country.
  - public versus private school outcomes.
  - internet access versus no internet access.

Important SQL patterns:

```sql
SELECT country,
       ROUND(AVG(reading_score), 1) AS avg_reading,
       COUNT(*) AS n_students
FROM students
GROUP BY country
ORDER BY avg_reading DESC
LIMIT 10;
```

This shows:

- `SELECT` for choosing outputs.
- `AVG` and `COUNT` for aggregation.
- `GROUP BY` for country-level summaries.
- `ORDER BY` and `LIMIT` for ranking.

Gender-gap query:

```sql
AVG(CASE WHEN gender_female = 1 THEN reading_score END)
```

This is conditional aggregation. It computes one average for female students and another for male students inside the same grouped query.

How to explain:

> I used SQLite to show that I can move between R analysis and database-style querying. In institutional work, data often lives in databases or warehouses, so being comfortable with joins, grouped summaries, and conditional aggregation is important.

### `R/04_eda.R`

Purpose: exploratory data analysis and visualizations.

What it does:

- Computes descriptive statistics:
  - number of rows.
  - mean, standard deviation, median, min, max reading score.
  - mean and standard deviation of SES.
  - percent female.
  - percent with internet access.
- Computes country-level summaries.
- Creates plots:
  - reading score distribution.
  - reading by gender.
  - SES versus reading.
  - top countries by reading score.
  - internet access and reading.
  - correlation heatmap.

How to explain:

> Before modeling, I used EDA to understand distributions, missingness, group differences, and whether relationships looked plausible. EDA is also where I start thinking about what visualizations would be useful for different audiences.

For non-technical communication:

> A simple bar chart comparing average reading scores for students with and without internet access is easier for a broad audience than a regression coefficient table. The goal is not to hide complexity, but to translate it responsibly.

### `R/05_multilevel_models.R`

Purpose: fit hierarchical linear models.

What it does:

- Loads the processed dataset.
- Selects key variables and drops rows with missing values.
- Fits four models:
  - Null model: only random intercepts for country/school.
  - Student model: gender, SES, internet access.
  - School model: adds school average SES, public school indicator, staff shortage.
  - Interaction model: tests individual SES multiplied by school average SES.
- Computes ICC and R-squared.
- Compares models with `anova()`.
- Saves fixed-effect results.
- Creates coefficient and random-effect plots.

Core model syntax:

```r
reading_score ~ gender_female + ses_centered * school_avg_ses +
  has_internet + is_public + staff_shortage +
  (1 | country/school_id)
```

How to read it:

- Outcome: `reading_score`.
- Fixed effects: gender, individual SES, school average SES, internet, public school, staff shortage, and the SES interaction.
- Random effects: random intercepts for schools nested within countries.

Nested structure:

```r
(1 | country/school_id)
```

This means:

- Students in the same school may be more similar to one another.
- Schools in the same country may be more similar to one another.
- The model allows each school/country context to have its own baseline reading level.

## 4. The Key Statistical Concepts

### Why not ordinary linear regression?

Ordinary least squares assumes observations are independent. In education data, that is often false.

Students in the same school may share:

- teachers.
- curriculum.
- local resources.
- peer environment.
- policies.

If we ignore this clustering, standard errors can be too small and we may overstate confidence in predictors.

Interview answer:

> I used hierarchical modeling because the data has a nested structure: students within schools within countries. A simple regression would treat every student as independent, but students from the same school share context. The hierarchical model lets the baseline outcome vary by school and country, which gives more realistic uncertainty and lets us separate individual-level and context-level relationships.

### What is ICC?

ICC means intraclass correlation coefficient.

Plain English:

> ICC estimates how much of the outcome variation is between groups rather than within groups.

For this project:

> A high ICC would mean that school or country context explains a meaningful share of reading-score differences, which supports using a multilevel model.

Simple formula idea:

```text
ICC = between-group variance / total variance
```

With multiple nested levels, the idea is the same, but there can be variance components for country, school, and individual residuals.

### Fixed effects versus random effects

Fixed effects:

- Estimate average relationships across the dataset.
- Example: how much reading score changes with SES, internet access, or school average SES.

Random effects:

- Capture group-level deviations from the overall baseline.
- Example: one country or school may have a higher or lower average reading baseline after accounting for predictors.

Interview answer:

> Fixed effects answer questions about average predictor relationships. Random effects account for the fact that schools and countries have different baselines.

### Cross-level interaction

The model includes:

```r
ses_centered * school_avg_ses
```

This expands to:

- `ses_centered`
- `school_avg_ses`
- `ses_centered:school_avg_ses`

Interpretation:

> The interaction asks whether the relationship between a student's own SES and reading score changes depending on the school's average SES.

Higher-ed analogy:

> In VT data, a similar question might be whether the relationship between first-year GPA and graduation differs by college, major, advising engagement, or participation in support programs.

### Marginal and conditional R-squared

Marginal R-squared:

- Variance explained by fixed effects only.

Conditional R-squared:

- Variance explained by fixed effects plus random effects.

Interview answer:

> In multilevel modeling, marginal R-squared tells us what the measured predictors explain. Conditional R-squared also includes the school and country grouping structure.

## 5. What the Project Shows About You

Use these resume-to-project links:

- CS Ph.D. research: you can work with complex technical systems and rigorous methods.
- GTA experience: you understand undergraduate learning environments firsthand.
- Machine learning with big data teaching: you can explain data concepts and work with large datasets.
- Cryptography/privacy research: you are sensitive to data security and privacy.
- Education data project: you intentionally built a bridge from your technical background to student outcomes analytics.

Strong sentence:

> My background is not traditional institutional research, but I bring rigorous computing, teaching experience, and a strong respect for student data privacy.

## 6. Honest ChatGPT-Assisted Framing

If they ask directly, do not hide it.

Strong answer:

> I used ChatGPT as a pair-programming and learning assistant. It helped me scaffold the project and think through the R workflow. But I have reviewed the project file by file and can explain the data cleaning, SQL summaries, visualizations, and hierarchical model. I would not describe it as a peer-reviewed research result; I would describe it as a portfolio project designed to demonstrate that I can learn education-data methods and communicate them. For any real Virginia Tech student data, I would follow university privacy rules and would not upload confidential records to external AI tools.

If they ask, "So did ChatGPT do it for you?"

Answer:

> It helped me accelerate the first version, but the important part for this interview is that I can now explain the design choices and limitations. I see AI as a learning assistant, not a substitute for responsibility. In a professional setting, I would verify the code, document assumptions, and protect sensitive data.

## 7. Limitations You Should Be Ready to Name

Naming limitations makes you sound more credible.

### Limitation 1: Observational data

Do not say:

> Internet access caused higher reading scores.

Say:

> Internet access was associated with higher reading scores. Because this is observational data, it may also reflect socioeconomic status, school resources, or other confounders.

### Limitation 2: PISA survey complexity

PISA has a complex survey design. A publication-quality analysis should handle:

- student weights.
- school weights.
- plausible values.
- replicate weights or other survey-design corrections.

Say:

> This project simplified some PISA-specific survey methodology to focus on the data workflow and multilevel modeling. For formal inference, I would use the recommended PISA analysis procedures.

### Limitation 3: Missing data

The model uses complete-case analysis after selecting key variables.

Say:

> Complete-case analysis is a reasonable first pass, but it can bias results if missingness is systematic. I would next examine missing-data patterns and consider multiple imputation or sensitivity analysis.

### Limitation 4: Generalizing from PISA to VT

Say:

> PISA is K-12 international assessment data, not higher-ed administrative data. I use it as an analogy for nested education data and outcomes modeling, not as evidence about Virginia Tech.

### Limitation 5: Code production quality

Possible improvements:

- create directories automatically.
- add a package environment file.
- add data validation checks.
- add README instructions for exact reproduction.
- avoid silently converting missing binary fields to zero.
- document all variable definitions.

## 8. Whiteboard Explanation

If asked to draw the project:

```text
PISA student data        PISA school data
        |                       |
        | clean/select          | clean/select
        |                       |
        +--------- join on country + school_id
                          |
                   analysis_data.csv
                          |
          +---------------+----------------+
          |                                |
      SQL summaries                     EDA plots
          |                                |
          +---------------+----------------+
                          |
             hierarchical linear models
                          |
           technical report + executive summary
```

Say:

> The core idea is to preserve the relationship between individual students and their school context. That is why I created both student-level variables and school-level aggregates before modeling.

## 9. If They Ask for a Higher-Ed Version

You can propose:

> For Virginia Tech, I would start by defining a cohort, such as first-time full-time students entering in a specific fall term. Then I would define outcomes like first-year retention, credit completion, progress to degree, graduation, or first destination. I would join student-level records with course, advising, and program-level context, while following FERPA and small-cell suppression rules. I would start with descriptive dashboards and then use interpretable models, such as logistic regression, survival analysis, or multilevel models, depending on the question. The output would need to be actionable for advisors and academic leaders, not just statistically interesting.

## 10. Fast Technical Cheat Sheet

### R/tidyverse verbs

- `select()`: choose columns.
- `rename()`: give clearer names.
- `mutate()`: create new variables.
- `filter()`: keep rows meeting conditions.
- `left_join()`: merge student and school tables.
- `group_by()` plus `summarise()`: create aggregate summaries.
- `pivot_longer()`: reshape data for summaries or plots.
- `drop_na()`: remove rows with missing values.

### SQL concepts

- `GROUP BY`: aggregate by group.
- `AVG`, `COUNT`: summary statistics.
- `CASE WHEN`: conditional logic.
- `HAVING`: filter after aggregation.
- `ORDER BY`: sort results.
- `LIMIT`: return top rows.

### Model concepts

- Outcome: `reading_score`.
- Student predictors: gender, SES, internet access.
- School predictors: school average SES, public/private, staff shortage.
- Random intercepts: school and country baselines.
- ICC: amount of variation due to grouping.
- Cross-level interaction: whether school context changes an individual-level relationship.

## 11. The Safest Way to Discuss Results

Use cautious language:

- "associated with"
- "predictive of"
- "related to"
- "after accounting for"
- "in this model"
- "I would verify exact estimates before formal reporting"

Avoid:

- "proved"
- "caused"
- "definitively showed"
- "students succeed because of one variable"

Best result sentence:

> The most important result is methodological as much as substantive: school context matters enough that we should not analyze education outcomes only at the individual level.
