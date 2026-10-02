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
    role: "admin",
    title: "Sistem ve Evrak Yöneticisi",
    institution: "Milli Eğitim Bakanlığı / İlçe MEM",
    email: "admin@meb.k12.tr",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "dev_ozgur",
    username: "ozgur",
    password: "123",
    fullName: "Özgür",
    role: "admin",
    title: "Geliştirici & Eğitmen",
    institution: "Meslek Fabrikası",
    email: "ozgur@meslekfabrikasi.org",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "dev_onder",
    username: "onder",
    password: "123",
    fullName: "Önder Altıntaş",
    role: "admin",
    title: "Geliştirici & Eğitmen",
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

// Resmi Kurs ve Saatlik Konu / Müfredat Dağılım Şablonları
const DEFAULT_COURSE_TEMPLATES = [
  {
    id: "tmpl_1",
    name: "Bilgisayar İşletmenliği (Operatörlüğü)",
    code: "BLG-160",
    category: "Bilişim Teknolojileri",
    totalHours: 160,
    moduleCount: 3,
    documentType: "Sertifika",
    description: "Temel bilgisayar donanımı, işletim sistemi, ofis programları (Word, Excel, PowerPoint) ve internet güvenliği.",
    syllabus: [
      { hour: 1, topic: "Bilgisayara Giriş: Temel donanım birimleri (Kasa, Monitör, Klavye, Fare)" },
      { hour: 2, topic: "Donanım parçalarının tanıtımı (Anakart, İşlemci, RAM, Sabit Disk)" },
      { hour: 3, topic: "Giriş-Çıkış birimleri ve harici depolama aygıtları kullanımı" },
      { hour: 4, topic: "İşletim Sistemleri kavramı ve Windows ortamına giriş" },
      { hour: 5, topic: "Masaüstü, Görev Çubuğu, Başlat Menüsü ve pencere yönetimi" },
      { hour: 6, topic: "Dosya ve Klasör yönetimi: Oluşturma, adlandırma, kopyalama ve taşıma" },
      { hour: 7, topic: "Denetim Masası ve Sistem Ayarlarının yapılandırılması" },
      { hour: 8, topic: "Kelime İşlemci (Word) Programına Giriş ve Temel Arayüz" },
      { hour: 9, topic: "Metin yazma, biçimlendirme, yazı tipi ve paragraf ayarları" },
      { hour: 10, topic: "Tablo ekleme, satır/sütun düzenleme ve tablo biçimlendirme" },
      { hour: 11, topic: "Resim, şekil, simge ve sayfa numarası ekleme" },
      { hour: 12, topic: "Sayfa yapısı, kenar boşlukları ve yazdırma ayarları" },
      { hour: 13, topic: "Elektronik Tablolama (Excel) Programına Giriş ve Hücre Yapısı" },
      { hour: 14, topic: "Temel Matematiksel Formüller (TOPLA, ORTALAMA, EĞER)" },
      { hour: 15, topic: "Tablo filtreleme, sıralama ve grafik oluşturma teknikleri" },
      { hour: 16, topic: "İnternet Güvenliği, e-Devlet, e-Posta kullanımı ve Dönem Sonu Değerlendirmesi" }
    ]
  },
  {
    id: "tmpl_2",
    name: "Diksiyon ve Etkili İletişim",
    code: "DKS-64",
    category: "Kişisel Gelişim",
    totalHours: 64,
    moduleCount: 2,
    documentType: "Katılım Belgesi",
    description: "Türkçenin doğru, anlaşılır ve etkili konuşulması, doğru nefes alma, tonlama ve beden dili eğitimi.",
    syllabus: [
      { hour: 1, topic: "İletişimin Temelleri ve Diksiyonun Önemi" },
      { hour: 2, topic: "Doğru Nefes Alma ve Diyafram Egzersizleri" },
      { hour: 3, topic: "Ses Organları ve Artikülasyon (Boğumlanma) Çalışmaları" },
      { hour: 4, topic: "Ünlülerin (Sesli Harfler) Doğru Çıkarılışı ve Boğumlanması" },
      { hour: 5, topic: "Ünsüzlerin (Sessiz Harfler) Doğru Çıkarılışı ve Tembelliklerin Giderilmesi" },
      { hour: 6, topic: "Türkçede Vurgu Kuralları (Kelime Vurgusu, Cümle Vurgusu)" },
      { hour: 7, topic: "Ulama, Durak ve Tonlama Teknikleri" },
      { hour: 8, topic: "Tekerleme Çalışmaları ve Hızlı/Akıcı Konuşma Pratikleri" },
      { hour: 9, topic: "Beden Dili, Jest ve Mimiklerin Doğru Kullanımı" },
      { hour: 10, topic: "Topluluk Önünde Konuşma ve Heyecan Kontrolü" },
      { hour: 11, topic: "Hazırlıksız Konuşma Becerisi ve Doğaçlama Sunumlar" },
      { hour: 12, topic: "Kurs Sonu Canlı Değerlendirme ve Konuşma Uygulamaları" }
    ]
  },
  {
    id: "tmpl_3",
    name: "Dekoratif Ahşap Süsleme",
    code: "AHS-140",
    category: "El Sanatları",
    totalHours: 140,
    moduleCount: 2,
    documentType: "Sertifika",
    description: "Ahşap yüzey hazırlığı, zımparalama, astar boya, transfer, dekupaj, eskitme ve vernikleme teknikleri.",
    syllabus: [
      { hour: 1, topic: "Ahşap Süslemede Kullanılan Araç, Gereç ve Güvenlik Kuralları" },
      { hour: 2, topic: "Ham Ahşap Yüzeylerin Hazırlanması ve Zımpara Teknikleri" },
      { hour: 3, topic: "Astar Boya Uygulaması ve Zemin Boyama Teknikleri" },
      { hour: 4, topic: "Fırça Kullanımı, Süngerleme ve Düz Renk Boyama Pratiği" },
      { hour: 5, topic: "Dekupaj Kağıdı ve Pirinç Kağıt Yapıştırma Teknikleri" },
      { hour: 6, topic: "Kolay Transfer ve Stencil (Şablon) Boyama Uygulamaları" },
      { hour: 7, topic: "Rölyef Pasta ile Boyutlu Desen ve Doku Oluşturma" },
      { hour: 8, topic: "Budak ve Doku Tarakları ile Efekt Verme" },
      { hour: 9, topic: "Eskitme Teknikleri (Antik Eskitme, Mum Eskitme, Kuru Fırça)" },
      { hour: 10, topic: "Çatlatma Teknikleri (Tek Adım ve Çift Adım Çatlatma)" },
      { hour: 11, topic: "Ahşap Koruyucu Vernik Çeşitleri ve Vernikleme İşlemi" },
      { hour: 12, topic: "Kurs Sonu Sergi Hazırlığı ve Ürün Kalite Kontrolü" }
    ]
  }
];

