
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Language, translations } from '../translations';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

interface ChatBotProps {
  lang: Language;
}

const ChatBot: React.FC<ChatBotProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'bot', 
      text: lang === 'tr' 
        ? "Merhaba! Ben Lahana Bot. 🥬 Sana en doğru tavsiyeleri verebilmem için; herhangi bir sağlık problemin veya özel bir diyet gerektiren hastalığın var mı?" 
        : "Hello! I'm Cabbage Bot. 🥬 To give you the best advice; do you have any health problems or illnesses that require a special diet?" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Kullanıcı durumu: "${userMsg}". 
        
        Lütfen cevabını karmaşık cümleler yerine GÖRSEL BİR AĞAÇ YAPISINDA (Tree Structure) ver. 
        Format şu şekilde olmalı:
        
        [Hastalık/Durum Adı]
        ┃
        ┣━ 🛑 UZAK DURULMASI GEREKENLER (Dallar)
        ┃  ┗━ [Madde 1]
        ┃  ┗━ [Madde 2]
        ┃
        ┣━ ✅ TAVSİYE EDİLEN GIDALAR
        ┃  ┗━ [Madde 1]
        ┃  ┗━ [Madde 2]
        ┃
        ┗━ 👨‍🍳 PİŞİRME & MUTFAK SIRLARI
           ┗━ [Teknik önerisi]
           ┗━ [Kısa tarif ipucu]

        Yanıt dili: ${lang === 'tr' ? 'Türkçe' : 'İngilizce'}. Uzun açıklamalar yapma, sadece hiyerarşik yapıyı koru.`,
        config: {
          systemInstruction: "Sen Lahana Bot'sun. Uzman bir diyetisyen ve şefsin. Yanıtlarını her zaman karmaşık metinlerden arındırılmış, görsel bir ağaç yapısında ve hiyerarşik listeler kullanarak sunarsın.",
        }
      });

      const botReply = response.text || (lang === 'tr' ? "Üzgünüm, şu an yanıt veremiyorum." : "Sorry, I can't respond right now.");
      setMessages(prev => [...prev, { role: 'bot', text: botReply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: lang === 'tr' ? "Bir hata oluştu, lütfen tekrar dene." : "An error occurred, please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[350px] sm:w-[400px] h-[550px] bg-white dark:bg-stone-800 rounded-[2.5rem] shadow-2xl border border-emerald-100 dark:border-stone-700 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Header */}
          <div className="p-6 bg-emerald-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-inner">🥬</div>
              <div>
                <h4 className="font-black text-sm uppercase tracking-widest">Lahana Bot</h4>
                <p className="text-[10px] font-bold opacity-80 uppercase">Sağlık & Mutfak Danışmanı</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-xl transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-stone-50 dark:bg-stone-900/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-4 rounded-3xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                  msg.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-br-none' 
                    : 'bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 border border-stone-100 dark:border-stone-600 rounded-bl-none font-mono'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-stone-700 p-4 rounded-3xl rounded-bl-none border border-stone-100 dark:border-stone-600">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white dark:bg-stone-800 border-t border-stone-100 dark:border-stone-700">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={lang === 'tr' ? 'Mesajınızı yazın...' : 'Type your message...'}
                className="flex-1 bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-700 rounded-2xl px-4 py-3 text-sm outline-none focus:border-emerald-500 transition-colors dark:text-white"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-lg shadow-emerald-900/10 active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9-7-9-7v14z" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 border-4 border-white dark:border-stone-800 ${
          isOpen ? 'bg-red-500 rotate-90' : 'bg-emerald-600 shadow-emerald-600/30'
        }`}
      >
        {isOpen ? (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          "🥬"
        )}
      </button>
    </div>
  );
};

export default ChatBot;
