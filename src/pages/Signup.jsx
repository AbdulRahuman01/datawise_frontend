import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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
    <div className="min-h-screen w-full flex flex-col bg-white text-black antialiased">
      
      {/* HEADER / LOGO */}
      <header className="p-6 md:px-12">
        <Link to="/" className="text-xl font-bold tracking-tighter">
          Datawise AI
        </Link>
      </header>

      {/* SIGNUP FORM CONTAINER */}
      <main className="flex-1 flex items-center justify-center px-6 pb-20">
        <div className="w-full max-w-md">
          
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Create an account
            </h2>
            <p className="text-gray-500">
              Start asking questions about your data in seconds.
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
                placeholder="Choose a username"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-sm outline-none focus:border-black transition-colors"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-400">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-sm outline-none focus:border-black transition-colors"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-400">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a strong password"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-sm outline-none focus:border-black transition-colors"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button
              onClick={handleSignup}
              className="w-full bg-black text-white py-4 mt-4 font-bold hover:bg-gray-800 transition-all rounded-sm shadow-lg shadow-gray-200"
            >
              Get Started
            </button>

            

            <button
              onClick={() => navigate("/")}
              className="w-full py-4 border border-gray-200 font-medium hover:bg-gray-50 transition rounded-sm text-sm"
            >
              Back to Home
            </button>
          </div>

          <p className="mt-10 text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-black font-bold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-8 text-center text-xs text-gray-400 border-t border-gray-50">
        © 2025 Datawise AI — Your data is handled securely.
      </footer>
    </div>
  );
}