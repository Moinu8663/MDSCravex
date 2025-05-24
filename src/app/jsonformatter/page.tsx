'use client';

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
    } catch (err: any) {
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
    <main className="max-w-5xl mx-auto p-3 mt-3 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-[#6e3d73] mb-6 text-center">
        JSON Formatter
      </h1>

      <div className="grid md:grid-cols-2 gap-6 mb-4">
        {/* Input Textarea */}
        <div>
          <h2 className="font-semibold text-[#a931a2] mb-1">Input JSON</h2>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste your JSON here...'
            rows={12}
            className="w-full p-3 border border-[#eeb6f3] rounded font-mono resize-none"
          />
        </div>

        {/* Output Textarea */}
        <div>
          <h2 className="font-semibold text-[#a931a2] mb-1">Formatted Output</h2>
          <textarea
            readOnly
            value={error || output}
            rows={12}
            className={`w-full p-3 rounded font-mono resize-none border ${
              error ? 'border-red-500 text-red-500' : 'border-[#a931a2] bg-[#faf0ff]'
            }`}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={handleFormat}
          className="flex-1 bg-[#a931a2] text-white py-3 rounded-md hover:bg-[#c248c8]"
        >
          Format JSON
        </button>
        <button
          onClick={handleReset}
          className="flex-1 bg-gray-300 text-[#6e3d73] py-3 rounded-md hover:bg-gray-400"
        >
          Reset
        </button>
      </div>
    </main>
  );
};

export default JSONFormatterPage;
