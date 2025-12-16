import React from 'react';
import { X, ExternalLink, Briefcase } from 'lucide-react';

interface CareersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CareersModal: React.FC<CareersModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const platforms = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/%C3%B6mer-ayd%C4%B1n-907035294/",
      color: "bg-[#0077b5]",
      textColor: "text-white",
      desc: "Profesyonel ağımızda bize katılın."
    },
    {
      name: "Kariyer.net",
      url: "https://www.kariyer.net",
      color: "bg-[#8b3dff]",
      textColor: "text-white",
      desc: "Yerel açık pozisyonları inceleyin."
    },
    {
      name: "Indeed",
      url: "https://tr.indeed.com",
      color: "bg-[#2557a7]",
      textColor: "text-white",
      desc: "Global fırsatlara göz atın."
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 animate-scale-in">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-stone-100 rounded-full text-stone-400 hover:text-stone-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3">
                <Briefcase className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900">Kariyer Fırsatları</h3>
            <p className="text-stone-500 mt-2">
                Star Tech ailesine katılmak ve geleceği şekillendirmek için aşağıdaki platformlardan başvurunuzu iletebilirsiniz.
            </p>
        </div>

        <div className="space-y-4">
            {platforms.map((platform) => (
                <a 
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-4 rounded-xl border border-stone-200 hover:border-transparent hover:shadow-lg transition-all duration-300 bg-white hover:bg-stone-50"
                >
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg ${platform.color} flex items-center justify-center font-bold text-white shadow-sm`}>
                            {platform.name.substring(0, 2)}
                        </div>
                        <div className="text-left">
                            <h4 className="font-bold text-stone-900 group-hover:text-primary-700 transition-colors">{platform.name}</h4>
                            <p className="text-xs text-stone-500">{platform.desc}</p>
                        </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-stone-300 group-hover:text-stone-600 group-hover:translate-x-1 transition-all" />
                </a>
            ))}
        </div>
        
        <div className="mt-8 text-center border-t border-stone-100 pt-6">
            <p className="text-xs text-stone-400">
                Açık pozisyon bulunmaması durumunda genel başvurular havuzda tutulacaktır.
            </p>
        </div>

      </div>
    </div>
  );
};