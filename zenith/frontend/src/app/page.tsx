"use client";
import React, { useState, useEffect } from 'react';

/**
 * Zenith Dashboard - Main UI for the AI-Native People Experience Agent.
 */
export default function ZenithDashboard() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Use the local worker URL for development
  const WORKER_URL = 'http://localhost:8787';

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${WORKER_URL}/api/tasks`);
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
    } catch (e) {
      console.error("Failed to fetch tasks. Ensure the Cloudflare Worker is running locally at localhost:8787");
    }
  };

  useEffect(() => {
    fetchTasks();
    // Refresh tasks every 10 seconds
    const interval = setInterval(fetchTasks, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch(`${WORKER_URL}/api/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      
      const data = await res.json();
      // Handle different Workers AI response formats (some models return direct string, others nested JSON)
      const content = typeof data === 'string' ? data : (data.response || data.choices?.[0]?.message?.content || JSON.stringify(data));
      setResponse(content);
    } catch (e) {
      setResponse("⚠️ Connection Error: I couldn't reach the Zenith Backend. Please ensure the backend worker is running with 'npx wrangler dev'.");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (command: string) => {
    try {
      const res = await fetch(`${WORKER_URL}/api/act`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command, employee_id: 'emp-1' }),
      });
      if (res.ok) {
        fetchTasks();
        alert(`Action Received: Zenith is now processing "${command}"`);
      }
    } catch (e) {
      console.error("Action transmission failed.");
    }
  };

  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12 border-b pb-6 border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#F38020] rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg ring-4 ring-orange-100">Z</div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-[#056BE1]">ZENITH</h1>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">People Innovation Lab | Cloudflare</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 pr-4 rounded-full border border-gray-100 shadow-sm">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold ring-2 ring-white">AR</div>
          <div className="text-sm">
            <p className="font-bold text-gray-800">Alex Rivers</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase">Software Engineer Intern</p>
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Agent Interface */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white border-2 border-[#056BE1] rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-[#056BE1] p-8 text-white">
              <h2 className="text-2xl font-black mb-3">Hi Alex! How can I help you today? 👋</h2>
              <p className="text-blue-100 font-medium leading-relaxed opacity-90">
                I'm your AI-native teammate, designed to make your journey at Cloudflare smoother. 
                Whether you need to check office policies, book meetings, or request leave, I've got you covered.
              </p>
            </div>
            
            <div className="p-8 bg-white">
              <form onSubmit={handleQuery} className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask about Austin office access, PTO rules, or employee benefits..." 
                  className="flex-1 px-5 py-4 rounded-xl border-2 border-gray-100 text-gray-800 outline-none focus:border-[#056BE1] focus:ring-4 focus:ring-blue-50 transition-all font-medium text-lg"
                />
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="bg-[#F38020] hover:bg-[#D66B10] disabled:bg-gray-300 text-white px-8 py-4 rounded-xl font-black text-lg transition-all active:scale-95 shadow-lg shadow-orange-200"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                       <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                       Thinking...
                    </span>
                  ) : "Ask Zenith"}
                </button>
              </form>
            </div>
          </section>

          {response && (
            <section className="bg-[#F8FBFF] border-2 border-blue-100 rounded-2xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-sm relative group">
              <div className="absolute -top-4 left-6 bg-white border-2 border-blue-100 px-4 py-1 rounded-full text-[#056BE1] font-black text-xs uppercase tracking-widest shadow-sm">
                Zenith Intel Engine
              </div>
              <div className="prose prose-blue max-w-none text-gray-800 font-medium leading-relaxed whitespace-pre-wrap">
                {response}
              </div>
            </section>
          )}

          {/* Quick Actions Grid */}
          <div>
             <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Empowerment Toolkit</h3>
             <div className="grid sm:grid-cols-2 gap-4">
                <button onClick={() => handleAction("I need to book a 1:1 with my manager.")} className="group p-6 bg-white border border-gray-100 rounded-2xl hover:border-[#056BE1] hover:shadow-xl hover:shadow-blue-50 transition-all text-left">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">📅</div>
                  <h3 className="font-black text-gray-800 text-lg mb-1">Weekly Sync</h3>
                  <p className="text-sm text-gray-500 font-medium">Auto-schedule your manager 1:1</p>
                </button>
                <button onClick={() => handleAction("Request 2 days of PTO for next month.")} className="group p-6 bg-white border border-gray-100 rounded-2xl hover:border-[#F38020] hover:shadow-xl hover:shadow-orange-50 transition-all text-left">
                  <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform">🏖️</div>
                  <h3 className="font-black text-gray-800 text-lg mb-1">Time Off</h3>
                  <p className="text-sm text-gray-500 font-medium">Lodge a quick PTO request</p>
                </button>
             </div>
          </div>
        </div>

        {/* Intelligence Sidebar */}
        <div className="space-y-8">
          <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-black text-gray-800 uppercase tracking-tighter text-lg">Activity Feed</h2>
              <span className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-black uppercase rounded-full">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"></span>
                Connected
              </span>
            </div>
            <div className="space-y-6">
              {tasks.length > 0 ? tasks.map((task: any) => (
                <div key={task.id} className="relative pl-6 border-l-2 border-gray-100">
                  <div className="absolute top-0 -left-[5px] w-2 h-2 rounded-full bg-blue-500"></div>
                  <p className="text-[10px] font-bold text-gray-400 mb-1">{new Date(task.created_at).toLocaleDateString()}</p>
                  <p className="text-sm font-bold text-gray-700 leading-tight">{task.description}</p>
                  <div className="mt-2 inline-block px-2 py-0.5 bg-blue-50 text-[10px] font-black text-blue-600 rounded uppercase">
                    Status: {task.status}
                  </div>
                </div>
              )) : (
                <div className="py-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  <p className="text-xs text-gray-400 font-bold uppercase">No interaction history</p>
                </div>
              )}
            </div>
          </section>

          <section className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-2xl p-6 text-white shadow-lg">
             <div className="flex items-center gap-2 mb-4">
               <span className="text-xl">📍</span>
               <h2 className="font-black uppercase tracking-tighter">Austin | Guide</h2>
             </div>
             <p className="text-xs text-blue-200 font-medium mb-6 opacity-80">Quick links for the local team.</p>
             <div className="space-y-3">
               {['Visitor Registration', 'Equipment Request', 'Desk Booking'].map(link => (
                 <a key={link} href="#" className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors group">
                   <span className="text-sm font-bold">{link}</span>
                   <span className="text-blue-300 group-hover:translate-x-1 transition-transform">→</span>
                 </a>
               ))}
             </div>
          </section>
        </div>
      </div>
    </main>
  );
}
