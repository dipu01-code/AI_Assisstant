/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ChatWindow from './components/ChatWindow';
import InputBox from './components/InputBox';

const playSendSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {
    console.error("Audio playback failed", e);
  }
};

const getTimestamp = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const simulateAIResponse = (userText) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const lowerText = userText.toLowerCase();
      let aiResponseText = "";

      if (lowerText.match(/(image|picture|photo|cat)/)) {
        setMessages((prev) => [...prev, {
          sender: 'ai',
          type: 'image',
          content: `https://picsum.photos/seed/${encodeURIComponent(lowerText.replace(/[^a-z0-9]/g, ''))}/800/600`,
          timestamp: getTimestamp()
        }]);
        setIsTyping(false);
        return;
      } else if (lowerText.match(/(code|react|javascript|html|css|function|build|debug)/)) {
         aiResponseText = "```javascript\n// Neural initialization sequence\nconst analyze = (data) => {\n  console.log('Processing logical node...');\n  return optimizedResult;\n};\n```\nI have structured a technical response based on recent node processing.";
      } else if (lowerText.match(/(hello|hi|hey|greetings)/)) {
         aiResponseText = "Greetings, user. Systems are fully functional and ready for your directives.";
      } else {
         aiResponseText = "I have processed your query. Analysis indicates a 98.7% probability of success. How else may I assist you?";
      }

      setMessages((prev) => [...prev, {
        sender: 'ai',
        type: 'text',
        content: aiResponseText,
        timestamp: getTimestamp()
      }]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // 1.5s to 2.5s delay
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    playSendSound();

    const newMsg = {
      sender: 'user',
      type: 'text',
      content: input.trim(),
      timestamp: getTimestamp()
    };
    
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    simulateAIResponse(input.trim());
  };

  const handleGenerateImage = () => {
    playSendSound();
    
    const userMsg = {
      sender: 'user',
      type: 'text',
      content: "/generate_image futuristic city view",
      timestamp: getTimestamp()
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, {
        sender: 'ai',
        type: 'image',
        content: `https://picsum.photos/800/600?random=${Math.random()}`,
        timestamp: getTimestamp()
      }]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-transparent font-sans text-white overflow-hidden relative">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-30">
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.05, 1] }} 
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="w-[80vw] h-[80vw] sm:w-[50vw] sm:h-[50vw] rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-600/10 blur-[100px]"
        />
      </div>

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4 glass border-b border-white/10 shadow-lg backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#00f3ff]" />
          <h1 className="text-xl font-bold tracking-widest neon-text-blue uppercase">J.A.R.V.I.S UI</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-xs tracking-widest text-cyan-400 font-mono hidden sm:block opacity-60">SYSTEM.ONLINE</div>
          <div className="w-8 h-8 rounded-full border border-purple-500/50 flex items-center justify-center bg-purple-500/20 shadow-[0_0_15px_rgba(157,0,255,0.3)]">
            <span className="text-xs font-bold text-purple-200">AI</span>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-hidden relative z-10 flex flex-col pt-4">
        <ChatWindow messages={messages} isTyping={isTyping} />
      </main>

      {/* Input Area */}
      <InputBox 
        input={input} 
        setInput={setInput} 
        handleSend={handleSend} 
        handleGenerateImage={handleGenerateImage} 
      />
    </div>
  );
};

export default App;
