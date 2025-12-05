import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!form.username || !form.password) {
      setError("Please enter both username and password.");
      return;
    }

    // ⭐ NOTE: Only one set of localStorage calls is needed, fixing redundancy here
    const res = await fetch("http://127.0.0.1:8000/api/users/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Login failed. Invalid username or password.");
      return;
    }

    localStorage.setItem("access_token", data.access);
    localStorage.setItem("username", form.username);
    navigate("/app");
  };

  return (
    <div className="
      min-h-screen flex items-center justify-center 
      // ⭐ BACKGROUND MATCHES DARK TECH GRADIENT
      bg-gradient-to-br from-gray-950 via-gray-900 to-black 
      text-white p-4 sm:p-6
    ">
      <div className="
        w-full max-w-sm sm:max-w-md 
        // ⭐ CONTAINER STYLING MATCHES CARDS
        bg-gray-800/60 backdrop-blur-xl 
        border border-cyan-500/50 rounded-2xl shadow-2xl shadow-cyan-900/40
        p-6 sm:p-8
      ">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-cyan-400">
          Welcome Back
        </h2>

        {error && (
          <p className="text-red-400 text-center mb-4 text-sm sm:text-base">{error}</p>
        )}

        <input
          type="text"
          placeholder="Username"
          className="
            w-full p-2 sm:p-3 
            bg-white/10 border border-white/20 
            rounded-xl outline-none mb-4 text-sm sm:text-base
            // ⭐ INPUT FOCUS MATCHES ACCENT
            focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500
          "
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="
            w-full p-2 sm:p-3 
            bg-white/10 border border-white/20 
            rounded-xl outline-none mb-6 text-sm sm:text-base
            // ⭐ INPUT FOCUS MATCHES ACCENT
            focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500
          "
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleLogin}
          className="
            w-full bg-cyan-600 py-2 sm:py-3 
            // ⭐ LOGIN BUTTON MATCHES ACCENT
            rounded-xl hover:bg-cyan-500 transition shadow-lg shadow-cyan-600/40 mb-4 
            text-sm sm:text-base font-semibold
          "
        >
          Login
        </button>
        
        <div className="mt-5 mb-4">
            <button 
                onClick={() => navigate("/")}
                className="
                    w-full text-center py-3 px-4 text-sm font-semibold 
                    // ⭐ BACK BUTTON GHOST STYLE MATCHES THEME
                    text-cyan-400 border border-cyan-500/50 rounded-xl 
                    hover:bg-gray-700/50 transition duration-150
                "
            >
                🏠 Back to Landing Page
            </button>
        </div>
        
        <p className="text-center text-white/60 text-sm sm:text-base">
          Don't have an account?{" "}
          <a href="/signup" className="text-cyan-400 hover:underline">
            Signup
          </a>
        </p>
      </div>
    </div>
  );
}