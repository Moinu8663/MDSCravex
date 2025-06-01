'use client';

import { motion } from 'framer-motion';
import React from 'react';

const AboutPage = () => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto p-3 mt-3"
    >
      <div className="bg-white/70 backdrop-blur-lg shadow-xl border border-[#eeb6f3] rounded-xl p-8">
        <h1 className="text-4xl font-bold text-[#a931a2] mb-4">About MDSCravex</h1>

        <p className="text-[#6e3d73] text-lg leading-relaxed mb-4">
          <strong>MDSCravex</strong> is a modern web-based toolkit for developers, tech enthusiasts, and anyone
          working with APIs, cryptography, or structured data. It provides a sleek, unified interface to test APIs,
          encrypt/decrypt content, and format JSON efficiently.
        </p>

        <p className="text-[#6e3d73] text-lg leading-relaxed mb-4">
          Built with performance and usability in mind, MDSCravex streamlines your workflow by offering powerful
          tools like:
        </p>

        <ul className="list-disc list-inside text-[#6e3d73] mb-4 space-y-2">
          <li>🌐 API Tester with headers, body, auth, and file upload support</li>
          <li>🔐 Cryptography tools for secure text encryption and decryption</li>
          <li>🧩 JSON Formatter for readable, color-coded JSON output</li>
        </ul>

        <p className="text-[#6e3d73] text-lg leading-relaxed">
          Whether you're debugging an endpoint or handling secure data, MDSCravex gives you everything in one place —
          fast, reliable, and beautifully designed.
        </p>
      </div>
    </motion.main>
  );
};

export default AboutPage;
