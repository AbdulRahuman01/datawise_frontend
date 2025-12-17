import { useState, useEffect } from "react";
import "../index.css";
import { useNavigate, Link } from "react-router-dom";

// 💾 HELPER: Function to load data safely from localStorage
const loadFromLocalStorage = (key, defaultValue) => {
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Error parsing localStorage key:", key, e);
      return defaultValue;
    }
  }
  return defaultValue;
};

export default function Chat() {
  const [question, setQuestion] = useState("");
  const navigate = useNavigate();

  const username = localStorage.getItem("username") || "guest";

  const [messages, setMessages] = useState(() =>
    loadFromLocalStorage(`currentChatMessages_${username}`, [])
  );

  const [history, setHistory] = useState(() =>
    loadFromLocalStorage(`chatHistory_${username}`, [])
  );

  const [chatId, setChatId] = useState(() => {
    const activeId = loadFromLocalStorage(`activeChatId_${username}`, null);
    return activeId || Date.now();
  });

  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem(`currentChatMessages_${username}`, JSON.stringify(messages));
  }, [messages, username]);

  useEffect(() => {
    localStorage.setItem(`chatHistory_${username}`, JSON.stringify(history));
    localStorage.setItem(`activeChatId_${username}`, chatId.toString());
  }, [history, chatId, username]);

  useEffect(() => {
    const demoQuestion = localStorage.getItem("autoDemoQuestion");
    const forceNewChat = localStorage.getItem("forceNewChat");

    if (demoQuestion) {
      if (forceNewChat) {
        const newId = Date.now();
        setMessages([]);
        setChatId(newId);
        localStorage.removeItem("forceNewChat");
      }
      setQuestion(demoQuestion);
      localStorage.removeItem("autoDemoQuestion");
      setTimeout(() => sendMessage(demoQuestion), 600);
    }
  }, []);

  const sendMessage = async (overrideQuestion = null) => {
    const userQuestion = (overrideQuestion || question).trim();
    if (!userQuestion) return;
  
    const currentMessages = [...messages, { role: "user", text: userQuestion }];
    setMessages(currentMessages);
    setQuestion("");
    setIsLoading(true);
  
    try {
      const res = await fetch(`${API_BASE_URL}/api/query/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userQuestion }),
      });
  
      const data = await res.json();
      const newAIMessage = {
        role: "ai",
        sql: data.sql,
        result: data.result,
        explanation: data.explanation,
      };
  
      const updatedMessages = [...currentMessages, newAIMessage];
      setMessages(updatedMessages);
  
      const newHistoryEntry = {
        id: chatId,
        title: userQuestion.length > 40 ? userQuestion.substring(0, 40) + "..." : userQuestion,
        messages: updatedMessages,
      };
  
      setHistory((prev) => {
        const idx = prev.findIndex((item) => item.id === chatId);
        if (idx !== -1) {
          const copy = [...prev];
          copy[idx] = newHistoryEntry;
          return copy;
        }
        return [newHistoryEntry, ...prev];
      });
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewChat = () => {
    const newId = Date.now();
    setMessages([]);
    setChatId(newId);
  };

  const loadHistoryChat = (item) => {
    setMessages(item.messages);
    setChatId(item.id);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="h-screen w-full bg-gray-50 text-black flex overflow-hidden font-sans">
      
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed lg:static top-0 left-0 h-full w-72 bg-white border-r border-gray-200 
        flex flex-col z-50 transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="p-6 flex items-center justify-between border-b border-gray-50">
          <Link to="/" className="font-bold text-lg tracking-tighter">Datawise AI</Link>
          <button className="lg:hidden text-gray-400" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        <div className="p-4">
          <button
            className="w-full bg-black text-white py-3 rounded-sm font-bold text-sm hover:bg-gray-800 transition shadow-sm"
            onClick={startNewChat}
          >
            + NEW QUERY
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2">
          <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-4 px-2">Recent History</h2>
          <div className="space-y-1">
            {history.map((item) => (
              <button
                key={item.id}
                className={`w-full text-left p-3 rounded-sm text-sm truncate transition-colors
                  ${item.id === chatId ? 'bg-gray-100 font-bold border-l-2 border-black' : 'hover:bg-gray-50 text-gray-600'}`}
                onClick={() => loadHistoryChat(item)}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold capitalize">
              {username[0]}
            </div>
            <div className="truncate">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-tighter">User</p>
              <p className="text-sm font-bold truncate">{username}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-2.5 text-xs font-bold text-red-600 border border-red-100 hover:bg-red-50 rounded-sm transition"
          >
            LOGOUT
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-full relative">
        
        {/* TOP BAR MOBILE */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b bg-white">
          <button onClick={() => setSidebarOpen(true)} className="text-xl">☰</button>
          <span className="font-bold text-sm tracking-tighter">Datawise AI</span>
          <div className="w-6" />
        </header>

        {/* MESSAGES AREA */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-4xl mx-auto py-10 px-6 space-y-10">
            {messages.length === 0 && (
              <div className="h-[60vh] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">What would you like to know?</h3>
                <p className="text-gray-400 max-w-sm">Ask a question about your movies, users, or revenue in plain English.</p>
              </div>
            )}

            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                
                {msg.role === "user" ? (
                  <div className="bg-gray-900 text-white px-5 py-3 rounded-2xl rounded-tr-none max-w-[85%] sm:max-w-md shadow-sm">
                    <p className="text-sm sm:text-base leading-relaxed">{msg.text}</p>
                  </div>
                ) : (
                  <div className="w-full space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-none w-8 h-8 bg-black text-white flex items-center justify-center rounded-sm text-[10px] font-bold">AI</div>
                      <div className="flex-1 space-y-6">
                        
                        {/* SQL BLOCK */}
                        <div className="bg-gray-50 border border-gray-100 rounded-sm overflow-hidden">
                          <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center bg-gray-100/50">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Generated SQL</span>
                          </div>
                          <pre className="p-4 text-xs sm:text-sm font-mono text-blue-700 overflow-x-auto">
                            {msg.sql}
                          </pre>
                        </div>

                        {/* EXPLANATION */}
                        {msg.explanation && (
                          <div className="prose prose-sm max-w-none">
                            <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Analysis</h4>
                            <p className="text-gray-700 leading-relaxed italic border-l-2 border-gray-200 pl-4">{msg.explanation}</p>
                          </div>
                        )}

                        {/* RESULT TABLE */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Query Results</h4>
                          {Array.isArray(msg.result) && msg.result.length > 0 ? (
                            <div className="border border-gray-100 rounded-sm overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-100">
                                <thead className="bg-gray-50">
                                  <tr>
                                    {Object.keys(msg.result[0]).map((col, i) => (
                                      <th key={i} className="px-4 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                                        {col}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-50">
                                  {msg.result.map((row, ri) => (
                                    <tr key={ri} className="hover:bg-gray-50 transition-colors">
                                      {Object.values(row).map((val, ci) => (
                                        <td key={ci} className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                                          {val?.toString()}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-400 italic">No data returned for this query.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* LOADING STATE */}
            {isLoading && (
              <div className="flex gap-4 animate-pulse">
                <div className="w-8 h-8 bg-gray-100 rounded-sm"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-gray-100 rounded w-1/4"></div>
                  <div className="h-20 bg-gray-50 rounded"></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* INPUT AREA */}
        <div className="bg-white border-t border-gray-100 p-6">
          <div className="max-w-4xl mx-auto relative flex items-center">
            <input
              type="text"
              className="w-full p-4 pr-32 bg-gray-50 border border-gray-200 rounded-sm outline-none focus:border-black focus:bg-white transition-all text-sm"
              placeholder="Query your data (e.g., 'What are the top 5 movies by rating?')"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !isLoading && sendMessage()}
              disabled={isLoading}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!question.trim() || isLoading}
              className="absolute right-2 px-6 py-2 bg-black text-white text-xs font-bold rounded-sm hover:bg-gray-800 disabled:bg-gray-200 transition-colors"
            >
              {isLoading ? "RUNNING..." : "RUN QUERY"}
            </button>
          </div>
          <p className="max-w-4xl mx-auto mt-3 text-[10px] text-gray-400 uppercase tracking-widest text-center lg:text-left">
            Datawise AI v1.0 • Connected to Demo Database
          </p>
        </div>
      </main>
    </div>
  );
}