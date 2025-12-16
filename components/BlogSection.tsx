import React from 'react';
import { BookOpen, TrendingUp, ChefHat, Activity, Calendar } from 'lucide-react';

interface BlogPost {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  role: string;
  imagePrompt: string;
  date: string;
  icon: React.ElementType;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    category: "Sağlık & İstatistik",
    title: "Bağışıklık Kalkanı: 'Mikrobiyota' ve Doğal Probiyotikler",
    excerpt: "Bağışıklık sistemimizin %70’i bağırsaklarımızda yönetilir. Tablet probiyotikler yerine; ev yapımı lahana turşusu, fermente sirke, kefir ve doğal yoğurt gibi 'canlı' gıdaları tüketmek, bağırsak florasını %40 oranında daha hızlı iyileştiriyor. Özellikle mevsim geçişlerinde, antioksidan kapasitesi yüksek olan mor meyveleri, zerdeçalı ve Omega-3 zengini balıkları sofranızdan eksik etmeyin. Unutmayın; hücreleriniz yediklerinizi hatırlar, ne yerseniz o'sunuz.",
    author: "Dr. Osman Müftüoğlu",
    role: "İç Hastalıkları Uzmanı",
    imagePrompt: "senior male doctor white coat kindly smile hospital background professional photography",
    date: "12 Ekim 2023",
    icon: Activity
  },
  {
    id: 2,
    category: "Mutfak Teknikleri",
    title: "Kusursuz Et Pişirmenin Altın Kuralı: Mühürleme ve Dinlendirme",
    excerpt: "Et pişirirken yapılan en büyük hata, tavanın yeterince ısınmasını beklememektir. Etin suyunu içine hapsetmek (Maillard reaksiyonu) için döküm tavayı duman çıkana kadar ısıtın ve eti attığınızda o güçlü 'cız' sesini duyun. Eti mühürledikten sonra hemen kesmeyin; pişirme süresinin yarısı kadar (en az 5-8 dakika) oda sıcaklığında dinlendirin. Bu işlem, etin içindeki suların liflere geri dağılmasını sağlar ve lokum gibi bir sonuç verir.",
    author: "Şef Arda Türkmen",
    role: "Ünlü Şef & TV Programcısı",
    imagePrompt: "turkish male chef cooking in kitchen apron happy professional lighting",
    date: "15 Ekim 2023",
    icon: ChefHat
  },
  {
    id: 3,
    category: "Gastronomi Kültürü",
    title: "Görsellik mi, Lezzet mi? 2024'ün 'Gerçek Yemek' Manifestosu",
    excerpt: "Son yıllarda sosyal medya uğruna lezzetin ikinci plana atıldığı, şova dayalı sunumların arttığı bir dönemden geçtik. Ancak 2024 itibarıyla dünya gastronomisi 'öze dönüş' yaşıyor. Artık karmaşık soslarla maskelenmiş tabaklar değil; coğrafi işaretli, mevsiminde toplanmış ve yerel üreticiden gelen 'dürüst' malzemeler kıymetli. İyi yemek, malzemeye saygı duymakla başlar. Tabaktaki hikaye, o ürünün toprağıyla olan ilişkisidir.",
    author: "Vedat Milor",
    role: "Gastronomi Eleştirmeni",
    imagePrompt: "intellectual male food critic tasting wine restaurant glasses suit tie",
    date: "18 Ekim 2023",
    icon: TrendingUp
  },
  {
    id: 4,
    category: "Sürdürülebilir Diyet",
    title: "Yasaklayarak Değil, Dengeleyerek Zayıflama Sanatı",
    excerpt: "Diyet yapmak, aç kalmak veya sevdiğiniz her şeyden vazgeçmek demek değildir. Vücudu kıtlık psikolojisine sokarsanız, metabolizma kendini korumaya alarak yavaşlar. Bunun yerine %80-%20 kuralını uygulayın: Öğünlerinizin %80'i hücrelerinizi besleyen kaliteli protein ve sebzelerden, %20'si ise ruhunuzu besleyen sevdiğiniz tatlardan oluşsun. Kalori saymak yerine tabağınızdaki renk çeşitliliğine odaklanmak, sürdürülebilir kilonun anahtarıdır.",
    author: "Dyt. Dilara Koçak",
    role: "Uzman Diyetisyen",
    imagePrompt: "female nutritionist dietitian holding green apple smiling office environment",
    date: "20 Ekim 2023",
    icon: BookOpen
  }
];

export const BlogSection: React.FC = () => {
  return (
    <section id="blog" className="py-24 bg-stone-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-600 font-semibold tracking-wider text-sm uppercase mb-3 block">Kiler Akademi</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 mb-6">
            Uzmanlardan İlham Veren İçerikler
          </h2>
          <p className="text-stone-600 text-lg">
            Gastronomi dünyasının önde gelen isimlerinden mutfak sırları, sağlık tüyoları ve en yeni trendler hakkında derinlemesine bilgiler.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {blogPosts.map((post) => {
             // Generate a consistent image based on prompt
             const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(post.imagePrompt)}?width=600&height=400&nologo=true&seed=${post.id}`;
             
             return (
              <div key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-stone-100">
                {/* Image Container - Larger Aspect Ratio */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-stone-800 shadow-sm flex items-center gap-2">
                    <post.icon className="w-4 h-4 text-primary-600" />
                    {post.category}
                  </div>
                  <img 
                    src={imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs text-stone-400 mb-4 font-medium">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>

                  <h3 className="text-2xl font-bold text-stone-900 mb-4 leading-tight group-hover:text-primary-700 transition-colors">
                    {post.title}
                  </h3>
                  
                  {/* Expanded text without line clamp */}
                  <p className="text-stone-600 text-base leading-relaxed mb-8 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-stone-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-700 font-bold text-sm ring-4 ring-stone-50">
                          {post.author.charAt(0)}
                       </div>
                       <div className="flex flex-col">
                         <span className="text-sm font-bold text-stone-900">{post.author}</span>
                         <span className="text-xs text-stone-500 font-medium">{post.role}</span>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};