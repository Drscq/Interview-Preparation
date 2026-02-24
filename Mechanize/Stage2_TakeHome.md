# Stage 2: Take-Home Project Mock Practices

You have **3 hours** to build and **1 hour** to defend. You **can** use AI. The goal is to show speed, functionality, and understanding.

## 🏗 Simulation 1: Weather Dashboard
**Prompt to AI:** "Build a React + Tailwind CSS dashboard that lets users search for a city and see the current temperature, humidity, and a 3-day forecast. Use the OpenWeatherMap API."

**Defense Questions to Prepare For:**
1. "How are you handling the API key? Is it secure?"
2. "What happens if the user searches for a city that doesn't exist?"
3. "Walk me through how the weather icon changes based on the data."

## 🏗 Simulation 2: Movie Search App
**Prompt to AI:** "Create a movie search app using the OMDB API. Users can search by title and 'Favorite' a movie. Favorites should persist even if the page is refreshed."

**Defense Questions to Prepare For:**
1. "Why did you use LocalStorage for the favorites?"
2. "How did you handle the loading state while waiting for the search results?"
3. "If this app scaled to millions of users, how would you change the 'favorites' feature?"

## 🏗 Simulation 3: Recipe Book (The Hardest)
**Prompt to AI:** "Build a recipe manager. Users see a list of recipes from a local JSON file. They can click to view details and use a form to 'Create' a new recipe in the list (temporary for this session)."

**Defense Questions to Prepare For:**
1. "How is data passed from the list view to the detail view?"
2. "Explain the form validation. What prevents a user from submitting an empty recipe?"
3. "How did you structure the components for reusability?"

---

## 🔝 Pro-Tips for the 3-Hour Window:
1. **The MVP First:** Get the API data on the screen in plain text before you make it look pretty.
2. **Read as You Go:** When AI generates a large block of code, don't just paste it. Skim it and ask "What is this `useEffect` doing here?"
3. **Comment your code:** AI might not add comments. Add your own brief notes like `// This function handles the API call` to help you during the 1-hour interview.
4. **Simplification:** If the AI gives you a very complex solution, tell it: "Rewrite this using simpler React logic so I can explain it easily."
