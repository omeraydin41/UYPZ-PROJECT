import React, { useState, useRef } from 'react';
import { GlassCard } from './GlassCard';
import { Button } from './Button';
import { editRecipeImage } from '../services/geminiService';

export const ImageEditor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResultImage(null); // Reset result when new image loaded
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!image || !prompt) return;
    
    setIsProcessing(true);
    try {
      const result = await editRecipeImage(image, prompt);
      setResultImage(result);
    } catch (err) {
      console.error(err);
      alert('Görsel düzenlenemedi. Lütfen tekrar deneyin.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full p-4 fade-in">
      {/* Controls */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        <GlassCard className="h-full flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-light text-white mb-2">Stüdyo Kiler <span className="text-emerald-400 text-sm align-top">AI</span></h2>
            <p className="text-stone-400 text-sm mb-6">
              Tarif görsellerinizi Gemini 2.5 kullanarak anında dönüştürün.
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-500 mb-2">Kaynak Görsel</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden" 
                />
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-stone-700 hover:border-emerald-500/50 rounded-xl p-8 text-center cursor-pointer transition-colors"
                >
                  {image ? (
                     <div className="flex items-center justify-center gap-2 text-emerald-400">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                       <span>Görsel Yüklendi</span>
                     </div>
                  ) : (
                    <span className="text-stone-500">Tarif Fotoğrafı Yükle</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-500 mb-2">Vizyon İstemi (Prompt)</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Örn: Rustik bir İtalyan akşam yemeği gibi göster, buhar ekle, sıcak ışıklandırma yap..."
                  className="w-full h-32 bg-stone-900/50 border border-stone-700 rounded-xl p-4 text-stone-200 focus:outline-none focus:border-emerald-500/50 resize-none placeholder-stone-600"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/5">
            <Button 
              onClick={handleGenerate} 
              isLoading={isProcessing}
              disabled={!image || !prompt}
              className="w-full"
            >
              Görsel Üret
            </Button>
          </div>
        </GlassCard>
      </div>

      {/* Preview Stage */}
      <div className="lg:col-span-8">
        <GlassCard className="h-full relative flex items-center justify-center bg-black/40 min-h-[500px]" noPadding>
          
          {!image && (
            <div className="text-stone-600 flex flex-col items-center">
              <svg className="w-16 h-16 mb-4 opacity-20" fill="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <span>Giriş bekleniyor...</span>
            </div>
          )}

          {image && !resultImage && (
            <img src={image} alt="Original" className="max-h-full max-w-full object-contain rounded-lg" />
          )}

          {resultImage && (
             <div className="relative w-full h-full p-4 flex gap-4">
                <div className="flex-1 flex flex-col gap-2">
                   <span className="text-xs text-stone-500 uppercase">Orijinal</span>
                   <div className="flex-1 relative overflow-hidden rounded-xl border border-white/10">
                      <img src={image!} alt="Original" className="absolute inset-0 w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity" />
                   </div>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                   <span className="text-xs text-emerald-500 uppercase">Gemini ile Düzenlendi</span>
                   <div className="flex-1 relative overflow-hidden rounded-xl border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                      <img src={resultImage} alt="Result" className="absolute inset-0 w-full h-full object-cover" />
                   </div>
                </div>
             </div>
          )}

          {isProcessing && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex items-center justify-center flex-col gap-4">
              <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin"></div>
              <p className="text-emerald-400 animate-pulse tracking-widest text-xs uppercase">Hayal ediliyor...</p>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
};