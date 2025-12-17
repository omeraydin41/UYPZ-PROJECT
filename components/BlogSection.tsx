import React, { useState } from 'react';
import { BookOpen, TrendingUp, ChefHat, Activity, Calendar, ArrowUpRight, Quote, X, Clock } from 'lucide-react';

interface BlogPost {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  role: string;
  imagePrompt: string;
  date: string;
  readTime: string;
  content: React.ReactNode; // Extended content for the modal
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    category: "Sağlık Köşesi",
    title: "Ne Yersen O'sun: Mikrobiyota ve Bağışıklık",
    excerpt: "Bağışıklık sistemimizin %70’i bağırsaklarımızda yönetilir. Tablet probiyotikler yerine; ev yapımı turşu ve doğal yoğurt gibi 'canlı' gıdaları tüketin.",
    author: "Dr. Osman Müftüoğlu",
    role: "İç Hastalıkları Uzmanı",
    imagePrompt: "portrait of senior turkish male doctor Osman Muftuoglu white hair glasses smiling kindly professional photography lighting grey background",
    date: "12 Ekim 2023",
    readTime: "5 dk okuma",
    content: (
      <>
        <p className="mb-4">
          <strong>Hipokrat ne demişti?</strong> "Bütün hastalıklar bağırsakta başlar." Binlerce yıl sonra modern tıp bu sözü doğruluyor. Bağışıklık sistemimizin komuta merkezi, ne kalbimiz ne de beynimizdir; bağırsaklarımızdır.
        </p>
        <h4 className="text-xl font-bold text-stone-800 mb-2">İkinci Beynimiz: Bağırsaklar</h4>
        <p className="mb-4">
          Vücudumuzda trilyonlarca bakteri ile birlikte yaşıyoruz. Bu bakterilerin oluşturduğu ekosisteme "mikrobiyota" diyoruz. Eğer mikrobiyotanızdaki yararlı bakteriler (probiyotikler) çoğunluktaysa, bağışıklık sisteminiz bir kale gibi sağlamdır. Ancak şekerli gıdalar, işlenmiş ürünler ve gereksiz antibiyotik kullanımı ile bu dengeyi bozarsanız, kale içeriden çökmeye başlar.
        </p>
        <h4 className="text-xl font-bold text-stone-800 mb-2">Hap Yutma, Turşu Ye!</h4>
        <p className="mb-4">
          Piyasada satılan probiyotik tabletlerin çoğu mide asidine dayanamadan etkisini yitiriyor. Oysa bizim geleneksel mutfağımız tam bir şifa deposu. Ev yapımı lahana turşusu, katkısız ev yoğurdu, kefir ve tarhana... Bunlar "canlı" gıdalardır.
        </p>
        <p>
          Mevsim geçişlerinde hasta olmak istemiyorsanız formül basit: Günde bir kase ev yoğurdu, haftada iki kez bakliyat ve sofradan eksik etmeyeceğiniz az tuzlu turşu. Bırakın ilaçları eczanede kalsın, sizin ilacınız mutfağınızda.
        </p>
      </>
    )
  },
  {
    id: 2,
    category: "Şefin Tavsiyesi",
    title: "Mühürleme Sanatı: Etin Suyunu Hapsetmek",
    excerpt: "Döküm tavayı duman çıkana kadar ısıtın. Eti attığınızda o güçlü 'cız' sesini duymalısınız. Mühürledikten sonra eti hemen kesmeyin, dinlendirin.",
    author: "Şef Arda Türkmen",
    role: "Profesyonel Şef",
    imagePrompt: "portrait of turkish chef Arda Turkmen beard smiling wearing apron kitchen studio background professional lighting",
    date: "15 Ekim 2023",
    readTime: "4 dk okuma",
    content: (
      <>
        <p className="mb-4">
          Mutfakta en sık yapılan hata nedir biliyor musunuz? Tavayı yeterince ısıtmadan eti içine atmak. Eğer et tavaya değdiğinde o güçlü "cızz" sesini duymuyorsanız, etiniz pişmiyor, haşlanıyor demektir.
        </p>
        <h4 className="text-xl font-bold text-stone-800 mb-2">Maillard Reaksiyonu Nedir?</h4>
        <p className="mb-4">
          Mühürleme dediğimiz işlem, aslında kimyada "Maillard Reaksiyonu" olarak geçer. Etin yüzeyindeki protein ve şekerlerin yüksek ısıda karamelize olmasıdır. Bu işlem ete o muazzam kahverengi rengi ve o isli lezzeti verir.
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-2 marker:text-primary-600">
            <li><strong>Döküm Tava Kullanın:</strong> Isıyı en iyi tutan tava dökümdür. İyice ısınmasını bekleyin, hafif duman çıkmalı.</li>
            <li><strong>Eti Kurulayın:</strong> Etin yüzeyi ıslaksa mühürlenmez. Kağıt havlu ile nemini alın.</li>
            <li><strong>Dokunmayın:</strong> Eti tavaya koyduktan sonra sürekli çevirmeyin. Bırakın bir yüzeyi iyice kabuk bağlasın.</li>
        </ul>
        <p>
          Ve en önemli kural: <strong>Dinlendirme.</strong> Eti pişirir pişirmez keserseniz, içindeki bütün lezzetli sular tahtaya akar. Eti tavadan aldıktan sonra en az 5-6 dakika bekleyin. Böylece sular liflerin arasına geri dağılır ve her lokmada sulu bir et yersiniz.
        </p>
      </>
    )
  },
  {
    id: 3,
    category: "Gurme Bakış",
    title: "Damak Çatlatan Gerçek: Malzemeye Saygı",
    excerpt: "İyi yemek, karmaşık soslarla maskelenmiş tabaklar değil; mevsiminde toplanmış 'dürüst' malzemedir. Tabaktaki hikaye, toprağıyla başlar.",
    author: "Vedat Milor",
    role: "Gastronomi Eleştirmeni",
    imagePrompt: "portrait of Vedat Milor intellectual senior male food critic glasses suit holding wine glass professional portrait",
    date: "18 Ekim 2023",
    readTime: "6 dk okuma",
    content: (
      <>
        <p className="mb-4">
          Son yıllarda restoranlarda gördüğüm üzücü bir trend var: Malzemeyi tanınmaz hale getirmek. Üzerine trüf yağı dökülmüş, bilmem ne sosuna bulanmış, köpürtülmüş tabaklar... Peki ya malzemenin kendi tadı?
        </p>
        <h4 className="text-xl font-bold text-stone-800 mb-2">Basitlik En Zorudur</h4>
        <p className="mb-4">
          İtalyan mutfağı neden dünyada bu kadar seviliyor? Çünkü bir makarna yaparken sadece domates, fesleğen ve zeytinyağı kullanırlar. Ama o domates, Vezüv yanardağının eteklerinde güneşle olgunlaşmıştır. O zeytinyağı, soğuk sıkımdır.
        </p>
        <p className="mb-4">
          Bizim mutfağımızda da "karnıyarık" buna en iyi örnektir. Patlıcanın acısını almadan, kıymayı doğru kavurmadan, domatesin mevsimini beklemeden yapılan karnıyarık, sadece yağlı bir sebze yemeğidir. Ama hakkıyla yapılırsa, bir sanat eseridir.
        </p>
        <p>
          Lütfen mevsiminde yemeye özen gösterin. Ocak ayında domates, Temmuz ayında karnabahar yemeyin. Malzemeye saygı duyarsanız, o da size lezzet olarak geri dönecektir. Benim kriterim budur; yemek "dürüst" olmalıdır.
        </p>
      </>
    )
  },
  {
    id: 4,
    category: "Diyet & Denge",
    title: "Yasaklamadan Zayıflama: %80-%20 Kuralı",
    excerpt: "Diyet yapmak aç kalmak değildir. Öğünlerinizin %80'i hücrelerinizi, %20'si ruhunuzu beslesin. Renk çeşitliliğine odaklanın, kalori saymayın.",
    author: "Dyt. Dilara Koçak",
    role: "Uzman Diyetisyen",
    imagePrompt: "portrait of turkish nutritionist Dilara Kocak blonde hair professional business woman smiling bright office background",
    date: "20 Ekim 2023",
    readTime: "3 dk okuma",
    content: (
      <>
        <p className="mb-4">
          Danışanlarımın çoğu ofisime "Artık hiçbir şey yemeyeceğim" suçluluğuyla geliyor. Oysa sürdürülebilir olmayan hiçbir beslenme planı başarıya ulaşamaz. Hayat boyu ekmek yemeden, tatlıyı tamamen keserek yaşayabilir misiniz? Hayır.
        </p>
        <h4 className="text-xl font-bold text-stone-800 mb-2">80/20 Dengesini Kurun</h4>
        <p className="mb-4">
          Bu kural çok basit: Haftalık öğünlerinizin %80'inde vücudunuzun ihtiyacı olan besinleri (protein, lif, vitamin) alın. Kalan %20'sinde ise ruhunuzu besleyin. Arkadaşınızla yediğiniz bir dilim pizza veya akşam kahvesinin yanındaki küçük bir çikolata, sizi şişmanlatmaz; aksine diyete sadık kalmanızı sağlar.
        </p>
        <h4 className="text-xl font-bold text-stone-800 mb-2">Tabağınızı Renklendirin</h4>
        <p className="mb-4">
          Kalori saymayı bırakın, renkleri sayın. Tabağınızda ne kadar çok doğal renk varsa (yeşil, kırmızı, mor, turuncu), o kadar çok antioksidan alıyorsunuz demektir.
        </p>
        <p>
          Unutmayın, bedeniniz bir makine değil, bir tapınak. Ona yasaklar koyarak değil, onu severek ve iyi besleyerek ideal kilonuza ulaşabilirsiniz. Aç kalarak zayıflanmaz, hastalanılır.
        </p>
      </>
    )
  }
];

