import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  // ✅ BACKEND BASE URL (ENV BASED)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");

    if (!form.username || !form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/signup/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed.");
        return;
      }

      navigate("/login");

    } catch (err) {
      console.error("Signup error:", err);
      setError("Unable to connect to server. Please try again.");
    }
  };

  return (
    <div className="
      min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-gray-950 via-gray-900 to-black 
      text-white p-4 sm:p-6
    ">
      <div className="
        w-full max-w-sm sm:max-w-md 
        bg-gray-800/60 backdrop-blur-xl border border-cyan-500/50 
        rounded-2xl shadow-2xl shadow-cyan-900/40 p-6 sm:p-8
      ">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-cyan-400">
          Create Account
        </h2>

        {error && (
          <p className="text-red-400 text-center mb-4 text-sm sm:text-base">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Username"
          className="
            w-full p-2 sm:p-3 bg-white/10 
            border border-white/20 rounded-xl outline-none mb-4
            text-sm sm:text-base
            focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500
          "
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="
            w-full p-2 sm:p-3 bg-white/10 
            border border-white/20 rounded-xl outline-none mb-4
            text-sm sm:text-base
            focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500
          "
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="
            w-full p-2 sm:p-3 bg-white/10 
            border border-white/20 rounded-xl outline-none mb-6
            text-sm sm:text-base
            focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500
          "
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleSignup}
          className="
            w-full bg-cyan-600 py-2 sm:py-3 
            rounded-xl hover:bg-cyan-500 transition 
            shadow-lg shadow-cyan-600/40 mb-4
            text-sm sm:text-base font-semibold
          "
        >
          Sign Up
        </button>

        <div className="mt-5 mb-4">
          <button
            onClick={() => navigate("/")}
            className="
              w-full text-center py-3 px-4 text-sm font-semibold 
              text-cyan-400 border border-cyan-500/50 rounded-xl 
              hover:bg-gray-700/50 transition duration-150
            "
          >
            🏠 Back to Landing Page
          </button>
        </div>

        <p className="text-center text-white/60 text-sm sm:text-base">
          Already have an account?{" "}
          <a href="/login" className="text-cyan-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
