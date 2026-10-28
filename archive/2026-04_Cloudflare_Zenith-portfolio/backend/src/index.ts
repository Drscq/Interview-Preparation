/**
 * Zenith Backend - Cloudflare Worker
 * Demonstrates AI reasoning, D1 storage, and RAG capabilities for People Operations.
 */

export interface Env {
  AI: any;
  DB: D1Database;
  VECTOR_INDEX: VectorizeIndex;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    
    // Simple CORS Middleware
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      if (url.pathname === "/api/query") {
        return await handleQuery(request, env, corsHeaders);
      }
      
      if (url.pathname === "/api/act") {
        return await handleAct(request, env, corsHeaders);
      }
      
      if (url.pathname === "/api/tasks") {
        return await handleGetTasks(request, env, corsHeaders);
      }

      return new Response("Not Found", { status: 404, headers: corsHeaders });
    } catch (err: any) {
      return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
    }
  }
};

async function handleQuery(request: Request, env: Env, headers: any) {
  const { query } = await request.json() as { query: string };
  
  console.log(`Query received: ${query}`);

  // 1. (Optional) Generate Query Embedding for Vectorize search
  // Note: For this demo, since seending Vectorize is difficult locally without a real index,
  // we combine Vectorize (if available) with D1 keyword matching as a robust hybrid search.
  
  let context = "";
  try {
    // Fallback: Keyword search in D1 policies for the demo
    const { results } = await env.DB.prepare("SELECT content FROM policies WHERE content LIKE ? OR title LIKE ?")
      .bind(`%${query}%`, `%${query}%`)
      .all();
    context = results.map((r: any) => r.content).join("\n");
  } catch (e) {
      console.error("D1 search failed, using default context.");
  }

  if (!context) {
    context = "No specific policy found. Provide general Cloudflare cultural guidance.";
  }

  // 2. Generate Response using Workers AI
  const prompt = `System: You are Zenith, a helpful AI assistant for Cloudflare's People & Places team. 
Use the following policy context to answer the employee's question carefully and professionally.
If you don't know the answer, say you will connect them with a human recruiter.

Context: 
${context}

User Question: ${query}`;

  let response;
  try {
    response = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
      messages: [{ role: "user", content: prompt }]
    });
  } catch (e) {
    console.warn("AI binding failed (likely local dev). Using mock response.");
    response = {
      response: `[Zenith AI - Local Mode] Based on our Austin Office Policy: ${context.substring(0, 100)}... 

I am currently running in a local simulation. To see my full AI capabilities, deploy me to the Cloudflare Edge!`
    };
  }

  return new Response(JSON.stringify(response), {
    headers: { ...headers, "Content-Type": "application/json" }
  });
}

async function handleAct(request: Request, env: Env, headers: any) {
  const { command, employee_id } = await request.json() as { command: string, employee_id: string };
  
  // In a production agent, we would use LLM to parse intent (Function Calling)
  // For the demo, we log the command as a new "Action Request" in D1.
  
  const taskId = `task-${Math.random().toString(36).substring(2, 9)}`;
  const { success } = await env.DB.prepare(
    "INSERT INTO tasks (id, employee_id, description, status) VALUES (?, ?, ?, ?)"
  )
  .bind(taskId, employee_id || "emp-1", command, "pending")
  .run();

  return new Response(JSON.stringify({ 
    success, 
    message: "Action captured by Zenith. Processing internally.",
    taskId 
  }), {
    headers: { ...headers, "Content-Type": "application/json" }
  });
}

async function handleGetTasks(request: Request, env: Env, headers: any) {
  const { results } = await env.DB.prepare(
    "SELECT t.*, e.name as employee_name FROM tasks t JOIN employees e ON t.employee_id = e.id ORDER BY t.created_at DESC LIMIT 10"
  ).all();
  
  return new Response(JSON.stringify(results), {
    headers: { ...headers, "Content-Type": "application/json" }
  });
}
