// =====================================================================
// KURS SONU EVRAK SİSTEMİ - SUPABASE DATASTORE & VERİ KATMANI
// 100+ Kullanıcı İçin Optimize Edilmiş, İlişkisel ve Yüksek Performanslı
// =====================================================================

function stringToUuid(str) {
  if (!str) return '00000000-0000-4000-a000-000000000000';
  const s = String(str).trim();
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s)) {
    return s.toLowerCase();
  }
  // Tarayıcı ve Node.js için basit deterministic MD5/Fnv hash tabanlı UUID üretici
  let h1 = 0xdeadbeef, h2 = 0x41c64e6d, h3 = 0x12345678, h4 = 0x87654321;
  for (let i = 0; i < s.length; i++) {
    const ch = s.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
    h3 = Math.imul(h3 ^ ch, 2246822519);
    h4 = Math.imul(h4 ^ ch, 3266489917);
  }
  const toHex = (n) => (n >>> 0).toString(16).padStart(8, '0');
  const fullHex = toHex(h1) + toHex(h2) + toHex(h3) + toHex(h4);
  return `${fullHex.slice(0, 8)}-${fullHex.slice(8, 12)}-4${fullHex.slice(13, 16)}-a${fullHex.slice(17, 20)}-${fullHex.slice(20, 32)}`;
}

const STORAGE_KEYS = {
  COURSES: 'kurs_sonu_courses_v8',
  USERS: 'kurs_sonu_users_v4',
  AUTH_USER: 'kurs_sonu_active_user_v3',
  CENTERS: 'kurs_sonu_centers_v4',
  AREAS: 'kurs_sonu_areas_v1',
  TEMPLATES: 'kurs_sonu_templates_v6',
  TODOS: 'kurs_sonu_dev_todos_v1',
  THEME: 'kurs_sonu_theme'
};

// Yerel Bellek Önbelleği (Senkron UI Erişimi İçin)
const MemoryStore = {
  courses: [],
  centers: [],
  areas: [],
  templates: [],
  users: [],
  todos: [],
  activeUser: null,
  knownCourseIds: new Set()
};

