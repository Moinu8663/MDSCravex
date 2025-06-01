// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { motion } from 'framer-motion';
// import React from 'react';

// const links = [
//   { href: '/', label: 'Home' },
//   { href: '/Cryptography', label: 'Cryptography' },
//   { href: '/apitester', label: 'API Tester' },
//   { href: '/jsonformatter', label: 'JSON Formatter' },
// ];

// const Nav: React.FC = () => {
//   const pathname = usePathname();

//   return (
//     <motion.nav
//       initial={{ y: -20, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="bg-[#eeb6f3] text-[#6e3d73] "
//     >
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
//         {/* Logo / Brand */}
//         <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#a931a2] to-[#c248c8]">
//           MDSCravex
//         </h1>

//         {/* Navigation Links */}
//         <ul className="flex gap-6 items-center">
//           {links.map(({ href, label }) => {
//             const isActive = pathname === href;
//             return (
//               <li key={href} className="group relative">
//                 <Link
//                   href={href}
//                   className={`text-sm font-medium transition duration-200 ${
//                     isActive
//                       ? 'text-[#a931a2]'
//                       : 'text-[#6e3d73] group-hover:text-[#c248c8]'
//                   }`}
//                 >
//                   {label}
//                   {/* Underline Animation */}
//                   <span
//                     className={`absolute left-0 -bottom-1 h-[2px] w-full scale-x-0 origin-left transition-transform duration-300 bg-[#a931a2] ${
//                       isActive || 'group-hover:scale-x-100'
//                     }`}
//                   />
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </motion.nav>
//   );
// };

// export default Nav;
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';

const links = [
  { href: '/', label: 'Home' },
  {
    label: 'Tool',
    children: [
      { href: '/Cryptography', label: 'Cryptography' },
      { href: '/apitester', label: 'API Tester' },
      { href: '/jsonformatter', label: 'JSON Formatter' },
    ],
  },
  { href: '/about', label: 'About' },
  { href: '/contactus', label: 'Contect Us' },
];

const Nav: React.FC = () => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#eeb6f3] text-[#6e3d73] z-50 relative"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo / Brand */}
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#a931a2] to-[#c248c8]">
          MDSCravex
        </h1>

        {/* Navigation Links */}
        <ul className="flex gap-6 items-center">
          {links.map((item) => {
            const isActive = pathname === item.href;
            const hasChildren = !!item.children;

            if (hasChildren) {
              return (
                <li
                  key={item.label}
                  ref={dropdownRef}
                  className="relative"
                >
                  <button
                    onClick={() => setOpenDropdown((prev) => !prev)}
                    className={`text-sm font-medium transition duration-200 flex items-center gap-1 ${
                      openDropdown ? 'text-[#a931a2]' : 'text-[#6e3d73] hover:text-[#c248c8]'
                    }`}
                  >
                    {item.label}
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        openDropdown ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {openDropdown && (
                    <ul className="absolute left-0 mt-2 min-w-[160px] bg-white border border-[#eeb6f3] rounded-md shadow-lg z-50">
                      {item.children.map((child) => {
                        const isChildActive = pathname === child.href;
                        return (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={`block px-4 py-2 text-sm hover:bg-[#fbe8fb] ${
                                isChildActive ? 'text-[#a931a2] font-medium' : 'text-[#6e3d73]'
                              }`}
                              onClick={() => setOpenDropdown(false)} // Close dropdown on click
                            >
                              {child.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            }

            return (
              <li key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition duration-200 ${
                    isActive ? 'text-[#a931a2]' : 'text-[#6e3d73] hover:text-[#c248c8]'
                  }`}
                >
                  {item.label}
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

