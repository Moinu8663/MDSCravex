'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [showPopup, setShowPopup] = useState(false); 
  const [loading, setLoading] = useState(false); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
    const resetFields = () => {
        setForm({ name: '', email: '', message: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/Api/Contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:form.name,
          email: form.email,
          message: form.message,
        }),
      });

      if (res.ok) {
        setForm({ name: '', email: '', message: '' });
        setShowPopup(true); // ✅ show popup

        setTimeout(() => {
          setShowPopup(false); // ✅ hide after 5 sec
        }, 5000);
      } else {
        throw new Error('Failed to send');
      }
    } catch (err) {
      alert('❌ Error sending email. Try again later.');
    } finally {
      setLoading(false); // ✅ hide loader
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto p-3 mt-3"
    >
      <div className="relative">
        {/* ✅ Popup Message */}
      {showPopup && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-100 text-green-700 px-6 py-4 rounded-md border border-green-400 shadow-xl z-50">
          ✅ Your message has been sent successfully!
        </div>
      )}
      </div>

      <div className="bg-white/70 backdrop-blur-lg border border-[#eeb6f3] shadow-xl rounded-xl p-8">
                <div className="flex justify-between items-center mb-3">
          <h1 className="text-4xl font-extrabold text-[#6e3d73] tracking-tight">
            Contact Us
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

        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label className="block text-[#6e3d73] font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-[#eeb6f3] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a931a2]"
            />
          </div>
          <div>
            <label className="block text-[#6e3d73] font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-[#eeb6f3] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a931a2]"
            />
          </div>
          <div>
            <label className="block text-[#6e3d73] font-semibold mb-1">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={3}
              className="w-full p-2 border border-[#eeb6f3] rounded-lg shadow-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-[#a931a2]"
            />
          </div>

{/* ✅ Loader and Button */}
          <button
            type="submit"
            disabled={loading}
            className={`bg-gradient-to-r from-[#a931a2] to-[#c248c8] text-white py-3 px-6 rounded-md shadow transition ${
              loading ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-90'
            }`}
          >
            {loading ? (
  <div className="flex items-center justify-center gap-2">
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
    Sending...
  </div>
) : (
  'Send Message'
)}
          </button>
        </form>
      </div>
    </motion.main>
  );
};

export default ContactPage;
