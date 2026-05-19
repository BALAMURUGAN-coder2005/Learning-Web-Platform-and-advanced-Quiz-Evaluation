import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, PlayCircle, BookOpen, Lightbulb, Loader2, 
  Code, Zap, AlertTriangle, Trophy, Target, PenTool, Clock 
} from 'lucide-react';
import { learningService } from '../../../common/services/api';

const TopicPage = () => {
  const { language, topic, difficulty } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const capitalizedLang = language.charAt(0).toUpperCase() + language.slice(1);
  const capitalizedTopic = topic.charAt(0).toUpperCase() + topic.slice(1);
  const capitalizedDiff = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await learningService.getContent(language, topic, difficulty);
        setContent(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchContent();
  }, [language, topic, difficulty]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
        <Loader2 className="animate-spin text-blue-600" size={48} />
        <p className="text-gray-500 font-medium">Loading {capitalizedTopic} ({capitalizedDiff}) lesson...</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="card p-12 text-center">
        <h2 className="text-2xl font-bold bg-orange-100 text-orange-600 p-4 rounded-xl">Ops! Content not found.</h2>
        <Link to="/learn" className="mt-4 text-blue-600 font-bold hover:underline inline-block">Back to Learn Roadmap</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 pt-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/learn" className="hover:text-blue-600">Learn</Link>
          <ChevronRight size={14} />
          <Link to={`/learn/${language}`} className="hover:text-blue-600">{capitalizedLang}</Link>
          <ChevronRight size={14} />
          <Link to={`/learn/${language}/${topic}/select-difficulty`} className="hover:text-blue-600">{capitalizedTopic}</Link>
          <ChevronRight size={14} />
          <span className="font-semibold text-gray-900">{capitalizedDiff}</span>
        </div>

        {/* 1. Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <h1 className="text-5xl font-black text-gray-900 tracking-tight">{content.title}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-sm font-bold shadow-sm">
              <Clock size={16} />
              <span>{content.estimatedTime || "5 mins"}</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-black uppercase tracking-widest shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
              <span>{difficulty} Level</span>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          {/* 2. Introduction Card */}
          <section id="introduction" className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center space-x-3 text-blue-600 mb-6">
              <BookOpen size={28} />
              <h2 className="text-2xl font-black uppercase tracking-tight">Introduction</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-xl">
              {content.introduction}
            </p>
          </section>

          {/* 3. Definition Card */}
          <section id="definition" className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center space-x-3 text-emerald-600 mb-6">
              <Lightbulb size={28} />
              <h2 className="text-2xl font-black uppercase tracking-tight">What is it?</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-xl border-l-4 border-emerald-100 pl-6 bg-emerald-50/30 py-4 rounded-r-2xl">
              {content.definition}
            </p>
          </section>

          {/* 4. Syntax Card */}
          <section id="syntax" className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center space-x-3 text-indigo-600 mb-6">
              <Code size={28} />
              <h2 className="text-2xl font-black uppercase tracking-tight">The Syntax</h2>
            </div>
            <div className="bg-[#0f172a] rounded-2xl p-6 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] text-blue-300 font-bold uppercase tracking-widest px-2 py-1 bg-gray-800 rounded">Code</span>
              </div>
              <pre className="text-blue-100 font-mono text-xl whitespace-pre-wrap">
                <code>{content.syntax}</code>
              </pre>
            </div>
          </section>

          {/* 5. Examples Section */}
          <section id="examples" className="space-y-8">
            <div className="flex items-center space-x-3 text-purple-600 px-2">
              <PlayCircle size={28} />
              <h2 className="text-3xl font-black uppercase tracking-tight">Step-by-Step Examples</h2>
            </div>
            
            {content.examples?.map((example, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-50/50 px-8 py-4 border-b border-gray-100 flex items-center justify-between">
                  <span className="text-sm font-black text-gray-400 uppercase tracking-widest">Example #{i + 1}</span>
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="bg-[#0f172a] rounded-2xl p-6 mb-6 shadow-inner">
                    <pre className="text-emerald-300 font-mono text-lg overflow-x-auto">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                  {/* 6. Explanation Section */}
                  <div className="bg-blue-50/50 border-l-4 border-blue-400 p-6 rounded-r-2xl">
                    <div className="flex items-center space-x-2 text-blue-900 font-black mb-3 text-sm uppercase tracking-wide">
                      <Zap size={18} />
                      <span>Code Walkthrough</span>
                    </div>
                    <p className="text-blue-900/80 leading-relaxed text-lg italic">
                      {example.explanation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* 8. Common Mistakes Card */}
          {content.mistakes?.length > 0 && (
            <section id="mistakes" className="bg-white border-2 border-red-50 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center space-x-3 text-red-600 mb-6">
                <AlertTriangle size={28} />
                <h2 className="text-2xl font-black uppercase tracking-tight">Common Mistakes</h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {content.mistakes.map((mistake, i) => (
                  <div key={i} className="flex items-start space-x-4 p-4 bg-red-50/50 rounded-2xl border border-red-100">
                    <span className="text-red-500 font-black mt-1">✕</span>
                    <p className="text-red-900 font-medium">{mistake}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 7. Key Points Card */}
          {content.keyPoints?.length > 0 && (
            <section id="key-points" className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center space-x-3 text-amber-600 mb-6">
                <Trophy size={28} />
                <h2 className="text-2xl font-black uppercase tracking-tight">Key Takeaways</h2>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-center space-x-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <p className="text-amber-900 font-bold">{point}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 9. Practice Tip */}
          <section id="practice-tip" className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Target size={40} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Practice Mission</h2>
                <p className="text-blue-100 text-xl font-medium leading-relaxed">
                  {content.practiceTip}
                </p>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          </section>

          {/* 10. Summary Card */}
          <section id="summary" className="bg-gray-900 rounded-3xl p-8 text-white shadow-2xl">
            <h2 className="text-xl font-black uppercase tracking-widest text-gray-500 mb-4 text-center">In a Nutshell</h2>
            <p className="text-2xl font-medium text-center leading-relaxed">
              "{content.summary}"
            </p>
          </section>

          {/* 11. CTA Section */}
          <div className="pt-10 flex flex-col md:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => navigate(`/coding?topic=${topic}&difficulty=${difficulty}`)}
              className="w-full md:w-auto px-10 py-5 bg-white text-blue-600 border-2 border-blue-600 rounded-2xl font-black text-xl hover:bg-blue-50 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3"
            >
              <PenTool size={24} />
              <span>Practice Coding</span>
            </button>
            <button 
              onClick={() => navigate(`/quiz?topic=${topic}&difficulty=${difficulty}`)}
              className="w-full md:w-auto px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
            >
              <Zap size={24} />
              <span>Take Final Quiz</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicPage;
