import { Link } from "react-router-dom";
import "../index.css";

export default function LearnMore() {
  return (
    <div className="min-h-screen w-full bg-white text-black antialiased px-6 md:px-12">
      
      {/* NAVBAR */}
      <header className="max-w-7xl mx-auto flex justify-between items-center py-6 border-b border-gray-200">
        <Link to="/" className="text-xl font-bold tracking-tighter hover:opacity-70 transition-opacity">
          Datawise AI
        </Link>

        <div className="flex gap-6 text-sm font-medium">
          <Link to="/login" className="hover:underline mt-2">
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 border border-black hover:bg-black hover:text-white transition"
          >
            Signup
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-20">
        {/* HERO SECTION */}
        <section className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
            The intelligent bridge between <br />
            your questions and your data.
          </h1>
          <p className="mt-8 text-gray-500 text-lg md:text-xl leading-relaxed">
            Datawise AI is a sophisticated natural language interface for SQL databases. 
            We turn complex data structures into simple conversations.
          </p>
        </section>

        {/* SECTION: WHAT IT DOES */}
        <section className="border-t border-gray-100 py-16">
          <h2 className="text-2xl font-bold mb-8">What can DataWise AI do?</h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
            {[
              { title: "English to SQL", desc: "Instantly translate natural language into optimized, secure SQL queries." },
              { title: "Direct Execution", desc: "Run queries against your database in real-time with read-only safety." },
              { title: "Data Visualization", desc: "Automatically render results into clean, professional tables and charts." },
              { title: "Smart Explanations", desc: "Receive analyst-level summaries that explain the 'why' behind the numbers." },
              { title: "Persistent History", desc: "Save your favorite queries and chat history for future reference." }
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <span className="font-bold text-gray-300">0{i + 1}</span>
                <div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: HOW IT WORKS */}
        <section className="border-t border-gray-100 py-16">
          <h2 className="text-2xl font-bold mb-8">How does it work?</h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center shrink-0 font-bold">1</div>
              <div>
                <h3 className="font-bold text-lg">Ask in Plain English</h3>
                <p className="text-gray-500 mt-1">Type your question like you're talking to a colleague. No syntax knowledge required.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center shrink-0 font-bold">2</div>
              <div>
                <h3 className="font-bold text-lg">AI Processing</h3>
                <p className="text-gray-500 mt-1">Our AI analyzes your database schema to generate a precise, safe SQL query.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center shrink-0 font-bold">3</div>
              <div>
                <h3 className="font-bold text-lg">Instant Insights</h3>
                <p className="text-gray-500 mt-1">View your data immediately accompanied by a clear, written explanation of the results.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: CTA */}
        <section className="border-y border-gray-100 py-20 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to see it in action?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="px-8 py-4 bg-black text-white hover:bg-gray-800 transition font-medium"
            >
              Create Free Account
            </Link>
            <Link
              to="/app"
              className="px-8 py-4 border border-black hover:bg-gray-50 transition font-medium"
            >
              Try the Demo
            </Link>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto py-10 text-center text-sm text-gray-400">
        © 2025 Datawise AI — Built for clarity and speed.
      </footer>
    </div>
  );
}