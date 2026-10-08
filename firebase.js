// Kurs Sonu Evrak Yönetim Sistemi - Veri ve Durum Yönetimi

function normalizeUsername(str) {
  if (!str) return '';
  return String(str).toLowerCase()
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .trim();
}
window.normalizeUsername = normalizeUsername;

const DEFAULT_USERS = [
  {
    id: "admin_1",
    username: "admin",
    password: "123",
    fullName: "Yönetici (Admin)",
    role: "developer",
    title: "Sistem ve Evrak Yöneticisi",
    area: "Bilişim Teknolojileri",
    institution: "Milli Eğitim Bakanlığı / İlçe MEM",
    email: "admin@meb.k12.tr",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "dev_ozgur",
    username: "ozgur",
    password: "123",
    fullName: "Özgür",
    role: "developer",
    title: "Geliştirici & Eğitmen",
    area: "Bilişim Teknolojileri",
    institution: "Meslek Fabrikası",
    email: "ozgur@meslekfabrikasi.org",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "dev_merve",
    username: "merve",
    password: "123",
    fullName: "Merve",
    role: "developer",
    title: "Geliştirici & Eğitmen",
    area: "Bilişim Teknolojileri",
    institution: "Meslek Fabrikası",
    email: "merve@meslekfabrikasi.org",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "dev_onder",
    username: "onder",
    password: "123",
    fullName: "Önder Altıntaş",
    role: "developer",
    title: "Geliştirici & Eğitmen",
    area: "Bilişim Teknolojileri",
    institution: "İBB Meslek Fabrikası",
    email: "onder@meslekfabrikasi.org",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "teacher_1",
    username: "egitmen1",
    password: "123",
    fullName: "Eğitmen 1",
    role: "teacher",
    title: "Eğitmen",
    area: "Bilişim Teknolojileri",
    institution: "Meslek Fabrikası",
    email: "egitmen1@meslekfabrikasi.org",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "teacher_2",
    username: "egitmen2",
    password: "123",
    fullName: "Eğitmen 2",
    role: "teacher",
    title: "Eğitmen",
    area: "Bilişim Teknolojileri",
    institution: "Meslek Fabrikası",
    email: "egitmen2@meslekfabrikasi.org",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "teacher_3",
    username: "egitmen3",
    password: "123",
    fullName: "Eğitmen 3",
    role: "teacher",
    title: "Eğitmen",
    area: "Bilişim Teknolojileri",
    institution: "Meslek Fabrikası",
    email: "egitmen3@meslekfabrikasi.org",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "dept_head_1",
    username: "zumrebaskani",
    password: "123",
    fullName: "Zümre Başkanı",
    role: "department_head",
    title: "Zümre Başkanı",
    area: "Bilişim Teknolojileri",
    institution: "Meslek Fabrikası",
    email: "zumrebaskani@meslekfabrikasi.org",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "sup_kurs_1",
    username: "kurssorumlusu",
    password: "123",
    fullName: "Kurs Sorumlusu",
    role: "supervisor",
    title: "Kurs Sorumlusu",
    area: "Yönetim & Koordinasyon",
    institution: "Meslek Fabrikası",
    email: "kurssorumlusu@meslekfabrikasi.org",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80"
  }
];

// Kurs Merkezleri Tanımları (Boş başlangıç - Kullanıcı kendisi ekler)
const DEFAULT_CENTERS = [];

// Kurs Alanları / Branş Tanımları
const DEFAULT_AREAS = [
  { id: "area_bilisim", name: "Bilişim Teknolojileri" }
];

