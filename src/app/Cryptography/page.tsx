'use client';

import { RotateCcw } from 'lucide-react';
import React, { useState } from 'react';

const CryptographyPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [masterKey, setMasterKey] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sendCryptoRequest = async (action: 'encrypt' | 'decrypt') => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/Api/Cryptography', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input, action, masterKey }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Unknown error');

      setOutput(
        typeof data.result === 'object'
          ? JSON.stringify(data.result, null, 2)
          : data.result
      );
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const resetFields = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  return (
    <main className="max-w-5xl mx-auto p-3 bg-white rounded-xl shadow-lg mt-3">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-3xl font-bold text-[#6e3d73]">
          Cryptography Tool
        </h1>
        <button
          onClick={resetFields}
          className="flex items-center gap-1 text-sm text-[#a931a2] hover:text-[#6e3d73]"
          title="Reset"
        >
          <RotateCcw size={18} />
          Reset
        </button>
      </div>

      {/* Master Key Input */}
      <div className="mb-3">
        <label className="block text-[#a931a2] font-medium mb-1">
          Master Key:
        </label>
        <input
          type="text"
          placeholder="Enter your master key"
          className="w-full p-2 border border-[#eeb6f3] rounded"
          value={masterKey}
          onChange={(e) => setMasterKey(e.target.value)}
        />
      </div>

      {/* Grid for Input and Output */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Field */}
        <div>
          <h2 className="font-semibold text-[#a931a2] mb-1">Input:</h2>
          <textarea
            rows={9}
            placeholder="Enter string, number, or JSON"
            className="w-full p-3 border border-[#eeb6f3] rounded resize-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* Output Field */}
        <div>
          <h2 className="font-semibold text-[#a931a2] mb-1">Output:</h2>
          <textarea
            readOnly
            value={output ? output : error || ''}
            rows={9}
            className={`w-full p-3 border border-[#a931a2] bg-[#faf0ff] rounded font-mono resize-none 
              ${error ? 'text-red-500' : 'text-black'}`}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-4 mt-3">
        <button
          onClick={() => sendCryptoRequest('encrypt')}
          disabled={loading || !masterKey}
          className="flex-1 bg-[#a931a2] text-white py-3 rounded-md hover:bg-[#c248c8] disabled:opacity-50"
        >
          Encrypt
        </button>
        <button
          onClick={() => sendCryptoRequest('decrypt')}
          disabled={loading || !masterKey}
          className="flex-1 bg-[#6e3d73] text-white py-3 rounded-md hover:bg-[#915a8f] disabled:opacity-50"
        >
          Decrypt
        </button>
      </div>
    </main>
  );
};

export default CryptographyPage;