const DataStore = {
  _cloudInitialized: false,
  _realtimeSubscribed: false,

  // 1. KULLANICILAR
  getUsers() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.USERS);
      let list = raw ? JSON.parse(raw) : null;
      if (Array.isArray(list) && list.length > 0) {
        MemoryStore.users = list;
        return list;
      }
      return MemoryStore.users || [];
    } catch (e) {
      console.error("Kullanıcı okuma hatası:", e);
      return MemoryStore.users || [];
    }
  },

  saveUsers(users) {
    try {
      MemoryStore.users = users;
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

      const client = getSupabase();
      if (client && Array.isArray(users)) {
        users.forEach(async (u) => {
          if (!u || !u.username) return;
          const userPayload = {
            id: stringToUuid(u.id || u.username),
            username: u.username,
            password: u.password || '123',
            full_name: u.fullName || u.full_name || u.username,
            role: u.role || 'teacher',
            title: u.title || '',
            area: u.area || '',
            area2: u.area2 || '',
            institution: u.institution || '',
            email: u.email || '',
            avatar: u.avatar || ''
          };
          await client.from('users').upsert(userPayload, { onConflict: 'username' });
        });
      }
    } catch (e) {
      console.error("Kullanıcı kaydetme hatası:", e);
    }
  },

  // 2. AKTİF OTURUM KULLANICISI
  getActiveUser() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
      if (raw) return JSON.parse(raw);
      return MemoryStore.activeUser;
    } catch (e) {
      return null;
    }
  },

  setActiveUser(user) {
    MemoryStore.activeUser = user;
    if (user) {
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    }
  },

  // 3. KURS MERKEZLERİ
  getCenters() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CENTERS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
      return MemoryStore.centers || [];
    } catch (e) {
      return MemoryStore.centers || [];
    }
  },

  saveCenters(centers) {
    try {
      MemoryStore.centers = centers;
      localStorage.setItem(STORAGE_KEYS.CENTERS, JSON.stringify(centers));

      const client = getSupabase();
      if (client && Array.isArray(centers)) {
        centers.forEach(async (c) => {
          if (!c || !c.name) return;
          const id = stringToUuid(c.id || c.name);
          const storedName = c.supervisor ? `${c.name} ::: ${c.supervisor}` : c.name;
          await client.from('centers').upsert({ id, name: storedName });
        });
      }
    } catch (e) {
      console.error("Merkez kaydetme hatası:", e);
    }
  },

  // 4. KURS ALANLARI / BRANŞLAR
  getAreas() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.AREAS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
      return MemoryStore.areas || [];
    } catch (e) {
      return MemoryStore.areas || [];
    }
  },

  saveAreas(areas) {
    try {
      MemoryStore.areas = areas;
      localStorage.setItem(STORAGE_KEYS.AREAS, JSON.stringify(areas));

      const client = getSupabase();
      if (client && Array.isArray(areas)) {
        areas.forEach(async (a) => {
          if (!a) return;
          const name = typeof a === 'string' ? a : a.name;
          if (!name) return;
          const id = stringToUuid(a.id || name);
          await client.from('areas').upsert({ id, name });
        });
      }
    } catch (e) {
      console.error("Alan kaydetme hatası:", e);
    }
  },

  // 5. KURS VE MÜFREDAT ŞABLONLARI
  getCourseTemplates() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.TEMPLATES);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed.slice().sort((a, b) => (a.name || '').localeCompare(b.name || '', 'tr', { sensitivity: 'base' }));
        }
      }
      return (MemoryStore.templates || []).slice().sort((a, b) => (a.name || '').localeCompare(b.name || '', 'tr', { sensitivity: 'base' }));
    } catch (e) {
      return [];
    }
  },

  saveCourseTemplates(templates) {
    try {
      const sorted = (templates || []).slice().sort((a, b) => (a.name || '').localeCompare(b.name || '', 'tr', { sensitivity: 'base' }));
      MemoryStore.templates = sorted;
      localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(sorted));

      const client = getSupabase();
      if (client && Array.isArray(templates)) {
        templates.forEach(async (t) => {
          if (!t || !t.name) return;
          const id = stringToUuid(t.id || t.code || t.name);
          const payload = {
            id,
            name: t.name,
            code: t.code || '',
            category: t.category || '',
            total_hours: Number(t.totalHours || t.total_hours || 120),
            module_count: Number(t.moduleCount || t.module_count || 1),
            area: t.area || '',
            syllabus: t.syllabus || []
          };
          await client.from('course_templates').upsert(payload);
        });
      }
    } catch (e) {
      console.error("Şablon kaydetme hatası:", e);
    }
  },

  // 6. KURSLAR (courses & students)
  getCourses() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.COURSES);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed.map(c => this._normalizeCourse(c));
        }
      }
      return (MemoryStore.courses || []).map(c => this._normalizeCourse(c));
    } catch (e) {
      return [];
    }
  },

  saveCourses(courses) {
    try {
      MemoryStore.courses = courses;
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));

      const client = getSupabase();
      if (!client || !Array.isArray(courses)) return;

      const currentUuids = new Set();

      courses.forEach(async (c) => {
        if (!c || !c.name) return;
        const courseId = stringToUuid(c.id || c.code || c.name);
        currentUuids.add(courseId);

        const lessonDaysPayload = {
          days: c.days || [],
          extra: {
            modules: c.modules || [],
            moduleCount: c.moduleCount || 1,
            planSettings: c.planSettings || null,
            offDays: c.offDays || [],
            startTime: c.startTime || '',
            endTime: c.endTime || '',
            supervisor: c.supervisor || '',
            closedAt: c.closedAt || null,
            closedBy: c.closedBy || null,
            baseSyllabus: c.baseSyllabus || null
          }
        };

        const coursePayload = {
          id: courseId,
          name: c.name,
          code: c.code || '',
          instructor_username: c.instructorUsername || c.instructor || '',
          instructor_name: c.instructor || c.instructorName || '',
          center_name: c.center || c.center_name || '',
          classroom: c.classroom || '',
          area: c.area || '',
          status: c.status || 'active',
          start_date: c.startDate || null,
          end_date: c.endDate || null,
          total_hours: Number(c.totalHours || 120),
          daily_hours: Number(c.dailyHours || 4),
          lesson_days: lessonDaysPayload,
          document_type: c.documentType || 'Sertifika',
          syllabus: c.syllabus || []
        };

        const { data: savedCourse, error: cErr } = await client
          .from('courses')
          .upsert(coursePayload)
          .select()
          .single();

        if (cErr) {
          console.error("Supabase kurs kayıt hatası:", cErr);
          return;
        }

        // İlişkisel Kursiyerleri students tablosuna kaydet
        if (savedCourse && Array.isArray(c.students)) {
          for (const s of c.students) {
            const studentId = stringToUuid(s.id || (courseId + '_' + (s.tcNo || s.fullName)));
            const fullName = s.fullName || `${s.firstName || ''} ${s.lastName || ''}`.trim() || 'İsimsiz Kursiyer';
            const parts = fullName.split(' ');
            const lastName = s.lastName || (parts.length > 1 ? parts[parts.length - 1] : '');
            const firstName = s.firstName || (parts.length > 1 ? parts.slice(0, -1).join(' ') : fullName);

            const studentPayload = {
              id: studentId,
              course_id: courseId,
              first_name: firstName,
              last_name: lastName,
              full_name: fullName,
              tc_no: s.tcNo || '',
              phone: s.phone || '',
              attendance: s.attendance || 'Devamlı',
              result: s.result || '',
              absent_hours: Number(s.absentHours || 0),
              module_scores: s.moduleScores || {},
              note: s.attendanceNote || ''
            };
            await client.from('students').upsert(studentPayload);
          }
        }
      });

      // Silinen kurs varsa Supabase'den de sil
      if (MemoryStore.knownCourseIds && MemoryStore.knownCourseIds.size > 0) {
        MemoryStore.knownCourseIds.forEach(async (oldId) => {
          if (!currentUuids.has(oldId)) {
            await client.from('courses').delete().eq('id', oldId);
          }
        });
      }
      MemoryStore.knownCourseIds = currentUuids;

    } catch (e) {
      console.error("Kurs kaydetme hatası:", e);
    }
  },

  clearAllCourses() {
    try {
      MemoryStore.courses = [];
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify([]));
      const client = getSupabase();
      if (client) {
        client.from('courses').delete().neq('id', '00000000-0000-0000-0000-000000000000').then(() => {
          console.log("Supabase kurs tablosu temizlendi.");
        });
      }
      MemoryStore.knownCourseIds = new Set();
    } catch (e) {
      console.error("clearAllCourses hatası:", e);
    }
  },

  _normalizeCourse(c) {
    const moduleCount = c.moduleCount ? Math.max(1, Number(c.moduleCount)) : 1;
    const students = (c.students || []).map(s => {
      const modScores = s.moduleScores || {};
      const fullName = s.fullName || `${s.firstName || ''} ${s.lastName || ''}`.trim() || 'İsimsiz Kursiyer';
      const parts = fullName.split(' ');
      const lastName = s.lastName || (parts.length > 1 ? parts[parts.length - 1] : '');
      const firstName = s.firstName || (parts.length > 1 ? parts.slice(0, -1).join(' ') : fullName);

      return {
        ...s,
        firstName,
        lastName,
        fullName,
        absentHours: s.absentHours !== undefined ? Number(s.absentHours) : 0,
        attendance: s.attendance || 'Devamlı',
        attendanceNote: s.attendanceNote || '',
        moduleScores: modScores
      };
    });

    return {
      dailyHours: 4,
      days: [],
      offDays: [],
      moduleCount,
      ...c,
      students
    };
  },

  // 7. GELİŞTİRİCİ TODO LİSTESİ
  getTodos() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.TODOS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
      return MemoryStore.todos || [];
    } catch (e) {
      return [];
    }
  },

  saveTodos(todos) {
    try {
      MemoryStore.todos = todos;
      localStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(todos));

      const client = getSupabase();
      if (client && Array.isArray(todos)) {
        todos.forEach(async (t) => {
          if (!t || !t.text) return;
          const id = stringToUuid(t.id || t.text);
          const payload = {
            id,
            title: t.text,
            completed: Boolean(t.completed),
            created_by: t.createdBy || ''
          };
          await client.from('system_todos').upsert(payload);
        });
      }
    } catch (e) {
      console.error("Todo kaydetme hatası:", e);
    }
  },

  // =====================================================================
  // 100+ KULLANICI İÇİN OPTİMİZE EDİLMİŞ BULUT SENKRONİZASYONU
  // =====================================================================
  async initCloudListeners() {
    const client = getSupabase();
    if (!client) {
      console.warn("⚠️ Supabase istemcisi aktif değil. Yerel depolama modu çalışıyor.");
      updateCloudSyncStatus(false, "Bağlantı Bekleniyor");
      return;
    }

    try {
      updateCloudSyncStatus(true, "Supabase Aktif");

      // 1. Merkezleri Çek
      const { data: centers } = await client.from('centers').select('*').order('name');
      if (Array.isArray(centers)) {
        MemoryStore.centers = centers.map(c => {
          let name = c.name || '';
          let supervisor = '';
          if (name.includes(' ::: ')) {
            const parts = name.split(' ::: ');
            name = parts[0];
            supervisor = parts[1] || '';
          }
          return { id: c.id, name, supervisor };
        });
        localStorage.setItem(STORAGE_KEYS.CENTERS, JSON.stringify(MemoryStore.centers));
        if (typeof window.onCloudSync === 'function') window.onCloudSync('centers', MemoryStore.centers);
      }

      // 2. Alanları Çek
      const { data: areas } = await client.from('areas').select('*').order('name');
      if (Array.isArray(areas)) {
        MemoryStore.areas = areas.map(a => ({ id: a.id, name: a.name }));
        localStorage.setItem(STORAGE_KEYS.AREAS, JSON.stringify(MemoryStore.areas));
        if (typeof window.onCloudSync === 'function') window.onCloudSync('areas', MemoryStore.areas);
      }

      // 3. Şablonları Çek
      const { data: templates } = await client.from('course_templates').select('*').order('name');
      if (Array.isArray(templates)) {
        MemoryStore.templates = templates.map(t => ({
          id: t.id,
          name: t.name,
          code: t.code,
          category: t.category,
          area: t.area,
          totalHours: t.total_hours,
          moduleCount: t.module_count,
          syllabus: t.syllabus || []
        }));
        localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(MemoryStore.templates));
        if (typeof window.onCloudSync === 'function') window.onCloudSync('templates', MemoryStore.templates);
      }

      // 4. Kullanıcıları Çek
      const { data: users } = await client.from('users').select('*').order('full_name');
      if (Array.isArray(users) && users.length > 0) {
        MemoryStore.users = users.map(u => ({
          id: u.id,
          username: u.username,
          password: u.password,
          fullName: u.full_name,
          role: u.role,
          title: u.title,
          area: u.area,
          area2: u.area2,
          institution: u.institution,
          email: u.email,
          avatar: u.avatar
        }));
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(MemoryStore.users));
        if (typeof window.onCloudSync === 'function') window.onCloudSync('users', MemoryStore.users);
      }

      // 5. Kursları ve İlişkisel Kursiyerleri Çek (100 KULLANICI OPTİMİZASYONU)
      const currentUser = this.getActiveUser();
      let courseQuery = client.from('courses').select('*, students(*)').order('created_at', { ascending: false });

      // Eğitmen ise yalnızca kendi kurslarını sorgular (Ağ trafiği 100 kat azalır)
      if (currentUser && currentUser.role === 'teacher') {
        courseQuery = courseQuery.eq('instructor_username', currentUser.username);
      } else if (currentUser && currentUser.role === 'department_head') {
        // Zümre başkanı ise sadece kendi alanlarını sorgular
        const myAreas = [currentUser.area, currentUser.area2].filter(Boolean);
        if (myAreas.length > 0) {
          courseQuery = courseQuery.in('area', myAreas);
        }
      }

      const { data: courses, error: coursesErr } = await courseQuery;
      if (!coursesErr && Array.isArray(courses)) {
        const idSet = new Set();
        MemoryStore.courses = courses.map(c => {
          idSet.add(c.id);
          let days = [];
          let extra = {};
          if (Array.isArray(c.lesson_days)) {
            days = c.lesson_days;
          } else if (c.lesson_days && typeof c.lesson_days === 'object') {
            days = c.lesson_days.days || [];
            extra = c.lesson_days.extra || {};
          }

          return {
            id: c.id,
            name: c.name,
            code: c.code,
            instructor: c.instructor_username,
            instructorUsername: c.instructor_username,
            instructorName: c.instructor_name,
            center: c.center_name,
            classroom: c.classroom,
            area: c.area,
            status: c.status,
            startDate: c.start_date,
            endDate: c.end_date,
            totalHours: c.total_hours,
            dailyHours: c.daily_hours,
            days,
            documentType: c.document_type,
            syllabus: c.syllabus || [],
            moduleCount: extra.moduleCount || 1,
            modules: extra.modules || [],
            planSettings: extra.planSettings || null,
            offDays: extra.offDays || [],
            startTime: extra.startTime || '',
            endTime: extra.endTime || '',
            supervisor: extra.supervisor || '',
            closedAt: extra.closedAt || null,
            closedBy: extra.closedBy || null,
            baseSyllabus: extra.baseSyllabus || null,
            students: (c.students || []).map(s => ({
              id: s.id,
              firstName: s.first_name,
              lastName: s.last_name,
              fullName: s.full_name,
              tcNo: s.tc_no,
              phone: s.phone,
              attendance: s.attendance,
              result: s.result,
              absentHours: s.absent_hours,
              moduleScores: s.module_scores || {},
              attendanceNote: s.note || ''
            }))
          };
        });
        MemoryStore.knownCourseIds = idSet;
        localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(MemoryStore.courses));
        if (typeof window.onCloudSync === 'function') window.onCloudSync('courses', MemoryStore.courses);
      }

      // 6. Todo Listesini Çek
      const { data: todos } = await client.from('system_todos').select('*').order('created_at', { ascending: false });
      if (Array.isArray(todos)) {
        MemoryStore.todos = todos.map(t => ({
          id: t.id,
          text: t.title,
          completed: t.completed,
          createdBy: t.created_by
        }));
        localStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(MemoryStore.todos));
        if (typeof window.onCloudSync === 'function') window.onCloudSync('todos', MemoryStore.todos);
      }

      // 7. Supabase Realtime Kanalı (100 Kullanıcı Eşzamanlı Dinleyici)
      if (!this._realtimeSubscribed) {
        this._realtimeSubscribed = true;
        client
          .channel('public_realtime_changes')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'courses' }, () => {
            console.log('[Supabase Realtime] Kurs değişikliği algılandı, güncelleniyor...');
            DataStore.initCloudListeners();
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, () => {
            DataStore.initCloudListeners();
          })
          .subscribe();
      }

      console.log("✅ Supabase PostgreSQL verileri başarıyla senkronize edildi.");
    } catch (err) {
      console.error("❌ Supabase senkronizasyon hatası:", err);
      updateCloudSyncStatus(false, "Senkronizasyon Hatası");
    }
  }
};

window.DataStore = DataStore;

function updateCloudSyncStatus(isConnected, text = '') {
  const indicator = document.getElementById('cloudSyncIndicator');
  const label = document.getElementById('cloudSyncText');

  if (label && text) label.innerText = text;

  if (indicator) {
    if (isConnected) {
      indicator.className = 'w-2 h-2 rounded-full bg-emerald-500 animate-pulse';
    } else {
      indicator.className = 'w-2 h-2 rounded-full bg-amber-500';
    }
  }
}
