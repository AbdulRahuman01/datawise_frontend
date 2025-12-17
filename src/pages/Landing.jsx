import { Link, useNavigate } from "react-router-dom";
import "../index.css";

export default function Landing() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
    navigate("/");
  };

  const demoQuestions = [
    "Top 5 highest rated movies",
    "Total revenue",
    "Most popular subscription plan",
    "Movies by genre",
  ];

  const isLoggedIn = !!localStorage.getItem("access_token");

  return (
    <div className="min-h-screen w-full bg-white text-black antialiased">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center py-5">
          <h1 className="text-xl font-bold tracking-tighter">
            Datawise AI
          </h1>

          <nav className="flex items-center gap-4 md:gap-8 text-sm font-medium">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="hover:text-gray-600 transition-colors">
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="px-5 py-2 border border-black hover:bg-black hover:text-white transition-all duration-300"
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/app"
                  className="px-5 py-2 bg-black text-white hover:bg-gray-800 transition-all duration-300"
                >
                  Go to App
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-5 py-2 border border-black hover:bg-gray-100 transition-all duration-300"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 lg:gap-16 py-16 md:py-28 items-center">
          {/* LEFT CONTENT - Fixed Order: Text first on mobile */}
          <div className="text-center lg:text-left order-1 lg:order-1">
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

          {/* DASHBOARD PREVIEW - Fixed Order: Dashboard second on mobile */}
          <div className="order-2 lg:order-2 w-full border border-gray-200 bg-white shadow-sm rounded-md overflow-hidden">
            {/* Question */}
            <div className="p-4 border-b bg-gray-50">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                User Question
              </p>
              <p className="font-semibold text-sm">
                What are the top 5 highest rated movies?
              </p>
            </div>

            {/* SQL */}
            <div className="p-4 border-b">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                Generated SQL
              </p>
              <pre className="bg-gray-100 p-3 text-xs font-mono text-gray-800 overflow-x-auto">
{`SELECT title, rating
FROM movies
ORDER BY rating DESC
LIMIT 5;`}
              </pre>
            </div>

            {/* Insight */}
            <div className="p-4 border-b">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                Insight
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Drama and crime movies dominate the highest ratings, indicating
                strong audience preference for story-driven films.
              </p>
            </div>

            {/* Table */}
            <div className="p-4">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">
                Query Results
              </p>

              <table className="w-full text-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold">Movie</th>
                    <th className="px-3 py-2 text-left font-semibold">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-3 py-2">The Shawshank Redemption</td>
                    <td className="px-3 py-2 font-semibold">9.3</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-3 py-2">The Godfather</td>
                    <td className="px-3 py-2 font-semibold">9.2</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-3 py-2">The Dark Knight</td>
                    <td className="px-3 py-2 font-semibold">9.0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

       
        {/* DEMO NOTICE SECTION */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
          <div className="max-w-4xl mx-auto border border-gray-200 p-8 md:p-12 bg-black shadow-sm rounded-md">
            <div className="max-w-4xl mx-auto rounded-md p-6 bg-black">
              <h3 className="text-lg font-bold text-white mb-2">
                Demo Mode Active
              </h3>

              <p className="text-white text-sm mb-4">
                This application is currently running on <b>sample demo data</b>.
                You can explore how the AI converts natural language into SQL queries
                and provides insights based on this data.
              </p>

              <p className="text-white text-sm mb-2 font-semibold">
                Supported demo topics:
              </p>

              <ul className="list-disc list-inside text-sm text-white space-y-1">
                <li>Movies and ratings</li>
                <li>Genres and release years</li>
                <li>Users and subscriptions</li>
                <li>Revenue and plans</li>
              </ul>

              <p className="text-white text-xs mt-4 italic opacity-80">
                ℹ️ Questions outside the demo dataset will still generate SQL,
                but may not return results or insights.
              </p>
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
              Ask questions in plain English and get optimized SQL queries instantly.
            </p>
          </div>

          <div className="flex flex-col">
            <h4 className="font-bold text-lg mb-4 tracking-tight">
              Analyst-Level Insights
            </h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Clear explanations that help you understand trends, not just numbers.
            </p>
          </div>

          <div className="flex flex-col">
            <h4 className="font-bold text-lg mb-4 tracking-tight">
              Built for Real Databases
            </h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Works seamlessly with Postgres, MySQL, and SQL-based systems.
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