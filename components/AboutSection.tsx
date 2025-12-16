import React from 'react';
import { Target, Globe, Trash2, Wallet, HeartPulse, Clock, BarChart3, Leaf } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="text-primary-600 font-semibold tracking-wider text-sm uppercase mb-3 block">Hakkımızda</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-stone-900 mb-8 leading-tight">
            Kiler Akıllı Tarif Uygulaması
          </h2>
          
          <div className="space-y-6 text-lg text-stone-600 leading-relaxed text-left md:text-center">
            <p>
              <span className="font-bold text-stone-800">Kiler</span>, mutfak alışkanlıklarını dijitalleştiren ve sürdürülebilirlik bilinciyle hareket eden yeni nesil bir teknoloji girişimidir. Gelişmiş <strong>Yapay Zekâ (AI)</strong> algoritmalarını kullanarak, kullanıcıların elindeki malzemeleri saniyeler içinde analiz eder ve kişiye özel, uygulanabilir reçeteler sunar.
            </p>
            <p>
              Birleşmiş Milletler Gıda İsrafı Endeksi Raporu'na göre, dünyada her yıl üretilen gıdanın yaklaşık <strong>%17'si (yaklaşık 931 milyon ton)</strong> çöpe gitmektedir. Bu israfın %61'i ise ne yazık ki hane halkı düzeyinde gerçekleşmektedir. Kiler, tam olarak bu soruna teknolojik bir çözüm getirmek için 2024 yılında Türkiye'de kurulmuştur.
            </p>
            <p>
              Misyonumuz, teknolojiyi kullanarak hanelerin gıda bütçesinden <strong>aylık ortalama %30 tasarruf</strong> etmesini sağlamak ve karbon ayak izini mutfaktan başlayarak küçültmektir.
            </p>
          </div>
        </div>

        {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="bg-cream-50 p-10 rounded-[2rem] border border-cream-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-300">
                <Leaf className="w-7 h-7 text-primary-600 group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900">Sürdürülebilirlik Hedefimiz</h3>
            </div>
            <p className="text-stone-600 leading-relaxed text-lg">
              Türkiye genelinde 2025 yılı sonuna kadar <strong>1 milyon öğünün</strong> çöpe gitmesini engellemeyi hedefliyoruz. Kullanıcılarımızın dolaplarındaki "atıl" görünen malzemeleri gurme lezzetlere dönüştürerek, tüketim çılgınlığı yerine "türetim" bilincini aşılıyoruz.
            </p>
          </div>

          <div className="bg-cream-50 p-10 rounded-[2rem] border border-cream-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
             <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                <Globe className="w-7 h-7 text-yellow-700 group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900">Global Vizyonumuz</h3>
            </div>
            <p className="text-stone-600 leading-relaxed text-lg">
              Yerel mutfak kültürünü yapay zekâ ile harmanlayarak global pazara açılmak. Kiler algoritmaları şu an Türk mutfağına optimize edilmiş olsa da, veri tabanımız Akdeniz ve Asya mutfaklarını da kapsayacak şekilde genişlemektedir.
            </p>
          </div>
        </div>

        {/* Stats / Problems Solved */}
        <div>
           <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-stone-900">Verilerle Çözüm Yaklaşımımız</h2>
             <p className="mt-4 text-stone-500">Kiler kullanmaya başlayan hanelerde gözlemlenen değişimler.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Problem 1 */}
              <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:border-primary-200 hover:shadow-lg transition-all text-center group">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Trash2 className="w-8 h-8 text-red-500" />
                </div>
                <h4 className="font-bold text-stone-800 text-lg mb-2">Sıfır Atık</h4>
                <p className="text-sm text-stone-600">
                  Kullanıcılarımız, buzdolabı stok takibi sayesinde gıda israfını <strong>%65 oranında</strong> azalttı.
                </p>
              </div>

              {/* Problem 2 */}
              <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:border-primary-200 hover:shadow-lg transition-all text-center group">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Wallet className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-bold text-stone-800 text-lg mb-2">Ekonomik Tasarruf</h4>
                <p className="text-sm text-stone-600">
                  Dışarıdan sipariş verme sıklığının azalmasıyla hane bütçesine yıllık ortalama <strong>12.000₺</strong> katkı.
                </p>
              </div>

              {/* Problem 3 */}
              <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:border-primary-200 hover:shadow-lg transition-all text-center group">
                <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <HeartPulse className="w-8 h-8 text-orange-500" />
                </div>
                <h4 className="font-bold text-stone-800 text-lg mb-2">Dengeli Beslenme</h4>
                <p className="text-sm text-stone-600">
                  AI destekli makro/mikro besin analizleri ile kullanıcıların <strong>%80'i</strong> daha sağlıklı beslendiğini belirtiyor.
                </p>
              </div>

              {/* Problem 4 */}
              <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:border-primary-200 hover:shadow-lg transition-all text-center group">
                 <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Clock className="w-8 h-8 text-blue-500" />
                </div>
                <h4 className="font-bold text-stone-800 text-lg mb-2">Zaman Yönetimi</h4>
                <p className="text-sm text-stone-600">
                  "Bugün ne pişirsem?" sorusuna harcanan haftalık <strong>2.5 saati</strong> geri kazandırıyoruz.
                </p>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};