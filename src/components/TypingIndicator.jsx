/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';

const TypingIndicator = () => {
  const dotVariants = {
    animate: {
      y: [0, -8, 0],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <div className="flex space-x-1 p-3 glass-panel rounded-2xl rounded-tl-none w-16 mb-4">
      <motion.div
        className="w-2 h-2 rounded-full bg-cyan-400"
        variants={dotVariants}
        animate="animate"
        transition={{ delay: 0 }}
      />
      <motion.div
        className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_var(--color-cyan-400)]"
        variants={dotVariants}
        animate="animate"
        transition={{ delay: 0.2 }}
      />
      <motion.div
        className="w-2 h-2 rounded-full bg-cyan-400"
        variants={dotVariants}
        animate="animate"
        transition={{ delay: 0.4 }}
      />
    </div>
  );
};

export default TypingIndicator;
