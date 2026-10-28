# Web Fundamentals Guide

This document covers the structural knowledge you need to talk like a software engineer during the Mechanize interview.

## 1. The Modern Web Stack (Next.js/React)
- **React:** A library for building UI components.
- **Vite:** A build tool that makes development extremely fast.
- **Tailwind CSS:** A utility-first CSS framework (perfect for rapid prototyping).
- **Next.js:** A framework built on top of React that handles routing and server-side features out of the box.

## 2. Component Lifecycle & Hooks
As a developer using AI, you will see these often:
- **`useState`:** Allows components to "remember" data.
- **`useEffect`:** Used for "side effects" like fetching data from an API when the page loads.
- **`Props`:** Short for properties. They are how you pass data from a parent component to a child.

## 3. Client-Side vs. Server-Side
- **Client-Side:** Code that runs in the user's browser (React components, styles).
- **Server-Side:** Code that runs on a server (Database connections, authentication).
- **In your take-home:** You will likely stay on the Client-Side, but you might "mock" a server using a JSON file or an external API.

## 4. State Management Patterns
- **Local State:** Data used by only one component (e.g., text in an input box).
- **Lifting State Up:** Moving state to a parent component so multiple children can access it.
- **Global State:** (e.g., Redux, Context API) Used for data the whole app needs (e.g., "Is the user logged in?").

## 5. API Interaction
- **REST:** Representational State Transfer. Uses standard HTTP methods (GET, POST).
- **Endpoint:** A specific URL where an API can be accessed (e.g., `/api/movies`).
- **Async/Await:** JavaScript keywords that tell the code to wait for an API response before moving to the next line.

## 6. Deployment Basics
Know that apps aren't just local. They live on platforms like:
- **Vercel / Netlify:** Popular for deploying React/Next.js apps with one click.
- **GitHub:** Where your code is stored and versioned.

---

## 🧠 Expert Advice: Architecture Over Syntax
During the 1-hour call, they won't test if you remembered the exact name of a CSS property. They want to know:
- **Why** did you name that component `SearchBar`?
- **How** does the data get from the API into that list?
- **What** would you do next if you had 10 more hours? (e.g., Add tests, improve mobile responsiveness, add a database).
