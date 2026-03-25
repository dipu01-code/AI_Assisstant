/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { ImageIcon } from 'lucide-react';

const ImagePreview = ({ url }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="relative mt-2 overflow-hidden rounded-xl border border-white/10 group glass-panel p-1"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      {url ? (
        <img 
          src={url} 
          alt="Generated Preview" 
          className="w-64 h-64 object-cover rounded-lg shadow-lg"
          loading="lazy"
        />
      ) : (
        <div className="w-64 h-64 flex flex-col items-center justify-center bg-white/5 rounded-lg text-white/50">
          <ImageIcon size={40} className="mb-2 opacity-50" />
          <p className="text-sm">Generating map...</p>
        </div>
      )}
    </motion.div>
  );
};

export default ImagePreview;
