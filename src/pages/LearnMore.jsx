import { Link } from "react-router-dom";

export default function LearnMore() {
  return (
    // ⭐ BACKGROUND MATCHES DARK TECH GRADIENT
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white p-6">
      
      {/* HEADER */}
      <div className="max-w-5xl mx-auto text-center mt-10">
        {/* ⭐ H1 TEXT WITH NEON ACCENT */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-cyan-400 drop-shadow-lg">What is DataWise AI?</h1>
        <p className="text-gray-300 mt-4 text-lg sm:text-xl">
          Your personal AI-powered data analyst — built to turn natural language into SQL, and data into insights.
        </p>
      </div>

      {/* SECTION: WHAT IT DOES */}
      {/* ⭐ CONTAINER MATCHES DARK TECH CARDS */}
      <div className="max-w-4xl mx-auto mt-16 bg-gray-800/60 backdrop-blur-xl border border-cyan-500/50 rounded-2xl p-8 shadow-2xl shadow-cyan-900/40">
        <h2 className="text-2xl font-bold mb-4 text-cyan-400">🔍 What can DataWise AI do?</h2>
        <ul className="space-y-3 text-gray-300 text-lg">
          <li>✔ Convert plain English questions into optimized SQL queries</li>
          <li>✔ Execute queries directly on your database</li>
          <li>✔ Display results in clean, readable tables</li>
          <li>✔ Provide professional explanations like a real data analyst</li>
          <li>✔ Store chat history for quick reference</li>
        </ul>
      </div>

      {/* SECTION: WHO CAN USE IT */}
      {/* ⭐ CONTAINER MATCHES DARK TECH CARDS */}
      <div className="max-w-4xl mx-auto mt-12 bg-gray-800/60 backdrop-blur-xl border border-cyan-500/50 rounded-2xl p-8 shadow-2xl shadow-cyan-900/40">
        <h2 className="text-2xl font-bold mb-4 text-cyan-400">👤 Who is this for?</h2>
        <p className="text-gray-300 text-lg">
          DataWise AI is perfect for:
        </p>
        <ul className="space-y-3 mt-3 text-gray-300 text-lg">
          <li>✔ Business owners who want instant insights</li>
          <li>✔ Data analysts who want faster workflows</li>
          <li>✔ Developers who need quick SQL answers</li>
          <li>✔ Students learning SQL and data analytics</li>
        </ul>
      </div>

      {/* SECTION: HOW IT WORKS */}
      {/* ⭐ CONTAINER MATCHES DARK TECH CARDS */}
      <div className="max-w-4xl mx-auto mt-12 bg-gray-800/60 backdrop-blur-xl border border-cyan-500/50 rounded-2xl p-8 shadow-2xl shadow-cyan-900/40">
        <h2 className="text-2xl font-bold mb-4 text-cyan-400">⚙️ How does it work?</h2>
        <ol className="space-y-4 text-gray-300 text-lg">
          <li>1️⃣ You ask a question in simple English.</li>
          <li>2️⃣ AI generates safe, accurate SQL based on your database schema.</li>
          <li>3️⃣ The SQL is executed on your database.</li>
          <li>4️⃣ Results are displayed instantly.</li>
          <li>5️⃣ AI explains the results in simple words.</li>
        </ol>
      </div>

      {/* SECTION: CTA */}
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4 text-cyan-400">Ready to experience it?</h2>
        <p className="text-gray-400 text-lg mb-6">
          Sign up and start analyzing your data in seconds.
        </p>

        <div className="flex justify-center gap-6">
          <Link
            to="/signup"
            // ⭐ NEON ACCENT BUTTON
            className="px-6 py-3 bg-cyan-600 rounded-xl hover:bg-cyan-700 transition text-lg shadow-xl shadow-cyan-600/40 text-white font-semibold"
          >
            Get Started
          </Link>

          <Link
            to="/app"
            // ⭐ GHOST BUTTON MATCHES ACCENT BORDERS
            className="px-6 py-3 bg-gray-800/50 border border-cyan-500/50 rounded-xl hover:bg-gray-700/50 transition text-lg text-cyan-400"
          >
            Try Demo
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center text-gray-500 mt-20">
        © 2025 DataWise AI — Powered by Abdul Rahuman 🔥
      </div>
    </div>
  );
}