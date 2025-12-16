import React from 'react';
import { X, Smartphone, Apple, Play } from 'lucide-react';

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadAppModal: React.FC<DownloadAppModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
        
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-primary-50 to-cream-100 -z-10"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-100 rounded-full blur-3xl opacity-50"></div>

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full text-stone-400 hover:text-stone-800 transition-all z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center p-8 pt-10">
          
          {/* Icon */}
          <div className="w-20 h-20 bg-white rounded-3xl shadow-xl shadow-primary-900/10 flex items-center justify-center mb-6 border border-stone-50 rotate-3 transform transition-transform hover:rotate-0">
            <Smartphone className="w-10 h-10 text-primary-600" />
          </div>

          <h3 className="text-2xl font-bold text-stone-900 mb-3">
            Daha Fazlası Cebinizde!
          </h3>
          
          <p className="text-stone-600 mb-8 leading-relaxed">
            Sınırsız tariflere, kişisel diyet asistanına ve market alışveriş listelerine erişmek için <span className="font-bold text-primary-700">Kiler Mobil</span> uygulamasını indirin.
          </p>

          <div className="space-y-3 w-full">
            {/* App Store Button - Converted to Link */}
            <a 
              href="https://www.apple.com/app-store/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 bg-stone-900 text-white px-6 py-3.5 rounded-xl hover:bg-stone-800 transition-all shadow-lg active:scale-95 group cursor-pointer"
            >
              <Apple className="w-6 h-6 fill-current" />
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] uppercase font-bold opacity-80">Indirin</span>
                <span className="text-lg font-bold group-hover:text-primary-200 transition-colors">App Store</span>
              </div>
            </a>

            {/* Google Play Button - Converted to Link */}
            <a 
              href="https://play.google.com/store" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 bg-stone-100 text-stone-800 border border-stone-200 px-6 py-3.5 rounded-xl hover:bg-stone-200 transition-all active:scale-95 group cursor-pointer"
            >
              <Play className="w-6 h-6 fill-stone-800" />
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] uppercase font-bold text-stone-500">Edinin</span>
                <span className="text-lg font-bold group-hover:text-primary-700 transition-colors">Google Play</span>
              </div>
            </a>
          </div>

          <div className="mt-6 pt-6 border-t border-stone-100 w-full">
            <p className="text-xs text-stone-400">
              Uygulamayı indirerek <a href="#" className="underline hover:text-primary-600">Kullanım Koşulları</a>'nı kabul etmiş olursunuz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};