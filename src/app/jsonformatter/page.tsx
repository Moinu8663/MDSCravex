'use client';

import { RotateCcw } from 'lucide-react';
import React, { useState } from 'react';

const JSONFormatterPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError('');
    } catch {
      setOutput('');
      setError('Invalid JSON format.');
    }
  };

  const handleReset = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <main className="max-w-6xl mx-auto p-2 mt-3">
      <div className="bg-white/70 backdrop-blur-lg shadow-xl rounded-xl p-8 border border-[#eeb6f3]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-[#6e3d73] tracking-tight">
            🧩 JSON Formatter
          </h1>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-sm text-[#a931a2] hover:text-[#6e3d73] transition"
            title="Reset"
          >
            <RotateCcw size={18} />
            Reset
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Input Textarea */}
          <div>
            <label className="block text-sm text-[#a931a2] font-semibold mb-3">
              Input JSON
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your JSON here..."
              rows={7}
              className="w-full p-4 border border-[#eeb6f3] rounded-lg font-mono resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a931a2]"
            />
          </div>

          {/* Output Textarea */}
          <div>
            <label className="block text-sm text-[#a931a2] font-semibold mb-3">
              Formatted Output
            </label>
            <textarea
              readOnly
              value={error || output}
              rows={7}
              className={`w-full p-4 rounded-lg font-mono resize-none shadow-sm ${
                error
                  ? 'border border-red-400 text-red-500 bg-red-50'
                  : 'border border-[#a931a2] bg-[#faf0ff] text-black'
              }`}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-1">
          <button
            onClick={handleFormat}
            className="flex-1 bg-gradient-to-r from-[#a931a2] to-[#c248c8] text-white py-3 rounded-md hover:opacity-90 transition"
          >
            Format JSON
          </button>
          <button
            onClick={handleReset}
            className="flex-1 bg-gray-200 text-[#6e3d73] py-3 rounded-md hover:bg-gray-300 transition"
          >
            Clear
          </button>
        </div>
      </div>
    </main>
  );
};

export default JSONFormatterPage;