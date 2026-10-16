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

window.stringToUuid = stringToUuid;

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
  knownCourseIds: new Set(),
  knownStudentIds: new Set(),
  deletedStudentIds: new Set(),
  knownUserIds: new Set(),
  knownCenterIds: new Set(),
  knownAreaIds: new Set(),
  knownTemplateIds: new Set(),
  knownTodoIds: new Set()
};

const DataStore = {
  _cloudInitialized: false,
  _realtimeSubscribed: false,
  _activeSaveCount: 0,
  _lastSaveTime: 0,

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

  async deleteUser(userId) {
    try {
      if (!userId) return;
      const targetId = stringToUuid(userId);
      MemoryStore.knownUserIds.delete(targetId);
      const client = getSupabase();
      if (client) {
        await client.from('users').delete().eq('id', targetId);
      }
    } catch (e) {
      console.error("Kullanıcı silme hatası:", e);
    }
  },

  saveUsers(users) {
    try {
      const currentUuids = new Set();
      if (Array.isArray(users)) {
        users.forEach(u => {
          if (u && u.username) {
            u.id = stringToUuid(u.id || u.username);
            currentUuids.add(u.id);
          }
        });
      }
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

        if (MemoryStore.knownUserIds && MemoryStore.knownUserIds.size > 0) {
          MemoryStore.knownUserIds.forEach(async (oldId) => {
            if (!currentUuids.has(oldId)) {
              await client.from('users').delete().eq('id', oldId);
            }
          });
        }
        MemoryStore.knownUserIds = currentUuids;
      }
    } catch (e) {
      console.error("Kullanıcı kaydetme hatası:", e);
    }
  },

  // 2. AKTİF OTURUM KULLANICISI
  getActiveUser() {
    try {
      const sess = sessionStorage.getItem('kurs_sonu_session_user');
      if (sess) {
        const parsed = JSON.parse(sess);
        if (parsed) return parsed;
      }
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

  async deleteCenter(centerId) {
    try {
      if (!centerId) return;
      const targetId = stringToUuid(centerId);
      MemoryStore.knownCenterIds.delete(targetId);
      const client = getSupabase();
      if (client) {
        await client.from('centers').delete().eq('id', targetId);
      }
    } catch (e) {
      console.error("Merkez silme hatası:", e);
    }
  },

  saveCenters(centers) {
    try {
      const currentUuids = new Set();
      if (Array.isArray(centers)) {
        centers.forEach(c => {
          if (c && c.name) {
            c.id = stringToUuid(c.id || c.name);
            currentUuids.add(c.id);
          }
        });
      }
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

        if (MemoryStore.knownCenterIds && MemoryStore.knownCenterIds.size > 0) {
          MemoryStore.knownCenterIds.forEach(async (oldId) => {
            if (!currentUuids.has(oldId)) {
              await client.from('centers').delete().eq('id', oldId);
            }
          });
        }
        MemoryStore.knownCenterIds = currentUuids;
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

  async deleteArea(areaId) {
    try {
      if (!areaId) return;
      const targetId = stringToUuid(areaId);
      MemoryStore.knownAreaIds.delete(targetId);
      const client = getSupabase();
      if (client) {
        await client.from('areas').delete().eq('id', targetId);
      }
    } catch (e) {
      console.error("Alan silme hatası:", e);
    }
  },

  saveAreas(areas) {
    try {
      const currentUuids = new Set();
      if (Array.isArray(areas)) {
        areas.forEach(a => {
          if (!a) return;
          const name = typeof a === 'string' ? a : a.name;
          if (!name) return;
          const id = stringToUuid((typeof a === 'object' ? a.id : null) || name);
          if (typeof a === 'object') a.id = id;
          currentUuids.add(id);
        });
      }
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

        if (MemoryStore.knownAreaIds && MemoryStore.knownAreaIds.size > 0) {
          MemoryStore.knownAreaIds.forEach(async (oldId) => {
            if (!currentUuids.has(oldId)) {
              await client.from('areas').delete().eq('id', oldId);
            }
          });
        }
        MemoryStore.knownAreaIds = currentUuids;
      }
    } catch (e) {
      console.error("Alan kaydetme hatası:", e);
    }
  },

  // 5. KURS VE MÜFREDAT ŞABLONLARI
  getCourseTemplates() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.TEMPLATES);
      let list = [];
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) list = parsed;
      }
      if (list.length === 0) list = MemoryStore.templates || [];
      const tmplMap = new Map();
      list.forEach(t => {
        const k = (t.code || t.name || t.id || '').trim().toLowerCase();
        if (k && !tmplMap.has(k)) tmplMap.set(k, t);
      });
      return Array.from(tmplMap.values()).sort((a, b) => (a.name || '').localeCompare(b.name || '', 'tr', { sensitivity: 'base' }));
    } catch (e) {
      return [];
    }
  },

  async deleteCourseTemplate(tmplId) {
    try {
      if (!tmplId) return;
      const targetId = stringToUuid(tmplId);
      MemoryStore.knownTemplateIds.delete(targetId);
      const client = getSupabase();
      if (client) {
        await client.from('course_templates').delete().eq('id', targetId);
      }
    } catch (e) {
      console.error("Şablon silme hatası:", e);
    }
  },

  saveCourseTemplates(templates) {
    try {
      const currentUuids = new Set();
      if (Array.isArray(templates)) {
        templates.forEach(t => {
          if (t && t.name) {
            t.id = stringToUuid(t.id || t.code || t.name);
            currentUuids.add(t.id);
          }
        });
      }
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

        if (MemoryStore.knownTemplateIds && MemoryStore.knownTemplateIds.size > 0) {
          MemoryStore.knownTemplateIds.forEach(async (oldId) => {
            if (!currentUuids.has(oldId)) {
              await client.from('course_templates').delete().eq('id', oldId);
            }
          });
        }
        MemoryStore.knownTemplateIds = currentUuids;
      }
    } catch (e) {
      console.error("Şablon kaydetme hatası:", e);
    }
  },

  // 6. KURSLAR (courses & students)
  getCourses() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.COURSES);
      let list = [];
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          list = parsed.map(c => this._normalizeCourse(c));
        }
      } else {
        list = (MemoryStore.courses || []).map(c => this._normalizeCourse(c));
      }
      list.forEach(c => {
        if (c && c.id) MemoryStore.knownCourseIds.add(c.id);
        if (c && Array.isArray(c.students)) {
          c.students.forEach(s => {
            if (s && s.id) MemoryStore.knownStudentIds.add(s.id);
          });
        }
      });
      return list;
    } catch (e) {
      return [];
    }
  },

  async deleteStudent(courseId, studentId) {
    try {
      if (!studentId) return;
      const targetStudentUuid = stringToUuid(studentId);
      const rawStudentId = String(studentId).trim();
      MemoryStore.deletedStudentIds.add(targetStudentUuid);
      MemoryStore.deletedStudentIds.add(rawStudentId);
      if (MemoryStore.knownStudentIds) {
        MemoryStore.knownStudentIds.delete(targetStudentUuid);
        MemoryStore.knownStudentIds.delete(rawStudentId);
      }

      this._activeSaveCount = (this._activeSaveCount || 0) + 1;
      this._lastSaveTime = Date.now();

      const client = getSupabase();
      if (client) {
        const { error } = await client.from('students').delete().eq('id', targetStudentUuid);
        if (error) {
          console.error("Supabase kursiyer silme hatası:", error);
        }
      }
    } catch (e) {
      console.error("Kursiyer silme hatası:", e);
    } finally {
      this._activeSaveCount = Math.max(0, (this._activeSaveCount || 1) - 1);
      this._lastSaveTime = Date.now();
    }
  },

  saveCourses(courses) {
    try {
      if (Array.isArray(courses)) {
        courses.forEach(c => {
          if (!c) return;
          const courseId = stringToUuid(c.id || c.code || c.name);
          c.id = courseId;
          if (Array.isArray(c.students)) {
            c.students.forEach(s => {
              if (!s) return;
              const fullName = s.fullName || `${s.firstName || ''} ${s.lastName || ''}`.trim() || 'İsimsiz Kursiyer';
              const studentId = stringToUuid(s.id || (courseId + '_' + (s.tcNo || fullName)));
              s.id = studentId;
              MemoryStore.deletedStudentIds.delete(studentId);
            });
          }
        });
      }

      MemoryStore.courses = courses;
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));

      const client = getSupabase();
      if (!client || !Array.isArray(courses)) return;

      const currentUuids = new Set();
      const currentStudentUuids = new Set();

      this._activeSaveCount = (this._activeSaveCount || 0) + 1;
      this._lastSaveTime = Date.now();

      (async () => {
        try {
          await Promise.all(courses.map(async (c) => {
            if (!c || !c.name) return;
            const courseId = stringToUuid(c.id || c.code || c.name);
            c.id = courseId;
            currentUuids.add(courseId);

            const studentAbsencesMap = {};
            if (Array.isArray(c.students)) {
              c.students.forEach(s => {
                if (!s) return;
                const fullName = s.fullName || `${s.firstName || ''} ${s.lastName || ''}`.trim() || 'İsimsiz Kursiyer';
                const studentId = stringToUuid(s.id || (courseId + '_' + (s.tcNo || fullName)));
                s.id = studentId;
                currentStudentUuids.add(studentId);
                if (Array.isArray(s.dailyAbsences) && s.dailyAbsences.length > 0) {
                  studentAbsencesMap[studentId] = s.dailyAbsences;
                }
              });
            }

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
                baseSyllabus: c.baseSyllabus || null,
                studentAbsences: studentAbsencesMap
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

            // İlişkisel Kursiyerleri toplu (batch) olarak students tablosuna kaydet ve silinenleri temizle
            if (savedCourse) {
              if (Array.isArray(c.students) && c.students.length > 0) {
                const studentPayloads = c.students.map(s => {
                  const fullName = s.fullName || `${s.firstName || ''} ${s.lastName || ''}`.trim() || 'İsimsiz Kursiyer';
                  const studentId = stringToUuid(s.id || (courseId + '_' + (s.tcNo || fullName)));
                  s.id = studentId;
                  const parts = fullName.split(' ');
                  const lastName = s.lastName || (parts.length > 1 ? parts[parts.length - 1] : '');
                  const firstName = s.firstName || (parts.length > 1 ? parts.slice(0, -1).join(' ') : fullName);

                  return {
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
                });

                await client.from('students').upsert(studentPayloads);

                const keepIds = studentPayloads.map(p => p.id);
                await client
                  .from('students')
                  .delete()
                  .eq('course_id', courseId)
                  .not('id', 'in', `(${keepIds.join(',')})`);
              } else {
                // Kursta hiç kursiyer kalmadıysa bu kursa ait tüm kursiyerleri Supabase'den sil
                await client.from('students').delete().eq('course_id', courseId);
              }
            }
          }));

          // Silinen kursiyer varsa Supabase'den de sil
          if (MemoryStore.knownStudentIds && MemoryStore.knownStudentIds.size > 0) {
            const removedStudentIds = [];
            MemoryStore.knownStudentIds.forEach((oldStudentId) => {
              if (!currentStudentUuids.has(oldStudentId)) {
                removedStudentIds.push(oldStudentId);
              }
            });
            if (removedStudentIds.length > 0) {
              await client.from('students').delete().in('id', removedStudentIds);
            }
          }
          MemoryStore.knownStudentIds = currentStudentUuids;

          // Silinen kurs varsa Supabase'den de sil
          if (MemoryStore.knownCourseIds && MemoryStore.knownCourseIds.size > 0) {
            const removedCourseIds = [];
            MemoryStore.knownCourseIds.forEach((oldId) => {
              if (!currentUuids.has(oldId)) {
                removedCourseIds.push(oldId);
              }
            });
            if (removedCourseIds.length > 0) {
              await client.from('courses').delete().in('id', removedCourseIds);
            }
          }
          MemoryStore.knownCourseIds = currentUuids;
        } catch (innerErr) {
          console.error("Supabase senkron kayıt hatası:", innerErr);
        } finally {
          this._activeSaveCount = Math.max(0, (this._activeSaveCount || 1) - 1);
          this._lastSaveTime = Date.now();
        }
      })();

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
      MemoryStore.knownStudentIds = new Set();
    } catch (e) {
      console.error("clearAllCourses hatası:", e);
    }
  },

  _normalizeCourse(c) {
    const courseId = stringToUuid(c.id || c.code || c.name);
    const moduleCount = c.moduleCount ? Math.max(1, Number(c.moduleCount)) : 1;
    const totalHours = Number(c.totalHours || c.total_hours || 0);
    const maxAllowed = Math.floor(totalHours / 5);

    const students = (c.students || []).map(s => {
      const modScores = s.moduleScores || {};
      const fullName = s.fullName || `${s.firstName || ''} ${s.lastName || ''}`.trim() || 'İsimsiz Kursiyer';
      const studentId = stringToUuid(s.id || (courseId + '_' + (s.tcNo || fullName)));
      const parts = fullName.split(' ');
      const lastName = s.lastName || (parts.length > 1 ? parts[parts.length - 1] : '');
      const firstName = s.firstName || (parts.length > 1 ? parts.slice(0, -1).join(' ') : fullName);

      let absentHours = s.absentHours !== undefined ? Number(s.absentHours) : 0;
      let attendance = s.attendance || 'Devamlı';
      let result = s.result || '';
      let attendanceNote = s.attendanceNote || '';

      let examScore = s.examScore !== undefined ? s.examScore : null;
      if (examScore === null && modScores && typeof modScores === 'object') {
        let sum = 0;
        let count = 0;
        for (let m = 1; m <= moduleCount; m++) {
          const val = modScores[m];
          if (val !== null && val !== undefined && val !== '' && !isNaN(Number(val))) {
            sum += Number(val);
            count++;
          }
        }
        if (count > 0) {
          examScore = Math.round((sum / count) * 10) / 10;
        }
      }

      // KURSİYER DEVAMSIZLIK & HİÇ GELMEDİ UYUMSUZLUK DÜZELTMESİ:
      // Kursiyer toplam saatten az devamsızlık yapmışsa (ör: 54 saatlik kursun 48'ine gelmemiş, 6 saatine gelmişse),
      // bu kursiyer kursa katılmıştır, HİÇBİR ŞEKİLDE "Hiç Gelmedi" sayılamaz!
      if (totalHours > 0 && absentHours > 0 && absentHours < totalHours) {
        if (attendance === 'Hiç Gelmedi') {
          attendance = absentHours > maxAllowed ? 'Devamsız' : 'Devamlı';
        }
        if (result === 'Hiç Gelmedi') {
          result = absentHours > maxAllowed ? 'Devamsız' : ((examScore !== null && Number(examScore) >= 50) ? 'Başarılı' : 'Devam Ediyor');
        }
        if (attendanceNote && attendanceNote.toLowerCase().includes('hiç gelme')) {
          attendanceNote = '';
        }
      }

      return {
        ...s,
        id: studentId,
        firstName,
        lastName,
        fullName,
        absentHours,
        attendance,
        result,
        attendanceNote,
        examScore,
        moduleScores: modScores,
        dailyAbsences: Array.isArray(s.dailyAbsences) ? s.dailyAbsences : []
      };
    });

    return {
      dailyHours: 4,
      days: [],
      offDays: [],
      moduleCount,
      ...c,
      id: courseId,
      students
    };
  },

  async deleteCourse(courseId) {
    try {
      if (!courseId) return;
      const targetId = stringToUuid(courseId);
      MemoryStore.knownCourseIds.delete(targetId);
      this._activeSaveCount = (this._activeSaveCount || 0) + 1;
      this._lastSaveTime = Date.now();
      const client = getSupabase();
      if (client) {
        await client.from('students').delete().eq('course_id', targetId);
        await client.from('courses').delete().eq('id', targetId);
      }
    } catch (e) {
      console.error("Kurs silme hatası:", e);
    } finally {
      this._activeSaveCount = Math.max(0, (this._activeSaveCount || 1) - 1);
      this._lastSaveTime = Date.now();
    }
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

  async deleteTodo(todoId) {
    try {
      if (!todoId) return;
      const targetId = stringToUuid(todoId);
      MemoryStore.knownTodoIds.delete(targetId);
      const client = getSupabase();
      if (client) {
        await client.from('system_todos').delete().eq('id', targetId);
      }
    } catch (e) {
      console.error("Todo silme hatası:", e);
    }
  },

  saveTodos(todos) {
    try {
      const currentUuids = new Set();
      if (Array.isArray(todos)) {
        todos.forEach(t => {
          if (t && t.text) {
            t.id = stringToUuid(t.id || t.text);
            currentUuids.add(t.id);
          }
        });
      }
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

        if (MemoryStore.knownTodoIds && MemoryStore.knownTodoIds.size > 0) {
          MemoryStore.knownTodoIds.forEach(async (oldId) => {
            if (!currentUuids.has(oldId)) {
              await client.from('system_todos').delete().eq('id', oldId);
            }
          });
        }
        MemoryStore.knownTodoIds = currentUuids;
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

      // 6 TABLOYU EŞZAMANLI (PARALEL PROMISE.ALL) SORGULA - YÜKLEME GECİKMESİ BİTER
      const [
        { data: centers },
        { data: areas },
        { data: templates },
        { data: users },
        { data: courses, error: coursesErr },
        { data: todos }
      ] = await Promise.all([
        client.from('centers').select('*').order('name'),
        client.from('areas').select('*').order('name'),
        client.from('course_templates').select('*').order('name'),
        client.from('users').select('*').order('full_name'),
        courseQuery,
        client.from('system_todos').select('*').order('created_at', { ascending: false })
      ]);

      // 1. Merkezleri İşle
      if (Array.isArray(centers)) {
        const centerMap = new Map();
        const centerIdSet = new Set();
        centers.forEach(c => {
          if (c.id) centerIdSet.add(c.id);
          let name = c.name || '';
          let supervisor = '';
          if (name.includes(' ::: ')) {
            const parts = name.split(' ::: ');
            name = parts[0].trim();
            supervisor = parts[1] ? parts[1].trim() : '';
          } else {
            name = name.trim();
          }
          if (!centerMap.has(name) || supervisor) {
            centerMap.set(name, { id: c.id, name, supervisor });
          }
        });
        MemoryStore.knownCenterIds = centerIdSet;
        MemoryStore.centers = Array.from(centerMap.values());
        localStorage.setItem(STORAGE_KEYS.CENTERS, JSON.stringify(MemoryStore.centers));
        if (typeof window.onCloudSync === 'function') window.onCloudSync('centers', MemoryStore.centers);
      }

      // 2. Alanları İşle
      if (Array.isArray(areas)) {
        const areaMap = new Map();
        const areaIdSet = new Set();
        areas.forEach(a => {
          if (a.id) areaIdSet.add(a.id);
          const name = typeof a === 'string' ? a.trim() : (a.name || '').trim();
          if (name && !areaMap.has(name.toLowerCase())) {
            areaMap.set(name.toLowerCase(), { id: a.id, name });
          }
        });
        MemoryStore.knownAreaIds = areaIdSet;
        MemoryStore.areas = Array.from(areaMap.values());
        localStorage.setItem(STORAGE_KEYS.AREAS, JSON.stringify(MemoryStore.areas));
        if (typeof window.onCloudSync === 'function') window.onCloudSync('areas', MemoryStore.areas);
      }

      // 3. Şablonları İşle
      if (Array.isArray(templates)) {
        const tmplMap = new Map();
        const tmplIdSet = new Set();
        templates.forEach(t => {
          if (t.id) tmplIdSet.add(t.id);
          const key = (t.code || t.name || t.id || '').trim().toLowerCase();
          if (!tmplMap.has(key)) {
            const syllabus = Array.isArray(t.syllabus) ? t.syllabus : [];
            let reconstructedModules = Array.isArray(t.modules) ? t.modules : [];
            if (reconstructedModules.length === 0 && syllabus.length > 0 && syllabus.some(item => item && item.moduleNumber)) {
              const modGroupMap = new Map();
              syllabus.forEach(item => {
                const mNum = Number(item.moduleNumber) || 1;
                if (!modGroupMap.has(mNum)) {
                  modGroupMap.set(mNum, {
                    id: `mod_${t.id}_${mNum}`,
                    number: mNum,
                    name: item.moduleName || `${mNum}. Modül`,
                    totalHours: 0,
                    lessonHours: 0,
                    examHours: 0,
                    topics: []
                  });
                }
                const grp = modGroupMap.get(mNum);
                grp.totalHours++;
                if (item.isExam) {
                  grp.examHours++;
                } else {
                  grp.lessonHours++;
                  if (item.topic) grp.topics.push(item.topic);
                }
              });
              reconstructedModules = Array.from(modGroupMap.values()).sort((a, b) => a.number - b.number);
            }
            tmplMap.set(key, {
              id: t.id,
              name: t.name,
              code: t.code,
              category: t.category,
              area: t.area,
              totalHours: t.total_hours,
              moduleCount: t.module_count,
              modules: reconstructedModules,
              syllabus
            });
          }
        });
        MemoryStore.knownTemplateIds = tmplIdSet;
        MemoryStore.templates = Array.from(tmplMap.values()).sort((a, b) => (a.name || '').localeCompare(b.name || '', 'tr', { sensitivity: 'base' }));
        localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(MemoryStore.templates));
        if (typeof window.onCloudSync === 'function') window.onCloudSync('templates', MemoryStore.templates);
      }

      // 4. Kullanıcıları İşle
      if (Array.isArray(users) && users.length > 0) {
        const userIdSet = new Set();
        MemoryStore.users = users.map(u => {
          if (u.id) userIdSet.add(u.id);
          return {
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
          };
        });
        MemoryStore.knownUserIds = userIdSet;
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(MemoryStore.users));
        if (typeof window.onCloudSync === 'function') window.onCloudSync('users', MemoryStore.users);
      }

      // 5. Kursları ve İlişkisel Kursiyerleri İşle
      if (!coursesErr && Array.isArray(courses)) {
        this._processCoursesData(courses);
      }

      // 6. Todo Listesini İşle
      if (Array.isArray(todos)) {
        const todoIdSet = new Set();
        MemoryStore.todos = todos.map(t => {
          if (t.id) todoIdSet.add(t.id);
          return {
            id: t.id,
            text: t.title,
            completed: t.completed,
            createdBy: t.created_by
          };
        });
        MemoryStore.knownTodoIds = todoIdSet;
        localStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(MemoryStore.todos));
        if (typeof window.onCloudSync === 'function') window.onCloudSync('todos', MemoryStore.todos);
      }

      // 7. Supabase Realtime Kanalı (courses + students + users)
      if (!this._realtimeSubscribed) {
        this._realtimeSubscribed = true;
        client
          .channel('public_realtime_changes')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'courses' }, () => {
            console.log('[Supabase Realtime] Kurs değişikliği algılandı, güncelleniyor...');
            DataStore.syncCoursesOnly();
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'students' }, () => {
            console.log('[Supabase Realtime] Kursiyer/devamsızlık değişikliği algılandı, güncelleniyor...');
            DataStore.syncCoursesOnly();
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, () => {
            DataStore.initCloudListeners();
          })
          .subscribe();
      }

      // 8. 5 Saniyelik Otomatik Senkronizasyon (Heartbeat Polling - Eğitim Sorumlusu 5sn Garanti)
      this.startAutoSync(5000);

      console.log("✅ Supabase PostgreSQL verileri başarıyla senkronize edildi.");
    } catch (err) {
      console.error("❌ Supabase senkronizasyon hatası:", err);
      updateCloudSyncStatus(false, "Senkronizasyon Hatası");
    }
  },

  _processCoursesData(courses) {
    if (this._activeSaveCount > 0 || (Date.now() - (this._lastSaveTime || 0) < 3000)) {
      return;
    }

    const idSet = new Set();
    const studentIdSet = new Set();
    const courseMap = new Map();
    courses.forEach(c => {
      const key = (c.code || c.name || c.id || '').trim().toLowerCase();
      if (courseMap.has(key)) return;
      idSet.add(c.id);
      let days = [];
      let extra = {};
      if (Array.isArray(c.lesson_days)) {
        days = c.lesson_days;
      } else if (c.lesson_days && typeof c.lesson_days === 'object') {
        days = c.lesson_days.days || [];
        extra = c.lesson_days.extra || {};
      }

      const rawStudents = (c.students || []).filter(s => {
        if (!s) return false;
        const sid = stringToUuid(s.id);
        if (MemoryStore.deletedStudentIds && (MemoryStore.deletedStudentIds.has(sid) || MemoryStore.deletedStudentIds.has(String(s.id)))) {
          return false;
        }
        return true;
      });

      const mappedCourse = {
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
        students: rawStudents.map(s => {
          const studentAbsencesMap = extra.studentAbsences || {};
          const dailyAbs = (Array.isArray(s.dailyAbsences) && s.dailyAbsences.length > 0)
            ? s.dailyAbsences
            : (studentAbsencesMap[s.id] || []);

          return {
            id: s.id,
            firstName: s.first_name || s.firstName || '',
            lastName: s.last_name || s.lastName || '',
            fullName: s.full_name || s.fullName || '',
            tcNo: s.tc_no || s.tcNo || '',
            phone: s.phone || '',
            attendance: s.attendance || 'Devamlı',
            result: s.result || '',
            absentHours: Number(s.absent_hours !== undefined ? s.absent_hours : (s.absentHours || 0)),
            moduleScores: s.module_scores || s.moduleScores || {},
            attendanceNote: s.note || s.attendanceNote || '',
            dailyAbsences: dailyAbs
          };
        })
      };
      const normalized = this._normalizeCourse(mappedCourse);
      normalized.students.forEach(s => {
        if (s && s.id) studentIdSet.add(s.id);
      });
      courseMap.set(key, normalized);
    });

    const newCourses = Array.from(courseMap.values());
    const oldJson = JSON.stringify(MemoryStore.courses || []);
    const newJson = JSON.stringify(newCourses);

    MemoryStore.knownCourseIds = idSet;
    MemoryStore.knownStudentIds = studentIdSet;

    if (oldJson !== newJson) {
      MemoryStore.courses = newCourses;
      localStorage.setItem(STORAGE_KEYS.COURSES, newJson);
      if (typeof window.onCloudSync === 'function') {
        window.onCloudSync('courses', MemoryStore.courses);
      }
    }
  },

  async syncCoursesOnly() {
    if (this._activeSaveCount > 0 || (Date.now() - (this._lastSaveTime || 0) < 3000)) {
      return;
    }

    const client = getSupabase();
    if (!client) return;

    try {
      const currentUser = this.getActiveUser();
      let courseQuery = client.from('courses').select('*, students(*)').order('created_at', { ascending: false });

      if (currentUser && currentUser.role === 'teacher') {
        courseQuery = courseQuery.eq('instructor_username', currentUser.username);
      } else if (currentUser && currentUser.role === 'department_head') {
        const myAreas = [currentUser.area, currentUser.area2].filter(Boolean);
        if (myAreas.length > 0) {
          courseQuery = courseQuery.in('area', myAreas);
        }
      }

      const { data: courses, error: coursesErr } = await courseQuery;
      if (!coursesErr && Array.isArray(courses)) {
        this._processCoursesData(courses);
      }
    } catch (e) {
      console.warn("syncCoursesOnly hatası:", e);
    }
  },

  startAutoSync(intervalMs = 5000) {
    if (this._syncInterval) return;
    this._syncInterval = setInterval(() => {
      if (document.visibilityState === 'visible' && this.getActiveUser()) {
        this.syncCoursesOnly();
      }
    }, intervalMs);
  },

  stopAutoSync() {
    if (this._syncInterval) {
      clearInterval(this._syncInterval);
      this._syncInterval = null;
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
