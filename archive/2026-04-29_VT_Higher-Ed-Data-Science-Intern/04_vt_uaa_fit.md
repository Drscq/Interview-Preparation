# Virginia Tech UAA Fit Guide

This document connects your resume and project to the Higher Education Outcomes Data Science Intern role.

## 1. What UAA Appears to Care About

Official pages checked April 27, 2026:

- Undergraduate Academic Affairs: https://www.undergraduate.provost.vt.edu/
- Undergraduate Academic Affairs team: https://www.undergraduate.provost.vt.edu/uaa-team.html
- Undergraduate Student Outcomes Data: https://career.vt.edu/outcomes/
- Navigate advising technology: https://www.undergraduate.provost.vt.edu/aai/advising-technology/advising-technology-for-staff/navigate.html
- Analytics & Institutional Effectiveness: https://aie.vt.edu/institutional-effectiveness.html

Based on these pages, UAA's work includes:

- Academic advising.
- Academic success services.
- Experiential learning.
- Career and post-graduation outcomes.
- Academic integrity.
- Undergraduate curriculum.
- Undergraduate research.
- Coordinated student support through advising technology.

Good interview framing:

> I understand this role is not just about building models. It is about using data to support undergraduate persistence, academic achievement, student advancement, experiential learning, and post-graduation outcomes.

## 2. Your Resume Fit

### Ph.D. in Computer Science at Virginia Tech

What it signals:

- Strong technical background.
- Ability to work independently.
- Comfort with complex systems.
- Research discipline.

How to say it:

> My Ph.D. training helps me approach data problems systematically: understand the assumptions, build reproducible workflows, test carefully, and communicate uncertainty.

### GTA experience

Your teaching:

- CS 4104: Data and Algorithm Analysis.
- CS 5644: Machine Learning with Big Data.
- CS 5134: Introduction to Quantum Computing.

What it signals:

- You understand students as learners, not only rows in a dataset.
- You can explain technical ideas.
- You have experience with undergraduate academic environments.

How to say it:

> Teaching has made student success concrete to me. I see that students' outcomes depend not only on ability, but also on preparation, timing, support, and communication.

### Cryptography and privacy-preserving systems research

What it signals:

- You understand sensitive data.
- You can discuss privacy, security, and responsible data use.
- You can handle rigorous technical work.

How to say it:

> My research background makes me especially careful about student data privacy and responsible use of analytics.

### Education data project

What it signals:

- You intentionally prepared a role-relevant project.
- You can use R, SQL, visualization, and statistical modeling.
- You can translate a technical workflow into a narrative.

How to say it:

> I built the education data project to bridge my CS background with educational outcomes analysis. It gave me practice thinking about nested student data, SQL summaries, and communicating results to different audiences.

## 3. Your Best "Why UAA?" Answer

> I am interested in UAA because its work directly shapes the undergraduate experience. As a GTA, I have seen how academic support, advising, course structure, and communication can affect students' progress. I would like to contribute my data science skills to work that helps Virginia Tech understand student outcomes and improve support systems. The part that attracts me most is the combination of rigorous analysis and practical impact: the analysis needs to be technically sound, but also useful for advisors, faculty, and leaders making decisions.

Short version:

> UAA is where my technical background and teaching experience can meet a student-centered mission.

## 4. Possible Data Projects You Can Discuss

If they ask what you could work on, suggest one of these.

### Project idea 1: First-destination outcomes analysis

Relevant official context:

Virginia Tech's Career and Professional Development page describes undergraduate outcomes data from graduating seniors, including internships, full-time jobs, graduate school, employers, salaries, and types of experiences.

Possible question:

> How do post-graduation outcomes differ by major, college, experiential learning participation, or student pathway?

Methods:

- SQL summaries by cohort, college, and program.
- Data cleaning and missingness checks.
- Dashboards with small-cell suppression.
- Interpretable models for employment or continuing education outcomes.

Deliverable:

> A dashboard and short report showing patterns in first-destination outcomes and where additional support might be useful.

### Project idea 2: Advising engagement and progress to degree

Relevant official context:

Navigate is described as supporting coordinated student support, tracking engagement and wellness, and enabling proactive interventions for student belonging and progress.

Possible question:

> How is advising engagement related to credit completion, registration timing, or progress to degree?

Methods:

- Cohort definition.
- Join advising engagement records with academic progress measures.
- Descriptive trends by term.
- Logistic regression or survival analysis for retention/progress outcomes.

Privacy caution:

> I would focus on aggregate patterns and support design, not labeling individual students.

### Project idea 3: Academic support program evaluation

