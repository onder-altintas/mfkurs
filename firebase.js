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
    id: "tmpl_canva_ileri_duzey",
    name: "Canva İle Dijital Tasarım Eğitimi (İleri Düzey)",
    code: "BT-CANVA-60",
    category: "Bilişim Teknolojileri",
    area: "Bilişim Teknolojileri",
    totalHours: 60,
    moduleCount: 4,
    description: "T.C. Millî Eğitim Bakanlığı Hayat Boyu Öğrenme Genel Müdürlüğü Bilişim Teknolojileri Alanı - Canva İle Dijital Tasarım Eğitimi (İleri Düzey) Kurs Programı. Günde en fazla 4 ders saati uygulanır.",
    modules: [
      {
        id: "mod_canva_1",
        number: 1,
        name: "Canva’da Yapay Zekâ Uygulamaları",
        totalHours: 15,
        lessonHours: 13,
        examHours: 2,
        topics: [
          "Magic Write (Sihirli Yazı) İle Metin Yazma ve Prompt Teknikleri",
          "Metinden Görsel Oluşturma (AI Görsel Üretim Araçları)",
          "AI İle Otomatik Tasarım ve Şablon Oluşturma",
          "İstenmeyen Objeleri Kaldırma (Magic Eraser)",
          "Obje Değiştirme (Magic Replace Teknikleri)",
          "Fotoğraflardan Yazı ve Nesne Ayırt Etme (OCR Teknolojisi)",
          "Fotoğraflarda Nesne Algılama ve Seçim Araçları",
          "Yapay Zekâ Destekli Animasyon Geçişleri",
          "Sunumlarda AI İle Hareket Efektleri Kullanımı",
          "Canva’da AI İle Video Senaryosu Yazma",
          "Yapay Zekâ İle Senaryo Üzerinden Video Oluşturma",
          "Yapay Zekâ Destekli Tasarım ve Görsel Proje Uygulaması",
          "Yapay Zekâ Destekli Video Kurgusu ve İçerik Üretimi Pratiği"
        ]
      },
      {
        id: "mod_canva_2",
        number: 2,
        name: "İleri Seviye Canva Araçları",
        totalHours: 15,
        lessonHours: 13,
        examHours: 2,
        topics: [
          "Görsel Yerleştirme ve Profesyonel Sunum Örnekleri (Mockups)",
          "Kurumsal Marka Kiti Oluşturma (Yazı Tipi, Renk Paleti, Logo Ekleme)",
          "Marka Kiti Standartlarının Tasarımlara Uygulanması",
          "Canva İle Etkili ve Etkileşimli Sunum Hazırlama",
          "Canva Planlayıcı Aracı İle Sosyal Medya Takvimi Hazırlama",
          "Tasarım İçeriğini Dil Bazlı Dönüştürme (Çeviri Aracı)",
          "Konuya ve Hedef Kitleye Göre Metin Oluşturma (Magic Write)",
          "Görseldeki Unsurları Değiştirme (Magic Edit İleri Teknikleri)",
          "Objeleri Silme ve Kusursuz Temizleme (Magic Eraser)",
          "Fotoğraflarda Hassas Nesne Seçme ve Arka Plan Ayrıştırma",
          "AI Destekli Sunum Tasarımı (Magic Presentation)",
          "Sosyal Medya ve Dijital İçerik Kiti Hazırlama Uygulaması",
          "İleri Seviye Canva Araçlarıyla Kapsamlı Tasarım Projesi"
        ]
      },
      {
        id: "mod_canva_3",
        number: 3,
        name: "İleri Seviye Canva Uygulamaları",
        totalHours: 20,
        lessonHours: 18,
        examHours: 2,
        topics: [
          "Video Efekti Uygulamaları ve Paint Smoke Efektine Giriş",
          "Video Tasarımlarında Özel Boya ve Duman Efektleri Geliştirme",
          "Video Sahne Geçişleri ve Zaman Çizelgesi (Timeline) Yönetimi",
          "Çok Katmanlı Video Kurgusu ve Ses Efekti Senkronizasyonu",
          "Katmanlı Sunum Tasarımı Mantığı ve Derinlik Efektleri",
          "İleri Katman Yönetimi ve Katman Sıralama İpuçları",
          "Metin İçine Katmanlı Görsel Ekleme Teknikleri (Text Masking)",
          "Tipografi Odaklı Katmanlı Görsel Kompozisyonları",
          "Çift Pozlama ve Tipografik Katman Tasarımları",
          "Görselleri Vektörel Tasarıma Hazırlama Süreçleri",
          "Görselleri Vektör Logo Tasarımına Dönüştürme (SVG Formatı)",
          "Şeffaf Arka Planlı Kurumsal Vektör Logo Üretimi",
          "Dijital Reklam ve Sosyal Medya İçin Hareketli Afiş Tasarımı",
          "Dinamik İnfografik ve Veri Görselleştirme Tasarımları",
          "Web ve Mobil İçin Duyarlı (Responsive) Tasarım Varyasyonları",
          "İleri Seviye Tasarım ve Video Proje Uygulaması - 1",
          "İleri Seviye Tasarım ve Video Proje Uygulaması - 2",
          "İleri Seviye Tasarım ve Video Proje Uygulaması - 3"
        ]
      },
      {
        id: "mod_canva_4",
        number: 4,
        name: "İş Birliği ve Proje Paylaşımı",
        totalHours: 10,
        lessonHours: 8,
        examHours: 2,
        topics: [
          "Canva'da Takım Oluşturma ve Üye Yönetimi",
          "Kurumsal Marka Kitini Takımla Paylaşma ve Eşzamanlı Kullanım",
          "Bağlantı İle Paylaşma, Görüntüleme ve Düzenleme Yetkileri",
          "Gerçek Zamanlı Ortak Çalışma ve Canlı Yorumlama Pratiği",
          "Sunumlara, Afişlere ve Formlara Bağlantı Ekleme (Dinamik QR Kod Üretme)",
          "Baskı ve Dijital İçin Proje Çıktısı Standartları (Baskı PDF, Yüksek Çözünürlüklü PNG/JPEG)",
          "Video ve Vektörel Dışa Aktarma (MP4 Video, Şeffaf SVG Vektör Çıktısı)",
          "Ortak Takım Projesi Sonuç Sunumu ve Kalite Değerlendirmesi"
        ]
      }
    ],
    syllabus: [
      // 1. Modül: Canva’da Yapay Zekâ Uygulamaları (15 Saat)
      { hour: 1, topic: "Magic Write (Sihirli Yazı) İle Metin Yazma ve Prompt Teknikleri", moduleNumber: 1, moduleName: "Canva’da Yapay Zekâ Uygulamaları", isExam: false },
      { hour: 2, topic: "Metinden Görsel Oluşturma (AI Görsel Üretim Araçları)", moduleNumber: 1, moduleName: "Canva’da Yapay Zekâ Uygulamaları", isExam: false },
      { hour: 3, topic: "AI İle Otomatik Tasarım ve Şablon Oluşturma", moduleNumber: 1, moduleName: "Canva’da Yapay Zekâ Uygulamaları", isExam: false },
      { hour: 4, topic: "İstenmeyen Objeleri Kaldırma (Magic Eraser)", moduleNumber: 1, moduleName: "Canva’da Yapay Zekâ Uygulamaları", isExam: false },
      { hour: 5, topic: "Obje Değiştirme (Magic Replace Teknikleri)", moduleNumber: 1, moduleName: "Canva’da Yapay Zekâ Uygulamaları", isExam: false },
      { hour: 6, topic: "Fotoğraflardan Yazı ve Nesne Ayırt Etme (OCR Teknolojisi)", moduleNumber: 1, moduleName: "Canva’da Yapay Zekâ Uygulamaları", isExam: false },
      { hour: 7, topic: "Fotoğraflarda Nesne Algılama ve Seçim Araçları", moduleNumber: 1, moduleName: "Canva’da Yapay Zekâ Uygulamaları", isExam: false },
      { hour: 8, topic: "Yapay Zekâ Destekli Animasyon Geçişleri", moduleNumber: 1, moduleName: "Canva’da Yapay Zekâ Uygulamaları", isExam: false },
      { hour: 9, topic: "Sunumlarda AI İle Hareket Efektleri Kullanımı", moduleNumber: 1, moduleName: "Canva’da Yapay Zekâ Uygulamaları", isExam: false },
      { hour: 10, topic: "Canva’da AI İle Video Senaryosu Yazma", moduleNumber: 1, moduleName: "Canva’da Yapay Zekâ Uygulamaları", isExam: false },
      { hour: 11, topic: "Yapay Zekâ İle Senaryo Üzerinden Video Oluşturma", moduleNumber: 1, moduleName: "Canva’da Yapay Zekâ Uygulamaları", isExam: false },
      { hour: 12, topic: "Yapay Zekâ Destekli Tasarım ve Görsel Proje Uygulaması", moduleNumber: 1, moduleName: "Canva’da Yapay Zekâ Uygulamaları", isExam: false },
      { hour: 13, topic: "Yapay Zekâ Destekli Video Kurgusu ve İçerik Üretimi Pratiği", moduleNumber: 1, moduleName: "Canva’da Yapay Zekâ Uygulamaları", isExam: false },
      { hour: 14, topic: "Canva’da Yapay Zekâ Uygulamaları - Modül Değerlendirme Sınavı (Uygulama)", moduleNumber: 1, moduleName: "Canva’da Yapay Zekâ Uygulamaları", isExam: true },
      { hour: 15, topic: "Canva’da Yapay Zekâ Uygulamaları - Modül Değerlendirme Sınavı (Teorik & Değerlendirme)", moduleNumber: 1, moduleName: "Canva’da Yapay Zekâ Uygulamaları", isExam: true },

      // 2. Modül: İleri Seviye Canva Araçları (15 Saat)
      { hour: 16, topic: "Görsel Yerleştirme ve Profesyonel Sunum Örnekleri (Mockups)", moduleNumber: 2, moduleName: "İleri Seviye Canva Araçları", isExam: false },
      { hour: 17, topic: "Kurumsal Marka Kiti Oluşturma (Yazı Tipi, Renk Paleti, Logo Ekleme)", moduleNumber: 2, moduleName: "İleri Seviye Canva Araçları", isExam: false },
      { hour: 18, topic: "Marka Kiti Standartlarının Tasarımlara Uygulanması", moduleNumber: 2, moduleName: "İleri Seviye Canva Araçları", isExam: false },
      { hour: 19, topic: "Canva İle Etkili ve Etkileşimli Sunum Hazırlama", moduleNumber: 2, moduleName: "İleri Seviye Canva Araçları", isExam: false },
      { hour: 20, topic: "Canva Planlayıcı Aracı İle Sosyal Medya Takvimi Hazırlama", moduleNumber: 2, moduleName: "İleri Seviye Canva Araçları", isExam: false },
      { hour: 21, topic: "Tasarım İçeriğini Dil Bazlı Dönüştürme (Çeviri Aracı)", moduleNumber: 2, moduleName: "İleri Seviye Canva Araçları", isExam: false },
      { hour: 22, topic: "Konuya ve Hedef Kitleye Göre Metin Oluşturma (Magic Write)", moduleNumber: 2, moduleName: "İleri Seviye Canva Araçları", isExam: false },
      { hour: 23, topic: "Görseldeki Unsurları Değiştirme (Magic Edit İleri Teknikleri)", moduleNumber: 2, moduleName: "İleri Seviye Canva Araçları", isExam: false },
      { hour: 24, topic: "Objeleri Silme ve Kusursuz Temizleme (Magic Eraser)", moduleNumber: 2, moduleName: "İleri Seviye Canva Araçları", isExam: false },
      { hour: 25, topic: "Fotoğraflarda Hassas Nesne Seçme ve Arka Plan Ayrıştırma", moduleNumber: 2, moduleName: "İleri Seviye Canva Araçları", isExam: false },
      { hour: 26, topic: "AI Destekli Sunum Tasarımı (Magic Presentation)", moduleNumber: 2, moduleName: "İleri Seviye Canva Araçları", isExam: false },
      { hour: 27, topic: "Sosyal Medya ve Dijital İçerik Kiti Hazırlama Uygulaması", moduleNumber: 2, moduleName: "İleri Seviye Canva Araçları", isExam: false },
      { hour: 28, topic: "İleri Seviye Canva Araçlarıyla Kapsamlı Tasarım Projesi", moduleNumber: 2, moduleName: "İleri Seviye Canva Araçları", isExam: false },
      { hour: 29, topic: "İleri Seviye Canva Araçları - Modül Değerlendirme Sınavı (Uygulama)", moduleNumber: 2, moduleName: "İleri Seviye Canva Araçları", isExam: true },
      { hour: 30, topic: "İleri Seviye Canva Araçları - Modül Değerlendirme Sınavı (Teorik & Değerlendirme)", moduleNumber: 2, moduleName: "İleri Seviye Canva Araçları", isExam: true },

      // 3. Modül: İleri Seviye Canva Uygulamaları (20 Saat)
      { hour: 31, topic: "Video Efekti Uygulamaları ve Paint Smoke Efektine Giriş", moduleNumber: 3, moduleName: "İleri Seviye Canva Uygulamaları", isExam: false },
      { hour: 32, topic: "Video Tasarımlarında Özel Boya ve Duman Efektleri Geliştirme", moduleNumber: 3, moduleName: "İleri Seviye Canva Uygulamaları", isExam: false },
      { hour: 33, topic: "Video Sahne Geçişleri ve Zaman Çizelgesi (Timeline) Yönetimi", moduleNumber: 3, moduleName: "İleri Seviye Canva Uygulamaları", isExam: false },
      { hour: 34, topic: "Çok Katmanlı Video Kurgusu ve Ses Efekti Senkronizasyonu", moduleNumber: 3, moduleName: "İleri Seviye Canva Uygulamaları", isExam: false },
      { hour: 35, topic: "Katmanlı Sunum Tasarımı Mantığı ve Derinlik Efektleri", moduleNumber: 3, moduleName: "İleri Seviye Canva Uygulamaları", isExam: false },
      { hour: 36, topic: "İleri Katman Yönetimi ve Katman Sıralama İpuçları", moduleNumber: 3, moduleName: "İleri Seviye Canva Uygulamaları", isExam: false },
      { hour: 37, topic: "Metin İçine Katmanlı Görsel Ekleme Teknikleri (Text Masking)", moduleNumber: 3, moduleName: "İleri Seviye Canva Uygulamaları", isExam: false },
      { hour: 38, topic: "Tipografi Odaklı Katmanlı Görsel Kompozisyonları", moduleNumber: 3, moduleName: "İleri Seviye Canva Uygulamaları", isExam: false },
      { hour: 39, topic: "Çift Pozlama ve Tipografik Katman Tasarımları", moduleNumber: 3, moduleName: "İleri Seviye Canva Uygulamaları", isExam: false },
      { hour: 40, topic: "Görselleri Vektörel Tasarıma Hazırlama Süreçleri", moduleNumber: 3, moduleName: "İleri Seviye Canva Uygulamaları", isExam: false },
      { hour: 41, topic: "Görselleri Vektör Logo Tasarımına Dönüştürme (SVG Formatı)", moduleNumber: 3, moduleName: "İleri Seviye Canva Uygulamaları", isExam: false },
      { hour: 42, topic: "Şeffaf Arka Planlı Kurumsal Vektör Logo Üretimi", moduleNumber: 3, moduleName: "İleri Seviye Canva Uygulamaları", isExam: false },
      { hour: 43, topic: "Dijital Reklam ve Sosyal Medya İçin Hareketli Afiş Tasarımı", moduleNumber: 3, moduleName: "İleri Seviye Canva Uygulamaları", isExam: false },
      { hour: 44, topic: "Dinamik İnfografik ve Veri Görselleştirme Tasarımları", moduleNumber: 3, moduleName: "İleri Seviye Canva Uygulamaları", isExam: false },
      { hour: 45, topic: "Web ve Mobil İçin Duyarlı (Responsive) Tasarım Varyasyonları", moduleNumber: 3, moduleName: "İleri Seviye Canva Uygulamaları", isExam: false },
      { hour: 46, topic: "İleri Seviye Tasarım ve Video Proje Uygulaması - 1", moduleNumber: 3, moduleName: "İleri Seviye Canva Uygulamaları", isExam: false },
      { hour: 47, topic: "İleri Seviye Tasarım ve Video Proje Uygulaması - 2", moduleNumber: 3, moduleName: "İleri Seviye Canva Uygulamaları", isExam: false },
      { hour: 48, topic: "İleri Seviye Tasarım ve Video Proje Uygulaması - 3", moduleNumber: 3, moduleName: "İleri Seviye Canva Uygulamaları", isExam: false },
      { hour: 49, topic: "İleri Seviye Canva Uygulamaları - Modül Değerlendirme Sınavı (Uygulama)", moduleNumber: 3, moduleName: "İleri Seviye Canva Uygulamaları", isExam: true },
      { hour: 50, topic: "İleri Seviye Canva Uygulamaları - Modül Değerlendirme Sınavı (Teorik & Değerlendirme)", moduleNumber: 3, moduleName: "İleri Seviye Canva Uygulamaları", isExam: true },

      // 4. Modül: İş Birliği ve Proje Paylaşımı (10 Saat)
      { hour: 51, topic: "Canva'da Takım Oluşturma ve Üye Yönetimi", moduleNumber: 4, moduleName: "İş Birliği ve Proje Paylaşımı", isExam: false },
      { hour: 52, topic: "Kurumsal Marka Kitini Takımla Paylaşma ve Eşzamanlı Kullanım", moduleNumber: 4, moduleName: "İş Birliği ve Proje Paylaşımı", isExam: false },
      { hour: 53, topic: "Bağlantı İle Paylaşma, Görüntüleme ve Düzenleme Yetkileri", moduleNumber: 4, moduleName: "İş Birliği ve Proje Paylaşımı", isExam: false },
      { hour: 54, topic: "Gerçek Zamanlı Ortak Çalışma ve Canlı Yorumlama Pratiği", moduleNumber: 4, moduleName: "İş Birliği ve Proje Paylaşımı", isExam: false },
      { hour: 55, topic: "Sunumlara, Afişlere ve Formlara Bağlantı Ekleme (Dinamik QR Kod Üretme)", moduleNumber: 4, moduleName: "İş Birliği ve Proje Paylaşımı", isExam: false },
      { hour: 56, topic: "Baskı ve Dijital İçin Proje Çıktısı Standartları (Baskı PDF, Yüksek Çözünürlüklü PNG/JPEG)", moduleNumber: 4, moduleName: "İş Birliği ve Proje Paylaşımı", isExam: false },
      { hour: 57, topic: "Video ve Vektörel Dışa Aktarma (MP4 Video, Şeffaf SVG Vektör Çıktısı)", moduleNumber: 4, moduleName: "İş Birliği ve Proje Paylaşımı", isExam: false },
      { hour: 58, topic: "Ortak Takım Projesi Sonuç Sunumu ve Kalite Değerlendirmesi", moduleNumber: 4, moduleName: "İş Birliği ve Proje Paylaşımı", isExam: false },
      { hour: 59, topic: "İş Birliği ve Proje Paylaşımı - Modül Değerlendirme Sınavı (Uygulama)", moduleNumber: 4, moduleName: "İş Birliği ve Proje Paylaşımı", isExam: true },
      { hour: 60, topic: "İş Birliği ve Proje Paylaşımı - Modül Değerlendirme Sınavı (Teorik & Değerlendirme)", moduleNumber: 4, moduleName: "İş Birliği ve Proje Paylaşımı", isExam: true }
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
          const exists = list.some(t => t.id === defTmpl.id || (t.code && defTmpl.code && t.code.toUpperCase() === defTmpl.code.toUpperCase()));
          if (!exists) {
            list.unshift(defTmpl);
            updated = true;
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
        if ((un === 'ozgur' || un === 'onder' || un === 'merve' || un === 'admin' || u.role === 'admin') && u.role !== 'developer') {
          u.role = 'developer';
          updated = true;
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
          const exists = parsed.some(t => t.id === defTmpl.id || (t.code && defTmpl.code && t.code.toUpperCase() === defTmpl.code.toUpperCase()));
          if (!exists) {
            parsed.unshift(defTmpl);
            updated = true;
          }
        });
      }
      if (updated || !raw) {
        localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(parsed));
      }

      return parsed.map(t => ({
        moduleCount: t.moduleCount ? Math.max(1, Number(t.moduleCount)) : 1,
        ...t
      }));
    } catch (e) {
      console.error("LocalStorage şablon okuma hatası:", e);
      return DEFAULT_COURSE_TEMPLATES || [];
    }
  },

  saveCourseTemplates(templates) {
    try {
      localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(templates));
      if (db) {
        db.collection('settings').doc('templates').set({ list: templates }).catch(e => console.error("Firestore şablon kayıt:", e));
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

