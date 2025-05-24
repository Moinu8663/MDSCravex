'use client';

import { motion } from 'framer-motion';
import { Shield, TerminalSquare, Code2, LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const features: Feature[] = [
  { icon: Shield, title: "Encryption", desc: "Encrypt & decrypt sensitive data." },
  { icon: TerminalSquare, title: "API Tester", desc: "Send & inspect API requests." },
  { icon: Code2, title: "JSON Formatter", desc: "Format, validate, and beautify JSON." },
];

const Features: React.FC = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6 p-10">
      {features.map((f, i) => (
        <motion.div
          key={f.title}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6 text-center transition-all"
        >
          {/* Icon with gradient color */}
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#a931a2] to-[#c248c8] flex items-center justify-center">
            <f.icon className="w-7 h-7 text-white" />
          </div>

          <h3 className="text-xl font-semibold text-[#6e3d73]">{f.title}</h3>
          <p className="text-[#6e3d7399] mt-2 text-sm">{f.desc}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Features;
