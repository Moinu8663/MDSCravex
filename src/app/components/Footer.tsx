'use client';

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#eeb6f3] text-[#6e3d73] py-4">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} MDSCravex. All rights reserved.</p>
        
        <div className="flex gap-6">
          <a
            href="/privacypolicy"
            className="text-[#a931a2] hover:text-[#c248c8] transition-colors font-semibold"
          >
            Privacy Policy
          </a>
          <a
            href="/termsofservice"
            className="text-[#a931a2] hover:text-[#c248c8] transition-colors font-semibold"
          >
            Terms of Service
          </a>
          <a
            href="https://github.com/Moinu8663"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#a931a2] hover:text-[#c248c8] transition-colors font-semibold"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