const INITIAL_COURSES = [
  {
    id: "crs_101",
    userId: "user_1",
    name: "Bilgisayar İşletmenliği (Operatörlüğü)",
    templateId: "tmpl_1",
    code: "BLG-2026-01",
    category: "Bilişim Teknolojileri",
    institution: "Kadıköy Halk Eğitimi Merkezi",
    instructor: "Ahmet Yılmaz",
    supervisor: "Kemal Demir (Müdür Yrd.)",
    days: ["Pazartesi", "Salı", "Çarşamba", "Perşembe"],
    dailyHours: 4,
    startTime: "09:00",
    endTime: "12:15",
    offDays: [
      { id: "od_1", date: "2026-04-23", reason: "23 Nisan Ulusal Egemenlik ve Çocuk Bayramı" }
    ],
    totalHours: 160,
    moduleCount: 3,
    startDate: "2026-01-15",
    endDate: "2026-04-10",
    status: "active",
    documentType: "Sertifika",
    classroom: "Lab 2 - Bilişim Atölyesi",
    description: "Temel bilgisayar kullanımı, Office programları ve internet teknolojileri eğitimi.",
    syllabus: DEFAULT_COURSE_TEMPLATES[0].syllabus,
    students: [
      { id: "std_1", tcNo: "12345678901", firstName: "Mehmet", lastName: "Kaya", fullName: "Mehmet Kaya", phone: "0532 111 2233", absentHours: 4, attendance: "Devamlı", attendanceNote: "", moduleScores: { 1: 85, 2: 90, 3: 89 }, examScore: 88, result: "Başarılı" },
      { id: "std_2", tcNo: "23456789012", firstName: "Zeynep", lastName: "Çelik", fullName: "Zeynep Çelik", phone: "0543 222 3344", absentHours: 0, attendance: "Devamlı", attendanceNote: "", moduleScores: { 1: 92, 2: 95, 3: 95 }, examScore: 94, result: "Başarılı" },
      { id: "std_3", tcNo: "34567890123", firstName: "Burak", lastName: "Şahin", fullName: "Burak Şahin", phone: "0555 333 4455", absentHours: 36, attendance: "Devamsız", attendanceNote: "1/5 devamsızlık sınırını aştı", moduleScores: { 1: 35, 2: 0, 3: 0 }, examScore: 35, result: "Devamsız" },
      { id: "std_4", tcNo: "45678901234", firstName: "Elif", lastName: "Öztürk", fullName: "Elif Öztürk", phone: "0505 444 5566", absentHours: 8, attendance: "Devamlı", attendanceNote: "", moduleScores: { 1: 80, 2: 82, 3: 84 }, examScore: 82, result: "Başarılı" }
    ]
  },
  {
    id: "crs_102",
    userId: "user_1",
    name: "Python ile Programlama Temelleri",
    templateId: "tmpl_2",
    code: "PYT-2026-02",
    category: "Yazılım Geliştirme",
    institution: "Kadıköy Halk Eğitimi Merkezi",
    instructor: "Ahmet Yılmaz",
    supervisor: "Kemal Demir (Müdür Yrd.)",
    days: ["Cumartesi", "Pazar"],
    dailyHours: 6,
    startTime: "10:00",
    endTime: "15:30",
    offDays: [],
    totalHours: 120,
    moduleCount: 2,
    startDate: "2026-02-01",
    endDate: "2026-05-20",
    status: "active",
    documentType: "Katılım Belgesi",
    classroom: "Lab 1",
    description: "Python programlama dili temelleri, veri yapıları ve algoritmalar.",
    syllabus: [],
    students: [
      { id: "std_5", tcNo: "56789012345", firstName: "Can", lastName: "Aksoy", fullName: "Can Aksoy", phone: "0533 555 6677", absentHours: 0, attendance: "Devamlı", attendanceNote: "", moduleScores: { 1: 94, 2: 96 }, examScore: 95, result: "Başarılı" },
      { id: "std_6", tcNo: "67890123456", firstName: "Deniz", lastName: "Yıldız", fullName: "Deniz Yıldız", phone: "0542 666 7788", absentHours: 2, attendance: "Devamlı", attendanceNote: "", moduleScores: { 1: 88, 2: 92 }, examScore: 90, result: "Başarılı" }
    ]
  },
  {
    id: "crs_201",
    userId: "user_2",
    name: "Dekoratif Ahşap Süsleme",
    templateId: "tmpl_3",
    code: "AHS-2026-01",
    category: "El Sanatları",
    institution: "Üsküdar Mesleki Eğitim Merkezi",
    instructor: "Ayşe Demir",
    supervisor: "Mehmet Ali Şahin (Müdür Yrd.)",
    days: ["Salı", "Perşembe", "Cuma"],
    dailyHours: 5,
    startTime: "13:30",
    endTime: "17:45",
    offDays: [
      { id: "od_2", date: "2026-05-01", reason: "1 Mayıs Emek ve Dayanışma Günü" }
    ],
    totalHours: 140,
    moduleCount: 2,
    startDate: "2026-01-20",
    endDate: "2026-04-30",
    status: "active",
    classroom: "Ahşap Sanat Atölyesi",
    description: "Ahşap boyama, dekupaj ve rölyef teknikleri.",
    syllabus: DEFAULT_COURSE_TEMPLATES[2].syllabus,
    students: [
      { id: "std_201", tcNo: "11223344556", firstName: "Fatma", lastName: "Korkmaz", fullName: "Fatma Korkmaz", phone: "0532 999 1122", absentHours: 4, attendance: "Devamlı", attendanceNote: "", moduleScores: { 1: 95, 2: 97 }, examScore: 96, result: "Başarılı" },
      { id: "std_202", tcNo: "22334455667", firstName: "Emine", lastName: "Arslan", fullName: "Emine Arslan", phone: "0543 888 2233", absentHours: 0, attendance: "Devamlı", attendanceNote: "", moduleScores: { 1: 90, 2: 90 }, examScore: 90, result: "Başarılı" }
    ]
  }
];

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
  COURSES: 'kurs_sonu_courses_v7',
  CENTERS: 'kurs_sonu_centers_v4',
  TEMPLATES: 'kurs_sonu_templates_v5',
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
      if (snapshot.empty) {
        console.log("Bulut veritabanında henüz kurs yok. Başlangıç kursları yükleniyor...");
        const batch = db.batch();
        INITIAL_COURSES.forEach(c => {
          batch.set(db.collection('courses').doc(c.id), c);
        });
        batch.commit().catch(e => console.error("Kurs seed hatası:", e));
        return;
      }
      const courses = [];
      const idSet = new Set();
      snapshot.forEach(doc => {
        const data = doc.data();
        courses.push(data);
        idSet.add(data.id || doc.id);
      });
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
      snapshot.forEach(doc => users.push(doc.data()));
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
        } else if (defUser.username === 'ozgur' || defUser.username === 'onder') {
          if (found.password !== defUser.password || found.role !== 'admin' || found.title !== defUser.title) {
            found.password = defUser.password;
            found.role = 'admin';
            found.title = defUser.title;
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
      return JSON.parse(raw);
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
      if (user && (user.username === 'ozgur' || user.username === 'onder')) {
        const def = DEFAULT_USERS.find(u => u.username === user.username);
        if (def && (user.title !== def.title || user.role !== def.role)) {
          user.title = def.title;
          user.role = def.role;
          localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
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

