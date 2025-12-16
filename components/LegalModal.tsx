import React from 'react';
import { X, Shield, FileText, Lock, Cookie, Scale } from 'lucide-react';

export type LegalDocType = 'privacy' | 'terms' | 'kvkk' | 'cookies' | null;

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  docType: LegalDocType;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, docType }) => {
  if (!isOpen || !docType) return null;

  const getContent = () => {
    switch (docType) {
      case 'privacy':
        return {
          title: "Gizlilik Politikası ve Veri İşleme Esasları",
          icon: Lock,
          lastUpdated: "15 Ekim 2024",
          content: (
            <div className="space-y-8 text-stone-600 text-sm leading-7 text-justify">
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 mb-6">
                <p className="font-medium text-stone-800">
                    Star Tech Ventures Inc. ve Türkiye'deki yetkili iştiraki Kiler Teknoloji A.Ş. ("Şirket" veya "Veri Sorumlusu") olarak, kullanıcılarımızın mahremiyetine ve kişisel verilerinin güvenliğine en üst düzeyde hassasiyet gösteriyoruz. İşbu Gizlilik Politikası, Kiler.ai platformunun ("Platform") web sitesi, mobil uygulamaları ve ilgili hizmetlerini kullanımınız sırasında toplanan verilerin işlenme, saklanma ve korunma süreçlerini detaylandırmaktadır.
                </p>
              </div>
              
              <section>
                <h4 className="font-bold text-stone-900 text-lg mb-3 border-b border-stone-200 pb-2">1. Veri Sorumlusu Kimliği</h4>
                <p>
                    6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") ve Avrupa Birliği Genel Veri Koruma Tüzüğü ("GDPR") hükümleri uyarınca, veri sorumlusu; Davutpaşa Kampüsü, Esenler/İstanbul adresinde mukim, İstanbul Ticaret Sicil Müdürlüğü'ne kayıtlı <strong>Star Tech Ventures Teknoloji A.Ş.</strong>'dir. Şirketimiz, verilerinizin hukuka uygun olarak işlenmesi için gerekli idari ve teknik tedbirleri almayı taahhüt eder.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-stone-900 text-lg mb-3 border-b border-stone-200 pb-2">2. Toplanan Kişisel Veriler ve Kategorileri</h4>
                <p className="mb-2">Hizmetlerimizin ifası sırasında, doğrudan sizden veya kullanımınız sırasında otomatik yollarla aşağıdaki veri kategorilerini toplamaktayız:</p>
                <ul className="list-disc pl-5 space-y-2 marker:text-primary-600">
                    <li><strong>Kimlik Verileri:</strong> Adınız, soyadınız, kullanıcı adınız, doğum tarihiniz ve cinsiyet bilgileriniz.</li>
                    <li><strong>İletişim Verileri:</strong> E-posta adresiniz, telefon numaranız, ikamet şehriniz ve isteğe bağlı adres bilgileriniz.</li>
                    <li><strong>Müşteri İşlem Verileri:</strong> Platform içi aramalarınız, oluşturulan tarif geçmişi, favoriye eklenen içerikler, alışveriş listeleri ve sipariş kayıtları.</li>
                    <li><strong>Sağlık ve Diyet Verileri (Özel Nitelikli):</strong> Besin alerjileri, diyet kısıtlamaları (vegan, glutensiz vb.), boy ve kilo bilgileri. *Bu veriler açık rızanız olmaksızın işlenmez.*</li>
                    <li><strong>İşlem Güvenliği Verileri:</strong> IP adresi, cihaz IMEI numarası, tarayıcı türü, işletim sistemi sürümü, erişim logları ve oturum çerezleri.</li>
                    <li><strong>Pazarlama Verileri:</strong> Çerezler aracılığıyla toplanan alışveriş alışkanlıkları, kampanya kullanım geçmişi ve anket cevapları.</li>
                </ul>
              </section>

              <section>
                <h4 className="font-bold text-stone-900 text-lg mb-3 border-b border-stone-200 pb-2">3. Kişisel Verilerin İşlenme Amaçları</h4>
                <p>Toplanan kişisel verileriniz, aşağıdaki amaçlarla sınırlı ve ölçülü olarak işlenmektedir:</p>
                <ul className="list-disc pl-5 mt-2 space-y-2 marker:text-primary-600">
                    <li>Yapay zeka (AI) algoritmalarının eğitilmesi ve size özel kişiselleştirilmiş tarif önerilerinin (recommendation engine) oluşturulması.</li>
                    <li>Üyelik işlemlerinin gerçekleştirilmesi, hesabın doğrulanması ve yetkisiz erişimlerin engellenmesi.</li>
                    <li>Hizmet kalitesinin artırılması, teknik sorunların tespiti ve kullanıcı deneyiminin (UX) iyileştirilmesi.</li>
                    <li>Yasal mevzuattan kaynaklanan yükümlülüklerin (5651 sayılı kanun, Vergi Usul Kanunu vb.) yerine getirilmesi.</li>
                    <li>İletişim izni vermeniz halinde, size özel kampanyaların, bültenlerin ve promosyonların iletilmesi.</li>
                </ul>
              </section>

              <section>
                <h4 className="font-bold text-stone-900 text-lg mb-3 border-b border-stone-200 pb-2">4. Verilerin Aktarılması ve Üçüncü Taraflar</h4>
                <p>
                    Kişisel verileriniz; hizmetin teknik altyapısını sağlamak amacıyla anlaşmalı olduğumuz yerel ve uluslararası bulut hizmet sağlayıcılarına (AWS, Google Cloud - Frankfurt Bölgesi), ödeme işlemlerini gerçekleştirmek için lisanslı ödeme kuruluşlarına (Iyzico, Stripe), hukuki uyuşmazlıklarda adli makamlara ve yasal zorunluluk halinde yetkili kamu kurumlarına aktarılabilir. Global bir şirket olmamız sebebiyle, verileriniz GDPR standartlarına uygun olarak güvenli ülkelerde barındırılan sunuculara, veriler şifrelenmiş (encrypted) halde transfer edilebilir.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-stone-900 text-lg mb-3 border-b border-stone-200 pb-2">5. Veri Güvenliği Tedbirleri</h4>
                <p>
                    Star Tech Ventures, verilerinizi korumak için ISO 27001 Bilgi Güvenliği Yönetim Sistemi standartlarını uygular. Verileriniz, transfer sırasında TLS 1.3 protokolü ile, saklama sırasında ise AES-256 şifreleme standardı ile korunur. Düzenli penetrasyon testleri ve güvenlik denetimleri ile sistemlerimiz siber saldırılara karşı güçlendirilmektedir.
                </p>
              </section>
            </div>
          )
        };
      case 'terms':
        return {
          title: "Kullanım Koşulları ve Üyelik Sözleşmesi",
          icon: Scale,
          lastUpdated: "01 Eylül 2024",
          content: (
            <div className="space-y-8 text-stone-600 text-sm leading-7 text-justify">
               <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 mb-6">
                <p className="font-medium text-stone-800">
                    İşbu Kullanım Koşulları ("Sözleşme"), Kiler.ai platformuna ("Platform") erişim sağlayan veya üye olan her gerçek veya tüzel kişi ("Kullanıcı") ile Star Tech Ventures ("Şirket") arasında akdedilmiştir. Platformu kullanarak, aşağıda belirtilen tüm hüküm ve koşulları okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan edersiniz.
                </p>
              </div>

              <section>
                <h4 className="font-bold text-stone-900 text-lg mb-3 border-b border-stone-200 pb-2">1. Hizmetin Tanımı ve Kapsamı</h4>
                <p>
                    Kiler.ai; yapay zeka destekli tarif üretimi, stok takibi, besin değeri analizi ve alışveriş listesi oluşturma hizmetleri sunan dijital bir platformdur. Şirket, Platform'un özelliklerini, arayüzünü veya işleyişini önceden bildirimde bulunmaksızın değiştirme, askıya alma veya sonlandırma hakkını saklı tutar.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-stone-900 text-lg mb-3 border-b border-stone-200 pb-2">2. Kullanıcının Yükümlülükleri</h4>
                <ul className="list-disc pl-5 space-y-2 marker:text-primary-600">
                    <li>Kullanıcı, üyelik oluştururken verdiği bilgilerin doğru, güncel ve eksiksiz olduğunu taahhüt eder.</li>
                    <li>Kullanıcı, hesap güvenliğinden bizzat sorumludur. Şifrenin üçüncü kişilerle paylaşılması sonucu doğacak zararlardan Şirket sorumlu tutulamaz.</li>
                    <li>Platform, sadece yasal ve kişisel kullanım amaçlıdır. Platformun kaynak kodlarına erişim sağlamaya çalışmak, tersine mühendislik yapmak, veri madenciliği (scraping) veya bot kullanımı kesinlikle yasaktır.</li>
                    <li>Kullanıcı, diğer kullanıcıların haklarına saygı duymakla yükümlüdür; tehdit, hakaret veya yasa dışı içerik paylaşımı hesabın süresiz kapatılmasına neden olur.</li>
                </ul>
              </section>

              <section>
                <h4 className="font-bold text-stone-900 text-lg mb-3 border-b border-stone-200 pb-2">3. Yapay Zeka (AI) Çıktıları ve Sorumluluk Reddi</h4>
                <p className="mb-3">
                    Platform tarafından sunulan tarifler, besin değerleri, pişirme süreleri ve sağlık önerileri <strong>Google Gemini AI</strong> modelleri tarafından otomatik olarak üretilmektedir. Bu içerikler tamamen <strong>tavsiye niteliğindedir</strong> ve profesyonel tıbbi, diyetisyen veya şef tavsiyesi yerine geçmez.
                </p>
                <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl my-4">
                    <p className="text-red-800 font-bold text-xs uppercase mb-1">Kritik Uyarı</p>
                    <p className="text-red-700 text-sm">
                        Yapay zeka nadiren de olsa hatalı (halüsinasyon) içerik üretebilir. Özellikle gıda alerjileri, intoleranslar veya özel sağlık durumlarında, önerilen tariflerdeki malzemeleri kontrol etmek tamamen kullanıcının sorumluluğundadır. Şirket, Platform üzerinden elde edilen bilgilerin uygulanması sonucu oluşabilecek gıda zehirlenmesi, alerjik reaksiyon veya maddi/manevi zararlardan sorumlu tutulamaz.
                    </p>
                </div>
              </section>

              <section>
                <h4 className="font-bold text-stone-900 text-lg mb-3 border-b border-stone-200 pb-2">4. Fikri Mülkiyet Hakları</h4>
                <p>
                    Platform'un tasarımı, yazılımı, veritabanı, logosu, ticari markaları ve tüm özgün içerikleri Star Tech Ventures'ın mülkiyetindedir ve uluslararası telif hakkı yasaları ile korunmaktadır. Kullanıcılar, Platform üzerindeki içerikleri ticari amaçla kopyalayamaz, dağıtamaz, kiralayamaz veya satamaz.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-stone-900 text-lg mb-3 border-b border-stone-200 pb-2">5. Ücretlendirme ve İptal Politikası</h4>
                <p>
                    Premium üyelikler, seçilen periyoda (aylık/yıllık) göre otomatik olarak yenilenir. Kullanıcı, yenileme tarihinden en az 24 saat önce aboneliğini iptal etmediği sürece, kayıtlı ödeme yönteminden ilgili dönemin ücreti tahsil edilir. İptal işlemi, cari dönemin sonuna kadar geçerli olup, kısmi iade veya cayma hakkı (dijital hizmet olması sebebiyle) kullanılamaz.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-stone-900 text-lg mb-3 border-b border-stone-200 pb-2">6. Uyuşmazlıkların Çözümü</h4>
                <p>
                    İşbu Sözleşme'den doğacak her türlü uyuşmazlığın çözümünde Türk Hukuku uygulanacak olup, İstanbul Merkez (Çağlayan) Mahkemeleri ve İcra Daireleri yetkilidir.
                </p>
              </section>
            </div>
          )
        };
      case 'kvkk':
        return {
          title: "KVKK Aydınlatma Metni ve Haklarınız",
          icon: Shield,
          lastUpdated: "10 Ekim 2024",
          content: (
             <div className="space-y-8 text-stone-600 text-sm leading-7 text-justify">
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 mb-6">
                <p className="font-medium text-stone-800">
                    Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun ("Kanun") 10. maddesi ile Aydınlatma Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul ve Esaslar Hakkında Tebliğ kapsamında, Veri Sorumlusu sıfatıyla <strong>Star Tech Ventures Teknoloji A.Ş.</strong> tarafından hazırlanmıştır.
                </p>
              </div>

              <section>
                <h4 className="font-bold text-stone-900 text-lg mb-3 border-b border-stone-200 pb-2">1. Kişisel Verilerin İşlenme Hukuki Sebepleri</h4>
                <p>Kişisel verileriniz, Kanun'un 5. ve 6. maddelerinde belirtilen aşağıdaki hukuki sebeplere dayalı olarak işlenmektedir:</p>
                <ul className="list-disc pl-5 mt-2 space-y-2 marker:text-primary-600">
                    <li><strong>Kanunlarda Açıkça Öngörülmesi:</strong> 5651 sayılı İnternet Ortamında Yapılan Yayınların Düzenlenmesi Hakkında Kanun ve Vergi Usul Kanunu kapsamındaki yükümlülükler.</li>
                    <li><strong>Sözleşmenin Kurulması veya İfası:</strong> Üyelik sözleşmesinin kurulması, hizmetin sunulması ve ödeme işlemlerinin yapılması.</li>
                    <li><strong>Hukuki Yükümlülük:</strong> Yetkili kamu kurum ve kuruluşlarının taleplerinin karşılanması.</li>
                    <li><strong>Meşru Menfaat:</strong> Temel hak ve özgürlüklerinize zarar vermemek kaydıyla, veri güvenliğinin sağlanması ve hizmet kalitesinin artırılması.</li>
                    <li><strong>Açık Rıza:</strong> Özellikle sağlık verileri (alerji, diyet) ve ticari elektronik ileti gönderimi için açık rızanız alınmaktadır.</li>
                </ul>
              </section>

              <section>
                <h4 className="font-bold text-stone-900 text-lg mb-3 border-b border-stone-200 pb-2">2. İlgili Kişinin Hakları (Madde 11)</h4>
                <p>Kanun'un 11. maddesi uyarınca, şirketimize başvurarak aşağıdaki haklarınızı kullanabilirsiniz:</p>
                <ul className="list-decimal pl-5 mt-2 space-y-2 marker:text-stone-900 marker:font-bold">
                    <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
                    <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme,</li>
                    <li>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
                    <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,</li>
                    <li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,</li>
                    <li>Kanun'un 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini isteme,</li>
                    <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,</li>
                    <li>Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme.</li>
                </ul>
              </section>

              <section>
                <h4 className="font-bold text-stone-900 text-lg mb-3 border-b border-stone-200 pb-2">3. Başvuru Yöntemi</h4>
                <p>
                    Yukarıda belirtilen haklarınızı kullanmak için, yazılı olarak veya Kayıtlı Elektronik Posta (KEP) adresi, güvenli elektronik imza, mobil imza ya da şirketimize daha önce bildirdiğiniz ve sistemimizde kayıtlı bulunan elektronik posta adresini kullanmak suretiyle <strong>kvkk@startech.com</strong> adresine başvuruda bulunabilirsiniz. Başvurunuzda; Ad, Soyad, T.C. Kimlik Numarası (yabancılar için pasaport no), tebligata esas yerleşim yeri veya iş yeri adresi, varsa bildirime esas elektronik posta adresi, telefon numarası ve talep konusunun bulunması zorunludur.
                </p>
              </section>
            </div>
          )
        };
      case 'cookies':
        return {
          title: "Çerez (Cookie) Politikası ve İzleme Teknolojileri",
          icon: Cookie,
          lastUpdated: "20 Ağustos 2024",
          content: (
            <div className="space-y-8 text-stone-600 text-sm leading-7 text-justify">
               <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 mb-6">
                <p className="font-medium text-stone-800">
                    Kiler.ai olarak, web sitemizden en verimli şekilde faydalanabilmeniz ve kullanıcı deneyiminizi geliştirebilmek amacıyla Çerezler (Cookies), Piksel Etiketleri (Pixels) ve Yerel Depolama Teknolojileri kullanmaktayız. Bu politika, bu teknolojilerin ne olduğunu, nasıl kullanıldığını ve tercihlerinizi nasıl yönetebileceğinizi açıklar.
                </p>
              </div>

              <section>
                <h4 className="font-bold text-stone-900 text-lg mb-3 border-b border-stone-200 pb-2">1. Çerez Nedir?</h4>
                <p>
                    Çerezler, ziyaret ettiğiniz web siteleri tarafından tarayıcınız aracılığıyla bilgisayarınıza veya mobil cihazınıza kaydedilen küçük metin dosyalarıdır. Çerezler, sunucunun cihazınızı tanımasını, site trafiğinin yönetilmesini ve oturum bilgilerinizin hatırlanmasını sağlar. Çerezler tek başlarına kişisel veri (örneğin adınız veya e-posta adresiniz) içermez, ancak diğer verilerle birleştirildiğinde kimliğinizi belirleyebilir hale gelebilir.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-stone-900 text-lg mb-3 border-b border-stone-200 pb-2">2. Kullanılan Çerez Türleri</h4>
                <div className="space-y-4">
                    <div className="bg-white p-4 border border-stone-100 rounded-xl shadow-sm">
                        <h5 className="font-bold text-primary-700 mb-1">A. Zorunlu (Kesinlikle Gerekli) Çerezler</h5>
                        <p className="text-xs">Web sitesinin düzgün çalışması, güvenliğin sağlanması ve oturum açma gibi özelliklerin kullanılabilmesi için gereklidir. Bu çerezler sistemlerimizden kapatılamaz.</p>
                    </div>
                    <div className="bg-white p-4 border border-stone-100 rounded-xl shadow-sm">
                         <h5 className="font-bold text-primary-700 mb-1">B. Performans ve Analitik Çerezleri</h5>
                        <p className="text-xs">Google Analytics, Hotjar vb. araçlar kullanılarak ziyaretçi sayısını, trafik kaynaklarını ve sayfaların popülaritesini ölçmemize yarar. Bu veriler anonim olarak toplanır ve sitenin performansını iyileştirmek için kullanılır.</p>
                    </div>
                    <div className="bg-white p-4 border border-stone-100 rounded-xl shadow-sm">
                         <h5 className="font-bold text-primary-700 mb-1">C. İşlevsellik Çerezleri</h5>
                        <p className="text-xs">Dil tercihiniz, bölge seçiminiz gibi kişiselleştirilmiş ayarların hatırlanmasını sağlar. Bu çerezleri engellemeniz durumunda bazı fonksiyonlar düzgün çalışmayabilir.</p>
                    </div>
                    <div className="bg-white p-4 border border-stone-100 rounded-xl shadow-sm">
                         <h5 className="font-bold text-primary-700 mb-1">D. Hedefleme ve Reklam Çerezleri</h5>
                        <p className="text-xs">İş ortaklarımız tarafından ilgi alanlarınıza göre profil oluşturmak ve size diğer sitelerde alakalı reklamlar göstermek için kullanılır (örn: Facebook Pixel, Google Ads).</p>
                    </div>
                </div>
              </section>

              <section>
                <h4 className="font-bold text-stone-900 text-lg mb-3 border-b border-stone-200 pb-2">3. Çerez Yönetimi ve Tercihler</h4>
                <p>
                    Tarayıcınızın ayarlarını değiştirerek çerezlere ilişkin tercihlerinizi kişiselleştirme imkanına sahipsiniz. Çoğu tarayıcı çerezleri otomatik olarak kabul eder, ancak dilerseniz bunları reddedebilir veya bir çerez gönderildiğinde uyarı almayı seçebilirsiniz.
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
                    <li><strong>Google Chrome:</strong> Ayarlar &gt; Gizlilik ve Güvenlik &gt; Çerezler</li>
                    <li><strong>Safari:</strong> Tercihler &gt; Gizlilik &gt; Tüm Çerezleri Engelle</li>
                    <li><strong>Mozilla Firefox:</strong> Seçenekler &gt; Gizlilik ve Güvenlik &gt; Geçmiş</li>
                </ul>
                <p className="mt-3 text-xs italic text-stone-500">
                    Not: Zorunlu çerezleri devre dışı bırakmanız durumunda, Kiler.ai platformunun bazı özellikleri (örn: üye girişi, tarif kaydetme) çalışmayabilir.
                </p>
              </section>
            </div>
          )
        };
      default:
        return { title: "", icon: FileText, content: null, lastUpdated: "" };
    }
  };

  const { title, icon: Icon, content, lastUpdated } = getContent();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/80 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col animate-scale-in border border-stone-100">
        
        {/* Header - Sticky */}
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-stone-100 bg-white/95 backdrop-blur-sm rounded-t-[2rem] z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-stone-100 rounded-xl border border-stone-200">
              <Icon className="w-6 h-6 text-stone-700" />
            </div>
            <div>
                <h3 className="text-xl md:text-2xl font-bold text-stone-900 leading-tight">{title}</h3>
                <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <p className="text-xs text-stone-500 font-medium uppercase tracking-wide">Yürürlük Tarihi: {lastUpdated}</p>
                </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2.5 hover:bg-stone-100 rounded-full text-stone-400 hover:text-red-500 transition-all border border-transparent hover:border-stone-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar bg-white">
          {content}
          
          <div className="mt-10 pt-8 border-t border-stone-100">
             <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-stone-50 p-5 rounded-2xl border border-stone-200">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 border-4 border-white shadow-sm">
                    <Shield className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1">
                    <p className="text-sm font-bold text-stone-800 mb-0.5">Star Tech Ventures Legal Department</p>
                    <p className="text-xs text-stone-500 leading-relaxed">
                        Bu metinle ilgili sorularınız, itirazlarınız veya veri talepleriniz için hukuk birimimizle iletişime geçebilirsiniz. Resmi başvurular için KEP adresimizi kullanınız.
                    </p>
                </div>
                <a href="mailto:legal@startech.com" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-xs font-bold text-primary-700 hover:bg-primary-50 transition-colors shadow-sm whitespace-nowrap">
                    Bize Ulaşın
                </a>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};