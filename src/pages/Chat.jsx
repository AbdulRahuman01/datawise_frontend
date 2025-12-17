import { useState, useEffect } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";

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

  // ⭐ USERNAME FOR USER-BASED STORAGE
  const username = localStorage.getItem("username") || "guest";

  // ⭐ LOAD INITIAL STATE FROM LOCAL STORAGE (user-specific)
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

  // ✅ BACKEND BASE URL (ENV BASED)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // 🔐 AUTH CHECK
  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/login");
    }
  }, [navigate]);

  // 💾 SAVE MESSAGES
  useEffect(() => {
    localStorage.setItem(
      `currentChatMessages_${username}`,
      JSON.stringify(messages)
    );
  }, [messages, username]);

  // 💾 SAVE HISTORY + ACTIVE CHAT
  useEffect(() => {
    localStorage.setItem(
      `chatHistory_${username}`,
      JSON.stringify(history)
    );

    localStorage.setItem(
      `activeChatId_${username}`,
      chatId.toString()
    );

    const currentChat = history.find((item) => item.id === chatId);
    if (currentChat) {
      localStorage.setItem(
        `currentChatMessages_${username}`,
        JSON.stringify(currentChat.messages)
      );
    }
  }, [history, chatId, username]);

  // 🚀 AUTO DEMO QUESTION HANDLER (🔥 THIS IS THE FIX)
  useEffect(() => {
    const demoQuestion = localStorage.getItem("autoDemoQuestion");
    const forceNewChat = localStorage.getItem("forceNewChat");

    if (demoQuestion) {
      if (forceNewChat) {
        const newId = Date.now();
        setMessages([]);
        setChatId(newId);

        localStorage.setItem(
          `currentChatMessages_${username}`,
          JSON.stringify([])
        );
        localStorage.setItem(
          `activeChatId_${username}`,
          newId.toString()
        );

        localStorage.removeItem("forceNewChat");
      }

      setQuestion(demoQuestion);
      localStorage.removeItem("autoDemoQuestion");

      setTimeout(() => {
        sendMessage(demoQuestion);
      }, 600);
    }
  }, []);

  // 📤 SEND MESSAGE
  const sendMessage = async (overrideQuestion = null) => {
    const finalQuestion = overrideQuestion || question;
    if (!finalQuestion.trim()) return;

    const currentMessages = [
      ...messages,
      { role: "user", text: finalQuestion },
    ];

    setMessages(currentMessages);
    setQuestion("");
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/query/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: finalQuestion }),
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
        title:
          finalQuestion.length > 50
            ? finalQuestion.substring(0, 50) + "..."
            : finalQuestion,
        messages: updatedMessages,
      };

      setHistory((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === chatId);
        if (existingIndex !== -1) {
          const updated = [...prev];
          updated[existingIndex] = newHistoryEntry;
          return updated;
        } else {
          return [newHistoryEntry, ...prev];
        }
      });

    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ➕ NEW CHAT
  const startNewChat = () => {
    const newId = Date.now();
    setMessages([]);
    setChatId(newId);

    localStorage.setItem(
      `currentChatMessages_${username}`,
      JSON.stringify([])
    );
    localStorage.setItem(
      `activeChatId_${username}`,
      newId.toString()
    );
  };

  // 📂 LOAD OLD CHAT
  const loadHistoryChat = (item) => {
    setMessages(item.messages);
    setChatId(item.id);

    localStorage.setItem(
      `activeChatId_${username}`,
      item.id.toString()
    );
    localStorage.setItem(
      `currentChatMessages_${username}`,
      JSON.stringify(item.messages)
    );

    setSidebarOpen(false);
  };

  // 🚪 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  

  // 🌟 UI (FULL UI - UNCHANGED)
  return (
    <div className="h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white flex relative overflow-hidden">

      {/* MOBILE MENU BUTTON */}
      <button
        className="lg:hidden absolute top-4 left-4 bg-white/10 p-3 rounded-xl backdrop-blur-md border border-white/20 shadow-md z-50"
        onClick={() => setSidebarOpen(true)}
      >
        ☰
      </button>

      {/* SIDEBAR */}
      <div
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-white/10 backdrop-blur-xl 
        border-r border-white/20 p-4 flex flex-col gap-4 transform transition-transform duration-300 z-40
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <button
          className="lg:hidden mb-4 text-white text-xl"
          onClick={() => setSidebarOpen(false)}
        >
          ✕
        </button>

        <button
          className="w-full bg-cyan-600 hover:bg-cyan-700 py-3 font-semibold rounded-xl shadow-lg transition text-white"
          onClick={startNewChat}
        >
          + New Chat
        </button>

        <h2 className="text-sm font-bold text-white/60 uppercase tracking-widest pt-2 border-t border-white/10">
          History
        </h2>

        <div className="flex-1 overflow-y-auto space-y-2">
          {history.map((item) => (
            <div
              key={item.id}
              className={`p-3 border rounded-xl cursor-pointer transition text-sm truncate
                ${item.id === chatId ? 'bg-white/20 border-cyan-500' : 'bg-white/10 border-white/10 hover:bg-white/15'}`}
              onClick={() => loadHistoryChat(item)}
            >
              {item.title}
            </div>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-white/10">
          <p className="text-white/70 text-sm mb-3">
            Logged in as:{" "}
            <span className="text-cyan-300 font-semibold">
              {localStorage.getItem("username") || "User"}
            </span>
          </p>

          <button
            onClick={handleLogout}
            className="w-full bg-red-600/80 hover:bg-red-700 py-2.5 rounded-xl shadow-lg text-sm font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* MAIN CHAT AREA */}
      <div className="flex-1 flex justify-center items-center p-2 sm:p-4">
        <div className="w-full max-w-4xl h-[95vh] bg-white/10 backdrop-blur-xl border border-white/20 
         rounded-2xl shadow-2xl flex flex-col overflow-hidden">

          {/* CHAT MESSAGES */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-6">

            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>

                {/* USER */}
                {msg.role === "user" ? (
                  <div className="bg-cyan-600/90 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-xl rounded-br-sm shadow-md max-w-xs sm:max-w-sm text-sm sm:text-base">
                    <b className="text-cyan-100">You:</b>
                    <p>{msg.text}</p>
                  </div>
                ) : (
                  /* AI */
                  <div className="bg-white/10 border border-white/20 backdrop-blur-xl px-4 py-3 sm:px-5 sm:py-4 
                   rounded-xl rounded-tl-sm shadow-lg max-w-full sm:max-w-2xl">

                    <b className="text-cyan-300 block mb-2 text-sm sm:text-base">🤖 AI SQL:</b>

                    <pre className="text-lime-400 whitespace-pre-wrap mt-2 bg-black/30 p-3 rounded-lg border border-cyan-800/30 
                      overflow-x-auto text-xs sm:text-sm font-mono">
                      {msg.sql}
                    </pre>

                    {msg.explanation && (
                      <div className="mt-4 border-t border-white/10 pt-3">
                        <b className="text-fuchsia-300 text-sm sm:text-base">💡 Insight:</b>
                        <p className="mt-1 text-white/90 text-xs sm:text-sm">{msg.explanation}</p>
                      </div>
                    )}

                    <b className="text-amber-300 block mt-4 border-t border-white/10 pt-3 text-sm sm:text-base">Result:</b>

                    {Array.isArray(msg.result) && msg.result.length > 0 ? (
                      <div className="mt-2 overflow-x-auto max-h-56">
                        <table className="min-w-full divide-y divide-white/10 rounded-lg text-xs sm:text-sm">
                          <thead className="bg-white/20 sticky top-0">
                            <tr>
                              {Object.keys(msg.result[0]).map((col, i) => (
                                <th key={i} className="p-2 border border-white/10 text-white/80 uppercase text-left text-xs">
                                  {col}
                                </th>
                              ))}
                            </tr>
                          </thead>

                          <tbody className="divide-y divide-white/10">
                            {msg.result.map((row, ri) => (
                              <tr key={ri} className="hover:bg-white/5 transition">
                                {Object.values(row).map((val, ci) => (
                                  <td key={ci} className="p-2 border border-white/10 text-gray-200">
                                    {val}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-gray-400 mt-2 text-sm italic">No data returned.</p>
                    )}
                  </div>
                )}

              </div>
            ))}

            {/* LOADING */}
            {isLoading && (
              <div className="flex">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-3 rounded-xl shadow-lg max-w-xs">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-cyan-200 rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-white/60 mt-2 text-xs">AI is thinking...</p>
                </div>
              </div>
            )}

          </div>

          {/* INPUT BAR */}
          <div className="p-3 sm:p-4 bg-black/30 backdrop-blur-xl border-t border-white/10 flex gap-2 sm:gap-3">
            <input
              type="text"
              className="flex-1 p-2 sm:p-3 bg-white/10 border border-white/20 rounded-xl outline-none 
              text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 text-sm sm:text-base"
              placeholder="Ask something..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-cyan-600 hover:bg-cyan-700 transition rounded-xl shadow-lg 
              text-sm sm:text-base disabled:bg-gray-500"
              disabled={!question.trim() || isLoading}
            >
              Send
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