Possible question:

> Are tutoring, academic coaching, or success seminars associated with improved course outcomes or retention?

Methods:

- Define participants and non-participants.
- Compare similar students where possible.
- Use regression controls, matching, or difference-in-differences depending on program rollout.
- Check whether results differ by student group or course context.

Careful language:

> If participation is voluntary, I would be cautious about causality because motivated students may be more likely to use support.

### Project idea 4: Course success and early alerts

Possible question:

> Which course patterns are associated with delayed progress to degree, and how can support arrive earlier?

Methods:

- Course sequence analysis.
- DFW or withdrawal pattern summaries.
- Credit momentum indicators.
- Multilevel models if students are nested in course sections or departments.

Deliverable:

> A report that identifies high-impact points where advising or academic support could help.

### Project idea 5: Experiential learning participation

Relevant official context:

UAA includes the Academy for Experiential Learning, which is connected to internships, research, study abroad, and community projects.

Possible question:

> Which students participate in experiential learning, and how is participation associated with academic and post-graduation outcomes?

Methods:

- Participation dashboard.
- Equity gaps by program/college/cohort.
- Association with first-destination outcomes.
- Qualitative context from program staff if available.

## 5. Higher-Ed Data Analysis Framework

Use this for any scenario question.

### Step 1: Define the question

Ask:

- What decision will this analysis support?
- Who is the audience?
- Is this descriptive, predictive, or evaluative?

### Step 2: Define the cohort and outcome

Examples:

- First-year retention.
- Graduation within four or six years.
- Credit completion.
- Course success.
- Progress to degree.
- First destination within six months after graduation.
- Experiential learning participation.

### Step 3: Understand data sources and definitions

Ask:

- What table is the source of truth?
- How are students, terms, majors, and colleges defined?
- How are program changes handled?
- What data is missing?
- What privacy rules apply?

### Step 4: Start descriptive

Before modeling:

- Count students.
- Check missingness.
- Plot trends.
- Compare groups carefully.
- Validate joins.

### Step 5: Choose interpretable methods

Possible methods:

- SQL aggregation for reporting.
- Logistic regression for binary outcomes.
- Survival analysis for time-to-event outcomes.
- Multilevel models for nested data.
- Matching or quasi-experimental designs for program evaluation.
- Dashboards for recurring reporting.

### Step 6: Communicate responsibly

Include:

- What the data shows.
- What it does not show.
- Limitations.
- Privacy safeguards.
- Actionable next steps.

## 6. Privacy and Ethics Answer

Use this if asked about sensitive student data.

> I would treat student data as sensitive by default. I would use only the fields needed for the analysis, follow FERPA and VT data-governance rules, de-identify data where possible, suppress small cells in reporting, and keep the workflow in approved secure systems. I would also avoid using external AI tools with confidential data. Analytically, I would be careful that models are used to improve support, not to label or stigmatize students.

## 7. A Good Answer About Your Nontraditional Background

Question:

> Your background is cryptography. Why this role?

Answer:

> My research is cryptography, but my broader skill set is data, algorithms, privacy, and rigorous technical communication. Also, my teaching experience at Virginia Tech has made me interested in how students progress and what support helps them succeed. This internship is a good bridge: I can bring strong computing and privacy-aware analysis, while learning more about higher education outcomes from UAA.

## 8. What They May Be Looking For

Likely qualities:

- Can learn quickly.
- Can code and query data.
- Can work with messy institutional records.
- Can explain results to non-technical audiences.
- Understands that outcomes data involves privacy and equity.
- Does not overclaim causality.
- Can work with staff and faculty stakeholders.

Your response style should be:

- Humble but not apologetic.
- Clear rather than overly technical.
- Practical rather than only theoretical.
- Student-centered.

## 9. Questions to Ask Interviewers

Pick two or three.

Best first question:

> What are the most important outcomes questions you hope the intern can help answer this summer?

Best data/workflow question:

> What data sources and tools does the team currently use for outcomes analysis and reporting?

Best success question:

> By the end of the summer, what would make you feel this internship had been successful?

Best privacy/equity question:

> How does UAA think about balancing proactive analytics with student privacy and equity?

Best communication question:

> Who would be the main audience for the intern's work: advisors, faculty, academic leaders, or students?

## 10. Final Fit Statement

Use this near the end of the interview if appropriate:

> I think my strongest contribution would be combining technical depth with careful communication. I can help clean and analyze data, but I also understand from teaching that student outcomes are human outcomes. I would want my work to be accurate, privacy-conscious, and useful to the people supporting students.
