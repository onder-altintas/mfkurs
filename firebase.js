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
    id: "user_1",
    username: "egitmen1",
    password: "123456",
    fullName: "Ahmet Yılmaz",
    role: "teacher",
    title: "Bilişim Teknolojileri Eğitmeni",
    area: "Bilişim Teknolojileri",
    institution: "Kadıköy Halk Eğitimi Merkezi",
    email: "ahmet.yilmaz@meb.k12.tr",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "user_2",
    username: "egitmen2",
    password: "123456",
    fullName: "Ayşe Demir",
    role: "teacher",
    title: "El Sanatları ve Tasarım Eğitmeni",
    area: "El Sanatları",
    institution: "Üsküdar Mesleki Eğitim Merkezi",
    email: "ayse.demir@meb.k12.tr",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
  }
];

// Kurs Merkezleri Tanımları (Merkez İsmi ve Tercihen Sorumlu Bilgisi)
const DEFAULT_CENTERS = [
  { id: "center_1", name: "Kadıköy Halk Eğitimi Merkezi", supervisor: "Kemal Demir (Müdür Yrd.)" },
  { id: "center_2", name: "Üsküdar Mesleki Eğitim Merkezi", supervisor: "Mehmet Ali Şahin (Müdür Yrd.)" },
  { id: "center_3", name: "Şişli Halk Eğitimi Merkezi", supervisor: "" }
];

// Kurs Alanları / Branş Tanımları (Temel başlangıç branşları)
const DEFAULT_AREAS = [
  { id: "area_1", name: "Bilişim Teknolojileri" },
  { id: "area_2", name: "Kişisel Gelişim" },
  { id: "area_3", name: "El Sanatları" },
  { id: "area_4", name: "Yabancı Dil" },
  { id: "area_5", name: "Mesleki Eğitim" }
];

