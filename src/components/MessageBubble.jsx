/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import ImagePreview from './ImagePreview';

const MessageBubble = ({ message }) => {
  const isAI = message.sender === 'ai';

  const containerVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.4, type: 'spring', stiffness: 200 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`flex w-full mb-6 ${isAI ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`flex max-w-[80%] ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className="flex-shrink-0 mx-3 mt-1">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center glass shadow-lg ${isAI ? 'border-cyan-400 text-cyan-400' : 'border-purple-400 text-purple-400'}`}>
            {isAI ? <Bot size={20} /> : <User size={20} />}
          </div>
        </div>
        
        <div 
          className={`flex flex-col ${isAI ? 'items-start' : 'items-end'}`}
        >
          <div 
            className={`px-5 py-3 rounded-2xl glass-panel relative group
              ${isAI 
                ? 'rounded-tl-none border-l-2 border-l-cyan-400 neon-text-blue' 
                : 'rounded-tr-none border-r-2 border-r-purple-400 neon-text-purple bg-white/5 text-right'
              }`}
          >
            {message.type === 'image' && <ImagePreview url={message.content} />}
            {message.type === 'text' && (
              <p className="text-white/90 text-[15px] leading-relaxed tracking-wide whitespace-pre-wrap">
                {message.content}
              </p>
            )}
          </div>
          <span className="text-[10px] text-white/30 uppercase tracking-widest mt-2 px-1">
            {isAI ? 'SYSTEM.AI' : 'USER'} • {message.timestamp}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
