
import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { getWellnessAdvice } from '../services/gemini';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: "Welcome to L.A. Hotel & Spa Wellness. How can I assist with your fitness journey today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const aiResponse = await getWellnessAdvice(userMsg);
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse || "I apologize, I'm unable to answer right now." }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 md:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col h-[500px]">
          <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Bot className="text-amber-500" size={20} />
              <span className="font-semibold italic">Wellness Concierge</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-amber-500"><X size={20} /></button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl ${m.role === 'user' ? 'bg-amber-100 text-slate-800' : 'bg-slate-100 text-slate-700'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && <div className="text-slate-400 italic">Thinking...</div>}
          </div>
          <div className="p-4 border-t border-slate-100 flex gap-2">
            <input 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask about training, spa, or health..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <button 
              onClick={handleSend}
              className="bg-amber-500 text-white p-2 rounded-full hover:bg-amber-600"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-slate-900 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform gold-gradient"
        >
          <MessageSquare size={24} className="text-slate-900" />
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
