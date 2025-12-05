import { Link } from "react-router-dom";
import "../index.css";

export default function Landing() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white p-4 sm:p-6">

      {/* ⭐ NAVBAR — MODERN & SLEEK */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 py-4">

        <h1 className="text-2xl font-bold bg-white/5 px-4 py-2 rounded-xl backdrop-blur-lg border border-cyan-800/50 text-center text-cyan-400">
          DataWise AI
        </h1>


        {/* Buttons */}
        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded-xl bg-cyan-600/80 hover:bg-cyan-500 transition shadow-lg shadow-cyan-500/30 backdrop-blur-lg text-sm sm:text-base text-white font-semibold"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-4 py-2 rounded-xl bg-cyan-600/80 hover:bg-cyan-500 transition shadow-lg shadow-cyan-500/30 backdrop-blur-lg text-sm sm:text-base text-white font-semibold"
          >
            Signup
          </Link>
        </div>

      </div>

      {/* ⭐ HERO SECTION — NEON GLOW */}
      <div className="max-w-6xl mx-auto text-center mt-12 sm:mt-24 px-2">

        <h2 className="text-3xl sm:text-5xl font-extrabold text-cyan-400 drop-shadow-lg shadow-cyan-500/50 leading-tight">
          Your AI-Powered Data Analyst Copilot
        </h2>

        <p className="text-gray-300 mt-4 sm:mt-6 text-base sm:text-xl max-w-2xl mx-auto">
          Ask questions about your data in simple English.  
          Get SQL queries, insights, and clear explanations — instantly.
        </p>

        {/* Buttons responsive */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 px-6">

          <Link
            to="/learn"
            className="px-6 sm:px-8 py-3 bg-gray-800/50 border border-cyan-500/50 rounded-xl shadow-xl hover:bg-gray-700/50 transition text-lg text-center font-medium text-cyan-400"
          >
            Learn More
          </Link>

        </div>
      </div>

      {/* ⭐ FEATURES — RESPONSIVE GRID (MODERN CARDS) */}
      <div className="max-w-6xl mx-auto mt-16 sm:mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2">

        <div className="bg-gray-800/60 backdrop-blur-xl p-6 rounded-xl border border-cyan-500/50 shadow-2xl shadow-cyan-900/40">
          <h3 className="text-xl font-bold text-cyan-400">Natural Language → SQL</h3>
          <p className="text-gray-300 mt-2 text-sm sm:text-base">
            Ask anything. AI generates optimized SQL for you.
          </p>
        </div>

        <div className="bg-gray-800/60 backdrop-blur-xl p-6 rounded-xl border border-cyan-500/50 shadow-2xl shadow-cyan-900/40">
          <h3 className="text-xl font-bold text-cyan-400">Instant Insights</h3>
          <p className="text-gray-300 mt-2 text-sm sm:text-base">
            Get business explanations like a real data analyst.
          </p>
        </div>

        <div className="bg-gray-800/60 backdrop-blur-xl p-6 rounded-xl border border-cyan-500/50 shadow-2xl shadow-cyan-900/40">
          <h3 className="text-xl font-bold text-cyan-400">Works with Any SQL DB</h3>
          <p className="text-gray-300 mt-2 text-sm sm:text-base">
            Connect easily with MySQL or any SQL-based system.
          </p>
        </div>

      </div>

      {/* ⭐ FOOTER */}
      <div className="max-w-6xl mx-auto text-center mt-20 sm:mt-24 text-gray-500 text-sm">
        © 2025 DataWise AI · All rights reserved.
      </div>
    </div>
  );
}