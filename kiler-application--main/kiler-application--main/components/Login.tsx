
import React, { useState, useEffect } from 'react';
import { UserAccount, PlanType } from '../types';

interface LoginProps {
  onLogin: (user: UserAccount | string) => void;
  onRegister: (user: UserAccount) => void;
  registeredUsers: UserAccount[];
  initialShowRegister?: boolean;
  lang?: string;
}

const Login: React.FC<LoginProps> = ({ onLogin, onRegister, registeredUsers, initialShowRegister = false, lang = 'tr' }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(initialShowRegister);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Legal Modals State
  const [showTerms, setShowTerms] = useState(false);
  const [showCookies, setShowCookies] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedCookies, setAcceptedCookies] = useState(false);

  const isRoot = username.toLowerCase() === 'root';

  useEffect(() => {
    if (initialShowRegister) {
      setIsRegistering(true);
    }
  }, [initialShowRegister]);

  // Registration states
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPasswordConfirm, setRegPasswordConfirm] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (isRoot) {
      const rootUser: UserAccount = {
        fullName: 'Sistem Yöneticisi',
        username: 'root',
        email: 'admin@kiler.com',
        password: '',
        planType: 'Şef',
        joinDate: new Date().toLocaleDateString('tr-TR'),
        preferences: { diseases: [], allergies: [], dailyCalorieGoal: 2500 },
        height: 175,
        weight: 75
      };
      onLogin(rootUser);
      return;
    }

    const foundUser = registeredUsers.find(
      (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );

    if (foundUser) {
      onLogin(foundUser);
    } else {
      setLoginError('Kullanıcı adı veya şifre hatalı. Lütfen kontrol edin.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptedTerms || !acceptedCookies) {
      alert('Lütfen sözleşmeleri ve çerez politikasını onaylayınız.');
      return;
    }

    if (regPassword.length !== 6 || !/^\d+$/.test(regPassword)) {
      alert('Şifre tam olarak 6 haneli bir sayı olmalıdır.');
      return;
    }

    if (regPassword !== regPasswordConfirm) {
      alert('Şifreler birbiriyle eşleşmiyor. Lütfen kontrol edin.');
      return;
    }

    if (registeredUsers.some(u => u.username.toLowerCase() === regUsername.toLowerCase())) {
      alert('Bu kullanıcı adı zaten alınmış.');
      return;
    }

    const newUser: UserAccount = {
      fullName: regFullName,
      email: regEmail,
      username: regUsername,
      password: regPassword,
      planType: 'Standart',
      joinDate: new Date().toLocaleDateString('tr-TR'),
      height: 170,
      weight: 70
    };

    onRegister(newUser);
    
    alert('Kayıt başarılı! Şimdi giriş yapabilirsiniz.');
    setIsRegistering(false);
    setRegFullName(''); setRegEmail(''); setRegUsername(''); setRegPassword(''); setRegPasswordConfirm('');
    setUsername(regUsername);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-emerald-100 via-stone-50 to-emerald-50 p-4 relative overflow-hidden">
      
      <div className="absolute top-6 right-6 z-20">
        <button 
          onClick={() => onLogin('Misafir')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-emerald-100 text-emerald-700 font-bold text-sm shadow-sm hover:bg-emerald-50 hover:shadow-md transition-all active:scale-95"
        >
          Üye Olmadan Devam Et
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>

      {isRegistering && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 md:p-10 border border-emerald-50 relative animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            <button onClick={() => setIsRegistering(false)} className="absolute top-6 right-6 text-stone-400 hover:text-stone-600 transition-colors z-10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="text-center mb-6 shrink-0">
              <h2 className="text-2xl font-bold text-emerald-900">Yeni Hesap Oluştur</h2>
              <p className="text-stone-500 text-sm mt-2">Kiler ailesine katılın.</p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4 overflow-y-auto px-1 custom-scrollbar pr-2 flex-1 pb-4">
              <div>
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">Ad Soyad</label>
                <input type="text" required value={regFullName} onChange={(e) => setRegFullName(e.target.value)} className="w-full px-5 py-3 rounded-xl bg-stone-50 border border-stone-100 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-sm" />
              </div>

              <div>
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">E-Posta</label>
                <input type="email" required value={regEmail} onChange={(e) => setRegEmail(e.target.value)} className="w-full px-5 py-3 rounded-xl bg-stone-50 border border-stone-100 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-sm" />
              </div>

              <div>
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">Kullanıcı Adı</label>
                <input type="text" required value={regUsername} onChange={(e) => setRegUsername(e.target.value)} className="w-full px-5 py-3 rounded-xl bg-stone-50 border border-stone-100 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">Şifre (6 Hane)</label>
                  <input type="password" required maxLength={6} minLength={6} value={regPassword} onChange={(e) => setRegPassword(e.target.value)} className="w-full px-5 py-3 rounded-xl bg-stone-50 border border-stone-100 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">Tekrar</label>
                  <input type="password" required maxLength={6} minLength={6} value={regPasswordConfirm} onChange={(e) => setRegPasswordConfirm(e.target.value)} className="w-full px-5 py-3 rounded-xl bg-stone-50 border border-stone-100 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-sm" />
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <div className="flex items-start gap-3 group cursor-pointer" onClick={() => setAcceptedCookies(!acceptedCookies)}>
                  <div className={`mt-0.5 w-5 h-5 rounded border transition-all flex items-center justify-center shrink-0 ${acceptedCookies ? 'bg-emerald-600 border-emerald-600' : 'bg-white border-stone-200 group-hover:border-emerald-400'}`}>
                    {acceptedCookies && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <p className="text-xs text-stone-500 leading-normal select-none">
                    Uygulama deneyimimi iyileştirmek için kullanılan <button type="button" onClick={(e) => { e.stopPropagation(); setShowCookies(true); }} className="text-blue-600 font-bold hover:underline">Çerez Politikası</button>'nı kabul ediyorum.
                  </p>
                </div>

                <div className="flex items-start gap-3 group cursor-pointer" onClick={() => setAcceptedTerms(!acceptedTerms)}>
                  <div className={`mt-0.5 w-5 h-5 rounded border transition-all flex items-center justify-center shrink-0 ${acceptedTerms ? 'bg-emerald-600 border-emerald-600' : 'bg-white border-stone-200 group-hover:border-emerald-400'}`}>
                    {acceptedTerms && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <p className="text-xs text-stone-500 leading-normal select-none">
                    Kiler Akıllı Tarif <button type="button" onClick={(e) => { e.stopPropagation(); setShowTerms(true); }} className="text-blue-600 font-bold hover:underline">Kullanıcı Sözleşmesi</button>'ni okudum ve onaylıyorum.
                  </p>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={!acceptedTerms || !acceptedCookies}
                className={`w-full font-bold py-4 rounded-xl transition-all shadow-lg mt-4 active:scale-[0.98] ${acceptedTerms && acceptedCookies ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-900/10' : 'bg-stone-200 text-stone-400 cursor-not-allowed shadow-none'}`}
              >
                Hesabı Oluştur
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Terms and Cookies Modals */}
      {(showTerms || showCookies) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-in zoom-in-95">
            <div className="p-8 border-b border-stone-100 flex items-center justify-between shrink-0 bg-stone-50/50">
              <h2 className="text-xl font-black text-emerald-900 uppercase tracking-tight">
                {showTerms ? "Kullanıcı Sözleşmesi" : "Çerez Politikası"}
              </h2>
              <button onClick={() => { setShowTerms(false); setShowCookies(false); }} className="p-2 hover:bg-stone-200 rounded-full transition-colors">
                <svg className="w-6 h-6 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto custom-scrollbar text-stone-600 text-sm space-y-6 leading-relaxed">
              {showTerms ? (
                <>
                  <section>
                    <h3 className="font-bold text-stone-900 mb-2">1. Taraflar ve Kapsam</h3>
                    <p>Bu Kullanıcı Sözleşmesi ("Sözleşme"), Kiler Akıllı Tarif mobil/web uygulaması ("Uygulama") ile Uygulama'yı kullanan gerçek kişi ("Kullanıcı") arasında, Uygulama'nın kullanım şartlarını belirlemek amacıyla düzenlenmiştir.</p>
                  </section>
                  <section>
                    <h3 className="font-bold text-stone-900 mb-2">2. Hizmetin Niteliği ve Yapay Zeka</h3>
                    <p>Kiler Akıllı Tarif, Google Gemini AI teknolojisini kullanarak kullanıcının girdiği malzemelere veya bütçeye göre yemek tarifleri üretir. Üretilen tüm tarifler yapay zeka tarafından oluşturulmakta olup, içeriklerin doğruluğu, lezzeti veya gıda güvenliği Uygulama tarafından %100 garanti edilmemektedir.</p>
                  </section>
                  <section>
                    <h3 className="font-bold text-stone-900 mb-2">3. Sağlık ve Alerjen Sorumluluğu</h3>
                    <p>Uygulama içerisindeki "Sağlık Tercihlerim" bölümü kullanıcıya kolaylık sağlamak amacıyla sunulmuştur. Ancak Uygulama bir tıbbi tavsiye platformu değildir. Kullanıcı, alerjen kontrolünü bizzat yapmakla yükümlüdür. Ciddi sağlık sorunları olan bireylerin, yapay zeka tarafından önerilen tarifleri uygulamadan önce bir diyetisyen veya doktora danışması şiddetle önerilir. Alerjik reaksiyonlar veya sağlık sorunlarından Uygulama sorumlu tutulamaz.</p>
                  </section>
                  <section>
                    <h3 className="font-bold text-stone-900 mb-2">4. Kullanım Kuralları</h3>
                    <p>Kullanıcı, Uygulama'yı hukuka aykırı amaçlarla kullanamaz. Sistem güvenliğini ihlal edici faaliyetlerde bulunamaz. Tersine mühendislik veya veri madenciliği gibi işlemler yasaktır. "Şef" veya "Aile" planı gibi ücretli üyeliklerin haksız kullanımı tespit edilirse hesap askıya alınabilir.</p>
                  </section>
                  <section>
                    <h3 className="font-bold text-stone-900 mb-2">5. Veri Gizliliği</h3>
                    <p>Girdiğiniz veriler (tercihler, boy, kilo vb.) sadece size özel bir deneyim sunmak ve tarifleri optimize etmek için işlenir. Verileriniz üçüncü şahıslara reklam amaçlı satılmaz. Detaylar Gizlilik Politikamızda yer almaktadır.</p>
                  </section>
                  <section>
                    <h3 className="font-bold text-stone-900 mb-2">6. Değişiklikler</h3>
                    <p>Uygulama yönetimi, bu sözleşmeyi dilediği zaman güncelleme hakkını saklı tutar. Güncel sözleşme her zaman bu panel üzerinden erişilebilir olacaktır.</p>
                  </section>
                </>
              ) : (
                <>
                  <section>
                    <h3 className="font-bold text-stone-900 mb-2">1. Çerez (Cookie) Nedir?</h3>
                    <p>Çerezler, bir web sitesini veya uygulamayı ziyaret ettiğinizde tarayıcınız veya cihazınız tarafından saklanan küçük veri dosyalarıdır. Kiler Akıllı Tarif, size kesintisiz bir deneyim sunmak için modern yerel depolama teknolojilerini kullanır.</p>
                  </section>
                  <section>
                    <h3 className="font-bold text-stone-900 mb-2">2. Hangi Çerezleri Kullanıyoruz?</h3>
                    <p>Uygulamamızda temel olarak "Zorunlu Çerezler" ve "Tercih Çerezleri" kullanılmaktadır:</p>
                    <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
                      <li><strong>Oturum Verileri:</strong> Giriş yaptığınızda sizi tanımak için kullanılır.</li>
                      <li><strong>Dil ve Tema:</strong> Seçtiğiniz dili (Türkçe/İngilizce) ve görünüm modunu (Açık/Koyu) hatırlar.</li>
                      <li><strong>Sağlık Tercihleri:</strong> Alerjilerinizi ve sağlık durumlarınızı cihazınızda saklayarak her seferinde tekrar sormanıza engel olur.</li>
                    </ul>
                  </section>
                  <section>
                    <h3 className="font-bold text-stone-900 mb-2">3. Çerezlerin Amacı</h3>
                    <p>Çerez kullanımımızın tek amacı, size daha hızlı, kişiselleştirilmiş ve güvenli bir mutfak asistanı deneyimi sunmaktır. Verileriniz tarayıcınızın "LocalStorage" alanında saklanır, yani verileriniz esasen sizin cihazınızda durmaktadır.</p>
                  </section>
                  <section>
                    <h3 className="font-bold text-stone-900 mb-2">4. Çerezleri Nasıl Yönetebilirsiniz?</h3>
                    <p>Tarayıcı ayarlarınız üzerinden kayıtlı verileri dilediğiniz zaman temizleyebilirsiniz. Ancak çerezlerin/yerel verilerin silinmesi durumunda, kayıtlı tercihleriniz ve aktif oturumunuz kaybolacaktır.</p>
                  </section>
                  <section>
                    <h3 className="font-bold text-stone-900 mb-2">5. İletişim</h3>
                    <p>Çerez politikamız hakkında sorularınız için destek ekibimizle her zaman iletişime geçebilirsiniz.</p>
                  </section>
                </>
              )}
            </div>
            
            <div className="p-8 border-t border-stone-100 bg-stone-50/50 shrink-0">
              <button onClick={() => { setShowTerms(false); setShowCookies(false); }} className="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl shadow-xl hover:bg-emerald-700 transition-all uppercase tracking-widest text-xs">
                Anladım, Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-2 bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-900/10 overflow-hidden border border-white z-10">
        <div className="hidden md:flex flex-col justify-between p-12 bg-emerald-600 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-8 rotate-3 shadow-lg">
              <span className="text-emerald-600 text-2xl font-black">K</span>
            </div>
            <h2 className="text-4xl font-bold leading-tight mb-4">Mutfaktaki <br /> <span className="text-emerald-200">En Akıllı</span> Gözünüz.</h2>
            <p className="text-emerald-50/80 leading-relaxed text-lg max-w-xs mb-8">Elinizdeki malzemelerle harikalar yaratın, bütçenizi koruyun ve sağlıklı kalın.</p>
          </div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-500 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-stone-900 mb-2">Hoş Geldiniz</h1>
            <p className="text-stone-500">Mutfak asistanınıza erişmek için bilgilerinizi girin.</p>
          </div>
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            {loginError && <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-medium border border-red-100 animate-in fade-in slide-in-from-top-2">{loginError}</div>}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-1">Kullanıcı Adı</label>
              <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Kullanıcı Adı" className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all text-stone-800" />
            </div>
            
            {!isRoot && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-300">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-1">Şifre</label>
                <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all text-stone-800" />
              </div>
            )}

            {isRoot && (
              <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl text-emerald-700 text-xs font-bold animate-in zoom-in-95 duration-300">
                Yönetici moduna giriyorsunuz. Şifre gerektirmez.
              </div>
            )}

            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 group uppercase tracking-widest text-xs">
              {isRoot ? "Yönetici Olarak Giriş Yap" : "Giriş Yap"}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </form>
          <div className="mt-8 pt-8 border-t border-stone-100 text-center">
            <p className="text-stone-500 text-sm">Hesabınız yok mu? <button onClick={() => setIsRegistering(true)} className="text-emerald-600 font-bold hover:underline">Şimdi Kayıt Olun</button></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
