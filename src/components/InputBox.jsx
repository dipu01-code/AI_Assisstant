/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Image as ImageIcon } from 'lucide-react';

const InputBox = ({ input, setInput, handleSend, handleGenerateImage }) => {
  const inputRef = useRef(null);

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full glass-panel p-4 pb-6 sm:p-6 sm:pb-8 flex flex-col items-center justify-center z-20 border-t border-white/10 relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
      
      <div className="w-full max-w-4xl flex items-center space-x-3 bg-black/40 p-2 rounded-full border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] focus-within:border-cyan-500/50 focus-within:shadow-[0_0_20px_rgba(0,243,255,0.2)] transition-all duration-300">
        
        <button
          onClick={handleGenerateImage}
          className="p-3 rounded-full hover:bg-white/10 text-white/50 hover:text-cyan-400 transition-colors focus:outline-none"
          title="Generate Image"
        >
          <ImageIcon size={22} />
        </button>
        
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Awaiting command sequence..."
          className="flex-1 bg-transparent border-none outline-none text-white/90 placeholder-white/30 text-[15px] tracking-wide px-2 h-10"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          disabled={!input.trim()}
          className={`p-3 rounded-full flex items-center justify-center transition-all bg-gradient-to-tr
            ${input.trim() 
              ? 'from-cyan-600 to-purple-600 text-white shadow-[0_0_15px_rgba(0,243,255,0.4)] cursor-pointer' 
              : 'from-gray-800 to-gray-700 text-white/20 cursor-not-allowed'
            }`}
        >
          <Send size={20} className={input.trim() ? 'ml-1' : ''} />
        </motion.button>
      </div>
    </div>
  );
};

export default InputBox;