// Kurs ve Müfredat Şablonları (MEB Hayat Boyu Öğrenme Genel Müdürlüğü Onaylı)
const DEFAULT_COURSE_TEMPLATES = [
  {
    "id": "tmpl_bilgisayar_isletmenligi_150",
    "name": "Bilgisayar İşletmenliği (Operatörlüğü) - 150 Saat",
    "code": "BLG-150",
    "category": "Bilişim Teknolojileri",
    "area": "Bilişim Teknolojileri",
    "totalHours": 150,
    "moduleCount": 6,
    "description": "T.C. Millî Eğitim Bakanlığı Hayat Boyu Öğrenme Genel Müdürlüğü Bilişim Teknolojileri Alanı - Bilgisayar İşletmenliği (Operatörlüğü) Kurs Programı (6 Modül, 150 Ders Saati Planı).",
    "modules": [
      {
        "id": "mod_blg150_1",
        "number": 1,
        "name": "Bilgisayara Giriş",
        "totalHours": 46,
        "lessonHours": 44,
        "examHours": 2,
        "topics": [
          "Bilgi Teknolojisinin Temel Kavramları ve Bilgisayarın Tarihsel Gelişimi",
          "Donanım ve Yazılım Kavramları, Bilgisayar Çeşitleri",
          "Kasa ve Temel Donanım Birimleri: Anakart, İşlemci (CPU), Bellek (RAM)",
          "Dahili ve Harici Depolama Birimleri (HDD, SSD, Flash Bellek)",
          "Giriş Birimleri: Klavye, Fare, Tarayıcı, Barkod Okuyucu",
          "Çıkış Birimleri: Monitör, Yazıcı, Hoparlör, Projeksiyon",
          "Portlar, Bağlantı Noktaları ve Kablolar (HDMI, VGA, USB, DVI)",
          "Bilgisayar Çevre Birimlerinin Güvenli Bağlantısı ve Kurulumu",
          "BIOS / UEFI Arayüzü ve Temel Ayarları",
          "İlk Açılış (Boot) Seçenekleri ve Başlangıç Yapılandırması",
          "İşletim Sistemi Kavramı ve İşletim Sistemi Türleri",
          "Bilgisayar Sistemine Uygun İşletim Sistemi Seçimi ve Ön Gereksinimleri",
          "Kurulum Ortamı Hazırlama (Önyüklenebilir USB Oluşturma)",
          "Sabit Disk Bölümleme (Disk Partitioning) ve Biçimlendirme (Formatting)",
          "İşletim Sistemi Kurulum Aşamaları ve Temel Ayarlar - 1",
          "İşletim Sistemi Kurulum Aşamaları ve Temel Ayarlar - 2",
          "Donanım Sürücüsü (Driver) Kavramı ve Sürücü Türleri",
          "Aygıt Yöneticisi Tanıtımı ve Donanım Durumlarının İncelenmesi",
          "Anakart, Ekran Kartı ve Ses Kartı Sürücülerinin Kurulumu",
          "Ağ (Ethernet/Wi-Fi) ve Çevre Birimi Sürücülerinin Kurulumu",
          "İşletim Sistemi Kullanıcı Arayüzü: Masaüstü, Görev Çubuğu ve Bildirim Alanı",
          "Başlat Menüsü Yapılandırması ve Kişiselleştirme Ayarları",
          "Dosya ve Klasör Hiyerarşisi, Dizin Yapısı Mantığı",
          "Dosya Gezgini Kullanımı ve Navigasyon Teknikleri",
          "Dosya ve Klasör İşlemleri: Oluşturma, Yeniden Adlandırma, Silme (Geri Dönüşüm)",
          "Dosya Kopyalama, Taşıma, Kısayol Oluşturma Pratikleri",
          "Dosya Uzantıları, Dosya Türleri ve Varsayılan Program Eşleştirmeleri",
          "Dosya Arama, Filtreleme ve Hızlı Erişim Özellikleri",
          "Dosya ve Klasör Öznitelikleri (Gizli, Salt Okunur vb.)",
          "Denetim Masası / Ayarlar Menüsü Temel Yapısı",
          "Ekran, Çözünürlük, Tema ve Kişiselleştirme Ayarları",
          "Saat, Dil, Bölge ve Klavye Seçeneklerinin Düzenlenmesi",
          "Güç Seçenekleri, Uyku Modu ve Enerji Tasarrufu Ayarları",
          "Kullanıcı Hesapları Yönetimi: Yönetici ve Standart Hesap Tanımlama",
          "Kullanıcı Şifresi Belirleme, Hesap Güvenliği ve Oturum Açma Seçenekleri",
          "Program Ekle/Kaldır İşlemleri ve Uygulama Yönetimi",
          "Yazıcı ve Tarayıcı Ekleme, Varsayılan Yazıcı Ayarları",
          "Yazdırma Kuyruğu Yönetimi ve Yazdırma Sorunlarını Giderme",
          "Arşivleme Yazılımları (WinRAR, 7-Zip): Dosya Sıkıştırma ve Açma",
          "PDF Okuyucu ve Belge Görüntüleyici Yazılımların Kurulumu ve Kullanımı",
          "Medya Oynatıcılar ve Kodek Yönetimi",
          "Görev Yöneticisi Kullanımı: İşlemler, Performans ve Başlangıç Uygulamaları",
          "Disk Temizleme ve Sürücü İyileştirme (Bölümleme/Birleştirme) Araçları",
          "Sistem Geri Yükleme Noktası Oluşturma ve Geri Yükleme İşlemleri"
        ]
      },
      {
        "id": "mod_blg150_2",
        "number": 2,
        "name": "İnternet ve E-Posta Yönetimi",
        "totalHours": 20,
        "lessonHours": 18,
        "examHours": 2,
        "topics": [
          "İnternet Nedir? Tarihçesi, Çalışma Mantığı ve Ağ Türleri (LAN, WAN, WWW)",
          "İnternet Bağlantı Türleri (Fiber, ADSL, Mobil Veri, Wi-Fi)",
          "IP Adresi, DNS, Modulasyon ve Modem/Router Temel Kavramları",
          "Web Tarayıcı Programları (Chrome, Edge, Firefox) ve Kurulumları",
          "Tarayıcı Arayüzü: Adres Çubuğu, Sekmeler, Geçmiş ve İndirilenler",
          "Yer İmleri (Sık Kullanılanlar) Ekleme, Düzenleme ve Klasörleme",
          "Arama Motorları, Mantıksal Arama Operatörleri ve İleri Düzey Arama Teknikleri",
          "Güvenli İnternet Protokolleri (HTTP / HTTPS) ve SSL Sertifikası Doğrulama",
          "Tarayıcı Gizlilik Ayarları, Çerezler (Cookies) ve Önbellek Temizleme",
          "E-Posta (E-Mail) Kavramı, Çalışma Yapısı ve E-Posta Protokolleri (POP3, IMAP, SMTP)",
          "Web Tabanlı E-Posta Hesabı Açma ve Güvenlik Ayarları",
          "E-Posta Arayüzü: Gelen Kutusu, Gönderilenler, Taslaklar, Çöp Kutusu",
          "Yeni E-Posta Hazırlama: Kime (To), Bilgi (CC), Gizli (BCC) Alanları Kullanımı",
          "E-Posta Metin Biçimlendirme, Dosya ve Belge Ekleme (Attachment) Kuralları",
          "E-Postaları Yanıtlama (Reply/Reply All) ve İletme (Forward) Kuralları",
          "E-Posta Yönetim Yazılımları (MS Outlook) Kurulumu ve Hesap Yapılandırması",
          "E-Posta Filtreleme, Klasörleme, Kurallar Oluşturma ve İstenmeyen (Spam) Yönetimi",
          "E-Posta İmzası Oluşturma ve Otomatik Yanıt (Tatil Bildirimi) Ayarlama"
        ]
      },
      {
        "id": "mod_blg150_3",
        "number": 3,
        "name": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "totalHours": 16,
        "lessonHours": 14,
        "examHours": 2,
        "topics": [
          "Bilgi Güvenliği Kavramı, Temel Prensipler (Gizlilik, Bütünlük, Erişilebilirlik)",
          "Siber Tehditler ve Saldırı Türleri: Virüs, Truva Atı (Trojan), Solucan (Worm)",
          "Casus Yazılımlar (Spyware), Fidye Yazılımları (Ransomware) ve Reklam Yazılımları (Adware)",
          "Oltalama (Phishing), Sosyal Mühendislik ve Sahte Web Sitelerini Tanıma Yöntemleri",
          "Güçlü Şifre Oluşturma Standartları ve Şifre Güvenliği Yönetimi",
          "İki Adımlı Doğrulama (2FA) ve Çok Faktörlü Kimlik Doğrulama (MFA)",
          "Antivirüs ve Güvenlik Yazılımları: Kurulum, Güncelleme ve Sistem Taraması",
          "Güvenlik Duvarı (Firewall) Mantığı, Yapılandırması ve Port Güvenliği",
          "Güvenli İnternet Kullanımı ve Halka Açık (Ortak) Wi-Fi Ağlarındaki Tehlikeler",
          "Veri Yedekleme Stratejileri (Yerel ve Bulut Yedekleme) ve Veri Kurtarma İlkeleri",
          "Mobil Cihaz Güvenliği: Uygulama İzinleri, Ekran Kilitleri ve Biyometrik Koruma",
          "Mobil Cihazlarda Zararlı Yazılımlar ve Uzaktan Cihaz Kilitleme/Silme",
          "Kişisel Verilerin Korunması Kanunu (KVKK) ve Temel Haklar",
          "Dijital Ayak İzi, Çevrimiçi Mahremiyet ve Sosyal Medyada Gizlilik Ayarları"
        ]
      },
      {
        "id": "mod_blg150_4",
        "number": 4,
        "name": "Kelime İşlemci",
        "totalHours": 20,
        "lessonHours": 18,
        "examHours": 2,
        "topics": [
          "Kelime İşlemci Programı (MS Word) Arayüzü, Şerit (Ribbon) ve Görünümler",
          "Yeni Belge Oluşturma, Şablon Seçimi, Belge Kaydetme (DOCX, PDF) ve Farklı Kaydet",
          "Metin Girişi, Seçim Yöntemleri, Kes-Kopyala-Yapıştır ve Biçim Boyacısı",
          "Yazı Tipi Biçimlendirme: Font, Boyut, Renk, Vurgu, Kalın, İtalik, Altı Çizili",
          "Paragraf Biçimlendirme: Hizalama, Girintiler, Satır ve Paragraf Aralıkları",
          "Madde İmleri ve Numaralandırma, Çok Düzeyli Listeler Oluşturma",
          "Kenarlıklar, Gölgelendirme ve Metin Kutusu Kullanımı",
          "Belge Yazım ve Dilbilgisi Denetimi, Eşanlamlılar Sözlüğü ve Sözcük Sayımı",
          "Bul ve Değiştir (Find and Replace) Özelliği İle Metin İyileştirme",
          "Sayfa Yapısı: Kenar Boşlukları, Yönlendirme (Dikey/Yatay), Boyut ve Sütunlar",
          "Sayfa Sonu, Bölüm Sonu (Section Break) ve Farklı Sayfa Düzenleri",
          "Üstbilgi, Altbilgi ve Sayfa Numarası Ekleme ve Farklılaştırma",
          "Belgeye Tablo Ekleme, Satır/Sütun Ekleme, Silme ve Boyutlandırma",
          "Tablo Hücrelerini Birleştirme/Bölme, Hizalama ve Tablo Stilleri",
          "Görsel ve Resim Ekleme, Boyutlandırma, Kırpma ve Metin Kaydırma Seçenekleri",
          "Şekiller, Simgeler ve 3B Modeller Ekleme ve Düzenleme",
          "SmartArt Grafikleri İle Süreç ve Hiyerarşi Şemaları Hazırlama",
          "Başlık Stilleri (Heading 1, 2, 3) Kullanımı ve Otomatik İçindekiler Tablosu Oluşturma"
        ]
      },
      {
        "id": "mod_blg150_5",
        "number": 5,
        "name": "Elektronik Tablolama",
        "totalHours": 34,
        "lessonHours": 32,
        "examHours": 2,
        "topics": [
          "Elektronik Tablolama Programı (MS Excel) Arayüzü, Çalışma Kitabı ve Sayfa Yapısı",
          "Hücre, Satır, Sütun Kavramları, Hücre Adlandırma ve Aralık Seçimleri",
          "Veri Türleri: Metin, Sayı, Tarih, Saat, Para Birimi ve Yüzde Girişi",
          "Hücre Biçimlendirme: Yazı Tipi, Hizalama, Kenarlıklar ve Dolgu Renkleri",
          "Sayı Biçimlendirme, Ondalık Basamak Ayarları ve Özel Biçimler",
          "Metni Kaydır, Hücreleri Birleştir ve Ortala Seçenekleri",
          "Satır Yüksekliği ve Sütun Genişliği Ayarları, Otomatik Sığdırma",
          "Temel Otomatik Doldurma (AutoFill) ve Özel Seri Listeleri Kullanımı",
          "Formül Mantığı, Operatörler (+, -, *, /, ^) ve İşlem Önceliği Kuralları",
          "Temel Fonksiyonlar: TOPLA (SUM), ORTALAMA (AVERAGE), MAK (MAX), MİN (MIN)",
          "SAY (COUNT), BAĞ_DEĞ_DOLU_SAY (COUNTA) Fonksiyonları",
          "Göreli (Bağıl) ve Mutlak ($) Hücre Başvuruları, Sabitleme Mantığı",
          "Mantıksal Fonksiyonlar: EĞER (IF) Fonksiyonu ve Temel Karar Yapıları",
          "İç İçe EĞER (Nested IF) Kullanımı ve Çoklu Koşullar",
          "VE (AND), VEYA (OR) Fonksiyonları İle Birleşik Koşullar",
          "EĞERSAY (COUNTIF) ve ETOPLA (SUMIF) Koşullu Fonksiyonları",
          "Metin Fonksiyonları: BİRLEŞTİR, BÜYÜKHARF, KÜÇÜKHARF, YAZIM.DÜZENİ, KIRP",
          "Parça Al (MID), Soldan (LEFT), Sağdan (RIGHT) Metin Ayrıştırma",
          "Tarih ve Saat Fonksiyonları: BUGÜN, ŞİMDİ, GÜN, AY, YIL, TARİH",
          "DÜŞEYARA (VLOOKUP) Fonksiyonu: Tablodan Veri Arama ve Eşleştirme",
          "YATAYARA (HLOOKUP) ve ÇAPRAZARA (XLOOKUP) Giriş",
          "Koşullu Biçimlendirme (Conditional Formatting): Hücre Vurgulama, Veri Çubukları",
          "Veri Sıralama (A-Z, Z-A, Özel Sıralama) ve Çok Düzeyli Sıralama",
          "Veri Filtreleme (Otomatik Filtre, Metin ve Sayı Filtreleri)",
          "Veri Doğrulama (Data Validation): Açılır Liste ve Hücre Kısıtlamaları",
          "Grafik Türleri ve Amaca Uygun Grafik Seçimi (Sütun, Çubuk, Pasta, Çizgi)",
          "Grafik Oluşturma, Veri Serilerini Düzenleme ve Eksen Ayarları",
          "Grafik Başlığı, Gösterge (Legend), Veri Etiketleri ve Stil Biçimlendirme",
          "Çalışma Sayfaları Yönetimi: Ekleme, Yeniden Adlandırma, Taşıma/Kopyalama, Sekme Rengi",
          "Sayfalar Arası Formül Kullanımı ve Veri Bağlantıları",
          "Sayfa Yapısı, Yazdırma Alanı Belirleme ve Başlıkları Yineleme",
          "Sayfayı Bir Sayfaya Sığdırma, Kenar Boşlukları ve Çıktı Alma"
        ]
      },
      {
        "id": "mod_blg150_6",
        "number": 6,
        "name": "Sunu Hazırlama",
        "totalHours": 14,
        "lessonHours": 12,
        "examHours": 2,
        "topics": [
          "Sunu Programı (MS PowerPoint) Arayüzü ve Sunum Tasarım İlkeleri",
          "Yeni Sunu Oluşturma, Şablon ve Tema Seçimi, Slayt Boyutları (16:9, 4:3)",
          "Slayt Düzenleri (Layouts), Yeni Slayt Ekleme, Çoğaltma ve Sıralama",
          "Metin Kutuları Ekleme, Tipografi, Renk Uyumu ve Okunabilirlik Kuralları",
          "Resim, İllüstrasyon ve Fotoğraf Ekleme, Kırpma ve Görsel Efektler",
          "Şekiller, Simgeler ve SmartArt İle Diyagram ve Kavram Haritaları Oluşturma",
          "Tablo ve Grafik Ekleyerek Verileri Sunumda Görselleştirme",
          "Sunuma Ses ve Video Dosyaları Ekleme ve Oynatma Seçenekleri",
          "Slayt Geçiş Efektleri (Transitions): Türler, Süre ve Ses Ayarları",
          "Nesne Animasyonları (Giriş, Vurgu, Çıkış, Hareket Yolları) ve Zamanlama",
          "Fotoğraf Albümü Oluşturma ve Gösteri Dosyası (.ppsx) Olarak Kaydetme",
          "Konuşmacı Notları Ekleme, Prova Zamanlamaları ve Sunucu Görünümü Kullanımı"
        ]
      }
    ],
    "syllabus": [
      {
        "hour": 1,
        "topic": "Bilgi Teknolojisinin Temel Kavramları ve Bilgisayarın Tarihsel Gelişimi",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 2,
        "topic": "Donanım ve Yazılım Kavramları, Bilgisayar Çeşitleri",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 3,
        "topic": "Kasa ve Temel Donanım Birimleri: Anakart, İşlemci (CPU), Bellek (RAM)",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 4,
        "topic": "Dahili ve Harici Depolama Birimleri (HDD, SSD, Flash Bellek)",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 5,
        "topic": "Giriş Birimleri: Klavye, Fare, Tarayıcı, Barkod Okuyucu",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 6,
        "topic": "Çıkış Birimleri: Monitör, Yazıcı, Hoparlör, Projeksiyon",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 7,
        "topic": "Portlar, Bağlantı Noktaları ve Kablolar (HDMI, VGA, USB, DVI)",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 8,
        "topic": "Bilgisayar Çevre Birimlerinin Güvenli Bağlantısı ve Kurulumu",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 9,
        "topic": "BIOS / UEFI Arayüzü ve Temel Ayarları",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 10,
        "topic": "İlk Açılış (Boot) Seçenekleri ve Başlangıç Yapılandırması",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 11,
        "topic": "İşletim Sistemi Kavramı ve İşletim Sistemi Türleri",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 12,
        "topic": "Bilgisayar Sistemine Uygun İşletim Sistemi Seçimi ve Ön Gereksinimleri",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 13,
        "topic": "Kurulum Ortamı Hazırlama (Önyüklenebilir USB Oluşturma)",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 14,
        "topic": "Sabit Disk Bölümleme (Disk Partitioning) ve Biçimlendirme (Formatting)",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 15,
        "topic": "İşletim Sistemi Kurulum Aşamaları ve Temel Ayarlar - 1",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 16,
        "topic": "İşletim Sistemi Kurulum Aşamaları ve Temel Ayarlar - 2",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 17,
        "topic": "Donanım Sürücüsü (Driver) Kavramı ve Sürücü Türleri",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 18,
        "topic": "Aygıt Yöneticisi Tanıtımı ve Donanım Durumlarının İncelenmesi",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 19,
        "topic": "Anakart, Ekran Kartı ve Ses Kartı Sürücülerinin Kurulumu",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 20,
        "topic": "Ağ (Ethernet/Wi-Fi) ve Çevre Birimi Sürücülerinin Kurulumu",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 21,
        "topic": "İşletim Sistemi Kullanıcı Arayüzü: Masaüstü, Görev Çubuğu ve Bildirim Alanı",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 22,
        "topic": "Başlat Menüsü Yapılandırması ve Kişiselleştirme Ayarları",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 23,
        "topic": "Dosya ve Klasör Hiyerarşisi, Dizin Yapısı Mantığı",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 24,
        "topic": "Dosya Gezgini Kullanımı ve Navigasyon Teknikleri",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 25,
        "topic": "Dosya ve Klasör İşlemleri: Oluşturma, Yeniden Adlandırma, Silme (Geri Dönüşüm)",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 26,
        "topic": "Dosya Kopyalama, Taşıma, Kısayol Oluşturma Pratikleri",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 27,
        "topic": "Dosya Uzantıları, Dosya Türleri ve Varsayılan Program Eşleştirmeleri",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 28,
        "topic": "Dosya Arama, Filtreleme ve Hızlı Erişim Özellikleri",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 29,
        "topic": "Dosya ve Klasör Öznitelikleri (Gizli, Salt Okunur vb.)",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 30,
        "topic": "Denetim Masası / Ayarlar Menüsü Temel Yapısı",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 31,
        "topic": "Ekran, Çözünürlük, Tema ve Kişiselleştirme Ayarları",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 32,
        "topic": "Saat, Dil, Bölge ve Klavye Seçeneklerinin Düzenlenmesi",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 33,
        "topic": "Güç Seçenekleri, Uyku Modu ve Enerji Tasarrufu Ayarları",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 34,
        "topic": "Kullanıcı Hesapları Yönetimi: Yönetici ve Standart Hesap Tanımlama",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 35,
        "topic": "Kullanıcı Şifresi Belirleme, Hesap Güvenliği ve Oturum Açma Seçenekleri",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 36,
        "topic": "Program Ekle/Kaldır İşlemleri ve Uygulama Yönetimi",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 37,
        "topic": "Yazıcı ve Tarayıcı Ekleme, Varsayılan Yazıcı Ayarları",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 38,
        "topic": "Yazdırma Kuyruğu Yönetimi ve Yazdırma Sorunlarını Giderme",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 39,
        "topic": "Arşivleme Yazılımları (WinRAR, 7-Zip): Dosya Sıkıştırma ve Açma",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 40,
        "topic": "PDF Okuyucu ve Belge Görüntüleyici Yazılımların Kurulumu ve Kullanımı",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 41,
        "topic": "Medya Oynatıcılar ve Kodek Yönetimi",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 42,
        "topic": "Görev Yöneticisi Kullanımı: İşlemler, Performans ve Başlangıç Uygulamaları",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 43,
        "topic": "Disk Temizleme ve Sürücü İyileştirme (Bölümleme/Birleştirme) Araçları",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 44,
        "topic": "Sistem Geri Yükleme Noktası Oluşturma ve Geri Yükleme İşlemleri",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 45,
        "topic": "Bilgisayara Giriş - Modül Değerlendirme Sınavı (Uygulama)",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": true
      },
      {
        "hour": 46,
        "topic": "Bilgisayara Giriş - Modül Değerlendirme Sınavı (Teorik & Değerlendirme)",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": true
      },
      {
        "hour": 47,
        "topic": "İnternet Nedir? Tarihçesi, Çalışma Mantığı ve Ağ Türleri (LAN, WAN, WWW)",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 48,
        "topic": "İnternet Bağlantı Türleri (Fiber, ADSL, Mobil Veri, Wi-Fi)",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 49,
        "topic": "IP Adresi, DNS, Modulasyon ve Modem/Router Temel Kavramları",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 50,
        "topic": "Web Tarayıcı Programları (Chrome, Edge, Firefox) ve Kurulumları",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 51,
        "topic": "Tarayıcı Arayüzü: Adres Çubuğu, Sekmeler, Geçmiş ve İndirilenler",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 52,
        "topic": "Yer İmleri (Sık Kullanılanlar) Ekleme, Düzenleme ve Klasörleme",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 53,
        "topic": "Arama Motorları, Mantıksal Arama Operatörleri ve İleri Düzey Arama Teknikleri",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 54,
        "topic": "Güvenli İnternet Protokolleri (HTTP / HTTPS) ve SSL Sertifikası Doğrulama",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 55,
        "topic": "Tarayıcı Gizlilik Ayarları, Çerezler (Cookies) ve Önbellek Temizleme",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 56,
        "topic": "E-Posta (E-Mail) Kavramı, Çalışma Yapısı ve E-Posta Protokolleri (POP3, IMAP, SMTP)",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 57,
        "topic": "Web Tabanlı E-Posta Hesabı Açma ve Güvenlik Ayarları",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 58,
        "topic": "E-Posta Arayüzü: Gelen Kutusu, Gönderilenler, Taslaklar, Çöp Kutusu",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 59,
        "topic": "Yeni E-Posta Hazırlama: Kime (To), Bilgi (CC), Gizli (BCC) Alanları Kullanımı",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 60,
        "topic": "E-Posta Metin Biçimlendirme, Dosya ve Belge Ekleme (Attachment) Kuralları",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 61,
        "topic": "E-Postaları Yanıtlama (Reply/Reply All) ve İletme (Forward) Kuralları",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 62,
        "topic": "E-Posta Yönetim Yazılımları (MS Outlook) Kurulumu ve Hesap Yapılandırması",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 63,
        "topic": "E-Posta Filtreleme, Klasörleme, Kurallar Oluşturma ve İstenmeyen (Spam) Yönetimi",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 64,
        "topic": "E-Posta İmzası Oluşturma ve Otomatik Yanıt (Tatil Bildirimi) Ayarlama",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 65,
        "topic": "İnternet ve E-Posta Yönetimi - Modül Değerlendirme Sınavı (Uygulama)",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": true
      },
      {
        "hour": 66,
        "topic": "İnternet ve E-Posta Yönetimi - Modül Değerlendirme Sınavı (Teorik & Değerlendirme)",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": true
      },
      {
        "hour": 67,
        "topic": "Bilgi Güvenliği Kavramı, Temel Prensipler (Gizlilik, Bütünlük, Erişilebilirlik)",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": false
      },
      {
        "hour": 68,
        "topic": "Siber Tehditler ve Saldırı Türleri: Virüs, Truva Atı (Trojan), Solucan (Worm)",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": false
      },
      {
        "hour": 69,
        "topic": "Casus Yazılımlar (Spyware), Fidye Yazılımları (Ransomware) ve Reklam Yazılımları (Adware)",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": false
      },
      {
        "hour": 70,
        "topic": "Oltalama (Phishing), Sosyal Mühendislik ve Sahte Web Sitelerini Tanıma Yöntemleri",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": false
      },
      {
        "hour": 71,
        "topic": "Güçlü Şifre Oluşturma Standartları ve Şifre Güvenliği Yönetimi",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": false
      },
      {
        "hour": 72,
        "topic": "İki Adımlı Doğrulama (2FA) ve Çok Faktörlü Kimlik Doğrulama (MFA)",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": false
      },
      {
        "hour": 73,
        "topic": "Antivirüs ve Güvenlik Yazılımları: Kurulum, Güncelleme ve Sistem Taraması",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": false
      },
      {
        "hour": 74,
        "topic": "Güvenlik Duvarı (Firewall) Mantığı, Yapılandırması ve Port Güvenliği",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": false
      },
      {
        "hour": 75,
        "topic": "Güvenli İnternet Kullanımı ve Halka Açık (Ortak) Wi-Fi Ağlarındaki Tehlikeler",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": false
      },
      {
        "hour": 76,
        "topic": "Veri Yedekleme Stratejileri (Yerel ve Bulut Yedekleme) ve Veri Kurtarma İlkeleri",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": false
      },
      {
        "hour": 77,
        "topic": "Mobil Cihaz Güvenliği: Uygulama İzinleri, Ekran Kilitleri ve Biyometrik Koruma",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": false
      },
      {
        "hour": 78,
        "topic": "Mobil Cihazlarda Zararlı Yazılımlar ve Uzaktan Cihaz Kilitleme/Silme",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": false
      },
      {
        "hour": 79,
        "topic": "Kişisel Verilerin Korunması Kanunu (KVKK) ve Temel Haklar",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": false
      },
      {
        "hour": 80,
        "topic": "Dijital Ayak İzi, Çevrimiçi Mahremiyet ve Sosyal Medyada Gizlilik Ayarları",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": false
      },
      {
        "hour": 81,
        "topic": "Bilgi Güvenliği Bilinçlendirme Eğitimi - Modül Değerlendirme Sınavı (Uygulama)",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": true
      },
      {
        "hour": 82,
        "topic": "Bilgi Güvenliği Bilinçlendirme Eğitimi - Modül Değerlendirme Sınavı (Teorik & Değerlendirme)",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": true
      },
      {
        "hour": 83,
        "topic": "Kelime İşlemci Programı (MS Word) Arayüzü, Şerit (Ribbon) ve Görünümler",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 84,
        "topic": "Yeni Belge Oluşturma, Şablon Seçimi, Belge Kaydetme (DOCX, PDF) ve Farklı Kaydet",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 85,
        "topic": "Metin Girişi, Seçim Yöntemleri, Kes-Kopyala-Yapıştır ve Biçim Boyacısı",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 86,
        "topic": "Yazı Tipi Biçimlendirme: Font, Boyut, Renk, Vurgu, Kalın, İtalik, Altı Çizili",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 87,
        "topic": "Paragraf Biçimlendirme: Hizalama, Girintiler, Satır ve Paragraf Aralıkları",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 88,
        "topic": "Madde İmleri ve Numaralandırma, Çok Düzeyli Listeler Oluşturma",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 89,
        "topic": "Kenarlıklar, Gölgelendirme ve Metin Kutusu Kullanımı",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 90,
        "topic": "Belge Yazım ve Dilbilgisi Denetimi, Eşanlamlılar Sözlüğü ve Sözcük Sayımı",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 91,
        "topic": "Bul ve Değiştir (Find and Replace) Özelliği İle Metin İyileştirme",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 92,
        "topic": "Sayfa Yapısı: Kenar Boşlukları, Yönlendirme (Dikey/Yatay), Boyut ve Sütunlar",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 93,
        "topic": "Sayfa Sonu, Bölüm Sonu (Section Break) ve Farklı Sayfa Düzenleri",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 94,
        "topic": "Üstbilgi, Altbilgi ve Sayfa Numarası Ekleme ve Farklılaştırma",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 95,
        "topic": "Belgeye Tablo Ekleme, Satır/Sütun Ekleme, Silme ve Boyutlandırma",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 96,
        "topic": "Tablo Hücrelerini Birleştirme/Bölme, Hizalama ve Tablo Stilleri",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 97,
        "topic": "Görsel ve Resim Ekleme, Boyutlandırma, Kırpma ve Metin Kaydırma Seçenekleri",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 98,
        "topic": "Şekiller, Simgeler ve 3B Modeller Ekleme ve Düzenleme",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 99,
        "topic": "SmartArt Grafikleri İle Süreç ve Hiyerarşi Şemaları Hazırlama",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 100,
        "topic": "Başlık Stilleri (Heading 1, 2, 3) Kullanımı ve Otomatik İçindekiler Tablosu Oluşturma",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 101,
        "topic": "Kelime İşlemci - Modül Değerlendirme Sınavı (Uygulama)",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": true
      },
      {
        "hour": 102,
        "topic": "Kelime İşlemci - Modül Değerlendirme Sınavı (Teorik & Değerlendirme)",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": true
      },
      {
        "hour": 103,
        "topic": "Elektronik Tablolama Programı (MS Excel) Arayüzü, Çalışma Kitabı ve Sayfa Yapısı",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 104,
        "topic": "Hücre, Satır, Sütun Kavramları, Hücre Adlandırma ve Aralık Seçimleri",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 105,
        "topic": "Veri Türleri: Metin, Sayı, Tarih, Saat, Para Birimi ve Yüzde Girişi",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 106,
        "topic": "Hücre Biçimlendirme: Yazı Tipi, Hizalama, Kenarlıklar ve Dolgu Renkleri",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 107,
        "topic": "Sayı Biçimlendirme, Ondalık Basamak Ayarları ve Özel Biçimler",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 108,
        "topic": "Metni Kaydır, Hücreleri Birleştir ve Ortala Seçenekleri",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 109,
        "topic": "Satır Yüksekliği ve Sütun Genişliği Ayarları, Otomatik Sığdırma",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 110,
        "topic": "Temel Otomatik Doldurma (AutoFill) ve Özel Seri Listeleri Kullanımı",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 111,
        "topic": "Formül Mantığı, Operatörler (+, -, *, /, ^) ve İşlem Önceliği Kuralları",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 112,
        "topic": "Temel Fonksiyonlar: TOPLA (SUM), ORTALAMA (AVERAGE), MAK (MAX), MİN (MIN)",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 113,
        "topic": "SAY (COUNT), BAĞ_DEĞ_DOLU_SAY (COUNTA) Fonksiyonları",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 114,
        "topic": "Göreli (Bağıl) ve Mutlak ($) Hücre Başvuruları, Sabitleme Mantığı",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 115,
        "topic": "Mantıksal Fonksiyonlar: EĞER (IF) Fonksiyonu ve Temel Karar Yapıları",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 116,
        "topic": "İç İçe EĞER (Nested IF) Kullanımı ve Çoklu Koşullar",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 117,
        "topic": "VE (AND), VEYA (OR) Fonksiyonları İle Birleşik Koşullar",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 118,
        "topic": "EĞERSAY (COUNTIF) ve ETOPLA (SUMIF) Koşullu Fonksiyonları",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 119,
        "topic": "Metin Fonksiyonları: BİRLEŞTİR, BÜYÜKHARF, KÜÇÜKHARF, YAZIM.DÜZENİ, KIRP",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 120,
        "topic": "Parça Al (MID), Soldan (LEFT), Sağdan (RIGHT) Metin Ayrıştırma",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 121,
        "topic": "Tarih ve Saat Fonksiyonları: BUGÜN, ŞİMDİ, GÜN, AY, YIL, TARİH",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 122,
        "topic": "DÜŞEYARA (VLOOKUP) Fonksiyonu: Tablodan Veri Arama ve Eşleştirme",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 123,
        "topic": "YATAYARA (HLOOKUP) ve ÇAPRAZARA (XLOOKUP) Giriş",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 124,
        "topic": "Koşullu Biçimlendirme (Conditional Formatting): Hücre Vurgulama, Veri Çubukları",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 125,
        "topic": "Veri Sıralama (A-Z, Z-A, Özel Sıralama) ve Çok Düzeyli Sıralama",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 126,
        "topic": "Veri Filtreleme (Otomatik Filtre, Metin ve Sayı Filtreleri)",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 127,
        "topic": "Veri Doğrulama (Data Validation): Açılır Liste ve Hücre Kısıtlamaları",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 128,
        "topic": "Grafik Türleri ve Amaca Uygun Grafik Seçimi (Sütun, Çubuk, Pasta, Çizgi)",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 129,
        "topic": "Grafik Oluşturma, Veri Serilerini Düzenleme ve Eksen Ayarları",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 130,
        "topic": "Grafik Başlığı, Gösterge (Legend), Veri Etiketleri ve Stil Biçimlendirme",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 131,
        "topic": "Çalışma Sayfaları Yönetimi: Ekleme, Yeniden Adlandırma, Taşıma/Kopyalama, Sekme Rengi",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 132,
        "topic": "Sayfalar Arası Formül Kullanımı ve Veri Bağlantıları",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 133,
        "topic": "Sayfa Yapısı, Yazdırma Alanı Belirleme ve Başlıkları Yineleme",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 134,
        "topic": "Sayfayı Bir Sayfaya Sığdırma, Kenar Boşlukları ve Çıktı Alma",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 135,
        "topic": "Elektronik Tablolama - Modül Değerlendirme Sınavı (Uygulama)",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": true
      },
      {
        "hour": 136,
        "topic": "Elektronik Tablolama - Modül Değerlendirme Sınavı (Teorik & Değerlendirme)",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": true
      },
      {
        "hour": 137,
        "topic": "Sunu Programı (MS PowerPoint) Arayüzü ve Sunum Tasarım İlkeleri",
        "moduleNumber": 6,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 138,
        "topic": "Yeni Sunu Oluşturma, Şablon ve Tema Seçimi, Slayt Boyutları (16:9, 4:3)",
        "moduleNumber": 6,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 139,
        "topic": "Slayt Düzenleri (Layouts), Yeni Slayt Ekleme, Çoğaltma ve Sıralama",
        "moduleNumber": 6,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 140,
        "topic": "Metin Kutuları Ekleme, Tipografi, Renk Uyumu ve Okunabilirlik Kuralları",
        "moduleNumber": 6,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 141,
        "topic": "Resim, İllüstrasyon ve Fotoğraf Ekleme, Kırpma ve Görsel Efektler",
        "moduleNumber": 6,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 142,
        "topic": "Şekiller, Simgeler ve SmartArt İle Diyagram ve Kavram Haritaları Oluşturma",
        "moduleNumber": 6,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 143,
        "topic": "Tablo ve Grafik Ekleyerek Verileri Sunumda Görselleştirme",
        "moduleNumber": 6,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 144,
        "topic": "Sunuma Ses ve Video Dosyaları Ekleme ve Oynatma Seçenekleri",
        "moduleNumber": 6,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 145,
        "topic": "Slayt Geçiş Efektleri (Transitions): Türler, Süre ve Ses Ayarları",
        "moduleNumber": 6,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 146,
        "topic": "Nesne Animasyonları (Giriş, Vurgu, Çıkış, Hareket Yolları) ve Zamanlama",
        "moduleNumber": 6,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 147,
        "topic": "Fotoğraf Albümü Oluşturma ve Gösteri Dosyası (.ppsx) Olarak Kaydetme",
        "moduleNumber": 6,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 148,
        "topic": "Konuşmacı Notları Ekleme, Prova Zamanlamaları ve Sunucu Görünümü Kullanımı",
        "moduleNumber": 6,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 149,
        "topic": "Sunu Hazırlama - Modül Değerlendirme Sınavı (Uygulama)",
        "moduleNumber": 6,
        "moduleName": "Sunu Hazırlama",
        "isExam": true
      },
      {
        "hour": 150,
        "topic": "Sunu Hazırlama - Modül Değerlendirme Sınavı (Teorik & Değerlendirme)",
        "moduleNumber": 6,
        "moduleName": "Sunu Hazırlama",
        "isExam": true
      }
    ]
  },
  {
    "id": "tmpl_bilgisayar_isletmenligi_163",
    "name": "Bilgisayar İşletmenliği (Operatörlüğü) - 163 Saat",
    "code": "BLG-163",
    "category": "Bilişim Teknolojileri",
    "area": "Bilişim Teknolojileri",
    "totalHours": 163,
    "moduleCount": 6,
    "description": "T.C. Millî Eğitim Bakanlığı Hayat Boyu Öğrenme Genel Müdürlüğü Bilişim Teknolojileri Alanı - Bilgisayar İşletmenliği (Operatörlüğü) Kurs Programı (6 Modül, 163 Ders Saati).",
    "modules": [
      {
        "id": "mod_blg163_1",
        "number": 1,
        "name": "Bilgisayara Giriş",
        "totalHours": 52,
        "lessonHours": 50,
        "examHours": 2,
        "topics": [
          "Bilgi Teknolojisinin Temel Kavramları ve Bilgisayarın Tarihsel Gelişimi",
          "Donanım ve Yazılım Kavramları, Bilgisayar Çeşitleri",
          "Kasa ve Temel Donanım Birimleri: Anakart, İşlemci (CPU), Bellek (RAM)",
          "Dahili ve Harici Depolama Birimleri (HDD, SSD, Flash Bellek)",
          "Giriş Birimleri: Klavye, Fare, Tarayıcı, Barkod Okuyucu",
          "Çıkış Birimleri: Monitör, Yazıcı, Hoparlör, Projeksiyon",
          "Portlar, Bağlantı Noktaları ve Kablolar (HDMI, VGA, USB, DVI)",
          "Bilgisayar Çevre Birimlerinin Güvenli Bağlantısı ve Kurulumu",
          "BIOS / UEFI Arayüzü ve Temel Ayarları",
          "İlk Açılış (Boot) Seçenekleri ve Başlangıç Yapılandırması",
          "İşletim Sistemi Kavramı ve İşletim Sistemi Türleri",
          "Bilgisayar Sistemine Uygun İşletim Sistemi Seçimi ve Ön Gereksinimleri",
          "Kurulum Ortamı Hazırlama (Önyüklenebilir USB Oluşturma)",
          "Sabit Disk Bölümleme (Disk Partitioning) ve Biçimlendirme (Formatting)",
          "İşletim Sistemi Kurulum Aşamaları ve Temel Ayarlar - 1",
          "İşletim Sistemi Kurulum Aşamaları ve Temel Ayarlar - 2",
          "Donanım Sürücüsü (Driver) Kavramı ve Sürücü Türleri",
          "Aygıt Yöneticisi Tanıtımı ve Donanım Durumlarının İncelenmesi",
          "Anakart, Ekran Kartı ve Ses Kartı Sürücülerinin Kurulumu",
          "Ağ (Ethernet/Wi-Fi) ve Çevre Birimi Sürücülerinin Kurulumu",
          "İşletim Sistemi Kullanıcı Arayüzü: Masaüstü, Görev Çubuğu ve Bildirim Alanı",
          "Başlat Menüsü Yapılandırması ve Kişiselleştirme Ayarları",
          "Dosya ve Klasör Hiyerarşisi, Dizin Yapısı Mantığı",
          "Dosya Gezgini Kullanımı ve Navigasyon Teknikleri",
          "Dosya ve Klasör İşlemleri: Oluşturma, Yeniden Adlandırma, Silme (Geri Dönüşüm)",
          "Dosya Kopyalama, Taşıma, Kısayol Oluşturma Pratikleri",
          "Dosya Uzantıları, Dosya Türleri ve Varsayılan Program Eşleştirmeleri",
          "Dosya Arama, Filtreleme ve Hızlı Erişim Özellikleri",
          "Dosya ve Klasör Öznitelikleri (Gizli, Salt Okunur vb.)",
          "Denetim Masası / Ayarlar Menüsü Temel Yapısı",
          "Ekran, Çözünürlük, Tema ve Kişiselleştirme Ayarları",
          "Saat, Dil, Bölge ve Klavye Seçeneklerinin Düzenlenmesi",
          "Güç Seçenekleri, Uyku Modu ve Enerji Tasarrufu Ayarları",
          "Kullanıcı Hesapları Yönetimi: Yönetici ve Standart Hesap Tanımlama",
          "Kullanıcı Şifresi Belirleme, Hesap Güvenliği ve Oturum Açma Seçenekleri",
          "Program Ekle/Kaldır İşlemleri ve Uygulama Yönetimi",
          "Yazıcı ve Tarayıcı Ekleme, Varsayılan Yazıcı Ayarları",
          "Yazdırma Kuyruğu Yönetimi ve Yazdırma Sorunlarını Giderme",
          "Arşivleme Yazılımları (WinRAR, 7-Zip): Dosya Sıkıştırma ve Açma",
          "PDF Okuyucu ve Belge Görüntüleyici Yazılımların Kurulumu ve Kullanımı",
          "Medya Oynatıcılar ve Kodek Yönetimi",
          "Görev Yöneticisi Kullanımı: İşlemler, Performans ve Başlangıç Uygulamaları",
          "Disk Temizleme ve Sürücü İyileştirme (Bölümleme/Birleştirme) Araçları",
          "Sistem Geri Yükleme Noktası Oluşturma ve Geri Yükleme İşlemleri",
          "İşletim Sistemi Güncellemeleri (Windows Update) ve Bakım Stratejileri",
          "Basit Donanım ve Yazılım Hatalarını Tanılama ve Çözme Yöntemleri",
          "Ergonomi ve İş Sağlığı Güvenliği (İSG) Standartları",
          "Bilgisayar Başında Doğru Oturuş ve Çalışma Ortamı Düzeni",
          "Kapsamlı İşletim Sistemi ve Donanım Yönetimi Uygulaması - 1",
          "Kapsamlı İşletim Sistemi ve Donanım Yönetimi Uygulaması - 2"
        ]
      },
      {
        "id": "mod_blg163_2",
        "number": 2,
        "name": "İnternet ve E-Posta Yönetimi",
        "totalHours": 22,
        "lessonHours": 20,
        "examHours": 2,
        "topics": [
          "İnternet Nedir? Tarihçesi, Çalışma Mantığı ve Ağ Türleri (LAN, WAN, WWW)",
          "İnternet Bağlantı Türleri (Fiber, ADSL, Mobil Veri, Wi-Fi)",
          "IP Adresi, DNS, Modulasyon ve Modem/Router Temel Kavramları",
          "Web Tarayıcı Programları (Chrome, Edge, Firefox) ve Kurulumları",
          "Tarayıcı Arayüzü: Adres Çubuğu, Sekmeler, Geçmiş ve İndirilenler",
          "Yer İmleri (Sık Kullanılanlar) Ekleme, Düzenleme ve Klasörleme",
          "Arama Motorları, Mantıksal Arama Operatörleri ve İleri Düzey Arama Teknikleri",
          "Güvenli İnternet Protokolleri (HTTP / HTTPS) ve SSL Sertifikası Doğrulama",
          "Tarayıcı Gizlilik Ayarları, Çerezler (Cookies) ve Önbellek Temizleme",
          "E-Posta (E-Mail) Kavramı, Çalışma Yapısı ve E-Posta Protokolleri (POP3, IMAP, SMTP)",
          "Web Tabanlı E-Posta Hesabı Açma ve Güvenlik Ayarları",
          "E-Posta Arayüzü: Gelen Kutusu, Gönderilenler, Taslaklar, Çöp Kutusu",
          "Yeni E-Posta Hazırlama: Kime (To), Bilgi (CC), Gizli (BCC) Alanları Kullanımı",
          "E-Posta Metin Biçimlendirme, Dosya ve Belge Ekleme (Attachment) Kuralları",
          "E-Postaları Yanıtlama (Reply/Reply All) ve İletme (Forward) Kuralları",
          "E-Posta Yönetim Yazılımları (MS Outlook) Kurulumu ve Hesap Yapılandırması",
          "E-Posta Filtreleme, Klasörleme, Kurallar Oluşturma ve İstenmeyen (Spam) Yönetimi",
          "E-Posta İmzası Oluşturma ve Otomatik Yanıt (Tatil Bildirimi) Ayarlama",
          "Kişiler (Rehber) ve Adres Defteri Yönetimi, Dağıtım Listesi Oluşturma",
          "Takvim, Randevu, Görev ve Hatırlatıcı Yönetimi Pratikleri"
        ]
      },
      {
        "id": "mod_blg163_3",
        "number": 3,
        "name": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "totalHours": 17,
        "lessonHours": 15,
        "examHours": 2,
        "topics": [
          "Bilgi Güvenliği Kavramı, Temel Prensipler (Gizlilik, Bütünlük, Erişilebilirlik)",
          "Siber Tehditler ve Saldırı Türleri: Virüs, Truva Atı (Trojan), Solucan (Worm)",
          "Casus Yazılımlar (Spyware), Fidye Yazılımları (Ransomware) ve Reklam Yazılımları (Adware)",
          "Oltalama (Phishing), Sosyal Mühendislik ve Sahte Web Sitelerini Tanıma Yöntemleri",
          "Güçlü Şifre Oluşturma Standartları ve Şifre Güvenliği Yönetimi",
          "İki Adımlı Doğrulama (2FA) ve Çok Faktörlü Kimlik Doğrulama (MFA)",
          "Antivirüs ve Güvenlik Yazılımları: Kurulum, Güncelleme ve Sistem Taraması",
          "Güvenlik Duvarı (Firewall) Mantığı, Yapılandırması ve Port Güvenliği",
          "Güvenli İnternet Kullanımı ve Halka Açık (Ortak) Wi-Fi Ağlarındaki Tehlikeler",
          "Veri Yedekleme Stratejileri (Yerel ve Bulut Yedekleme) ve Veri Kurtarma İlkeleri",
          "Mobil Cihaz Güvenliği: Uygulama İzinleri, Ekran Kilitleri ve Biyometrik Koruma",
          "Mobil Cihazlarda Zararlı Yazılımlar ve Uzaktan Cihaz Kilitleme/Silme",
          "Kişisel Verilerin Korunması Kanunu (KVKK) ve Temel Haklar",
          "Dijital Ayak İzi, Çevrimiçi Mahremiyet ve Sosyal Medyada Gizlilik Ayarları",
          "Siber Suçlar, Bilişim Hukuku ve Yasal Sorumluluklar"
        ]
      },
      {
        "id": "mod_blg163_4",
        "number": 4,
        "name": "Kelime İşlemci",
        "totalHours": 22,
        "lessonHours": 20,
        "examHours": 2,
        "topics": [
          "Kelime İşlemci Programı (MS Word) Arayüzü, Şerit (Ribbon) ve Görünümler",
          "Yeni Belge Oluşturma, Şablon Seçimi, Belge Kaydetme (DOCX, PDF) ve Farklı Kaydet",
          "Metin Girişi, Seçim Yöntemleri, Kes-Kopyala-Yapıştır ve Biçim Boyacısı",
          "Yazı Tipi Biçimlendirme: Font, Boyut, Renk, Vurgu, Kalın, İtalik, Altı Çizili",
          "Paragraf Biçimlendirme: Hizalama, Girintiler, Satır ve Paragraf Aralıkları",
          "Madde İmleri ve Numaralandırma, Çok Düzeyli Listeler Oluşturma",
          "Kenarlıklar, Gölgelendirme ve Metin Kutusu Kullanımı",
          "Belge Yazım ve Dilbilgisi Denetimi, Eşanlamlılar Sözlüğü ve Sözcük Sayımı",
          "Bul ve Değiştir (Find and Replace) Özelliği İle Metin İyileştirme",
          "Sayfa Yapısı: Kenar Boşlukları, Yönlendirme (Dikey/Yatay), Boyut ve Sütunlar",
          "Sayfa Sonu, Bölüm Sonu (Section Break) ve Farklı Sayfa Düzenleri",
          "Üstbilgi, Altbilgi ve Sayfa Numarası Ekleme ve Farklılaştırma",
          "Belgeye Tablo Ekleme, Satır/Sütun Ekleme, Silme ve Boyutlandırma",
          "Tablo Hücrelerini Birleştirme/Bölme, Hizalama ve Tablo Stilleri",
          "Görsel ve Resim Ekleme, Boyutlandırma, Kırpma ve Metin Kaydırma Seçenekleri",
          "Şekiller, Simgeler ve 3B Modeller Ekleme ve Düzenleme",
          "SmartArt Grafikleri İle Süreç ve Hiyerarşi Şemaları Hazırlama",
          "Başlık Stilleri (Heading 1, 2, 3) Kullanımı ve Otomatik İçindekiler Tablosu Oluşturma",
          "Dipnot, Sonnot ve Kaynakça Ekleme Temelleri",
          "Yazdırma Önizleme, Sayfa Ayarları ve Belge Çıktısı Alma"
        ]
      },
      {
        "id": "mod_blg163_5",
        "number": 5,
        "name": "Elektronik Tablolama",
        "totalHours": 35,
        "lessonHours": 33,
        "examHours": 2,
        "topics": [
          "Elektronik Tablolama Programı (MS Excel) Arayüzü, Çalışma Kitabı ve Sayfa Yapısı",
          "Hücre, Satır, Sütun Kavramları, Hücre Adlandırma ve Aralık Seçimleri",
          "Veri Türleri: Metin, Sayı, Tarih, Saat, Para Birimi ve Yüzde Girişi",
          "Hücre Biçimlendirme: Yazı Tipi, Hizalama, Kenarlıklar ve Dolgu Renkleri",
          "Sayı Biçimlendirme, Ondalık Basamak Ayarları ve Özel Biçimler",
          "Metni Kaydır, Hücreleri Birleştir ve Ortala Seçenekleri",
          "Satır Yüksekliği ve Sütun Genişliği Ayarları, Otomatik Sığdırma",
          "Temel Otomatik Doldurma (AutoFill) ve Özel Seri Listeleri Kullanımı",
          "Formül Mantığı, Operatörler (+, -, *, /, ^) ve İşlem Önceliği Kuralları",
          "Temel Fonksiyonlar: TOPLA (SUM), ORTALAMA (AVERAGE), MAK (MAX), MİN (MIN)",
          "SAY (COUNT), BAĞ_DEĞ_DOLU_SAY (COUNTA) Fonksiyonları",
          "Göreli (Bağıl) ve Mutlak ($) Hücre Başvuruları, Sabitleme Mantığı",
          "Mantıksal Fonksiyonlar: EĞER (IF) Fonksiyonu ve Temel Karar Yapıları",
          "İç İçe EĞER (Nested IF) Kullanımı ve Çoklu Koşullar",
          "VE (AND), VEYA (OR) Fonksiyonları İle Birleşik Koşullar",
          "EĞERSAY (COUNTIF) ve ETOPLA (SUMIF) Koşullu Fonksiyonları",
          "Metin Fonksiyonları: BİRLEŞTİR, BÜYÜKHARF, KÜÇÜKHARF, YAZIM.DÜZENİ, KIRP",
          "Parça Al (MID), Soldan (LEFT), Sağdan (RIGHT) Metin Ayrıştırma",
          "Tarih ve Saat Fonksiyonları: BUGÜN, ŞİMDİ, GÜN, AY, YIL, TARİH",
          "DÜŞEYARA (VLOOKUP) Fonksiyonu: Tablodan Veri Arama ve Eşleştirme",
          "YATAYARA (HLOOKUP) ve ÇAPRAZARA (XLOOKUP) Giriş",
          "Koşullu Biçimlendirme (Conditional Formatting): Hücre Vurgulama, Veri Çubukları",
          "Veri Sıralama (A-Z, Z-A, Özel Sıralama) ve Çok Düzeyli Sıralama",
          "Veri Filtreleme (Otomatik Filtre, Metin ve Sayı Filtreleri)",
          "Veri Doğrulama (Data Validation): Açılır Liste ve Hücre Kısıtlamaları",
          "Grafik Türleri ve Amaca Uygun Grafik Seçimi (Sütun, Çubuk, Pasta, Çizgi)",
          "Grafik Oluşturma, Veri Serilerini Düzenleme ve Eksen Ayarları",
          "Grafik Başlığı, Gösterge (Legend), Veri Etiketleri ve Stil Biçimlendirme",
          "Çalışma Sayfaları Yönetimi: Ekleme, Yeniden Adlandırma, Taşıma/Kopyalama, Sekme Rengi",
          "Sayfalar Arası Formül Kullanımı ve Veri Bağlantıları",
          "Sayfa Yapısı, Yazdırma Alanı Belirleme ve Başlıkları Yineleme",
          "Sayfayı Bir Sayfaya Sığdırma, Kenar Boşlukları ve Çıktı Alma",
          "Kapsamlı Elektronik Tablolama Finans/Rapor Projesi Uygulaması"
        ]
      },
      {
        "id": "mod_blg163_6",
        "number": 6,
        "name": "Sunu Hazırlama",
        "totalHours": 15,
        "lessonHours": 13,
        "examHours": 2,
        "topics": [
          "Sunu Programı (MS PowerPoint) Arayüzü ve Sunum Tasarım İlkeleri",
          "Yeni Sunu Oluşturma, Şablon ve Tema Seçimi, Slayt Boyutları (16:9, 4:3)",
          "Slayt Düzenleri (Layouts), Yeni Slayt Ekleme, Çoğaltma ve Sıralama",
          "Metin Kutuları Ekleme, Tipografi, Renk Uyumu ve Okunabilirlik Kuralları",
          "Resim, İllüstrasyon ve Fotoğraf Ekleme, Kırpma ve Görsel Efektler",
          "Şekiller, Simgeler ve SmartArt İle Diyagram ve Kavram Haritaları Oluşturma",
          "Tablo ve Grafik Ekleyerek Verileri Sunumda Görselleştirme",
          "Sunuma Ses ve Video Dosyaları Ekleme ve Oynatma Seçenekleri",
          "Slayt Geçiş Efektleri (Transitions): Türler, Süre ve Ses Ayarları",
          "Nesne Animasyonları (Giriş, Vurgu, Çıkış, Hareket Yolları) ve Zamanlama",
          "Fotoğraf Albümü Oluşturma ve Gösteri Dosyası (.ppsx) Olarak Kaydetme",
          "Konuşmacı Notları Ekleme, Prova Zamanlamaları ve Sunucu Görünümü Kullanımı",
          "Slayt Gösterisi Başlatma, Sunum Esnasında Kalem/Vurgulayıcı Kullanımı ve Çıktı Alma"
        ]
      }
    ],
    "syllabus": [
      {
        "hour": 1,
        "topic": "Bilgi Teknolojisinin Temel Kavramları ve Bilgisayarın Tarihsel Gelişimi",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 2,
        "topic": "Donanım ve Yazılım Kavramları, Bilgisayar Çeşitleri",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 3,
        "topic": "Kasa ve Temel Donanım Birimleri: Anakart, İşlemci (CPU), Bellek (RAM)",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 4,
        "topic": "Dahili ve Harici Depolama Birimleri (HDD, SSD, Flash Bellek)",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 5,
        "topic": "Giriş Birimleri: Klavye, Fare, Tarayıcı, Barkod Okuyucu",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 6,
        "topic": "Çıkış Birimleri: Monitör, Yazıcı, Hoparlör, Projeksiyon",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 7,
        "topic": "Portlar, Bağlantı Noktaları ve Kablolar (HDMI, VGA, USB, DVI)",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 8,
        "topic": "Bilgisayar Çevre Birimlerinin Güvenli Bağlantısı ve Kurulumu",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 9,
        "topic": "BIOS / UEFI Arayüzü ve Temel Ayarları",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 10,
        "topic": "İlk Açılış (Boot) Seçenekleri ve Başlangıç Yapılandırması",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 11,
        "topic": "İşletim Sistemi Kavramı ve İşletim Sistemi Türleri",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 12,
        "topic": "Bilgisayar Sistemine Uygun İşletim Sistemi Seçimi ve Ön Gereksinimleri",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 13,
        "topic": "Kurulum Ortamı Hazırlama (Önyüklenebilir USB Oluşturma)",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 14,
        "topic": "Sabit Disk Bölümleme (Disk Partitioning) ve Biçimlendirme (Formatting)",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 15,
        "topic": "İşletim Sistemi Kurulum Aşamaları ve Temel Ayarlar - 1",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 16,
        "topic": "İşletim Sistemi Kurulum Aşamaları ve Temel Ayarlar - 2",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 17,
        "topic": "Donanım Sürücüsü (Driver) Kavramı ve Sürücü Türleri",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 18,
        "topic": "Aygıt Yöneticisi Tanıtımı ve Donanım Durumlarının İncelenmesi",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 19,
        "topic": "Anakart, Ekran Kartı ve Ses Kartı Sürücülerinin Kurulumu",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 20,
        "topic": "Ağ (Ethernet/Wi-Fi) ve Çevre Birimi Sürücülerinin Kurulumu",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 21,
        "topic": "İşletim Sistemi Kullanıcı Arayüzü: Masaüstü, Görev Çubuğu ve Bildirim Alanı",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 22,
        "topic": "Başlat Menüsü Yapılandırması ve Kişiselleştirme Ayarları",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 23,
        "topic": "Dosya ve Klasör Hiyerarşisi, Dizin Yapısı Mantığı",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 24,
        "topic": "Dosya Gezgini Kullanımı ve Navigasyon Teknikleri",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 25,
        "topic": "Dosya ve Klasör İşlemleri: Oluşturma, Yeniden Adlandırma, Silme (Geri Dönüşüm)",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 26,
        "topic": "Dosya Kopyalama, Taşıma, Kısayol Oluşturma Pratikleri",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 27,
        "topic": "Dosya Uzantıları, Dosya Türleri ve Varsayılan Program Eşleştirmeleri",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 28,
        "topic": "Dosya Arama, Filtreleme ve Hızlı Erişim Özellikleri",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 29,
        "topic": "Dosya ve Klasör Öznitelikleri (Gizli, Salt Okunur vb.)",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 30,
        "topic": "Denetim Masası / Ayarlar Menüsü Temel Yapısı",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 31,
        "topic": "Ekran, Çözünürlük, Tema ve Kişiselleştirme Ayarları",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 32,
        "topic": "Saat, Dil, Bölge ve Klavye Seçeneklerinin Düzenlenmesi",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 33,
        "topic": "Güç Seçenekleri, Uyku Modu ve Enerji Tasarrufu Ayarları",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 34,
        "topic": "Kullanıcı Hesapları Yönetimi: Yönetici ve Standart Hesap Tanımlama",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 35,
        "topic": "Kullanıcı Şifresi Belirleme, Hesap Güvenliği ve Oturum Açma Seçenekleri",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 36,
        "topic": "Program Ekle/Kaldır İşlemleri ve Uygulama Yönetimi",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 37,
        "topic": "Yazıcı ve Tarayıcı Ekleme, Varsayılan Yazıcı Ayarları",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 38,
        "topic": "Yazdırma Kuyruğu Yönetimi ve Yazdırma Sorunlarını Giderme",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 39,
        "topic": "Arşivleme Yazılımları (WinRAR, 7-Zip): Dosya Sıkıştırma ve Açma",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 40,
        "topic": "PDF Okuyucu ve Belge Görüntüleyici Yazılımların Kurulumu ve Kullanımı",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 41,
        "topic": "Medya Oynatıcılar ve Kodek Yönetimi",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 42,
        "topic": "Görev Yöneticisi Kullanımı: İşlemler, Performans ve Başlangıç Uygulamaları",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 43,
        "topic": "Disk Temizleme ve Sürücü İyileştirme (Bölümleme/Birleştirme) Araçları",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 44,
        "topic": "Sistem Geri Yükleme Noktası Oluşturma ve Geri Yükleme İşlemleri",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 45,
        "topic": "İşletim Sistemi Güncellemeleri (Windows Update) ve Bakım Stratejileri",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 46,
        "topic": "Basit Donanım ve Yazılım Hatalarını Tanılama ve Çözme Yöntemleri",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 47,
        "topic": "Ergonomi ve İş Sağlığı Güvenliği (İSG) Standartları",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 48,
        "topic": "Bilgisayar Başında Doğru Oturuş ve Çalışma Ortamı Düzeni",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 49,
        "topic": "Kapsamlı İşletim Sistemi ve Donanım Yönetimi Uygulaması - 1",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 50,
        "topic": "Kapsamlı İşletim Sistemi ve Donanım Yönetimi Uygulaması - 2",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": false
      },
      {
        "hour": 51,
        "topic": "Bilgisayara Giriş - Modül Değerlendirme Sınavı (Uygulama)",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": true
      },
      {
        "hour": 52,
        "topic": "Bilgisayara Giriş - Modül Değerlendirme Sınavı (Teorik & Değerlendirme)",
        "moduleNumber": 1,
        "moduleName": "Bilgisayara Giriş",
        "isExam": true
      },
      {
        "hour": 53,
        "topic": "İnternet Nedir? Tarihçesi, Çalışma Mantığı ve Ağ Türleri (LAN, WAN, WWW)",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 54,
        "topic": "İnternet Bağlantı Türleri (Fiber, ADSL, Mobil Veri, Wi-Fi)",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 55,
        "topic": "IP Adresi, DNS, Modulasyon ve Modem/Router Temel Kavramları",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 56,
        "topic": "Web Tarayıcı Programları (Chrome, Edge, Firefox) ve Kurulumları",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 57,
        "topic": "Tarayıcı Arayüzü: Adres Çubuğu, Sekmeler, Geçmiş ve İndirilenler",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 58,
        "topic": "Yer İmleri (Sık Kullanılanlar) Ekleme, Düzenleme ve Klasörleme",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 59,
        "topic": "Arama Motorları, Mantıksal Arama Operatörleri ve İleri Düzey Arama Teknikleri",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 60,
        "topic": "Güvenli İnternet Protokolleri (HTTP / HTTPS) ve SSL Sertifikası Doğrulama",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 61,
        "topic": "Tarayıcı Gizlilik Ayarları, Çerezler (Cookies) ve Önbellek Temizleme",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 62,
        "topic": "E-Posta (E-Mail) Kavramı, Çalışma Yapısı ve E-Posta Protokolleri (POP3, IMAP, SMTP)",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 63,
        "topic": "Web Tabanlı E-Posta Hesabı Açma ve Güvenlik Ayarları",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 64,
        "topic": "E-Posta Arayüzü: Gelen Kutusu, Gönderilenler, Taslaklar, Çöp Kutusu",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 65,
        "topic": "Yeni E-Posta Hazırlama: Kime (To), Bilgi (CC), Gizli (BCC) Alanları Kullanımı",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 66,
        "topic": "E-Posta Metin Biçimlendirme, Dosya ve Belge Ekleme (Attachment) Kuralları",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 67,
        "topic": "E-Postaları Yanıtlama (Reply/Reply All) ve İletme (Forward) Kuralları",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 68,
        "topic": "E-Posta Yönetim Yazılımları (MS Outlook) Kurulumu ve Hesap Yapılandırması",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 69,
        "topic": "E-Posta Filtreleme, Klasörleme, Kurallar Oluşturma ve İstenmeyen (Spam) Yönetimi",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 70,
        "topic": "E-Posta İmzası Oluşturma ve Otomatik Yanıt (Tatil Bildirimi) Ayarlama",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 71,
        "topic": "Kişiler (Rehber) ve Adres Defteri Yönetimi, Dağıtım Listesi Oluşturma",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 72,
        "topic": "Takvim, Randevu, Görev ve Hatırlatıcı Yönetimi Pratikleri",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": false
      },
      {
        "hour": 73,
        "topic": "İnternet ve E-Posta Yönetimi - Modül Değerlendirme Sınavı (Uygulama)",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": true
      },
      {
        "hour": 74,
        "topic": "İnternet ve E-Posta Yönetimi - Modül Değerlendirme Sınavı (Teorik & Değerlendirme)",
        "moduleNumber": 2,
        "moduleName": "İnternet ve E-Posta Yönetimi",
        "isExam": true
      },
      {
        "hour": 75,
        "topic": "Bilgi Güvenliği Kavramı, Temel Prensipler (Gizlilik, Bütünlük, Erişilebilirlik)",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": false
      },
      {
        "hour": 76,
        "topic": "Siber Tehditler ve Saldırı Türleri: Virüs, Truva Atı (Trojan), Solucan (Worm)",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": false
      },
      {
        "hour": 77,
        "topic": "Casus Yazılımlar (Spyware), Fidye Yazılımları (Ransomware) ve Reklam Yazılımları (Adware)",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": false
      },
      {
        "hour": 78,
        "topic": "Oltalama (Phishing), Sosyal Mühendislik ve Sahte Web Sitelerini Tanıma Yöntemleri",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": false
      },
      {
        "hour": 79,
        "topic": "Güçlü Şifre Oluşturma Standartları ve Şifre Güvenliği Yönetimi",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": false
      },
      {
        "hour": 80,
        "topic": "İki Adımlı Doğrulama (2FA) ve Çok Faktörlü Kimlik Doğrulama (MFA)",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": false
      },
      {
        "hour": 81,
        "topic": "Antivirüs ve Güvenlik Yazılımları: Kurulum, Güncelleme ve Sistem Taraması",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": false
      },
      {
        "hour": 82,
        "topic": "Güvenlik Duvarı (Firewall) Mantığı, Yapılandırması ve Port Güvenliği",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": false
      },
      {
        "hour": 83,
        "topic": "Güvenli İnternet Kullanımı ve Halka Açık (Ortak) Wi-Fi Ağlarındaki Tehlikeler",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": false
      },
      {
        "hour": 84,
        "topic": "Veri Yedekleme Stratejileri (Yerel ve Bulut Yedekleme) ve Veri Kurtarma İlkeleri",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": false
      },
      {
        "hour": 85,
        "topic": "Mobil Cihaz Güvenliği: Uygulama İzinleri, Ekran Kilitleri ve Biyometrik Koruma",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": false
      },
      {
        "hour": 86,
        "topic": "Mobil Cihazlarda Zararlı Yazılımlar ve Uzaktan Cihaz Kilitleme/Silme",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": false
      },
      {
        "hour": 87,
        "topic": "Kişisel Verilerin Korunması Kanunu (KVKK) ve Temel Haklar",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": false
      },
      {
        "hour": 88,
        "topic": "Dijital Ayak İzi, Çevrimiçi Mahremiyet ve Sosyal Medyada Gizlilik Ayarları",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": false
      },
      {
        "hour": 89,
        "topic": "Siber Suçlar, Bilişim Hukuku ve Yasal Sorumluluklar",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": false
      },
      {
        "hour": 90,
        "topic": "Bilgi Güvenliği Bilinçlendirme Eğitimi - Modül Değerlendirme Sınavı (Uygulama)",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": true
      },
      {
        "hour": 91,
        "topic": "Bilgi Güvenliği Bilinçlendirme Eğitimi - Modül Değerlendirme Sınavı (Teorik & Değerlendirme)",
        "moduleNumber": 3,
        "moduleName": "Bilgi Güvenliği Bilinçlendirme Eğitimi",
        "isExam": true
      },
      {
        "hour": 92,
        "topic": "Kelime İşlemci Programı (MS Word) Arayüzü, Şerit (Ribbon) ve Görünümler",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 93,
        "topic": "Yeni Belge Oluşturma, Şablon Seçimi, Belge Kaydetme (DOCX, PDF) ve Farklı Kaydet",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 94,
        "topic": "Metin Girişi, Seçim Yöntemleri, Kes-Kopyala-Yapıştır ve Biçim Boyacısı",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 95,
        "topic": "Yazı Tipi Biçimlendirme: Font, Boyut, Renk, Vurgu, Kalın, İtalik, Altı Çizili",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 96,
        "topic": "Paragraf Biçimlendirme: Hizalama, Girintiler, Satır ve Paragraf Aralıkları",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 97,
        "topic": "Madde İmleri ve Numaralandırma, Çok Düzeyli Listeler Oluşturma",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 98,
        "topic": "Kenarlıklar, Gölgelendirme ve Metin Kutusu Kullanımı",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 99,
        "topic": "Belge Yazım ve Dilbilgisi Denetimi, Eşanlamlılar Sözlüğü ve Sözcük Sayımı",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 100,
        "topic": "Bul ve Değiştir (Find and Replace) Özelliği İle Metin İyileştirme",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 101,
        "topic": "Sayfa Yapısı: Kenar Boşlukları, Yönlendirme (Dikey/Yatay), Boyut ve Sütunlar",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 102,
        "topic": "Sayfa Sonu, Bölüm Sonu (Section Break) ve Farklı Sayfa Düzenleri",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 103,
        "topic": "Üstbilgi, Altbilgi ve Sayfa Numarası Ekleme ve Farklılaştırma",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 104,
        "topic": "Belgeye Tablo Ekleme, Satır/Sütun Ekleme, Silme ve Boyutlandırma",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 105,
        "topic": "Tablo Hücrelerini Birleştirme/Bölme, Hizalama ve Tablo Stilleri",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 106,
        "topic": "Görsel ve Resim Ekleme, Boyutlandırma, Kırpma ve Metin Kaydırma Seçenekleri",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 107,
        "topic": "Şekiller, Simgeler ve 3B Modeller Ekleme ve Düzenleme",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 108,
        "topic": "SmartArt Grafikleri İle Süreç ve Hiyerarşi Şemaları Hazırlama",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 109,
        "topic": "Başlık Stilleri (Heading 1, 2, 3) Kullanımı ve Otomatik İçindekiler Tablosu Oluşturma",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 110,
        "topic": "Dipnot, Sonnot ve Kaynakça Ekleme Temelleri",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 111,
        "topic": "Yazdırma Önizleme, Sayfa Ayarları ve Belge Çıktısı Alma",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 112,
        "topic": "Kelime İşlemci - Modül Değerlendirme Sınavı (Uygulama)",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": true
      },
      {
        "hour": 113,
        "topic": "Kelime İşlemci - Modül Değerlendirme Sınavı (Teorik & Değerlendirme)",
        "moduleNumber": 4,
        "moduleName": "Kelime İşlemci",
        "isExam": true
      },
      {
        "hour": 114,
        "topic": "Elektronik Tablolama Programı (MS Excel) Arayüzü, Çalışma Kitabı ve Sayfa Yapısı",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 115,
        "topic": "Hücre, Satır, Sütun Kavramları, Hücre Adlandırma ve Aralık Seçimleri",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 116,
        "topic": "Veri Türleri: Metin, Sayı, Tarih, Saat, Para Birimi ve Yüzde Girişi",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 117,
        "topic": "Hücre Biçimlendirme: Yazı Tipi, Hizalama, Kenarlıklar ve Dolgu Renkleri",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 118,
        "topic": "Sayı Biçimlendirme, Ondalık Basamak Ayarları ve Özel Biçimler",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 119,
        "topic": "Metni Kaydır, Hücreleri Birleştir ve Ortala Seçenekleri",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 120,
        "topic": "Satır Yüksekliği ve Sütun Genişliği Ayarları, Otomatik Sığdırma",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 121,
        "topic": "Temel Otomatik Doldurma (AutoFill) ve Özel Seri Listeleri Kullanımı",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 122,
        "topic": "Formül Mantığı, Operatörler (+, -, *, /, ^) ve İşlem Önceliği Kuralları",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 123,
        "topic": "Temel Fonksiyonlar: TOPLA (SUM), ORTALAMA (AVERAGE), MAK (MAX), MİN (MIN)",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 124,
        "topic": "SAY (COUNT), BAĞ_DEĞ_DOLU_SAY (COUNTA) Fonksiyonları",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 125,
        "topic": "Göreli (Bağıl) ve Mutlak ($) Hücre Başvuruları, Sabitleme Mantığı",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 126,
        "topic": "Mantıksal Fonksiyonlar: EĞER (IF) Fonksiyonu ve Temel Karar Yapıları",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 127,
        "topic": "İç İçe EĞER (Nested IF) Kullanımı ve Çoklu Koşullar",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 128,
        "topic": "VE (AND), VEYA (OR) Fonksiyonları İle Birleşik Koşullar",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 129,
        "topic": "EĞERSAY (COUNTIF) ve ETOPLA (SUMIF) Koşullu Fonksiyonları",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 130,
        "topic": "Metin Fonksiyonları: BİRLEŞTİR, BÜYÜKHARF, KÜÇÜKHARF, YAZIM.DÜZENİ, KIRP",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 131,
        "topic": "Parça Al (MID), Soldan (LEFT), Sağdan (RIGHT) Metin Ayrıştırma",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 132,
        "topic": "Tarih ve Saat Fonksiyonları: BUGÜN, ŞİMDİ, GÜN, AY, YIL, TARİH",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 133,
        "topic": "DÜŞEYARA (VLOOKUP) Fonksiyonu: Tablodan Veri Arama ve Eşleştirme",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 134,
        "topic": "YATAYARA (HLOOKUP) ve ÇAPRAZARA (XLOOKUP) Giriş",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 135,
        "topic": "Koşullu Biçimlendirme (Conditional Formatting): Hücre Vurgulama, Veri Çubukları",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 136,
        "topic": "Veri Sıralama (A-Z, Z-A, Özel Sıralama) ve Çok Düzeyli Sıralama",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 137,
        "topic": "Veri Filtreleme (Otomatik Filtre, Metin ve Sayı Filtreleri)",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 138,
        "topic": "Veri Doğrulama (Data Validation): Açılır Liste ve Hücre Kısıtlamaları",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 139,
        "topic": "Grafik Türleri ve Amaca Uygun Grafik Seçimi (Sütun, Çubuk, Pasta, Çizgi)",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 140,
        "topic": "Grafik Oluşturma, Veri Serilerini Düzenleme ve Eksen Ayarları",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 141,
        "topic": "Grafik Başlığı, Gösterge (Legend), Veri Etiketleri ve Stil Biçimlendirme",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 142,
        "topic": "Çalışma Sayfaları Yönetimi: Ekleme, Yeniden Adlandırma, Taşıma/Kopyalama, Sekme Rengi",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 143,
        "topic": "Sayfalar Arası Formül Kullanımı ve Veri Bağlantıları",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 144,
        "topic": "Sayfa Yapısı, Yazdırma Alanı Belirleme ve Başlıkları Yineleme",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 145,
        "topic": "Sayfayı Bir Sayfaya Sığdırma, Kenar Boşlukları ve Çıktı Alma",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 146,
        "topic": "Kapsamlı Elektronik Tablolama Finans/Rapor Projesi Uygulaması",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 147,
        "topic": "Elektronik Tablolama - Modül Değerlendirme Sınavı (Uygulama)",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": true
      },
      {
        "hour": 148,
        "topic": "Elektronik Tablolama - Modül Değerlendirme Sınavı (Teorik & Değerlendirme)",
        "moduleNumber": 5,
        "moduleName": "Elektronik Tablolama",
        "isExam": true
      },
      {
        "hour": 149,
        "topic": "Sunu Programı (MS PowerPoint) Arayüzü ve Sunum Tasarım İlkeleri",
        "moduleNumber": 6,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 150,
        "topic": "Yeni Sunu Oluşturma, Şablon ve Tema Seçimi, Slayt Boyutları (16:9, 4:3)",
        "moduleNumber": 6,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 151,
        "topic": "Slayt Düzenleri (Layouts), Yeni Slayt Ekleme, Çoğaltma ve Sıralama",
        "moduleNumber": 6,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 152,
        "topic": "Metin Kutuları Ekleme, Tipografi, Renk Uyumu ve Okunabilirlik Kuralları",
        "moduleNumber": 6,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 153,
        "topic": "Resim, İllüstrasyon ve Fotoğraf Ekleme, Kırpma ve Görsel Efektler",
        "moduleNumber": 6,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 154,
        "topic": "Şekiller, Simgeler ve SmartArt İle Diyagram ve Kavram Haritaları Oluşturma",
        "moduleNumber": 6,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 155,
        "topic": "Tablo ve Grafik Ekleyerek Verileri Sunumda Görselleştirme",
        "moduleNumber": 6,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 156,
        "topic": "Sunuma Ses ve Video Dosyaları Ekleme ve Oynatma Seçenekleri",
        "moduleNumber": 6,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 157,
        "topic": "Slayt Geçiş Efektleri (Transitions): Türler, Süre ve Ses Ayarları",
        "moduleNumber": 6,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 158,
        "topic": "Nesne Animasyonları (Giriş, Vurgu, Çıkış, Hareket Yolları) ve Zamanlama",
        "moduleNumber": 6,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 159,
        "topic": "Fotoğraf Albümü Oluşturma ve Gösteri Dosyası (.ppsx) Olarak Kaydetme",
        "moduleNumber": 6,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 160,
        "topic": "Konuşmacı Notları Ekleme, Prova Zamanlamaları ve Sunucu Görünümü Kullanımı",
        "moduleNumber": 6,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 161,
        "topic": "Slayt Gösterisi Başlatma, Sunum Esnasında Kalem/Vurgulayıcı Kullanımı ve Çıktı Alma",
        "moduleNumber": 6,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 162,
        "topic": "Sunu Hazırlama - Modül Değerlendirme Sınavı (Uygulama)",
        "moduleNumber": 6,
        "moduleName": "Sunu Hazırlama",
        "isExam": true
      },
      {
        "hour": 163,
        "topic": "Sunu Hazırlama - Modül Değerlendirme Sınavı (Teorik & Değerlendirme)",
        "moduleNumber": 6,
        "moduleName": "Sunu Hazırlama",
        "isExam": true
      }
    ]
  },
  {
    "id": "tmpl_canva_baslangic_duzey",
    "name": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
    "code": "BT-CANVA-54",
    "category": "Bilişim Teknolojileri",
    "area": "Bilişim Teknolojileri",
    "totalHours": 54,
    "moduleCount": 1,
    "description": "T.C. Millî Eğitim Bakanlığı Hayat Boyu Öğrenme Genel Müdürlüğü Bilişim Teknolojileri Alanı - Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi) Kurs Programı. Tek modül olarak 54 ders saatinde uygulanır.",
    "modules": [
      {
        "id": "mod_canva_basl_1",
        "number": 1,
        "name": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "totalHours": 54,
        "lessonHours": 52,
        "examHours": 2,
        "topics": [
          "Canva Programının Tanıtımı, Temel Özellikleri ve Dijital Tasarıma Giriş",
          "Hesap Oluşturma, Üyelik Tipleri ve Sisteme Giriş Yapma",
          "Canva Arayüz Tanıtımı: Ana Menü, Şablonlar, Arama Çubuğu ve Tasarım Alanı",
          "Çalışma Alanını Özelleştirme, Tuval Boyutları ve Sayfa Yönetimi",
          "Şablon Kütüphanesi Keşfi, Kategori Seçimi ve Tasarıma Başlama",
          "Temel Araç Çubukları ve Sayfa Düzeni Pratikleri",
          "Özgün İçerik Kavramı ve Dijital Dünyada Önemi",
          "Telif Hakları, Fikri Mülkiyet ve Lisans Türleri",
          "Canva Kütüphanesinde Telif Haklarına Uygun Görsel ve Öğe Kullanımı",
          "Sosyal Medyada İçerik Paylaşım İlkeleri ve Hukuki Sorumluluklar",
          "Creative Commons ve Açık Lisanslı Materyallerle Çalışma",
          "Özgün Dijital İçerik Üretimi İçin Planlama ve Konsept Belirleme",
          "Özgün Görsel Tasarım Pratikleri ve Telif Kontrolü",
          "Renk Teorisi, Uyumlu Renk Paleti Oluşturma ve Renk Kodları (HEX)",
          "Tipografi Temelleri: Yazı Tipi Seçimi, Boyutlandırma ve Metin Hiyerarşisi",
          "Tasarımda Hizalama, Kılavuz Çizgileri ve Cetvel Kullanımı",
          "Resim, İkon, Vektörel Çizim ve Geometrik Şekil Kullanımı",
          "Katman Mantığı (Layers), Öne/Arkaya Getirme ve Saydamlık (Opaklık)",
          "Gruplama, Kilitleme ve Çoklu Nesne Konumlandırma Seçenekleri",
          "Etkili Sunum Oluşturma, Slayt Düzenleri ve Sayfa Geçişleri",
          "Sunumlarda Sayfa ve Öğe Animasyonları Ekleme",
          "Bilgilendirici İnfografik Tasarımı ve Veri Görselleştirme Temelleri",
          "Etkinlik Afişi ve Tanıtım Posteri Tasarımı",
          "Katlamalı Broşür, El İlanı ve Menü Tasarımı",
          "Temel Logo, Kartvizit ve Öz Geçmiş (CV) Tasarımı",
          "Sınıf Panosu, Eğitim Materyali ve Yapılacaklar Listesi (To-Do) Hazırlama",
          "Canva Video Editörü İle Kısa Video ve Hareketli GIF Üretimi",
          "Sosyal Medya Platformlarının Güncel Görsel Boyutları ve Standartları",
          "Instagram, Facebook ve LinkedIn İçin Gönderi (Post) Şablonları Tasarımı",
          "Çok Sayfalı Carousel (Kaydırmalı) Gönderi Tasarımı Teknikleri",
          "Reels ve TikTok İçin Dikkat Çekici Video Kapağı Tasarımı",
          "Hikaye (Story) Dizisi ve Etkileşimli Sosyal Medya İçerikleri",
          "Sosyal Medyada Marka Kimliği: Kurumsal Renk, Font ve Logo Yerleşimi",
          "Canva İçerik Planlayıcı (Content Planner) Aracı ve Yayın Takvimi Hazırlama",
          "Sosyal Medya Kampanyası İçin Bütüncül Görsel Seti Tasarımı",
          "Harici Görsel ve Video Kaynaklarını Canva'ya Aktarma (Uploads)",
          "Telifsiz Yüksek Çözünürlüklü Resim Siteleri (Pexels, Pixabay, Unsplash)",
          "Kaliteli Vektör ve İkon Siteleri (Flaticon, Freepik vb.) Entegrasyonu",
          "Canva'da LottieFiles Eklentisi İle Hareketli Animasyonlar Kullanma",
          "Harici Ses, Müzik ve Ses Efekti Kaynaklarını Projeye Dahil Etme",
          "Çevrimiçi Renk Paleti ve Tipografi Araçlarından Yararlanma",
          "Çeşitli Dosya Türlerini (SVG, AI, PDF) Canva'ya İçe Aktarma",
          "Harici Kaynaklarla Zenginleştirilmiş Karma Tasarım Projesi",
          "Canva'da Takım Oluşturma ve Ortak Çalışma Alanı Kurma",
          "Tasarım Üzerinde Eşzamanlı (Gerçek Zamanlı) Birlikte Çalışma",
          "Yorum Ekleme, Geri Bildirim Verme ve Düzenleme Takibi",
          "Tasarım Paylaşım Linkleri Oluşturma: Görüntüleme ve Düzenleme Yetkileri",
          "Tasarımlara Web Bağlantısı (Link) Ekleme ve Dinamik QR Kod Üretme",
          "Baskı Standartlarında Yüksek Kalitede PDF Dışa Aktarma",
          "Web ve Sosyal Medya İçin PNG ve JPEG Formatında İndirme Seçenekleri",
          "Hareketli Tasarımları MP4 Video ve GIF Olarak Dışa Aktarma",
          "Kurs Sonu Bireysel Tasarım Portfolyosu Hazırlama ve Proje Sunumu"
        ]
      }
    ],
    "syllabus": [
      {
        "hour": 1,
        "topic": "Canva Programının Tanıtımı, Temel Özellikleri ve Dijital Tasarıma Giriş",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 2,
        "topic": "Hesap Oluşturma, Üyelik Tipleri ve Sisteme Giriş Yapma",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 3,
        "topic": "Canva Arayüz Tanıtımı: Ana Menü, Şablonlar, Arama Çubuğu ve Tasarım Alanı",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 4,
        "topic": "Çalışma Alanını Özelleştirme, Tuval Boyutları ve Sayfa Yönetimi",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 5,
        "topic": "Şablon Kütüphanesi Keşfi, Kategori Seçimi ve Tasarıma Başlama",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 6,
        "topic": "Temel Araç Çubukları ve Sayfa Düzeni Pratikleri",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 7,
        "topic": "Özgün İçerik Kavramı ve Dijital Dünyada Önemi",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 8,
        "topic": "Telif Hakları, Fikri Mülkiyet ve Lisans Türleri",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 9,
        "topic": "Canva Kütüphanesinde Telif Haklarına Uygun Görsel ve Öğe Kullanımı",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 10,
        "topic": "Sosyal Medyada İçerik Paylaşım İlkeleri ve Hukuki Sorumluluklar",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 11,
        "topic": "Creative Commons ve Açık Lisanslı Materyallerle Çalışma",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 12,
        "topic": "Özgün Dijital İçerik Üretimi İçin Planlama ve Konsept Belirleme",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 13,
        "topic": "Özgün Görsel Tasarım Pratikleri ve Telif Kontrolü",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 14,
        "topic": "Renk Teorisi, Uyumlu Renk Paleti Oluşturma ve Renk Kodları (HEX)",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 15,
        "topic": "Tipografi Temelleri: Yazı Tipi Seçimi, Boyutlandırma ve Metin Hiyerarşisi",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 16,
        "topic": "Tasarımda Hizalama, Kılavuz Çizgileri ve Cetvel Kullanımı",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 17,
        "topic": "Resim, İkon, Vektörel Çizim ve Geometrik Şekil Kullanımı",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 18,
        "topic": "Katman Mantığı (Layers), Öne/Arkaya Getirme ve Saydamlık (Opaklık)",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 19,
        "topic": "Gruplama, Kilitleme ve Çoklu Nesne Konumlandırma Seçenekleri",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 20,
        "topic": "Etkili Sunum Oluşturma, Slayt Düzenleri ve Sayfa Geçişleri",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 21,
        "topic": "Sunumlarda Sayfa ve Öğe Animasyonları Ekleme",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 22,
        "topic": "Bilgilendirici İnfografik Tasarımı ve Veri Görselleştirme Temelleri",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 23,
        "topic": "Etkinlik Afişi ve Tanıtım Posteri Tasarımı",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 24,
        "topic": "Katlamalı Broşür, El İlanı ve Menü Tasarımı",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 25,
        "topic": "Temel Logo, Kartvizit ve Öz Geçmiş (CV) Tasarımı",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 26,
        "topic": "Sınıf Panosu, Eğitim Materyali ve Yapılacaklar Listesi (To-Do) Hazırlama",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 27,
        "topic": "Canva Video Editörü İle Kısa Video ve Hareketli GIF Üretimi",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 28,
        "topic": "Sosyal Medya Platformlarının Güncel Görsel Boyutları ve Standartları",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 29,
        "topic": "Instagram, Facebook ve LinkedIn İçin Gönderi (Post) Şablonları Tasarımı",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 30,
        "topic": "Çok Sayfalı Carousel (Kaydırmalı) Gönderi Tasarımı Teknikleri",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 31,
        "topic": "Reels ve TikTok İçin Dikkat Çekici Video Kapağı Tasarımı",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 32,
        "topic": "Hikaye (Story) Dizisi ve Etkileşimli Sosyal Medya İçerikleri",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 33,
        "topic": "Sosyal Medyada Marka Kimliği: Kurumsal Renk, Font ve Logo Yerleşimi",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 34,
        "topic": "Canva İçerik Planlayıcı (Content Planner) Aracı ve Yayın Takvimi Hazırlama",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 35,
        "topic": "Sosyal Medya Kampanyası İçin Bütüncül Görsel Seti Tasarımı",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 36,
        "topic": "Harici Görsel ve Video Kaynaklarını Canva'ya Aktarma (Uploads)",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 37,
        "topic": "Telifsiz Yüksek Çözünürlüklü Resim Siteleri (Pexels, Pixabay, Unsplash)",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 38,
        "topic": "Kaliteli Vektör ve İkon Siteleri (Flaticon, Freepik vb.) Entegrasyonu",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 39,
        "topic": "Canva'da LottieFiles Eklentisi İle Hareketli Animasyonlar Kullanma",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 40,
        "topic": "Harici Ses, Müzik ve Ses Efekti Kaynaklarını Projeye Dahil Etme",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 41,
        "topic": "Çevrimiçi Renk Paleti ve Tipografi Araçlarından Yararlanma",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 42,
        "topic": "Çeşitli Dosya Türlerini (SVG, AI, PDF) Canva'ya İçe Aktarma",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 43,
        "topic": "Harici Kaynaklarla Zenginleştirilmiş Karma Tasarım Projesi",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 44,
        "topic": "Canva'da Takım Oluşturma ve Ortak Çalışma Alanı Kurma",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 45,
        "topic": "Tasarım Üzerinde Eşzamanlı (Gerçek Zamanlı) Birlikte Çalışma",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 46,
        "topic": "Yorum Ekleme, Geri Bildirim Verme ve Düzenleme Takibi",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 47,
        "topic": "Tasarım Paylaşım Linkleri Oluşturma: Görüntüleme ve Düzenleme Yetkileri",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 48,
        "topic": "Tasarımlara Web Bağlantısı (Link) Ekleme ve Dinamik QR Kod Üretme",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 49,
        "topic": "Baskı Standartlarında Yüksek Kalitede PDF Dışa Aktarma",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 50,
        "topic": "Web ve Sosyal Medya İçin PNG ve JPEG Formatında İndirme Seçenekleri",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 51,
        "topic": "Hareketli Tasarımları MP4 Video ve GIF Olarak Dışa Aktarma",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 52,
        "topic": "Kurs Sonu Bireysel Tasarım Portfolyosu Hazırlama ve Proje Sunumu",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": false
      },
      {
        "hour": 53,
        "topic": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi) - Modül Değerlendirme Sınavı (Uygulama)",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": true
      },
      {
        "hour": 54,
        "topic": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi) - Modül Değerlendirme Sınavı (Teorik & Değerlendirme)",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (Başlangıç Düzeyi)",
        "isExam": true
      }
    ]
  },
  {
    "id": "tmpl_canva_ileri_duzey",
    "name": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
    "code": "BT-CANVA-60",
    "category": "Bilişim Teknolojileri",
    "area": "Bilişim Teknolojileri",
    "totalHours": 60,
    "moduleCount": 1,
    "description": "T.C. Millî Eğitim Bakanlığı Hayat Boyu Öğrenme Genel Müdürlüğü Bilişim Teknolojileri Alanı - Canva İle Dijital Tasarım Eğitimi (İleri Düzey) Kurs Programı. Tek modül olarak 60 ders saatinde uygulanır.",
    "modules": [
      {
        "id": "mod_canva_1",
        "number": 1,
        "name": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "totalHours": 60,
        "lessonHours": 58,
        "examHours": 2,
        "topics": [
          "Magic Write (Sihirli Yazı) İle Metin Yazma ve Prompt Tasarım İlkeleri",
          "Metinden Görsel Oluşturma (AI Görsel Üretim Modelleri)",
          "AI İle Otomatik Şablon ve Sayfa Düzeni Oluşturma",
          "İstenmeyen Objeleri ve Arka Plan Unsurlarını Kaldırma (Magic Eraser)",
          "Obje Değiştirme ve Yeniden Üretim Teknikleri (Magic Replace)",
          "Fotoğraflardan Yazı ve Karakter Ayıklama (OCR Teknolojisi)",
          "Fotoğraflarda Nesne Algılama ve Akıllı Seçim Araçları",
          "Yapay Zekâ Destekli Akıllı Animasyon ve Geçiş Efektleri",
          "Sunumlarda AI İle Dinamik Hareket Efektleri Kullanımı",
          "Canva’da AI İle Video Senaryosu ve Hikaye Panosu (Storyboard) Yazma",
          "Yapay Zekâ Destekli Metinden Video ve Sahne Oluşturma",
          "AI Araçlarıyla Çoklu Görsel Üretimi ve Kompozisyon Tasarımı",
          "Yapay Zekâ Tabanlı Ses ve Altyazı Ekleme Uygulamaları",
          "Yapay Zekâ Destekli Tasarım ve Görsel Proje Atölyesi - 1",
          "Yapay Zekâ Destekli Tasarım ve Görsel Proje Atölyesi - 2",
          "Görsel Yerleştirme ve Profesyonel Sunum Örnekleri (Mockups)",
          "Kurumsal Marka Kiti Oluşturma (Özel Yazı Tipi, Renk Paleti ve Logo Ekleme)",
          "Marka Kiti Kurallarının Tasarım Şablonlarına Otomatik Entegrasyonu",
          "Canva İle Etkileşimli, Canlı ve Etkili Sunum Teknikleri",
          "Canva İçerik Planlayıcı (Content Planner) Aracı İle Sosyal Medya Takvimi Hazırlama",
          "Tasarım İçeriğini Dil Bazlı Dönüştürme ve Çok Dilli Çeviri Aracı Kullanımı",
          "Konuya ve Hedef Kitleye Göre Dinamik Metin Üretimi (Magic Write)",
          "Görseldeki Unsurları Seçici Olarak Değiştirme (Magic Edit İleri Teknikleri)",
          "Gelişmiş Obje Silme ve Görsel Restorasyon Uygulamaları",
          "Fotoğraflarda Hassas Çoklu Nesne Seçme ve Katmanlama",
          "Yapay Zekâ Destekli Otomatik Sunum Tasarımı (Magic Presentation)",
          "Sosyal Medya ve Dijital İçerik Kiti Hazırlama Pratiği",
          "Çoklu Sayfa Tasarımı ve Veri Bağlama (Toplu İçerik Üretimi - Bulk Create)",
          "İleri Seviye Canva Araçlarıyla Kapsamlı Tasarım Çalışması - 1",
          "İleri Seviye Canva Araçlarıyla Kapsamlı Tasarım Çalışması - 2",
          "Video Efekti Uygulamaları ve Paint Smoke Efektine Giriş",
          "Video Tasarımlarında Özel Boya, Duman ve Parçacık Efektleri Geliştirme",
          "Video Sahne Geçişleri ve Zaman Çizelgesi (Timeline) Hassas Düzenlemesi",
          "Çok Katmanlı Video Kurgusu ve Çok Kanallı Ses Efekti Senkronizasyonu",
          "Katmanlı Sunum Tasarımı Mantığı ve 3D Derinlik Efektleri",
          "İleri Düzey Katman Sıralaması, Saydamlık ve Karıştırma Modları",
          "Metin İçine Katmanlı Görsel Maskeleme Teknikleri (Text Masking)",
          "Tipografi Odaklı Katmanlı Görsel Kompozisyonları",
          "Çift Pozlama (Double Exposure) ve Tipografik Görsel Tasarımları",
          "Görselleri Vektörel Tasarıma Hazırlama Süreçleri ve Standartları",
          "Görselleri Vektör Logo Tasarımına Dönüştürme (SVG Formatı İle Çalışma)",
          "Şeffaf Arka Planlı Kurumsal Vektör Logo Üretimi ve İkon Seti Tasarımı",
          "Dijital Reklam ve Sosyal Medya İçin Hareketli Afiş (Motion Poster) Tasarımı",
          "Dinamik İnfografik, Grafik ve İnteraktif Veri Görselleştirme Tasarımları",
          "Web, Mobil ve Baskı İçin Duyarlı (Responsive) Boyutlandırma (Magic Switch)",
          "İleri Seviye Dijital İllüstrasyon ve Grafik Sanat Uygulamaları",
          "İleri Seviye Tasarım ve Video Proje Uygulaması - 1",
          "İleri Seviye Tasarım ve Video Proje Uygulaması - 2",
          "İleri Seviye Tasarım ve Video Proje Uygulaması - 3",
          "Canva'da Takım ve Çalışma Alanı Oluşturma, Rol ve Üye Yönetimi",
          "Kurumsal Marka Kitini Takımla Paylaşma ve Ortak Şablon Kütüphanesi Oluşturma",
          "Tasarımları Bağlantı İle Paylaşma, Görüntüleme ve Düzenleme Yetkileri Belirleme",
          "Gerçek Zamanlı Ortak Çalışma, Eşzamanlı Düzenleme ve Canlı Yorumlama",
          "Sunumlara, Afişlere ve Formlara Bağlantı Ekleme ve Dinamik QR Kod Üretimi",
          "Baskı Standartlarında Profesyonel Çıktı Alma (Taşma Paylı PDF Baskı Formatı)",
          "Dijital Medya İçin Yüksek Çözünürlüklü Dışa Aktarma (PNG/JPEG ve MP4 Video)",
          "Profesyonel Vektörel Dışa Aktarma (Şeffaf SVG) ve Arşivleme Standartları",
          "Takım Ortak Projesi Sunumu, Portfolyo Düzenleme ve Kalite Değerlendirmesi"
        ]
      }
    ],
    "syllabus": [
      {
        "hour": 1,
        "topic": "Magic Write (Sihirli Yazı) İle Metin Yazma ve Prompt Tasarım İlkeleri",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 2,
        "topic": "Metinden Görsel Oluşturma (AI Görsel Üretim Modelleri)",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 3,
        "topic": "AI İle Otomatik Şablon ve Sayfa Düzeni Oluşturma",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 4,
        "topic": "İstenmeyen Objeleri ve Arka Plan Unsurlarını Kaldırma (Magic Eraser)",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 5,
        "topic": "Obje Değiştirme ve Yeniden Üretim Teknikleri (Magic Replace)",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 6,
        "topic": "Fotoğraflardan Yazı ve Karakter Ayıklama (OCR Teknolojisi)",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 7,
        "topic": "Fotoğraflarda Nesne Algılama ve Akıllı Seçim Araçları",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 8,
        "topic": "Yapay Zekâ Destekli Akıllı Animasyon ve Geçiş Efektleri",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 9,
        "topic": "Sunumlarda AI İle Dinamik Hareket Efektleri Kullanımı",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 10,
        "topic": "Canva’da AI İle Video Senaryosu ve Hikaye Panosu (Storyboard) Yazma",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 11,
        "topic": "Yapay Zekâ Destekli Metinden Video ve Sahne Oluşturma",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 12,
        "topic": "AI Araçlarıyla Çoklu Görsel Üretimi ve Kompozisyon Tasarımı",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 13,
        "topic": "Yapay Zekâ Tabanlı Ses ve Altyazı Ekleme Uygulamaları",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 14,
        "topic": "Yapay Zekâ Destekli Tasarım ve Görsel Proje Atölyesi - 1",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 15,
        "topic": "Yapay Zekâ Destekli Tasarım ve Görsel Proje Atölyesi - 2",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 16,
        "topic": "Görsel Yerleştirme ve Profesyonel Sunum Örnekleri (Mockups)",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 17,
        "topic": "Kurumsal Marka Kiti Oluşturma (Özel Yazı Tipi, Renk Paleti ve Logo Ekleme)",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 18,
        "topic": "Marka Kiti Kurallarının Tasarım Şablonlarına Otomatik Entegrasyonu",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 19,
        "topic": "Canva İle Etkileşimli, Canlı ve Etkili Sunum Teknikleri",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 20,
        "topic": "Canva İçerik Planlayıcı (Content Planner) Aracı İle Sosyal Medya Takvimi Hazırlama",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 21,
        "topic": "Tasarım İçeriğini Dil Bazlı Dönüştürme ve Çok Dilli Çeviri Aracı Kullanımı",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 22,
        "topic": "Konuya ve Hedef Kitleye Göre Dinamik Metin Üretimi (Magic Write)",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 23,
        "topic": "Görseldeki Unsurları Seçici Olarak Değiştirme (Magic Edit İleri Teknikleri)",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 24,
        "topic": "Gelişmiş Obje Silme ve Görsel Restorasyon Uygulamaları",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 25,
        "topic": "Fotoğraflarda Hassas Çoklu Nesne Seçme ve Katmanlama",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 26,
        "topic": "Yapay Zekâ Destekli Otomatik Sunum Tasarımı (Magic Presentation)",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 27,
        "topic": "Sosyal Medya ve Dijital İçerik Kiti Hazırlama Pratiği",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 28,
        "topic": "Çoklu Sayfa Tasarımı ve Veri Bağlama (Toplu İçerik Üretimi - Bulk Create)",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 29,
        "topic": "İleri Seviye Canva Araçlarıyla Kapsamlı Tasarım Çalışması - 1",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 30,
        "topic": "İleri Seviye Canva Araçlarıyla Kapsamlı Tasarım Çalışması - 2",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 31,
        "topic": "Video Efekti Uygulamaları ve Paint Smoke Efektine Giriş",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 32,
        "topic": "Video Tasarımlarında Özel Boya, Duman ve Parçacık Efektleri Geliştirme",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 33,
        "topic": "Video Sahne Geçişleri ve Zaman Çizelgesi (Timeline) Hassas Düzenlemesi",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 34,
        "topic": "Çok Katmanlı Video Kurgusu ve Çok Kanallı Ses Efekti Senkronizasyonu",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 35,
        "topic": "Katmanlı Sunum Tasarımı Mantığı ve 3D Derinlik Efektleri",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 36,
        "topic": "İleri Düzey Katman Sıralaması, Saydamlık ve Karıştırma Modları",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 37,
        "topic": "Metin İçine Katmanlı Görsel Maskeleme Teknikleri (Text Masking)",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 38,
        "topic": "Tipografi Odaklı Katmanlı Görsel Kompozisyonları",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 39,
        "topic": "Çift Pozlama (Double Exposure) ve Tipografik Görsel Tasarımları",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 40,
        "topic": "Görselleri Vektörel Tasarıma Hazırlama Süreçleri ve Standartları",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 41,
        "topic": "Görselleri Vektör Logo Tasarımına Dönüştürme (SVG Formatı İle Çalışma)",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 42,
        "topic": "Şeffaf Arka Planlı Kurumsal Vektör Logo Üretimi ve İkon Seti Tasarımı",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 43,
        "topic": "Dijital Reklam ve Sosyal Medya İçin Hareketli Afiş (Motion Poster) Tasarımı",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 44,
        "topic": "Dinamik İnfografik, Grafik ve İnteraktif Veri Görselleştirme Tasarımları",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 45,
        "topic": "Web, Mobil ve Baskı İçin Duyarlı (Responsive) Boyutlandırma (Magic Switch)",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 46,
        "topic": "İleri Seviye Dijital İllüstrasyon ve Grafik Sanat Uygulamaları",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 47,
        "topic": "İleri Seviye Tasarım ve Video Proje Uygulaması - 1",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 48,
        "topic": "İleri Seviye Tasarım ve Video Proje Uygulaması - 2",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 49,
        "topic": "İleri Seviye Tasarım ve Video Proje Uygulaması - 3",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 50,
        "topic": "Canva'da Takım ve Çalışma Alanı Oluşturma, Rol ve Üye Yönetimi",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 51,
        "topic": "Kurumsal Marka Kitini Takımla Paylaşma ve Ortak Şablon Kütüphanesi Oluşturma",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 52,
        "topic": "Tasarımları Bağlantı İle Paylaşma, Görüntüleme ve Düzenleme Yetkileri Belirleme",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 53,
        "topic": "Gerçek Zamanlı Ortak Çalışma, Eşzamanlı Düzenleme ve Canlı Yorumlama",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 54,
        "topic": "Sunumlara, Afişlere ve Formlara Bağlantı Ekleme ve Dinamik QR Kod Üretimi",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 55,
        "topic": "Baskı Standartlarında Profesyonel Çıktı Alma (Taşma Paylı PDF Baskı Formatı)",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 56,
        "topic": "Dijital Medya İçin Yüksek Çözünürlüklü Dışa Aktarma (PNG/JPEG ve MP4 Video)",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 57,
        "topic": "Profesyonel Vektörel Dışa Aktarma (Şeffaf SVG) ve Arşivleme Standartları",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 58,
        "topic": "Takım Ortak Projesi Sunumu, Portfolyo Düzenleme ve Kalite Değerlendirmesi",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": false
      },
      {
        "hour": 59,
        "topic": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey) - Modül Değerlendirme Sınavı (Uygulama)",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": true
      },
      {
        "hour": 60,
        "topic": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey) - Modül Değerlendirme Sınavı (Teorik & Değerlendirme)",
        "moduleNumber": 1,
        "moduleName": "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
        "isExam": true
      }
    ]
  },
  {
    "id": "tmpl_ileri_excel_56",
    "name": "İleri Excel Geliştirme ve Uyum Eğitimi",
    "code": "BT-EXC-56",
    "category": "Bilişim Teknolojileri",
    "area": "Bilişim Teknolojileri",
    "totalHours": 56,
    "moduleCount": 2,
    "description": "T.C. Millî Eğitim Bakanlığı Hayat Boyu Öğrenme Genel Müdürlüğü Bilişim Teknolojileri Alanı - İleri Excel Geliştirme ve Uyum Eğitimi Kurs Programı (2 Modül, 56 Ders Saati).",
    "modules": [
      {
        "id": "mod_ileri_excel_1",
        "number": 1,
        "name": "Excel İle Elektronik Tablolama",
        "totalHours": 24,
        "lessonHours": 22,
        "examHours": 2,
        "topics": [
          "İleri Düzey Veri Türleri, Özel Biçimlendirme ve Veri Giriş Standartları",
          "İleri Düzey Koşullu Biçimlendirme: Formülle Kural Tanımlama ve Dinamik Vurgular",
          "Veri Doğrulama (Data Validation): Dinamik Açılır Listeler ve Hata Uyarıları",
          "İleri Düzey Mantıksal Fonksiyonlar: VE, VEYA, ÇOKEĞER (IFS) ve HATA.AYIKLA",
          "İleri Düzey Arama ve Başvuru Fonksiyonları: DÜŞEYARA, YATAYARA ve İNDİS / KAÇINCI",
          "Yeni Nesil Arama Fonksiyonları: ÇAPRAZARA (XLOOKUP) ve ÇAPRAZEŞLEŞTİR (XMATCH)",
          "İleri Düzey Metin Fonksiyonları ve Dinamik Dizi Metin İşleme (METNEÇEVİR, BİRLEŞTİR)",
          "Tarih ve Saat Fonksiyonları İle İş Günü ve Süre Hesaplamaları (İŞGÜNÜ, TAMİŞGÜNÜ)",
          "İleri Düzey Matematik ve İstatistik Fonksiyonları: ÇOKETOPLA, ÇOKSAY, ÇOKORTALAMA",
          "Dinamik Dizi Fonksiyonları: FİLTRE (FILTER), BENZERSİZ (UNIQUE) ve SIRALA (SORT)",
          "Veri Sıralama ve Gelişmiş Filtreleme (Advanced Filter) Teknikleri",
          "Hızlı Doldurma (Flash Fill) ve Metni Sütunlara Dönüştürme Araçları",
          "Veri Birleştirme (Consolidation) ve Çoklu Tablo Entegrasyonu",
          "İleri Düzey Grafik İşlemleri: Birleşik Grafikler, İkincil Eksen ve Dinamik Göstergeler",
          "Kıvılcım Grafikler (Sparklines) ve Mini Trend Göstergeleri Oluşturma",
          "Özet Tablo (Pivot Table) Temelleri: Alan Yapılandırması ve Veri Özetleme",
          "Özet Tabloda Gruplandırma, Hesaplanan Alan (Calculated Field) ve Dilimleyiciler",
          "Özet Grafik (Pivot Chart) Tasarımı ve Dinamik Yönetici Raporları (Dashboard)",
          "Durum Çözümlemesi (What-If Analysis): Hedef Arama (Goal Seek) ve Senaryo Yöneticisi",
          "Veri Tablosu (Data Table) ve Solver (Çözücü) Eklentisi İle Optimizasyon",
          "Giriş Seviyesi Makro İşlemleri: Geliştirici Sekmesi ve Makro Kaydedici (Macro Recorder)",
          "Göreli Başvurularla Makro Kaydetme, Butona Makro Atama ve Güvenlik Ayarları"
        ]
      },
      {
        "id": "mod_ileri_excel_2",
        "number": 2,
        "name": "Excel İle VBA Programlama",
        "totalHours": 32,
        "lessonHours": 30,
        "examHours": 2,
        "topics": [
          "VBA (Visual Basic for Applications) Geliştirme Ortamı (VBE) ve Bileşenleri",
          "Proje Gezgini (Project Explorer), Özellikler Penceresi ve Kod Modülleri",
          "VBA Prosedür Türleri: Sub (Alt Yordam) ve Function (Kullanıcı Tanımlı Fonksiyon)",
          "Değişken Kavramı, Veri Tipleri (Integer, Long, Double, String, Boolean, Variant)",
          "Değişken Bildirimi (Dim), Kapsam (Scope) ve Sabit Tanımlama (Const)",
          "Option Explicit Kullanımı ve Değişken Hata Yönetimi",
          "Aritmetik, Karşılaştırma ve Mantıksal Operatörlerin Kullanımı",
          "Excel Nesne Modeli: Application, Workbook, Worksheet ve Range Nesneleri",
          "Range ve Cells Nesneleri İle Hücrelere Değer Yazma, Okuma ve Biçimlendirme",
          "Karar Kontrol Deyimleri: If...Then...Else Yapısı ve Çoklu Koşullar",
          "Select Case Karar Kontrol Yapısı ve Çoklu Durum Yönetimi",
          "Döngü Deyimlerine Giriş: For...Next Sayıcı Döngüsü",
          "For Each...Next Döngüsü İle Koleksiyonlar ve Hücre Aralıklarında Gezinme",
          "Do While...Loop ve Do Until...Loop Koşullu Döngü Yapıları",
          "Döngüler İle Veri Tarama, Koşullu Temizleme ve Veri Aktarımı",
          "Hata Yakalama ve Yönetimi: On Error GoTo, Resume Next",
          "Kullanıcı İletişim Pencereleri: MsgBox ve InputBox Fonksiyonları",
          "Kullanıcı Tanımlı Excel Fonksiyonları (UDF) Yazma ve Çalışma Sayfasında Kullanma",
          "Çalışma Kitabı ve Sayfa Olayları (Events): Workbook_Open, Worksheet_Change",
          "UserForm (Kullanıcı Formu) Oluşturma ve Form Tasarım İlkeleri",
          "Form Denetimleri: Label, TextBox, CommandButton Kullanımı ve Olayları",
          "Form Denetimleri: ComboBox ve ListBox Kullanımı, Dinamik Veri Yükleme",
          "Form Denetimleri: CheckBox, OptionButton ve Frame Kullanımı",
          "UserForm Üzerinden Çalışma Sayfasına Veri Kaydetme ve Yeni Kayıt Ekleme",
          "UserForm İle Kayıt Arama, Listeleme ve Form Üzerinde Gösterme",
          "UserForm İle Mevcut Kaydı Güncelleme ve Silme İşlemleri",
          "Form Doğrulama (Validation) ve Kullanıcı Hata Kontrolleri",
          "Raporlama ve Dış Veri İşlemleri: Excel Sayfasını PDF / CSV Olarak Dışa Aktarma",
          "Kapsamlı Excel VBA Otomasyon ve Veri Yönetim Sistemi Projesi - 1",
          "Kapsamlı Excel VBA Otomasyon ve Veri Yönetim Sistemi Projesi - 2"
        ]
      }
    ],
    "syllabus": [
      {
        "hour": 1,
        "topic": "İleri Düzey Veri Türleri, Özel Biçimlendirme ve Veri Giriş Standartları",
        "moduleNumber": 1,
        "moduleName": "Excel İle Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 2,
        "topic": "İleri Düzey Koşullu Biçimlendirme: Formülle Kural Tanımlama ve Dinamik Vurgular",
        "moduleNumber": 1,
        "moduleName": "Excel İle Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 3,
        "topic": "Veri Doğrulama (Data Validation): Dinamik Açılır Listeler ve Hata Uyarıları",
        "moduleNumber": 1,
        "moduleName": "Excel İle Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 4,
        "topic": "İleri Düzey Mantıksal Fonksiyonlar: VE, VEYA, ÇOKEĞER (IFS) ve HATA.AYIKLA",
        "moduleNumber": 1,
        "moduleName": "Excel İle Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 5,
        "topic": "İleri Düzey Arama ve Başvuru Fonksiyonları: DÜŞEYARA, YATAYARA ve İNDİS / KAÇINCI",
        "moduleNumber": 1,
        "moduleName": "Excel İle Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 6,
        "topic": "Yeni Nesil Arama Fonksiyonları: ÇAPRAZARA (XLOOKUP) ve ÇAPRAZEŞLEŞTİR (XMATCH)",
        "moduleNumber": 1,
        "moduleName": "Excel İle Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 7,
        "topic": "İleri Düzey Metin Fonksiyonları ve Dinamik Dizi Metin İşleme (METNEÇEVİR, BİRLEŞTİR)",
        "moduleNumber": 1,
        "moduleName": "Excel İle Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 8,
        "topic": "Tarih ve Saat Fonksiyonları İle İş Günü ve Süre Hesaplamaları (İŞGÜNÜ, TAMİŞGÜNÜ)",
        "moduleNumber": 1,
        "moduleName": "Excel İle Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 9,
        "topic": "İleri Düzey Matematik ve İstatistik Fonksiyonları: ÇOKETOPLA, ÇOKSAY, ÇOKORTALAMA",
        "moduleNumber": 1,
        "moduleName": "Excel İle Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 10,
        "topic": "Dinamik Dizi Fonksiyonları: FİLTRE (FILTER), BENZERSİZ (UNIQUE) ve SIRALA (SORT)",
        "moduleNumber": 1,
        "moduleName": "Excel İle Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 11,
        "topic": "Veri Sıralama ve Gelişmiş Filtreleme (Advanced Filter) Teknikleri",
        "moduleNumber": 1,
        "moduleName": "Excel İle Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 12,
        "topic": "Hızlı Doldurma (Flash Fill) ve Metni Sütunlara Dönüştürme Araçları",
        "moduleNumber": 1,
        "moduleName": "Excel İle Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 13,
        "topic": "Veri Birleştirme (Consolidation) ve Çoklu Tablo Entegrasyonu",
        "moduleNumber": 1,
        "moduleName": "Excel İle Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 14,
        "topic": "İleri Düzey Grafik İşlemleri: Birleşik Grafikler, İkincil Eksen ve Dinamik Göstergeler",
        "moduleNumber": 1,
        "moduleName": "Excel İle Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 15,
        "topic": "Kıvılcım Grafikler (Sparklines) ve Mini Trend Göstergeleri Oluşturma",
        "moduleNumber": 1,
        "moduleName": "Excel İle Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 16,
        "topic": "Özet Tablo (Pivot Table) Temelleri: Alan Yapılandırması ve Veri Özetleme",
        "moduleNumber": 1,
        "moduleName": "Excel İle Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 17,
        "topic": "Özet Tabloda Gruplandırma, Hesaplanan Alan (Calculated Field) ve Dilimleyiciler",
        "moduleNumber": 1,
        "moduleName": "Excel İle Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 18,
        "topic": "Özet Grafik (Pivot Chart) Tasarımı ve Dinamik Yönetici Raporları (Dashboard)",
        "moduleNumber": 1,
        "moduleName": "Excel İle Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 19,
        "topic": "Durum Çözümlemesi (What-If Analysis): Hedef Arama (Goal Seek) ve Senaryo Yöneticisi",
        "moduleNumber": 1,
        "moduleName": "Excel İle Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 20,
        "topic": "Veri Tablosu (Data Table) ve Solver (Çözücü) Eklentisi İle Optimizasyon",
        "moduleNumber": 1,
        "moduleName": "Excel İle Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 21,
        "topic": "Giriş Seviyesi Makro İşlemleri: Geliştirici Sekmesi ve Makro Kaydedici (Macro Recorder)",
        "moduleNumber": 1,
        "moduleName": "Excel İle Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 22,
        "topic": "Göreli Başvurularla Makro Kaydetme, Butona Makro Atama ve Güvenlik Ayarları",
        "moduleNumber": 1,
        "moduleName": "Excel İle Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 23,
        "topic": "Excel İle Elektronik Tablolama - Modül Değerlendirme Sınavı (Uygulama)",
        "moduleNumber": 1,
        "moduleName": "Excel İle Elektronik Tablolama",
        "isExam": true
      },
      {
        "hour": 24,
        "topic": "Excel İle Elektronik Tablolama - Modül Değerlendirme Sınavı (Teorik & Değerlendirme)",
        "moduleNumber": 1,
        "moduleName": "Excel İle Elektronik Tablolama",
        "isExam": true
      },
      {
        "hour": 25,
        "topic": "VBA (Visual Basic for Applications) Geliştirme Ortamı (VBE) ve Bileşenleri",
        "moduleNumber": 2,
        "moduleName": "Excel İle VBA Programlama",
        "isExam": false
      },
      {
        "hour": 26,
        "topic": "Proje Gezgini (Project Explorer), Özellikler Penceresi ve Kod Modülleri",
        "moduleNumber": 2,
        "moduleName": "Excel İle VBA Programlama",
        "isExam": false
      },
      {
        "hour": 27,
        "topic": "VBA Prosedür Türleri: Sub (Alt Yordam) ve Function (Kullanıcı Tanımlı Fonksiyon)",
        "moduleNumber": 2,
        "moduleName": "Excel İle VBA Programlama",
        "isExam": false
      },
      {
        "hour": 28,
        "topic": "Değişken Kavramı, Veri Tipleri (Integer, Long, Double, String, Boolean, Variant)",
        "moduleNumber": 2,
        "moduleName": "Excel İle VBA Programlama",
        "isExam": false
      },
      {
        "hour": 29,
        "topic": "Değişken Bildirimi (Dim), Kapsam (Scope) ve Sabit Tanımlama (Const)",
        "moduleNumber": 2,
        "moduleName": "Excel İle VBA Programlama",
        "isExam": false
      },
      {
        "hour": 30,
        "topic": "Option Explicit Kullanımı ve Değişken Hata Yönetimi",
        "moduleNumber": 2,
        "moduleName": "Excel İle VBA Programlama",
        "isExam": false
      },
      {
        "hour": 31,
        "topic": "Aritmetik, Karşılaştırma ve Mantıksal Operatörlerin Kullanımı",
        "moduleNumber": 2,
        "moduleName": "Excel İle VBA Programlama",
        "isExam": false
      },
      {
        "hour": 32,
        "topic": "Excel Nesne Modeli: Application, Workbook, Worksheet ve Range Nesneleri",
        "moduleNumber": 2,
        "moduleName": "Excel İle VBA Programlama",
        "isExam": false
      },
      {
        "hour": 33,
        "topic": "Range ve Cells Nesneleri İle Hücrelere Değer Yazma, Okuma ve Biçimlendirme",
        "moduleNumber": 2,
        "moduleName": "Excel İle VBA Programlama",
        "isExam": false
      },
      {
        "hour": 34,
        "topic": "Karar Kontrol Deyimleri: If...Then...Else Yapısı ve Çoklu Koşullar",
        "moduleNumber": 2,
        "moduleName": "Excel İle VBA Programlama",
        "isExam": false
      },
      {
        "hour": 35,
        "topic": "Select Case Karar Kontrol Yapısı ve Çoklu Durum Yönetimi",
        "moduleNumber": 2,
        "moduleName": "Excel İle VBA Programlama",
        "isExam": false
      },
      {
        "hour": 36,
        "topic": "Döngü Deyimlerine Giriş: For...Next Sayıcı Döngüsü",
        "moduleNumber": 2,
        "moduleName": "Excel İle VBA Programlama",
        "isExam": false
      },
      {
        "hour": 37,
        "topic": "For Each...Next Döngüsü İle Koleksiyonlar ve Hücre Aralıklarında Gezinme",
        "moduleNumber": 2,
        "moduleName": "Excel İle VBA Programlama",
        "isExam": false
      },
      {
        "hour": 38,
        "topic": "Do While...Loop ve Do Until...Loop Koşullu Döngü Yapıları",
        "moduleNumber": 2,
        "moduleName": "Excel İle VBA Programlama",
        "isExam": false
      },
      {
        "hour": 39,
        "topic": "Döngüler İle Veri Tarama, Koşullu Temizleme ve Veri Aktarımı",
        "moduleNumber": 2,
        "moduleName": "Excel İle VBA Programlama",
        "isExam": false
      },
      {
        "hour": 40,
        "topic": "Hata Yakalama ve Yönetimi: On Error GoTo, Resume Next",
        "moduleNumber": 2,
        "moduleName": "Excel İle VBA Programlama",
        "isExam": false
      },
      {
        "hour": 41,
        "topic": "Kullanıcı İletişim Pencereleri: MsgBox ve InputBox Fonksiyonları",
        "moduleNumber": 2,
        "moduleName": "Excel İle VBA Programlama",
        "isExam": false
      },
      {
        "hour": 42,
        "topic": "Kullanıcı Tanımlı Excel Fonksiyonları (UDF) Yazma ve Çalışma Sayfasında Kullanma",
        "moduleNumber": 2,
        "moduleName": "Excel İle VBA Programlama",
        "isExam": false
      },
      {
        "hour": 43,
        "topic": "Çalışma Kitabı ve Sayfa Olayları (Events): Workbook_Open, Worksheet_Change",
        "moduleNumber": 2,
        "moduleName": "Excel İle VBA Programlama",
        "isExam": false
      },
      {
        "hour": 44,
        "topic": "UserForm (Kullanıcı Formu) Oluşturma ve Form Tasarım İlkeleri",
        "moduleNumber": 2,
        "moduleName": "Excel İle VBA Programlama",
        "isExam": false
      },
      {
        "hour": 45,
        "topic": "Form Denetimleri: Label, TextBox, CommandButton Kullanımı ve Olayları",
        "moduleNumber": 2,
        "moduleName": "Excel İle VBA Programlama",
        "isExam": false
      },
      {
        "hour": 46,
        "topic": "Form Denetimleri: ComboBox ve ListBox Kullanımı, Dinamik Veri Yükleme",
        "moduleNumber": 2,
        "moduleName": "Excel İle VBA Programlama",
        "isExam": false
      },
      {
        "hour": 47,
        "topic": "Form Denetimleri: CheckBox, OptionButton ve Frame Kullanımı",
        "moduleNumber": 2,
        "moduleName": "Excel İle VBA Programlama",
        "isExam": false
      },
      {
        "hour": 48,
        "topic": "UserForm Üzerinden Çalışma Sayfasına Veri Kaydetme ve Yeni Kayıt Ekleme",
        "moduleNumber": 2,
        "moduleName": "Excel İle VBA Programlama",
        "isExam": false
      },
      {
        "hour": 49,
        "topic": "UserForm İle Kayıt Arama, Listeleme ve Form Üzerinde Gösterme",
        "moduleNumber": 2,
        "moduleName": "Excel İle VBA Programlama",
        "isExam": false
      },
      {
        "hour": 50,
        "topic": "UserForm İle Mevcut Kaydı Güncelleme ve Silme İşlemleri",
        "moduleNumber": 2,
        "moduleName": "Excel İle VBA Programlama",
        "isExam": false
      },
      {
        "hour": 51,
        "topic": "Form Doğrulama (Validation) ve Kullanıcı Hata Kontrolleri",
        "moduleNumber": 2,
        "moduleName": "Excel İle VBA Programlama",
        "isExam": false
      },
      {
        "hour": 52,
        "topic": "Raporlama ve Dış Veri İşlemleri: Excel Sayfasını PDF / CSV Olarak Dışa Aktarma",
        "moduleNumber": 2,
        "moduleName": "Excel İle VBA Programlama",
        "isExam": false
      },
      {
        "hour": 53,
        "topic": "Kapsamlı Excel VBA Otomasyon ve Veri Yönetim Sistemi Projesi - 1",
        "moduleNumber": 2,
        "moduleName": "Excel İle VBA Programlama",
        "isExam": false
      },
      {
        "hour": 54,
        "topic": "Kapsamlı Excel VBA Otomasyon ve Veri Yönetim Sistemi Projesi - 2",
        "moduleNumber": 2,
        "moduleName": "Excel İle VBA Programlama",
        "isExam": false
      },
      {
        "hour": 55,
        "topic": "Excel İle VBA Programlama - Modül Değerlendirme Sınavı (Uygulama)",
        "moduleNumber": 2,
        "moduleName": "Excel İle VBA Programlama",
        "isExam": true
      },
      {
        "hour": 56,
        "topic": "Excel İle VBA Programlama - Modül Değerlendirme Sınavı (Teorik & Değerlendirme)",
        "moduleNumber": 2,
        "moduleName": "Excel İle VBA Programlama",
        "isExam": true
      }
    ]
  },
  {
    "id": "tmpl_ofis_programlari_72",
    "name": "Ofis Programları Kullanımı",
    "code": "BT-OFS-72",
    "category": "Bilişim Teknolojileri",
    "area": "Bilişim Teknolojileri",
    "totalHours": 72,
    "moduleCount": 3,
    "description": "T.C. Millî Eğitim Bakanlığı Hayat Boyu Öğrenme Genel Müdürlüğü Bilişim Teknolojileri Alanı - Ofis Programları Kullanımı Kurs Programı (3 Modül, 72 Ders Saati).",
    "modules": [
      {
        "id": "mod_ofis_1",
        "number": 1,
        "name": "Kelime İşlemci",
        "totalHours": 24,
        "lessonHours": 22,
        "examHours": 2,
        "topics": [
          "Kelime İşlemci Arayüzü, Belge Görünümleri, Yakınlaştırma ve Cetvel Ayarları",
          "Temel Belge İşlemleri: Yeni Belge, Kaydetme, Farklı Kaydetme ve Belge Açma",
          "Temel Yazım İşlemleri: Metin Girme, Seçme, Taşıma, Kopyalama, Geri Alma ve Yineleme",
          "Metin Arama ve Değiştirme (Bul ve Değiştir) İşlemleri",
          "Metin Biçimlendirme: Yazı Tipi, Boyut, Renk, Efektler ve Gelişmiş Yazı Tipi Özellikleri",
          "Paragraf Biçimlendirme: Hizalama, Girintiler, Paragraf ve Satır Aralıkları",
          "Madde İşaretleri, Numaralandırma ve Çok Düzeyli Listeler ile Çalışma",
          "Kenarlıklar, Gölgelendirme ve Biçim Boyacısı Kullanımı",
          "Belge Biçimlendirme: Çoklu Sütunlar, Sekmeler (Tablar) ve Kesmeler (Sayfa/Bölüm)",
          "Sayfa Yapısı: Kenar Boşlukları, Yönlendirme, Filigran ve Sayfa Rengi",
          "Stillerle Çalışma: Yeni Stil Oluşturma, Stil Değiştirme ve Stil Yönetimi",
          "Belge Denetimi: Yazım ve Dilbilgisi, Heceleme, Sözcük Sayımı ve Otomatik Düzelt",
          "Belge İşbirliği ve Güvenlik: Açıklamalar, Değişiklikleri İzleme, Belge Karşılaştırma ve Belge Koruma",
          "Sayfa Düzeni: Kapak Sayfası, Üstbilgi, Altbilgi ve Sayfa Numaralandırma",
          "Tablo İşlemleri: Tablo Ekleme, Satır/Sütun Yönetimi, Hücre Birleştirme ve Bölme",
          "Tablo Biçimlendirme: Tablo Stilleri, Kenarlıklar, Veri Hizalama ve Formül İşlemleri",
          "Metni Tabloya ve Tabloyu Metne Dönüştürme, Tablo Başlıklarını Yineleme",
          "Görsel ve Çizim Nesneleri: Resim, Şekil, SmartArt, Simge ve Denklem Ekleme",
          "Metin Kutuları, WordArt ve Kuruluş Şeması (Organizasyon Şeması) Hazırlama",
          "Başvurular: İçindekiler Tablosu, Dipnot/Sonnot, Şekiller Tablosu ve Kaynakça Oluşturma",
          "Gelişmiş Belge Özellikleri: Zarflar, Etiketler, Adres Mektup Birleştirme ve Makrolar",
          "Belgeyi Tamamlama: Baskı Önizleme, Yazdırma Seçenekleri, PDF Olarak Dışa Aktarma ve Şifreleme"
        ]
      },
      {
        "id": "mod_ofis_2",
        "number": 2,
        "name": "Elektronik Tablolama",
        "totalHours": 24,
        "lessonHours": 22,
        "examHours": 2,
        "topics": [
          "Elektronik Tablolama Arayüzü, Çalışma Kitabı ve Çalışma Sayfası Kavramı",
          "Temel Dosya ve Sayfa İşlemleri: Sayfa Ekleme, Yeniden Adlandırma, Taşıma, Kopyalama ve Gizleme",
          "Veri Giriş Teknikleri, Seçim Yöntemleri, Satır/Sütun Boyutlandırma ve Düzenleme",
          "Otomatik Doldurma, Doldurma Serileri, Özel Listeler ve Otomatik Tamamlama",
          "Hücre Biçimlendirme: Sayı, Para Birimi, Tarih/Saat, Metin, Hizalama ve Yazı Tipi",
          "Hücre Kenarlıkları, Dolgu Renkleri, Hücre Stilleri ve Tablo Biçimlendirme",
          "Koşullu Biçimlendirme: İlk/Son Kuralları, Veri Çubukları, Renk Ölçekleri ve Simge Kümeleri",
          "Sayfa Yapısı, Başlıkları Yazdırma, Yazdırma Alanı ve Sayfaya Sığdırma Ayarları",
          "Pencere Yönetimi: Bölmeleri Dondurma/Bölme, Sayfa Görünümleri ve Yazdırma Seçenekleri",
          "Formül Mantığı, Matematiksel Operatörler, Göreli ve Mutlak ($) Hücre Başvuruları",
          "Hücre ve Aralık Adlandırma, Formüllerde Hata Denetimi ve Hata İletileri",
          "Temel Matematiksel ve İstatistiksel Fonksiyonlar: TOPLA, ÇARPIM, ORTALAMA, MAK, MİN",
          "Sayma ve Mantıksal Koşul Fonksiyonları: EĞERSAY, BAĞ_DEĞ_SAY, BAĞ_DEĞ_DOLU_SAY",
          "Mantıksal Karar Fonksiyonları: EĞER, VE, VEYA İşlevleri ve İç İçe EĞER Kullanımı",
          "Metin ve Tarih Fonksiyonları: BİRLEŞTİR, BÜYÜKHARF, KÜÇÜKHARF, SOLDAN, SAĞDAN, BUGÜN, ŞİMDİ",
          "Arama ve Başvuru Fonksiyonları: DÜŞEYARA, YATAYARA Kullanımı ve Hata Yönetimi",
          "Grafik İşlemleri: Sütun, Çubuk, Çizgi ve Pasta Grafiği Oluşturma ve Düzenleme",
          "Grafik Öğelerini Biçimlendirme: Eksenler, Veri Etiketleri, Göstergeler ve Eğilim Çizgileri",
          "Veri Analizi: Tek ve Çok Ölçütlü Sıralama, Otomatik ve Gelişmiş Filtreleme, Alt Toplamlar",
          "Veri Doğrulama (Açılır Liste Oluşturma), Yinelenenleri Kaldırma ve Metni Sütunlara Dönüştürme",
          "Özet Tablo (PivotTable) ve Özet Grafik (PivotChart) ile Veri Analizi ve Raporlama",
          "Senaryolar, Hedef Arama, Temel Makro Kaydetme, Sayfa Koruma ve Çalışma Kitabını Şifreleme"
        ]
      },
      {
        "id": "mod_ofis_3",
        "number": 3,
        "name": "Sunu Hazırlama",
        "totalHours": 24,
        "lessonHours": 22,
        "examHours": 2,
        "topics": [
          "Sunu Programı Arayüzü, Çalışma Alanı, Sunu Kavramı ve Sunu Görünümleri",
          "Temel Sunu İşlemleri: Yeni Sunu Oluşturma, Şablonlar, Sunu Kaydetme, Açma ve Kapatma",
          "Slayt İşlemleri: Yeni Slayt Ekleme, Düzen Seçimi, Slayt Çoğaltma, Silme ve Gizleme",
          "Slaytları Bölümlere Ayırma ve Farklı Bir Sunudan Slayt Ekleme (Slaytları Yeniden Kullanma)",
          "Sunu Tasarımı: Sayfa Yapısı, Tasarım Temaları, Renk ve Yazı Tipi Paletleri",
          "Arka Plan Biçimlendirme (Düz/Gradyan/Doku) ve Fotoğraf Albümü Oluşturma",
          "Asıl Slayt (Slide Master) Kullanımı, Şablon Düzenleme ve Kurumsal Kimlik Uyarlama",
          "Metin Kutuları, Metin Biçimlendirme, Madde İşaretleri ve Numaralandırma",
          "Şekil Ekleme, Şekilleri Boyutlandırma, Döndürme, Gruplandırma ve Biçimlendirme",
          "Resim Ekleme, Kırpma, Arka Plan Kaldırma, Resim Stilleri ve Görsel Efektler",
          "Sunuya Tablo Ekleme, Hücre Düzenleme ve Tablo Stilleri ile Biçimlendirme",
          "Elektronik Tablo ve Veri Grafiği Ekleme, Grafik Türleri ve Veri Kaynağını Düzenleme",
          "SmartArt Grafikleri Ekleme: Süreç, Döngü ve Hiyerarşi (Organizasyon) Şemaları",
          "Medya Nesneleri: Ses Dosyası Ekleme, Arka Planda Çalma ve Ses Ayarları",
          "Video Dosyası Ekleme, Kırpma, Başlangıç Seçenekleri ve Video Stilleri",
          "Etkileşimli Sunum: Köprüler (Linkler), Yer İmleri ve Eylem (Action) Düğmeleri",
          "Slayt Geçiş Efektleri: Geçiş Türleri, Geçiş Süresi, Ses ve Otomatik İlerleme Ayarları",
          "Nesne Animasyonları: Giriş, Vurgu, Çıkış ve Hareket Yolları Animasyonları",
          "Animasyon Bölmesi, Animasyon Sıralaması, Zamanlama ve Tetikleyiciler (Triggers)",
          "Slayt Gösterisi Ayarları: Özel Gösteri Oluşturma, Prova Zamanlaması ve Sunucu Görünümü",
          "Yazdırma Seçenekleri: Dinleyici Notları (Handouts), Slayt ve Not Sayfaları Yazdırma",
          "Sunuyu Paketleme, Video/PDF Olarak Dışa Aktarma, Sunu Güvenliği ve Şifreleme"
        ]
      }
    ],
    "syllabus": [
      {
        "hour": 1,
        "topic": "Kelime İşlemci Arayüzü, Belge Görünümleri, Yakınlaştırma ve Cetvel Ayarları",
        "moduleNumber": 1,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 2,
        "topic": "Temel Belge İşlemleri: Yeni Belge, Kaydetme, Farklı Kaydetme ve Belge Açma",
        "moduleNumber": 1,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 3,
        "topic": "Temel Yazım İşlemleri: Metin Girme, Seçme, Taşıma, Kopyalama, Geri Alma ve Yineleme",
        "moduleNumber": 1,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 4,
        "topic": "Metin Arama ve Değiştirme (Bul ve Değiştir) İşlemleri",
        "moduleNumber": 1,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 5,
        "topic": "Metin Biçimlendirme: Yazı Tipi, Boyut, Renk, Efektler ve Gelişmiş Yazı Tipi Özellikleri",
        "moduleNumber": 1,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 6,
        "topic": "Paragraf Biçimlendirme: Hizalama, Girintiler, Paragraf ve Satır Aralıkları",
        "moduleNumber": 1,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 7,
        "topic": "Madde İşaretleri, Numaralandırma ve Çok Düzeyli Listeler ile Çalışma",
        "moduleNumber": 1,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 8,
        "topic": "Kenarlıklar, Gölgelendirme ve Biçim Boyacısı Kullanımı",
        "moduleNumber": 1,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 9,
        "topic": "Belge Biçimlendirme: Çoklu Sütunlar, Sekmeler (Tablar) ve Kesmeler (Sayfa/Bölüm)",
        "moduleNumber": 1,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 10,
        "topic": "Sayfa Yapısı: Kenar Boşlukları, Yönlendirme, Filigran ve Sayfa Rengi",
        "moduleNumber": 1,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 11,
        "topic": "Stillerle Çalışma: Yeni Stil Oluşturma, Stil Değiştirme ve Stil Yönetimi",
        "moduleNumber": 1,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 12,
        "topic": "Belge Denetimi: Yazım ve Dilbilgisi, Heceleme, Sözcük Sayımı ve Otomatik Düzelt",
        "moduleNumber": 1,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 13,
        "topic": "Belge İşbirliği ve Güvenlik: Açıklamalar, Değişiklikleri İzleme, Belge Karşılaştırma ve Belge Koruma",
        "moduleNumber": 1,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 14,
        "topic": "Sayfa Düzeni: Kapak Sayfası, Üstbilgi, Altbilgi ve Sayfa Numaralandırma",
        "moduleNumber": 1,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 15,
        "topic": "Tablo İşlemleri: Tablo Ekleme, Satır/Sütun Yönetimi, Hücre Birleştirme ve Bölme",
        "moduleNumber": 1,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 16,
        "topic": "Tablo Biçimlendirme: Tablo Stilleri, Kenarlıklar, Veri Hizalama ve Formül İşlemleri",
        "moduleNumber": 1,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 17,
        "topic": "Metni Tabloya ve Tabloyu Metne Dönüştürme, Tablo Başlıklarını Yineleme",
        "moduleNumber": 1,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 18,
        "topic": "Görsel ve Çizim Nesneleri: Resim, Şekil, SmartArt, Simge ve Denklem Ekleme",
        "moduleNumber": 1,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 19,
        "topic": "Metin Kutuları, WordArt ve Kuruluş Şeması (Organizasyon Şeması) Hazırlama",
        "moduleNumber": 1,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 20,
        "topic": "Başvurular: İçindekiler Tablosu, Dipnot/Sonnot, Şekiller Tablosu ve Kaynakça Oluşturma",
        "moduleNumber": 1,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 21,
        "topic": "Gelişmiş Belge Özellikleri: Zarflar, Etiketler, Adres Mektup Birleştirme ve Makrolar",
        "moduleNumber": 1,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 22,
        "topic": "Belgeyi Tamamlama: Baskı Önizleme, Yazdırma Seçenekleri, PDF Olarak Dışa Aktarma ve Şifreleme",
        "moduleNumber": 1,
        "moduleName": "Kelime İşlemci",
        "isExam": false
      },
      {
        "hour": 23,
        "topic": "Kelime İşlemci - Modül Değerlendirme Sınavı (Uygulama)",
        "moduleNumber": 1,
        "moduleName": "Kelime İşlemci",
        "isExam": true
      },
      {
        "hour": 24,
        "topic": "Kelime İşlemci - Modül Değerlendirme Sınavı (Teorik & Değerlendirme)",
        "moduleNumber": 1,
        "moduleName": "Kelime İşlemci",
        "isExam": true
      },
      {
        "hour": 25,
        "topic": "Elektronik Tablolama Arayüzü, Çalışma Kitabı ve Çalışma Sayfası Kavramı",
        "moduleNumber": 2,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 26,
        "topic": "Temel Dosya ve Sayfa İşlemleri: Sayfa Ekleme, Yeniden Adlandırma, Taşıma, Kopyalama ve Gizleme",
        "moduleNumber": 2,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 27,
        "topic": "Veri Giriş Teknikleri, Seçim Yöntemleri, Satır/Sütun Boyutlandırma ve Düzenleme",
        "moduleNumber": 2,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 28,
        "topic": "Otomatik Doldurma, Doldurma Serileri, Özel Listeler ve Otomatik Tamamlama",
        "moduleNumber": 2,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 29,
        "topic": "Hücre Biçimlendirme: Sayı, Para Birimi, Tarih/Saat, Metin, Hizalama ve Yazı Tipi",
        "moduleNumber": 2,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 30,
        "topic": "Hücre Kenarlıkları, Dolgu Renkleri, Hücre Stilleri ve Tablo Biçimlendirme",
        "moduleNumber": 2,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 31,
        "topic": "Koşullu Biçimlendirme: İlk/Son Kuralları, Veri Çubukları, Renk Ölçekleri ve Simge Kümeleri",
        "moduleNumber": 2,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 32,
        "topic": "Sayfa Yapısı, Başlıkları Yazdırma, Yazdırma Alanı ve Sayfaya Sığdırma Ayarları",
        "moduleNumber": 2,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 33,
        "topic": "Pencere Yönetimi: Bölmeleri Dondurma/Bölme, Sayfa Görünümleri ve Yazdırma Seçenekleri",
        "moduleNumber": 2,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 34,
        "topic": "Formül Mantığı, Matematiksel Operatörler, Göreli ve Mutlak ($) Hücre Başvuruları",
        "moduleNumber": 2,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 35,
        "topic": "Hücre ve Aralık Adlandırma, Formüllerde Hata Denetimi ve Hata İletileri",
        "moduleNumber": 2,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 36,
        "topic": "Temel Matematiksel ve İstatistiksel Fonksiyonlar: TOPLA, ÇARPIM, ORTALAMA, MAK, MİN",
        "moduleNumber": 2,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 37,
        "topic": "Sayma ve Mantıksal Koşul Fonksiyonları: EĞERSAY, BAĞ_DEĞ_SAY, BAĞ_DEĞ_DOLU_SAY",
        "moduleNumber": 2,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 38,
        "topic": "Mantıksal Karar Fonksiyonları: EĞER, VE, VEYA İşlevleri ve İç İçe EĞER Kullanımı",
        "moduleNumber": 2,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 39,
        "topic": "Metin ve Tarih Fonksiyonları: BİRLEŞTİR, BÜYÜKHARF, KÜÇÜKHARF, SOLDAN, SAĞDAN, BUGÜN, ŞİMDİ",
        "moduleNumber": 2,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 40,
        "topic": "Arama ve Başvuru Fonksiyonları: DÜŞEYARA, YATAYARA Kullanımı ve Hata Yönetimi",
        "moduleNumber": 2,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 41,
        "topic": "Grafik İşlemleri: Sütun, Çubuk, Çizgi ve Pasta Grafiği Oluşturma ve Düzenleme",
        "moduleNumber": 2,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 42,
        "topic": "Grafik Öğelerini Biçimlendirme: Eksenler, Veri Etiketleri, Göstergeler ve Eğilim Çizgileri",
        "moduleNumber": 2,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 43,
        "topic": "Veri Analizi: Tek ve Çok Ölçütlü Sıralama, Otomatik ve Gelişmiş Filtreleme, Alt Toplamlar",
        "moduleNumber": 2,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 44,
        "topic": "Veri Doğrulama (Açılır Liste Oluşturma), Yinelenenleri Kaldırma ve Metni Sütunlara Dönüştürme",
        "moduleNumber": 2,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 45,
        "topic": "Özet Tablo (PivotTable) ve Özet Grafik (PivotChart) ile Veri Analizi ve Raporlama",
        "moduleNumber": 2,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 46,
        "topic": "Senaryolar, Hedef Arama, Temel Makro Kaydetme, Sayfa Koruma ve Çalışma Kitabını Şifreleme",
        "moduleNumber": 2,
        "moduleName": "Elektronik Tablolama",
        "isExam": false
      },
      {
        "hour": 47,
        "topic": "Elektronik Tablolama - Modül Değerlendirme Sınavı (Uygulama)",
        "moduleNumber": 2,
        "moduleName": "Elektronik Tablolama",
        "isExam": true
      },
      {
        "hour": 48,
        "topic": "Elektronik Tablolama - Modül Değerlendirme Sınavı (Teorik & Değerlendirme)",
        "moduleNumber": 2,
        "moduleName": "Elektronik Tablolama",
        "isExam": true
      },
      {
        "hour": 49,
        "topic": "Sunu Programı Arayüzü, Çalışma Alanı, Sunu Kavramı ve Sunu Görünümleri",
        "moduleNumber": 3,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 50,
        "topic": "Temel Sunu İşlemleri: Yeni Sunu Oluşturma, Şablonlar, Sunu Kaydetme, Açma ve Kapatma",
        "moduleNumber": 3,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 51,
        "topic": "Slayt İşlemleri: Yeni Slayt Ekleme, Düzen Seçimi, Slayt Çoğaltma, Silme ve Gizleme",
        "moduleNumber": 3,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 52,
        "topic": "Slaytları Bölümlere Ayırma ve Farklı Bir Sunudan Slayt Ekleme (Slaytları Yeniden Kullanma)",
        "moduleNumber": 3,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 53,
        "topic": "Sunu Tasarımı: Sayfa Yapısı, Tasarım Temaları, Renk ve Yazı Tipi Paletleri",
        "moduleNumber": 3,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 54,
        "topic": "Arka Plan Biçimlendirme (Düz/Gradyan/Doku) ve Fotoğraf Albümü Oluşturma",
        "moduleNumber": 3,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 55,
        "topic": "Asıl Slayt (Slide Master) Kullanımı, Şablon Düzenleme ve Kurumsal Kimlik Uyarlama",
        "moduleNumber": 3,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 56,
        "topic": "Metin Kutuları, Metin Biçimlendirme, Madde İşaretleri ve Numaralandırma",
        "moduleNumber": 3,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 57,
        "topic": "Şekil Ekleme, Şekilleri Boyutlandırma, Döndürme, Gruplandırma ve Biçimlendirme",
        "moduleNumber": 3,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 58,
        "topic": "Resim Ekleme, Kırpma, Arka Plan Kaldırma, Resim Stilleri ve Görsel Efektler",
        "moduleNumber": 3,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 59,
        "topic": "Sunuya Tablo Ekleme, Hücre Düzenleme ve Tablo Stilleri ile Biçimlendirme",
        "moduleNumber": 3,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 60,
        "topic": "Elektronik Tablo ve Veri Grafiği Ekleme, Grafik Türleri ve Veri Kaynağını Düzenleme",
        "moduleNumber": 3,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 61,
        "topic": "SmartArt Grafikleri Ekleme: Süreç, Döngü ve Hiyerarşi (Organizasyon) Şemaları",
        "moduleNumber": 3,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 62,
        "topic": "Medya Nesneleri: Ses Dosyası Ekleme, Arka Planda Çalma ve Ses Ayarları",
        "moduleNumber": 3,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 63,
        "topic": "Video Dosyası Ekleme, Kırpma, Başlangıç Seçenekleri ve Video Stilleri",
        "moduleNumber": 3,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 64,
        "topic": "Etkileşimli Sunum: Köprüler (Linkler), Yer İmleri ve Eylem (Action) Düğmeleri",
        "moduleNumber": 3,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 65,
        "topic": "Slayt Geçiş Efektleri: Geçiş Türleri, Geçiş Süresi, Ses ve Otomatik İlerleme Ayarları",
        "moduleNumber": 3,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 66,
        "topic": "Nesne Animasyonları: Giriş, Vurgu, Çıkış ve Hareket Yolları Animasyonları",
        "moduleNumber": 3,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 67,
        "topic": "Animasyon Bölmesi, Animasyon Sıralaması, Zamanlama ve Tetikleyiciler (Triggers)",
        "moduleNumber": 3,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 68,
        "topic": "Slayt Gösterisi Ayarları: Özel Gösteri Oluşturma, Prova Zamanlaması ve Sunucu Görünümü",
        "moduleNumber": 3,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 69,
        "topic": "Yazdırma Seçenekleri: Dinleyici Notları (Handouts), Slayt ve Not Sayfaları Yazdırma",
        "moduleNumber": 3,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 70,
        "topic": "Sunuyu Paketleme, Video/PDF Olarak Dışa Aktarma, Sunu Güvenliği ve Şifreleme",
        "moduleNumber": 3,
        "moduleName": "Sunu Hazırlama",
        "isExam": false
      },
      {
        "hour": 71,
        "topic": "Sunu Hazırlama - Modül Değerlendirme Sınavı (Uygulama)",
        "moduleNumber": 3,
        "moduleName": "Sunu Hazırlama",
        "isExam": true
      },
      {
        "hour": 72,
        "topic": "Sunu Hazırlama - Modül Değerlendirme Sınavı (Teorik & Değerlendirme)",
        "moduleNumber": 3,
        "moduleName": "Sunu Hazırlama",
        "isExam": true
      }
    ]
  },
  {
    "id": "tmpl_veri_giris_elemani_116",
    "name": "Veri Giriş Elemanı",
    "code": "VGE-116",
    "category": "Bilişim Teknolojileri",
    "area": "Bilişim Teknolojileri",
    "totalHours": 116,
    "moduleCount": 1,
    "description": "Bilişim Teknolojileri Alanı - Veri Giriş Elemanı Kurs Programı. Temel veri kavramları, Excel, Makro/VBA, SQL Veri Tabanı ve Power BI iş zekası uygulamalarını kapsar (Tek Modül, 116 Ders Saati).",
    "modules": [
      {
        "id": "mod_vge_1",
        "number": 1,
        "name": "Veri Giriş Elemanı",
        "totalHours": 116,
        "lessonHours": 114,
        "examHours": 2,
        "topics": [
          "Veri Nedir ve Temel Kavramlar",
          "Veri Ne İşe Yarar ve Kullanım Alanları",
          "Verinin Saklama Yolları ve Depolama Birimleri",
          "Yapısal Veri Mantığı ve Veri Türleri",
          "Yapılandırılmış Veri Özellikleri ve Standartları",
          "İlişkisel Öznitelikler ve Veri Bütünlüğü",
          "Form ve Cloud Yapıları: Çevrimiçi Veri Toplama",
          "Form ve Cloud Yapıları: Bulut Veri Depolama ve Paylaşım",
          "İnternet ve Araştırma Yöntemleri",
          "Güvenilir Veri Kaynakları ve Teyit Yöntemleri",
          "Güvenilmez Kaynakları Ayırt Etme ve Veri Doğrulama",
          "KVKK Veri Güvenliği, Mahremiyet ve Yasal Sorumluluklar",
          "Veri Giriş İşlemleri, Standartları ve Hata Önleme",
          "Excel Açılış Sayfası ve Çalışma Kitabı Arayüzü",
          "Excel Sayfa Yapısı, Görünümler ve Yakınlaştırma",
          "Satır ve Sütun İle Çalışma: Ekleme, Silme ve Boyutlandırma",
          "Satır ve Sütunları Gizleme, Sabitleme ve Çözme",
          "Excel Menüler ve Şerit (Ribbon) Arayüzü Kullanımı",
          "Hızlı Erişim Araç Çubuğu ve Kısayollar",
          "Otomatik Tamamlama (AutoFill) ve Otomatik Doldurma",
          "Özel Doldurma Serileri ve Hızlı Doldurma (Flash Fill)",
          "Hücre Biçimlendirme İşlemleri: Sayı, Metin ve Tarih Formatları",
          "Hizalama, Kenarlıklar, Dolgu ve Hücre Stilleri",
          "Koşullu Biçimlendirme: Hücre Kuralları ve Renk Ölçekleri",
          "Koşullu Biçimlendirme: Formülle Kural Tanımlama",
          "Temel Fonksiyon Kullanımı: TOPLA, ORTALAMA, MAK, MİN",
          "SAY, BAĞ_DEĞ_DOLU_SAY ve Basit İstatistik Fonksiyonları",
          "İç İçe Fonksiyon Kullanımı: EĞER ve VE / VEYA Fonksiyonları",
          "Çoklu Koşullu İç İçe Fonksiyon Uygulamaları",
          "Arama ve Başvuru Fonksiyonları: DÜŞEYARA (VLOOKUP) Kullanımı",
          "YATAYARA ve ÇAPRAZARA (XLOOKUP) İle Veri Eşleştirme",
          "Grafik Oluşturma: Sütun, Çubuk ve Çizgi Grafikler",
          "Grafik Biçimlendirme, Veri Etiketleri ve Göstergeler",
          "Hedef Ara (Goal Seek) Aracı ve Senaryo Analizi - 1",
          "Hedef Ara (Goal Seek) Aracı İle Değer Optimizasyonu - 2",
          "Veri Analizi: Sıralama ve Özel Filtreleme Yöntemleri",
          "Metni Sütunlara Dönüştürme ve Yinelenenleri Kaldırma",
          "Pivot Tablo (Özet Tablo) Oluşturma ve Alan Seçimi",
          "Pivot Tabloda Gruplandırma, Dilimleyici ve Özet Grafikler",
          "Makro İşlemleri ve Geliştirici Sekmesi Yönetimi",
          "Makroların Çalışma Mantığı ve Güvenlik Seviyeleri",
          "Makro Kaydetme (Macro Recorder) İle Rutin İşleri Otomatikleştirme - 1",
          "Makro Kaydetme ve Butona Makro Atama - 2",
          "VBA Kod Editörüne Giriş ve Makro Yazma Temelleri",
          "Basit VBA Prosedürleri (Sub) ve Range Nesnesi İşlemleri",
          "Makro Güvenliği, Güvenilen Konumlar ve Dijital İmzalar - 1",
          "Makro İçeren Çalışma Kitabı (.xlsm) Kaydetme ve Güvenlik Ayarları - 2",
          "VBA Değişken ve Sabit Tanımlama (Dim, Const)",
          "Değişkenlerin Kapsamı (Scope) ve İsimlendirme Kuralları",
          "VBA Veri Tipleri: Integer, Long, String, Double, Boolean",
          "Variant Veri Tipi ve Veri Tipi Dönüşümleri",
          "Aritmetik ve Karşılaştırma Operatörleri",
          "Mantıksal Operatörler (And, Or, Not)",
          "If...Then...Else Karar Kontrol Yapısı Kullanımı",
          "Çoklu Koşullu ElseIf ve Select Case Yapıları",
          "For...Next Döngüsü İle Tekrarlayan İşlemler",
          "Do While ve Do Until Döngüleri İle Veri Tarama",
          "Form Denetimi Öğeleri: Düğme, Onay Kutusu ve Seçenek Düğmesi",
          "Açılır Liste (ComboBox) ve Liste Kutusu Form Denetimleri",
          "Etkili İletişim: İş Ortamında Profesyonel Yazışma Kuralları",
          "Etkili İletişim: Rapor Sunumu ve Ekip İçi Koordinasyon",
          "Etkili İletişim: Veri Girişinde Geri Bildirim ve İtiraz Yönetimi",
          "Veri Tabanı Kavramı ve Veritabanı Mimarisi Temelleri",
          "Veri Tabanı İhtiyacı ve Dosya Sistemlerinden Farkları",
          "Veri Tabanı Yönetim Sistemi (VTYS / DBMS) Nedir?",
          "Popüler VTYS Türleri (SQL Server, MySQL, PostgreSQL, Access)",
          "İlişkisel Veri Tabanı (RDBMS) Mantığı ve Tablo Yapısı",
          "Birincil Anahtar (Primary Key) ve Yabancı Anahtar (Foreign Key)",
          "SQL Veri Tipleri: Sayısal, Metinsel (VARCHAR, CHAR) ve Tarih Tipleri",
          "SQL Veri Tiplerinde Kısıtlamalar (Constraints: NOT NULL, UNIQUE)",
          "SELECT Komutu: Tablodan Veri Sorgulama Temelleri",
          "SELECT Komutu İle Belirli Sütunları Listeleme ve Takma Ad (AS)",
          "INSERT Komutu İle Tabloya Yeni Kayıt Ekleme - 1",
          "INSERT Komutu İle Çoklu Veri Ekleme Yöntemleri - 2",
          "UPDATE Komutu İle Mevcut Verileri Güncelleme - 1",
          "UPDATE Komutunda Koşul Belirleme ve Veri Bütünlüğü - 2",
          "DELETE Komutu İle Tablodan Kayıt Silme İşlemleri - 1",
          "DELETE ve TRUNCATE Farkı ve Güvenli Silme Kuralları - 2",
          "WHERE Komutu İle Şartlı Veri Filtreleme - 1",
          "WHERE İle Karşılaştırma, Mantıksal ve Aralık (BETWEEN, IN, LIKE) Filtreleri - 2",
          "DISTINCT Komutu İle Yinelenen Kayıtları Ayıklama - 1",
          "DISTINCT Kullanımı ve Benzersiz Değer Analizi - 2",
          "ORDER BY Komutu İle Artan (ASC) ve Azalan (DESC) Sıralama",
          "ORDER BY İle Çoklu Sütuna Göre Sıralama İşlemleri",
          "TOP Komutu (LIMIT) İle İlk N Sayıda Kaydı Getirme",
          "Aggregate Fonksiyonlar: COUNT ve SUM İle Sayma ve Toplama",
          "Aggregate Fonksiyonlar: AVG İle Ortalama Hesaplama",
          "Aggregate Fonksiyonlar: MIN ve MAX İle Uç Değerleri Bulma",
          "GROUP BY Komutu İle Verileri Gruplama Mantığı - 1",
          "GROUP BY İle Kategori Bazlı Özet Raporlar Üretme - 2",
          "HAVING Komutu İle Gruplanmış Verilerde Şart Belirleme - 1",
          "HAVING ve WHERE Komutları Arasındaki Farklar ve Kullanımı - 2",
          "JOIN İşlemleri: INNER JOIN İle İki Tabloyu Birleştirme - 1",
          "LEFT JOIN, RIGHT JOIN ve FULL JOIN Mantığı - 2",
          "Power BI Genel Bilgi: İş Zekası (BI) Kavramı ve Arayüz Tanıtımı",
          "Power BI Desktop Kurulumu ve Temel Çalışma Alanı",
          "Power BI'a Veri Aktarma (Excel, CSV, Web, SQL) - 1",
          "Power Query İle Veri Temizleme ve Dönüştürme - 2",
          "Görsel Öğeler: Kartlar, Tablo ve Matris Görselleri",
          "Görsel Öğeler: Sütun, Çubuk ve Pasta Grafikleri",
          "Görsel Öğeler: Çizgi Grafik ve Alan Grafikleri İle Trend Takibi",
          "Görsel Öğeler: Dilimleyiciler (Slicers) ve Etkileşimli Filtreler",
          "İlişkisel Veri Kullanımı ve Tablolar Arası İlişkiler (1-to-Many)",
          "Veri Modeli (Data Model) Tasarımı ve Şema Yapısı",
          "Yeni Sütun Oluşturma (Calculated Columns) Mantığı - 1",
          "DAX Fonksiyonları İle Yeni Hesaplanmış Sütun Yazma - 2",
          "Yeni Tablo Oluşturma (Calculated Tables) Mantığı - 1",
          "DAX Fonksiyonları İle Tarih ve Özet Tabloları Üretme - 2",
          "FILTER Formülü Kullanma ve Koşullu Tablo Filtreleme - 1",
          "DAX FILTER İle Dinamik Veri Setleri Oluşturma - 2",
          "CALCULATE Formülü Kullanma: Bağlam Değiştirme Mantığı - 1",
          "CALCULATE Formülü İle İleri Düzey Ölçü (Measure) Hesaplamaları - 2",
          "Düğme, Resim ve Şekil Ekleme İle Etkileşimli Rapor Tasarımı - 1",
          "Sayfa Gezinme Düğmeleri, Yer İmleri (Bookmarks) ve Dashboard Bitirme - 2"
        ]
      }
    ],
    "syllabus": [
      {
        "hour": 1,
        "topic": "Veri Nedir ve Temel Kavramlar",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 2,
        "topic": "Veri Ne İşe Yarar ve Kullanım Alanları",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 3,
        "topic": "Verinin Saklama Yolları ve Depolama Birimleri",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 4,
        "topic": "Yapısal Veri Mantığı ve Veri Türleri",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 5,
        "topic": "Yapılandırılmış Veri Özellikleri ve Standartları",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 6,
        "topic": "İlişkisel Öznitelikler ve Veri Bütünlüğü",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 7,
        "topic": "Form ve Cloud Yapıları: Çevrimiçi Veri Toplama",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 8,
        "topic": "Form ve Cloud Yapıları: Bulut Veri Depolama ve Paylaşım",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 9,
        "topic": "İnternet ve Araştırma Yöntemleri",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 10,
        "topic": "Güvenilir Veri Kaynakları ve Teyit Yöntemleri",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 11,
        "topic": "Güvenilmez Kaynakları Ayırt Etme ve Veri Doğrulama",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 12,
        "topic": "KVKK Veri Güvenliği, Mahremiyet ve Yasal Sorumluluklar",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 13,
        "topic": "Veri Giriş İşlemleri, Standartları ve Hata Önleme",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 14,
        "topic": "Excel Açılış Sayfası ve Çalışma Kitabı Arayüzü",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 15,
        "topic": "Excel Sayfa Yapısı, Görünümler ve Yakınlaştırma",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 16,
        "topic": "Satır ve Sütun İle Çalışma: Ekleme, Silme ve Boyutlandırma",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 17,
        "topic": "Satır ve Sütunları Gizleme, Sabitleme ve Çözme",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 18,
        "topic": "Excel Menüler ve Şerit (Ribbon) Arayüzü Kullanımı",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 19,
        "topic": "Hızlı Erişim Araç Çubuğu ve Kısayollar",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 20,
        "topic": "Otomatik Tamamlama (AutoFill) ve Otomatik Doldurma",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 21,
        "topic": "Özel Doldurma Serileri ve Hızlı Doldurma (Flash Fill)",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 22,
        "topic": "Hücre Biçimlendirme İşlemleri: Sayı, Metin ve Tarih Formatları",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 23,
        "topic": "Hizalama, Kenarlıklar, Dolgu ve Hücre Stilleri",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 24,
        "topic": "Koşullu Biçimlendirme: Hücre Kuralları ve Renk Ölçekleri",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 25,
        "topic": "Koşullu Biçimlendirme: Formülle Kural Tanımlama",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 26,
        "topic": "Temel Fonksiyon Kullanımı: TOPLA, ORTALAMA, MAK, MİN",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 27,
        "topic": "SAY, BAĞ_DEĞ_DOLU_SAY ve Basit İstatistik Fonksiyonları",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 28,
        "topic": "İç İçe Fonksiyon Kullanımı: EĞER ve VE / VEYA Fonksiyonları",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 29,
        "topic": "Çoklu Koşullu İç İçe Fonksiyon Uygulamaları",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 30,
        "topic": "Arama ve Başvuru Fonksiyonları: DÜŞEYARA (VLOOKUP) Kullanımı",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 31,
        "topic": "YATAYARA ve ÇAPRAZARA (XLOOKUP) İle Veri Eşleştirme",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 32,
        "topic": "Grafik Oluşturma: Sütun, Çubuk ve Çizgi Grafikler",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 33,
        "topic": "Grafik Biçimlendirme, Veri Etiketleri ve Göstergeler",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 34,
        "topic": "Hedef Ara (Goal Seek) Aracı ve Senaryo Analizi - 1",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 35,
        "topic": "Hedef Ara (Goal Seek) Aracı İle Değer Optimizasyonu - 2",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 36,
        "topic": "Veri Analizi: Sıralama ve Özel Filtreleme Yöntemleri",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 37,
        "topic": "Metni Sütunlara Dönüştürme ve Yinelenenleri Kaldırma",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 38,
        "topic": "Pivot Tablo (Özet Tablo) Oluşturma ve Alan Seçimi",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 39,
        "topic": "Pivot Tabloda Gruplandırma, Dilimleyici ve Özet Grafikler",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 40,
        "topic": "Makro İşlemleri ve Geliştirici Sekmesi Yönetimi",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 41,
        "topic": "Makroların Çalışma Mantığı ve Güvenlik Seviyeleri",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 42,
        "topic": "Makro Kaydetme (Macro Recorder) İle Rutin İşleri Otomatikleştirme - 1",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 43,
        "topic": "Makro Kaydetme ve Butona Makro Atama - 2",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 44,
        "topic": "VBA Kod Editörüne Giriş ve Makro Yazma Temelleri",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 45,
        "topic": "Basit VBA Prosedürleri (Sub) ve Range Nesnesi İşlemleri",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 46,
        "topic": "Makro Güvenliği, Güvenilen Konumlar ve Dijital İmzalar - 1",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 47,
        "topic": "Makro İçeren Çalışma Kitabı (.xlsm) Kaydetme ve Güvenlik Ayarları - 2",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 48,
        "topic": "VBA Değişken ve Sabit Tanımlama (Dim, Const)",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 49,
        "topic": "Değişkenlerin Kapsamı (Scope) ve İsimlendirme Kuralları",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 50,
        "topic": "VBA Veri Tipleri: Integer, Long, String, Double, Boolean",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 51,
        "topic": "Variant Veri Tipi ve Veri Tipi Dönüşümleri",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 52,
        "topic": "Aritmetik ve Karşılaştırma Operatörleri",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 53,
        "topic": "Mantıksal Operatörler (And, Or, Not)",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 54,
        "topic": "If...Then...Else Karar Kontrol Yapısı Kullanımı",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 55,
        "topic": "Çoklu Koşullu ElseIf ve Select Case Yapıları",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 56,
        "topic": "For...Next Döngüsü İle Tekrarlayan İşlemler",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 57,
        "topic": "Do While ve Do Until Döngüleri İle Veri Tarama",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 58,
        "topic": "Form Denetimi Öğeleri: Düğme, Onay Kutusu ve Seçenek Düğmesi",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 59,
        "topic": "Açılır Liste (ComboBox) ve Liste Kutusu Form Denetimleri",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 60,
        "topic": "Etkili İletişim: İş Ortamında Profesyonel Yazışma Kuralları",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 61,
        "topic": "Etkili İletişim: Rapor Sunumu ve Ekip İçi Koordinasyon",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 62,
        "topic": "Etkili İletişim: Veri Girişinde Geri Bildirim ve İtiraz Yönetimi",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 63,
        "topic": "Veri Tabanı Kavramı ve Veritabanı Mimarisi Temelleri",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 64,
        "topic": "Veri Tabanı İhtiyacı ve Dosya Sistemlerinden Farkları",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 65,
        "topic": "Veri Tabanı Yönetim Sistemi (VTYS / DBMS) Nedir?",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 66,
        "topic": "Popüler VTYS Türleri (SQL Server, MySQL, PostgreSQL, Access)",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 67,
        "topic": "İlişkisel Veri Tabanı (RDBMS) Mantığı ve Tablo Yapısı",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 68,
        "topic": "Birincil Anahtar (Primary Key) ve Yabancı Anahtar (Foreign Key)",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 69,
        "topic": "SQL Veri Tipleri: Sayısal, Metinsel (VARCHAR, CHAR) ve Tarih Tipleri",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 70,
        "topic": "SQL Veri Tiplerinde Kısıtlamalar (Constraints: NOT NULL, UNIQUE)",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 71,
        "topic": "SELECT Komutu: Tablodan Veri Sorgulama Temelleri",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 72,
        "topic": "SELECT Komutu İle Belirli Sütunları Listeleme ve Takma Ad (AS)",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 73,
        "topic": "INSERT Komutu İle Tabloya Yeni Kayıt Ekleme - 1",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 74,
        "topic": "INSERT Komutu İle Çoklu Veri Ekleme Yöntemleri - 2",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 75,
        "topic": "UPDATE Komutu İle Mevcut Verileri Güncelleme - 1",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 76,
        "topic": "UPDATE Komutunda Koşul Belirleme ve Veri Bütünlüğü - 2",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 77,
        "topic": "DELETE Komutu İle Tablodan Kayıt Silme İşlemleri - 1",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 78,
        "topic": "DELETE ve TRUNCATE Farkı ve Güvenli Silme Kuralları - 2",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 79,
        "topic": "WHERE Komutu İle Şartlı Veri Filtreleme - 1",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 80,
        "topic": "WHERE İle Karşılaştırma, Mantıksal ve Aralık (BETWEEN, IN, LIKE) Filtreleri - 2",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 81,
        "topic": "DISTINCT Komutu İle Yinelenen Kayıtları Ayıklama - 1",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 82,
        "topic": "DISTINCT Kullanımı ve Benzersiz Değer Analizi - 2",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 83,
        "topic": "ORDER BY Komutu İle Artan (ASC) ve Azalan (DESC) Sıralama",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 84,
        "topic": "ORDER BY İle Çoklu Sütuna Göre Sıralama İşlemleri",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 85,
        "topic": "TOP Komutu (LIMIT) İle İlk N Sayıda Kaydı Getirme",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 86,
        "topic": "Aggregate Fonksiyonlar: COUNT ve SUM İle Sayma ve Toplama",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 87,
        "topic": "Aggregate Fonksiyonlar: AVG İle Ortalama Hesaplama",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 88,
        "topic": "Aggregate Fonksiyonlar: MIN ve MAX İle Uç Değerleri Bulma",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 89,
        "topic": "GROUP BY Komutu İle Verileri Gruplama Mantığı - 1",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 90,
        "topic": "GROUP BY İle Kategori Bazlı Özet Raporlar Üretme - 2",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 91,
        "topic": "HAVING Komutu İle Gruplanmış Verilerde Şart Belirleme - 1",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 92,
        "topic": "HAVING ve WHERE Komutları Arasındaki Farklar ve Kullanımı - 2",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 93,
        "topic": "JOIN İşlemleri: INNER JOIN İle İki Tabloyu Birleştirme - 1",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 94,
        "topic": "LEFT JOIN, RIGHT JOIN ve FULL JOIN Mantığı - 2",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 95,
        "topic": "Power BI Genel Bilgi: İş Zekası (BI) Kavramı ve Arayüz Tanıtımı",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 96,
        "topic": "Power BI Desktop Kurulumu ve Temel Çalışma Alanı",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 97,
        "topic": "Power BI'a Veri Aktarma (Excel, CSV, Web, SQL) - 1",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 98,
        "topic": "Power Query İle Veri Temizleme ve Dönüştürme - 2",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 99,
        "topic": "Görsel Öğeler: Kartlar, Tablo ve Matris Görselleri",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 100,
        "topic": "Görsel Öğeler: Sütun, Çubuk ve Pasta Grafikleri",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 101,
        "topic": "Görsel Öğeler: Çizgi Grafik ve Alan Grafikleri İle Trend Takibi",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 102,
        "topic": "Görsel Öğeler: Dilimleyiciler (Slicers) ve Etkileşimli Filtreler",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 103,
        "topic": "İlişkisel Veri Kullanımı ve Tablolar Arası İlişkiler (1-to-Many)",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 104,
        "topic": "Veri Modeli (Data Model) Tasarımı ve Şema Yapısı",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 105,
        "topic": "Yeni Sütun Oluşturma (Calculated Columns) Mantığı - 1",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 106,
        "topic": "DAX Fonksiyonları İle Yeni Hesaplanmış Sütun Yazma - 2",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 107,
        "topic": "Yeni Tablo Oluşturma (Calculated Tables) Mantığı - 1",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 108,
        "topic": "DAX Fonksiyonları İle Tarih ve Özet Tabloları Üretme - 2",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 109,
        "topic": "FILTER Formülü Kullanma ve Koşullu Tablo Filtreleme - 1",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 110,
        "topic": "DAX FILTER İle Dinamik Veri Setleri Oluşturma - 2",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 111,
        "topic": "CALCULATE Formülü Kullanma: Bağlam Değiştirme Mantığı - 1",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 112,
        "topic": "CALCULATE Formülü İle İleri Düzey Ölçü (Measure) Hesaplamaları - 2",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 113,
        "topic": "Düğme, Resim ve Şekil Ekleme İle Etkileşimli Rapor Tasarımı - 1",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 114,
        "topic": "Sayfa Gezinme Düğmeleri, Yer İmleri (Bookmarks) ve Dashboard Bitirme - 2",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": false
      },
      {
        "hour": 115,
        "topic": "Veri Giriş Elemanı - Modül Değerlendirme Sınavı (Uygulama)",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": true
      },
      {
        "hour": 116,
        "topic": "Veri Giriş Elemanı - Modül Değerlendirme Sınavı (Teorik & Değerlendirme)",
        "moduleNumber": 1,
        "moduleName": "Veri Giriş Elemanı",
        "isExam": true
      }
    ]
  },
  {
    "id": "tmpl_yapay_zeka_prompt_24",
    "name": "Yapay Zeka İle Prompt Uygulamaları Eğitimi",
    "code": "YZ-PRM-24",
    "category": "Bilişim Teknolojileri",
    "area": "Bilişim Teknolojileri",
    "totalHours": 24,
    "moduleCount": 1,
    "description": "İzmir Büyükşehir Belediyesi Meslek Fabrikası Şube Müdürlüğü - Yapay Zeka ile Prompt Uygulamaları Eğitimi (Tek Modül, 24 Ders Saati).",
    "modules": [
      {
        "id": "mod_yz_prm_1",
        "number": 1,
        "name": "Yapay Zeka İle Prompt Uygulamaları Eğitimi",
        "totalHours": 24,
        "lessonHours": 22,
        "examHours": 2,
        "topics": [
          "Yapay Zekâya Giriş, AI Zaman Çizelgesi ve Üretken Yapay Zekâ (GenAI) Temelleri",
          "LLM Çalışma Mantığı: İnsan Dili vs. Makine Dili ve Olasılıksal Hesaplama",
          "Komut Mühendisliğinin (Prompt Engineering) Temel İlkeleri ve Belirsizliği Azaltma",
          "Algoritmik Düşünme ve Görevleri Parçalama (Decomposition) Stratejileri",
          "Etkili Komut Mimarisi: Rol, Görev, Bağlam, Kısıt ve Çıktı Formatı Şablonları",
          "Token Kavramı, Bağlam Penceresi (Context Window) Yönetimi ve Dil Dinamikleri",
          "Veri Gizliliği, KVKK Uyumluluğu, Fikri Mülkiyet (FSEK) ve Telif Hakları",
          "Halüsinasyon Doğrulama Yöntemleri ve Prompt Injection Güvenlik Riskleri",
          "Google Gemini İle Çok Modlu (Multimodal) Analiz ve Özel Gems Asistanları",
          "Google NotebookLM İle Kaynak Odaklı Doküman Analizi ve Podcast Üretimi",
          "OpenAI ChatGPT (Canvas & Ses Modu) İle İçerik Geliştirme ve Veri Analizi",
          "Anthropic Claude (Artifacts) İle Kodlama, Arayüz Tasarımı ve Mantıksal Akıl Yürütme",
          "Gamma AI İle Yapay Zekâ Destekli Kart Tabanlı Sunum ve Doküman Tasarımı",
          "Make.com İle Kodsuz AI Otomasyonu, Ajanlar ve Akıllı İş Akışı Senaryoları",
          "Canva Magic Studio İle Yapay Zekâ Destekli Çoklu Görsel ve Tasarım Üretimi",
          "Google AI Studio İle Sistem Promptları, Parametre Kontrolü ve API Prototipleme",
          "HeyGen İle Dijital İkiz (Avatar), Çok Dilli Dudak Senkronizasyonu ve Video Üretimi",
          "Google Antigravity İle Ajan Odaklı (Agent-First) Yazılım Geliştirme ve Görev Yönetimi",
          "Görsel Promptunun 4 Yapı Taşı: Özne, Eylem, Çevre-Işık ve Stil-Medyum",
          "DALL-E 3, Imagen 3, Ideogram ve Leonardo.AI İle Profesyonel Görsel Üretimi",
          "Yapay Zekâ İle Video Üretimi: Kamera Hareketleri, Kling AI ve Pika Araçları",
          "Kapsamlı Yapay Zekâ ve Prompt Uygulama Projesi (Yazılım, Tasarım & Otomasyon)"
        ]
      }
    ],
    "syllabus": [
      {
        "hour": 1,
        "topic": "Yapay Zekâya Giriş, AI Zaman Çizelgesi ve Üretken Yapay Zekâ (GenAI) Temelleri",
        "moduleNumber": 1,
        "moduleName": "Yapay Zeka İle Prompt Uygulamaları Eğitimi",
        "isExam": false
      },
      {
        "hour": 2,
        "topic": "LLM Çalışma Mantığı: İnsan Dili vs. Makine Dili ve Olasılıksal Hesaplama",
        "moduleNumber": 1,
        "moduleName": "Yapay Zeka İle Prompt Uygulamaları Eğitimi",
        "isExam": false
      },
      {
        "hour": 3,
        "topic": "Komut Mühendisliğinin (Prompt Engineering) Temel İlkeleri ve Belirsizliği Azaltma",
        "moduleNumber": 1,
        "moduleName": "Yapay Zeka İle Prompt Uygulamaları Eğitimi",
        "isExam": false
      },
      {
        "hour": 4,
        "topic": "Algoritmik Düşünme ve Görevleri Parçalama (Decomposition) Stratejileri",
        "moduleNumber": 1,
        "moduleName": "Yapay Zeka İle Prompt Uygulamaları Eğitimi",
        "isExam": false
      },
      {
        "hour": 5,
        "topic": "Etkili Komut Mimarisi: Rol, Görev, Bağlam, Kısıt ve Çıktı Formatı Şablonları",
        "moduleNumber": 1,
        "moduleName": "Yapay Zeka İle Prompt Uygulamaları Eğitimi",
        "isExam": false
      },
      {
        "hour": 6,
        "topic": "Token Kavramı, Bağlam Penceresi (Context Window) Yönetimi ve Dil Dinamikleri",
        "moduleNumber": 1,
        "moduleName": "Yapay Zeka İle Prompt Uygulamaları Eğitimi",
        "isExam": false
      },
      {
        "hour": 7,
        "topic": "Veri Gizliliği, KVKK Uyumluluğu, Fikri Mülkiyet (FSEK) ve Telif Hakları",
        "moduleNumber": 1,
        "moduleName": "Yapay Zeka İle Prompt Uygulamaları Eğitimi",
        "isExam": false
      },
      {
        "hour": 8,
        "topic": "Halüsinasyon Doğrulama Yöntemleri ve Prompt Injection Güvenlik Riskleri",
        "moduleNumber": 1,
        "moduleName": "Yapay Zeka İle Prompt Uygulamaları Eğitimi",
        "isExam": false
      },
      {
        "hour": 9,
        "topic": "Google Gemini İle Çok Modlu (Multimodal) Analiz ve Özel Gems Asistanları",
        "moduleNumber": 1,
        "moduleName": "Yapay Zeka İle Prompt Uygulamaları Eğitimi",
        "isExam": false
      },
      {
        "hour": 10,
        "topic": "Google NotebookLM İle Kaynak Odaklı Doküman Analizi ve Podcast Üretimi",
        "moduleNumber": 1,
        "moduleName": "Yapay Zeka İle Prompt Uygulamaları Eğitimi",
        "isExam": false
      },
      {
        "hour": 11,
        "topic": "OpenAI ChatGPT (Canvas & Ses Modu) İle İçerik Geliştirme ve Veri Analizi",
        "moduleNumber": 1,
        "moduleName": "Yapay Zeka İle Prompt Uygulamaları Eğitimi",
        "isExam": false
      },
      {
        "hour": 12,
        "topic": "Anthropic Claude (Artifacts) İle Kodlama, Arayüz Tasarımı ve Mantıksal Akıl Yürütme",
        "moduleNumber": 1,
        "moduleName": "Yapay Zeka İle Prompt Uygulamaları Eğitimi",
        "isExam": false
      },
      {
        "hour": 13,
        "topic": "Gamma AI İle Yapay Zekâ Destekli Kart Tabanlı Sunum ve Doküman Tasarımı",
        "moduleNumber": 1,
        "moduleName": "Yapay Zeka İle Prompt Uygulamaları Eğitimi",
        "isExam": false
      },
      {
        "hour": 14,
        "topic": "Make.com İle Kodsuz AI Otomasyonu, Ajanlar ve Akıllı İş Akışı Senaryoları",
        "moduleNumber": 1,
        "moduleName": "Yapay Zeka İle Prompt Uygulamaları Eğitimi",
        "isExam": false
      },
      {
        "hour": 15,
        "topic": "Canva Magic Studio İle Yapay Zekâ Destekli Çoklu Görsel ve Tasarım Üretimi",
        "moduleNumber": 1,
        "moduleName": "Yapay Zeka İle Prompt Uygulamaları Eğitimi",
        "isExam": false
      },
      {
        "hour": 16,
        "topic": "Google AI Studio İle Sistem Promptları, Parametre Kontrolü ve API Prototipleme",
        "moduleNumber": 1,
        "moduleName": "Yapay Zeka İle Prompt Uygulamaları Eğitimi",
        "isExam": false
      },
      {
        "hour": 17,
        "topic": "HeyGen İle Dijital İkiz (Avatar), Çok Dilli Dudak Senkronizasyonu ve Video Üretimi",
        "moduleNumber": 1,
        "moduleName": "Yapay Zeka İle Prompt Uygulamaları Eğitimi",
        "isExam": false
      },
      {
        "hour": 18,
        "topic": "Google Antigravity İle Ajan Odaklı (Agent-First) Yazılım Geliştirme ve Görev Yönetimi",
        "moduleNumber": 1,
        "moduleName": "Yapay Zeka İle Prompt Uygulamaları Eğitimi",
        "isExam": false
      },
      {
        "hour": 19,
        "topic": "Görsel Promptunun 4 Yapı Taşı: Özne, Eylem, Çevre-Işık ve Stil-Medyum",
        "moduleNumber": 1,
        "moduleName": "Yapay Zeka İle Prompt Uygulamaları Eğitimi",
        "isExam": false
      },
      {
        "hour": 20,
        "topic": "DALL-E 3, Imagen 3, Ideogram ve Leonardo.AI İle Profesyonel Görsel Üretimi",
        "moduleNumber": 1,
        "moduleName": "Yapay Zeka İle Prompt Uygulamaları Eğitimi",
        "isExam": false
      },
      {
        "hour": 21,
        "topic": "Yapay Zekâ İle Video Üretimi: Kamera Hareketleri, Kling AI ve Pika Araçları",
        "moduleNumber": 1,
        "moduleName": "Yapay Zeka İle Prompt Uygulamaları Eğitimi",
        "isExam": false
      },
      {
        "hour": 22,
        "topic": "Kapsamlı Yapay Zekâ ve Prompt Uygulama Projesi (Yazılım, Tasarım & Otomasyon)",
        "moduleNumber": 1,
        "moduleName": "Yapay Zeka İle Prompt Uygulamaları Eğitimi",
        "isExam": false
      },
      {
        "hour": 23,
        "topic": "Yapay Zeka İle Prompt Uygulamaları Eğitimi - Modül Değerlendirme Sınavı (Uygulama)",
        "moduleNumber": 1,
        "moduleName": "Yapay Zeka İle Prompt Uygulamaları Eğitimi",
        "isExam": true
      },
      {
        "hour": 24,
        "topic": "Yapay Zeka İle Prompt Uygulamaları Eğitimi - Modül Değerlendirme Sınavı (Teorik & Değerlendirme)",
        "moduleNumber": 1,
        "moduleName": "Yapay Zeka İle Prompt Uygulamaları Eğitimi",
        "isExam": true
      }
    ]
  }
];