// Resmi Kurs ve Saatlik Konu / Müfredat Dağılım Şablonları (Modüler Yapı)
const DEFAULT_COURSE_TEMPLATES = [
  {
    id: "tmpl_1",
    name: "Bilgisayar İşletmenliği (Operatörlüğü)",
    code: "BLG-160",
    category: "Bilişim Teknolojileri",
    totalHours: 160,
    moduleCount: 4,
    description: "Temel bilgisayar donanımı, işletim sistemi, ofis programları (Word, Excel, PowerPoint) ve internet güvenliği.",
    modules: [
      {
        id: "mod_blg_1",
        number: 1,
        name: "Bilgisayara Giriş ve İşletim Sistemleri",
        totalHours: 40,
        lessonHours: 38,
        examHours: 2,
        topics: [
          "Bilgisayara Giriş: Temel donanım birimleri (Kasa, Monitör, Klavye, Fare)",
          "Donanım parçalarının tanıtımı (Anakart, İşlemci, RAM, Sabit Disk)",
          "Giriş-Çıkış birimleri ve harici depolama aygıtları kullanımı",
          "İşletim Sistemleri kavramı ve Windows ortamına giriş",
          "Masaüstü, Görev Çubuğu, Başlat Menüsü ve pencere yönetimi",
          "Dosya ve Klasör yönetimi: Oluşturma, adlandırma, kopyalama ve taşıma",
          "Denetim Masası ve Sistem Ayarlarının yapılandırılması",
          "Donanım ve yazılım sorunlarını giderme temel yöntemleri"
        ]
      },
      {
        id: "mod_blg_2",
        number: 2,
        name: "Kelime İşlemci (Word)",
        totalHours: 40,
        lessonHours: 38,
        examHours: 2,
        topics: [
          "Kelime İşlemci (Word) Programına Giriş ve Temel Arayüz",
          "Metin yazma, biçimlendirme, yazı tipi ve paragraf ayarları",
          "Tablo ekleme, satır/sütun düzenleme ve tablo biçimlendirme",
          "Resim, şekil, simge ve sayfa numarası ekleme",
          "Sayfa yapısı, kenar boşlukları ve yazdırma ayarları",
          "Üstbilgi, altbilgi ve içindekiler tablosu oluşturma"
        ]
      },
      {
        id: "mod_blg_3",
        number: 3,
        name: "Elektronik Tablolama (Excel)",
        totalHours: 40,
        lessonHours: 38,
        examHours: 2,
        topics: [
          "Elektronik Tablolama (Excel) Programına Giriş ve Hücre Yapısı",
          "Hücre veri türleri, formül yazma ve otomatik doldurma",
          "Temel Matematiksel Formüller (TOPLA, ORTALAMA, EĞER)",
          "Mantıksal ve Arama Formülleri (DÜŞEYARA, ÇOKEĞERSAY)",
          "Tablo filtreleme, sıralama ve veri doğrulama teknikleri",
          "Grafik oluşturma, biçimlendirme ve raporlama teknikleri"
        ]
      },
      {
        id: "mod_blg_4",
        number: 4,
        name: "Sunu Hazırlama ve İnternet Güvenliği",
        totalHours: 40,
        lessonHours: 38,
        examHours: 2,
        topics: [
          "Sunu Programı (PowerPoint) Giriş ve Slayt Düzenleri",
          "Slayt geçişleri, animasyonlar ve multimedya ekleme",
          "İnternet Tarayıcıları, Arama Motorları ve e-Devlet Kullanımı",
          "e-Posta Yönetimi, dosya ekleme ve bulut depolama",
          "Siber Güvenlik, parola güvenliği ve zararlı yazılımlardan korunma",
          "Bilişim Etiği, telif hakları ve dijital vatandaşlık"
        ]
      }
    ],
    syllabus: []
  },
  {
    id: "tmpl_2",
    name: "Diksiyon ve Etkili İletişim",
    code: "DKS-64",
    category: "Kişisel Gelişim",
    totalHours: 64,
    moduleCount: 2,
    description: "Türkçenin doğru, anlaşılır ve etkili konuşulması, doğru nefes alma, tonlama ve beden dili eğitimi.",
    modules: [
      {
        id: "mod_dks_1",
        number: 1,
        name: "Doğru Nefes Alma ve Ses Organları",
        totalHours: 32,
        lessonHours: 30,
        examHours: 2,
        topics: [
          "İletişimin Temelleri ve Diksiyonun Önemi",
          "Doğru Nefes Alma ve Diyafram Egzersizleri",
          "Ses Organları ve Artikülasyon (Boğumlanma) Çalışmaları",
          "Ünlülerin (Sesli Harfler) Doğru Çıkarılışı ve Boğumlanması",
          "Ünsüzlerin (Sessiz Harfler) Doğru Çıkarılışı ve Tembelliklerin Giderilmesi"
        ]
      },
      {
        id: "mod_dks_2",
        number: 2,
        name: "Beden Dili, Vurgu ve Sunum Becerileri",
        totalHours: 32,
        lessonHours: 30,
        examHours: 2,
        topics: [
          "Türkçede Vurgu Kuralları (Kelime Vurgusu, Cümle Vurgusu)",
          "Ulama, Durak ve Tonlama Teknikleri",
          "Tekerleme Çalışmaları ve Hızlı/Akıcı Konuşma Pratikleri",
          "Beden Dili, Jest ve Mimiklerin Doğru Kullanımı",
          "Topluluk Önünde Konuşma ve Heyecan Kontrolü",
          "Hazırlıksız Konuşma Becerisi ve Doğaçlama Sunumlar"
        ]
      }
    ],
    syllabus: []
  },
  {
    id: "tmpl_3",
    name: "Dekoratif Ahşap Süsleme",
    code: "AHS-140",
    category: "El Sanatları",
    totalHours: 140,
    moduleCount: 2,
    description: "Ahşap yüzey hazırlığı, zımparalama, astar boya, transfer, dekupaj, eskitme ve vernikleme teknikleri.",
    modules: [
      {
        id: "mod_ahs_1",
        number: 1,
        name: "Ahşap Yüzey Hazırlığı ve Temel Boyama",
        totalHours: 70,
        lessonHours: 68,
        examHours: 2,
        topics: [
          "Ahşap Süslemede Kullanılan Araç, Gereç ve Güvenlik Kuralları",
          "Ham Ahşap Yüzeylerin Hazırlanması ve Zımpara Teknikleri",
          "Astar Boya Uygulaması ve Zemin Boyama Teknikleri",
          "Fırça Kullanımı, Süngerleme ve Düz Renk Boyama Pratiği"
        ]
      },
      {
        id: "mod_ahs_2",
        number: 2,
        name: "Transfer, Dekupaj, Eskitme ve Vernikleme",
        totalHours: 70,
        lessonHours: 68,
        examHours: 2,
        topics: [
          "Dekupaj Kağıdı ve Pirinç Kağıt Yapıştırma Teknikleri",
          "Kolay Transfer ve Stencil (Şablon) Boyama Uygulamaları",
          "Rölyef Pasta ile Boyutlu Desen ve Doku Oluşturma",
          "Budak ve Doku Tarakları ile Efekt Verme",
          "Eskitme Teknikleri (Antik Eskitme, Mum Eskitme, Kuru Fırça)",
          "Çatlatma Teknikleri (Tek Adım ve Çift Adım Çatlatma)",
          "Ahşap Koruyucu Vernik Çeşitleri ve Vernikleme İşlemi"
        ]
      }
    ],
    syllabus: []
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
        if (un === 'ozgur' || un === 'onder' || un === 'admin' || u.role === 'admin') {
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
      if (!doc.exists) {
        db.collection('settings').doc('centers').set({ list: DEFAULT_CENTERS }).catch(e => console.error(e));
        return;
      }
      const list = doc.data()?.list || DEFAULT_CENTERS;
      localStorage.setItem(STORAGE_KEYS.CENTERS, JSON.stringify(list));
      if (typeof window.onCloudSync === 'function') {
        window.onCloudSync('centers', list);
      }
    }, (err) => {
      console.error("Firestore merkez dinleme hatası:", err);
    });

    // 4. Şablonları Buluttan Dinle
    db.collection('settings').doc('templates').onSnapshot((doc) => {
      if (!doc.exists) {
        db.collection('settings').doc('templates').set({ list: DEFAULT_COURSE_TEMPLATES }).catch(e => console.error(e));
        return;
      }
      const list = doc.data()?.list || DEFAULT_COURSE_TEMPLATES;
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
      if (!doc.exists) {
        db.collection('settings').doc('areas').set({ list: DEFAULT_AREAS }).catch(e => console.error(e));
        return;
      }
      const data = doc.data();
      const list = (data && Array.isArray(data.list)) ? data.list : DEFAULT_AREAS;
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
      // Tüm DEFAULT_USERS kayıtlarının (Özgür, Önder dahil) mevcut olduğundan emin ol
      let updated = false;
      DEFAULT_USERS.forEach(defUser => {
        const found = users.find(u => normalizeUsername(u.username) === normalizeUsername(defUser.username));
        if (!found) {
          users.push(defUser);
          updated = true;
        } else if (defUser.username === 'ozgur' || defUser.username === 'onder' || defUser.username === 'admin') {
          if (found.password !== defUser.password || found.role !== defUser.role || found.title !== defUser.title) {
            found.password = defUser.password;
            found.role = defUser.role;
            found.title = defUser.title;
            updated = true;
          }
        }
      });
      // Eski admin rollerini developer olarak güncelle
      users.forEach(u => {
        const un = (u.username || '').toLowerCase();
        if ((un === 'ozgur' || un === 'onder' || un === 'admin' || u.role === 'admin') && u.role !== 'developer') {
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
        const initialTodos = [
          {
            id: 'todo_1',
            text: 'Kurs sonu evraklarının MEB standartlarına uygunluğunu kontrol et',
            assignee: 'Önder',
            priority: 'normal',
            completed: true,
            createdAt: new Date().toISOString(),
            createdBy: 'Önder'
          },
          {
            id: 'todo_2',
            text: 'Modül değerlendirme çizelgesi tek sayfa baskı çıktısını test et',
            assignee: 'Özgür',
            priority: 'urgent',
            completed: true,
            createdAt: new Date().toISOString(),
            createdBy: 'Özgür'
          },
          {
            id: 'todo_3',
            text: 'Yeni modül ve sınav alanlarının eklenmesini gözden geçir',
            assignee: 'Ortak',
            priority: 'normal',
            completed: false,
            createdAt: new Date().toISOString(),
            createdBy: 'Önder'
          }
        ];
        localStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(initialTodos));
        return initialTodos;
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
        localStorage.setItem(STORAGE_KEYS.CENTERS, JSON.stringify(DEFAULT_CENTERS));
        return DEFAULT_CENTERS;
      }
      return JSON.parse(raw);
    } catch (e) {
      console.error("LocalStorage merkez okuma hatası:", e);
      return DEFAULT_CENTERS;
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
      if (raw === null || raw === undefined) {
        localStorage.setItem(STORAGE_KEYS.AREAS, JSON.stringify(DEFAULT_AREAS));
        return DEFAULT_AREAS;
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
      return DEFAULT_AREAS;
    } catch (e) {
      console.error("LocalStorage alan okuma hatası:", e);
      return DEFAULT_AREAS;
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
        raw = localStorage.getItem('kurs_sonu_templates_v3') || localStorage.getItem('kurs_sonu_templates_v4');
        if (!raw) {
          localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(DEFAULT_COURSE_TEMPLATES));
          return DEFAULT_COURSE_TEMPLATES;
        }
      }
      const parsed = JSON.parse(raw);
      return parsed.map(t => ({
        moduleCount: t.moduleCount ? Math.max(1, Number(t.moduleCount)) : 1,
        ...t
      }));
    } catch (e) {
      console.error("LocalStorage şablon okuma hatası:", e);
      return DEFAULT_COURSE_TEMPLATES;
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
        if (un === 'ozgur' || un === 'onder' || un === 'admin' || user.role === 'admin') {
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

