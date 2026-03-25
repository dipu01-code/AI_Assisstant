/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

const ChatWindow = ({ messages, isTyping }) => {
  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 custom-scrollbar relative z-10 w-full max-w-5xl mx-auto h-full flex flex-col">
      {messages.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center opacity-40">
          <div className="w-24 h-24 rounded-full border border-cyan-500/50 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,243,255,0.2)]">
            <div className="text-cyan-400 font-mono text-xs tracking-[0.3em]">SYS.READY</div>
          </div>
          <p className="text-white/50 tracking-widest text-sm uppercase">Initialize sequence to begin</p>
        </div>
      )}

      <div className="flex flex-col justify-end min-h-full">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} />
        ))}
        {isTyping && (
          <div className="flex justify-start w-full">
            <TypingIndicator />
          </div>
        )}
        <div ref={endOfMessagesRef} className="h-4" />
      </div>
    </div>
  );
};

export default ChatWindow;