// Başlangıç kursları temizlendi - Kullanıcı kurallara uygun yeni kursları kendisi açacaktır
const INITIAL_COURSES = [];

// Firebase Yapılandırması ve Başlatma
const firebaseConfig = {
  apiKey: "AIzaSyCG2g25Ummwqg7RJE6KSiV-oG5pmvj3rHE",
  authDomain: "mfkurs-41f08.firebaseapp.com",
  projectId: "mfkurs-41f08",
  storageBucket: "mfkurs-41f08.firebasestorage.app",
  messagingSenderId: "909088640661",
  appId: "1:909088640661:web:a54d2ceff3ad06b6e5559c",
  measurementId: "G-2Z3ZK3SSZD"
};

let db = null;
try {
  if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    db = firebase.firestore();
  }
} catch (e) {
  console.warn("Firebase başlatma uyarısı:", e);
}

const STORAGE_KEYS = {
  COURSES: 'kurs_sonu_courses_v8',
  CENTERS: 'kurs_sonu_centers_v4',
  AREAS: 'kurs_sonu_areas_v1',
  TEMPLATES: 'kurs_sonu_templates_v6',
  USERS: 'kurs_sonu_users_v4',
  AUTH_USER: 'kurs_sonu_active_user_v3',
  TODOS: 'kurs_sonu_dev_todos_v1'
};

