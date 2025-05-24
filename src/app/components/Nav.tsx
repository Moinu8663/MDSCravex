'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import React from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/Cryptography', label: 'Cryptography' },
  { href: '/api-tester', label: 'API Tester' },
  { href: '/jsonformatter', label: 'JSON Formatter' },
];

const Nav: React.FC = () => {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#eeb6f3] text-[#6e3d73] "
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo / Brand */}
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#a931a2] to-[#c248c8]">
          MDSCravex
        </h1>

        {/* Navigation Links */}
        <ul className="flex gap-6 items-center">
          {links.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href} className="group relative">
                <Link
                  href={href}
                  className={`text-sm font-medium transition duration-200 ${
                    isActive
                      ? 'text-[#a931a2]'
                      : 'text-[#6e3d73] group-hover:text-[#c248c8]'
                  }`}
                >
                  {label}
                  {/* Underline Animation */}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] w-full scale-x-0 origin-left transition-transform duration-300 bg-[#a931a2] ${
                      isActive || 'group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.nav>
  );
};

export default Nav;