export const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handleOpenPost = (post: BlogPost) => {
    setSelectedPost(post);
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
  };

  const handleClosePost = () => {
    setSelectedPost(null);
    // Restore background scrolling
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <section id="blog" className="py-24 bg-stone-50 scroll-mt-20 relative overflow-hidden">
        {/* Decorative Background Text */}
        <div className="absolute top-20 left-0 w-full text-center pointer-events-none select-none overflow-hidden">
          <span className="text-[12rem] md:text-[20rem] font-black text-stone-100/50 leading-none tracking-tighter">
            KILER
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-[1px] bg-primary-600"></span>
                  <span className="text-primary-600 font-bold tracking-widest text-xs uppercase">Kiler Akademi</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 leading-tight">
                Uzmanlardan <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-stone-800 to-stone-500">İlham Veren İçerikler</span>
              </h2>
            </div>
            <button className="group flex items-center gap-2 text-stone-600 font-bold hover:text-primary-600 transition-colors border-b-2 border-transparent hover:border-primary-600 pb-1">
              Tüm Yazıları Gör <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          {/* Modern Magazine Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => {
               // AI Generated Portrait URL
               const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(post.imagePrompt)}?width=800&height=800&nologo=true&seed=${post.id}`;
               
               return (
                <div key={post.id} className="group relative bg-white rounded-[2.5rem] p-3 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border border-stone-100 flex flex-col h-full">
                  
                  {/* Image Container */}
                  <div className="relative h-72 md:h-80 w-full overflow-hidden rounded-[2rem] cursor-pointer" onClick={() => handleOpenPost(post)}>
                    <img 
                      src={imageUrl} 
                      alt={post.author} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.95] group-hover:brightness-100"
                      loading="lazy"
                    />
                    
                    {/* Floating Category Badge */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-stone-900 shadow-lg border border-white/50 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                      {post.category}
                    </div>

                    {/* Decorative Quote Icon */}
                    <div className="absolute -bottom-4 -right-4 text-white opacity-20 transform rotate-12 group-hover:scale-110 transition-transform">
                        <Quote className="w-32 h-32 fill-current" />
                    </div>

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                         <span className="bg-white/90 backdrop-blur text-stone-900 px-6 py-3 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                            Yazıyı Oku
                         </span>
                    </div>
                  </div>

                  {/* Content Card - Overlapping */}
                  <div className="relative z-10 mx-2 -mt-12 mb-2 flex-1 flex flex-col">
                      <div className="bg-white rounded-[1.5rem] p-6 shadow-xl border border-stone-100 group-hover:border-primary-100 transition-colors h-full flex flex-col">
                          <div className="flex justify-between items-center mb-4 border-b border-stone-100 pb-4">
                              <div>
                                  <h3 className="text-sm font-bold text-stone-900">{post.author}</h3>
                                  <p className="text-xs text-primary-600 font-medium">{post.role}</p>
                              </div>
                              <div className="text-right">
                                  <div className="flex items-center gap-1 text-stone-400 text-xs mb-1">
                                      <Calendar className="w-3 h-3" /> {post.date}
                                  </div>
                                  <div className="text-[10px] font-bold text-stone-300 bg-stone-50 px-2 py-1 rounded-md inline-block">
                                      {post.readTime}
                                  </div>
                              </div>
                          </div>

                          <h3 
                            className="text-xl font-extrabold text-stone-900 mb-3 leading-tight group-hover:text-primary-700 transition-colors cursor-pointer"
                            onClick={() => handleOpenPost(post)}
                          >
                              {post.title}
                          </h3>
                          
                          <p className="text-stone-500 text-sm leading-relaxed line-clamp-2 mb-4 group-hover:text-stone-600">
                              {post.excerpt}
                          </p>

                          <div className="mt-auto">
                            <button 
                                onClick={() => handleOpenPost(post)}
                                className="flex items-center text-primary-600 font-bold text-sm group/btn cursor-pointer hover:bg-primary-50 px-3 py-2 rounded-lg -ml-3 w-max transition-colors"
                            >
                                Devamını Oku 
                                <ArrowUpRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                            </button>
                          </div>
                      </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Full Article Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-md transition-opacity duration-300 animate-fade-in" 
            onClick={handleClosePost}
          />

          {/* Modal Container */}
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-scale-in">
             
             {/* Close Button */}
             <button 
                onClick={handleClosePost}
                className="absolute top-5 right-5 z-50 p-2.5 bg-white/50 hover:bg-white backdrop-blur-md rounded-full text-stone-800 shadow-sm transition-all border border-stone-200"
             >
                <X className="w-5 h-5" />
             </button>

             {/* Left: Image Sidebar (Mobile: Top) */}
             <div className="w-full md:w-2/5 h-64 md:h-auto relative">
                <img 
                    src={`https://image.pollinations.ai/prompt/${encodeURIComponent(selectedPost.imagePrompt)}?width=600&height=1000&nologo=true&seed=${selectedPost.id}`} 
                    alt={selectedPost.author} 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-stone-900/40"></div>
                
                {/* Author Info Overlay */}
                <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                    <div className="inline-block px-3 py-1 bg-primary-600 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 shadow-md">
                        {selectedPost.category}
                    </div>
                    <h3 className="text-2xl font-bold leading-tight mb-1">{selectedPost.author}</h3>
                    <p className="text-primary-200 text-sm font-medium">{selectedPost.role}</p>
                </div>
             </div>

             {/* Right: Content Area */}
             <div className="w-full md:w-3/5 overflow-y-auto bg-white relative">
                 <div className="p-8 md:p-12">
                    {/* Meta Data */}
                    <div className="flex items-center gap-4 text-stone-400 text-xs font-bold uppercase tracking-widest mb-6 border-b border-stone-100 pb-6">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" /> {selectedPost.date}
                        </span>
                        <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" /> {selectedPost.readTime}
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 mb-8 leading-tight">
                        {selectedPost.title}
                    </h2>

                    {/* Article Body */}
                    <div className="prose prose-stone prose-lg text-stone-600 leading-relaxed marker:text-primary-600">
                        {selectedPost.content}
                    </div>

                    {/* Footer / Signature */}
                    <div className="mt-12 pt-8 border-t border-stone-100 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center">
                                <Quote className="w-5 h-5 text-stone-400" />
                            </div>
                            <span className="text-sm font-bold text-stone-900 italic">Kiler Akademi Editör Masası</span>
                         </div>
                         <button className="text-primary-600 font-bold text-sm hover:underline">Paylaş</button>
                    </div>
                 </div>
             </div>

          </div>
        </div>
      )}
    </>
  );
};