# 🟠 Project Zenith: AI-Native People Experience Agent

> **Built for the Cloudflare People Innovation Lab | Summer 2026 Internship Portfolio**

Zenith is a proof-of-concept internal tool that demonstrates how Cloudflare's serverless infrastructure can power high-reasoning, autonomous agents for the People & Places organization.

---

## 🌟 Vision
The goal of Zenith is to build an **AI teammate**, not just a search box. It "reasons, acts, and coordinates" by:
1. **Retrieving** real-time policy information using a RAG (Retrieval Augmented Generation) pipeline.
2. **Acting** on employee requests by updating backend data structures autonomously.
3. **Optimizing** recruitment and onboarding flows through unified intelligence.

---

## 🛠️ Technical Stack

- **Frontend**: [Next.js 15+](https://nextjs.org/) (App Router, Tailwind CSS v4)
- **Runtime**: [Cloudflare Workers](https://workers.cloudflare.com/) (Edge-first API)
- **Database**: [Cloudflare D1](https://developers.cloudflare.com/d1/) (SQL database)
- **Intelligence**: [Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/) (Llama 3-8B)
- **Vector Search**: [Cloudflare Vectorize](https://developers.cloudflare.com/vectorize/) (Policy context retrieval)

---

## 🚀 Key Features

- **"Ask Zenith"**: Conversational search powered by RAG. Ask about Austin office access, PTO, or lunch expenses.
- **Agentic Actions**: Click "Weekly Sync" to have Zenith automatically log a new coordination task in the D1 database.
- **Enterprise UI**: A premium, "Cloudflare-grade" dashboard following the `cf-ui` design language.

---

## 🚦 Local Development

To run this project locally on your machine:

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v20+)
- `wrangler` CLI (installed via `npm install -g wrangler`)

### 2. Backend Setup (Cloudflare Worker)
```bash
cd zenith/backend
npm install
# Initialize the local D1 database
npx wrangler d1 execute zenith-db --local --file=migrations/0000_init.sql
# Start the worker locally
npx wrangler dev --port 8787 --local
```

### 3. Frontend Setup (Next.js)
```bash
cd zenith/frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to interact with Zenith.

---

## ☁️ Deployment (Cloudflare Edge)

To deploy to production:
1. Create a D1 database: `npx wrangler d1 create zenith-db`
2. Update the `database_id` in `backend/wrangler.jsonc`.
3. Create a Vectorize index: `npx wrangler vectorize create zenith-policies --dimensions=384 --metric=cosine`
4. Deploy: `npx wrangler deploy` in both root and frontend folders.

---

## 📂 Project Structure

```text
zenith/
├── backend/            # Cloudflare Worker (TypeScript)
│   ├── src/index.ts    # Agent routing, AI logic, and D1 operations
│   ├── migrations/     # D1 SQL schemas
│   └── wrangler.jsonc  # Cloudflare configuration
└── frontend/           # Next.js Application
    ├── src/app/        # Dashboard UI
    └── tailwind.config # Cloudflare-inspired theme tokens
```

---

*“Helping build a better Internet, one internally smarter worker at a time.”* 🧡
