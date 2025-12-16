import React, { useEffect, useState } from 'react';
import { X, ArrowLeft } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoSrc }) => {
  // Default stock video as fallback
  const defaultVideo = "https://videos.pexels.com/video-files/3209663/3209663-hd_1920_1080_25fps.mp4";
  const [currentSrc, setCurrentSrc] = useState<string>(videoSrc || defaultVideo);
  const [hasError, setHasError] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentSrc(videoSrc || defaultVideo);
      setHasError(false);
    }
  }, [isOpen, videoSrc]);

  // Handle video loading error (e.g., local file not found)
  const handleVideoError = () => {
    if (!hasError && currentSrc !== defaultVideo) {
      console.warn("Video file not found, switching to fallback.");
      setCurrentSrc(defaultVideo);
      setHasError(true);
    }
  };

  // Close on Escape key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Darkened Glassmorphism Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/95 backdrop-blur-md transition-opacity duration-500 animate-fade-in" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-6xl bg-black rounded-3xl shadow-2xl overflow-hidden animate-scale-in border border-white/10 ring-1 ring-white/10 group">
        
        {/* Header Gradient for better button visibility */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/90 to-transparent z-20 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-0" />
        
        {/* Close / Return Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all duration-300 border border-white/10 hover:scale-105 active:scale-95 group/btn cursor-pointer shadow-xl"
          aria-label="Siteye Dön"
        >
          <span className="text-sm font-semibold tracking-wide text-white/90 group-hover/btn:text-white">Siteye Dön</span>
          <div className="bg-white/20 rounded-full p-1 group-hover/btn:bg-white/30 transition-colors">
            <X className="w-4 h-4 text-white" />
          </div>
        </button>

        {/* Video Player */}
        <div className="relative aspect-video bg-stone-950 flex items-center justify-center">
             <video 
                className="w-full h-full object-contain shadow-2xl"
                controls
                autoPlay
                playsInline
                src={currentSrc}
                onError={handleVideoError}
            >
                Tarayıcınız video etiketini desteklemiyor.
            </video>
        </div>
      </div>
    </div>
  );
};