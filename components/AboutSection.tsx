import React from 'react';
import { Target, Globe, Trash2, Wallet, HeartPulse, Clock, Leaf, Cpu, ArrowUpRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white relative scroll-mt-20 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-primary-50/50 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-[600px] h-[600px] bg-stone-100/80 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-bold uppercase tracking-wider mb-4">
             <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
             Hikayemiz
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-6 tracking-tight">
            Mutfakta Teknoloji Devrimi
          </h2>
          <p className="text-lg text-stone-500 leading-relaxed">
            Geleneksel mutfak alışkanlıklarını yapay zeka ile dönüştürüyor, <span className="text-stone-900 font-semibold">israfı önlerken lezzeti artırıyoruz.</span>
          </p>
        </div>

        {/* Top Split Section: Narrative + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1 space-y-6">
                <div className="prose prose-lg text-stone-600">
                    <p className="leading-relaxed">
                        <span className="font-bold text-stone-900 text-xl">Kiler</span>, mutfak alışkanlıklarını dijitalleştiren ve sürdürülebilirlik bilinciyle hareket eden yeni nesil bir teknoloji girişimidir. 
                    </p>
                    <p className="leading-relaxed">
                        Birleşmiş Milletler raporlarına göre, dünyada her yıl üretilen gıdanın yaklaşık <span className="inline-block px-2 py-0.5 bg-red-50 text-red-600 font-bold rounded border border-red-100">%17'si çöpe gidiyor.</span> Bu israfın büyük bir kısmı ise ne yazık ki hane halkı düzeyinde gerçekleşiyor.
                    </p>
                    <p className="leading-relaxed">
                        Biz, teknolojiyi kullanarak hanelerin gıda bütçesinden <strong>aylık ortalama %30 tasarruf</strong> etmesini sağlamak ve karbon ayak izini mutfaktan başlayarak küçültmek için yola çıktık.
                    </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                     <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-2xl border border-stone-100">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                             <Cpu className="w-5 h-5 text-primary-600" />
                        </div>
                        <div className="text-sm">
                            <span className="block font-bold text-stone-900">AI Destekli</span>
                            <span className="text-stone-500">Gemini Altyapısı</span>
                        </div>
                     </div>
                     <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-2xl border border-stone-100">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                             <Target className="w-5 h-5 text-accent" />
                        </div>
                         <div className="text-sm">
                            <span className="block font-bold text-stone-900">Hedef Odaklı</span>
                            <span className="text-stone-500">Sıfır Atık</span>
                        </div>
                     </div>
                </div>
            </div>

            <div className="order-1 lg:order-2 relative group">
                <div className="absolute inset-0 bg-primary-200 rounded-[2.5rem] rotate-3 group-hover:rotate-1 transition-transform duration-500"></div>
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white h-[400px] lg:h-[500px]">
                     <img 
                        src="https://image.pollinations.ai/prompt/futuristic%20sustainable%20kitchen%20warm%20lighting%20fresh%20vegetables%20digital%20interface%20hologram?width=800&height=1000&nologo=true" 
                        alt="Kiler Vision" 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 text-white">
                        <p className="font-medium text-lg">"Geleceğin mutfağı, bugünün malzemeleriyle kurulur."</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Bento Grid: Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {/* Main Card */}
            <div className="md:col-span-2 bg-stone-900 rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary-600/30 transition-colors"></div>
                
                <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="mb-6">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                            <Leaf className="w-6 h-6 text-primary-400" />
                        </div>
                        <h3 className="text-3xl font-bold mb-4">Sürdürülebilirlik Misyonu</h3>
                        <p className="text-stone-300 leading-relaxed max-w-xl">
                            Türkiye genelinde 2025 yılı sonuna kadar <strong>1 milyon öğünün</strong> çöpe gitmesini engellemeyi hedefliyoruz. Kullanıcılarımızla birlikte, tüketim çılgınlığı yerine "türetim" bilincini inşa ediyoruz.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-primary-300 font-medium text-sm group-hover:translate-x-2 transition-transform cursor-default">
                        Detaylı İncele <ArrowUpRight className="w-4 h-4" />
                    </div>
                </div>
            </div>

            {/* Secondary Card */}
            <div className="bg-primary-50 rounded-[2rem] p-8 md:p-10 border border-primary-100 flex flex-col justify-between group hover:shadow-lg transition-all">
                <div>
                     <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                        <Globe className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-stone-900 mb-3">Global Vizyon</h3>
                    <p className="text-stone-600 text-sm leading-relaxed">
                        Yerel mutfak kültürünü yapay zekâ ile harmanlayarak global pazara açılmak. Veri tabanımız Akdeniz ve Asya mutfaklarını da kapsayacak şekilde genişliyor.
                    </p>
                </div>
            </div>
        </div>

        {/* Stats / Impact Grid */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-stone-200/50 border border-stone-100 p-8 md:p-12">
            <div className="text-center mb-10">
                <h3 className="text-2xl font-bold text-stone-900">Verilerle Etkimiz</h3>
                <p className="text-stone-500 text-sm mt-2">Kiler kullanan hanelerde ölçülen ortalama değişimler</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                 {[
                    { icon: Trash2, color: "text-red-500", bg: "bg-red-50", label: "Gıda İsrafı", value: "-%65" },
                    { icon: Wallet, color: "text-green-600", bg: "bg-green-50", label: "Bütçe Katkısı", value: "₺12K+" },
                    { icon: HeartPulse, color: "text-orange-500", bg: "bg-orange-50", label: "Sağlıklı Beslenme", value: "%80" },
                    { icon: Clock, color: "text-blue-500", bg: "bg-blue-50", label: "Zaman Tasarrufu", value: "2.5 Sa" }
                 ].map((stat, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center group">
                        <div className={`w-16 h-16 ${stat.bg} rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300`}>
                            <stat.icon className={`w-8 h-8 ${stat.color}`} />
                        </div>
                        <span className="text-3xl font-black text-stone-900 mb-1 tracking-tight">{stat.value}</span>
                        <span className="text-sm font-medium text-stone-500 uppercase tracking-wide">{stat.label}</span>
                    </div>
                 ))}
            </div>
        </div>

      </div>
    </section>
  );
};