const DataStore = {
  _knownCourseIds: new Set(),
  _cloudInitialized: false,

  initCloudListeners() {
    if (!db || this._cloudInitialized) return;
    this._cloudInitialized = true;
    console.log("Firebase Bulut Dinleyicileri Başlatılıyor...");

    // 1. Kursları Buluttan Dinle
    db.collection('courses').onSnapshot((snapshot) => {
      const courses = [];
      const idSet = new Set();
      if (!snapshot.empty) {
        snapshot.forEach(doc => {
          const data = doc.data();
          courses.push(data);
          idSet.add(data.id || doc.id);
        });
      }
      this._knownCourseIds = idSet;
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
      if (typeof window.onCloudSync === 'function') {
        window.onCloudSync('courses', courses);
      }
    }, (err) => {
      console.error("Firestore kurs dinleme hatası:", err);
    });

    // 2. Kullanıcıları Buluttan Dinle
    db.collection('users').onSnapshot((snapshot) => {
      if (snapshot.empty) {
        console.log("Bulut veritabanında kullanıcı yok. Varsayılan kullanıcılar yükleniyor...");
        const batch = db.batch();
        DEFAULT_USERS.forEach(u => {
          batch.set(db.collection('users').doc(u.id), u);
        });
        batch.commit().catch(e => console.error("Kullanıcı seed hatası:", e));
        return;
      }
      const users = [];
      snapshot.forEach(doc => {
        const u = doc.data();
        const un = (u.username || '').toLowerCase();
        if (un === 'ozgur' || un === 'onder' || un === 'merve' || un === 'admin' || u.role === 'admin') {
          if (u.role !== 'developer') {
            u.role = 'developer';
            if (db) {
              db.collection('users').doc(u.id || doc.id).update({ role: 'developer' }).catch(e => console.error(e));
            }
          }
        }
        users.push(u);
      });
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      if (typeof window.onCloudSync === 'function') {
        window.onCloudSync('users', users);
      }
    }, (err) => {
      console.error("Firestore kullanıcı dinleme hatası:", err);
    });

    // 3. Merkezleri Buluttan Dinle
    db.collection('settings').doc('centers').onSnapshot((doc) => {
      if (!doc.exists) return;
      const list = doc.data()?.list || [];
      localStorage.setItem(STORAGE_KEYS.CENTERS, JSON.stringify(list));
      if (typeof window.onCloudSync === 'function') {
        window.onCloudSync('centers', list);
      }
    }, (err) => {
      console.error("Firestore merkez dinleme hatası:", err);
    });

    // 4. Şablonları Buluttan Dinle
    db.collection('settings').doc('templates').onSnapshot((doc) => {
      let list = doc.exists ? (doc.data()?.list || []) : [];
      let updated = false;
      if (DEFAULT_COURSE_TEMPLATES && DEFAULT_COURSE_TEMPLATES.length > 0) {
        DEFAULT_COURSE_TEMPLATES.forEach(defTmpl => {
          const idx = list.findIndex(t => t.id === defTmpl.id || (t.code && defTmpl.code && t.code.toUpperCase() === defTmpl.code.toUpperCase()));
          if (idx === -1) {
            list.unshift(defTmpl);
            updated = true;
          } else {
            if (list[idx].moduleCount !== defTmpl.moduleCount || (list[idx].modules && list[idx].modules.length !== defTmpl.modules.length)) {
              list[idx] = { ...list[idx], ...defTmpl };
              updated = true;
            }
          }
        });
        if (updated && db) {
          db.collection('settings').doc('templates').set({ list }).catch(e => console.error("Firestore şablon kayıt:", e));
        }
      }
      localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(list));
      if (typeof window.onCloudSync === 'function') {
        window.onCloudSync('templates', list);
      }
    }, (err) => {
      console.error("Firestore şablon dinleme hatası:", err);
    });

    // 5. Geliştirici Todo Listesini Buluttan Dinle
    db.collection('settings').doc('todos').onSnapshot((doc) => {
      if (!doc.exists) return;
      const list = doc.data()?.list;
      if (Array.isArray(list)) {
        localStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(list));
        if (typeof window.onCloudSync === 'function') {
          window.onCloudSync('todos', list);
        }
      }
    }, (err) => {
      console.error("Firestore todo dinleme hatası:", err);
    });

    // 6. Alanları Buluttan Dinle
    db.collection('settings').doc('areas').onSnapshot((doc) => {
      const data = doc.exists ? doc.data() : null;
      let list = (data && Array.isArray(data.list)) ? data.list : [];
      let updated = false;
      if (DEFAULT_AREAS && DEFAULT_AREAS.length > 0) {
        DEFAULT_AREAS.forEach(defA => {
          const defName = typeof defA === 'string' ? defA : defA.name;
          const exists = list.some(a => (typeof a === 'string' ? a : a.name).toLowerCase() === defName.toLowerCase());
          if (!exists) {
            list.push(defA);
            updated = true;
          }
        });
        if (updated && db) {
          db.collection('settings').doc('areas').set({ list }).catch(e => console.error("Firestore alan kayıt:", e));
        }
      }
      localStorage.setItem(STORAGE_KEYS.AREAS, JSON.stringify(list));
      if (typeof window.onCloudSync === 'function') {
        window.onCloudSync('areas', list);
      }
    }, (err) => {
      console.error("Firestore alan dinleme hatası:", err);
    });
  },

  getUsers() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.USERS);
      let users = raw ? JSON.parse(raw) : null;
      if (!Array.isArray(users) || users.length === 0) {
        users = [...DEFAULT_USERS];
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
        return users;
      }
      // Tüm DEFAULT_USERS kayıtlarının mevcut, şifrelerinin 123 ve rollerinin güncel olduğundan emin ol
      let updated = false;
      DEFAULT_USERS.forEach(defUser => {
        const found = users.find(u => normalizeUsername(u.username) === normalizeUsername(defUser.username));
        if (!found) {
          users.push(defUser);
          updated = true;
        } else {
          if (found.password !== defUser.password || found.role !== defUser.role || found.title !== defUser.title) {
            found.password = defUser.password;
            found.role = defUser.role;
            found.title = defUser.title;
            if (defUser.fullName && (!found.fullName || found.fullName.includes('Kullanıcı'))) {
              found.fullName = defUser.fullName;
            }
            updated = true;
          }
        }
      });
      // Geliştirici rollerini teyit et
      users.forEach(u => {
        const un = (u.username || '').toLowerCase();
        if (u.role !== 'department_head' && u.role !== 'supervisor' && u.role !== 'teacher') {
          if ((un === 'ozgur' || un === 'onder' || un === 'merve' || un === 'admin' || u.role === 'admin') && u.role !== 'developer') {
            u.role = 'developer';
            updated = true;
          }
        }
      });
      if (updated) {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      }
      return users;
    } catch (e) {
      console.error("LocalStorage kullanıcı okuma hatası:", e);
      return DEFAULT_USERS;
    }
  },

  saveUsers(users) {
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      if (db) {
        const batch = db.batch();
        users.forEach(u => {
          if (u && u.id) {
            batch.set(db.collection('users').doc(u.id), u);
          }
        });
        batch.commit().catch(e => console.error("Firestore kullanıcı kayıt hatası:", e));
      }
    } catch (e) {
      console.error("Kullanıcı kaydetme hatası:", e);
    }
  },

  getTodos() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.TODOS);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
      if (parsed && Array.isArray(parsed.list)) return parsed.list;
      return [];
    } catch (e) {
      console.error("LocalStorage todo okuma hatası:", e);
      return [];
    }
  },

  saveTodos(todos) {
    try {
      localStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(todos));
      if (db) {
        db.collection('settings').doc('todos').set({ list: todos }).catch(e => console.error("Firestore todo kaydetme hatası:", e));
      }
    } catch (e) {
      console.error("Todo kaydetme hatası:", e);
    }
  },

  getCourses() {
    try {
      let raw = localStorage.getItem(STORAGE_KEYS.COURSES);
      if (!raw) {
        raw = localStorage.getItem('kurs_sonu_courses_v5') || localStorage.getItem('kurs_sonu_courses_v6');
        if (!raw) {
          localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(INITIAL_COURSES));
          return INITIAL_COURSES;
        }
      }
      const parsed = JSON.parse(raw);
      return parsed.map(c => {
        const moduleCount = c.moduleCount ? Math.max(1, Number(c.moduleCount)) : 1;
        const students = (c.students || []).map(s => {
          const modScores = s.moduleScores || {};
          if (Object.keys(modScores).length === 0 && s.examScore !== null && s.examScore !== undefined) {
            modScores[1] = s.examScore;
          }
          const fullName = s.fullName || `${s.firstName || ''} ${s.lastName || ''}`.trim() || 'İsimsiz Kursiyer';
          const parts = fullName.split(' ');
          const lastName = s.lastName || (parts.length > 1 ? parts[parts.length - 1] : '');
          const firstName = s.firstName || (parts.length > 1 ? parts.slice(0, -1).join(' ') : fullName);

          return {
            ...s,
            firstName,
            lastName,
            fullName,
            absentHours: s.absentHours !== undefined ? Number(s.absentHours) : (s.attendance === 'Devamsız' ? 36 : 0),
            attendance: s.attendance || 'Devamlı',
            attendanceNote: s.attendanceNote || '',
            moduleScores: modScores
          };
        });

        return {
          supervisor: '',
          days: [],
          dailyHours: 4,
          startTime: '',
          endTime: '',
          offDays: [],
          moduleCount,
          ...c,
          students
        };
      });
    } catch (e) {
      console.error("LocalStorage kurs okuma hatası:", e);
      return INITIAL_COURSES;
    }
  },

  saveCourses(courses) {
    try {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
      if (db) {
        const currentIds = new Set();
        courses.forEach(c => {
          if (c && c.id) {
            currentIds.add(c.id);
            db.collection('courses').doc(c.id).set(c).catch(e => console.error("Firestore kurs yazma:", e));
          }
        });
        if (this._knownCourseIds && this._knownCourseIds.size > 0) {
          this._knownCourseIds.forEach(oldId => {
            if (!currentIds.has(oldId)) {
              db.collection('courses').doc(oldId).delete().catch(e => console.error("Firestore kurs silme:", e));
            }
          });
        }
        this._knownCourseIds = currentIds;
      }
    } catch (e) {
      console.error("Kurs kayıt hatası:", e);
    }
  },

  clearAllCourses() {
    try {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify([]));
      localStorage.removeItem('kurs_sonu_courses_v5');
      localStorage.removeItem('kurs_sonu_courses_v6');
      localStorage.removeItem('kurs_sonu_courses_v7');
      if (db) {
        db.collection('courses').get().then(snapshot => {
          if (!snapshot.empty) {
            const batch = db.batch();
            snapshot.forEach(doc => batch.delete(doc.ref));
            return batch.commit();
          }
        }).then(() => {
          console.log("Bulut kurs koleksiyonu tamamen temizlendi.");
        }).catch(e => console.error("Bulut kurs silme hatası:", e));
      }
      this._knownCourseIds = new Set();
    } catch (e) {
      console.error("clearAllCourses hatası:", e);
    }
  },

  getCenters() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CENTERS);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error("LocalStorage merkez okuma hatası:", e);
      return [];
    }
  },

  saveCenters(centers) {
    try {
      localStorage.setItem(STORAGE_KEYS.CENTERS, JSON.stringify(centers));
      if (db) {
        db.collection('settings').doc('centers').set({ list: centers }).catch(e => console.error("Firestore merkez kayıt:", e));
      }
    } catch (e) {
      console.error("Merkez kayıt hatası:", e);
    }
  },

  getAreas() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.AREAS);
      let parsed = [];
      if (raw !== null && raw !== undefined) {
        try { parsed = JSON.parse(raw); } catch (e) {}
      }
      if (!Array.isArray(parsed)) parsed = [];

      let updated = false;
      if (DEFAULT_AREAS && DEFAULT_AREAS.length > 0) {
        DEFAULT_AREAS.forEach(defA => {
          const defName = typeof defA === 'string' ? defA : defA.name;
          const exists = parsed.some(a => (typeof a === 'string' ? a : a.name).toLowerCase() === defName.toLowerCase());
          if (!exists) {
            parsed.push(defA);
            updated = true;
          }
        });
      }
      if (updated || raw === null || raw === undefined) {
        localStorage.setItem(STORAGE_KEYS.AREAS, JSON.stringify(parsed));
      }
      return parsed;
    } catch (e) {
      console.error("LocalStorage alan okuma hatası:", e);
      return DEFAULT_AREAS || [];
    }
  },

  saveAreas(areas) {
    try {
      localStorage.setItem(STORAGE_KEYS.AREAS, JSON.stringify(areas));
      if (db) {
        db.collection('settings').doc('areas').set({ list: areas }).catch(e => console.error("Firestore alan kayıt:", e));
      }
    } catch (e) {
      console.error("Alan kayıt hatası:", e);
    }
  },

  getCourseTemplates() {
    try {
      let raw = localStorage.getItem(STORAGE_KEYS.TEMPLATES);
      if (!raw) {
        raw = localStorage.getItem('kurs_sonu_templates_v3') || localStorage.getItem('kurs_sonu_templates_v4') || localStorage.getItem('kurs_sonu_templates_v5');
      }
      let parsed = [];
      if (raw) {
        try { parsed = JSON.parse(raw); } catch (e) {}
      }
      if (!Array.isArray(parsed)) parsed = [];

      let updated = false;
      if (DEFAULT_COURSE_TEMPLATES && DEFAULT_COURSE_TEMPLATES.length > 0) {
        DEFAULT_COURSE_TEMPLATES.forEach(defTmpl => {
          const idx = parsed.findIndex(t => t.id === defTmpl.id || (t.code && defTmpl.code && t.code.toUpperCase() === defTmpl.code.toUpperCase()));
          if (idx === -1) {
            parsed.unshift(defTmpl);
            updated = true;
          } else {
            if (parsed[idx].moduleCount !== defTmpl.moduleCount || (parsed[idx].modules && parsed[idx].modules.length !== defTmpl.modules.length)) {
              parsed[idx] = { ...parsed[idx], ...defTmpl };
              updated = true;
            }
          }
        });
      }
      // Kursları her zaman Türkçe alfabetik sıraya göre (A-Z) sırala
      parsed.sort((a, b) => (a.name || '').localeCompare(b.name || '', 'tr', { sensitivity: 'base' }));

      if (updated || !raw) {
        localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(parsed));
      }

      return parsed.map(t => ({
        moduleCount: t.moduleCount ? Math.max(1, Number(t.moduleCount)) : 1,
        ...t
      })).sort((a, b) => (a.name || '').localeCompare(b.name || '', 'tr', { sensitivity: 'base' }));
    } catch (e) {
      console.error("LocalStorage şablon okuma hatası:", e);
      return (DEFAULT_COURSE_TEMPLATES || []).slice().sort((a, b) => (a.name || '').localeCompare(b.name || '', 'tr', { sensitivity: 'base' }));
    }
  },

  saveCourseTemplates(templates) {
    try {
      const sortedTemplates = (templates || []).slice().sort((a, b) => (a.name || '').localeCompare(b.name || '', 'tr', { sensitivity: 'base' }));
      localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(sortedTemplates));
      if (db) {
        db.collection('settings').doc('templates').set({ list: sortedTemplates }).catch(e => console.error("Firestore şablon kayıt:", e));
      }
    } catch (e) {
      console.error("Şablon kayıt hatası:", e);
    }
  },

  getActiveUser() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
      const user = raw ? JSON.parse(raw) : null;
      if (user) {
        const un = (user.username || '').toLowerCase();
        if (un === 'ozgur' || un === 'onder' || un === 'merve' || un === 'admin' || user.role === 'admin') {
          const def = DEFAULT_USERS.find(u => u.username === user.username);
          let changed = false;
          if (def && user.title !== def.title) {
            user.title = def.title;
            changed = true;
          }
          if (user.role !== 'developer') {
            user.role = 'developer';
            changed = true;
          }
          if (changed) {
            localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
          }
        }
      }
      return user;
    } catch (e) {
      return null;
    }
  },

  setActiveUser(user) {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
      }
    } catch (e) {
      console.error("Auth saklama hatası:", e);
    }
  }
};

