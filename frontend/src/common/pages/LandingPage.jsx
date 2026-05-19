import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PenTool, Code, ArrowRight, Zap, Target, Award } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans overflow-hidden">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold italic shadow-lg shadow-blue-600/30">
            SL
          </div>
          <span className="text-2xl font-black tracking-tight">SmartLearn</span>
        </div>
        <div className="flex space-x-4">
          <Link to="/login" className="px-5 py-2.5 text-sm font-bold text-gray-300 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link to="/register" className="px-5 py-2.5 text-sm font-bold bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg shadow-blue-600/30 transition-all">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-20 pb-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-900/50 border border-blue-500/30 text-blue-400 mb-8">
            <Zap size={16} className="text-yellow-400" />
            <span className="text-sm font-bold tracking-wide uppercase">The Future of Interactive Learning</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-tight">
            Master Code.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Not Just Syntax.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            SmartLearn is a structured educational ecosystem designed to guide you from absolute beginner to industry-ready developer through interactive lessons, quizzes, and live coding.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black text-lg flex items-center justify-center space-x-2 transition-all shadow-[0_0_40px_-10px_rgba(37,99,235,0.7)] hover:scale-105">
              <span>Start Learning Free</span>
              <ArrowRight size={20} />
            </Link>
            <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-bold text-lg transition-all border border-gray-700">
              View Curriculum
            </Link>
          </div>
        </div>
      </main>

      {/* Background Decorators */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Guide / How it Works Section */}
      <section className="bg-gray-950 py-24 relative z-10 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Your Journey to Mastery</h2>
            <p className="text-xl text-gray-500">A proven three-step methodology to learn any language.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="bg-gray-900 border border-gray-800 p-10 rounded-3xl hover:border-blue-500/50 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-blue-900/50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <BookOpen size={32} className="text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">1. Learn the Theory</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Dive deep into core concepts with our structured, easy-to-digest curriculum. Understand the "why" before the "how".
              </p>
              <ul className="space-y-2 text-sm text-gray-500 font-medium">
                <li className="flex items-center space-x-2"><Target size={16} className="text-green-400"/> <span>Bite-sized modules</span></li>
                <li className="flex items-center space-x-2"><Target size={16} className="text-green-400"/> <span>Real-world examples</span></li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="bg-gray-900 border border-gray-800 p-10 rounded-3xl hover:border-purple-500/50 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-purple-900/50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <PenTool size={32} className="text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">2. Test Your Knowledge</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Reinforce what you've learned through dynamic quizzes. Identify your weak spots instantly with AI-driven feedback.
              </p>
              <ul className="space-y-2 text-sm text-gray-500 font-medium">
                <li className="flex items-center space-x-2"><Target size={16} className="text-green-400"/> <span>Instant scoring</span></li>
                <li className="flex items-center space-x-2"><Target size={16} className="text-green-400"/> <span>Concept verification</span></li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="bg-gray-900 border border-gray-800 p-10 rounded-3xl hover:border-emerald-500/50 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-emerald-900/50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Code size={32} className="text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">3. Write Real Code</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Apply your knowledge in our live browser-based code editor. Solve algorithmic challenges to build muscle memory.
              </p>
              <ul className="space-y-2 text-sm text-gray-500 font-medium">
                <li className="flex items-center space-x-2"><Target size={16} className="text-green-400"/> <span>In-browser execution</span></li>
                <li className="flex items-center space-x-2"><Target size={16} className="text-green-400"/> <span>Hidden test cases</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-black py-12 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} SmartLearn Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
