'use client';

import { motion } from 'framer-motion';
import Features from '../app/components/Features';

const Home: React.FC = () => {
  return (
    <>
      <div className="text-center py-20 bg-gradient-to-b from-[#eeb6f3] to-white text-[#6e3d73]">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#a931a2] to-[#c248c8]"
        >
          Welcome to MDSCravex
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-4 text-lg text-[#6e3d73]/80"
        >
          Secure. Test. Format. One Toolkit to Rule Them All.
        </motion.p>
      </div>

      <Features />
      <Features />
    </>
  );
};

export default Home;
