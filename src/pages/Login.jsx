import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  // ✅ BACKEND BASE URL (ENV BASED)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/login/`, {
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

    } catch (err) {
      console.error("Login error:", err);
      setError("Unable to connect to server. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-white text-black antialiased">
      
      {/* MINIMAL HEADER / LOGO */}
      <header className="p-6 md:px-12">
        <Link to="/" className="text-xl font-bold tracking-tighter">
          Datawise AI
        </Link>
      </header>

      {/* LOGIN FORM CONTAINER */}
      <main className="flex-1 flex items-center justify-center px-6 pb-20">
        <div className="w-full max-w-md">
          
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Welcome back
            </h2>
            <p className="text-gray-500">
              Enter your credentials to access your data dashboard.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-400">
                Username
              </label>
              <input
                type="text"
                placeholder="e.g. alex_data"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-sm outline-none focus:border-black transition-colors"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-400">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-sm outline-none focus:border-black transition-colors"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-black text-white py-4 mt-4 font-bold hover:bg-gray-800 transition-all rounded-sm shadow-lg shadow-gray-200"
            >
              Sign In
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-400">Or continue with</span>
              </div>
            </div>

            <button
              onClick={() => navigate("/")}
              className="w-full py-4 border border-gray-200 font-medium hover:bg-gray-50 transition rounded-sm text-sm"
            >
              Back to Home
            </button>
          </div>

          <p className="mt-10 text-center text-gray-500 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-black font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-8 text-center text-xs text-gray-400 border-t border-gray-50">
        © 2025 Datawise AI — Secure Data Access
      </footer>
    </div>
  );
}