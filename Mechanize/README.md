# Mechanize Software Engineer Internship: 7-Day Prep Plan

Welcome to your preparation repository for the Mechanize Software Engineer Internship. This plan is designed to help you, as a beginner, navigate the rapid interview process using modern AI tools effectively.

## The Goal
In 7 days, you will go from "newbie" to a candidate capable of building a functional web app in 3 hours and defending your technical choices in a follow-up interview.

---

## 📅 Daily Schedule

### Day 1: Setup & Mental Model
- **Tools:** Install [Cursor](https://www.cursor.com/) or setup VS Code with GitHub Copilot.
- **Concepts:** Learn the high-level difference between Frontend (browsers) and Backend (servers/databases).
- **Task:** Ask AI to build a simple "Hello World" counter app in React + Vite and explain the folder structure.

### Day 2: Your First Build (Weather App)
- **Task:** Build a Weather Dashboard that fetches data from an API (e.g., OpenWeatherMap).
- **Focus:** AI Prompting and manual code review. Ask AI: "Break down how the `fetch` function works here."
- **Skill:** Fetching data and displaying it in a list/card format.

### Day 3: Debugging & Modification (Movie Search)
- **Task:** Build a Movie Search app using the OMDB API.
- **Challenge:** Intentionally ask AI to add a bug or a complex feature like "search history" and practice fixing errors.
- **Skill:** Understanding error messages and state persistence (Local Storage).

### Day 4: State & Components
- **Task:** Refactor your previous apps.
- **Focus:** "State Management" (how data moves) and "Component Props" (passing data between parts).
- **Goal:** Be able to explain *why* a piece of data sits in a specific file.

### Day 5: Mock Take-Home (3-Hour Timed)
- **Project:** "The Recipe Book" - View recipes, see details, and add new ones.
- **Constraint:** Set a timer for 3 hours. Focus on the "Happy Path" (core functionality working).
- **Review:** Spend 1 hour reviewing/simplifying the code AI wrote.

### Day 6: Screening Call Prep (No AI)
- **Drill:** Rapid-fire questions on Web Fundamentals (see `Web_Fundamentals.md`).
- **Research:** Check Mechanize's website/tech stack.
- **Topics:** HTTP Verbs, SQL vs NoSQL, API basics, Git commands.

### Day 7: Final Polish & Rest
- **Project:** 2-hour mini-build (Markdown Note Taker).
- **Prep:** Ensure environment is clean and tools are authenticated.
- **Rest:** Get enough sleep; the interview process is intensive!

---

## 🛠 Repository Navigation
- Questions for Stage 1: [Stage1_Screening.md](./Stage1_Screening.md)
- Mock Projects for Stage 2: [Stage2_TakeHome.md](./Stage2_TakeHome.md)
- Core Concepts Reference: [Web_Fundamentals.md](./Web_Fundamentals.md)

---

## 🤖 Agent Skills Installed

Your AI coding assistant has been enhanced with 3 specialized skills for frontend web development. These skills give your AI agent expert-level knowledge in specific domains — think of them as "instruction manuals" that make the AI smarter about a topic.

### 1. 🏆 `vercel-react-best-practices` (163K installs)
**Path:** `.agents/skills/vercel-react-best-practices/`
**Source:** [skills.sh](https://skills.sh/vercel-labs/agent-skills/vercel-react-best-practices)

**What it does:**
Provides React and Next.js performance optimization guidelines directly from the Vercel Engineering team — the same people who build the most popular React deployment platform. This skill teaches the AI to write React code the "right" way rather than just "working" code.

**When to use it during prep:**
- When asking the AI to build any React component during your **Day 2, 3, and 5 mock sessions**.
- When asking the AI to **review and refactor** code on Day 4.
- When you want to **understand why** code is structured a certain way before your 1-hour defense call.

**Example prompts to try:**
```
"Using React best practices, build a SearchBar component that accepts a callback prop."
"Review this React code and tell me if it follows best practices."
"Why is using useEffect here considered a performance issue?"
```

---

### 2. 🎨 `tailwind-design-system` (10.7K installs)
**Path:** `.agents/skills/tailwind-design-system/`
**Source:** [skills.sh](https://skills.sh/wshobson/agents/tailwind-design-system)

**What it does:**
Teaches your AI to use Tailwind CSS v4 as a proper, scalable design system rather than just throwing random utility classes at the screen. It covers design tokens, component libraries, and responsive layout patterns. This is the key skill for making your take-home app look **polished and professional** within the time limit.

**When to use it during prep:**
- During any mock project when you want to add **professional styling fast** (Day 2, 3, 5).
- When building reusable UI components like Cards, Buttons, or Navbars.
- On Day 7 to make your final mini-project look outstanding.

**Example prompts to try:**
```
"Using a Tailwind design system, create a card component for displaying a movie title, poster, and rating."
"Apply a consistent dark-mode color palette to this app using Tailwind design tokens."
"Build a responsive navigation bar with Tailwind that collapses to a hamburger menu on mobile."
```

---

### 3. 🩺 `react-doctor` (4.8K installs)
**Path:** `.agents/skills/react-doctor/`
**Source:** [skills.sh](https://skills.sh/millionco/react-doctor/react-doctor)

**What it does:**
Acts as an **automated code reviewer** for your React projects. It checks for common bugs, performance issues (like unnecessary re-renders), missing dependencies in `useEffect`, incorrect key props in lists, and many other subtle issues that even experienced developers miss. This is your safety net before the 1-hour defense interview.

**When to use it during prep:**
- At the END of every mock project build to catch issues before your simulated defense.
- After any major refactor on Day 4.
- Critically: **Run this on your final code the day before the real interview** to identify any weak spots you need to understand and explain.

**Example prompts to try:**
```
"Run react-doctor on my current project and list all issues found."
"I have a component that re-renders too often. Use react-doctor to diagnose it."
"Check this useEffect for missing dependencies or stale closure issues."
```

---

> 💡 **Pro-tip:** You don't need to explicitly invoke these skills by name every time. Since they are installed in your workspace, your AI assistant will automatically apply the relevant knowledge when you ask React or Tailwind questions. You only need to call them explicitly when you want a dedicated audit or review pass.
