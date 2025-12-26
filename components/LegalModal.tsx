import React from 'react';
import { X, Shield, FileText, Lock, Cookie, Scale } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export type LegalDocType = 'privacy' | 'terms' | 'kvkk' | 'cookies' | null;

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  docType: LegalDocType;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, docType }) => {
  const { t } = useLanguage();
  if (!isOpen || !docType) return null;

  const getDocInfo = () => {
    switch (docType) {
      case 'privacy': return { icon: Lock, path: 'legal.privacy' };
      case 'terms': return { icon: Scale, path: 'legal.terms' };
      case 'kvkk': return { icon: Shield, path: 'legal.kvkk' };
      case 'cookies': return { icon: Cookie, path: 'legal.cookies' };
      default: return null;
    }
  };

  const info = getDocInfo();
  if (!info) return null;

  const Icon = info.icon;
  const bodyContent = t(`${info.path}.body`);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-md transition-opacity duration-300" onClick={onClose} />
      <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col animate-scale-in border border-stone-100">
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-stone-100 bg-white/95 backdrop-blur-sm rounded-t-[2rem] z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-stone-100 rounded-xl border border-stone-200">
              <Icon className="w-6 h-6 text-stone-700" />
            </div>
            <div>
                <h3 className="text-xl md:text-2xl font-bold text-stone-900 leading-tight">{t(`${info.path}.title`)}</h3>
                <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <p className="text-xs text-stone-500 font-medium uppercase tracking-wide">{t(`${info.path}.update`)}</p>
                </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 hover:bg-stone-100 rounded-full text-stone-400 hover:text-red-500 transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 md:p-10 overflow-y-auto bg-white text-stone-600 text-sm leading-relaxed space-y-4">
           {Array.isArray(bodyContent) ? (
             bodyContent.map((paragraph: string, index: number) => (
               <p key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                 {paragraph}
               </p>
             ))
           ) : (
             <p>{bodyContent}</p>
           )}
        </div>
        <div className="p-6 border-t border-stone-50 bg-stone-50/50 rounded-b-[2rem] text-center">
            <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Star Tech Ventures Legal Department</p>
        </div>
      </div>
    </div>
  );
};