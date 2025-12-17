import { Link } from "react-router-dom";
import "../index.css";

export default function Landing() {
  const demoQuestions = [
    "Top 5 highest rated movies",
    "Total revenue",
    "Most popular subscription plan",
    "Movies by genre",
  ];

  return (
    <div className="min-h-screen w-full bg-white text-black antialiased">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center py-5">
          <h1 className="text-xl font-bold tracking-tighter">
            Datawise AI
          </h1>

          <nav className="flex items-center gap-4 md:gap-8 text-sm font-medium">
            <Link to="/login" className="hover:text-gray-600 transition-colors">
              Login
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2 border border-black hover:bg-black hover:text-white transition-all duration-300"
            >
              Signup
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 lg:gap-16 py-16 md:py-28 items-center">
          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-balance">
              Understand Your Data. <br className="hidden md:block" />
              Ask Questions Effortlessly. <br className="hidden md:block" />
              Get Instant Insights.
            </h2>

            <p className="mt-8 text-gray-500 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Transform natural language questions into SQL queries,
              insights, and tables — powered by AI.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link
                to="/signup"
                className="px-8 py-4 bg-black text-white hover:bg-gray-800 transition-colors text-center font-medium"
              >
                Get Started
              </Link>

              <Link
                to="/learn"
                className="px-8 py-4 border border-black hover:bg-gray-50 transition-colors text-center font-medium"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="order-1 lg:order-2 w-full aspect-video lg:aspect-square max-h-[500px] bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 text-sm italic rounded-sm shadow-sm">
            [ Interactive Dashboard Preview ]
          </div>
        </section>

        {/* DEMO NOTICE SECTION */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
          <div className="max-w-4xl mx-auto border border-gray-200 p-8 md:p-12 bg-white shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-md">
                <h3 className="text-xl font-bold mb-3 tracking-tight">
                  Demo Mode Active
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  This app currently runs on sample demo data.
                  Try asking questions related to movies, users, and subscriptions.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-3 lg:justify-end">
                {demoQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      localStorage.setItem("autoDemoQuestion", q);
                      localStorage.setItem("forceNewChat", "true");
                      window.location.href = "/app";
                    }}
                    className="px-4 py-2 border border-black/10 text-xs md:text-sm font-medium hover:border-black hover:bg-black hover:text-white transition-all duration-200 whitespace-nowrap"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-32">
          <div className="flex flex-col">
            <h4 className="font-bold text-lg mb-4 tracking-tight">
              Natural Language → SQL
            </h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Ask questions in plain English and get optimized SQL queries instantly, reducing the barrier between data and decisions.
            </p>
          </div>

          <div className="flex flex-col">
            <h4 className="font-bold text-lg mb-4 tracking-tight">
              Analyst-Level Insights
            </h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Beyond just raw data, our AI explains trends and results with the nuance and clarity of a professional data analyst.
            </p>
          </div>

          <div className="flex flex-col">
            <h4 className="font-bold text-lg mb-4 tracking-tight">
              Built for Real Databases
            </h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Connect your existing infrastructure. Datawise AI works seamlessly with Postgres, MySQL, and other SQL-based systems.
            </p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © 2025 Datawise AI. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs font-medium text-gray-400 uppercase tracking-widest">
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <a href="#" className="hover:text-black transition-colors">Terms</a>
            <a href="#" className="hover:text-black transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}