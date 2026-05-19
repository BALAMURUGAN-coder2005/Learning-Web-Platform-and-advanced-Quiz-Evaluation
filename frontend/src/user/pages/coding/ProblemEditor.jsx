import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { Play, Send, ChevronLeft, Info, CheckCircle, XCircle } from 'lucide-react';
import { problemService, submissionService } from '../../../common/services/api';
import { useAuth } from '../../../common/context/AuthContext';

const ProblemEditor = () => {
  const { user: authUser } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await problemService.getProblemById(id);
        const data = response.data;
        setProblem(data);
        
        // Default boilerplate based on language
        const boilerplate = 
          data.language === 'Python' ? '# Write your code here\nprint("Hello World")' :
          data.language === 'Java' ? 'public class Solution {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}' :
          '#include <stdio.h>\n\nint main() {\n    printf("Hello World");\n    return 0;\n}';
        
        setCode(boilerplate);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchProblem();
  }, [id]);

  const runCode = () => {
    setOutput({
      status: 'success',
      stdout: 'Hello World', // Simulated
      testCasesPassed: 1,
      totalTestCases: problem.testCases.length
    });
  };

  const submitCode = async () => {
    setSubmitting(true);
    // Simulated logic: 80% chance of success for demo
    const isCorrect = Math.random() > 0.2;
    
    try {
      await submissionService.createSubmission({
        userId: authUser.id,
        type: 'coding',
        topic: problem.topic,
        difficulty: problem.difficulty,
        score: isCorrect ? 10 : 0,
        correct: isCorrect,
        language: problem.language
      });

      setOutput({
        status: isCorrect ? 'accepted' : 'rejected',
        testCasesPassed: isCorrect ? problem.testCases.length : 1,
        totalTestCases: problem.testCases.length
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-20 text-center">Loading editor...</div>;
  if (!problem) return <div className="p-20 text-center">Problem not found.</div>;

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col -m-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/coding')} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg font-bold text-gray-900">{problem.title}</h2>
          <span className={`px-2 py-0.5 rounded text-xs font-bold ${
            problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 
            problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
          }`}>
            {problem.difficulty}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={runCode}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-all text-sm"
          >
            <Play size={16} fill="currentColor" />
            <span>Run</span>
          </button>
          <button 
            onClick={submitCode}
            disabled={submitting}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all text-sm disabled:bg-blue-400"
          >
            {submitting ? 'Submitting...' : (
              <>
                <Send size={16} fill="currentColor" />
                <span>Submit</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left: Description */}
        <div className="w-1/3 bg-white border-r border-gray-200 overflow-y-auto p-6">
          <div className="flex items-center space-x-2 text-blue-600 mb-4">
            <Info size={18} />
            <h3 className="font-bold">Description</h3>
          </div>
          <div className="text-gray-700 leading-relaxed mb-8">
            {problem.description}
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Input Format</h4>
              <p className="text-sm text-gray-600 p-3 bg-gray-50 rounded-lg border border-gray-100">
                {problem.inputDescription || 'Standard input'}
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Output Format</h4>
              <p className="text-sm text-gray-600 p-3 bg-gray-50 rounded-lg border border-gray-100">
                {problem.outputDescription || 'Standard output'}
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Constraints</h4>
              <p className="text-sm text-gray-600 font-mono">
                {problem.constraints}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Editor & Results */}
        <div className="flex-1 flex flex-col bg-gray-50">
          <div className="flex-1 border-b border-gray-200">
            <Editor
              height="100%"
              defaultLanguage={problem.language.toLowerCase()}
              theme="light"
              value={code}
              onChange={(value) => setCode(value)}
              options={{
                fontSize: 16,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                automaticLayout: true,
              }}
            />
          </div>
          
          {/* Output Panel */}
          <div className="h-1/3 bg-white p-6 overflow-y-auto border-t border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <span>Console</span>
            </h3>
            
            {output ? (
              <div className="animate-in fade-in duration-300">
                {output.status === 'accepted' ? (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div className="flex items-center space-x-3 text-green-700 font-bold mb-2">
                      <CheckCircle size={20} />
                      <span>Accepted</span>
                    </div>
                    <p className="text-sm text-green-600">All {output.totalTestCases} test cases passed!</p>
                  </div>
                ) : output.status === 'rejected' ? (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-center space-x-3 text-red-700 font-bold mb-2">
                      <XCircle size={20} />
                      <span>Wrong Answer</span>
                    </div>
                    <p className="text-sm text-red-600">Passed {output.testCasesPassed}/{output.totalTestCases} test cases.</p>
                  </div>
                ) : (
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                    <div className="font-mono text-sm text-gray-700 whitespace-pre">
                      {output.stdout}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-400 text-sm italic">Run your code to see results here...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemEditor;
