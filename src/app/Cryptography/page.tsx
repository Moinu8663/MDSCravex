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
    setMasterKey('');
  };

  return (
    <main className="max-w-6xl mx-auto p-2 mt-3">
      <div className="bg-white/70 backdrop-blur-lg shadow-xl rounded-xl p-8 border border-[#eeb6f3]">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-4xl font-extrabold text-[#6e3d73] tracking-tight">
            🔐 Cryptography Tool
          </h1>
          <button
            onClick={resetFields}
            className="flex items-center gap-1 text-sm text-[#a931a2] hover:text-[#6e3d73] transition"
            title="Reset"
          >
            <RotateCcw size={18} />
            Reset
          </button>
        </div>

        <div className="mb-3">
          <label className="block text-sm text-[#a931a2] font-semibold mb-1">
            Master Key
          </label>
          <input
            type="text"
            placeholder="Enter your master key"
            className="w-full px-4 py-2 border border-[#eeb6f3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a931a2]"
            value={masterKey}
            onChange={(e) => setMasterKey(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm text-[#a931a2] font-semibold mb-1">
              Input
            </label>
            <textarea
              rows={5}
              placeholder="Enter string, number, or JSON"
              className="w-full p-4 border border-[#eeb6f3] rounded-lg resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a931a2]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-[#a931a2] font-semibold mb-1">
              Output
            </label>
            <textarea
              readOnly
              rows={5}
              value={output ? output : error || ''}
              className={`w-full p-4 border rounded-lg font-mono resize-none shadow-sm bg-[#faf0ff] ${
                error
                  ? 'border-red-400 text-red-500'
                  : 'border-[#a931a2] text-black'
              }`}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={() => sendCryptoRequest('encrypt')}
            disabled={loading || !masterKey}
            className="flex-1 bg-gradient-to-r from-[#a931a2] to-[#c248c8] text-white py-3 rounded-md hover:opacity-90 disabled:opacity-50 transition"
          >
            Encrypt
          </button>
          <button
            onClick={() => sendCryptoRequest('decrypt')}
            disabled={loading || !masterKey}
            className="flex-1 bg-gradient-to-r from-[#6e3d73] to-[#915a8f] text-white py-3 rounded-md hover:opacity-90 disabled:opacity-50 transition"
          >
            Decrypt
          </button>
        </div>
      </div>
    </main>
  );
};

export default CryptographyPage;

