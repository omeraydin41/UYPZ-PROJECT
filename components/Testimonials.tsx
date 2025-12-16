import React from 'react';
import { Testimonial } from '../types';
import { Star } from 'lucide-react';

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ayşe Yılmaz",
    role: "Çalışan Anne",
    content: "İşten gelince ne pişireceğim stresi bitti. Evdeki üç malzemeyi yazıyorum, bana harika bir akşam yemeği planı çıkarıyor. Gerçekten hayat kurtarıcı.",
    avatarUrl: "https://randomuser.me/api/portraits/women/42.jpg",
    rating: 5
  },
  {
    id: 2,
    name: "Mehmet Demir",
    role: "Üniversite Öğrencisi",
    content: "Öğrenci evinde kalanlar bilir, malzeme azdır. Bu uygulama ile 'hiçbir şey yok' dediğim dolaptan gurme yemekler çıkardım. Makro değerlerini göstermesi de spor yapanlar için süper.",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5
  },
  {
    id: 3,
    name: "Selin Kaya",
    role: "Freelancer",
    content: "Gıda israfını önlemek için kullanmaya başladım. Artık çürümeye yüz tutmuş sebzelerim bile lezzetli bir çorbaya dönüşüyor. Premium plan parasını fazlasıyla hak ediyor.",
    avatarUrl: "https://randomuser.me/api/portraits/women/33.jpg",
    rating: 4
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">Kullanıcılarımız Ne Diyor?</h2>
          <p className="mt-4 text-slate-600">10.000+ mutlu mutfak ve kurtarılan binlerce öğün.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < t.rating ? 'text-yellow-400 fill-current' : 'text-slate-300'}`} 
                  />
                ))}
              </div>
              <p className="text-slate-700 mb-6 italic">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <img src={t.avatarUrl} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-100" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};