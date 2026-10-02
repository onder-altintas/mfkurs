// Kurs Sonu Evrak & Müfredat Yönetim Sistemi - app.js

let currentUser = null;
let currentCourses = [];
let currentCenters = [];
let currentTemplates = [];
let currentFilter = 'all';
let searchQuery = '';
let activeCourseForDetail = null;
let currentActiveView = 'teacher'; // 'teacher' | 'admin'

// DOM Elementleri
const loginScreen = document.getElementById('loginScreen');
const dashboardScreen = document.getElementById('dashboardScreen');
const loginForm = document.getElementById('loginForm');
const loginUsernameInput = document.getElementById('loginUsername');
const loginPasswordInput = document.getElementById('loginPassword');
const rememberMeCheckbox = document.getElementById('rememberMeCheckbox');
const loginError = document.getElementById('loginError');
const loginErrorText = document.getElementById('loginErrorText');
const togglePasswordBtn = document.getElementById('togglePasswordBtn');
const eyeIcon = document.getElementById('eyeIcon');

const quickLoginAdmin = document.getElementById('quickLoginAdmin');
const quickLoginUser1 = document.getElementById('quickLoginUser1');
const quickLoginUser2 = document.getElementById('quickLoginUser2');
const logoutBtn = document.getElementById('logoutBtn');

// Tema Yönetimi Elementleri
const navbarThemeToggle = document.getElementById('navbarThemeToggle');
const navbarThemeIcon = document.getElementById('navbarThemeIcon');
const navbarThemeText = document.getElementById('navbarThemeText');
const loginThemeToggle = document.getElementById('loginThemeToggle');
const loginThemeIcon = document.getElementById('loginThemeIcon');
const loginThemeText = document.getElementById('loginThemeText');
// Navigasyon & Roller
const roleBadge = document.getElementById('roleBadge');
const navViewSwitcher = document.getElementById('navViewSwitcher');
const navTeacherViewBtn = document.getElementById('navTeacherViewBtn');
const navAdminViewBtn = document.getElementById('navAdminViewBtn');
const teacherSection = document.getElementById('teacherSection');
const adminSection = document.getElementById('adminSection');

const userAvatar = document.getElementById('userAvatar');
const userFullName = document.getElementById('userFullName');
const userTitle = document.getElementById('userTitle');
const welcomeUserName = document.getElementById('welcomeUserName');
const userInstitution = document.getElementById('userInstitution');
const currentDateText = document.getElementById('currentDateText');

// Profil Düzenleme Modalı Elementleri
const userProfileBtn = document.getElementById('userProfileBtn');
const profileModal = document.getElementById('profileModal');
const closeProfileModalBtn = document.getElementById('closeProfileModalBtn');
const cancelProfileModalBtn = document.getElementById('cancelProfileModalBtn');
const profileForm = document.getElementById('profileForm');
const profileFullName = document.getElementById('profileFullName');
const profileUsername = document.getElementById('profileUsername');
const profilePassword = document.getElementById('profilePassword');
const profileTitle = document.getElementById('profileTitle');
const profileInstitution = document.getElementById('profileInstitution');
const profileAvatarUrl = document.getElementById('profileAvatarUrl');
const profilePreviewAvatar = document.getElementById('profilePreviewAvatar');
const profileRoleBadge = document.getElementById('profileRoleBadge');

// Eğitmen Dashboard Sayaçları & Listesi
const statTotalCourses = document.getElementById('statTotalCourses');
const statActiveCourses = document.getElementById('statActiveCourses');
const statCompletedCourses = document.getElementById('statCompletedCourses');
const statTotalStudents = document.getElementById('statTotalStudents');

const searchCourseInput = document.getElementById('searchCourseInput');
const filterAllBtn = document.getElementById('filterAllBtn');
const filterActiveBtn = document.getElementById('filterActiveBtn');
const filterCompletedBtn = document.getElementById('filterCompletedBtn');
const countAll = document.getElementById('countAll');
const countActive = document.getElementById('countActive');
const countCompleted = document.getElementById('countCompleted');

const courseListGrid = document.getElementById('courseListGrid');
const noCoursesState = document.getElementById('noCoursesState');
const openNewCourseModalBtn = document.getElementById('openNewCourseModalBtn');
const emptyStateAddBtn = document.getElementById('emptyStateAddBtn');

let currentUsers = [];
const centersGrid = document.getElementById('centersGrid');
const templatesGrid = document.getElementById('templatesGrid');

const openAddCenterModalBtn = document.getElementById('openAddCenterModalBtn');
const openAddCourseTmplModalBtn = document.getElementById('openAddCourseTmplModalBtn');
const openAddUserModalBtn = document.getElementById('openAddUserModalBtn');
const adminAddUserSecondaryBtn = document.getElementById('adminAddUserSecondaryBtn');

// Admin Sekmeleri & Elementleri
const adminTabCentersBtn = document.getElementById('adminTabCentersBtn');
const adminTabTemplatesBtn = document.getElementById('adminTabTemplatesBtn');
const adminTabUsersBtn = document.getElementById('adminTabUsersBtn');
const adminTabCentersContent = document.getElementById('adminTabCentersContent');
const adminTabTemplatesContent = document.getElementById('adminTabTemplatesContent');
const adminTabUsersContent = document.getElementById('adminTabUsersContent');
const adminCentersCount = document.getElementById('adminCentersCount');
const adminTemplatesCount = document.getElementById('adminTemplatesCount');
const adminUsersCount = document.getElementById('adminUsersCount');
const adminUsersTableBody = document.getElementById('adminUsersTableBody');
const adminTabTodosBtn = document.getElementById('adminTabTodosBtn');
const adminTabTodosContent = document.getElementById('adminTabTodosContent');
const adminDevTodoCount = document.getElementById('adminDevTodoCount');
const navbarDevTodoBtn = document.getElementById('navbarDevTodoBtn');
const navbarDevTodoCount = document.getElementById('navbarDevTodoCount');

// Modal: Kullanıcı Oluştur / Düzenle
const userModal = document.getElementById('userModal');
const userModalTitle = document.getElementById('userModalTitle');
const closeUserModalBtn = document.getElementById('closeUserModalBtn');
const cancelUserModalBtn = document.getElementById('cancelUserModalBtn');
const userForm = document.getElementById('userForm');
const userFormId = document.getElementById('userFormId');
const userFormFullName = document.getElementById('userFormFullName');
const userFormUsername = document.getElementById('userFormUsername');
const userFormPassword = document.getElementById('userFormPassword');
const userFormTitle = document.getElementById('userFormTitle');
const roleTeacher = document.getElementById('roleTeacher');
const roleAdmin = document.getElementById('roleAdmin');

// Modal: Kurs Merkezi (Merkez İsmi & Sorumlu)
const centerModal = document.getElementById('centerModal');
const centerModalTitle = document.getElementById('centerModalTitle');
const closeCenterModalBtn = document.getElementById('closeCenterModalBtn');
const cancelCenterModalBtn = document.getElementById('cancelCenterModalBtn');
const centerForm = document.getElementById('centerForm');
const centerFormId = document.getElementById('centerFormId');
const centerFormName = document.getElementById('centerFormName');
const centerFormSupervisor = document.getElementById('centerFormSupervisor');

// Modal: Kurs Şablonu & Müfredat
const courseTmplModal = document.getElementById('courseTmplModal');
const courseTmplModalTitle = document.getElementById('courseTmplModalTitle');
const closeCourseTmplModalBtn = document.getElementById('closeCourseTmplModalBtn');
const cancelCourseTmplModalBtn = document.getElementById('cancelCourseTmplModalBtn');
const courseTmplForm = document.getElementById('courseTmplForm');
const tmplFormId = document.getElementById('tmplFormId');
const tmplFormName = document.getElementById('tmplFormName');
const tmplFormCode = document.getElementById('tmplFormCode');
const tmplFormCategory = document.getElementById('tmplFormCategory');
const tmplFormTotalHours = document.getElementById('tmplFormTotalHours');
const tmplFormModuleCount = document.getElementById('tmplFormModuleCount');
const tmplFormDocumentType = document.getElementById('tmplFormDocumentType');
const tmplFormDescription = document.getElementById('tmplFormDescription');
const addSyllabusRowBtn = document.getElementById('addSyllabusRowBtn');
const syllabusTableBody = document.getElementById('syllabusTableBody');
const bulkSyllabusInput = document.getElementById('bulkSyllabusInput');
const applyBulkSyllabusBtn = document.getElementById('applyBulkSyllabusBtn');

// Modal: Eğitmen Kurs Ekleme
const courseModal = document.getElementById('courseModal');
const courseModalTitle = document.getElementById('courseModalTitle');
const closeCourseModalBtn = document.getElementById('closeCourseModalBtn');
const cancelCourseModalBtn = document.getElementById('cancelCourseModalBtn');
const courseForm = document.getElementById('courseForm');
const courseFormId = document.getElementById('courseFormId');
const courseFormTemplateSelect = document.getElementById('courseFormTemplateSelect');
const courseFormInstitutionSelect = document.getElementById('courseFormInstitutionSelect');
const courseFormSupervisor = document.getElementById('courseFormSupervisor');
const courseFormCode = document.getElementById('courseFormCode');
const courseFormCategory = document.getElementById('courseFormCategory');
const courseFormInstructor = document.getElementById('courseFormInstructor');
const courseFormStartDate = document.getElementById('courseFormStartDate');
const courseFormEndDate = document.getElementById('courseFormEndDate');
const courseFormTotalHours = document.getElementById('courseFormTotalHours');
const courseFormModuleCount = document.getElementById('courseFormModuleCount');
const courseFormStatus = document.getElementById('courseFormStatus');
const courseFormDocumentType = document.getElementById('courseFormDocumentType');
const courseFormClassroom = document.getElementById('courseFormClassroom');
const courseFormDescription = document.getElementById('courseFormDescription');
const courseFormDailyHours = document.getElementById('courseFormDailyHours');
const courseFormStartTime = document.getElementById('courseFormStartTime');
const courseFormEndTime = document.getElementById('courseFormEndTime');
const offDayDateInput = document.getElementById('offDayDateInput');
const offDayReasonInput = document.getElementById('offDayReasonInput');
const addOffDayBtn = document.getElementById('addOffDayBtn');
const offDaysListContainer = document.getElementById('offDaysListContainer');

let currentOffDays = [];

// Modal: Kursiyer & Evrak & Müfredat Detay
const detailModal = document.getElementById('detailModal');
const closeDetailModalBtn = document.getElementById('closeDetailModalBtn');
const bottomCloseDetailBtn = document.getElementById('bottomCloseDetailBtn');
const detailStatusBadge = document.getElementById('detailStatusBadge');
const detailDocumentTypeBadge = document.getElementById('detailDocumentTypeBadge');
const detailDocumentTypeText = document.getElementById('detailDocumentTypeText');
const detailCourseCode = document.getElementById('detailCourseCode');
const detailCourseName = document.getElementById('detailCourseName');
const detailCourseMeta = document.getElementById('detailCourseMeta');
const detailStudentCount = document.getElementById('detailStudentCount');
const detailSyllabusCount = document.getElementById('detailSyllabusCount');
const detailModuleBadge = document.getElementById('detailModuleBadge');

// Detay Sekmeleri
const tabStudentsBtn = document.getElementById('tabStudentsBtn');
const tabAttendanceBtn = document.getElementById('tabAttendanceBtn');
const tabExamsBtn = document.getElementById('tabExamsBtn');
const tabSyllabusBtn = document.getElementById('tabSyllabusBtn');
const tabDocumentsBtn = document.getElementById('tabDocumentsBtn');

const tabStudentsContent = document.getElementById('tabStudentsContent');
const tabAttendanceContent = document.getElementById('tabAttendanceContent');
const tabExamsContent = document.getElementById('tabExamsContent');
const tabSyllabusContent = document.getElementById('tabSyllabusContent');
const tabDocumentsContent = document.getElementById('tabDocumentsContent');

const toggleStudentFormBtn = document.getElementById('toggleStudentFormBtn');
const toggleBulkStudentBtn = document.getElementById('toggleBulkStudentBtn');
const closeStudentFormBtn = document.getElementById('closeStudentFormBtn');
const cancelStudentAddBtn = document.getElementById('cancelStudentAddBtn');
const studentAddForm = document.getElementById('studentAddForm');
const studentTableBody = document.getElementById('studentTableBody');
const detailSyllabusTableBody = document.getElementById('detailSyllabusTableBody');

// Toplu Kursiyer Ekleme Elementleri
const bulkStudentForm = document.getElementById('bulkStudentForm');
const closeBulkStudentBtn = document.getElementById('closeBulkStudentBtn');
const cancelBulkStudentBtn = document.getElementById('cancelBulkStudentBtn');
const saveBulkStudentBtn = document.getElementById('saveBulkStudentBtn');
const bulkStudentTextarea = document.getElementById('bulkStudentTextarea');
const bulkStudentPreviewContainer = document.getElementById('bulkStudentPreviewContainer');
const bulkStudentPreviewTbody = document.getElementById('bulkStudentPreviewTbody');
const bulkParsedCount = document.getElementById('bulkParsedCount');
const bulkStatusText = document.getElementById('bulkStatusText');
const saveBulkBtnText = document.getElementById('saveBulkBtnText');

const switchDirectToAttendanceBtn = document.getElementById('switchDirectToAttendanceBtn');
const switchDirectToExamsBtn = document.getElementById('switchDirectToExamsBtn');
const studentAddedNotice = document.getElementById('studentAddedNotice');
const noticeGoAttendanceBtn = document.getElementById('noticeGoAttendanceBtn');
const noticeGoExamsBtn = document.getElementById('noticeGoExamsBtn');

// Devamsızlık Ekranı Elementleri (Ders Günü ve Tarih Gezinme)
const attTotalHours = document.getElementById('attTotalHours');
const attMaxAllowedHours = document.getElementById('attMaxAllowedHours');
const attDailyHours = document.getElementById('attDailyHours');
const attFailedCount = document.getElementById('attFailedCount');
const attendanceTableBody = document.getElementById('attendanceTableBody');

// Tarih Gezinme Elementleri (Sol / Sağ Ok ve Gün Listesi)
const attPrevDateBtn = document.getElementById('attPrevDateBtn');
const attNextDateBtn = document.getElementById('attNextDateBtn');
const attCurrentDateDisplay = document.getElementById('attCurrentDateDisplay');
const attDateSelectDropdown = document.getElementById('attDateSelectDropdown');
const attLessonDayBadge = document.getElementById('attLessonDayBadge');
const attLessonDailyHoursNotice = document.getElementById('attLessonDailyHoursNotice');
const attHeaderDailyHours = document.getElementById('attHeaderDailyHours');

// Modül Sınavları Ekranı Elementleri
const examsMatrixThead = document.getElementById('examsMatrixThead');
const examsMatrixTbody = document.getElementById('examsMatrixTbody');
const saveAllExamsBtn = document.getElementById('saveAllExamsBtn');

// Tekil Kursiyer Devamsızlık Modalı (Gün Gün Devamsızlık)
const singleAttendanceModal = document.getElementById('singleAttendanceModal');
const closeSingleAttModalBtn = document.getElementById('closeSingleAttModalBtn');
const closeSingleAttModalFooterBtn = document.getElementById('closeSingleAttModalFooterBtn');
const saveSingleAttModalBtn = document.getElementById('saveSingleAttModalBtn');
const singleAttStudentId = document.getElementById('singleAttStudentId');
const singleAttStudentName = document.getElementById('singleAttStudentName');
const singleAttStudentTc = document.getElementById('singleAttStudentTc');
const singleAttDailyHoursLimit = document.getElementById('singleAttDailyHoursLimit');
const singleAttLimitText = document.getElementById('singleAttLimitText');
const dailyAttDateInput = document.getElementById('dailyAttDateInput');
const dailyAttMaxLabel = document.getElementById('dailyAttMaxLabel');
const dailyAttHoursInput = document.getElementById('dailyAttHoursInput');
const singleAttMaxHoursHint = document.getElementById('singleAttMaxHoursHint');
const dailyAttNoteInput = document.getElementById('dailyAttNoteInput');
const addDailyAttEntryBtn = document.getElementById('addDailyAttEntryBtn');
const singleAttDaysTableBody = document.getElementById('singleAttDaysTableBody');
const singleAttTotalBadge = document.getElementById('singleAttTotalBadge');
const singleAttStatusSummaryCard = document.getElementById('singleAttStatusSummaryCard');

// Tekil Kursiyer Modül Sınav Notu Modalı
const singleExamModal = document.getElementById('singleExamModal');
const closeSingleExamModalBtn = document.getElementById('closeSingleExamModalBtn');
const cancelSingleExamModalBtn = document.getElementById('cancelSingleExamModalBtn');
const singleExamForm = document.getElementById('singleExamForm');
const singleExamStudentId = document.getElementById('singleExamStudentId');
const singleExamStudentName = document.getElementById('singleExamStudentName');
const singleExamStudentTc = document.getElementById('singleExamStudentTc');
const singleExamModulesContainer = document.getElementById('singleExamModulesContainer');
const singleExamAvgScore = document.getElementById('singleExamAvgScore');
const singleExamResultBadge = document.getElementById('singleExamResultBadge');

// =================== TEMA YÖNETİMİ (AÇIK / KOYU TEMA) ===================
function initTheme() {
  const savedTheme = localStorage.getItem('kurs_sonu_theme') || 'light';
  applyTheme(savedTheme);
}

function applyTheme(theme) {
  const isDark = (theme === 'dark');
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem('kurs_sonu_theme', theme);
  updateThemeUI(theme);
}

function toggleTheme() {
  const current = localStorage.getItem('kurs_sonu_theme') || 'light';
  const newTheme = (current === 'dark') ? 'light' : 'dark';
  applyTheme(newTheme);
}

function updateThemeUI(theme) {
  const isDark = (theme === 'dark');

  // Navbar Toggle Güncelleme
  if (navbarThemeText) {
    navbarThemeText.innerText = isDark ? 'Koyu' : 'Açık';
  }
  if (navbarThemeIcon) {
    navbarThemeIcon.setAttribute('data-lucide', isDark ? 'moon' : 'sun');
    navbarThemeIcon.className = isDark ? 'w-4 h-4 text-[#FFF3B0]' : 'w-4 h-4 text-[#E09F3E]';
  }

  // Giriş Ekranı Toggle Güncelleme
  if (loginThemeText) {
    loginThemeText.innerText = isDark ? 'Koyu Tema' : 'Açık Tema';
  }
  if (loginThemeIcon) {
    loginThemeIcon.setAttribute('data-lucide', isDark ? 'moon' : 'sun');
    loginThemeIcon.className = isDark ? 'w-4 h-4 text-[#FFF3B0]' : 'w-4 h-4 text-[#FFF3B0]';
  }

  refreshLucide();
}

// Uygulama Başlatma
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  refreshLucide();
  updateCurrentDate();

  let sessionUser = null;
  try {
    const rawSession = sessionStorage.getItem('kurs_sonu_session_user');
    if (rawSession) sessionUser = JSON.parse(rawSession);
  } catch(e) {}

  currentUser = sessionUser || DataStore.getActiveUser();
  loadData();
  
  // Bulut Veritabanı Canlı Dinleyicilerini Başlat
  if (typeof DataStore.initCloudListeners === 'function') {
    DataStore.initCloudListeners();
  }

  if (currentUser) {
    showDashboard();
  } else {
    showLogin();
  }

  setupEventListeners();
  if (currentUser && typeof checkDevTodoList === 'function') {
    checkDevTodoList();
  }
});

// Firebase Gerçek Zamanlı Bulut Senkronizasyon Olayı
window.onCloudSync = function(type, data) {
  console.log(`[CloudSync] ${type} buluttan güncellendi:`, data ? (data.length || 'nesne') : 0);
  
  if (type === 'courses') {
    currentCourses = data;
    if (activeCourseForDetail) {
      const refreshed = currentCourses.find(c => c.id === activeCourseForDetail.id);
      if (refreshed) {
        activeCourseForDetail = refreshed;
        if (typeof renderStudentsTable === 'function' && courseDetailView && !courseDetailView.classList.contains('hidden')) {
          renderStudentsTable();
          if (typeof updateDetailHeaderStats === 'function') updateDetailHeaderStats();
        }
      }
    }
    if (currentUser) {
      renderTeacherDashboard();
      if (typeof renderAdminPanel === 'function') renderAdminPanel();
    }
  } else if (type === 'users') {
    currentUsers = data;
    if (currentUser) {
      const me = currentUsers.find(u => u.id === currentUser.id);
      if (me) {
        currentUser = me;
        sessionStorage.setItem('kurs_sonu_session_user', JSON.stringify(currentUser));
        if (typeof userFullName !== 'undefined' && userFullName) userFullName.innerText = currentUser.fullName;
        if (typeof userTitle !== 'undefined' && userTitle) userTitle.innerText = currentUser.title;
      }
      if (typeof renderUsersTable === 'function') renderUsersTable();
      if (typeof checkDevTodoList === 'function') checkDevTodoList();
    }
  } else if (type === 'centers') {
    currentCenters = data;
    if (typeof renderCentersTable === 'function') renderCentersTable();
    if (typeof renderAdminCenters === 'function') renderAdminCenters();
  } else if (type === 'templates') {
    currentTemplates = data;
    if (typeof renderTemplatesTable === 'function') renderTemplatesTable();
  } else if (type === 'todos') {
    if (typeof renderDevTodos === 'function') renderDevTodos();
  }
};

function loadData() {
  currentCourses = DataStore.getCourses();
  currentCenters = DataStore.getCenters();
  currentTemplates = DataStore.getCourseTemplates();
  currentUsers = DataStore.getUsers();
  syncCoursesWithCurrentInstructor();
}

// Kursun güncel eğitmen adını dinamik olarak çözümleyen yardımcı fonksiyon
function getCourseInstructorName(course) {
  if (!course) return (currentUser?.fullName || 'Kurs Eğitmeni').trim();

  // 1. Kurs aktif kullanıcıya aitse veya kullanıcı admin değilse, güncel profil adını kullan
  if (currentUser) {
    if (course.userId === currentUser.id || currentUser.role !== 'admin') {
      return (currentUser.fullName || course.instructor || 'Kurs Eğitmeni').trim();
    }
  }

  // 2. Kursun sahibinin kullanıcı kaydındaki güncel adını bul
  if (course.userId && Array.isArray(currentUsers)) {
    const owner = currentUsers.find(u => u.id === course.userId);
    if (owner && owner.fullName) {
      return owner.fullName.trim();
    }
  }

  // 3. Kurs üzerinde kayıtlı eğitmen adı veya aktif kullanıcı
  return (course.instructor || currentUser?.fullName || 'Kurs Eğitmeni').trim();
}

// Kursun kurum adını dinamik olarak çözümleyen yardımcı fonksiyon
function getCourseInstitutionName(course) {
  if (!course) return (currentUser?.institution || 'Halk Eğitimi Merkezi').trim();
  if (course.institution) return course.institution.trim();
  if (course.centerName) return course.centerName.trim();
  if (currentUser && (course.userId === currentUser.id || currentUser.role !== 'admin')) {
    if (currentUser.institution) return currentUser.institution.trim();
  }
  return 'Halk Eğitimi Merkezi';
}

// Eğitmenin güncel profil adını ve kurumunu tüm kurslarıyla senkronize eden fonksiyon
function syncCoursesWithCurrentInstructor() {
  if (!currentUser) return;
  let updated = false;

  currentCourses = currentCourses.map(c => {
    // Kullanıcıya ait olan veya admin olmayan eğitmenin açtığı kurslar
    if (c.userId === currentUser.id || (!c.userId && currentUser.role !== 'admin')) {
      if (currentUser.fullName && c.instructor !== currentUser.fullName) {
        c.instructor = currentUser.fullName;
        updated = true;
      }
      if (currentUser.institution && (!c.institution || c.institution === 'Kadıköy Halk Eğitimi Merkezi')) {
        c.institution = currentUser.institution;
        updated = true;
      }
    }
    return c;
  });

  if (updated) {
    DataStore.saveCourses(currentCourses);
  }

  if (activeCourseForDetail && (activeCourseForDetail.userId === currentUser.id || (!activeCourseForDetail.userId && currentUser.role !== 'admin'))) {
    if (currentUser.fullName) activeCourseForDetail.instructor = currentUser.fullName;
    if (currentUser.institution && (!activeCourseForDetail.institution || activeCourseForDetail.institution === 'Kadıköy Halk Eğitimi Merkezi')) {
      activeCourseForDetail.institution = currentUser.institution;
    }
  }
}

function refreshLucide() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function updateCurrentDate() {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  currentDateText.innerText = new Date().toLocaleDateString('tr-TR', options);
}

// Ekran Değişimleri
function showLogin() {
  loginScreen.classList.remove('hidden');
  dashboardScreen.classList.add('hidden');
  if (typeof hideDevTodoList === 'function') hideDevTodoList();
  refreshLucide();
}

function showDashboard() {
  loginScreen.classList.add('hidden');
  dashboardScreen.classList.remove('hidden');

  userAvatar.src = currentUser.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80';
  userFullName.innerText = currentUser.fullName;
  userTitle.innerText = currentUser.title;
  welcomeUserName.innerText = currentUser.fullName;
  userInstitution.innerText = currentUser.institution;

  if (currentUser.role === 'admin') {
    roleBadge.innerText = 'Sistem Yöneticisi (Admin)';
    roleBadge.className = 'px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-[#540B0E] text-white border border-[#FFF3B0]/30 shadow-xs';
    navViewSwitcher.style.setProperty('display', 'flex', 'important');
    switchView('admin');
  } else {
    roleBadge.innerText = 'Öğretici Paneli';
    roleBadge.className = 'px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-[#FFF3B0] text-[#540B0E] border border-[#E09F3E]/40 shadow-xs';
    navViewSwitcher.style.setProperty('display', 'none', 'important');
    switchView('teacher');
  }

  renderTeacherDashboard();
  renderAdminPanel();
  if (typeof checkDevTodoList === 'function') checkDevTodoList();
  refreshLucide();
}

function switchView(view) {
  // GÜVENLİK: Admin olmayan kullanıcı asla admin paneline geçemez
  if (view === 'admin' && currentUser?.role !== 'admin') {
    view = 'teacher';
  }

  currentActiveView = view;
  if (view === 'admin') {
    teacherSection.classList.add('hidden');
    adminSection.classList.remove('hidden');
    navAdminViewBtn.className = 'px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-[#152125] text-[#540B0E] dark:text-[#FFF3B0] shadow-xs cursor-pointer flex items-center gap-1.5 transition border border-[#540B0E]/20';
    navTeacherViewBtn.className = 'px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 cursor-pointer flex items-center gap-1.5 transition';
    renderAdminPanel();
  } else {
    adminSection.classList.add('hidden');
    teacherSection.classList.remove('hidden');
    navTeacherViewBtn.className = 'px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-[#152125] text-[#335C67] dark:text-[#FFF3B0] shadow-xs cursor-pointer flex items-center gap-1.5 transition border border-[#335C67]/20';
    navAdminViewBtn.className = 'px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 cursor-pointer flex items-center gap-1.5 transition';
    renderTeacherDashboard();
  }
  if (typeof checkDevTodoList === 'function') checkDevTodoList();
  refreshLucide();
}

// =================== KİŞİSEL PROFİL DÜZENLEME FONKSİYONLARI ===================

function openProfileModal() {
  if (!currentUser) return;

  if (profileFullName) profileFullName.value = currentUser.fullName || '';
  if (profileUsername) profileUsername.value = currentUser.username || '';
  if (profilePassword) profilePassword.value = currentUser.password || '';
  if (profileTitle) profileTitle.value = currentUser.title || '';
  if (profileInstitution) profileInstitution.value = currentUser.institution || '';
  if (profileAvatarUrl) profileAvatarUrl.value = currentUser.avatar || '';
  if (profilePreviewAvatar) {
    profilePreviewAvatar.src = currentUser.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80';
  }

  if (profileRoleBadge) {
    const isAdmin = currentUser.role === 'admin';
    profileRoleBadge.innerText = isAdmin ? 'Sistem Yöneticisi (Admin)' : 'Eğitmen';
    profileRoleBadge.className = isAdmin
      ? 'font-bold px-2 py-0.5 rounded text-[11px] bg-[#540B0E] text-white'
      : 'font-bold px-2 py-0.5 rounded text-[11px] bg-[#335C67] text-white';
  }

  profileModal?.classList.remove('hidden');
  profileFullName?.focus();
  refreshLucide();
}

function closeProfileModal() {
  profileModal?.classList.add('hidden');
}

function handleSaveProfile(e) {
  e.preventDefault();
  if (!currentUser) return;

  const fullName = profileFullName?.value.trim() || '';
  const username = profileUsername?.value.trim() || '';
  const password = profilePassword?.value.trim() || '';
  const title = profileTitle?.value.trim() || '';
  const institution = profileInstitution?.value.trim() || '';
  const avatar = profileAvatarUrl?.value.trim() || '';

  if (!fullName || !username || !password) {
    alert('Lütfen Ad Soyad, Kullanıcı Adı ve Şifre alanlarını eksiksiz doldurunuz.');
    return;
  }

  // Kullanıcı adı benzersizlik kontrolü (başka biri kullanıyor mu?)
  const isUsernameTaken = currentUsers.some(u => u.username.toLowerCase() === username.toLowerCase() && u.id !== currentUser.id);
  if (isUsernameTaken) {
    alert('Bu kullanıcı adı başka bir kullanıcı tarafından kullanılıyor. Lütfen farklı bir kullanıcı adı seçiniz.');
    return;
  }

  // currentUser ve currentUsers güncelle
  currentUser.fullName = fullName;
  currentUser.username = username;
  currentUser.password = password;
  currentUser.title = title;
  currentUser.institution = institution;
  if (avatar) {
    currentUser.avatar = avatar;
  }

  currentUsers = currentUsers.map(u => u.id === currentUser.id ? { ...u, ...currentUser } : u);
  DataStore.saveUsers(currentUsers);
  DataStore.setActiveUser(currentUser);

  // Kurslardaki eğitmen adı ve kurum bilgilerini senkronize et
  syncCoursesWithCurrentInstructor();

  // Arayüzü güncelle
  if (userAvatar) {
    userAvatar.src = currentUser.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80';
  }
  if (userFullName) userFullName.innerText = currentUser.fullName;
  if (userTitle) userTitle.innerText = currentUser.title || '';
  if (welcomeUserName) welcomeUserName.innerText = currentUser.fullName;
  if (userInstitution) userInstitution.innerText = currentUser.institution || '';

  // Kurs detay başlığı açıksa güncelle
  if (activeCourseForDetail && detailCourseMeta) {
    const instName = getCourseInstitutionName(activeCourseForDetail);
    const instrName = getCourseInstructorName(activeCourseForDetail);
    const daysText = (activeCourseForDetail.days && activeCourseForDetail.days.length > 0)
      ? ` • Günler: ${activeCourseForDetail.days.join(', ')}`
      : '';
    const timeText = (activeCourseForDetail.startTime && activeCourseForDetail.endTime)
      ? ` (${activeCourseForDetail.startTime} - ${activeCourseForDetail.endTime}, ${activeCourseForDetail.dailyHours || 4} Saat/Gün)`
      : (activeCourseForDetail.dailyHours ? ` (${activeCourseForDetail.dailyHours} Saat/Gün)` : '');
    detailCourseMeta.innerText = `${instName} • ${activeCourseForDetail.totalHours} Saat • Eğitmen: ${instrName}${activeCourseForDetail.supervisor ? ' • Sorumlu: ' + activeCourseForDetail.supervisor : ''}${daysText}${timeText}`;
  }

  // Eğer admin ekranı açıksa oradaki kullanıcı listesini de tazele
  if (typeof renderAdminUsers === 'function') {
    renderAdminUsers();
  }
  // Eğitmen ana sayfası açıksa kurs kartlarını yeniden çiz
  if (typeof renderTeacherDashboard === 'function') {
    renderTeacherDashboard();
  }
  // Belgeler sekmesi açıksa yeniden çiz
  if (typeof renderDocumentsTab === 'function' && activeCourseForDetail) {
    renderDocumentsTab();
  }

  closeProfileModal();
  alert('Profil bilgileriniz başarıyla güncellendi!');
}

// Event Dinleyicileri
function setupEventListeners() {
  // Giriş Formu
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loginError.classList.add('hidden');

    const uName = loginUsernameInput.value.trim().toLowerCase();
    const pass = loginPasswordInput.value.trim();

    const users = DataStore.getUsers();
    const found = users.find((u) => 
      (u.username.toLowerCase() === uName || (typeof normalizeUsername === 'function' && normalizeUsername(u.username) === normalizeUsername(uName))) && 
      u.password === pass
    );

    if (found) {
      currentUser = found;

      const rememberMe = rememberMeCheckbox ? rememberMeCheckbox.checked : true;
      if (rememberMe) {
        DataStore.setActiveUser(currentUser);
        sessionStorage.removeItem('kurs_sonu_session_user');
      } else {
        sessionStorage.setItem('kurs_sonu_session_user', JSON.stringify(currentUser));
        DataStore.setActiveUser(null);
      }

      showDashboard();
    } else {
      loginErrorText.innerText = 'Kullanıcı adı veya şifre hatalı! Lütfen deneme hesaplarını kullanınız.';
      loginError.classList.remove('hidden');
      refreshLucide();
    }
  });

  // Şifre Göster/Gizle
  togglePasswordBtn.addEventListener('click', () => {
    const isPass = loginPasswordInput.type === 'password';
    loginPasswordInput.type = isPass ? 'text' : 'password';
    eyeIcon.setAttribute('data-lucide', isPass ? 'eye-off' : 'eye');
    refreshLucide();
  });

  // Hızlı Giriş Butonları
  quickLoginAdmin.addEventListener('click', () => {
    const admin = DataStore.getUsers().find(u => u.role === 'admin');
    loginUsernameInput.value = admin.username;
    loginPasswordInput.value = admin.password;
    loginForm.dispatchEvent(new Event('submit'));
  });

  const quickLoginOzgur = document.getElementById('quickLoginOzgur');
  if (quickLoginOzgur) {
    quickLoginOzgur.addEventListener('click', () => {
      loginUsernameInput.value = 'ozgur';
      loginPasswordInput.value = '123';
      loginForm.dispatchEvent(new Event('submit'));
    });
  }

  const quickLoginOnder = document.getElementById('quickLoginOnder');
  if (quickLoginOnder) {
    quickLoginOnder.addEventListener('click', () => {
      loginUsernameInput.value = 'onder';
      loginPasswordInput.value = '123';
      loginForm.dispatchEvent(new Event('submit'));
    });
  }

  quickLoginUser1.addEventListener('click', () => {
    const user = DataStore.getUsers().find(u => u.username === 'egitmen1');
    loginUsernameInput.value = user.username;
    loginPasswordInput.value = user.password;
    loginForm.dispatchEvent(new Event('submit'));
  });

  quickLoginUser2.addEventListener('click', () => {
    const user = DataStore.getUsers().find(u => u.username === 'egitmen2');
    loginUsernameInput.value = user.username;
    loginPasswordInput.value = user.password;
    loginForm.dispatchEvent(new Event('submit'));
  });

  // Çıkış
  logoutBtn.addEventListener('click', () => {
    if (confirm('Oturumu kapatmak istediğinize emin misiniz?')) {
      currentUser = null;
      DataStore.setActiveUser(null);
      sessionStorage.removeItem('kurs_sonu_session_user');
      loginUsernameInput.value = '';
      loginPasswordInput.value = '';
      showLogin();
    }
  });

  // Kişisel Profil Düzenleme Dinleyicileri
  userProfileBtn?.addEventListener('click', openProfileModal);
  closeProfileModalBtn?.addEventListener('click', closeProfileModal);
  cancelProfileModalBtn?.addEventListener('click', closeProfileModal);
  profileAvatarUrl?.addEventListener('input', (e) => {
    if (profilePreviewAvatar) {
      profilePreviewAvatar.src = e.target.value.trim() || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80';
    }
  });
  profileForm?.addEventListener('submit', handleSaveProfile);

  // Tema Değiştirme Dinleyicileri
  navbarThemeToggle?.addEventListener('click', toggleTheme);
  loginThemeToggle?.addEventListener('click', toggleTheme);

  // View Switcher (Admin / Teacher)
  navTeacherViewBtn?.addEventListener('click', () => switchView('teacher'));
  navAdminViewBtn?.addEventListener('click', () => switchView('admin'));

  // Admin Alt Sekmeleri
  adminTabCentersBtn.addEventListener('click', () => switchAdminTab('centers'));
  adminTabTemplatesBtn.addEventListener('click', () => switchAdminTab('templates'));
  adminTabUsersBtn.addEventListener('click', () => switchAdminTab('users'));
  if (adminTabTodosBtn) {
    adminTabTodosBtn.addEventListener('click', () => switchAdminTab('todos'));
  }

  // Kullanıcı Yönetimi Ekleme / Düzenleme
  openAddUserModalBtn.addEventListener('click', () => openUserModal());
  adminAddUserSecondaryBtn.addEventListener('click', () => openUserModal());
  closeUserModalBtn.addEventListener('click', () => closeUserModal());
  cancelUserModalBtn.addEventListener('click', () => closeUserModal());
  userForm.addEventListener('submit', handleSaveUser);

  // Merkez Ekleme
  openAddCenterModalBtn.addEventListener('click', () => openCenterModal());
  closeCenterModalBtn.addEventListener('click', () => closeCenterModal());
  cancelCenterModalBtn.addEventListener('click', () => closeCenterModal());
  centerForm.addEventListener('submit', handleSaveCenter);

  // Kurs Şablonu / Müfredat Ekleme
  openAddCourseTmplModalBtn.addEventListener('click', () => openCourseTmplModal());
  closeCourseTmplModalBtn.addEventListener('click', () => closeCourseTmplModal());
  cancelCourseTmplModalBtn.addEventListener('click', () => closeCourseTmplModal());
  courseTmplForm.addEventListener('submit', handleSaveCourseTemplate);

  addSyllabusRowBtn.addEventListener('click', () => addSyllabusRow());
  applyBulkSyllabusBtn.addEventListener('click', applyBulkSyllabus);

  // Eğitmen Kurs Arama & Filtre
  searchCourseInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    renderCourseList();
  });

  filterAllBtn.addEventListener('click', () => setCourseFilter('all'));
  filterActiveBtn.addEventListener('click', () => setCourseFilter('active'));
  filterCompletedBtn.addEventListener('click', () => setCourseFilter('completed'));

  // Eğitmen Yeni Kurs Modalı
  openNewCourseModalBtn.addEventListener('click', () => openCourseModal());
  emptyStateAddBtn.addEventListener('click', () => openCourseModal());
  closeCourseModalBtn.addEventListener('click', () => closeCourseModal());
  cancelCourseModalBtn.addEventListener('click', () => closeCourseModal());
  courseForm.addEventListener('submit', handleSaveCourse);

  // Ders Yapılmayan Günler Ekle Butonu
  if (addOffDayBtn) {
    addOffDayBtn.addEventListener('click', handleAddOffDay);
  }

  // Kurs Adı / Şablon Seçildiğinde Otomatik Doldurma
  if (courseFormTemplateSelect) {
    courseFormTemplateSelect.addEventListener('change', (e) => {
      const tmplId = e.target.value;
      if (!tmplId) return;
      const tmpl = currentTemplates.find(t => t.id === tmplId);
      if (tmpl) {
        courseFormCode.value = tmpl.code || '';
        courseFormCategory.value = tmpl.category || 'Bilişim Teknolojileri';
        courseFormTotalHours.value = tmpl.totalHours || 120;
        if (courseFormModuleCount) {
          courseFormModuleCount.value = tmpl.moduleCount || 1;
        }
        if (courseFormDocumentType && tmpl.documentType) {
          courseFormDocumentType.value = tmpl.documentType;
        }
        if (!courseFormDescription.value.trim()) {
          courseFormDescription.value = tmpl.description || '';
        }
      }
    });
  }

  // Kurs Merkezi Seçildiğinde Otomatik Sorumlu Doldurma
  if (courseFormInstitutionSelect) {
    courseFormInstitutionSelect.addEventListener('change', (e) => {
      const selectedName = e.target.value;
      const matchedCenter = currentCenters.find(c => c.name === selectedName);
      if (matchedCenter && matchedCenter.supervisor) {
        courseFormSupervisor.value = matchedCenter.supervisor;
      }
    });
  }

  // Kurs Detay Modalı
  closeDetailModalBtn.addEventListener('click', () => closeDetailModal());
  bottomCloseDetailBtn.addEventListener('click', () => closeDetailModal());
  document.getElementById('closeDetailModalTopRightBtn')?.addEventListener('click', () => closeDetailModal());
  document.getElementById('detailEditCourseBtn')?.addEventListener('click', () => {
    if (activeCourseForDetail) openCourseModal(activeCourseForDetail);
  });

  tabStudentsBtn.addEventListener('click', () => switchDetailTab('students'));
  tabAttendanceBtn.addEventListener('click', () => switchDetailTab('attendance'));
  tabExamsBtn.addEventListener('click', () => switchDetailTab('exams'));
  tabSyllabusBtn.addEventListener('click', () => switchDetailTab('syllabus'));
  tabDocumentsBtn.addEventListener('click', () => switchDetailTab('documents'));

  if (switchDirectToAttendanceBtn) {
    switchDirectToAttendanceBtn.addEventListener('click', () => switchDetailTab('attendance'));
  }
  if (switchDirectToExamsBtn) {
    switchDirectToExamsBtn.addEventListener('click', () => switchDetailTab('exams'));
  }
  if (noticeGoAttendanceBtn) {
    noticeGoAttendanceBtn.addEventListener('click', () => switchDetailTab('attendance'));
  }
  if (noticeGoExamsBtn) {
    noticeGoExamsBtn.addEventListener('click', () => switchDetailTab('exams'));
  }

  toggleStudentFormBtn.addEventListener('click', () => {
    studentAddForm.reset();
    bulkStudentForm?.classList.add('hidden');
    const stdEditId = document.getElementById('stdEditId');
    if (stdEditId) stdEditId.value = '';
    const studentFormTitle = document.getElementById('studentFormTitle');
    if (studentFormTitle) studentFormTitle.innerText = 'Yeni Kursiyer Ekleme';
    const studentFormSubmitText = document.getElementById('studentFormSubmitText');
    if (studentFormSubmitText) studentFormSubmitText.innerText = 'Kursiyeri Kaydet';
    studentAddForm.classList.remove('hidden');
    document.getElementById('stdFirstName')?.focus();
  });
  closeStudentFormBtn.addEventListener('click', () => studentAddForm.classList.add('hidden'));
  cancelStudentAddBtn.addEventListener('click', () => studentAddForm.classList.add('hidden'));
  studentAddForm.addEventListener('submit', handleAddStudent);

  // Toplu Kursiyer Ekleme Dinleyicileri
  toggleBulkStudentBtn?.addEventListener('click', () => {
    studentAddForm?.classList.add('hidden');
    if (bulkStudentForm.classList.contains('hidden')) {
      bulkStudentForm.classList.remove('hidden');
      bulkStudentTextarea.focus();
    } else {
      bulkStudentForm.classList.add('hidden');
    }
  });

  closeBulkStudentBtn?.addEventListener('click', () => {
    bulkStudentForm?.classList.add('hidden');
  });

  cancelBulkStudentBtn?.addEventListener('click', () => {
    if (bulkStudentTextarea) bulkStudentTextarea.value = '';
    handleBulkStudentInput();
    bulkStudentForm?.classList.add('hidden');
  });

  bulkStudentTextarea?.addEventListener('input', handleBulkStudentInput);
  saveBulkStudentBtn?.addEventListener('click', handleSaveBulkStudents);

  // Tarih Gezinme Butonları (Önceki / Sonraki Kurs Günü)
  if (attPrevDateBtn) {
    attPrevDateBtn.addEventListener('click', handleAttPrevDate);
  }
  if (attNextDateBtn) {
    attNextDateBtn.addEventListener('click', handleAttNextDate);
  }
  if (attDateSelectDropdown) {
    attDateSelectDropdown.addEventListener('change', handleAttDateSelectChange);
  }
  if (saveAllExamsBtn) {
    saveAllExamsBtn.addEventListener('click', handleSaveAllExams);
  }

  // Gün Gün Devamsızlık Modalı Dinleyicileri
  closeSingleAttModalBtn?.addEventListener('click', closeSingleAttModal);
  closeSingleAttModalFooterBtn?.addEventListener('click', closeSingleAttModal);
  addDailyAttEntryBtn?.addEventListener('click', handleAddDailyAttEntry);
  saveSingleAttModalBtn?.addEventListener('click', handleSaveSingleAttModal);

  // Tekil Kursiyer Sınav Modalı
  closeSingleExamModalBtn?.addEventListener('click', closeSingleExamModal);
  cancelSingleExamModalBtn?.addEventListener('click', closeSingleExamModal);
  singleExamForm?.addEventListener('submit', handleSaveSingleExam);

  // Kurs Bitiş Tarihi Otomatik Hesaplama Dinleyicileri
  courseFormStartDate?.addEventListener('change', autoCalculateCourseEndDate);
  courseFormTotalHours?.addEventListener('input', autoCalculateCourseEndDate);
  courseFormDailyHours?.addEventListener('input', autoCalculateCourseEndDate);
  document.querySelectorAll('.course-day-checkbox').forEach(cb => {
    cb.addEventListener('change', autoCalculateCourseEndDate);
  });

  // Excel İçe / Dışa Aktarma Dinleyicileri
  const exportStudentsExcelBtn = document.getElementById('exportStudentsExcelBtn');
  const importStudentsExcelBtn = document.getElementById('importStudentsExcelBtn');
  const importStudentsExcelInput = document.getElementById('importStudentsExcelInput');

  exportStudentsExcelBtn?.addEventListener('click', exportStudentsToExcel);
  importStudentsExcelBtn?.addEventListener('click', () => importStudentsExcelInput?.click());
  importStudentsExcelInput?.addEventListener('change', handleImportStudentsFromExcel);

  // JSON Yedekleme / Geri Yükleme Dinleyicileri
  const exportBackupJsonBtn = document.getElementById('exportBackupJsonBtn');
  const importBackupJsonBtn = document.getElementById('importBackupJsonBtn');
  const importBackupJsonInput = document.getElementById('importBackupJsonInput');

  exportBackupJsonBtn?.addEventListener('click', exportSystemBackupJson);
  importBackupJsonBtn?.addEventListener('click', () => importBackupJsonInput?.click());
  importBackupJsonInput?.addEventListener('change', handleImportSystemBackupJson);
}

// =================== ADMIN YÖNETİM PANELİ İŞLEMLERİ ===================

function switchAdminTab(tab) {
  const allBtns = [adminTabCentersBtn, adminTabTemplatesBtn, adminTabUsersBtn, adminTabTodosBtn].filter(Boolean);
  allBtns.forEach(btn => {
    btn.className = 'flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 border-transparent text-slate-600 hover:text-slate-900 transition cursor-pointer whitespace-nowrap';
  });
  if (adminTabCentersContent) adminTabCentersContent.classList.add('hidden');
  if (adminTabTemplatesContent) adminTabTemplatesContent.classList.add('hidden');
  if (adminTabUsersContent) adminTabUsersContent.classList.add('hidden');
  if (adminTabTodosContent) adminTabTodosContent.classList.add('hidden');

  if (tab === 'centers') {
    adminTabCentersBtn.className = 'flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 border-indigo-600 text-indigo-700 transition cursor-pointer whitespace-nowrap';
    if (adminTabCentersContent) adminTabCentersContent.classList.remove('hidden');
  } else if (tab === 'templates') {
    adminTabTemplatesBtn.className = 'flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 border-sky-600 text-sky-700 transition cursor-pointer whitespace-nowrap';
    if (adminTabTemplatesContent) adminTabTemplatesContent.classList.remove('hidden');
  } else if (tab === 'users') {
    adminTabUsersBtn.className = 'flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 border-purple-600 text-purple-700 transition cursor-pointer whitespace-nowrap';
    if (adminTabUsersContent) adminTabUsersContent.classList.remove('hidden');
    renderAdminUsers();
  } else if (tab === 'todos') {
    if (adminTabTodosBtn) {
      adminTabTodosBtn.className = 'flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 border-amber-600 text-amber-800 transition cursor-pointer whitespace-nowrap';
    }
    if (adminTabTodosContent) adminTabTodosContent.classList.remove('hidden');
    renderDevTodos();
  }
  refreshLucide();
}

window.switchAdminTab = switchAdminTab;

function renderAdminPanel() {
  loadData();
  renderAdminCenters();
  renderAdminTemplates();
  renderAdminUsers();
}

// =================== KULLANICI YÖNETİMİ FONKSİYONLARI ===================

function renderAdminUsers() {
  adminUsersCount.innerText = currentUsers.length;
  adminUsersTableBody.innerHTML = '';

  currentUsers.forEach(user => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50/80 transition';

    const isAdmin = user.role === 'admin';
    const isCurrentActiveUser = (user.id === currentUser?.id);

    tr.innerHTML = `
      <td class="px-4 py-3">
        <div class="flex items-center gap-2.5">
          <img
            src="${user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'}"
            alt="${escapeHtml(user.fullName)}"
            class="w-8 h-8 rounded-full object-cover ring-2 ring-slate-200"
          />
          <div>
            <div class="font-bold text-slate-800 text-xs">${escapeHtml(user.fullName)} ${isCurrentActiveUser ? '<span class="text-[10px] text-purple-600 font-bold">(Siz)</span>' : ''}</div>
            <div class="text-[11px] text-slate-400">${escapeHtml(user.title || '-')}</div>
          </div>
        </div>
      </td>
      <td class="px-4 py-3 font-mono text-slate-700 font-bold">
        ${escapeHtml(user.username)}
      </td>
      <td class="px-4 py-3">
        <div class="inline-flex items-center gap-1.5 px-2 py-1 bg-amber-50 border border-amber-200 rounded-lg text-[11px] font-mono font-bold text-amber-900 shadow-2xs">
          <i data-lucide="key" class="w-3 h-3 text-amber-600"></i>
          <span>${escapeHtml(user.password)}</span>
        </div>
      </td>
      <td class="px-4 py-3">
        <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold ${
          isAdmin 
            ? 'bg-purple-100 text-purple-800 border border-purple-200' 
            : 'bg-sky-50 text-sky-700 border border-sky-200'
        }">
          <i data-lucide="${isAdmin ? 'shield-check' : 'user'}" class="w-3 h-3"></i>
          <span>${isAdmin ? 'Sistem Yöneticisi (Admin)' : 'Eğitmen'}</span>
        </span>
      </td>
      <td class="px-4 py-3 text-right">
        <div class="flex items-center justify-end gap-1.5">
          <button
            onclick="toggleUserAdminRole('${user.id}')"
            class="px-2 py-1 rounded-lg text-[11px] font-bold border transition cursor-pointer ${
              isAdmin
                ? 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'
                : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200'
            }"
            title="${isAdmin ? 'Admin Yetkisini Kaldır' : 'Admin Yetkisi Ver'}"
            ${isCurrentActiveUser ? 'disabled title="Kendi admin yetkinizi kaldıramazsınız"' : ''}
          >
            ${isAdmin ? 'Yetkiyi Düşür' : 'Admin Yap'}
          </button>

          <button
            onclick="editUserAccount('${user.id}')"
            class="p-1.5 text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition cursor-pointer"
            title="Şifre ve Bilgileri Düzenle"
          >
            <i data-lucide="edit-3" class="w-4 h-4"></i>
          </button>

          <button
            onclick="deleteUserAccount('${user.id}')"
            class="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer ${
              isCurrentActiveUser ? 'opacity-30 pointer-events-none' : ''
            }"
            title="Kullanıcıyı Sil"
          >
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      </td>
    `;

    adminUsersTableBody.appendChild(tr);
  });

  refreshLucide();
}

function openUserModal(userToEdit = null) {
  userModal.classList.remove('hidden');

  if (userToEdit) {
    userModalTitle.innerText = 'Kullanıcı Bilgilerini & Şifresini Güncelle';
    userFormId.value = userToEdit.id;
    userFormFullName.value = userToEdit.fullName;
    userFormUsername.value = userToEdit.username;
    userFormPassword.value = userToEdit.password;
    userFormTitle.value = userToEdit.title || '';
    if (userToEdit.role === 'admin') {
      roleAdmin.checked = true;
    } else {
      roleTeacher.checked = true;
    }
  } else {
    userModalTitle.innerText = 'Yeni Kullanıcı Hesabı Ekle';
    userForm.reset();
    userFormId.value = '';
    roleTeacher.checked = true;
  }

  userFormFullName.focus();
  refreshLucide();
}

function closeUserModal() {
  userModal.classList.add('hidden');
}

function handleSaveUser(e) {
  e.preventDefault();
  const id = userFormId.value;
  const fullName = userFormFullName.value.trim();
  const username = userFormUsername.value.trim().toLowerCase();
  const password = userFormPassword.value.trim();
  const title = userFormTitle.value.trim();
  const role = roleAdmin.checked ? 'admin' : 'teacher';

  if (!fullName || !username || !password) {
    alert('Lütfen Ad Soyad, Kullanıcı Adı ve Şifre alanlarını doldurunuz.');
    return;
  }

  // Kullanıcı adı çakışma kontrolü
  const existingUser = currentUsers.find(u => u.username.toLowerCase() === username && u.id !== id);
  if (existingUser) {
    alert(`"${username}" kullanıcı adı zaten kullanımda! Lütfen farklı bir kullanıcı adı belirleyin.`);
    return;
  }

  if (id) {
    // Güncelleme
    currentUsers = currentUsers.map(u => {
      if (u.id === id) {
        const updated = {
          ...u,
          fullName,
          username,
          password,
          title,
          role
        };
        if (currentUser?.id === id) {
          currentUser = updated;
          DataStore.setActiveUser(currentUser);
        }
        return updated;
      }
      return u;
    });
  } else {
    // Yeni kullanıcı
    const newUser = {
      id: `user_${Date.now()}`,
      fullName,
      username,
      password,
      title: title || (role === 'admin' ? 'Yönetici' : 'Eğitmen'),
      role,
      email: `${username}@meb.k12.tr`,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}`
    };
    currentUsers.push(newUser);
  }

  DataStore.saveUsers(currentUsers);
  closeUserModal();
  renderAdminUsers();
}

window.editUserAccount = function(userId) {
  const user = currentUsers.find(u => u.id === userId);
  if (user) openUserModal(user);
};

window.toggleUserAdminRole = function(userId) {
  if (userId === currentUser?.id) {
    alert('Kendi admin yetkinizi kaldıramazsınız.');
    return;
  }

  const user = currentUsers.find(u => u.id === userId);
  if (!user) return;

  const newRole = user.role === 'admin' ? 'teacher' : 'admin';
  const roleTitle = newRole === 'admin' ? 'Sistem Yöneticisi (Admin)' : 'Eğitmen';

  if (confirm(`"${user.fullName}" kullanıcısının yetkisi "${roleTitle}" olarak değiştirilsin mi?`)) {
    user.role = newRole;
    DataStore.saveUsers(currentUsers);
    renderAdminUsers();
  }
};

window.deleteUserAccount = function(userId) {
  if (userId === currentUser?.id) {
    alert('Kendi hesabınızı silemezsiniz.');
    return;
  }

  const user = currentUsers.find(u => u.id === userId);
  if (!user) return;

  if (confirm(`"${user.fullName}" (${user.username}) kullanıcısını silmek istediğinize emin misiniz?`)) {
    currentUsers = currentUsers.filter(u => u.id !== userId);
    DataStore.saveUsers(currentUsers);
    renderAdminUsers();
  }
};

function renderAdminCenters() {
  adminCentersCount.innerText = currentCenters.length;
  centersGrid.innerHTML = '';

  currentCenters.forEach((center) => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-indigo-300 hover:shadow-md transition flex items-center justify-between gap-4';

    const supervisorInfo = center.supervisor
      ? `<div class="flex items-center gap-1.5 text-xs text-slate-600 mt-1 font-medium">
           <i data-lucide="user-check" class="w-3.5 h-3.5 text-emerald-600 shrink-0"></i>
           <span>Sorumlu: <strong class="text-slate-800">${escapeHtml(center.supervisor)}</strong></span>
         </div>`
      : `<div class="flex items-center gap-1 text-[11px] text-slate-400 mt-1 italic">
           <i data-lucide="user-x" class="w-3.5 h-3.5 text-slate-300 shrink-0"></i>
           <span>Sorumlu belirtilmemiş</span>
         </div>`;

    card.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="p-3 rounded-xl bg-indigo-50 text-indigo-700 shrink-0">
          <i data-lucide="building-2" class="w-6 h-6"></i>
        </div>
        <div>
          <h4 class="font-bold text-slate-800 text-sm sm:text-base leading-snug">${escapeHtml(center.name)}</h4>
          <span class="text-[11px] text-slate-400">Kayıtlı Kurs Merkezi</span>
          ${supervisorInfo}
        </div>
      </div>

      <div class="flex items-center gap-1.5 shrink-0">
        <button
          onclick="editCenter('${center.id}')"
          class="p-2 text-indigo-700 hover:bg-indigo-50 rounded-xl transition cursor-pointer"
          title="Merkez Bilgilerini Düzenle"
        >
          <i data-lucide="edit-3" class="w-4 h-4"></i>
        </button>
        <button
          onclick="deleteCenter('${center.id}')"
          class="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
          title="Merkezi Sil"
        >
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>
    `;

    centersGrid.appendChild(card);
  });

  refreshLucide();
}

function openCenterModal(centerToEdit = null) {
  centerModal.classList.remove('hidden');

  if (centerToEdit) {
    centerModalTitle.innerText = 'Kurs Merkezi Bilgilerini Güncelle';
    centerFormId.value = centerToEdit.id;
    centerFormName.value = centerToEdit.name;
    if (centerFormSupervisor) centerFormSupervisor.value = centerToEdit.supervisor || '';
  } else {
    centerModalTitle.innerText = 'Yeni Kurs Merkezi Ekle';
    centerForm.reset();
    centerFormId.value = '';
    if (centerFormSupervisor) centerFormSupervisor.value = '';
  }
  centerFormName.focus();
  refreshLucide();
}

function closeCenterModal() {
  centerModal.classList.add('hidden');
}

function handleSaveCenter(e) {
  e.preventDefault();
  const id = centerFormId.value;
  const name = centerFormName.value.trim();
  const supervisor = centerFormSupervisor ? centerFormSupervisor.value.trim() : '';
  if (!name) return;

  if (id) {
    currentCenters = currentCenters.map(c => c.id === id ? { ...c, name, supervisor } : c);
  } else {
    const newCenter = {
      id: `center_${Date.now()}`,
      name,
      supervisor
    };
    currentCenters.unshift(newCenter);
  }

  DataStore.saveCenters(currentCenters);
  closeCenterModal();
  renderAdminCenters();
}

window.editCenter = function(centerId) {
  const center = currentCenters.find(c => c.id === centerId);
  if (center) openCenterModal(center);
};

window.deleteCenter = function(centerId) {
  if (confirm('Bu kurs merkezini silmek istediğinize emin misiniz?')) {
    currentCenters = currentCenters.filter(c => c.id !== centerId);
    DataStore.saveCenters(currentCenters);
    renderAdminCenters();
  }
};

// =================== KURS VE SAATLİK MÜFREDAT YÖNETİMİ ===================

function renderAdminTemplates() {
  adminTemplatesCount.innerText = currentTemplates.length;
  templatesGrid.innerHTML = '';

  currentTemplates.forEach((tmpl) => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 hover:border-sky-300 transition';

    const syllabusCount = tmpl.syllabus?.length || 0;

    let syllabusPreviewHtml = '';
    if (syllabusCount > 0) {
      syllabusPreviewHtml = `
        <details class="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
          <summary class="font-bold text-sky-800 cursor-pointer select-none flex items-center justify-between">
            <span>Saatlik Konu Planını Görüntüle (${syllabusCount} Saat Tanımlı)</span>
            <span class="text-[11px] text-slate-400">Genişlet / Daralt</span>
          </summary>
          <div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 border-t border-slate-200 max-h-56 overflow-y-auto">
            ${tmpl.syllabus.map(s => `
              <div class="p-2 bg-white rounded-lg border border-slate-100 flex items-start gap-2">
                <span class="px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 text-[10px] font-bold shrink-0 mt-0.5">${s.hour}. Saat</span>
                <span class="text-[11px] text-slate-700">${escapeHtml(s.topic)}</span>
              </div>
            `).join('')}
          </div>
        </details>
      `;
    } else {
      syllabusPreviewHtml = `
        <div class="p-3 bg-amber-50 text-amber-800 rounded-xl text-xs border border-amber-200">
          Henüz saatlik konu planı girilmemiş. "Düzenle" butonundan saat saat konuları ekleyebilirsiniz.
        </div>
      `;
    }

    card.innerHTML = `
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-sky-50 text-sky-600 rounded-xl">
            <i data-lucide="book-open" class="w-6 h-6"></i>
          </div>
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h4 class="font-bold text-slate-800 text-base">${escapeHtml(tmpl.name)}</h4>
              <span class="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">${escapeHtml(tmpl.code || '-')}</span>
              <span class="text-xs font-bold bg-[#E09F3E]/20 text-[#540B0E] border border-[#E09F3E]/40 px-2 py-0.5 rounded-md flex items-center gap-1">
                <i data-lucide="award" class="w-3 h-3 text-[#E09F3E]"></i>
                <span>${escapeHtml(tmpl.documentType || 'Sertifika')}</span>
              </span>
              <span class="text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                <i data-lucide="layers" class="w-3 h-3 text-purple-600"></i>
                <span>${tmpl.moduleCount || 1} Modül</span>
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">
              ${escapeHtml(tmpl.category)} • <strong>${tmpl.totalHours} Saat</strong> Toplam Ders Süresi • <strong>${tmpl.moduleCount || 1} Modül Sonu Sınavı</strong>
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            onclick="editCourseTemplate('${tmpl.id}')"
            class="px-3 py-1.5 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg transition flex items-center gap-1 cursor-pointer"
          >
            <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
            <span>Düzenle</span>
          </button>
          <button
            onclick="deleteCourseTemplate('${tmpl.id}')"
            class="px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition flex items-center gap-1 cursor-pointer"
          >
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            <span>Sil</span>
          </button>
        </div>
      </div>

      <p class="text-xs text-slate-600">${escapeHtml(tmpl.description || 'Açıklama girilmemiş.')}</p>

      ${syllabusPreviewHtml}
    `;

    templatesGrid.appendChild(card);
  });

  refreshLucide();
}

function openCourseTmplModal(tmplToEdit = null) {
  courseTmplModal.classList.remove('hidden');
  syllabusTableBody.innerHTML = '';
  bulkSyllabusInput.value = '';

  if (tmplToEdit) {
    courseTmplModalTitle.innerText = 'Kurs ve Müfredat Tanımını Güncelle';
    tmplFormId.value = tmplToEdit.id;
    tmplFormName.value = tmplToEdit.name;
    tmplFormCode.value = tmplToEdit.code || '';
    tmplFormCategory.value = tmplToEdit.category || 'Bilişim Teknolojileri';
    tmplFormTotalHours.value = tmplToEdit.totalHours || 120;
    if (tmplFormModuleCount) tmplFormModuleCount.value = tmplToEdit.moduleCount || 1;
    if (tmplFormDocumentType) tmplFormDocumentType.value = tmplToEdit.documentType || 'Sertifika';
    tmplFormDescription.value = tmplToEdit.description || '';

    (tmplToEdit.syllabus || []).forEach(s => addSyllabusRow(s.hour, s.topic));
  } else {
    courseTmplModalTitle.innerText = 'Yeni Kurs ve Müfredat Tanımla';
    courseTmplForm.reset();
    tmplFormId.value = '';
    tmplFormTotalHours.value = 120;
    if (tmplFormModuleCount) tmplFormModuleCount.value = 1;
    if (tmplFormDocumentType) tmplFormDocumentType.value = 'Sertifika';
    // Varsayılan ilk 5 saati ekle
    for (let i = 1; i <= 5; i++) {
      addSyllabusRow(i, '');
    }
  }
  refreshLucide();
}

function closeCourseTmplModal() {
  courseTmplModal.classList.add('hidden');
}

function addSyllabusRow(hour = null, topic = '') {
  const currentRows = syllabusTableBody.querySelectorAll('tr').length;
  const hourNum = hour !== null ? hour : currentRows + 1;

  const tr = document.createElement('tr');
  tr.className = 'syllabus-row';
  tr.innerHTML = `
    <td class="px-3 py-1.5">
      <input
        type="number"
        value="${hourNum}"
        class="hour-input w-16 px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs text-center font-bold"
      />
    </td>
    <td class="px-3 py-1.5">
      <input
        type="text"
        value="${escapeHtml(topic)}"
        placeholder="${hourNum}. Ders Saati Konusu..."
        class="topic-input w-full px-2.5 py-1 bg-slate-50 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-sky-500"
      />
    </td>
    <td class="px-3 py-1.5 text-center">
      <button
        type="button"
        onclick="this.closest('tr').remove()"
        class="p-1 text-slate-400 hover:text-rose-600 rounded"
      >
        <i data-lucide="trash-2" class="w-4 h-4"></i>
      </button>
    </td>
  `;
  syllabusTableBody.appendChild(tr);
  refreshLucide();
}

function applyBulkSyllabus() {
  const rawText = bulkSyllabusInput.value.trim();
  if (!rawText) return;

  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) return;

  syllabusTableBody.innerHTML = '';
  lines.forEach((line, idx) => {
    // Varsa baştaki "1. ", "1 - " gibi rakamları temizle
    const cleanTopic = line.replace(/^\d+[\.\-\)\s]+/, '');
    addSyllabusRow(idx + 1, cleanTopic);
  });

  tmplFormTotalHours.value = lines.length;
  bulkSyllabusInput.value = '';
}

function handleSaveCourseTemplate(e) {
  e.preventDefault();
  const id = tmplFormId.value;

  // Saatlik konuları topla
  const rows = syllabusTableBody.querySelectorAll('.syllabus-row');
  const syllabus = [];
  rows.forEach(row => {
    const h = Number(row.querySelector('.hour-input').value) || (syllabus.length + 1);
    const t = row.querySelector('.topic-input').value.trim();
    if (t) {
      syllabus.push({ hour: h, topic: t });
    }
  });

  syllabus.sort((a, b) => a.hour - b.hour);
  const moduleCount = tmplFormModuleCount ? Math.max(1, Number(tmplFormModuleCount.value) || 1) : 1;
  const documentType = tmplFormDocumentType ? tmplFormDocumentType.value : 'Sertifika';

  if (id) {
    currentTemplates = currentTemplates.map(t => t.id === id ? {
      ...t,
      name: tmplFormName.value.trim(),
      code: tmplFormCode.value.trim(),
      category: tmplFormCategory.value,
      totalHours: Number(tmplFormTotalHours.value) || 0,
      moduleCount,
      documentType,
      description: tmplFormDescription.value.trim(),
      syllabus
    } : t);
  } else {
    const newTmpl = {
      id: `tmpl_${Date.now()}`,
      name: tmplFormName.value.trim(),
      code: tmplFormCode.value.trim() || `KRS-${new Date().getFullYear()}`,
      category: tmplFormCategory.value,
      totalHours: Number(tmplFormTotalHours.value) || 0,
      moduleCount,
      documentType,
      description: tmplFormDescription.value.trim(),
      syllabus
    };
    currentTemplates.unshift(newTmpl);
  }

  DataStore.saveCourseTemplates(currentTemplates);
  closeCourseTmplModal();
  renderAdminTemplates();
}

window.editCourseTemplate = function(tmplId) {
  const tmpl = currentTemplates.find(t => t.id === tmplId);
  if (tmpl) openCourseTmplModal(tmpl);
};

window.deleteCourseTemplate = function(tmplId) {
  if (confirm('Bu kurs şablonunu ve müfredatını silmek istediğinize emin misiniz?')) {
    currentTemplates = currentTemplates.filter(t => t.id !== tmplId);
    DataStore.saveCourseTemplates(currentTemplates);
    renderAdminTemplates();
  }
};

// =================== EĞİTMEN KURS & DASHBOARD İŞLEMLERİ ===================

function setCourseFilter(filter) {
  currentFilter = filter;
  [filterAllBtn, filterActiveBtn, filterCompletedBtn].forEach(btn => {
    btn.className = 'filter-btn px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 cursor-pointer';
  });

  if (filter === 'all') {
    filterAllBtn.className = 'filter-btn active px-3 py-1.5 rounded-lg text-xs font-bold bg-white dark:bg-[#152125] text-slate-800 dark:text-slate-100 shadow-xs border border-slate-200 dark:border-[#23353c] cursor-pointer';
  } else if (filter === 'active') {
    filterActiveBtn.className = 'filter-btn active px-3 py-1.5 rounded-lg text-xs font-bold bg-white dark:bg-[#152125] text-[#335C67] dark:text-[#FFF3B0] shadow-xs border border-[#335C67]/40 cursor-pointer';
  } else if (filter === 'completed') {
    filterCompletedBtn.className = 'filter-btn active px-3 py-1.5 rounded-lg text-xs font-bold bg-white dark:bg-[#152125] text-[#540B0E] dark:text-[#FFF3B0] shadow-xs border border-[#540B0E]/40 cursor-pointer';
  }

  renderCourseList();
}

function renderTeacherDashboard() {
  loadData();
  const userCourses = (currentUser.role === 'admin') 
    ? currentCourses // Admin tüm kursları görebilir
    : currentCourses.filter(c => c.userId === currentUser.id);

  const total = userCourses.length;
  const active = userCourses.filter(c => c.status === 'active').length;
  const completed = userCourses.filter(c => c.status === 'completed').length;
  const totalStudents = userCourses.reduce((sum, c) => sum + (c.students?.length || 0), 0);

  statTotalCourses.innerText = total;
  statActiveCourses.innerText = active;
  statCompletedCourses.innerText = completed;
  statTotalStudents.innerText = totalStudents;

  countAll.innerText = total;
  countActive.innerText = active;
  countCompleted.innerText = completed;

  renderCourseList();
}

function renderCourseList() {
  const userCourses = (currentUser.role === 'admin')
    ? currentCourses
    : currentCourses.filter(c => c.userId === currentUser.id);

  const filtered = userCourses.filter(course => {
    const matchesFilter = (currentFilter === 'all') || (course.status === currentFilter);
    const matchesSearch = 
      course.name.toLowerCase().includes(searchQuery) ||
      (course.code && course.code.toLowerCase().includes(searchQuery)) ||
      (course.category && course.category.toLowerCase().includes(searchQuery));

    return matchesFilter && matchesSearch;
  });

  courseListGrid.innerHTML = '';

  if (filtered.length === 0) {
    courseListGrid.classList.add('hidden');
    noCoursesState.classList.remove('hidden');
    refreshLucide();
    return;
  }

  courseListGrid.classList.remove('hidden');
  noCoursesState.classList.add('hidden');

  filtered.forEach(course => {
    const card = document.createElement('div');
    card.className = 'rounded-2xl border border-slate-200 dark:border-[#23353c] bg-white dark:bg-[#152125] hover:border-[#335C67] dark:hover:border-[#E09F3E] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between overflow-hidden group cursor-pointer';
    
    // Karta tıklandığında tam sayfa detay açılsın
    card.onclick = (e) => {
      if (!e.target.closest('.card-action-btn')) {
        openCourseDetail(course.id);
      }
    };

    const isActive = course.status === 'active';
    const statusBadgeClass = isActive 
      ? 'bg-[#335C67]/10 text-[#335C67] dark:bg-[#335C67]/30 dark:text-[#FFF3B0] border border-[#335C67]/30' 
      : 'bg-slate-100 dark:bg-[#10191b] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-[#23353c]';
    const statusText = isActive ? '● Devam Ediyor' : '✓ Tamamlandı (Arşiv)';

    card.innerHTML = `
      <div class="p-5 space-y-3 flex-1">
        <div class="flex items-start justify-between gap-2">
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="px-2.5 py-1 rounded-lg text-[11px] font-bold ${statusBadgeClass}">
              ${statusText}
            </span>
            <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-[#E09F3E]/20 text-[#540B0E] dark:text-[#FFF3B0] border border-[#E09F3E]/40 flex items-center gap-1">
              <i data-lucide="award" class="w-3 h-3 text-[#E09F3E]"></i>
              <span>${escapeHtml(course.documentType || 'Sertifika')}</span>
            </span>
          </div>
          <span class="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-[#10191b] px-2 py-0.5 rounded border border-slate-100 dark:border-[#23353c]">
            ${course.code || 'KODSUZ'}
          </span>
        </div>

        <div>
          <h4 class="font-bold text-slate-800 dark:text-slate-100 text-base group-hover:text-[#335C67] dark:group-hover:text-[#FFF3B0] transition leading-snug">
            ${escapeHtml(course.name)}
          </h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
            <i data-lucide="building-2" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i>
            <span class="truncate">${escapeHtml(course.institution || '-')}</span>
          </p>
          ${course.supervisor ? `
          <p class="text-[11px] text-slate-600 dark:text-slate-400 mt-1 flex items-center gap-1 bg-slate-50 dark:bg-[#10191b] px-2 py-1 rounded border border-slate-100 dark:border-[#23353c]">
            <i data-lucide="user-check" class="w-3.5 h-3.5 text-[#335C67] shrink-0"></i>
            <span class="truncate">Sorumlu: <strong>${escapeHtml(course.supervisor)}</strong></span>
          </p>` : ''}
        </div>

        <div class="pt-2 border-t border-slate-100 dark:border-[#23353c] grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
          <div class="flex items-center gap-1.5">
            <i data-lucide="clock" class="w-4 h-4 text-[#335C67] shrink-0"></i>
            <span>${course.totalHours || 0} Saat</span>
          </div>
          <div class="flex items-center gap-1.5">
            <i data-lucide="users" class="w-4 h-4 text-[#E09F3E] shrink-0"></i>
            <span>${course.students?.length || 0} Kursiyer</span>
          </div>
          <div class="col-span-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
            <div class="flex items-center gap-1.5">
              <i data-lucide="calendar" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i>
              <span>${formatDate(course.startDate)} - ${formatDate(course.endDate)}</span>
            </div>
            ${(course.offDays && course.offDays.length > 0) ? `
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#9E2A2B]/10 text-[#9E2A2B] border border-[#9E2A2B]/30" title="${course.offDays.map(o => `${formatDate(o.date)}: ${o.reason}`).join('\n')}">
                <i data-lucide="calendar-off" class="w-3 h-3 text-[#9E2A2B]"></i>
                <span>${course.offDays.length} Gün Tatil</span>
              </span>
            ` : ''}
          </div>

          ${(course.days && course.days.length > 0) || course.startTime ? `
          <div class="col-span-2 flex items-center justify-between gap-1 text-[11px] text-[#335C67] dark:text-[#FFF3B0] bg-[#335C67]/5 dark:bg-[#10191b] px-2.5 py-1.5 rounded-xl border border-[#335C67]/20">
            <span class="flex items-center gap-1.5 truncate">
              <i data-lucide="calendar-clock" class="w-3.5 h-3.5 text-[#335C67] shrink-0"></i>
              <strong class="font-semibold">${course.days && course.days.length > 0 ? course.days.map(d => d.slice(0, 3)).join(', ') : 'Günler Belirtilmedi'}</strong>
              ${course.startTime ? `<span class="text-slate-500 dark:text-slate-400 font-mono text-[10px]">(${course.startTime} - ${course.endTime || ''})</span>` : ''}
            </span>
            <span class="font-bold text-[#335C67] dark:text-[#FFF3B0] text-[10px] shrink-0 bg-white dark:bg-[#152125] px-1.5 py-0.5 rounded border border-[#335C67]/20">${course.dailyHours || 4} Sa/Gün</span>
          </div>` : ''}
        </div>
      </div>

      <div class="px-5 py-3 bg-slate-50/80 dark:bg-[#10191b] border-t border-slate-100 dark:border-[#23353c] flex items-center justify-between gap-2">
        <div class="flex items-center gap-1.5 text-xs font-bold text-[#335C67] dark:text-[#FFF3B0] group-hover:text-[#274851] transition">
          <i data-lucide="folder-open" class="w-4 h-4 text-[#335C67] dark:text-[#FFF3B0]"></i>
          <span>Kursiyerler, Notlar & Evraklar</span>
          <i data-lucide="chevron-right" class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"></i>
        </div>

        <div class="flex items-center gap-1 shrink-0">
          <button
            onclick="event.stopPropagation(); editCourse('${course.id}')"
            class="card-action-btn p-2 text-slate-500 dark:text-slate-400 hover:text-[#E09F3E] hover:bg-[#E09F3E]/10 rounded-xl transition cursor-pointer"
            title="Kurs Bilgilerini Düzenle"
          >
            <i data-lucide="edit-3" class="w-4 h-4"></i>
          </button>

          <button
            onclick="event.stopPropagation(); deleteCourse('${course.id}')"
            class="card-action-btn p-2 text-slate-400 hover:text-[#9E2A2B] hover:bg-[#9E2A2B]/10 rounded-xl transition cursor-pointer"
            title="Kursu Sil"
          >
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    `;

    courseListGrid.appendChild(card);
  });

  refreshLucide();
}

function renderOffDays() {
  if (!offDaysListContainer) return;
  offDaysListContainer.innerHTML = '';
  if (!currentOffDays || currentOffDays.length === 0) {
    offDaysListContainer.innerHTML = `<span class="text-[11px] text-slate-400 italic">Henüz tatil günü eklenmedi.</span>`;
    return;
  }

  currentOffDays.forEach((od, idx) => {
    const chip = document.createElement('div');
    chip.className = 'inline-flex items-center gap-1.5 px-2.5 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg text-xs font-medium';
    chip.innerHTML = `
      <i data-lucide="calendar-off" class="w-3.5 h-3.5 text-rose-500 shrink-0"></i>
      <span><strong>${formatDate(od.date)}</strong>: ${escapeHtml(od.reason || 'Ders Yok')}</span>
      <button type="button" onclick="removeOffDay(${idx})" class="p-0.5 hover:bg-rose-100 rounded text-rose-600 cursor-pointer ml-1" title="Kaldır">
        <i data-lucide="x" class="w-3 h-3"></i>
      </button>
    `;
    offDaysListContainer.appendChild(chip);
  });
  refreshLucide();
}

window.removeOffDay = function(index) {
  currentOffDays.splice(index, 1);
  renderOffDays();
};

function handleAddOffDay() {
  if (!offDayDateInput) return;
  const dateVal = offDayDateInput.value;
  let reasonVal = offDayReasonInput.value.trim();
  if (!dateVal) {
    alert('Lütfen ders yapılmayan tarihi seçiniz.');
    offDayDateInput.focus();
    return;
  }

  if (!reasonVal) {
    reasonVal = getTurkishHolidayName(dateVal) || 'Tatil / Ders Yapılmadı';
  }

  if (currentOffDays.some(d => d.date === dateVal)) {
    alert('Bu tarih zaten tatil günleri listesinde ekli.');
    return;
  }

  currentOffDays.push({
    id: `od_${Date.now()}`,
    date: dateVal,
    reason: reasonVal
  });

  currentOffDays.sort((a, b) => new Date(a.date) - new Date(b.date));

  offDayDateInput.value = '';
  offDayReasonInput.value = '';
  renderOffDays();
}

window.autoLoadHolidaysIntoForm = function() {
  const startVal = courseFormStartDate.value;
  if (!startVal) {
    alert('Lütfen önce kurs başlangıç tarihini seçin.');
    courseFormStartDate.focus();
    return;
  }

  let endVal = courseFormEndDate.value;
  if (!endVal) {
    const d = new Date(startVal + 'T00:00:00');
    d.setMonth(d.getMonth() + 6);
    endVal = d.toISOString().split('T')[0];
  }

  const selectedDays = [];
  courseFormDays.forEach(cb => {
    if (cb.checked) selectedDays.push(cb.value);
  });
  const daysToCheck = selectedDays.length > 0 ? selectedDays : ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];

  const holidays = getTurkishHolidaysBetween(startVal, endVal).filter(h => {
    const dObj = new Date(h.date + 'T00:00:00');
    const dayName = TURKISH_DAYS_MAP[dObj.getDay()];
    return daysToCheck.includes(dayName);
  });

  if (holidays.length === 0) {
    alert('Seçilen tarih aralığında ve kurs günlerinde herhangi bir resmi tatil bulunamadı.');
    return;
  }

  let addedCount = 0;
  holidays.forEach(h => {
    if (!currentOffDays.some(d => d.date === h.date)) {
      currentOffDays.push({
        id: `od_${Date.now()}_${Math.random()}`,
        date: h.date,
        reason: h.name
      });
      addedCount++;
    }
  });

  currentOffDays.sort((a, b) => new Date(a.date) - new Date(b.date));
  renderOffDays();

  alert(`Kurs günlerine denk gelen ${addedCount} adet Türkiye resmi tatili listeye eklendi.`);
};

function openCourseModal(courseToEdit = null) {
  courseModal.classList.remove('hidden');

  // Kurs Merkezleri Seçeneklerini Yükle (Admin panelinde tanımlanan merkezler)
  courseFormInstitutionSelect.innerHTML = currentCenters.length > 0
    ? currentCenters.map(center => `
        <option value="${escapeHtml(center.name)}">${escapeHtml(center.name)}</option>
      `).join('')
    : `<option value="">Kayıtlı Merkez Yok (Admin panelinden ekleyiniz)</option>`;

  // Kurs Şablonları / Kurs Adı Seçeneklerini Yükle (Admin panelinde tanımlanan kurslar)
  courseFormTemplateSelect.innerHTML = `<option value="">-- Kurs Seçiniz --</option>` + 
    currentTemplates.map(tmpl => `
      <option value="${tmpl.id}">${escapeHtml(tmpl.name)} (${tmpl.totalHours} Saat)</option>
    `).join('');

  if (courseToEdit) {
    courseModalTitle.innerText = 'Kurs Bilgilerini Güncelle';
    courseFormId.value = courseToEdit.id;

    // Şablon eşleştir
    let matchedTmpl = currentTemplates.find(t => t.id === courseToEdit.templateId) ||
                      currentTemplates.find(t => t.name === courseToEdit.name);
    if (matchedTmpl) {
      courseFormTemplateSelect.value = matchedTmpl.id;
    } else {
      const customOpt = document.createElement('option');
      customOpt.value = `custom_${courseToEdit.id}`;
      customOpt.innerText = `${courseToEdit.name} (${courseToEdit.totalHours || 0} Saat)`;
      courseFormTemplateSelect.appendChild(customOpt);
      courseFormTemplateSelect.value = customOpt.value;
    }

    courseFormInstitutionSelect.value = courseToEdit.institution || currentCenters[0]?.name || '';
    courseFormSupervisor.value = courseToEdit.supervisor || (currentCenters.find(c => c.name === courseToEdit.institution)?.supervisor) || '';
    courseFormInstructor.value = getCourseInstructorName(courseToEdit);
    courseFormCode.value = courseToEdit.code || '';
    courseFormCategory.value = courseToEdit.category || 'Bilişim Teknolojileri';
    courseFormStartDate.value = courseToEdit.startDate || '';
    courseFormEndDate.value = courseToEdit.endDate || '';
    courseFormTotalHours.value = courseToEdit.totalHours || 120;
    if (courseFormModuleCount) {
      courseFormModuleCount.value = courseToEdit.moduleCount || (matchedTmpl ? (matchedTmpl.moduleCount || 1) : 1);
    }
    courseFormStatus.value = courseToEdit.status || 'active';
    if (courseFormDocumentType) {
      courseFormDocumentType.value = courseToEdit.documentType || (matchedTmpl ? (matchedTmpl.documentType || 'Sertifika') : 'Sertifika');
    }
    courseFormClassroom.value = courseToEdit.classroom || '';
    courseFormDescription.value = courseToEdit.description || '';

    // Günler ve Saatler
    const selectedDays = courseToEdit.days || [];
    document.querySelectorAll('.course-day-checkbox').forEach(cb => {
      cb.checked = selectedDays.includes(cb.value);
    });
    courseFormDailyHours.value = courseToEdit.dailyHours || 4;
    courseFormStartTime.value = courseToEdit.startTime || '';
    courseFormEndTime.value = courseToEdit.endTime || '';

    currentOffDays = Array.isArray(courseToEdit.offDays) ? [...courseToEdit.offDays] : [];
    renderOffDays();
  } else {
    courseModalTitle.innerText = 'Yeni Kurs Ekle';
    courseForm.reset();
    courseFormId.value = '';
    courseFormSupervisor.value = '';
    courseFormInstructor.value = currentUser.fullName;
    courseFormStartDate.value = new Date().toISOString().split('T')[0];
    courseFormTotalHours.value = 120;
    if (courseFormModuleCount) courseFormModuleCount.value = 1;
    courseFormStatus.value = 'active';
    if (courseFormDocumentType) courseFormDocumentType.value = 'Sertifika';
    if (currentCenters.length > 0) {
      courseFormInstitutionSelect.value = currentCenters[0].name;
      if (currentCenters[0].supervisor) {
        courseFormSupervisor.value = currentCenters[0].supervisor;
      }
    }

    // Varsayılan Hafta İçi Günleri ve Saatleri
    document.querySelectorAll('.course-day-checkbox').forEach(cb => {
      cb.checked = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe'].includes(cb.value);
    });
    courseFormDailyHours.value = 4;
    courseFormStartTime.value = '09:00';
    courseFormEndTime.value = '12:15';

    currentOffDays = [];
    renderOffDays();
  }

  refreshLucide();
}

function closeCourseModal() {
  courseModal.classList.add('hidden');
}

function handleSaveCourse(e) {
  e.preventDefault();
  const id = courseFormId.value;

  const selectedTmplId = courseFormTemplateSelect.value;
  if (!selectedTmplId) {
    alert('Lütfen açılır listeden bir kurs adı seçiniz.');
    courseFormTemplateSelect.focus();
    return;
  }

  const tmpl = currentTemplates.find(t => t.id === selectedTmplId);
  const selectedText = courseFormTemplateSelect.options[courseFormTemplateSelect.selectedIndex]?.text || '';
  const courseName = tmpl ? tmpl.name : selectedText.replace(/ \(\d+ Saat\)/, '').replace(/ \(Özel\)/, '').trim();

  const institution = courseFormInstitutionSelect.value;
  if (!institution) {
    alert('Lütfen bir kurs merkezi seçiniz.');
    courseFormInstitutionSelect.focus();
    return;
  }

  const supervisor = courseFormSupervisor.value.trim();
  const instructor = courseFormInstructor.value.trim() || currentUser.fullName;
  const code = courseFormCode.value.trim() || (tmpl ? tmpl.code : `KRS-${new Date().getFullYear()}`);
  const category = courseFormCategory.value;
  const startDate = courseFormStartDate.value;
  const endDate = courseFormEndDate.value;
  const totalHours = Number(courseFormTotalHours.value) || (tmpl ? tmpl.totalHours : 120);
  const moduleCount = courseFormModuleCount ? Math.max(1, Number(courseFormModuleCount.value) || 1) : (tmpl ? (tmpl.moduleCount || 1) : 1);
  const status = courseFormStatus.value;
  const documentType = courseFormDocumentType ? courseFormDocumentType.value : 'Sertifika';
  const classroom = courseFormClassroom.value.trim();
  const description = courseFormDescription.value.trim();

  // Günler ve Saatler
  const selectedDays = Array.from(document.querySelectorAll('.course-day-checkbox:checked')).map(cb => cb.value);
  const dailyHours = Number(courseFormDailyHours.value) || 4;
  const startTime = courseFormStartTime.value;
  const endTime = courseFormEndTime.value;

  if (id) {
    currentCourses = currentCourses.map(c => {
      if (c.id === id) {
        // Güncellenen ders günleri ve tatillere göre kursiyer devamsızlık kayıtlarını senkronize et
        const cleanedStudents = (c.students || []).map(std => {
          const filteredAbs = (std.dailyAbsences || []).filter(d => {
            if (!d.date) return false;
            const dObj = new Date(d.date + 'T00:00:00');
            if (isNaN(dObj.getTime())) return false;
            const dayName = TURKISH_DAYS_MAP[dObj.getDay()];
            return selectedDays.includes(dayName) && !currentOffDays.some(o => o.date === d.date) && !isTurkishOfficialHoliday(d.date);
          });
          const totalAbsent = filteredAbs.reduce((sum, d) => sum + Number(d.hours || 0), 0);
          const maxAllowed = Math.floor(totalHours / 5);
          let att = std.attendance;
          if (att === 'Devamsız' && totalAbsent <= maxAllowed && std.result !== 'Devamsız') {
            att = 'Devamlı';
          }
          return {
            ...std,
            dailyAbsences: filteredAbs,
            absentHours: totalAbsent,
            attendance: att
          };
        });

        return {
          ...c,
          templateId: selectedTmplId,
          name: courseName,
          institution,
          supervisor,
          instructor,
          code,
          category,
          startDate,
          endDate,
          totalHours,
          moduleCount,
          status,
          documentType,
          classroom,
          description,
          days: selectedDays,
          dailyHours,
          startTime,
          endTime,
          offDays: [...currentOffDays],
          syllabus: (tmpl && tmpl.syllabus && tmpl.syllabus.length > 0) ? tmpl.syllabus : (c.syllabus || []),
          students: cleanedStudents
        };
      }
      return c;
    });
  } else {
    const newCourse = {
      id: `crs_${Date.now()}`,
      userId: currentUser.id,
      templateId: selectedTmplId,
      name: courseName,
      institution,
      supervisor,
      instructor,
      code,
      category,
      startDate,
      endDate,
      totalHours,
      moduleCount,
      status,
      documentType,
      classroom,
      description,
      days: selectedDays,
      dailyHours,
      startTime,
      endTime,
      offDays: [...currentOffDays],
      syllabus: tmpl ? tmpl.syllabus : [],
      students: []
    };
    currentCourses.unshift(newCourse);
  }

  DataStore.saveCourses(currentCourses);
  closeCourseModal();
  renderTeacherDashboard();

  // Kurs detay modalı açıksa veya düzenleme yapılan kurs aktif kurs ise anında yenile
  if (activeCourseForDetail && activeCourseForDetail.id === id) {
    const updated = currentCourses.find(c => c.id === id);
    if (updated) {
      activeCourseForDetail = updated;
      if (detailModal && !detailModal.classList.contains('hidden')) {
        openCourseDetail(id);
      }
    }
  }
}

window.editCourse = function(courseId) {
  const course = currentCourses.find(c => c.id === courseId);
  if (course) openCourseModal(course);
};

window.deleteCourse = function(courseId) {
  if (confirm('Bu kursu ve bağlı tüm kursiyer kayıtlarını silmek istediğinize emin misiniz?')) {
    currentCourses = currentCourses.filter(c => c.id !== courseId);
    DataStore.saveCourses(currentCourses);
    renderTeacherDashboard();
  }
};

// =================== KURS DETAYI, KURSİYER & SAATLİK MÜFREDAT ===================

window.openCourseDetail = function(courseId) {
  activeCourseForDetail = currentCourses.find(c => c.id === courseId);
  if (!activeCourseForDetail) return;

  if (activeCourseForDetail.students) {
    sortStudentsAlphabetically(activeCourseForDetail.students);
  }

  // Aktif kurs günleri ve tatiller dışındaki eski/hayalet devamsızlık kayıtlarını temizle
  const activeDays = (activeCourseForDetail.days && activeCourseForDetail.days.length > 0)
    ? activeCourseForDetail.days
    : ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];
  const offDayDates = new Set((activeCourseForDetail.offDays || []).map(o => o.date));
  let studentsChanged = false;

  (activeCourseForDetail.students || []).forEach(std => {
    if (Array.isArray(std.dailyAbsences) && std.dailyAbsences.length > 0) {
      const origLen = std.dailyAbsences.length;
      std.dailyAbsences = std.dailyAbsences.filter(d => {
        if (!d.date) return false;
        const dObj = new Date(d.date + 'T00:00:00');
        if (isNaN(dObj.getTime())) return false;
        const dayName = TURKISH_DAYS_MAP[dObj.getDay()];
        return activeDays.includes(dayName) && !offDayDates.has(d.date) && !isTurkishOfficialHoliday(d.date);
      });
      if (std.dailyAbsences.length !== origLen) {
        studentsChanged = true;
        std.absentHours = std.dailyAbsences.reduce((sum, d) => sum + Number(d.hours || 0), 0);
      }
    }
  });

  if (studentsChanged) {
    DataStore.saveCourses(currentCourses);
  }

  currentAttendanceDateIndex = -1;

  const daysText = (activeCourseForDetail.days && activeCourseForDetail.days.length > 0)
    ? ` • Günler: ${activeCourseForDetail.days.join(', ')}`
    : '';
  const timeText = (activeCourseForDetail.startTime && activeCourseForDetail.endTime)
    ? ` (${activeCourseForDetail.startTime} - ${activeCourseForDetail.endTime}, ${activeCourseForDetail.dailyHours || 4} Saat/Gün)`
    : (activeCourseForDetail.dailyHours ? ` (${activeCourseForDetail.dailyHours} Saat/Gün)` : '');

  detailCourseName.innerText = activeCourseForDetail.name;
  detailCourseCode.innerText = activeCourseForDetail.code || 'KODSUZ';
  const currentInst = getCourseInstitutionName(activeCourseForDetail);
  const currentInstr = getCourseInstructorName(activeCourseForDetail);
  detailCourseMeta.innerText = `${currentInst} • ${activeCourseForDetail.totalHours} Saat • Eğitmen: ${currentInstr}${activeCourseForDetail.supervisor ? ' • Sorumlu: ' + activeCourseForDetail.supervisor : ''}${daysText}${timeText}`;

  const isActive = activeCourseForDetail.status === 'active';
  detailStatusBadge.className = `px-2 py-0.5 rounded text-xs font-semibold ${
    isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'
  }`;
  detailStatusBadge.innerText = isActive ? 'Devam Eden Kurs' : 'Tamamlanmış Kurs (Arşiv)';

  if (detailModuleBadge) {
    detailModuleBadge.innerText = `${activeCourseForDetail.moduleCount || 1} Modül Sınavı`;
  }

  if (detailDocumentTypeText) {
    detailDocumentTypeText.innerText = activeCourseForDetail.documentType || 'Sertifika';
  }

  if (studentAddedNotice) {
    studentAddedNotice.classList.add('hidden');
  }

  // Eğer belirli bir sekme zaten açıksa onu koru, değilse varsayılan 'students' sekmesini aç
  let currentActiveTab = 'students';
  if (tabAttendanceContent && !tabAttendanceContent.classList.contains('hidden')) currentActiveTab = 'attendance';
  else if (tabExamsContent && !tabExamsContent.classList.contains('hidden')) currentActiveTab = 'exams';
  else if (tabSyllabusContent && !tabSyllabusContent.classList.contains('hidden')) currentActiveTab = 'syllabus';
  else if (tabDocumentsContent && !tabDocumentsContent.classList.contains('hidden')) currentActiveTab = 'documents';

  switchDetailTab(currentActiveTab);
  renderDetailSyllabus();
  renderDocumentsTab();

  detailModal.classList.remove('hidden');
  refreshLucide();
};

function closeDetailModal() {
  detailModal.classList.add('hidden');
  activeCourseForDetail = null;
  studentAddForm.classList.add('hidden');
  if (studentAddedNotice) studentAddedNotice.classList.add('hidden');

  // Herhangi bir artık baskı/önizleme içeriğini temizle
  const printArea = document.getElementById('printArea');
  const printAreaContent = document.getElementById('printAreaContent');
  if (printAreaContent) printAreaContent.innerHTML = '';
  if (printArea) printArea.classList.add('hidden');
  document.getElementById('securePrintIframe')?.remove();
}

function switchDetailTab(tab) {
  [tabStudentsBtn, tabAttendanceBtn, tabExamsBtn, tabSyllabusBtn, tabDocumentsBtn].forEach(btn => {
    if (btn) {
      btn.className = 'flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition cursor-pointer whitespace-nowrap';
    }
  });

  tabStudentsContent.classList.add('hidden');
  tabAttendanceContent.classList.add('hidden');
  tabExamsContent.classList.add('hidden');
  tabSyllabusContent.classList.add('hidden');
  tabDocumentsContent.classList.add('hidden');

  const activeTabClasses = 'flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 border-[#335C67] dark:border-[#FFF3B0] text-[#335C67] dark:text-[#FFF3B0] bg-white dark:bg-[#152125] rounded-t-lg transition cursor-pointer whitespace-nowrap shadow-xs';

  if (tab === 'students') {
    tabStudentsBtn.className = activeTabClasses;
    tabStudentsContent.classList.remove('hidden');
    renderStudentTable();
  } else if (tab === 'attendance') {
    tabAttendanceBtn.className = activeTabClasses;
    tabAttendanceContent.classList.remove('hidden');
    renderAttendanceTab();
  } else if (tab === 'exams') {
    tabExamsBtn.className = activeTabClasses;
    tabExamsContent.classList.remove('hidden');
    renderExamsTab();
  } else if (tab === 'syllabus') {
    tabSyllabusBtn.className = activeTabClasses;
    tabSyllabusContent.classList.remove('hidden');
    renderDetailSyllabus();
  } else {
    tabDocumentsBtn.className = activeTabClasses;
    tabDocumentsContent.classList.remove('hidden');
    renderDocumentsTab();
  }
  refreshLucide();
}

// Kursiyerleri Türkçe alfabesine göre (A-Z) sıralayan yardımcı fonksiyon
function sortStudentsAlphabetically(students) {
  if (!Array.isArray(students)) return [];
  return students.sort((a, b) => {
    const nameA = (a.fullName || `${a.firstName || ''} ${a.lastName || ''}`).trim();
    const nameB = (b.fullName || `${b.firstName || ''} ${b.lastName || ''}`).trim();
    const cmp = nameA.localeCompare(nameB, 'tr-TR');
    if (cmp !== 0) return cmp;
    const tcA = a.tcNo || '';
    const tcB = b.tcNo || '';
    if (tcA && tcB) return tcA.localeCompare(tcB);
    return (a.id || '').localeCompare(b.id || '');
  });
}

function renderStudentTable() {
  if (!activeCourseForDetail) return;
  activeCourseForDetail.students = sortStudentsAlphabetically(activeCourseForDetail.students || []);
  const students = activeCourseForDetail.students;
  detailStudentCount.innerText = students.length;
  studentTableBody.innerHTML = '';

  const moduleCount = activeCourseForDetail.moduleCount ? Math.max(1, Number(activeCourseForDetail.moduleCount)) : 1;

  if (students.length === 0) {
    studentTableBody.innerHTML = `
      <tr>
        <td colspan="8" class="text-center py-8 text-slate-400">
          Bu kursa henüz kursiyer eklenmemiş. Yukarıdaki "Yeni Kursiyer Ekle" butonunu kullanarak isim, soyisim, telefon ve TC ile hemen kursiyer ekleyebilirsiniz.
        </td>
      </tr>
    `;
    return;
  }

  students.forEach((s, idx) => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50/80 transition';

    const isDevamsiz = (s.attendance === 'Devamsız') || (s.result === 'Devamsız');
    const isSuccess = (s.result || '').includes('Başarılı') || (s.result || '').includes('Belge');
    let resultBadgeClass = 'bg-slate-100 text-slate-700';
    if (isDevamsiz) {
      resultBadgeClass = 'bg-rose-50 text-rose-700 border border-rose-200';
    } else if (isSuccess) {
      resultBadgeClass = 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    } else if ((s.result || '').includes('Başarısız')) {
      resultBadgeClass = 'bg-amber-50 text-amber-700 border border-amber-200';
    }

    // Modül Sınavları Pill Gösterimleri
    let moduleScoresHtml = '';
    const modScores = s.moduleScores || {};
    for (let m = 1; m <= moduleCount; m++) {
      const score = modScores[m];
      const hasScore = (score !== null && score !== undefined && score !== '');
      moduleScoresHtml += `
        <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono mr-1 mb-0.5 border ${
          hasScore 
            ? (Number(score) >= 50 ? 'bg-purple-50 text-purple-800 border-purple-200 font-bold' : 'bg-rose-50 text-rose-700 border-rose-200 font-bold') 
            : 'bg-slate-100 text-slate-400 border-slate-200'
        }">
          M${m}:${hasScore ? score : '-'}
        </span>
      `;
    }

    if (s.examScore !== null && s.examScore !== undefined) {
      moduleScoresHtml += `
        <span class="text-xs font-bold text-slate-800 ml-1">
          (Ort: <span class="${s.examScore >= 50 ? 'text-purple-700' : 'text-rose-600'}">${s.examScore}</span>)
        </span>
      `;
    }

    // Devamsızlık Sütunu
    const absentHours = Number(s.absentHours) || 0;
    const maxAllowed = Math.floor((activeCourseForDetail.totalHours || 0) / 5);
    const isExceeded = (absentHours > maxAllowed) || (s.attendance === 'Devamsız');

    const attendanceHtml = `
      <div>
        <div class="font-bold ${isExceeded ? 'text-rose-700' : 'text-slate-800'}">${absentHours} Saat</div>
        <div class="text-[10px] ${isExceeded ? 'text-rose-600 font-bold' : 'text-slate-400'}">
          ${escapeHtml(s.attendance || 'Devamlı')}
        </div>
      </div>
    `;

    tr.innerHTML = `
      <td class="px-4 py-3 font-medium text-slate-400">${idx + 1}</td>
      <td class="px-4 py-3 font-semibold text-slate-800">
        <div>${escapeHtml(s.fullName)}</div>
        <div class="text-[10px] text-slate-400 font-normal">Kayıtlı Kursiyer</div>
      </td>
      <td class="px-4 py-3 font-mono text-slate-500">${escapeHtml(s.tcNo || '-')}</td>
      <td class="px-4 py-3 text-slate-600 font-mono text-xs">${escapeHtml(s.phone || '-')}</td>
      <td class="px-4 py-3">
        ${attendanceHtml}
      </td>
      <td class="px-4 py-3">
        <div class="flex flex-wrap items-center">
          ${moduleScoresHtml}
        </div>
      </td>
      <td class="px-4 py-3">
        <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${resultBadgeClass}">
          ${escapeHtml(s.result || 'Devam Ediyor')}
        </span>
      </td>
      <td class="px-4 py-3 text-right">
        <div class="flex items-center justify-end gap-1.5">
          <button
            onclick="editStudent('${s.id}')"
            class="p-1.5 text-slate-500 hover:text-[#E09F3E] hover:bg-[#E09F3E]/10 rounded-lg transition cursor-pointer"
            title="Kursiyer Bilgilerini Düzenle"
          >
            <i data-lucide="edit-3" class="w-4 h-4"></i>
          </button>

          <button
            onclick="deleteStudent('${s.id}')"
            class="p-1.5 text-slate-400 hover:text-[#9E2A2B] hover:bg-[#9E2A2B]/10 rounded-lg transition cursor-pointer"
            title="Kursiyeri Sil"
          >
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      </td>
    `;
    studentTableBody.appendChild(tr);
  });

  refreshLucide();
}

function renderDetailSyllabus() {
  if (!activeCourseForDetail) return;
  const syllabus = activeCourseForDetail.syllabus || [];
  detailSyllabusCount.innerText = syllabus.length;
  detailSyllabusTableBody.innerHTML = '';

  const detailOffDaysContainer = document.getElementById('detailOffDaysContainer');
  if (detailOffDaysContainer) {
    const validDates = getValidCourseDates(activeCourseForDetail);
    const startDate = validDates[0] || activeCourseForDetail.startDate;
    const endDate = validDates[validDates.length - 1] || activeCourseForDetail.endDate;
    const activeDays = (activeCourseForDetail.days && activeCourseForDetail.days.length > 0)
      ? activeCourseForDetail.days
      : ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];

    const userOffDays = activeCourseForDetail.offDays || [];
    const rangeHolidays = getTurkishHolidaysBetween(startDate, endDate).filter(h => {
      const dObj = new Date(h.date + 'T00:00:00');
      const dName = TURKISH_DAYS_MAP[dObj.getDay()];
      return activeDays.includes(dName) && !userOffDays.some(u => u.date === h.date);
    });

    const totalExcluded = userOffDays.length + rangeHolidays.length;

    if (totalExcluded > 0) {
      detailOffDaysContainer.innerHTML = `
        <div class="mb-3 p-3 bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-xl space-y-1.5">
          <div class="text-xs font-bold text-rose-900 dark:text-rose-200 flex items-center justify-between gap-1.5">
            <div class="flex items-center gap-1.5 uppercase tracking-wider">
              <i data-lucide="calendar-off" class="w-4 h-4 text-rose-600"></i>
              <span>Ders Yapılmayan Günler & Resmi Tatiller (${totalExcluded} Gün)</span>
            </div>
            <span class="text-[10px] text-rose-700 dark:text-rose-300 font-semibold">Resmi tatiller ders saatine sayılmaz</span>
          </div>
          <div class="flex flex-wrap gap-2 pt-1">
            ${rangeHolidays.map(h => `
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-[#152125] text-rose-800 dark:text-rose-200 border border-rose-300 dark:border-rose-800 rounded-lg text-xs font-medium shadow-xs" title="Türkiye Resmi Tatili">
                <span class="text-xs">🇹🇷</span>
                <span><strong>${formatDate(h.date)}:</strong> ${escapeHtml(h.name)}</span>
              </span>
            `).join('')}
            ${userOffDays.map(od => `
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-[#152125] text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-[#2b3e45] rounded-lg text-xs font-medium shadow-xs">
                <i data-lucide="calendar-x" class="w-3.5 h-3.5 text-rose-500"></i>
                <span><strong>${formatDate(od.date)}:</strong> ${escapeHtml(od.reason || 'Ders Yapılmadı')}</span>
              </span>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      detailOffDaysContainer.innerHTML = '';
    }
  }

  if (syllabus.length === 0) {
    detailSyllabusTableBody.innerHTML = `
      <tr>
        <td colspan="2" class="text-center py-8 text-slate-400">
          Bu kurs için henüz saatlik konu planı tanımlanmamış.
        </td>
      </tr>
    `;
    refreshLucide();
    return;
  }

  syllabus.forEach(item => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50 transition';
    tr.innerHTML = `
      <td class="px-4 py-2.5 font-bold text-sky-700">${item.hour}. Ders Saati</td>
      <td class="px-4 py-2.5 text-slate-700">${escapeHtml(item.topic)}</td>
    `;
    detailSyllabusTableBody.appendChild(tr);
  });
  refreshLucide();
}

// Resmi 11 Haneli T.C. Kimlik Numarası Algoritması Doğrulaması
function isValidTcKimlikNo(tc) {
  if (!tc) return true; // Boş bırakılabilir
  const s = String(tc).trim();
  if (!/^[1-9]\d{10}$/.test(s)) return false;
  const d = s.split('').map(Number);
  const oddSum = d[0] + d[2] + d[4] + d[6] + d[8];
  const evenSum = d[1] + d[3] + d[5] + d[7];
  const tenth = ((oddSum * 7) - evenSum) % 10;
  const tenthNormalized = (tenth < 0) ? tenth + 10 : tenth;
  if (tenthNormalized !== d[9]) return false;
  const first10Sum = d.slice(0, 10).reduce((a, b) => a + b, 0);
  if (first10Sum % 10 !== d[10]) return false;
  return true;
}

// Kursiyer Ekleme / Güncelleme Formu: Sadece Adı, Soyadı, Telefon ve TC Bilgileri
function handleAddStudent(e) {
  e.preventDefault();
  if (!activeCourseForDetail) return;

  const editId = (document.getElementById('stdEditId')?.value || '').trim();
  const firstName = (document.getElementById('stdFirstName')?.value || '').trim();
  const lastName = (document.getElementById('stdLastName')?.value || '').trim();
  const tcNo = (document.getElementById('stdTcNo')?.value || '').trim();
  const phone = (document.getElementById('stdPhone')?.value || '').trim();

  if (!firstName || !lastName) {
    alert('Lütfen Kursiyer Adı ve Soyadı alanlarını doldurunuz.');
    return;
  }

  if (tcNo && !isValidTcKimlikNo(tcNo)) {
    if (!confirm('Girdiğiniz T.C. Kimlik Numarası algoritma kontrolünden geçemedi (hatalı olabilir). Yine de devam etmek istiyor musunuz?')) {
      return;
    }
  }

  const fullName = `${firstName} ${lastName}`.trim();

  if (editId) {
    // Kursiyer Güncelleme
    const existing = (activeCourseForDetail.students || []).find(s => s.id === editId);
    if (existing) {
      existing.firstName = firstName;
      existing.lastName = lastName;
      existing.fullName = fullName;
      existing.tcNo = tcNo;
      existing.phone = phone;
    }
  } else {
    // Aynı isim kontrolü (İsim benzerliği uyarısı)
    const isDuplicateName = (activeCourseForDetail.students || []).some(s => 
      (s.fullName || `${s.firstName || ''} ${s.lastName || ''}`).trim().toLocaleLowerCase('tr-TR') === fullName.trim().toLocaleLowerCase('tr-TR')
    );

    // Yeni Kursiyer Ekleme
    const moduleCount = activeCourseForDetail.moduleCount ? Math.max(1, Number(activeCourseForDetail.moduleCount)) : 1;
    const initialModuleScores = {};
    for (let m = 1; m <= moduleCount; m++) {
      initialModuleScores[m] = null;
    }

    const newStudent = {
      id: `std_${Date.now()}`,
      firstName,
      lastName,
      fullName,
      tcNo,
      phone,
      absentHours: 0,
      dailyAbsences: [],
      attendance: 'Devamlı',
      attendanceNote: '',
      moduleScores: initialModuleScores,
      examScore: null,
      result: 'Devam Ediyor'
    };

    activeCourseForDetail.students = activeCourseForDetail.students || [];
    activeCourseForDetail.students.push(newStudent);

    if (isDuplicateName) {
      alert(`⚠️ Dikkat: "${fullName}" adında bir kursiyer bu sınıfta zaten kayıtlı bulunuyor.\n\nİsim benzerliği olabileceği için yeni kayıt başarıyla eklendi.`);
    }
  }

  // Kursiyerleri alfabetik sırala (A-Z)
  sortStudentsAlphabetically(activeCourseForDetail.students);

  currentCourses = currentCourses.map(c => c.id === activeCourseForDetail.id ? activeCourseForDetail : c);
  DataStore.saveCourses(currentCourses);

  const stdEditId = document.getElementById('stdEditId');
  if (stdEditId) stdEditId.value = '';
  studentAddForm.reset();

  if (editId) {
    // Düzenleme bittiğinde formu kapat
    studentAddForm.classList.add('hidden');
    const studentFormTitle = document.getElementById('studentFormTitle');
    const studentFormSubmitText = document.getElementById('studentFormSubmitText');
    if (studentFormTitle) studentFormTitle.innerText = 'Yeni Kursiyer Ekleme';
    if (studentFormSubmitText) studentFormSubmitText.innerText = 'Kursiyeri Kaydet';
  } else {
    // Yeni ekleme yapıldığında: Form açık kalsın ve bir sonraki kursiyer için ad alanına odaklansın
    studentAddForm.classList.remove('hidden');
    const stdFirstName = document.getElementById('stdFirstName');
    stdFirstName?.focus();

    // Hızlı onay bildirimi (Kullanıcı eklemenin gerçekleştiğini görsün)
    const studentFormSubmitText = document.getElementById('studentFormSubmitText');
    if (studentFormSubmitText) {
      const origText = studentFormSubmitText.innerText;
      studentFormSubmitText.innerText = '✓ Eklendi! Sıradaki...';
      setTimeout(() => {
        studentFormSubmitText.innerText = origText;
      }, 1400);
    }
  }

  renderStudentTable();
  renderTeacherDashboard();

  // Kursiyer eklendikten sonra doğrudan Devamsızlık ve Sınav butonlarını sunan bilgilendirme kutusunu göster
  if (!editId && studentAddedNotice) {
    studentAddedNotice.classList.remove('hidden');
  }
}

window.editStudent = function(studentId) {
  if (!activeCourseForDetail) return;
  const std = activeCourseForDetail.students?.find(s => s.id === studentId);
  if (!std) return;

  const stdEditId = document.getElementById('stdEditId');
  const stdFirstName = document.getElementById('stdFirstName');
  const stdLastName = document.getElementById('stdLastName');
  const stdTcNo = document.getElementById('stdTcNo');
  const stdPhone = document.getElementById('stdPhone');
  const studentFormTitle = document.getElementById('studentFormTitle');
  const studentFormSubmitText = document.getElementById('studentFormSubmitText');

  if (stdEditId) stdEditId.value = std.id;
  if (stdFirstName) stdFirstName.value = std.firstName || '';
  if (stdLastName) stdLastName.value = std.lastName || '';
  if (stdTcNo) stdTcNo.value = std.tcNo || '';
  if (stdPhone) stdPhone.value = std.phone || '';
  if (studentFormTitle) studentFormTitle.innerText = 'Kursiyer Bilgilerini Düzenle';
  if (studentFormSubmitText) studentFormSubmitText.innerText = 'Güncellemeyi Kaydet';

  studentAddForm.classList.remove('hidden');
  stdFirstName?.focus();
  refreshLucide();
};

window.deleteStudent = function(studentId) {
  if (confirm('Bu kursiyeri silmek istediğinize emin misiniz?')) {
    activeCourseForDetail.students = activeCourseForDetail.students.filter(s => s.id !== studentId);
    currentCourses = currentCourses.map(c => c.id === activeCourseForDetail.id ? activeCourseForDetail : c);
    DataStore.saveCourses(currentCourses);
    renderStudentTable();
    renderTeacherDashboard();
  }
};

// =================== TOPLU KURSİYER EKLEME FONKSİYONLARI ===================

function parseBulkStudentLine(line) {
  if (!line) return null;
  let text = line.trim();
  if (!text) return null;

  // Sıra numaralarını temizle (Örn: "1.", "1-", "1)", "#1")
  text = text.replace(/^#?\d+[\.\-\)\:\s]+/, '').trim();
  if (!text) return null;

  // Ayırıcıları kontrol et: Sekme (tab), noktalı virgül (;), virgül (,) veya boşluk
  let rawTokens = [];
  if (text.includes('\t')) {
    rawTokens = text.split('\t');
  } else if (text.includes(';')) {
    rawTokens = text.split(';');
  } else if (text.includes(',')) {
    rawTokens = text.split(',');
  } else {
    rawTokens = text.split(/\s+/);
  }

  let tcNo = '';
  let phone = '';
  const nameParts = [];

  rawTokens.forEach(raw => {
    const tok = raw.trim();
    if (!tok) return;

    // Sadece rakamları ayıkla
    const digitsOnly = tok.replace(/\D/g, '');

    // Telefon kontrolü: 10 hane (5xx...) veya 11 hane (05xx...)
    if ((digitsOnly.length === 11 && digitsOnly.startsWith('05')) || (digitsOnly.length === 10 && digitsOnly.startsWith('5'))) {
      if (!phone) {
        phone = digitsOnly.length === 10 ? `0${digitsOnly}` : digitsOnly;
      }
    }
    // TC No kontrolü: 11 hane ve 0 ile başlamaz
    else if (digitsOnly.length === 11 && !digitsOnly.startsWith('0')) {
      if (!tcNo) {
        tcNo = digitsOnly;
      }
    }
    // Genel 10 haneli rakam (telefon olma ihtimali)
    else if (digitsOnly.length === 10 && !phone) {
      phone = digitsOnly;
    }
    else {
      // İsim parçası: sırf rakam değilse
      if (!/^\d+$/.test(tok)) {
        nameParts.push(tok);
      }
    }
  });

  const fullCandidate = nameParts.join(' ').trim();
  if (!fullCandidate) return null;

  // Ad ve Soyad ayrıştırma
  const words = fullCandidate.split(/\s+/).filter(Boolean);
  let firstName = '';
  let lastName = '';

  if (words.length === 1) {
    firstName = words[0];
    lastName = '';
  } else {
    lastName = words.pop();
    firstName = words.join(' ');
  }

  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`.trim(),
    tcNo,
    phone
  };
}

function handleBulkStudentInput() {
  if (!bulkStudentTextarea) return;
  const content = bulkStudentTextarea.value;
  const lines = content.split('\n');
  const parsed = [];

  lines.forEach(l => {
    const item = parseBulkStudentLine(l);
    if (item && item.firstName) {
      parsed.push(item);
    }
  });

  if (parsed.length > 0) {
    if (bulkStudentPreviewContainer) bulkStudentPreviewContainer.classList.remove('hidden');
    if (bulkParsedCount) bulkParsedCount.innerText = parsed.length;
    if (bulkStudentPreviewTbody) {
      bulkStudentPreviewTbody.innerHTML = parsed.map((s, idx) => `
        <tr class="hover:bg-emerald-50/50 transition">
          <td class="px-3 py-1.5 text-slate-400 font-mono text-[11px]">${idx + 1}</td>
          <td class="px-3 py-1.5 font-bold text-slate-800">${escapeHtml(s.firstName)}</td>
          <td class="px-3 py-1.5 text-slate-700">${escapeHtml(s.lastName || '-')}</td>
          <td class="px-3 py-1.5 font-mono text-slate-600">${s.tcNo ? escapeHtml(s.tcNo) : '<span class="text-slate-300 italic">-</span>'}</td>
          <td class="px-3 py-1.5 font-mono text-slate-600">${s.phone ? escapeHtml(s.phone) : '<span class="text-slate-300 italic">-</span>'}</td>
        </tr>
      `).join('');
    }
    if (saveBulkStudentBtn) saveBulkStudentBtn.disabled = false;
    if (saveBulkBtnText) saveBulkBtnText.innerText = `${parsed.length} Kursiyeri Kursa Ekle`;
    if (bulkStatusText) bulkStatusText.innerText = `Toplam ${parsed.length} kursiyer eklenecektir.`;
  } else {
    if (bulkStudentPreviewContainer) bulkStudentPreviewContainer.classList.add('hidden');
    if (bulkParsedCount) bulkParsedCount.innerText = '0';
    if (bulkStudentPreviewTbody) bulkStudentPreviewTbody.innerHTML = '';
    if (saveBulkStudentBtn) saveBulkStudentBtn.disabled = true;
    if (saveBulkBtnText) saveBulkBtnText.innerText = 'Toplu Kursiyerleri Kursa Ekle';
    if (bulkStatusText) bulkStatusText.innerText = 'Metin kutusuna kursiyerleri yapıştırınız.';
  }
}

function handleSaveBulkStudents() {
  if (!activeCourseForDetail) {
    alert('Aktif bir kurs bulunamadı.');
    return;
  }

  const content = bulkStudentTextarea?.value || '';
  const lines = content.split('\n');
  const parsed = [];

  lines.forEach(l => {
    const item = parseBulkStudentLine(l);
    if (item && item.firstName) {
      parsed.push(item);
    }
  });

  if (parsed.length === 0) {
    alert('Lütfen eklenecek en az bir geçerli kursiyer giriniz.');
    return;
  }

  const moduleCount = activeCourseForDetail.moduleCount ? Math.max(1, Number(activeCourseForDetail.moduleCount)) : 1;

  activeCourseForDetail.students = activeCourseForDetail.students || [];

  const duplicateNames = [];
  parsed.forEach(s => {
    const sFullName = (s.fullName || `${s.firstName || ''} ${s.lastName || ''}`).trim();
    const isDup = activeCourseForDetail.students.some(existing => 
      (existing.fullName || `${existing.firstName || ''} ${existing.lastName || ''}`).trim().toLocaleLowerCase('tr-TR') === sFullName.toLocaleLowerCase('tr-TR')
    );
    if (isDup && !duplicateNames.includes(sFullName)) {
      duplicateNames.push(sFullName);
    }

    const initialModuleScores = {};
    for (let m = 1; m <= moduleCount; m++) {
      initialModuleScores[m] = null;
    }

    const newStudent = {
      id: `std_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      firstName: s.firstName,
      lastName: s.lastName,
      fullName: s.fullName,
      tcNo: s.tcNo,
      phone: s.phone,
      absentHours: 0,
      dailyAbsences: [],
      attendance: 'Devamlı',
      attendanceNote: '',
      moduleScores: initialModuleScores,
      examScore: null,
      result: 'Devam Ediyor'
    };

    activeCourseForDetail.students.push(newStudent);
  });

  // Kursiyerleri alfabetik sırala (A-Z)
  sortStudentsAlphabetically(activeCourseForDetail.students);

  currentCourses = currentCourses.map(c => c.id === activeCourseForDetail.id ? activeCourseForDetail : c);
  DataStore.saveCourses(currentCourses);

  // Formu temizle ve kapat
  if (bulkStudentTextarea) bulkStudentTextarea.value = '';
  handleBulkStudentInput();
  if (bulkStudentForm) bulkStudentForm.classList.add('hidden');

  // Tabloları ve göstergeleri güncelle
  renderStudentTable();
  renderTeacherDashboard();
  if (typeof renderAttendanceTab === 'function') renderAttendanceTab();
  if (typeof renderExamsTab === 'function') renderExamsTab();

  // Bilgilendirme kutusunu göster
  if (studentAddedNotice) {
    const noticeSpan = studentAddedNotice.querySelector('span');
    if (noticeSpan) {
      noticeSpan.innerText = `${parsed.length} kursiyer başarıyla kaydedildi! Şimdi devamsızlık veya modül sınavı girebilirsiniz:`;
    }
    studentAddedNotice.classList.remove('hidden');
  }

  if (duplicateNames.length > 0) {
    alert(`⚠️ Dikkat: Aşağıdaki kursiyer isimleri sınıfta zaten kayıtlı bulunuyor:\n\n• ${duplicateNames.join('\n• ')}\n\nİsim benzerliği olabileceği için kayıtlar başarıyla eklendi.`);
  } else {
    alert(`${parsed.length} kursiyer başarıyla kursa eklendi!`);
  }
}

// =================== TÜRKİYE RESMİ TATİLLERİ (ULUSAL & DİNİ BAYRAMLAR) ===================

const TURKISH_FIXED_HOLIDAYS = {
  '01-01': 'Yılbaşı',
  '04-23': '23 Nisan Ulusal Egemenlik ve Çocuk Bayramı',
  '05-01': '1 Mayıs Emek ve Dayanışma Günü',
  '05-19': '19 Mayıs Atatürk\'ü Anma, Gençlik ve Spor Bayramı',
  '07-15': '15 Temmuz Demokrasi ve Milli Birlik Günü',
  '08-30': '30 Ağustos Zafer Bayramı',
  '10-28': '28 Ekim Cumhuriyet Bayramı Arefesi',
  '10-29': '29 Ekim Cumhuriyet Bayramı'
};

const TURKISH_RELIGIOUS_HOLIDAYS = {
  // 2024
  '2024-04-09': 'Ramazan Bayramı Arefesi',
  '2024-04-10': 'Ramazan Bayramı 1. Gün',
  '2024-04-11': 'Ramazan Bayramı 2. Gün',
  '2024-04-12': 'Ramazan Bayramı 3. Gün',
  '2024-06-15': 'Kurban Bayramı Arefesi',
  '2024-06-16': 'Kurban Bayramı 1. Gün',
  '2024-06-17': 'Kurban Bayramı 2. Gün',
  '2024-06-18': 'Kurban Bayramı 3. Gün',
  '2024-06-19': 'Kurban Bayramı 4. Gün',

  // 2025
  '2025-03-29': 'Ramazan Bayramı Arefesi',
  '2025-03-30': 'Ramazan Bayramı 1. Gün',
  '2025-03-31': 'Ramazan Bayramı 2. Gün',
  '2025-04-01': 'Ramazan Bayramı 3. Gün',
  '2025-06-05': 'Kurban Bayramı Arefesi',
  '2025-06-06': 'Kurban Bayramı 1. Gün',
  '2025-06-07': 'Kurban Bayramı 2. Gün',
  '2025-06-08': 'Kurban Bayramı 3. Gün',
  '2025-06-09': 'Kurban Bayramı 4. Gün',

  // 2026
  '2026-03-19': 'Ramazan Bayramı Arefesi',
  '2026-03-20': 'Ramazan Bayramı 1. Gün',
  '2026-03-21': 'Ramazan Bayramı 2. Gün',
  '2026-03-22': 'Ramazan Bayramı 3. Gün',
  '2026-05-26': 'Kurban Bayramı Arefesi',
  '2026-05-27': 'Kurban Bayramı 1. Gün',
  '2026-05-28': 'Kurban Bayramı 2. Gün',
  '2026-05-29': 'Kurban Bayramı 3. Gün',
  '2026-05-30': 'Kurban Bayramı 4. Gün',

  // 2027
  '2027-03-09': 'Ramazan Bayramı Arefesi',
  '2027-03-10': 'Ramazan Bayramı 1. Gün',
  '2027-03-11': 'Ramazan Bayramı 2. Gün',
  '2027-03-12': 'Ramazan Bayramı 3. Gün',
  '2027-05-16': 'Kurban Bayramı Arefesi',
  '2027-05-17': 'Kurban Bayramı 1. Gün',
  '2027-05-18': 'Kurban Bayramı 2. Gün',
  '2027-05-19': 'Kurban Bayramı 3. Gün',
  '2027-05-20': 'Kurban Bayramı 4. Gün',

  // 2028
  '2028-02-26': 'Ramazan Bayramı Arefesi',
  '2028-02-27': 'Ramazan Bayramı 1. Gün',
  '2028-02-28': 'Ramazan Bayramı 2. Gün',
  '2028-02-29': 'Ramazan Bayramı 3. Gün',
  '2028-05-04': 'Kurban Bayramı Arefesi',
  '2028-05-05': 'Kurban Bayramı 1. Gün',
  '2028-05-06': 'Kurban Bayramı 2. Gün',
  '2028-05-07': 'Kurban Bayramı 3. Gün',
  '2028-05-08': 'Kurban Bayramı 4. Gün',

  // 2029
  '2029-02-14': 'Ramazan Bayramı Arefesi',
  '2029-02-15': 'Ramazan Bayramı 1. Gün',
  '2029-02-16': 'Ramazan Bayramı 2. Gün',
  '2029-02-17': 'Ramazan Bayramı 3. Gün',
  '2029-04-23': 'Kurban Bayramı Arefesi',
  '2029-04-24': 'Kurban Bayramı 1. Gün',
  '2029-04-25': 'Kurban Bayramı 2. Gün',
  '2029-04-26': 'Kurban Bayramı 3. Gün',
  '2029-04-27': 'Kurban Bayramı 4. Gün',

  // 2030
  '2030-02-04': 'Ramazan Bayramı Arefesi',
  '2030-02-05': 'Ramazan Bayramı 1. Gün',
  '2030-02-06': 'Ramazan Bayramı 2. Gün',
  '2030-02-07': 'Ramazan Bayramı 3. Gün',
  '2030-04-13': 'Kurban Bayramı Arefesi',
  '2030-04-14': 'Kurban Bayramı 1. Gün',
  '2030-04-15': 'Kurban Bayramı 2. Gün',
  '2030-04-16': 'Kurban Bayramı 3. Gün',
  '2030-04-17': 'Kurban Bayramı 4. Gün'
};

function getTurkishHolidayName(dateStr) {
  if (!dateStr) return null;
  // Dini bayram kontrolü (Tam YYYY-MM-DD)
  if (TURKISH_RELIGIOUS_HOLIDAYS[dateStr]) {
    return TURKISH_RELIGIOUS_HOLIDAYS[dateStr];
  }
  // Sabit resmi bayram kontrolü (MM-DD)
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const mmDd = `${parts[1]}-${parts[2]}`;
    if (TURKISH_FIXED_HOLIDAYS[mmDd]) {
      return TURKISH_FIXED_HOLIDAYS[mmDd];
    }
  }
  return null;
}

function isTurkishOfficialHoliday(dateStr) {
  return getTurkishHolidayName(dateStr) !== null;
}

function getTurkishHolidaysBetween(startDateStr, endDateStr) {
  if (!startDateStr || !endDateStr) return [];
  const holidays = [];
  let curr = new Date(startDateStr + 'T00:00:00');
  const end = new Date(endDateStr + 'T23:59:59');
  if (isNaN(curr.getTime()) || isNaN(end.getTime())) return [];

  let safety = 1200;
  while (curr <= end && safety-- > 0) {
    const yyyy = curr.getFullYear();
    const mm = String(curr.getMonth() + 1).padStart(2, '0');
    const dd = String(curr.getDate()).padStart(2, '0');
    const dStr = `${yyyy}-${mm}-${dd}`;
    const hName = getTurkishHolidayName(dStr);
    if (hName) {
      holidays.push({ date: dStr, name: hName });
    }
    curr.setDate(curr.getDate() + 1);
  }
  return holidays;
}

// =================== DEVAMSIZLIK TAKİP & GİRİŞ EKRANI (DERS GÜNLERİ & KUTUCUK GİRİŞİ) ===================

const TURKISH_DAYS_MAP = {
  0: 'Pazar',
  1: 'Pazartesi',
  2: 'Salı',
  3: 'Çarşamba',
  4: 'Perşembe',
  5: 'Cuma',
  6: 'Cumartesi'
};

// Kursun geçerli ders günlerini (Türkiye resmi tatilleri ve özel tatiller hariç, kurs günlerine göre) hesaplar
function getValidCourseDates(course) {
  if (!course) return [];
  const validDates = [];
  const offDayDates = new Set((course.offDays || []).map(o => o.date));
  
  // Kurs günleri: ['Pazartesi', 'Salı', ...]
  const activeDays = (course.days && course.days.length > 0)
    ? course.days
    : ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];

  const dailyHours = Number(course.dailyHours) || 4;
  const totalHours = Number(course.totalHours) || 120;
  const totalSessionsNeeded = Math.max(1, Math.ceil(totalHours / dailyHours));

  // Başlangıç tarihi
  let start = course.startDate ? new Date(course.startDate + 'T00:00:00') : new Date();
  if (isNaN(start.getTime())) start = new Date();

  let curr = new Date(start);
  let safetyLimit = 1200; // Sonsuz döngü koruması

  while (safetyLimit-- > 0) {
    const yyyy = curr.getFullYear();
    const mm = String(curr.getMonth() + 1).padStart(2, '0');
    const dd = String(curr.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;
    const dayName = TURKISH_DAYS_MAP[curr.getDay()];

    const isHoliday = isTurkishOfficialHoliday(dateStr);
    const isManualOffDay = offDayDates.has(dateStr);

    // Hem aktif günlerde olmalı hem de resmi tatil veya manuel tatil OLMAMALI
    if (activeDays.includes(dayName) && !isManualOffDay && !isHoliday) {
      validDates.push(dateStr);
    }

    if (validDates.length >= totalSessionsNeeded) {
      break;
    }
    curr.setDate(curr.getDate() + 1);
  }

  validDates.sort();

  return validDates.length > 0 ? validDates : [new Date().toISOString().split('T')[0]];
}

let currentCourseLessonDates = [];
let currentAttendanceDateIndex = -1;

function renderAttendanceTab() {
  if (!activeCourseForDetail) return;
  activeCourseForDetail.students = sortStudentsAlphabetically(activeCourseForDetail.students || []);
  const students = activeCourseForDetail.students;
  const totalHours = activeCourseForDetail.totalHours || 0;
  const dailyHours = Number(activeCourseForDetail.dailyHours) || 4;
  const maxAllowed = Math.floor(totalHours / 5);

  if (attTotalHours) attTotalHours.innerText = `${totalHours} Saat`;
  if (attMaxAllowedHours) attMaxAllowedHours.innerText = `${maxAllowed} Saat (1/5)`;
  if (attDailyHours) attDailyHours.innerText = `${dailyHours} Sa/Gün`;

  const failedCount = students.filter(s => (Number(s.absentHours) || 0) > maxAllowed || s.attendance === 'Devamsız').length;
  if (attFailedCount) attFailedCount.innerText = `${failedCount} Kursiyer`;

  if (attHeaderDailyHours) attHeaderDailyHours.innerText = dailyHours;

  // Kursun geçerli ders günlerini hesapla
  currentCourseLessonDates = getValidCourseDates(activeCourseForDetail);

  // İlk açılışta veya geçersiz indekste bugünü veya en uygun ders gününü seç
  if (currentAttendanceDateIndex < 0 || currentAttendanceDateIndex >= currentCourseLessonDates.length) {
    const todayStr = new Date().toISOString().split('T')[0];
    const todayIdx = currentCourseLessonDates.indexOf(todayStr);
    if (todayIdx !== -1) {
      currentAttendanceDateIndex = todayIdx;
    } else {
      const upcomingIdx = currentCourseLessonDates.findIndex(d => d >= todayStr);
      currentAttendanceDateIndex = upcomingIdx !== -1 ? upcomingIdx : 0;
    }
  }

  const selectedDate = currentCourseLessonDates[currentAttendanceDateIndex] || currentCourseLessonDates[0];
  const remainingDatesFromCurrent = (currentAttendanceDateIndex >= 0 && currentAttendanceDateIndex < currentCourseLessonDates.length)
    ? currentCourseLessonDates.slice(currentAttendanceDateIndex)
    : [];

  // Tarih Bilgilerini Göster (Türkçe formatta)
  if (attCurrentDateDisplay && selectedDate) {
    const dObj = new Date(selectedDate + 'T00:00:00');
    const formatted = dObj.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' });
    attCurrentDateDisplay.innerText = formatted;
  }

  if (attLessonDayBadge) {
    attLessonDayBadge.innerText = `${currentAttendanceDateIndex + 1}. Ders Günü (Toplam ${currentCourseLessonDates.length} Gün)`;
  }

  if (attLessonDailyHoursNotice) {
    attLessonDailyHoursNotice.innerText = `Günlük Kurs Saati: ${dailyHours} Saat (Min: 1, Maks: ${dailyHours} Saat)`;
  }

  // Tarih Açılır Listesi (Doğrudan ders gününe atlamak için)
  if (attDateSelectDropdown) {
    attDateSelectDropdown.innerHTML = currentCourseLessonDates.map((d, idx) => {
      const dObj = new Date(d + 'T00:00:00');
      const shortStr = dObj.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', weekday: 'short' });
      return `<option value="${idx}" ${idx === currentAttendanceDateIndex ? 'selected' : ''}>${idx + 1}. Ders: ${shortStr}</option>`;
    }).join('');
  }

  // Ok Butonlarının Aktif / Pasif Durumları
  if (attPrevDateBtn) {
    attPrevDateBtn.disabled = (currentAttendanceDateIndex <= 0);
  }
  if (attNextDateBtn) {
    attNextDateBtn.disabled = (currentAttendanceDateIndex >= currentCourseLessonDates.length - 1);
  }

  attendanceTableBody.innerHTML = '';

  if (students.length === 0) {
    attendanceTableBody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center py-8 text-slate-400">
          Bu kursta kayıtlı kursiyer bulunmuyor. Önce "Kursiyer Listesi" sekmesinden kursiyer ekleyiniz.
        </td>
      </tr>
    `;
    refreshLucide();
    return;
  }

  students.forEach((s, idx) => {
    s.dailyAbsences = s.dailyAbsences || [];

    // Geçmiş verilerden gelen tekil absentHours varsa ve dailyAbsences henüz boşsa, günlük kayıtları başlat
    if (s.dailyAbsences.length === 0 && Number(s.absentHours) > 0) {
      let rem = Number(s.absentHours);
      let dayCnt = 0;
      while (rem > 0) {
        const chunk = Math.min(rem, dailyHours);
        s.dailyAbsences.push({
          id: `att_init_${s.id}_${dayCnt}`,
          date: activeCourseForDetail.startDate || selectedDate,
          hours: chunk,
          note: s.attendanceNote || 'Kayıtlı Devamsızlık'
        });
        rem -= chunk;
        dayCnt++;
      }
    }

    // Seçili güne ait devamsızlık saati
    const currentEntry = s.dailyAbsences.find(d => d.date === selectedDate);
    const hoursOnDate = currentEntry ? Number(currentEntry.hours) : 0;

    // Toplam devamsızlık saati
    const totalAbsent = s.dailyAbsences.reduce((sum, d) => sum + Number(d.hours), 0);
    s.absentHours = totalAbsent;

    const isExceeded = (totalAbsent > maxAllowed) || (s.attendance === 'Devamsız');

    const isFutureAllAbsent = remainingDatesFromCurrent.length > 0 && remainingDatesFromCurrent.every(d => {
      const rec = (s.dailyAbsences || []).find(a => a.date === d);
      return rec && Number(rec.hours) === dailyHours;
    });

    const dropBtnHtml = isFutureAllAbsent
      ? `
        <button
          type="button"
          onclick="markStudentAbsentFromDateOnwards('${s.id}')"
          class="px-2 py-0.5 text-[10px] font-bold rounded bg-rose-100 hover:bg-rose-200 dark:bg-rose-950/70 dark:hover:bg-rose-900/80 text-rose-800 dark:text-rose-200 border border-rose-300 dark:border-rose-700 transition cursor-pointer flex items-center gap-1 shadow-2xs whitespace-nowrap ml-1"
          title="Kursiyer bu tarihten itibaren kalan ${remainingDatesFromCurrent.length} ders gününde devamsızdır. Temizlemek için tıklayınız."
        >
          <i data-lucide="check-check" class="w-3 h-3 text-rose-600 dark:text-rose-400"></i>
          <span>Sonrası Devamsız (${remainingDatesFromCurrent.length}G)</span>
        </button>
      `
      : `
        <button
          type="button"
          onclick="markStudentAbsentFromDateOnwards('${s.id}')"
          class="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/50 dark:hover:bg-amber-900/70 text-[#9E2A2B] dark:text-amber-200 border border-amber-300 dark:border-amber-700 transition cursor-pointer flex items-center gap-1 shadow-2xs whitespace-nowrap ml-1"
          title="Kursu bırakan kursiyerler için: Bu tarihten kurs bitimine kadar olan ${remainingDatesFromCurrent.length} ders gününü tek tıkla devamsız yaz"
        >
          <i data-lucide="fast-forward" class="w-3 h-3 text-[#9E2A2B] dark:text-amber-400"></i>
          <span>Sonrasını Devamsız Gir</span>
        </button>
      `;

    const isEven = (idx % 2 === 0);
    const rowBgClass = isEven 
      ? 'bg-white dark:bg-[#152125]' 
      : 'bg-slate-50/80 dark:bg-[#10191b]';
    const rowHoverClass = 'hover:bg-[#E09F3E]/15 dark:hover:bg-[#E09F3E]/25 focus-within:bg-[#E09F3E]/25 dark:focus-within:bg-[#E09F3E]/30 transition-colors duration-150';

    const tr = document.createElement('tr');
    tr.className = `${rowBgClass} ${rowHoverClass} border-b border-slate-100 dark:border-[#23353c]/60`;
    tr.setAttribute('data-std-id', s.id);

    tr.innerHTML = `
      <td class="px-2.5 py-1.5 text-slate-400 font-medium text-center text-xs">${idx + 1}</td>
      <td class="px-3 py-1.5 text-slate-800 dark:text-slate-100">
        <span class="font-bold text-xs">${escapeHtml(s.fullName)}</span>
        ${s.phone ? `<span class="text-[10px] text-slate-400 font-mono ml-1">(${escapeHtml(s.phone)})</span>` : ''}
      </td>
      <td class="px-3 py-1.5 font-mono text-[11px] text-slate-600 dark:text-slate-400">${escapeHtml(s.tcNo || '-')}</td>
      
      <!-- KUTUCUK: Seçili Tarihteki Devamsızlık Saati Girişi (İnce & Kompakt) -->
      <td class="px-3 py-1 text-center bg-[#335C67]/5 dark:bg-[#335C67]/10 border-x border-[#335C67]/20">
        <div class="flex items-center justify-center gap-1 flex-wrap">
          <input
            type="number"
            min="0"
            max="${dailyHours}"
            step="1"
            placeholder="0"
            data-std-id="${s.id}"
            value="${hoursOnDate > 0 ? hoursOnDate : ''}"
            class="att-day-hour-input w-14 h-7 px-1.5 py-0.5 rounded-lg border-2 text-center text-xs font-black transition-all ${
              hoursOnDate > 0
                ? 'bg-rose-50 text-rose-800 border-[#9E2A2B] dark:bg-rose-950/40 dark:text-rose-200 dark:border-rose-600'
                : 'bg-white dark:bg-[#152125] text-slate-800 dark:text-slate-100 border-slate-300 dark:border-[#23353c]'
            } focus:ring-2 focus:ring-[#335C67] focus:outline-none"
            title="0 = Geldi, 1 ila ${dailyHours} saat arası devamsızlık yazabilirsiniz"
          />
          <span class="text-[10px] font-bold text-slate-400">Sa</span>
          
          <button
            type="button"
            onclick="setStudentDateAbsenceHours('${s.id}', ${dailyHours})"
            class="px-1.5 py-0.5 text-[10px] font-bold rounded bg-rose-50 hover:bg-rose-100 text-[#9E2A2B] border border-rose-200 transition cursor-pointer"
            title="Tam gün devamsız yaz (${dailyHours} Saat)"
          >
            ${dailyHours} Sa
          </button>
          
          <button
            type="button"
            onclick="setStudentDateAbsenceHours('${s.id}', 0)"
            class="px-1.5 py-0.5 text-[10px] font-bold rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition cursor-pointer"
            title="Geldi / Devamlı yaz (0 Saat)"
          >
            0 Sa
          </button>

          ${dropBtnHtml}
        </div>
      </td>

      <!-- Toplam Devamsızlık (Kompakt) -->
      <td class="px-3 py-1.5 text-center">
        <span class="text-xs font-extrabold ${isExceeded ? 'text-[#9E2A2B]' : 'text-slate-800 dark:text-slate-100'} font-mono">
          ${totalAbsent} Saat
        </span>
        <span class="text-[10px] text-slate-400 font-medium ml-1">
          (${s.dailyAbsences.length}G)
        </span>
      </td>

      <!-- MEB Yasal Sınır Durumu (Kompakt) -->
      <td class="px-3 py-1.5 text-center">
        ${isExceeded
          ? '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#9E2A2B]/10 text-[#9E2A2B] border border-[#9E2A2B]/30"><i data-lucide="alert-triangle" class="w-3 h-3"></i> Sınırı Aştı (Kaldı)</span>'
          : `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#335C67]/10 text-[#335C67] dark:text-[#FFF3B0] border border-[#335C67]/20"><i data-lucide="check-circle" class="w-3 h-3"></i> Kalan: ${Math.max(0, maxAllowed - totalAbsent)} Sa</span>`
        }
      </td>
    `;
    attendanceTableBody.appendChild(tr);
  });

  // Kutucuk saat değişikliklerini dinle
  attendanceTableBody.querySelectorAll('.att-day-hour-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const stdId = e.target.dataset.stdId;
      let val = e.target.value.trim();
      let hours = val === '' ? 0 : Number(val);
      const dailyHours = Number(activeCourseForDetail?.dailyHours) || 4;

      if (isNaN(hours) || hours < 0) {
        hours = 0;
        e.target.value = '';
      } else if (hours > dailyHours) {
        alert(`Devamsızlık saati kursun günlük ders saatinden (${dailyHours} saat) fazla olamaz. Değer ${dailyHours} saate sınırlandı.`);
        hours = dailyHours;
        e.target.value = dailyHours;
      }

      setStudentDateAbsenceHours(stdId, hours, true);
    });
  });

  refreshLucide();
}

// Tarih Gezinme: Önceki Kurs Günü (<)
function handleAttPrevDate() {
  if (currentAttendanceDateIndex > 0) {
    currentAttendanceDateIndex--;
    renderAttendanceTab();
  }
}

// Tarih Gezinme: Sonraki Kurs Günü (>)
function handleAttNextDate() {
  if (currentAttendanceDateIndex < currentCourseLessonDates.length - 1) {
    currentAttendanceDateIndex++;
    renderAttendanceTab();
  }
}

// Tarih Gezinme: Açılır Listeden Gün Seçimi
function handleAttDateSelectChange(e) {
  const newIdx = Number(e.target.value);
  if (!isNaN(newIdx) && newIdx >= 0 && newIdx < currentCourseLessonDates.length) {
    currentAttendanceDateIndex = newIdx;
    renderAttendanceTab();
  }
}

// Otomatik Kaydedildi Görsel Bildirimi (Toast)
function showAutoSaveToast(message = 'Değişiklik anında kaydedildi') {
  let toast = document.getElementById('autoSaveToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'autoSaveToast';
    toast.className = 'fixed bottom-5 right-5 z-50 flex items-center gap-2 px-3.5 py-2 bg-emerald-600/95 dark:bg-emerald-700/95 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-950/40 transition-all duration-300 opacity-0 pointer-events-none transform translate-y-2';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-emerald-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg><span>${escapeHtml(message)}</span>`;
  toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-2');
  toast.classList.add('opacity-100', 'translate-y-0');

  clearTimeout(window.__autoSaveToastTimeout);
  window.__autoSaveToastTimeout = setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-2');
  }, 1600);
}

// Kursiyerin seçili tarihteki devamsızlık saatini güncelleme fonksiyonu
window.setStudentDateAbsenceHours = function(studentId, hours, shouldRefresh = true) {
  if (!activeCourseForDetail) return;
  const std = activeCourseForDetail.students.find(s => s.id === studentId);
  if (!std) return;

  const selectedDate = currentCourseLessonDates[currentAttendanceDateIndex];
  if (!selectedDate) return;

  const dailyHours = Number(activeCourseForDetail.dailyHours) || 4;
  hours = Math.max(0, Math.min(dailyHours, Number(hours) || 0));

  std.dailyAbsences = std.dailyAbsences || [];

  const existingIdx = std.dailyAbsences.findIndex(d => d.date === selectedDate);

  if (hours <= 0) {
    // 0 ise devamsızlık kaydını kaldır (kursiyer o gün geldi)
    if (existingIdx !== -1) {
      std.dailyAbsences.splice(existingIdx, 1);
    }
  } else {
    // 1 ile dailyHours arasında ise ekle veya güncelle
    if (existingIdx !== -1) {
      std.dailyAbsences[existingIdx].hours = hours;
    } else {
      std.dailyAbsences.push({
        id: `att_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        date: selectedDate,
        hours: hours,
        note: ''
      });
    }
  }

  // Tarihlere göre sırala
  std.dailyAbsences.sort((a, b) => a.date.localeCompare(b.date));

  // Toplam saat ve MEB 1/5 kuralı
  const totalAbsent = std.dailyAbsences.reduce((sum, d) => sum + Number(d.hours), 0);
  std.absentHours = totalAbsent;

  const totalHours = activeCourseForDetail.totalHours || 0;
  const maxAllowed = Math.floor(totalHours / 5);

  if (totalAbsent > maxAllowed) {
    std.attendance = 'Devamsız';
    std.result = 'Devamsız';
  } else {
    std.attendance = totalAbsent > 0 ? 'Devamlı' : 'Devamlı';
    if (std.result === 'Devamsız') {
      std.result = (std.examScore !== null && std.examScore >= 50) ? 'Başarılı' : (std.examScore !== null ? 'Başarısız' : 'Devam Ediyor');
    }
  }

  // Kaydet
  currentCourses = currentCourses.map(c => c.id === activeCourseForDetail.id ? activeCourseForDetail : c);
  DataStore.saveCourses(currentCourses);

  if (shouldRefresh) {
    renderAttendanceTab();
    renderStudentTable();
    renderTeacherDashboard();
    showAutoSaveToast('Devamsızlık anında kaydedildi');
  }
};

// Kursu Bırakan Kursiyer İçin Seçili Tarihten Kurs Bitimine Kadar Devamsız İşleme
window.markStudentAbsentFromDateOnwards = function(studentId) {
  if (!activeCourseForDetail) return;
  const std = activeCourseForDetail.students?.find(s => s.id === studentId);
  if (!std) return;

  if (currentAttendanceDateIndex < 0 || currentAttendanceDateIndex >= currentCourseLessonDates.length) {
    alert('Lütfen geçerli bir ders tarihi seçiniz.');
    return;
  }

  const currentDate = currentCourseLessonDates[currentAttendanceDateIndex];
  const remainingDates = currentCourseLessonDates.slice(currentAttendanceDateIndex);
  const dailyHours = Number(activeCourseForDetail.dailyHours) || 4;

  const formattedDate = formatShortDate(currentDate);
  const endDate = formatShortDate(currentCourseLessonDates[currentCourseLessonDates.length - 1]);

  std.dailyAbsences = std.dailyAbsences || [];

  // Kursiyer bu tarihten sonrasındaki tüm günlerde zaten devamsız mı?
  const allAlreadyAbsent = remainingDates.every(d => {
    const rec = std.dailyAbsences.find(a => a.date === d);
    return rec && Number(rec.hours) === dailyHours;
  });

  if (allAlreadyAbsent) {
    const clearConfirm = `ℹ️ ${std.fullName} için ${formattedDate} tarihinden kurs bitimine (${endDate}) kadar olan ${remainingDates.length} ders günü zaten devamsız olarak kayıtlı.\n\nBu tarihten sonrasındaki tüm devamsızlıkları TEMİZLEMEK (kursiyeri geldi / 0 saat yapmak) istiyor musunuz?`;
    if (!confirm(clearConfirm)) return;

    std.dailyAbsences = std.dailyAbsences.filter(d => !remainingDates.includes(d.date));
  } else {
    const confirmMsg = `⚠️ DİKKAT: Kursu Bırakan Kursiyer Devamsızlık Girişi\n\n` +
      `Kursiyer: ${std.fullName}\n` +
      `Ayrılış / Başlangıç Tarihi: ${formattedDate}\n` +
      `Kurs Bitiş Tarihi: ${endDate}\n` +
      `Kapsanan Ders Günü: ${remainingDates.length} Gün (Günde ${dailyHours} saat)\n\n` +
      `Kursiyer bu tarihten sonra kursu bıraktığı için, ${formattedDate} tarihinden kurs sonuna kadar olan ${remainingDates.length} ders gününün tamamına tam gün (${dailyHours} saat) devamsızlık işlenecektir.\n\n` +
      `Onaylıyor musunuz?`;

    if (!confirm(confirmMsg)) return;

    remainingDates.forEach(dateStr => {
      const existing = std.dailyAbsences.find(d => d.date === dateStr);
      if (existing) {
        existing.hours = dailyHours;
        existing.note = 'Kursu bıraktı / Devamsız';
      } else {
        std.dailyAbsences.push({
          id: `att_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          date: dateStr,
          hours: dailyHours,
          note: 'Kursu bıraktı / Devamsız'
        });
      }
    });
  }

  // Tarihlere göre sırala
  std.dailyAbsences.sort((a, b) => a.date.localeCompare(b.date));

  // Toplam saat ve MEB 1/5 kuralı
  const totalAbsent = std.dailyAbsences.reduce((sum, d) => sum + Number(d.hours), 0);
  std.absentHours = totalAbsent;

  const totalHours = activeCourseForDetail.totalHours || 0;
  const maxAllowed = Math.floor(totalHours / 5);

  if (totalAbsent > maxAllowed) {
    std.attendance = 'Devamsız';
    std.result = 'Devamsız';
  } else {
    std.attendance = totalAbsent > 0 ? 'Devamlı' : 'Devamlı';
    if (std.result === 'Devamsız') {
      std.result = (std.examScore !== null && std.examScore >= 50) ? 'Başarılı' : (std.examScore !== null ? 'Başarısız' : 'Devam Ediyor');
    }
  }

  // Kaydet
  currentCourses = currentCourses.map(c => c.id === activeCourseForDetail.id ? activeCourseForDetail : c);
  DataStore.saveCourses(currentCourses);

  renderAttendanceTab();
  renderStudentTable();
  renderTeacherDashboard();

  showAutoSaveToast(allAlreadyAbsent ? 'Kalan günlerin devamsızlığı temizlendi' : `${remainingDates.length} ders gününe devamsızlık işlendi`);
};

// Seçili Ders Günü İçin Tüm Kursiyerleri "Geldi (0 Saat)" Yap
function handleMarkDayPresent() {
  if (!activeCourseForDetail) return;
  const selectedDate = currentCourseLessonDates[currentAttendanceDateIndex];
  if (!selectedDate) return;

  const dObj = new Date(selectedDate + 'T00:00:00');
  const dateName = dObj.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', weekday: 'long' });

  if (!confirm(`${dateName} tarihindeki ders için tüm kursiyerlerin devamsızlığı 0 yapılacak (herkes geldi sayılacak). Onaylıyor musunuz?`)) {
    return;
  }

  activeCourseForDetail.students.forEach(std => {
    std.dailyAbsences = (std.dailyAbsences || []).filter(d => d.date !== selectedDate);
    std.absentHours = std.dailyAbsences.reduce((sum, d) => sum + Number(d.hours), 0);
    const maxAllowed = Math.floor((activeCourseForDetail.totalHours || 0) / 5);
    if (std.absentHours <= maxAllowed && std.attendance === 'Devamsız') {
      std.attendance = 'Devamlı';
      std.result = (std.examScore !== null && std.examScore >= 50) ? 'Başarılı' : (std.examScore !== null ? 'Başarısız' : 'Devam Ediyor');
    }
  });

  currentCourses = currentCourses.map(c => c.id === activeCourseForDetail.id ? activeCourseForDetail : c);
  DataStore.saveCourses(currentCourses);

  renderAttendanceTab();
  renderStudentTable();
  renderTeacherDashboard();
  showAutoSaveToast('Tüm kursiyerler "Geldi" yapıldı');
}

// =================== MODÜL SINAVLARI & NOT GİRİŞ EKRANI ===================

function renderExamsTab() {
  if (!activeCourseForDetail) return;
  activeCourseForDetail.students = sortStudentsAlphabetically(activeCourseForDetail.students || []);
  const students = activeCourseForDetail.students;
  const moduleCount = activeCourseForDetail.moduleCount ? Math.max(1, Number(activeCourseForDetail.moduleCount)) : 1;

  // Başlıklar
  let theadHtml = `
    <tr>
      <th class="px-3 py-3 w-10">#</th>
      <th class="px-4 py-3">Kursiyer Adı Soyadı</th>
      <th class="px-3 py-3 font-mono">T.C. Kimlik No</th>
  `;

  for (let m = 1; m <= moduleCount; m++) {
    theadHtml += `
      <th class="px-3 py-3 text-center w-28 bg-purple-50/50 text-purple-900 border-x border-slate-200">
        ${m}. Modül Sınavı
      </th>
    `;
  }

  theadHtml += `
      <th class="px-3 py-3 text-center w-28 font-bold text-slate-800">Genel Ortalama</th>
      <th class="px-3 py-3 text-center w-32 font-bold text-slate-800">Kurs Sonu Durumu</th>
    </tr>
  `;
  examsMatrixThead.innerHTML = theadHtml;

  examsMatrixTbody.innerHTML = '';

  if (students.length === 0) {
    examsMatrixTbody.innerHTML = `
      <tr>
        <td colspan="${moduleCount + 5}" class="text-center py-8 text-slate-400">
          Bu kursta kayıtlı kursiyer bulunmuyor. Önce kursiyer ekleyiniz.
        </td>
      </tr>
    `;
    return;
  }

  students.forEach((s, idx) => {
    const isEven = (idx % 2 === 0);
    const rowBgClass = isEven 
      ? 'bg-white dark:bg-[#152125]' 
      : 'bg-slate-50/70 dark:bg-[#10191b]';
    const rowHoverClass = 'hover:bg-purple-100/50 dark:hover:bg-purple-950/40 focus-within:bg-purple-100/80 dark:focus-within:bg-purple-900/40 transition-colors duration-150';

    const tr = document.createElement('tr');
    tr.className = `${rowBgClass} ${rowHoverClass} border-b border-slate-100 dark:border-[#23353c]/60`;
    tr.setAttribute('data-std-id', s.id);

    const modScores = s.moduleScores || {};

    let moduleInputsHtml = '';
    for (let m = 1; m <= moduleCount; m++) {
      const score = modScores[m];
      const val = (score !== null && score !== undefined && score !== '') ? score : '';
      moduleInputsHtml += `
        <td class="px-2 py-2 text-center border-x border-slate-100 dark:border-[#23353c]/40">
          <input
            type="number"
            min="0"
            max="100"
            placeholder="0 - 100"
            value="${val}"
            data-std-id="${s.id}"
            data-module="${m}"
            class="exam-cell-score text-center w-20 px-2 py-1.5 bg-white dark:bg-[#10191b] border border-slate-200 dark:border-[#23353c] rounded-lg text-xs font-bold text-purple-950 dark:text-purple-200 focus:ring-2 focus:ring-purple-500 focus:outline-none transition shadow-2xs"
          />
        </td>
      `;
    }

    const avgDisplay = (s.examScore !== null && s.examScore !== undefined) ? s.examScore : '-';
    let resultClass = 'bg-slate-100 text-slate-700';
    if (s.attendance === 'Devamsız' || s.result === 'Devamsız') {
      resultClass = 'bg-rose-100 text-rose-800';
    } else if (s.examScore !== null && s.examScore >= 50) {
      resultClass = 'bg-emerald-100 text-emerald-800 font-bold';
    } else if (s.examScore !== null) {
      resultClass = 'bg-amber-100 text-amber-800 font-bold';
    }

    tr.innerHTML = `
      <td class="px-3 py-3 text-slate-400 font-medium text-center text-xs">${idx + 1}</td>
      <td class="px-4 py-3 font-semibold text-slate-800 dark:text-slate-100">
        <div>${escapeHtml(s.fullName)}</div>
        <div class="text-[10px] text-slate-400 font-mono">${escapeHtml(s.phone || '-')}</div>
      </td>
      <td class="px-3 py-3 font-mono text-slate-600 dark:text-slate-400 text-xs">${escapeHtml(s.tcNo || '-')}</td>
      ${moduleInputsHtml}
      <td class="px-3 py-3 text-center">
        <span class="exam-row-avg text-sm font-extrabold text-purple-900 dark:text-purple-300" data-std-id="${s.id}">
          ${avgDisplay}
        </span>
      </td>
      <td class="px-3 py-3 text-center">
        <span class="exam-row-status inline-flex px-2 py-0.5 rounded text-[11px] font-bold ${resultClass}" data-std-id="${s.id}">
          ${escapeHtml(s.result || 'Devam Ediyor')}
        </span>
      </td>
    `;
    examsMatrixTbody.appendChild(tr);
  });

  // Not değiştiğinde canlı ortalama ve durum hesaplama & mouse tekerleğiyle yanlışlıkla not değişmesini önleme
  examsMatrixTbody.querySelectorAll('.exam-cell-score').forEach(input => {
    input.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });
    input.addEventListener('input', (e) => {
      const stdId = e.target.dataset.stdId;
      recalculateStudentExamRowLive(stdId);
    });
  });

  refreshLucide();
}

function recalculateStudentExamRowLive(stdId) {
  const inputs = examsMatrixTbody.querySelectorAll(`.exam-cell-score[data-std-id="${stdId}"]`);
  let sum = 0;
  let count = 0;
  inputs.forEach(inp => {
    const val = inp.value.trim();
    if (val !== '') {
      sum += Number(val);
      count++;
    }
  });

  const avgSpan = examsMatrixTbody.querySelector(`.exam-row-avg[data-std-id="${stdId}"]`);
  const statusSpan = examsMatrixTbody.querySelector(`.exam-row-status[data-std-id="${stdId}"]`);
  const std = activeCourseForDetail.students.find(s => s.id === stdId);

  const moduleCount = activeCourseForDetail?.moduleCount ? Math.max(1, Number(activeCourseForDetail.moduleCount)) : 1;

  if (count === 0) {
    if (avgSpan) avgSpan.innerText = '-';
    if (statusSpan) {
      statusSpan.className = 'exam-row-status inline-flex px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700';
      statusSpan.innerText = std?.attendance === 'Devamsız' ? 'Devamsız' : 'Devam Ediyor';
    }
  } else {
    const avg = Math.round((sum / count) * 10) / 10;
    if (avgSpan) avgSpan.innerText = avg;

    if (std?.attendance === 'Devamsız') {
      if (statusSpan) {
        statusSpan.className = 'exam-row-status inline-flex px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800';
        statusSpan.innerText = 'Devamsız';
      }
    } else {
      // MEB Kuralı: Tüm modüller girilmeli ve her biri >= 50 olmalıdır
      let allPassed = (count === moduleCount);
      inputs.forEach(inp => {
        const val = inp.value.trim();
        if (val === '' || Number(val) < 50) allPassed = false;
      });

      if (statusSpan) {
        statusSpan.className = `exam-row-status inline-flex px-2 py-0.5 rounded text-[11px] font-bold ${allPassed ? 'bg-emerald-100 text-emerald-800' : (count === moduleCount ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800')}`;
        statusSpan.innerText = allPassed ? 'Başarılı' : (count === moduleCount ? 'Başarısız' : 'Devam Ediyor');
      }
    }
  }
}

function handleSaveAllExams() {
  if (!activeCourseForDetail) return;
  const moduleCount = activeCourseForDetail.moduleCount ? Math.max(1, Number(activeCourseForDetail.moduleCount)) : 1;

  activeCourseForDetail.students.forEach(std => {
    const inputs = examsMatrixTbody.querySelectorAll(`.exam-cell-score[data-std-id="${std.id}"]`);
    const modScores = {};
    let sum = 0;
    let count = 0;

    inputs.forEach(inp => {
      const m = Number(inp.dataset.module);
      const val = inp.value.trim();
      if (val !== '') {
        const num = Math.min(100, Math.max(0, Number(val)));
        modScores[m] = num;
        sum += num;
        count++;
      } else {
        modScores[m] = null;
      }
    });

    std.moduleScores = modScores;

    if (count > 0) {
      std.examScore = Math.round((sum / count) * 10) / 10;
      if (std.attendance === 'Devamsız') {
        std.result = 'Devamsız';
      } else {
        // MEB Modüler Sistem Standardı: Her bir modülden en az 50 alınmalıdır
        let allPassed = (count === moduleCount);
        for (let m = 1; m <= moduleCount; m++) {
          if (modScores[m] === null || modScores[m] === undefined || modScores[m] < 50) {
            allPassed = false;
            break;
          }
        }
        std.result = allPassed ? 'Başarılı' : (count === moduleCount ? 'Başarısız' : 'Devam Ediyor');
      }
    } else {
      std.examScore = null;
      if (std.attendance !== 'Devamsız') {
        std.result = 'Devam Ediyor';
      }
    }
  });

  currentCourses = currentCourses.map(c => c.id === activeCourseForDetail.id ? activeCourseForDetail : c);
  DataStore.saveCourses(currentCourses);

  renderExamsTab();
  renderStudentTable();
  renderTeacherDashboard();
  alert('Tüm modül sınav notları ve başarı ortalamaları kaydedildi.');
}

// =================== TEKİL KURSİYER DEVAMSIZLIK MODALI (GÜN GÜN DEVAMSIZLIK) ===================

let currentModalDailyAbsences = [];

window.openSingleAttModal = function(studentId) {
  if (!activeCourseForDetail) return;
  const std = activeCourseForDetail.students.find(s => s.id === studentId);
  if (!std) return;

  const totalHours = activeCourseForDetail.totalHours || 0;
  const dailyHours = Number(activeCourseForDetail.dailyHours) || 4;
  const maxAllowed = Math.floor(totalHours / 5);

  singleAttStudentId.value = std.id;
  singleAttStudentName.innerText = std.fullName;
  singleAttStudentTc.innerText = std.tcNo ? `(TC: ${std.tcNo})` : '';
  if (singleAttDailyHoursLimit) singleAttDailyHoursLimit.innerText = dailyHours;
  if (singleAttLimitText) singleAttLimitText.innerText = `${maxAllowed} Saat (Kurs Toplamı: ${totalHours} Saat)`;
  if (dailyAttMaxLabel) dailyAttMaxLabel.innerText = dailyHours;
  if (singleAttMaxHoursHint) singleAttMaxHoursHint.innerText = dailyHours;

  // Form inputlarını sıfırla
  if (dailyAttHoursInput) {
    dailyAttHoursInput.min = 1;
    dailyAttHoursInput.max = dailyHours;
    dailyAttHoursInput.value = dailyHours;
  }
  if (dailyAttDateInput) {
    dailyAttDateInput.value = new Date().toISOString().split('T')[0];
  }
  if (dailyAttNoteInput) {
    dailyAttNoteInput.value = '';
  }

  // Kursiyerin mevcut devamsızlık günlerini yükle (Klonla)
  if (std.dailyAbsences && Array.isArray(std.dailyAbsences)) {
    currentModalDailyAbsences = JSON.parse(JSON.stringify(std.dailyAbsences));
  } else if (Number(std.absentHours) > 0) {
    // Geçmiş veriden gelen saati günlük parçalara dönüştür
    currentModalDailyAbsences = [];
    let rem = Number(std.absentHours);
    let dayIdx = 0;
    while (rem > 0) {
      const chunk = Math.min(rem, dailyHours);
      currentModalDailyAbsences.push({
        id: `att_${Date.now()}_${dayIdx}`,
        date: activeCourseForDetail.startDate || new Date().toISOString().split('T')[0],
        hours: chunk,
        note: std.attendanceNote || 'Geçmiş Devamsızlık'
      });
      rem -= chunk;
      dayIdx++;
    }
  } else {
    currentModalDailyAbsences = [];
  }

  renderSingleAttDaysTable();
  singleAttendanceModal.classList.remove('hidden');
  refreshLucide();
};

function closeSingleAttModal() {
  singleAttendanceModal.classList.add('hidden');
  currentModalDailyAbsences = [];
}

function renderSingleAttDaysTable() {
  if (!singleAttDaysTableBody) return;
  singleAttDaysTableBody.innerHTML = '';

  const totalAbsentHours = currentModalDailyAbsences.reduce((sum, d) => sum + Number(d.hours), 0);
  const totalHours = activeCourseForDetail?.totalHours || 0;
  const maxAllowed = Math.floor(totalHours / 5);

  if (singleAttTotalBadge) {
    singleAttTotalBadge.innerText = `Toplam: ${totalAbsentHours} Saat (${currentModalDailyAbsences.length} Gün)`;
  }

  if (currentModalDailyAbsences.length === 0) {
    singleAttDaysTableBody.innerHTML = `
      <tr>
        <td colspan="5" class="py-7 text-center text-slate-400">
          Bu kursiyer için henüz devamsızlık günü girilmedi. Yukarıdaki formdan gün ekleyebilirsiniz.
        </td>
      </tr>
    `;
  } else {
    currentModalDailyAbsences.forEach((d, idx) => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-50 dark:hover:bg-[#10191b] transition border-b border-slate-100 dark:border-[#23353c]';
      tr.innerHTML = `
        <td class="px-3 py-2 text-center text-slate-400 font-medium">${idx + 1}</td>
        <td class="px-3 py-2 font-semibold text-slate-800 dark:text-slate-200">
          <div class="flex items-center gap-1.5">
            <i data-lucide="calendar" class="w-3.5 h-3.5 text-[#335C67] dark:text-[#FFF3B0] shrink-0"></i>
            <span>${formatDate(d.date)}</span>
          </div>
        </td>
        <td class="px-3 py-2 text-center">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-bold bg-[#9E2A2B]/10 text-[#9E2A2B] dark:bg-[#9E2A2B]/20 dark:text-[#FFF3B0] border border-[#9E2A2B]/30 font-mono">
            ${d.hours} Saat
          </span>
        </td>
        <td class="px-3 py-2 text-slate-600 dark:text-slate-400 text-xs">
          ${escapeHtml(d.note || '-')}
        </td>
        <td class="px-3 py-2 text-center">
          <button
            type="button"
            onclick="removeSingleAttDay(${idx})"
            class="p-1 text-slate-400 hover:text-[#9E2A2B] hover:bg-[#9E2A2B]/10 rounded-lg transition cursor-pointer"
            title="Günü Listeden Kaldır"
          >
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </td>
      `;
      singleAttDaysTableBody.appendChild(tr);
    });
  }

  // Canlı Yasal Durum Özeti Kartı
  if (singleAttStatusSummaryCard) {
    if (totalAbsentHours > maxAllowed) {
      singleAttStatusSummaryCard.className = 'p-3.5 rounded-2xl border transition-all bg-[#9E2A2B]/10 dark:bg-[#9E2A2B]/20 border-[#9E2A2B]/30 text-[#9E2A2B] dark:text-[#FFF3B0]';
      singleAttStatusSummaryCard.innerHTML = `
        <div class="flex items-start gap-3">
          <i data-lucide="alert-triangle" class="w-5 h-5 shrink-0 mt-0.5 text-[#9E2A2B]"></i>
          <div class="space-y-1 text-xs">
            <div class="font-bold text-sm">⚠️ MEB Yasal Devamsızlık Sınırı Aşıldı! (${totalAbsentHours} / ${maxAllowed} Saat)</div>
            <p>
              Kurs toplamı <strong>${totalHours} saat</strong> olup yasal azami devamsızlık hakkı <strong>${maxAllowed} saattir</strong> (1/5 kuralı).
              Kursiyer sınırı <strong>${totalAbsentHours - maxAllowed} saat</strong> aşmıştır ve kurs sonu durumu otomatik olarak <strong>DEVAMSIZ (Kaldı)</strong> olacaktır.
            </p>
          </div>
        </div>
      `;
    } else {
      singleAttStatusSummaryCard.className = 'p-3.5 rounded-2xl border transition-all bg-[#335C67]/10 dark:bg-[#335C67]/20 border-[#335C67]/30 text-[#335C67] dark:text-[#FFF3B0]';
      singleAttStatusSummaryCard.innerHTML = `
        <div class="flex items-start gap-3">
          <i data-lucide="check-circle-2" class="w-5 h-5 shrink-0 mt-0.5 text-[#335C67]"></i>
          <div class="space-y-1 text-xs">
            <div class="font-bold text-sm">✓ MEB Yasal Devamsızlık Sınırı Dahilinde (${totalAbsentHours} / ${maxAllowed} Saat)</div>
            <p>
              Kursiyerin kalan devamsızlık hakkı: <strong>${Math.max(0, maxAllowed - totalAbsentHours)} saat</strong>.
              ${totalAbsentHours === 0 ? 'Kursiyerin henüz hiç devamsızlığı bulunmamaktadır.' : 'Devamsızlık saatleri MEB mevzuat limitleri içerisindedir.'}
            </p>
          </div>
        </div>
      `;
    }
  }

  refreshLucide();
}

window.removeSingleAttDay = function(index) {
  currentModalDailyAbsences.splice(index, 1);
  renderSingleAttDaysTable();
};

function handleAddDailyAttEntry() {
  if (!activeCourseForDetail) return;

  const date = dailyAttDateInput?.value;
  if (!date) {
    alert('Lütfen geçerli bir devamsızlık tarihi seçiniz.');
    dailyAttDateInput?.focus();
    return;
  }

  const hours = Number(dailyAttHoursInput?.value);
  const dailyHours = Number(activeCourseForDetail.dailyHours) || 4;

  if (isNaN(hours) || hours < 1) {
    alert('Devamsızlık saati en az 1 saat olmalıdır.');
    dailyAttHoursInput?.focus();
    return;
  }

  if (hours > dailyHours) {
    alert(`Devamsızlık saati kursun günlük ders saatinden (${dailyHours} saat) fazla olamaz.`);
    dailyAttHoursInput?.focus();
    return;
  }

  const dObj = new Date(date + 'T00:00:00');
  const dayName = TURKISH_DAYS_MAP[dObj.getDay()];
  const activeDays = (activeCourseForDetail.days && activeCourseForDetail.days.length > 0)
    ? activeCourseForDetail.days
    : ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];
  const offDayDates = new Set((activeCourseForDetail.offDays || []).map(o => o.date));

  if (!activeDays.includes(dayName)) {
    alert(`Seçilen tarih (${formatDate(date)} - ${dayName}) bu kursun ders günleri (${activeDays.join(', ')}) arasında yer almamaktadır.`);
    dailyAttDateInput?.focus();
    return;
  }

  if (offDayDates.has(date) || isTurkishOfficialHoliday(date)) {
    const hName = getTurkishHolidayName(date);
    alert(`Seçilen tarih (${formatDate(date)}) resmi tatil veya ders yapılmayan gündür${hName ? ` (${hName})` : ''}. Resmi tatillerde ders işlenemez ve devamsızlık kaydedilemez.`);
    dailyAttDateInput?.focus();
    return;
  }

  const note = (dailyAttNoteInput?.value || '').trim();

  // Aynı tarihe zaten giriş yapılmış mı kontrolü
  const existingIdx = currentModalDailyAbsences.findIndex(d => d.date === date);
  if (existingIdx !== -1) {
    const existing = currentModalDailyAbsences[existingIdx];
    if (confirm(`${formatDate(date)} tarihi için zaten ${existing.hours} saat devamsızlık girilmiş.\n\n${hours} saat olarak güncellemek istiyor musunuz?`)) {
      currentModalDailyAbsences[existingIdx].hours = hours;
      if (note) currentModalDailyAbsences[existingIdx].note = note;
    } else {
      return;
    }
  } else {
    currentModalDailyAbsences.push({
      id: `att_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      date,
      hours,
      note
    });
  }

  // Tarihe göre sırala
  currentModalDailyAbsences.sort((a, b) => a.date.localeCompare(b.date));

  if (dailyAttNoteInput) dailyAttNoteInput.value = '';

  renderSingleAttDaysTable();
}

function handleSaveSingleAttModal() {
  if (!activeCourseForDetail) return;

  const stdId = singleAttStudentId?.value;
  const std = activeCourseForDetail.students?.find(s => s.id === stdId);
  if (!std) return;

  std.dailyAbsences = [...currentModalDailyAbsences];
  const totalAbsent = std.dailyAbsences.reduce((sum, d) => sum + Number(d.hours), 0);
  std.absentHours = totalAbsent;

  const totalHours = activeCourseForDetail.totalHours || 0;
  const maxAllowed = Math.floor(totalHours / 5);

  if (totalAbsent > maxAllowed) {
    std.attendance = 'Devamsız';
    std.result = 'Devamsız';
  } else {
    std.attendance = totalAbsent > 0 ? 'Devamlı' : 'Devamlı';
    if (std.result === 'Devamsız') {
      std.result = (std.examScore !== null && std.examScore >= 50) ? 'Başarılı' : (std.examScore !== null ? 'Başarısız' : 'Devam Ediyor');
    }
  }

  // Kurs bilgilerini kaydet
  currentCourses = currentCourses.map(c => c.id === activeCourseForDetail.id ? activeCourseForDetail : c);
  DataStore.saveCourses(currentCourses);

  closeSingleAttModal();
  renderStudentTable();
  renderAttendanceTab();
  renderTeacherDashboard();
}

// =================== TEKİL KURSİYER MODÜL SINAVLARI MODALI ===================

window.openSingleExamModal = function(studentId) {
  if (!activeCourseForDetail) return;
  const std = activeCourseForDetail.students.find(s => s.id === studentId);
  if (!std) return;

  const moduleCount = activeCourseForDetail.moduleCount ? Math.max(1, Number(activeCourseForDetail.moduleCount)) : 1;
  const modScores = std.moduleScores || {};

  singleExamStudentId.value = std.id;
  singleExamStudentName.innerText = std.fullName;
  singleExamStudentTc.innerText = std.tcNo || '-';

  singleExamModulesContainer.innerHTML = '';

  for (let m = 1; m <= moduleCount; m++) {
    const scoreVal = (modScores[m] !== null && modScores[m] !== undefined && modScores[m] !== '') ? modScores[m] : '';
    const div = document.createElement('div');
    div.className = 'flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200';
    div.innerHTML = `
      <div>
        <label class="block text-xs font-bold text-slate-800">${m}. Modül Sınavı *</label>
        <span class="text-[11px] text-slate-400">Modül sonu değerlendirme puanı (0-100)</span>
      </div>
      <div class="flex items-center gap-1.5">
        <input
          type="number"
          min="0"
          max="100"
          placeholder="0-100"
          data-module="${m}"
          value="${scoreVal}"
          class="single-exam-module-input w-24 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-purple-950 focus:ring-2 focus:ring-purple-500 text-center"
        />
        <span class="text-xs text-slate-400 font-bold">Puan</span>
      </div>
    `;
    singleExamModulesContainer.appendChild(div);
  }

  // Canlı ortalama dinleyicisi
  singleExamModulesContainer.querySelectorAll('.single-exam-module-input').forEach(inp => {
    inp.addEventListener('input', updateSingleExamModalSummary);
  });

  updateSingleExamModalSummary();

  singleExamModal.classList.remove('hidden');
  refreshLucide();
};

function updateSingleExamModalSummary() {
  const inputs = singleExamModulesContainer.querySelectorAll('.single-exam-module-input');
  let sum = 0;
  let count = 0;
  inputs.forEach(inp => {
    const val = inp.value.trim();
    if (val !== '') {
      sum += Number(val);
      count++;
    }
  });

  const std = activeCourseForDetail?.students?.find(s => s.id === singleExamStudentId.value);

  if (count === 0) {
    singleExamAvgScore.innerText = '-';
    singleExamResultBadge.className = 'inline-flex px-2.5 py-0.5 rounded text-xs font-bold bg-slate-200 text-slate-700';
    singleExamResultBadge.innerText = std?.attendance === 'Devamsız' ? 'Devamsız' : 'Devam Ediyor';
  } else {
    const avg = Math.round((sum / count) * 10) / 10;
    singleExamAvgScore.innerText = `${avg} Puan`;

    if (std?.attendance === 'Devamsız') {
      singleExamResultBadge.className = 'inline-flex px-2.5 py-0.5 rounded text-xs font-bold bg-rose-100 text-rose-800';
      singleExamResultBadge.innerText = 'Devamsız';
    } else {
      const isSuccess = avg >= 50;
      singleExamResultBadge.className = `inline-flex px-2.5 py-0.5 rounded text-xs font-bold ${isSuccess ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`;
      singleExamResultBadge.innerText = isSuccess ? 'Başarılı (Geçti)' : 'Başarısız (Kaldı)';
    }
  }
}

function closeSingleExamModal() {
  singleExamModal.classList.add('hidden');
}

function handleSaveSingleExam(e) {
  e.preventDefault();
  if (!activeCourseForDetail) return;

  const stdId = singleExamStudentId.value;
  const std = activeCourseForDetail.students.find(s => s.id === stdId);
  if (!std) return;

  const inputs = singleExamModulesContainer.querySelectorAll('.single-exam-module-input');
  const modScores = {};
  let sum = 0;
  let count = 0;

  inputs.forEach(inp => {
    const m = Number(inp.dataset.module);
    const val = inp.value.trim();
    if (val !== '') {
      const num = Math.min(100, Math.max(0, Number(val)));
      modScores[m] = num;
      sum += num;
      count++;
    } else {
      modScores[m] = null;
    }
  });

  std.moduleScores = modScores;

  const moduleCount = activeCourseForDetail.moduleCount ? Math.max(1, Number(activeCourseForDetail.moduleCount)) : 1;

  if (count > 0) {
    std.examScore = Math.round((sum / count) * 10) / 10;
    if (std.attendance === 'Devamsız') {
      std.result = 'Devamsız';
    } else {
      // MEB Modüler Sistem Standardı: Tüm modüller >= 50 olmalıdır
      let allPassed = (count === moduleCount);
      for (let m = 1; m <= moduleCount; m++) {
        if (modScores[m] === null || modScores[m] === undefined || modScores[m] < 50) {
          allPassed = false;
          break;
        }
      }
      std.result = allPassed ? 'Başarılı' : (count === moduleCount ? 'Başarısız' : 'Devam Ediyor');
    }
  } else {
    std.examScore = null;
    if (std.attendance !== 'Devamsız') {
      std.result = 'Devam Ediyor';
    }
  }

  currentCourses = currentCourses.map(c => c.id === activeCourseForDetail.id ? activeCourseForDetail : c);
  DataStore.saveCourses(currentCourses);

  closeSingleExamModal();
  renderStudentTable();
  renderExamsTab();
  renderTeacherDashboard();
}

// =================== RESMİ EVRAK: KURSİYER KARAR DURUMU ===================

function formatShortDate(dateStr) {
  if (!dateStr) return '-';
  try {
    const cleanStr = String(dateStr).split('T')[0];
    const parts = cleanStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}.${parts[1]}.${parts[0]}`;
    }
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  } catch {
    return dateStr;
  }
}

function getStudentKararDurumu(student, course) {
  if (!student) return 'Devamsız';
  const totalHours = Number(course?.totalHours) || 0;
  const maxAllowed = Math.floor(totalHours / 5);
  const absentHours = Number(student.absentHours || 0);
  const docType = (course && course.documentType) ? course.documentType : 'Sertifika';

  // Devamsızlık kontrolü: Devamsız ise veya yasal 1/5 devamsızlık sınırını aştıysa doğrudan "Devamsız"
  const isDevamsiz = (student.attendance === 'Devamsız') || 
                     (student.result === 'Devamsız') ||
                     (totalHours > 0 && absentHours > maxAllowed);

  if (isDevamsiz) {
    return 'Devamsız';
  }

  const moduleCount = course?.moduleCount ? Math.max(1, Number(course.moduleCount)) : 1;
  const modScores = student.moduleScores || {};

  let allModulesPresentAndPassed = true;
  let hasAnyModuleScore = false;

  for (let m = 1; m <= moduleCount; m++) {
    const sc = modScores[m];
    if (sc !== null && sc !== undefined && sc !== '' && !isNaN(Number(sc))) {
      hasAnyModuleScore = true;
      if (Number(sc) < 50) {
        allModulesPresentAndPassed = false;
      }
    } else {
      // Modül notu henüz girilmemiş
      allModulesPresentAndPassed = false;
    }
  }

  // Eğer modül notları girilmişse:
  if (hasAnyModuleScore) {
    if (allModulesPresentAndPassed) {
      return docType;
    } else {
      return 'Transkript';
    }
  }

  // Modül notu girilmemiş ama genel sınav notu girilmişse:
  if (student.examScore !== null && student.examScore !== undefined && !isNaN(Number(student.examScore))) {
    if (Number(student.examScore) >= 50) {
      return docType;
    } else {
      return 'Transkript';
    }
  }

  // Eğer sonuç doğrudan başarılı belirtilmişse:
  if (student.result && (student.result.includes('Başarılı') || student.result.includes('Belge') || student.result.includes('Sertifika') || student.result.includes('Katılım'))) {
    return docType;
  }

  return 'Transkript';
}

function generateKararDurumuHtml(course) {
  if (!course) return '<p class="p-6 text-center text-slate-500">Kurs bilgisi bulunamadı.</p>';

  const docType = (course && course.documentType) ? course.documentType : 'Sertifika';

  // Yıl bilgisi
  let courseYear = 2026;
  if (course.startDate) {
    const d = new Date(course.startDate + (course.startDate.includes('T') ? '' : 'T00:00:00'));
    if (!isNaN(d.getTime())) courseYear = d.getFullYear();
  }

  const institution = getCourseInstitutionName(course);
  const courseName = course.name || course.title || 'Kurs';
  const instructor = getCourseInstructorName(course);
  const supervisor = course.supervisor || '';
  const startDateFormatted = formatShortDate(course.startDate);
  const endDateFormatted = formatShortDate(course.endDate);
  const courseDays = (course.days && course.days.length > 0) ? course.days.join(', ') : 'Pazartesi, Salı, Çarşamba, Perşembe, Cuma';
  const courseNumber = course.code || course.id || '-';

  // Kursiyerleri alfabetik sırala (Türkçe alfabe duyarlı)
  const students = [...(course.students || [])];
  students.sort((a, b) => {
    const nameA = (a.fullName || `${a.firstName || ''} ${a.lastName || ''}`).trim();
    const nameB = (b.fullName || `${b.firstName || ''} ${b.lastName || ''}`).trim();
    return nameA.localeCompare(nameB, 'tr', { sensitivity: 'base' });
  });

  const totalCount = students.length;
  let successCount = 0;
  let transcriptCount = 0;
  let failedCount = 0;

  const totalRows = Math.max(25, students.length);
  let rowsHtml = '';

  for (let i = 1; i <= totalRows; i++) {
    if (i <= students.length) {
      const s = students[i - 1];
      const dec = getStudentKararDurumu(s, course);
      if (dec === docType) successCount++;
      else if (dec === 'Transkript') transcriptCount++;
      else if (dec === 'Devamsız') failedCount++;

      rowsHtml += `
        <tr style="height: 22px;">
          <td style="border: 1px solid black; text-align: center; font-weight: bold; font-size: 8.5pt; padding: 1px 2px;">${i}</td>
          <td style="border: 1px solid black; padding: 1px 8px; font-size: 8.5pt; text-align: left; font-weight: 500;">${escapeHtml(s.fullName || `${s.firstName || ''} ${s.lastName || ''}`.trim())}</td>
          <td style="border: 1px solid black; text-align: center; font-size: 8.5pt; padding: 1px 6px;">${dec}</td>
        </tr>
      `;
    } else {
      rowsHtml += `
        <tr style="height: 22px;">
          <td style="border: 1px solid black; text-align: center; font-weight: bold; font-size: 8.5pt; padding: 1px 2px;">${i}</td>
          <td style="border: 1px solid black; padding: 1px 8px; font-size: 8.5pt;">&nbsp;</td>
          <td style="border: 1px solid black; text-align: center; font-size: 8.5pt;">&nbsp;</td>
        </tr>
      `;
    }
  }

  return `
    <div class="karar-durumu-document" style="font-family: Arial, Helvetica, sans-serif; color: #000; line-height: 1.3; width: 100%; max-width: 800px; margin: 0 auto; background: #fff; box-sizing: border-box;">
      
      <!-- Başlık (Ortalı & Kalın) -->
      <div style="text-align: center; margin-bottom: 8px;">
        <h2 style="font-size: 13pt; font-weight: bold; margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">
          ${courseYear} EĞİTİM ÖĞRETİM YILI
        </h2>
        <h2 style="font-size: 13pt; font-weight: bold; margin: 2px 0 0 0; text-transform: uppercase; letter-spacing: 0.5px;">
          KURSİYER KARAR DURUMU
        </h2>
      </div>

      <!-- Kurs Üst Bilgileri (2 Kolonlu Kompakt Tablo) -->
      <div style="margin-bottom: 8px; font-size: 8.5pt;">
        <table style="border: none; border-collapse: collapse; width: 100%; margin: 0; line-height: 1.3;">
          <tr>
            <td style="font-weight: bold; white-space: nowrap; width: 1%; padding: 1.5px 4px 1.5px 0;">Kursun Açıldığı Yer</td>
            <td style="font-weight: bold; width: 1%; padding: 1.5px 6px 1.5px 0;">:</td>
            <td style="padding: 1.5px 16px 1.5px 0;">${escapeHtml(institution)}</td>
            <td style="font-weight: bold; white-space: nowrap; width: 1%; padding: 1.5px 4px 1.5px 0;">Kurs Başlangıç / Bitiş</td>
            <td style="font-weight: bold; width: 1%; padding: 1.5px 6px 1.5px 0;">:</td>
            <td style="padding: 1.5px 0;">${startDateFormatted} - ${endDateFormatted}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; white-space: nowrap; width: 1%; padding: 1.5px 4px 1.5px 0;">Kursun Adı</td>
            <td style="font-weight: bold; width: 1%; padding: 1.5px 6px 1.5px 0;">:</td>
            <td style="padding: 1.5px 16px 1.5px 0; font-weight: 600;">${escapeHtml(courseName)}</td>
            <td style="font-weight: bold; white-space: nowrap; width: 1%; padding: 1.5px 4px 1.5px 0;">Kursun Günleri</td>
            <td style="font-weight: bold; width: 1%; padding: 1.5px 6px 1.5px 0;">:</td>
            <td style="padding: 1.5px 0;">${escapeHtml(courseDays)}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; white-space: nowrap; width: 1%; padding: 1.5px 4px 1.5px 0;">Kursun Öğretmeni</td>
            <td style="font-weight: bold; width: 1%; padding: 1.5px 6px 1.5px 0;">:</td>
            <td style="padding: 1.5px 16px 1.5px 0;">${escapeHtml(instructor)}</td>
            <td style="font-weight: bold; white-space: nowrap; width: 1%; padding: 1.5px 4px 1.5px 0;">Kurs Numarası</td>
            <td style="font-weight: bold; width: 1%; padding: 1.5px 6px 1.5px 0;">:</td>
            <td style="padding: 1.5px 0; font-family: monospace;">${escapeHtml(courseNumber)}</td>
          </tr>
        </table>
      </div>

      <!-- Tablo (Başlıklar Sadeleştirildi) -->
      <table style="width: 100%; border-collapse: collapse; border: 1.5px solid black; font-size: 8.5pt;">
        <thead>
          <tr style="border-bottom: 1.5px solid black; background: #fff; height: 24px;">
            <th style="border: 1px solid black; padding: 2px 4px; width: 45px; text-align: center; font-weight: bold; vertical-align: middle;">
              Sıra No
            </th>
            <th style="border: 1px solid black; padding: 2px 8px; text-align: center; font-weight: bold; vertical-align: middle;">
              Öğrencinin Adı Soyadı
            </th>
            <th style="border: 1px solid black; padding: 2px 8px; width: 200px; text-align: center; font-weight: bold; vertical-align: middle;">
              Karar Durumu
            </th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>

      <!-- Tablo Altı Özet Metin -->
      <div style="margin-top: 8px; font-size: 8.5pt; line-height: 1.35;">
        <p style="margin: 0; text-align: justify;">
          <strong>${escapeHtml(courseName)}</strong> Kursuna (<strong>${totalCount}</strong>) kursiyer kayıt olmuş, bu kursta (<strong>${successCount}</strong>) Kursiyer <strong>${escapeHtml(docType)}</strong>, (<strong>${transcriptCount}</strong>) Kursiyer transkript, (<strong>${failedCount}</strong>) Kursiyer başarısız olmuştur.
        </p>
      </div>

      <!-- İMZALAR (Tek Sayfada, Tablonun ve Özetin Hemen Altında) -->
      <div style="margin-top: 18px; display: flex; justify-content: space-between; align-items: flex-start; padding: 0 40px; font-size: 9pt; page-break-inside: avoid;">
        <div style="text-align: center; width: 230px;">
          <div style="font-weight: bold;">Eğitmen Ad-Soyad İmza</div>
          <div style="margin-top: 5px; font-weight: 600; color: #111;">${escapeHtml(instructor)}</div>
          <div style="margin-top: 35px; border-bottom: 1px dotted #888; width: 140px; margin-left: auto; margin-right: auto;"></div>
        </div>

        <div style="text-align: center; width: 260px;">
          <div style="font-weight: bold;">Kurs Merkezi Sorumlusu</div>
          <div style="font-weight: bold;">/ Büro Personeli Ad-Soyad İmza</div>
          <div style="margin-top: 5px; font-weight: 600; color: #111;">${escapeHtml(supervisor || '')}</div>
          <div style="margin-top: 35px; border-bottom: 1px dotted #888; width: 140px; margin-left: auto; margin-right: auto;"></div>
        </div>
      </div>

    </div>
  `;
}

function renderDocumentsTab() {
  if (!activeCourseForDetail) return;
  activeCourseForDetail.students = sortStudentsAlphabetically(activeCourseForDetail.students || []);

  const docType = (activeCourseForDetail && activeCourseForDetail.documentType) ? activeCourseForDetail.documentType : 'Sertifika';
  const students = activeCourseForDetail.students;
  const totalHours = Number(activeCourseForDetail.totalHours) || 0;
  const maxAllowed = Math.floor(totalHours / 5);

  // 1. Karar Durumu Özeti
  try {
    const statsBar = document.getElementById('kararDurumuStatsBar');
    if (statsBar) {
      let successCount = 0;
      let transcriptCount = 0;
      let failedCount = 0;

      students.forEach(s => {
        const dec = getStudentKararDurumu(s, activeCourseForDetail);
        if (dec === docType) successCount++;
        else if (dec === 'Transkript') transcriptCount++;
        else if (dec === 'Devamsız') failedCount++;
      });

      statsBar.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-3 w-full">
          <div class="flex flex-wrap items-center gap-2">
            <span class="font-bold text-slate-700 dark:text-slate-200">Karar İstatistikleri:</span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-[#152125] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#2b3e45] rounded-lg font-bold">
              <span>Toplam:</span> <strong class="text-[#335C67] dark:text-[#FFF3B0]">${students.length}</strong> Kursiyer
            </span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-lg font-bold">
              <span>${escapeHtml(docType)}:</span> <strong>${successCount}</strong>
            </span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 rounded-lg font-bold">
              <span>Transkript:</span> <strong>${transcriptCount}</strong>
            </span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800 rounded-lg font-bold">
              <span>Devamsız:</span> <strong>${failedCount}</strong>
            </span>
          </div>
          <div class="text-[11px] text-slate-400">
            ${students.length <= 25 ? 'Resmi Tek Sayfa Karar Belgesi Çıktısı' : 'Resmi Karar Belgesi Çıktısı'}
          </div>
        </div>
      `;
    }
  } catch (err) {
    console.error('Error rendering kararDurumuStatsBar:', err);
  }

  // 2. Defter Özeti
  try {
    const defterStatsBar = document.getElementById('defterStatsBar');
    if (defterStatsBar) {
      const validDates = getValidCourseDates(activeCourseForDetail);
      const dailyHours = Number(activeCourseForDetail.dailyHours) || 4;
      const daysPerPage = dailyHours <= 4 ? 6 : 3;
      const dayChunksCount = Math.ceil(validDates.length / daysPerPage) || 1;
      const totalPages = dayChunksCount + 3; // 1 Kapak + 1 Yoklama + N Defter + 1 Kapanış
      defterStatsBar.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-3 w-full">
          <div class="flex flex-wrap items-center gap-2">
            <span class="font-bold text-slate-700 dark:text-slate-200">Defter Bilgileri:</span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-[#152125] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#2b3e45] rounded-lg font-bold">
              <span>Ders Günleri:</span> <strong class="text-emerald-700 dark:text-emerald-400">${validDates.length}</strong> Gün
            </span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-[#152125] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#2b3e45] rounded-lg font-bold">
              <span>Günlük Ders:</span> <strong>${activeCourseForDetail.dailyHours || 4}</strong> Saat
            </span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-[#152125] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#2b3e45] rounded-lg font-bold">
              <span>Toplam Süre:</span> <strong>${activeCourseForDetail.totalHours || 120}</strong> Saat
            </span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-lg font-bold">
              <span>Toplam Resmi Sayfa:</span> <strong>${totalPages}</strong> Sayfa
            </span>
          </div>
          <div class="text-[11px] text-slate-400">
            Kapak, 31 Günlük Yoklama, Günlük Defter Sayfaları ve Kapanış Tutanağı
          </div>
        </div>
      `;
    }
  } catch (err) {
    console.error('Error rendering defterStatsBar:', err);
  }

  // 3. Not Çizelgesi Özeti
  try {
    const notCizelgesiStatsBar = document.getElementById('notCizelgesiStatsBar');
    if (notCizelgesiStatsBar) {
      const moduleCount = activeCourseForDetail.moduleCount ? Math.max(1, Number(activeCourseForDetail.moduleCount)) : 1;
      let docTypeCount = 0;
      let transcriptCount = 0;
      let failedCount = 0;
      let devamsizCount = 0;

      students.forEach(s => {
        const absentHours = Number(s.absentHours || 0);
        const isDevamsiz = (s.attendance === 'Devamsız') || 
                           (s.result === 'Devamsız') ||
                           (totalHours > 0 && absentHours > maxAllowed);
        if (isDevamsiz) {
          devamsizCount++;
        } else {
          let pCount = 0;
          for (let m = 1; m <= moduleCount; m++) {
            const sc = s.moduleScores ? s.moduleScores[m] : null;
            if (sc !== null && sc !== undefined && sc !== '' && !isNaN(Number(sc)) && Number(sc) >= 50) {
              pCount++;
            }
          }
          if (pCount === moduleCount) docTypeCount++;
          else if (pCount === 0) failedCount++;
          else transcriptCount++;
        }
      });

      notCizelgesiStatsBar.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-3 w-full">
          <div class="flex flex-wrap items-center gap-2">
            <span class="font-bold text-slate-700 dark:text-slate-200">Çizelge Özeti:</span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-[#152125] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#2b3e45] rounded-lg font-bold">
              <span>Toplam:</span> <strong class="text-indigo-600 dark:text-indigo-400">${students.length}</strong> Kursiyer
            </span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-lg font-bold">
              <span>${escapeHtml(docType)}:</span> <strong>${docTypeCount}</strong>
            </span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 rounded-lg font-bold">
              <span>Transkript:</span> <strong>${transcriptCount}</strong>
            </span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800 rounded-lg font-bold">
              <span>Başarısız:</span> <strong>${failedCount}</strong>
            </span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800 rounded-lg font-bold">
              <span>Devamsız:</span> <strong>${devamsizCount}</strong>
            </span>
          </div>
          <div class="text-[11px] text-slate-400">
            Resmi Not Çizelgesi • ${moduleCount} Modüllü Yatay A4 Belgesi
          </div>
        </div>
      `;
    }
  } catch (err) {
    console.error('Error rendering notCizelgesiStatsBar:', err);
  }

  // 4. Sınav Tutanağı Özeti
  try {
    const sinavTutanagiStatsBar = document.getElementById('sinavTutanagiStatsBar');
    if (sinavTutanagiStatsBar) {
      sinavTutanagiStatsBar.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-3 w-full">
          <div class="flex flex-wrap items-center gap-2">
            <span class="font-bold text-slate-700 dark:text-slate-200">Tutanak Özeti:</span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-[#152125] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#2b3e45] rounded-lg font-bold">
              <span>Toplam:</span> <strong class="text-rose-700 dark:text-rose-400">${students.length}</strong> Kursiyer
            </span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-lg font-bold">
              <span>Şablon:</span> <strong>Sadece Kurs ve Kursiyer İsimleri</strong>
            </span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-lg font-bold">
              <span>İmza & Tarih:</span> <strong>Manuel (.... ibareli)</strong>
            </span>
          </div>
          <div class="text-[11px] text-slate-400">
            ${students.length <= 25 ? 'Resmi Tek Sayfa Sınav Tutanağı' : 'Resmi Sınav Tutanağı'} • Dikey A4
          </div>
        </div>
      `;
    }
  } catch (err) {
    console.error('Error rendering sinavTutanagiStatsBar:', err);
  }

  // 5. İmza Listesi Özeti
  try {
    const imzaListesiStatsBar = document.getElementById('imzaListesiStatsBar');
    if (imzaListesiStatsBar) {
      const validDates = getValidCourseDates(activeCourseForDetail);
      const datePages = Math.max(1, Math.ceil(validDates.length / 9));
      imzaListesiStatsBar.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-3 w-full">
          <div class="flex flex-wrap items-center gap-2">
            <span class="font-bold text-slate-700 dark:text-slate-200">İmza Listesi:</span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-[#152125] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#2b3e45] rounded-lg font-bold">
              <span>Toplam:</span> <strong class="text-purple-700 dark:text-purple-400">${students.length}</strong> Kursiyer
            </span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800 rounded-lg font-bold">
              <span>Ders Günleri:</span> <strong>${validDates.length}</strong> Gün
            </span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 rounded-lg font-bold">
              <span>Sayfa:</span> <strong>${datePages}</strong> Sayfa
            </span>
          </div>
          <div class="text-[11px] text-slate-400">
            9 Günlük Sütunlar • Yatay A4
          </div>
        </div>
      `;
    }
  } catch (err) {
    console.error('Error rendering imzaListesiStatsBar:', err);
  }
}

window.openKararDurumuPreview = function() {
  if (!activeCourseForDetail) return;
  const container = document.getElementById('kararDurumuPreviewContainer');
  const modal = document.getElementById('kararDurumuModal');
  if (container) {
    container.innerHTML = generateKararDurumuHtml(activeCourseForDetail);
  }
  modal?.classList.remove('hidden');
  refreshLucide();
};

// Baskı alanını ve geçici içerikleri temizleyen yardımcı
function cleanupPrintArea() {
  try {
    const printArea = document.getElementById('printArea');
    const printAreaContent = document.getElementById('printAreaContent');
    if (printAreaContent) printAreaContent.innerHTML = '';
    if (printArea) {
      printArea.classList.add('hidden');
      printArea.style.display = 'none';
    }
    const frame = document.getElementById('securePrintIframe');
    if (frame) frame.remove();
  } catch(e) {}
}

window.closeKararDurumuPreview = function() {
  const modal = document.getElementById('kararDurumuModal');
  modal?.classList.add('hidden');
  cleanupPrintArea();
};

// Yardımcı: Kurs Numarasını (Kodunu) Güvenli Alma
function getCourseNumber(course) {
  if (!course) return '';
  const num = (course.code || course.id || '').trim();
  return num.replace(/[\\/:*?"<>|]/g, '-');
}

// Yardımcı: Belge İsmi ve Kurs No Birleştirme (örn: "Kursiyer Karar Durumu - BLG-2026-01")
function getDocumentSaveTitle(docName, course) {
  const c = course || activeCourseForDetail;
  const num = getCourseNumber(c);
  return num ? `${docName} - ${num}` : docName;
}

// Bağımsız İndirilebilir HTML Belge Şablonu Oluşturucu
function generateStandaloneDocumentHtml(title, htmlContent, isLandscape = false) {
  const pageCss = isLandscape
    ? `@page { size: A4 landscape !important; margin: 4mm 5mm !important; }`
    : `@page { size: A4 portrait !important; margin: 8mm 10mm !important; }`;

  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(title)}</title>
  <style>
    ${pageCss}
    *, *::before, *::after {
      box-sizing: border-box;
    }
    html, body {
      margin: 0 !important;
      padding: 0 !important;
      background: #ffffff !important;
      color: #000000 !important;
      font-family: Arial, Helvetica, sans-serif !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    table {
      border-collapse: collapse !important;
    }
    .print-page-break {
      page-break-before: always !important;
      break-before: page !important;
    }
    .defter-page {
      page-break-after: always !important;
      break-after: page !important;
      box-sizing: border-box !important;
    }
    .defter-page:last-child {
      page-break-after: auto !important;
      break-after: auto !important;
    }
    .not-cizelgesi-document, .karar-durumu-document, .sinav-tutanagi-document {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      page-break-after: avoid !important;
      break-after: avoid !important;
      padding: 0 !important;
      margin: 0 auto !important;
    }
    @media print {
      .no-print {
        display: none !important;
      }
    }
    @media screen {
      body {
        background-color: #f1f5f9 !important;
        padding: 24px 12px !important;
      }
      .standalone-container {
        background-color: #ffffff;
        box-shadow: 0 4px 20px rgba(0,0,0,0.12);
        margin: 0 auto;
        border-radius: 8px;
        padding: 16px;
        max-width: ${isLandscape ? '1100px' : '850px'};
      }
      .no-print-bar {
        position: sticky;
        top: 10px;
        max-width: ${isLandscape ? '1100px' : '850px'};
        margin: 0 auto 16px auto;
        background: #1e293b;
        color: #ffffff;
        padding: 12px 20px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 8px 24px rgba(0,0,0,0.25);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 13px;
        z-index: 10000;
      }
      .no-print-bar button {
        background: #0284c7;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .no-print-bar button:hover {
        background: #0369a1;
      }
    }
  </style>
</head>
<body>
  <div class="no-print-bar no-print">
    <div><strong>${escapeHtml(title)}</strong> &bull; Resmi A4 Şablonu</div>
    <button onclick="window.print()">
      Yazdır / PDF Olarak Kaydet
    </button>
  </div>
  <div class="standalone-container">
    ${htmlContent}
  </div>
</body>
</html>`;
}

// Metin / HTML Dosyası İndirme Yardımcısı
function downloadTextFile(filename, text, mimeType = 'text/html;charset=utf-8') {
  const blob = new Blob([text], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    try {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch(e) {}
  }, 300);
}

// Güvenli ve Kararlı Yazdırma Motoru (Baskı önizlemesinin boş çıkmasını %100 önler ve PDF ismini tam ayarlar)
function safePrint(htmlContent, isLandscape = false, documentTitle = 'Resmi Evrak Baskısı') {
  if (!htmlContent) {
    alert('Yazdırılacak evrak içeriği bulunamadı.');
    return;
  }

  // Baskı alanı temizleyicisi
  cleanupPrintArea();

  let styleTag = document.getElementById('landscapePrintStyle');
  if (isLandscape) {
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'landscapePrintStyle';
      document.head.appendChild(styleTag);
    }
    styleTag.innerHTML = `@page { size: A4 landscape !important; margin: 4mm 5mm !important; }`;
  } else {
    styleTag?.remove();
  }

  // Tarayıcı PDF dosya adı için sayfa başlığını ayarla
  const originalTitle = document.title;
  if (documentTitle) {
    document.title = documentTitle;
  }
  const restoreTitle = () => {
    try {
      document.title = originalTitle;
    } catch(e) {}
  };

  // 2. İzole Gizli Iframe (Tarayıcı önizleme penceresinde boş sayfa çıkmasını tamamen engeller)
  let printFrame = document.getElementById('securePrintIframe');
  if (printFrame) {
    try { printFrame.remove(); } catch(e) {}
  }

  printFrame = document.createElement('iframe');
  printFrame.id = 'securePrintIframe';
  printFrame.style.position = 'fixed';
  printFrame.style.right = '0';
  printFrame.style.bottom = '0';
  printFrame.style.width = '0';
  printFrame.style.height = '0';
  printFrame.style.border = '0';
  printFrame.style.visibility = 'hidden';
  document.body.appendChild(printFrame);

  const pageCss = isLandscape
    ? `@page { size: A4 landscape !important; margin: 4mm 5mm !important; }`
    : `@page { size: A4 portrait !important; margin: 8mm 10mm !important; }`;

  const frameDoc = printFrame.contentWindow.document;
  frameDoc.open();
  frameDoc.write(`
    <!DOCTYPE html>
    <html lang="tr">
      <head>
        <meta charset="utf-8">
        <title>${escapeHtml(documentTitle || 'Resmi Evrak Baskısı')}</title>
        <style>
          ${pageCss}
          *, *::before, *::after {
            box-sizing: border-box;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            color: #000000 !important;
            font-family: Arial, Helvetica, sans-serif !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          table {
            border-collapse: collapse !important;
          }
          .print-page-break {
            page-break-before: always !important;
            break-before: page !important;
          }
          .defter-page {
            page-break-after: always !important;
            break-after: page !important;
            box-sizing: border-box !important;
          }
          .defter-page:last-child {
            page-break-after: auto !important;
            break-after: auto !important;
          }
          .not-cizelgesi-document, .karar-durumu-document, .sinav-tutanagi-document {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
            padding: 0 !important;
            margin: 0 auto !important;
          }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
  `);
  frameDoc.close();

  const cleanupPrint = () => {
    restoreTitle();
    cleanupPrintArea();
  };

  try {
    printFrame.contentWindow.addEventListener('afterprint', cleanupPrint, { once: true });
  } catch(e) {}
  window.addEventListener('afterprint', cleanupPrint, { once: true });
  setTimeout(cleanupPrint, 6000);

  // Render tamamlandıktan sonra baskı penceresini aç
  setTimeout(() => {
    try {
      printFrame.contentWindow.focus();
      printFrame.contentWindow.print();
    } catch (err) {
      console.warn('Iframe print tetiklenemedi, varsayılan window.print çağrılıyor:', err);
      const printArea = document.getElementById('printArea');
      const printAreaContent = document.getElementById('printAreaContent');
      if (printAreaContent) printAreaContent.innerHTML = htmlContent;
      window.print();
      setTimeout(cleanupPrintArea, 500);
    }
  }, 250);
}

window.triggerPrintKararDurumu = function() {
  if (!activeCourseForDetail) return;
  const title = getDocumentSaveTitle('Kursiyer Karar Durumu', activeCourseForDetail);
  safePrint(generateKararDurumuHtml(activeCourseForDetail), false, title);
};

// =================== KURS SONU EVRAKLARINI TOPLU KAYDETME YÖNETİMİ ===================

window.openSaveAllDocumentsModal = function() {
  if (!activeCourseForDetail) {
    alert('Lütfen önce bir kurs seçiniz.');
    return;
  }
  const course = activeCourseForDetail;
  const courseNumber = getCourseNumber(course) || 'KODSUZ';
  const courseName = course.name || course.title || 'Kurs';

  const badge = document.getElementById('saveAllCourseCodeBadge');
  if (badge) badge.textContent = `Kurs No: ${courseNumber}`;

  const sub = document.getElementById('saveAllCourseSubTitle');
  if (sub) sub.innerHTML = `<strong>${escapeHtml(courseName)}</strong> &bull; Tüm resmi evraklar kendi belge isimleri ve kurs no (${escapeHtml(courseNumber)}) ile kaydedilir.`;

  const container = document.getElementById('saveAllDocumentsList');
  if (container) {
    const docs = [
      { id: 'karar', name: 'Kursiyer Karar Durumu', desc: '1. Belge &bull; Dikey A4 &bull; Resmi Başarı ve Karar Tutanağı', icon: 'file-text', color: 'text-[#335C67] dark:text-[#FFF3B0]', printFn: 'triggerPrintKararDurumu()' },
      { id: 'defter', name: 'Yoklama ve Ders Defteri', desc: '2. Belge &bull; Dikey A4 &bull; Kapak, Yoklama ve Günlük Ders Sayfaları', icon: 'book-open', color: 'text-emerald-600 dark:text-emerald-400', printFn: 'triggerPrintDefter()' },
      { id: 'not', name: 'Modül Değerlendirme Çizelgesi', desc: '3. Belge &bull; Yatay A4 &bull; Modül Sınav Notları ve Başarı Durumu', icon: 'graduation-cap', color: 'text-indigo-600 dark:text-indigo-400', printFn: 'triggerPrintNotCizelgesi()' },
      { id: 'sinav', name: 'Sınav Tutanağı', desc: '4. Belge &bull; Dikey A4 &bull; Kursiyer Sınav Katılım İmzaları', icon: 'clipboard-check', color: 'text-rose-600 dark:text-rose-400', printFn: 'triggerPrintSinavTutanagi()' },
      { id: 'imza', name: 'İmza Listesi', desc: '5. Belge &bull; Yatay A4 &bull; Günlük Ders Katılım İmza Çizelgesi', icon: 'pen-tool', color: 'text-purple-600 dark:text-purple-400', printFn: 'triggerPrintImzaListesi()' }
    ];

    container.innerHTML = docs.map(d => {
      const fileName = `${d.name} - ${courseNumber}`;
      return `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white dark:bg-[#152125] border border-slate-200 dark:border-[#23353c] rounded-xl hover:border-[#335C67] dark:hover:border-[#FFF3B0]/60 transition gap-2 shadow-2xs">
          <div class="flex items-center gap-3">
            <div class="p-2 rounded-lg bg-slate-100 dark:bg-[#10191b] ${d.color} shrink-0">
              <i data-lucide="${d.icon}" class="w-4 h-4"></i>
            </div>
            <div>
              <div class="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 flex items-center gap-1.5 flex-wrap">
                <span>${escapeHtml(fileName)}</span>
                <span class="text-[10px] px-1.5 py-0.2 bg-slate-100 dark:bg-[#10191b] text-slate-500 rounded font-mono">.pdf / .html</span>
              </div>
              <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">${d.desc}</div>
            </div>
          </div>
          <div class="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              type="button"
              onclick="${d.printFn}"
              class="flex items-center gap-1 px-3 py-1.5 bg-[#335C67] hover:bg-[#284952] text-white rounded-lg text-xs font-semibold shadow-2xs cursor-pointer transition"
              title="PDF Olarak Kaydet / Yazdır"
            >
              <i data-lucide="printer" class="w-3.5 h-3.5 text-[#FFF3B0]"></i>
              <span>PDF Kaydet</span>
            </button>
            <button
              type="button"
              onclick="downloadSingleDocument('${escapeHtml(d.name)}')"
              class="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-[#10191b] dark:hover:bg-[#19272c] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#2b3e45] rounded-lg text-xs font-semibold cursor-pointer transition"
              title="HTML Belgesi Olarak İndir"
            >
              <i data-lucide="download" class="w-3.5 h-3.5"></i>
              <span>İndir</span>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  const modal = document.getElementById('saveAllDocumentsModal');
  modal?.classList.remove('hidden');
  refreshLucide();
};

window.closeSaveAllDocumentsModal = function() {
  const modal = document.getElementById('saveAllDocumentsModal');
  modal?.classList.add('hidden');
  cleanupPrintArea();
};

window.downloadSingleDocument = function(docName) {
  if (!activeCourseForDetail) return;
  const course = activeCourseForDetail;
  const courseNumber = getCourseNumber(course) || 'KODSUZ';
  let html = '';
  let isLandscape = false;

  if (docName.includes('Karar')) {
    html = generateKararDurumuHtml(course);
    isLandscape = false;
  } else if (docName.includes('Defter') || docName.includes('Yoklama')) {
    html = generateDefterHtml(course);
    isLandscape = false;
  } else if (docName.includes('Modül') || docName.includes('Çizelge') || docName.includes('Not')) {
    html = generateNotCizelgesiHtml(course);
    isLandscape = true;
  } else if (docName.includes('Sınav') || docName.includes('Tutanak')) {
    html = generateSinavTutanagiHtml(course);
    isLandscape = false;
  } else if (docName.includes('İmza') || docName.includes('imza')) {
    html = generateImzaListesiHtml(course);
    isLandscape = true;
  } else {
    html = generateKararDurumuHtml(course);
    isLandscape = false;
  }

  const fileTitle = `${docName} - ${courseNumber}`;
  const fullHtml = generateStandaloneDocumentHtml(fileTitle, html, isLandscape);
  downloadTextFile(`${fileTitle}.html`, fullHtml, 'text/html;charset=utf-8');
  showAutoSaveToast(`"${fileTitle}" başarıyla indirildi`);
};

window.downloadAllCourseDocuments = function() {
  if (!activeCourseForDetail) return;
  const course = activeCourseForDetail;
  const courseNumber = getCourseNumber(course) || 'KODSUZ';

  const docs = [
    { name: 'Kursiyer Karar Durumu', html: generateKararDurumuHtml(course), isLandscape: false },
    { name: 'Yoklama ve Ders Defteri', html: generateDefterHtml(course), isLandscape: false },
    { name: 'Modül Değerlendirme Çizelgesi', html: generateNotCizelgesiHtml(course), isLandscape: true },
    { name: 'Sınav Tutanağı', html: generateSinavTutanagiHtml(course), isLandscape: false },
    { name: 'İmza Listesi', html: generateImzaListesiHtml(course), isLandscape: true }
  ];

  docs.forEach((d, index) => {
    setTimeout(() => {
      const fileTitle = `${d.name} - ${courseNumber}`;
      const fullHtml = generateStandaloneDocumentHtml(fileTitle, d.html, d.isLandscape);
      downloadTextFile(`${fileTitle}.html`, fullHtml, 'text/html;charset=utf-8');
    }, index * 200);
  });

  showAutoSaveToast(`5 resmi evrak "${courseNumber}" numarasıyla indiriliyor`);
};

window.printMergedAllDocuments = function() {
  if (!activeCourseForDetail) return;
  const course = activeCourseForDetail;
  const courseNumber = getCourseNumber(course) || 'KODSUZ';

  const docTitle = `Tüm Kurs Sonu Evrakları - ${courseNumber}`;
  const mergedHtml = `
    <div class="merged-all-documents">
      <!-- 1. Kursiyer Karar Durumu -->
      <div class="merged-doc-section" style="page-break-after: always; break-after: page;">
        ${generateKararDurumuHtml(course)}
      </div>

      <!-- 2. Yoklama ve Ders Defteri -->
      <div class="merged-doc-section" style="page-break-after: always; break-after: page;">
        ${generateDefterHtml(course)}
      </div>

      <!-- 3. Modül Değerlendirme Çizelgesi -->
      <div class="merged-doc-section" style="page-break-after: always; break-after: page;">
        ${generateNotCizelgesiHtml(course)}
      </div>

      <!-- 4. Sınav Tutanağı -->
      <div class="merged-doc-section" style="page-break-after: always; break-after: page;">
        ${generateSinavTutanagiHtml(course)}
      </div>

      <!-- 5. İmza Listesi -->
      <div class="merged-doc-section">
        ${generateImzaListesiHtml(course)}
      </div>
    </div>
  `;

  safePrint(mergedHtml, false, docTitle);
};

// =================== RESMİ EVRAK 2: YOKLAMA VE DERS DEFTERİ ===================

function formatDayMonth(dateStr) {
  if (!dateStr) return '';
  try {
    const clean = String(dateStr).split('T')[0];
    const p = clean.split('-');
    if (p.length === 3) {
      return `${p[2]}/${p[1]}/${p[0]}`;
    }
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  } catch {
    return dateStr;
  }
}

function generateDefterHtml(course) {
  if (!course) return '<p class="p-6 text-center text-slate-500">Kurs bilgisi bulunamadı.</p>';

  const institution = getCourseInstitutionName(course) || 'Halk Eğitimi Merkezi Müdürlüğü';
  const courseName = course.name || course.title || 'Kurs';
  const instructor = getCourseInstructorName(course);
  const startDate = formatShortDate(course.startDate);
  const endDate = formatShortDate(course.endDate);
  const courseNumber = course.code || course.id || '-';
  const totalHours = Number(course.totalHours) || 120;
  const dailyHours = Number(course.dailyHours) || 4;
  const validDates = getValidCourseDates(course);
  const syllabus = course.syllabus || [];
  const courseDays = (course.days && course.days.length > 0)
    ? course.days.join(', ')
    : 'Pazartesi, Salı, Çarşamba, Perşembe, Cuma';
  const courseTimeText = (course.startTime && course.endTime)
    ? `${course.startTime} - ${course.endTime}`
    : 'Belirtilmedi';

  // Kursiyerleri alfabetik sırala (Türkçe alfabe duyarlı)
  const sortedStudents = [...(course.students || [])].sort((a, b) => {
    const nameA = (a.fullName || `${a.firstName || ''} ${a.lastName || ''}`).trim();
    const nameB = (b.fullName || `${b.firstName || ''} ${b.lastName || ''}`).trim();
    return nameA.localeCompare(nameB, 'tr', { sensitivity: 'base' });
  });

  // 31 günlük yoklama sütunları mantığı (31 günden uzun kurslarda çoklu sayfa yoklama basılır)
  const maxDayCols = 31;
  const totalAttPages = Math.max(1, Math.ceil(validDates.length / maxDayCols));
  let allAttendancePagesHtml = '';

  for (let attPageIdx = 0; attPageIdx < totalAttPages; attPageIdx++) {
    const attendanceDates = validDates.slice(attPageIdx * maxDayCols, (attPageIdx + 1) * maxDayCols);
    const pageSubtitle = totalAttPages > 1 ? ` (${attPageIdx + 1}. BÖLÜM / ${totalAttPages})` : '';

    // Yoklama Tablosu Sütun Başlıkları (1..31)
    let attHeadersNumbersHtml = '';
    let attHeadersDatesHtml = '';

    for (let c = 1; c <= maxDayCols; c++) {
      const globalDayNum = (attPageIdx * maxDayCols) + c;
      attHeadersNumbersHtml += `<th style="border: 1px solid black; padding: 2px 1px; width: 18px; font-size: 7.5pt; text-align: center; font-weight: bold;">${globalDayNum}</th>`;
      const dateFormatted = c <= attendanceDates.length ? formatDayMonth(attendanceDates[c - 1]) : '.../.../20..';
      attHeadersDatesHtml += `<th style="border: 1px solid black; padding: 2px 1px; font-size: 5.5pt; text-align: center; font-weight: normal; writing-mode: vertical-lr; transform: rotate(180deg); height: 56px; white-space: nowrap;">${dateFormatted}</th>`;
    }

    // Yoklama Tablosu Kursiyer Satırları (En az 40 satır - resmi şablon standardı)
    const maxAttRows = Math.max(40, sortedStudents.length);
    let attRowsHtml = '';

    // Günlük gelen/gelmeyen toplamları sayacı
    const dayAttendedCount = new Array(maxDayCols).fill(0);
    const dayAbsentCount = new Array(maxDayCols).fill(0);

    for (let r = 1; r <= maxAttRows; r++) {
      if (r <= sortedStudents.length) {
        const s = sortedStudents[r - 1];
        const sFullName = (s.fullName || `${s.firstName || ''} ${s.lastName || ''}`).trim();
        const absences = s.dailyAbsences || [];

        let totalAbsentHours = absences.reduce((sum, d) => sum + Number(d.hours || 0), 0);
        let totalAttendedHours = Math.max(0, totalHours - totalAbsentHours);

        let dayCells = '';
        for (let c = 1; c <= maxDayCols; c++) {
          if (c <= attendanceDates.length) {
            const dStr = attendanceDates[c - 1];
            const absRecord = absences.find(d => d.date === dStr);
            const absHours = absRecord ? Number(absRecord.hours || 0) : 0;

            if (absHours > 0) {
              dayCells += `<td style="border: 1px solid black; text-align: center; font-size: 8pt; font-weight: bold; color: #b91c1c; padding: 1px;">${absHours}</td>`;
              dayAbsentCount[c - 1]++;
            } else {
              dayCells += `<td style="border: 1px solid black; text-align: center; font-size: 11pt; font-weight: bold; line-height: 1; padding: 0;">•</td>`;
              dayAttendedCount[c - 1]++;
            }
          } else {
            dayCells += `<td style="border: 1px solid black; padding: 0;">&nbsp;</td>`;
          }
        }

        attRowsHtml += `
          <tr style="height: 18px;">
            <td style="border: 1px solid black; text-align: center; font-size: 7.5pt; font-weight: bold; padding: 1px;">${r}</td>
            <td style="border: 1px solid black; padding: 1px 4px; font-size: 7.5pt; text-align: left; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 140px;">${escapeHtml(sFullName)}</td>
            ${dayCells}
            <td style="border: 1px solid black; text-align: center; font-size: 7.5pt; font-weight: bold; padding: 1px;">${totalAttendedHours}</td>
            <td style="border: 1px solid black; text-align: center; font-size: 7.5pt; font-weight: bold; padding: 1px; color: ${totalAbsentHours > 0 ? '#b91c1c' : '#000'};">${totalAbsentHours}</td>
          </tr>
        `;
      } else {
        let emptyCells = '';
        for (let c = 1; c <= maxDayCols; c++) {
          emptyCells += `<td style="border: 1px solid black; padding: 0;">&nbsp;</td>`;
        }
        attRowsHtml += `
          <tr style="height: 18px;">
            <td style="border: 1px solid black; text-align: center; font-size: 7.5pt; font-weight: bold; padding: 1px;">${r}</td>
            <td style="border: 1px solid black; padding: 1px 4px; font-size: 7.5pt;">&nbsp;</td>
            ${emptyCells}
            <td style="border: 1px solid black; padding: 0;">&nbsp;</td>
            <td style="border: 1px solid black; padding: 0;">&nbsp;</td>
          </tr>
        `;
      }
    }

    // Alt toplam satırları
    let gelenCells = '';
    let gelmeyenCells = '';
    let toplamCells = '';

    for (let c = 1; c <= maxDayCols; c++) {
      if (c <= attendanceDates.length) {
        gelenCells += `<td style="border: 1px solid black; text-align: center; font-size: 7pt; font-weight: bold; padding: 1px;">${dayAttendedCount[c - 1]}</td>`;
        gelmeyenCells += `<td style="border: 1px solid black; text-align: center; font-size: 7pt; font-weight: bold; padding: 1px;">${dayAbsentCount[c - 1]}</td>`;
        toplamCells += `<td style="border: 1px solid black; text-align: center; font-size: 7pt; font-weight: bold; padding: 1px;">${sortedStudents.length}</td>`;
      } else {
        gelenCells += `<td style="border: 1px solid black; padding: 0;">&nbsp;</td>`;
        gelmeyenCells += `<td style="border: 1px solid black; padding: 0;">&nbsp;</td>`;
        toplamCells += `<td style="border: 1px solid black; padding: 0;">&nbsp;</td>`;
      }
    }

    allAttendancePagesHtml += `
      <div class="defter-page" style="min-height: 980px; padding: 25px 20px; box-sizing: border-box; background: #fff; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="text-align: center; margin-bottom: 10px;">
            <div style="font-weight: bold; font-size: 10.5pt; text-transform: uppercase;">${escapeHtml(institution)}</div>
            <div style="font-weight: bold; font-size: 11pt; text-transform: uppercase; margin-top: 2px;">
              ${escapeHtml(courseName)} KURSU SINIF YOKLAMA LİSTESİ${pageSubtitle}
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 8.5pt; font-weight: bold; margin-bottom: 6px;">
            <div>KURS ONAY NO: ${escapeHtml(courseNumber)}</div>
            <div>Dönem / Günler: ${startDate} - ${endDate} (${escapeHtml(courseDays)})</div>
          </div>

          <table style="width: 100%; border-collapse: collapse; border: 1.5px solid black; font-size: 7pt;">
            <thead>
              <tr style="background: #fafafa;">
                <th rowspan="2" style="border: 1px solid black; width: 22px; text-align: center; font-weight: bold;">Sıra</th>
                <th rowspan="2" style="border: 1px solid black; width: 140px; text-align: center; font-weight: bold;">KURSİYERİN<br>Adı ve Soyadı</th>
                ${attHeadersNumbersHtml}
                <th rowspan="2" style="border: 1px solid black; width: 36px; text-align: center; font-size: 6.5pt; font-weight: bold;">Geldiği<br>Saat</th>
                <th rowspan="2" style="border: 1px solid black; width: 38px; text-align: center; font-size: 6.5pt; font-weight: bold;">Gelmediği<br>Saat</th>
              </tr>
              <tr style="background: #fff;">
                ${attHeadersDatesHtml}
              </tr>
            </thead>
            <tbody>
              ${attRowsHtml}
              <tr style="background: #fafafa; font-weight: bold;">
                <td colspan="2" style="border: 1px solid black; padding: 1px 4px; font-size: 7.5pt; text-align: right;">GELEN</td>
                ${gelenCells}
                <td colspan="2" style="border: 1px solid black;">&nbsp;</td>
              </tr>
              <tr style="background: #fafafa; font-weight: bold;">
                <td colspan="2" style="border: 1px solid black; padding: 1px 4px; font-size: 7.5pt; text-align: right; color: #b91c1c;">GELMEYEN</td>
                ${gelmeyenCells}
                <td colspan="2" style="border: 1px solid black;">&nbsp;</td>
              </tr>
              <tr style="background: #f0f0f0; font-weight: bold;">
                <td colspan="2" style="border: 1px solid black; padding: 1px 4px; font-size: 7.5pt; text-align: right;">TOPLAM</td>
                ${toplamCells}
                <td colspan="2" style="border: 1px solid black;">&nbsp;</td>
              </tr>
            </tbody>
          </table>

          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 8pt; margin-top: 8px;">
            <div style="font-weight: bold;">
              SINIF MEVCUDU: Kız: ...... Erkek: ...... Toplam: ${sortedStudents.length}
            </div>
            <div style="font-style: italic; color: #333;">
              Açıklama: Gelen: <strong>•</strong> (Nokta) &nbsp;|&nbsp; Gelmeyen: <strong>Kaç ders gelmediği saat olarak yazılır</strong>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Günlük Ders Defteri Sayfaları
  // Kural: Eğer bir günde 4 ve 4'ten az saat ders işlenmiş ise (dailyHours <= 4), sütun ikiye bölünür
  // ve yarıdan sonra başka gün eklenir (bir sayfada 3 sütun x 2 = 6 gün yer alır).
  // 4 saatten fazla ise (dailyHours > 4), sütun bölünmez ve bir güne tam sütun ayrılır (sayfada 3 gün).
  const isSplitColumn = (dailyHours <= 4);
  const daysPerCol = isSplitColumn ? 2 : 1;
  const daysPerPage = 3 * daysPerCol;

  const dayChunks = [];
  for (let i = 0; i < validDates.length; i += daysPerPage) {
    dayChunks.push(validDates.slice(i, i + daysPerPage));
  }
  if (dayChunks.length === 0) {
    dayChunks.push([new Date().toISOString().split('T')[0]]);
  }

  const totalDefterPages = dayChunks.length;
  const overallDefterBookPages = 1 + totalAttPages + totalDefterPages + 1; // 1 Kapak + N Yoklama + N Defter + 1 Kapanış

  function buildDaySlotHtml(dStr, globalDayIndex, isHalfSlot, isTopSlot) {
    if (dStr) {
      const dFormatted = formatShortDate(dStr);
      let hourBlocksHtml = '';

      for (let h = 1; h <= dailyHours; h++) {
        const overallHour = (globalDayIndex * dailyHours) + h;
        if (overallHour <= totalHours) {
          const syllabusItem = syllabus.find(s => Number(s.hour) === overallHour);
          const topicText = syllabusItem?.topic || `${courseName} Uygulamaları ve Değerlendirme`;

          hourBlocksHtml += `
            <div style="border-bottom: 1px solid black; padding: ${isHalfSlot ? '3px 5px' : '4px 6px'}; min-height: ${isHalfSlot ? '38px' : '48px'}; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box;">
              <div style="font-size: ${isHalfSlot ? '7.5pt' : '8pt'}; line-height: 1.25;">
                <strong>${h}. Ders:</strong> ${escapeHtml(topicText)}
              </div>
              <div style="font-size: 6.5pt; text-align: right; color: #555; margin-top: 2px;">
                Öğretmenin İmzası: ....................
              </div>
            </div>
          `;
        } else {
          hourBlocksHtml += `
            <div style="border-bottom: 1px solid black; padding: ${isHalfSlot ? '3px 5px' : '4px 6px'}; min-height: ${isHalfSlot ? '38px' : '48px'}; box-sizing: border-box;">
              &nbsp;
            </div>
          `;
        }
      }

      return `
        <div style="display: flex; flex-direction: column; justify-content: space-between; ${isHalfSlot ? 'height: 50%; box-sizing: border-box;' + (isTopSlot ? ' border-bottom: 2px solid black;' : '') : 'height: 100%; box-sizing: border-box;'}">
          <div>
            <div style="border-bottom: 1.5px solid black; padding: ${isHalfSlot ? '3px 4px' : '5px'}; text-align: center; font-weight: bold; font-size: ${isHalfSlot ? '8.5pt' : '9pt'}; background: #fdfdfd;">
              Tarih: ${dFormatted}
            </div>
            <div style="padding: 2px 4px; font-weight: bold; font-size: ${isHalfSlot ? '7.5pt' : '8pt'}; border-bottom: 1px solid black; background: #fafafa;">
              İşlenen Konu
            </div>
            ${hourBlocksHtml}
          </div>
          <div style="border-top: 1px solid black; text-align: center; font-weight: bold; font-size: ${isHalfSlot ? '7.5pt' : '8pt'}; padding: ${isHalfSlot ? '3px' : '4px'}; background: #f9f9f9;">
            Kontrol Eden
          </div>
        </div>
      `;
    } else {
      // Boş gün alanı
      return `
        <div style="display: flex; flex-direction: column; justify-content: space-between; ${isHalfSlot ? 'height: 50%; box-sizing: border-box;' + (isTopSlot ? ' border-bottom: 2px solid black;' : '') : 'height: 100%; box-sizing: border-box;'}">
          <div>
            <div style="border-bottom: 1.5px solid black; padding: ${isHalfSlot ? '3px 4px' : '5px'}; text-align: center; font-weight: bold; font-size: ${isHalfSlot ? '8.5pt' : '9pt'}; background: #fdfdfd;">
              Tarih: ....../....../20...
            </div>
            <div style="padding: 2px 4px; font-weight: bold; font-size: ${isHalfSlot ? '7.5pt' : '8pt'}; border-bottom: 1px solid black; background: #fafafa;">
              İşlenen Konu
            </div>
            <div style="min-height: ${isHalfSlot ? '150px' : '250px'};"></div>
          </div>
          <div style="border-top: 1px solid black; text-align: center; font-weight: bold; font-size: ${isHalfSlot ? '7.5pt' : '8pt'}; padding: ${isHalfSlot ? '3px' : '4px'}; background: #f9f9f9;">
            Kontrol Eden
          </div>
        </div>
      `;
    }
  }

  let defterPagesHtml = '';

  dayChunks.forEach((chunk, chunkIdx) => {
    let colsHtml = '';

    for (let cIdx = 0; cIdx < 3; cIdx++) {
      if (isSplitColumn) {
        const topDayIndex = (cIdx * 2);
        const topDStr = topDayIndex < chunk.length ? chunk[topDayIndex] : null;
        const topGlobalIdx = (chunkIdx * daysPerPage) + topDayIndex;
        const topHtml = buildDaySlotHtml(topDStr, topGlobalIdx, true, true);

        const btmDayIndex = (cIdx * 2) + 1;
        const btmDStr = btmDayIndex < chunk.length ? chunk[btmDayIndex] : null;
        const btmGlobalIdx = (chunkIdx * daysPerPage) + btmDayIndex;
        const btmHtml = buildDaySlotHtml(btmDStr, btmGlobalIdx, true, false);

        colsHtml += `
          <div style="border: 1px solid black; width: 33.33%; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box;">
            ${topHtml}
            ${btmHtml}
          </div>
        `;
      } else {
        const dIndex = cIdx;
        const dStr = dIndex < chunk.length ? chunk[dIndex] : null;
        const globalIdx = (chunkIdx * daysPerPage) + dIndex;
        const colHtml = buildDaySlotHtml(dStr, globalIdx, false, false);

        colsHtml += `
          <div style="border: 1px solid black; width: 33.33%; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box;">
            ${colHtml}
          </div>
        `;
      }
    }

    defterPagesHtml += `
      <div class="defter-page" style="background: #fff; padding: 25px 30px; box-sizing: border-box; min-height: 980px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="text-align: center; margin-bottom: 8px;">
            <h2 style="font-size: 13pt; font-weight: bold; margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">GÜNLÜK DERS DEFTERİ</h2>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 9pt; font-weight: 500; margin-bottom: 10px; border-bottom: 1px solid #000; padding-bottom: 4px;">
            <div><strong>Kursun Adı:</strong> ${escapeHtml(courseName)}</div>
            <div><strong>Sayfa No:</strong> ${chunkIdx + 1} / ${totalDefterPages}</div>
          </div>
          <div style="display: flex; gap: 0; width: 100%; border-collapse: collapse; min-height: 820px;">
            ${colsHtml}
          </div>
        </div>
      </div>
    `;
  });

  return `
    <div class="defter-full-document" style="font-family: Arial, Helvetica, sans-serif; color: #000; line-height: 1.3; width: 100%; max-width: 900px; margin: 0 auto; background: #fff;">
      
      <!-- SAYFA 1: KAPAK SAYFASI -->
      <div class="defter-page defter-cover-page" style="min-height: 980px; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 40px; box-sizing: border-box; background: #fff;">
        <h1 style="font-size: 24pt; font-weight: bold; text-align: center; margin-bottom: 50px; letter-spacing: 1.5px; color: #000;">
          YOKLAMA ve DERS DEFTERİ
        </h1>
        
        <div style="border: 2px solid black; padding: 30px 40px; width: 100%; max-width: 600px; box-sizing: border-box; font-size: 11pt; line-height: 2.2;">
          <table style="width: 100%; border-collapse: collapse; border: none;">
            <tr>
              <td style="width: 220px; font-weight: bold; font-style: italic;">Kursun Adı</td>
              <td style="width: 20px; font-weight: bold;">:</td>
              <td style="border-bottom: 1px dotted #888; font-weight: 600;">${escapeHtml(courseName)}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; font-style: italic;">Kursun Başlama Tarihi</td>
              <td style="font-weight: bold;">:</td>
              <td style="border-bottom: 1px dotted #888;">${startDate}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; font-style: italic;">Kursun Bitiş Tarihi</td>
              <td style="font-weight: bold;">:</td>
              <td style="border-bottom: 1px dotted #888;">${endDate}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; font-style: italic;">Kurs Günleri</td>
              <td style="font-weight: bold;">:</td>
              <td style="border-bottom: 1px dotted #888;">${escapeHtml(courseDays)}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; font-style: italic;">Ders Saatleri</td>
              <td style="font-weight: bold;">:</td>
              <td style="border-bottom: 1px dotted #888;">${escapeHtml(courseTimeText)} (${dailyHours} Saat/Gün)</td>
            </tr>
            <tr>
              <td style="font-weight: bold; font-style: italic;">Toplam Kurs Süresi</td>
              <td style="font-weight: bold;">:</td>
              <td style="border-bottom: 1px dotted #888;">${totalHours} Saat</td>
            </tr>
            <tr>
              <td style="font-weight: bold; font-style: italic;">Öğretmenin Adı</td>
              <td style="font-weight: bold;">:</td>
              <td style="border-bottom: 1px dotted #888; font-weight: 600;">${escapeHtml(instructor)}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; font-style: italic;">Kurs No</td>
              <td style="font-weight: bold;">:</td>
              <td style="border-bottom: 1px dotted #888; font-family: monospace;">${escapeHtml(courseNumber)}</td>
            </tr>
          </table>
        </div>
      </div>

      <!-- KURS SINIF YOKLAMA LİSTESİ (Çoklu sayfa destekli) -->
      ${allAttendancePagesHtml}

      <!-- SAYFA 3+: GÜNLÜK DERS DEFTERİ SAYFALARI -->
      ${defterPagesHtml}

      <!-- SAYFA SONU: KAPANIŞ VE ONAY SAYFASI -->
      <div class="defter-page defter-close-page" style="min-height: 980px; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 40px; box-sizing: border-box; background: #fff; text-align: center;">
        <div style="font-size: 13pt; font-style: italic; margin-bottom: 45px; line-height: 1.8;">
          İş bu ders ve yoklama defteri <strong style="border-bottom: 1.5px dotted black; padding: 0 16px; font-size: 14pt;">${overallDefterBookPages}</strong> sayfadan ibarettir.
        </div>
        
        <div style="font-size: 12pt; margin-bottom: 30px; font-weight: 500;">
          ${endDate}
        </div>
        
        <div style="font-size: 13pt; font-weight: bold; text-transform: uppercase;">
          ${escapeHtml(institution)}
        </div>
      </div>

    </div>
  `;
}

window.openDefterPreview = function() {
  if (!activeCourseForDetail) return;
  const container = document.getElementById('defterPreviewContainer');
  const modal = document.getElementById('defterModal');
  if (container) {
    container.innerHTML = generateDefterHtml(activeCourseForDetail);
  }
  modal?.classList.remove('hidden');
  refreshLucide();
};

window.closeDefterPreview = function() {
  const modal = document.getElementById('defterModal');
  modal?.classList.add('hidden');
  cleanupPrintArea();
};

window.triggerPrintDefter = function() {
  if (!activeCourseForDetail) return;
  const title = getDocumentSaveTitle('Yoklama ve Ders Defteri', activeCourseForDetail);
  safePrint(generateDefterHtml(activeCourseForDetail), false, title);
};

window.triggerPrintDocument = function(documentName) {
  if (documentName && (documentName.includes('Defter') || documentName.includes('Yoklama'))) {
    triggerPrintDefter();
  } else if (documentName && (documentName.includes('Not') || documentName.includes('Çizelge') || documentName.includes('Modül'))) {
    triggerPrintNotCizelgesi();
  } else if (documentName && (documentName.includes('Sınav') || documentName.includes('Tutanak') || documentName.includes('Katılım'))) {
    triggerPrintSinavTutanagi();
  } else if (documentName && (documentName.includes('İmza') || documentName.includes('imza'))) {
    triggerPrintImzaListesi();
  } else if (documentName && (documentName.includes('Plan') || documentName.includes('Konu'))) {
    triggerPrintDefter();
  } else {
    triggerPrintKararDurumu();
  }
};

// =================== RESMİ EVRAK 3: MODÜL DEĞERLENDİRME ÇİZELGESİ (NOT ÇİZELGESİ) ===================

function generateNotCizelgesiHtml(course) {
  if (!course) return '<p class="p-6 text-center text-slate-500">Kurs bilgisi bulunamadı.</p>';

  const institution = getCourseInstitutionName(course);
  const courseName = course.name || course.title || 'Kurs';
  const instructor = getCourseInstructorName(course);
  const courseNumber = course.code || course.id || '-';
  const classroom = course.classroom || institution;
  const moduleCount = course.moduleCount ? Math.max(1, Number(course.moduleCount)) : 1;
  const docType = (course && course.documentType) ? course.documentType : 'Sertifika';
  const totalHours = Number(course.totalHours) || 0;
  const maxAllowed = Math.floor(totalHours / 5);
  const startDate = formatShortDate(course.startDate);
  const endDate = formatShortDate(course.endDate);

  // Kursiyerleri alfabetik sırala (Türkçe alfabe duyarlı)
  const sortedStudents = [...(course.students || [])].sort((a, b) => {
    const nameA = (a.fullName || `${a.firstName || ''} ${a.lastName || ''}`).trim();
    const nameB = (b.fullName || `${b.firstName || ''} ${b.lastName || ''}`).trim();
    return nameA.localeCompare(nameB, 'tr', { sensitivity: 'base' });
  });

  // Sayfaya tek parça halinde tam sığacak satır sayısı (Varsayılan 25 satır, öğrenci fazlaysa öğrenci sayısı kadar)
  const totalRows = Math.max(25, sortedStudents.length);
  const maxModules = 20;

  // Sayfaya tek parça halinde tam sığması için optimize edilmiş satır yüksekliği ve yazı boyutu
  let rowHeight = '19px';
  let rowFontSize = '7.5pt';
  let nameMaxWidth = '175px';

  if (totalRows > 32) {
    rowHeight = '12px';
    rowFontSize = '5.5pt';
    nameMaxWidth = '145px';
  } else if (totalRows > 28) {
    rowHeight = '14.5px';
    rowFontSize = '6pt';
    nameMaxWidth = '155px';
  } else if (totalRows > 25) {
    rowHeight = '16.5px';
    rowFontSize = '6.8pt';
    nameMaxWidth = '165px';
  }

  // Header 20 Modül Sütunları (Yatay ve son derece kompakt: sadece modül numaraları 1, 2, 3...)
  let moduleHeadersHtml = '';
  for (let m = 1; m <= maxModules; m++) {
    moduleHeadersHtml += `
      <th style="border: 1px solid black; width: 28px; height: 18px; padding: 1px 0; font-size: 7pt; text-align: center; font-weight: bold; background: #fff;">
        ${m}
      </th>
    `;
  }

  // Satırlar
  let rowsHtml = '';
  for (let i = 1; i <= totalRows; i++) {
    if (i <= sortedStudents.length) {
      const s = sortedStudents[i - 1];
      const sFullName = (s.fullName || `${s.firstName || ''} ${s.lastName || ''}`).trim();
      const absentHours = Number(s.absentHours || 0);
      const isDevamsiz = (s.attendance === 'Devamsız') || 
                         (s.result === 'Devamsız') ||
                         (totalHours > 0 && absentHours > maxAllowed);
      const modScores = s.moduleScores || {};

      let passedCount = 0;
      let failedCount = 0;
      let moduleCellsHtml = '';

      for (let m = 1; m <= maxModules; m++) {
        if (m <= moduleCount) {
          if (isDevamsiz) {
            failedCount++;
            moduleCellsHtml += `
              <td style="border: 1px solid black; text-align: center; vertical-align: middle; font-size: ${rowFontSize}; font-weight: bold; color: #b91c1c; padding: 0 1px; height: ${rowHeight};">
                D
              </td>
            `;
          } else {
            const sc = modScores[m];
            if (sc !== null && sc !== undefined && sc !== '' && !isNaN(Number(sc))) {
              const numSc = Number(sc);
              if (numSc >= 50) {
                passedCount++;
              } else {
                failedCount++;
              }
              moduleCellsHtml += `
                <td style="border: 1px solid black; text-align: center; vertical-align: middle; font-size: ${rowFontSize}; font-weight: 600; padding: 0 1px; height: ${rowHeight};">
                  ${numSc}
                </td>
              `;
            } else {
              // Devam ettiği halde sınava girmediyse 'G'
              failedCount++;
              moduleCellsHtml += `
                <td style="border: 1px solid black; text-align: center; vertical-align: middle; font-size: ${rowFontSize}; font-weight: bold; color: #b45309; padding: 0 1px; height: ${rowHeight};">
                  G
                </td>
              `;
            }
          }
        } else {
          // Boş kalacak olan modüllerin not hücrelerinde ortada '-' işareti yer alır
          moduleCellsHtml += `
            <td style="border: 1px solid black; text-align: center; vertical-align: middle; font-size: ${rowFontSize}; font-weight: bold; color: #334155; padding: 0 1px; height: ${rowHeight}; line-height: 1;">
              -
            </td>
          `;
        }
      }

      let sonucText = '';
      let sonucColor = '';

      if (isDevamsiz) {
        sonucText = 'Devamsız';
        sonucColor = '#b91c1c';
      } else if (passedCount === moduleCount) {
        sonucText = docType;
        sonucColor = '#15803d';
      } else if (passedCount === 0) {
        sonucText = 'Başarısız';
        sonucColor = '#b91c1c';
      } else {
        sonucText = 'Transkript';
        sonucColor = '#b45309';
      }

      rowsHtml += `
        <tr style="height: ${rowHeight};" class="not-cizelgesi-row">
          <td style="border: 1px solid black; text-align: center; vertical-align: middle; font-size: ${rowFontSize}; font-weight: bold; padding: 1px 1px;">${i}</td>
          <td style="border: 1px solid black; vertical-align: middle; padding: 1px 6px; font-size: ${rowFontSize}; font-weight: 500; text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: ${nameMaxWidth};">${escapeHtml(sFullName)}</td>
          ${moduleCellsHtml}
          <td style="border: 1px solid black; text-align: center; vertical-align: middle; font-size: ${rowFontSize}; font-weight: bold; color: ${sonucColor}; padding: 1px 2px; white-space: nowrap;">
            ${sonucText}
          </td>
        </tr>
      `;
    } else {
      // Boş satırlar
      let emptyCellsHtml = '';
      for (let m = 1; m <= maxModules; m++) {
        if (m <= moduleCount) {
          emptyCellsHtml += `<td style="border: 1px solid black; vertical-align: middle; padding: 0; height: ${rowHeight};">&nbsp;</td>`;
        } else {
          emptyCellsHtml += `
            <td style="border: 1px solid black; text-align: center; vertical-align: middle; font-size: ${rowFontSize}; font-weight: bold; color: #94a3b8; padding: 0 1px; height: ${rowHeight}; line-height: 1;">
              -
            </td>
          `;
        }
      }

      rowsHtml += `
        <tr style="height: ${rowHeight};" class="not-cizelgesi-row">
          <td style="border: 1px solid black; text-align: center; vertical-align: middle; font-size: ${rowFontSize}; font-weight: bold; padding: 1px 1px;">${i}</td>
          <td style="border: 1px solid black; vertical-align: middle; padding: 1px 6px; height: ${rowHeight};">&nbsp;</td>
          ${emptyCellsHtml}
          <td style="border: 1px solid black; vertical-align: middle; padding: 1px 2px; height: ${rowHeight};">&nbsp;</td>
        </tr>
      `;
    }
  }

  return `
    <div class="not-cizelgesi-document" style="font-family: Arial, Helvetica, sans-serif; color: #000; line-height: 1.15; width: 100%; max-width: 1040px; margin: 0 auto; background: #fff; padding: 4px 6px; box-sizing: border-box; page-break-inside: avoid; break-inside: avoid; page-break-after: avoid; break-after: avoid;">
      
      <!-- BAŞLIK -->
      <div style="text-align: center; margin-bottom: 3px;">
        <div style="font-size: 8.5pt; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; color: #111;">
          ${escapeHtml(institution)}
        </div>
        <div style="font-size: 9.5pt; font-weight: bold; margin-top: 1px; text-transform: uppercase; letter-spacing: 0.5px; color: #000;">
          MODÜL DEĞERLENDİRME ÇİZELGESİ
        </div>
      </div>

      <!-- KURS BİLGİLERİ (2 SATIR KOMPAKT) -->
      <div style="margin-bottom: 3px; font-size: 7.5pt; line-height: 1.25;">
        <table style="width: 100%; border-collapse: collapse; border: none;">
          <tr>
            <td style="font-weight: bold; width: 65px; padding: 0.5px 0;">Kurs Adı</td>
            <td style="font-weight: bold; width: 8px; padding: 0.5px 0;">:</td>
            <td style="font-weight: 600; padding: 0.5px 8px 0.5px 0;">${escapeHtml(courseName)}</td>
            <td style="font-weight: bold; width: 75px; padding: 0.5px 0;">Modül Sayısı</td>
            <td style="font-weight: bold; width: 8px; padding: 0.5px 0;">:</td>
            <td style="font-weight: bold; width: 50px; padding: 0.5px 8px 0.5px 0;">${moduleCount}</td>
            <td style="font-weight: bold; width: 85px; padding: 0.5px 0;">Başlama Tarihi</td>
            <td style="font-weight: bold; width: 8px; padding: 0.5px 0;">:</td>
            <td style="padding: 0.5px 0; width: 75px;">${startDate}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; padding: 0.5px 0;">Kurs No</td>
            <td style="font-weight: bold; padding: 0.5px 0;">:</td>
            <td style="font-family: monospace; padding: 0.5px 8px 0.5px 0;">${escapeHtml(courseNumber)}</td>
            <td style="font-weight: bold; padding: 0.5px 0;">Düzenlendiği Yer</td>
            <td style="font-weight: bold; padding: 0.5px 0;">:</td>
            <td style="padding: 0.5px 8px 0.5px 0;">${escapeHtml(classroom)}</td>
            <td style="font-weight: bold; padding: 0.5px 0;">Bitiş Tarihi</td>
            <td style="font-weight: bold; padding: 0.5px 0;">:</td>
            <td style="padding: 0.5px 0;">${endDate}</td>
          </tr>
        </table>
      </div>

      <!-- NOT ÇİZELGESİ ANA TABLOSU -->
      <table style="width: 100%; border-collapse: collapse; border: 1.5px solid black; font-size: 7pt; page-break-inside: avoid; break-inside: avoid;">
        <thead>
          <tr style="background: #fafafa; height: 18px;">
            <th rowspan="2" style="border: 1px solid black; width: 26px; text-align: center; font-weight: bold; font-size: 7pt; padding: 1px;">
              No
            </th>
            <th rowspan="2" style="border: 1px solid black; width: 170px; min-width: 140px; text-align: center; font-weight: bold; font-size: 7.5pt; padding: 1px 4px; background: #fafafa;">
              Kursiyerin Adı Soyadı
            </th>
            <th colspan="${maxModules}" style="border: 1px solid black; text-align: center; font-weight: bold; font-size: 7.5pt; padding: 1px 2px; letter-spacing: 0.3px; background: #fafafa;">
              MODÜL DEĞERLENDİRME NOTLARI (Teorik / Pratik)
            </th>
            <th rowspan="2" style="border: 1px solid black; width: 72px; text-align: center; font-weight: bold; font-size: 7pt; padding: 1px 2px; background: #fafafa;">
              SONUÇ
            </th>
          </tr>
          <tr style="background: #fff; height: 17px;">
            ${moduleHeadersHtml}
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>

      <!-- ALT AÇIKLAMA NOTLARI VE İMZA -->
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 4px; font-size: 6pt; line-height: 1.2; page-break-inside: avoid; break-inside: avoid;">
        
        <!-- Notlar -->
        <div style="max-width: 72%;">
          <div style="font-weight: bold; margin-bottom: 1px;">NOTLAR:</div>
          <div>1- Modüller, teorik ve uygulamalı içeriği kapsadığından tek değerlendirme yapılır.</div>
          <div>2- Modül sonu değerlendirmelerinin (yazılı, sözlü, uygulama) aritmetik ortalaması işlenir.</div>
          <div>3- Kursiyerlerin devam etmediği modüllere (D), sınava girmediyse (G) harfi işlenir.</div>
          <div>4- Boş kalacak olan modüllerin not hücreleri (-) işareti konularak kapatılır.</div>
        </div>

        <!-- Öğretmen İmza Alanı -->
        <div style="text-align: center; min-width: 160px; margin-bottom: 1px;">
          <div style="font-size: 6.5pt;">... / ... / 202...</div>
          <div style="margin-top: 6px; font-weight: bold; font-size: 7.5pt; color: #111;">${escapeHtml(instructor)}</div>
          <div style="font-size: 6pt; color: #333;">Kurs Öğretmeni / İmza</div>
        </div>

      </div>

    </div>
  `;
}

window.openNotCizelgesiPreview = function() {
  if (!activeCourseForDetail) return;
  const container = document.getElementById('notCizelgesiPreviewContainer');
  const modal = document.getElementById('notCizelgesiModal');
  if (container) {
    container.innerHTML = generateNotCizelgesiHtml(activeCourseForDetail);
  }
  modal?.classList.remove('hidden');
  refreshLucide();
};

window.closeNotCizelgesiPreview = function() {
  const modal = document.getElementById('notCizelgesiModal');
  modal?.classList.add('hidden');
  cleanupPrintArea();
};

window.triggerPrintNotCizelgesi = function() {
  if (!activeCourseForDetail) return;
  const title = getDocumentSaveTitle('Modül Değerlendirme Çizelgesi', activeCourseForDetail);
  safePrint(generateNotCizelgesiHtml(activeCourseForDetail), true, title);
};

// =================== RESMİ EVRAK 4: SINAV TUTANAĞI (SINAV KATILIM LİSTESİ) ===================

function generateSinavTutanagiHtml(course) {
  if (!course) return '<p class="p-6 text-center text-slate-500">Kurs bilgisi bulunamadı.</p>';

  const institution = getCourseInstitutionName(course);
  const courseName = course.name || course.title || 'Kurs';
  const instructor = getCourseInstructorName(course);

  // Kursiyerleri alfabetik sırala (Türkçe alfabe duyarlı)
  const sortedStudents = [...(course.students || [])].sort((a, b) => {
    const nameA = (a.fullName || `${a.firstName || ''} ${a.lastName || ''}`).trim();
    const nameB = (b.fullName || `${b.firstName || ''} ${b.lastName || ''}`).trim();
    return nameA.localeCompare(nameB, 'tr', { sensitivity: 'base' });
  });

  const totalRows = Math.max(25, sortedStudents.length);
  let rowsHtml = '';

  for (let i = 1; i <= totalRows; i++) {
    if (i <= sortedStudents.length) {
      const s = sortedStudents[i - 1];
      const sFullName = (s.fullName || `${s.firstName || ''} ${s.lastName || ''}`).trim();

      rowsHtml += `
        <tr style="height: 25px;">
          <td style="border: 1px solid black; text-align: center; font-weight: bold; font-size: 8pt; padding: 2px;">
            ${i}
          </td>
          <td style="border: 1px solid black; padding: 2px 8px; font-size: 8.5pt; text-align: left; font-weight: 500;">
            ${escapeHtml(sFullName)}
          </td>
          <td style="border: 1px solid black; text-align: center; font-size: 7.5pt; padding: 2px;">
            &nbsp;
          </td>
        </tr>
      `;
    } else {
      rowsHtml += `
        <tr style="height: 25px;">
          <td style="border: 1px solid black; text-align: center; font-weight: bold; font-size: 8pt; padding: 2px;">
            ${i}
          </td>
          <td style="border: 1px solid black; padding: 2px 8px;">&nbsp;</td>
          <td style="border: 1px solid black; padding: 2px;">&nbsp;</td>
        </tr>
      `;
    }
  }

  return `
    <div class="sinav-tutanagi-document" style="font-family: Arial, Helvetica, sans-serif; color: #000; line-height: 1.3; width: 100%; max-width: 800px; margin: 0 auto; background: #fff; padding: 30px 40px; box-sizing: border-box;">
      
      <!-- BAŞLIK -->
      <div style="text-align: center; margin-bottom: 25px; line-height: 1.45;">
        <h2 style="font-size: 11pt; font-weight: bold; margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">
          ${escapeHtml(institution)}
        </h2>
        <div style="font-size: 10pt; font-weight: bold; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px dotted #666; display: inline-block; padding: 0 10px;">
          ${escapeHtml(courseName)} KURSU
        </div>
        <h1 style="font-size: 11.5pt; font-weight: bold; margin: 6px 0 0 0; text-transform: uppercase; letter-spacing: 0.8px;">
          SINAV KATILIM LİSTESİ
        </h1>
      </div>

      <!-- TABLO -->
      <table style="width: 100%; border-collapse: collapse; border: 1.5px solid black; font-size: 8pt;">
        <thead>
          <tr style="background: #fafafa; height: 26px;">
            <th style="border: 1px solid black; width: 65px; text-align: center; font-weight: bold; font-size: 8pt; padding: 3px;">
              SIRA NO
            </th>
            <th style="border: 1px solid black; width: 55%; text-align: center; font-weight: bold; font-size: 8pt; padding: 3px;">
              ADI SOYADI
            </th>
            <th style="border: 1px solid black; width: 35%; text-align: center; font-weight: bold; font-size: 8pt; padding: 3px;">
              İMZA
            </th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
          <!-- Tarafımca Onay Cümlesi -->
          <tr>
            <td colspan="3" style="border: 1.5px solid black; padding: 8px 12px; font-weight: bold; font-size: 8.5pt; text-align: left; background: #fff;">
              Tarafımca ....../....../202... Tarihinde gerçekleştirilen sınava ............ kişi katılmıştır.
            </td>
          </tr>
        </tbody>
      </table>

      <!-- ALT İMZA ALANI -->
      <div style="display: flex; justify-content: flex-end; margin-top: 25px; text-align: center;">
        <div style="min-width: 180px; font-size: 8.5pt; line-height: 1.5;">
          <div>....../....../202...</div>
          <div style="margin-top: 30px; font-weight: bold; font-size: 9pt; color: #111;">${escapeHtml(instructor)}</div>
          <div style="margin-top: 4px; font-size: 8pt; color: #333;">Ad Soyad - İmza</div>
        </div>
      </div>

    </div>
  `;
}

window.openSinavTutanagiPreview = function() {
  if (!activeCourseForDetail) return;
  const container = document.getElementById('sinavTutanagiPreviewContainer');
  const modal = document.getElementById('sinavTutanagiModal');
  if (container) {
    container.innerHTML = generateSinavTutanagiHtml(activeCourseForDetail);
  }
  modal?.classList.remove('hidden');
  refreshLucide();
};

window.closeSinavTutanagiPreview = function() {
  const modal = document.getElementById('sinavTutanagiModal');
  modal?.classList.add('hidden');
  cleanupPrintArea();
};

window.triggerPrintSinavTutanagi = function() {
  if (!activeCourseForDetail) return;
  const title = getDocumentSaveTitle('Sınav Tutanağı', activeCourseForDetail);
  safePrint(generateSinavTutanagiHtml(activeCourseForDetail), false, title);
};

// =================== RESMİ EVRAK 5: İMZA LİSTESİ (GÜNLÜK İMZA ÇİZELGESİ) ===================

function generateImzaListesiHtml(course) {
  if (!course) return '<p class="p-6 text-center text-slate-500">Kurs bilgisi bulunamadı.</p>';

  const courseName = course.name || course.title || 'Kurs';
  const docType = course.documentType || 'Katılım Belgesi';
  const docTypeSuffix = docType === 'Sertifika' ? 'SERTİFİKALI' : 'KATILIM BELGELİ';
  const fullTitle = `${courseName.toUpperCase()} KURSU (${docTypeSuffix})`;

  // Kurs günleri
  const validDates = getValidCourseDates(course);
  const dateColumnsPerPage = 9;
  const totalDatePages = Math.max(1, Math.ceil(validDates.length / dateColumnsPerPage));

  // Kursiyerleri alfabetik sırala (Türkçe duyarlı)
  const sortedStudents = [...(course.students || [])].sort((a, b) => {
    const nameA = (a.fullName || `${a.firstName || ''} ${a.lastName || ''}`).trim();
    const nameB = (b.fullName || `${b.firstName || ''} ${b.lastName || ''}`).trim();
    return nameA.localeCompare(nameB, 'tr', { sensitivity: 'base' });
  });

  const totalRows = Math.max(20, sortedStudents.length);
  const pagesHtml = [];

  for (let pageIdx = 0; pageIdx < totalDatePages; pageIdx++) {
    const pageDates = validDates.slice(pageIdx * dateColumnsPerPage, (pageIdx + 1) * dateColumnsPerPage);
    
    // 9 tarih sütunu başlıkları
    let theadDatesHtml = '';
    for (let c = 0; c < dateColumnsPerPage; c++) {
      if (c < pageDates.length) {
        const dStr = pageDates[c]; // YYYY-MM-DD
        const parts = dStr.split('-');
        const formattedDate = parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : dStr;
        theadDatesHtml += `<th style="border: 1px solid black; width: 8.5%; text-align: center; font-weight: bold; font-size: 8pt; padding: 4px 2px;">${formattedDate}</th>`;
      } else {
        const year = course.startDate ? (new Date(course.startDate).getFullYear() || 2026) : 2026;
        theadDatesHtml += `<th style="border: 1px solid black; width: 8.5%; text-align: center; font-weight: bold; font-size: 8pt; padding: 4px 2px;">…/…/${year}</th>`;
      }
    }

    // Satırlar
    let tbodyRowsHtml = '';
    for (let r = 1; r <= totalRows; r++) {
      let adi = '';
      let soyadi = '';
      if (r <= sortedStudents.length) {
        const s = sortedStudents[r - 1];
        adi = (s.firstName || '').trim();
        soyadi = (s.lastName || '').trim();
        if (!adi && s.fullName) {
          const parts = s.fullName.trim().split(/\s+/);
          if (parts.length > 1) {
            soyadi = parts.pop();
            adi = parts.join(' ');
          } else {
            adi = s.fullName.trim();
            soyadi = '';
          }
        }
      }

      let dateCellsHtml = '';
      for (let c = 0; c < dateColumnsPerPage; c++) {
        dateCellsHtml += `<td style="border: 1px solid black; padding: 2px;">&nbsp;</td>`;
      }

      tbodyRowsHtml += `
        <tr style="height: 24px;">
          <td style="border: 1px solid black; text-align: center; font-weight: bold; font-size: 8pt; padding: 2px;">${r}</td>
          <td style="border: 1px solid black; padding: 2px 6px; font-size: 8pt; text-align: left; text-transform: uppercase;">${escapeHtml(adi)}</td>
          <td style="border: 1px solid black; padding: 2px 6px; font-size: 8pt; text-align: left; text-transform: uppercase;">${escapeHtml(soyadi)}</td>
          ${dateCellsHtml}
        </tr>
      `;
    }

    const pageBreakStyle = (pageIdx < totalDatePages - 1) ? 'page-break-after: always; margin-bottom: 30px;' : '';
    const pageSubtitle = totalDatePages > 1 ? ` <span style="font-size: 8pt; font-weight: normal; margin-left: 8px;">(Sayfa ${pageIdx + 1} / ${totalDatePages})</span>` : '';

    pagesHtml.push(`
      <div class="imza-listesi-document" style="font-family: Arial, Helvetica, sans-serif; color: #000; width: 100%; max-width: 1020px; margin: 0 auto; background: #fff; padding: 20px 25px; box-sizing: border-box; ${pageBreakStyle}">
        
        <!-- BAŞLIK -->
        <div style="text-align: center; margin-bottom: 14px;">
          <h2 style="font-size: 11pt; font-weight: bold; margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">
            ${escapeHtml(fullTitle)}${pageSubtitle}
          </h2>
        </div>

        <!-- TABLO -->
        <table style="width: 100%; border-collapse: collapse; border: 1.5px solid black; font-size: 8pt;">
          <thead>
            <tr style="background: #fafafa; height: 26px;">
              <th style="border: 1px solid black; width: 38px; text-align: center; font-weight: bold; font-size: 8pt; padding: 3px 2px;">No</th>
              <th style="border: 1px solid black; width: 105px; text-align: center; font-weight: bold; font-size: 8pt; padding: 3px 6px;">ADI</th>
              <th style="border: 1px solid black; width: 105px; text-align: center; font-weight: bold; font-size: 8pt; padding: 3px 6px;">SOYADI</th>
              ${theadDatesHtml}
            </tr>
          </thead>
          <tbody>
            ${tbodyRowsHtml}
          </tbody>
        </table>

      </div>
    `);
  }

  return pagesHtml.join('');
}

window.openImzaListesiPreview = function() {
  if (!activeCourseForDetail) return;
  const container = document.getElementById('imzaListesiPreviewContainer');
  const modal = document.getElementById('imzaListesiModal');
  if (container) {
    container.innerHTML = generateImzaListesiHtml(activeCourseForDetail);
  }
  modal?.classList.remove('hidden');
  refreshLucide();
};

window.closeImzaListesiPreview = function() {
  const modal = document.getElementById('imzaListesiModal');
  modal?.classList.add('hidden');
  cleanupPrintArea();
};

window.triggerPrintImzaListesi = function() {
  if (!activeCourseForDetail) return;
  const title = getDocumentSaveTitle('İmza Listesi', activeCourseForDetail);
  safePrint(generateImzaListesiHtml(activeCourseForDetail), true, title);
};

// Yardımcı Fonksiyonlar
function formatDate(dateStr) {
  if (!dateStr) return '-';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

function escapeHtml(string) {
  if (!string) return '';
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// =================== OTOMATİK KURS BİTİŞ TARİHİ HESAPLAMA ===================

function autoCalculateCourseEndDate() {
  const startVal = courseFormStartDate?.value;
  if (!startVal) return;
  const dailyHours = Number(courseFormDailyHours?.value) || 4;
  const totalHours = Number(courseFormTotalHours?.value) || 120;

  const selectedDays = [];
  document.querySelectorAll('.course-day-checkbox').forEach(cb => {
    if (cb.checked) selectedDays.push(cb.value);
  });
  if (selectedDays.length === 0) return;

  const mockCourse = {
    startDate: startVal,
    totalHours,
    dailyHours,
    days: selectedDays,
    offDays: currentOffDays || []
  };

  const dates = getValidCourseDates(mockCourse);
  if (dates && dates.length > 0 && courseFormEndDate) {
    courseFormEndDate.value = dates[dates.length - 1];
  }
}

// =================== EXCEL İÇE / DIŞA AKTARMA (XLSX) ===================

function exportStudentsToExcel() {
  if (!activeCourseForDetail) return;
  if (typeof XLSX === 'undefined') {
    alert('Excel kütüphanesi henüz yüklenemedi. Lütfen internet bağlantınızı kontrol ediniz.');
    return;
  }

  if (activeCourseForDetail.students) {
    sortStudentsAlphabetically(activeCourseForDetail.students);
  }

  const students = activeCourseForDetail.students || [];
  const moduleCount = activeCourseForDetail.moduleCount ? Math.max(1, Number(activeCourseForDetail.moduleCount)) : 1;
  const courseName = activeCourseForDetail.name || 'Kurs';

  const data = students.map((s, idx) => {
    const row = {
      'Sıra': idx + 1,
      'Adı': s.firstName || '',
      'Soyadı': s.lastName || '',
      'Adı Soyadı': s.fullName || `${s.firstName || ''} ${s.lastName || ''}`.trim(),
      'T.C. Kimlik No': s.tcNo || '',
      'Telefon': s.phone || '',
      'Devamsızlık Saati': Number(s.absentHours || 0),
      'Devam Durumu': s.attendance || 'Devamlı'
    };

    const modScores = s.moduleScores || {};
    for (let m = 1; m <= moduleCount; m++) {
      row[`Modül ${m}`] = (modScores[m] !== null && modScores[m] !== undefined) ? modScores[m] : '';
    }

    row['Genel Not Ortalaması'] = (s.examScore !== null && s.examScore !== undefined) ? s.examScore : '';
    row['Sonuç'] = s.result || 'Devam Ediyor';
    return row;
  });

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Kursiyerler');

  const fileName = `${courseName.replace(/[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ_-]/g, '_')}_Kursiyer_Listesi.xlsx`;
  XLSX.writeFile(wb, fileName);
}

function handleImportStudentsFromExcel(e) {
  const file = e.target.files?.[0];
  if (!file || !activeCourseForDetail) return;

  if (typeof XLSX === 'undefined') {
    alert('Excel kütüphanesi henüz yüklenemedi.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(evt) {
    try {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const rows = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

      if (!rows || rows.length === 0) {
        alert('Excel dosyasında veri bulunamadı.');
        return;
      }

      let addedCount = 0;
      let updatedCount = 0;
      const currentList = activeCourseForDetail.students || [];
      const moduleCount = activeCourseForDetail.moduleCount ? Math.max(1, Number(activeCourseForDetail.moduleCount)) : 1;

      rows.forEach(row => {
        const tcKey = Object.keys(row).find(k => k.toLowerCase().includes('tc') || k.toLowerCase().includes('kimlik'));
        const nameKey = Object.keys(row).find(k => k.toLowerCase() === 'adı' || k.toLowerCase() === 'adi' || k.toLowerCase().includes('ad soyad') || k.toLowerCase() === 'isim');
        const surnameKey = Object.keys(row).find(k => k.toLowerCase() === 'soyadı' || k.toLowerCase() === 'soyadi' || k.toLowerCase() === 'soyisim');
        const phoneKey = Object.keys(row).find(k => k.toLowerCase().includes('tel') || k.toLowerCase().includes('cep'));

        let tcNo = tcKey ? String(row[tcKey]).replace(/\D/g, '') : '';
        let phone = phoneKey ? String(row[phoneKey]).trim() : '';
        let fullName = '';
        let firstName = '';
        let lastName = '';

        if (nameKey && surnameKey) {
          firstName = String(row[nameKey]).trim();
          lastName = String(row[surnameKey]).trim();
          fullName = `${firstName} ${lastName}`.trim();
        } else if (nameKey) {
          fullName = String(row[nameKey]).trim();
          const parts = fullName.split(/\s+/);
          if (parts.length > 1) {
            lastName = parts.pop();
            firstName = parts.join(' ');
          } else {
            firstName = fullName;
          }
        }

        if (!fullName && !firstName && !tcNo) return;

        const modScores = {};
        for (let m = 1; m <= moduleCount; m++) {
          const modKey = Object.keys(row).find(k => k.toLowerCase().includes(`modül ${m}`) || k.toLowerCase().includes(`modul ${m}`) || k.toLowerCase() === `m${m}`);
          if (modKey && row[modKey] !== '') {
            modScores[m] = Number(row[modKey]);
          } else {
            modScores[m] = null;
          }
        }

        const existing = currentList.find(s => (tcNo && s.tcNo === tcNo) || (s.fullName.toLowerCase() === fullName.toLowerCase()));
        if (existing) {
          if (tcNo) existing.tcNo = tcNo;
          if (phone) existing.phone = phone;
          if (Object.keys(modScores).some(k => modScores[k] !== null)) {
            existing.moduleScores = { ...existing.moduleScores, ...modScores };
          }
          updatedCount++;
        } else {
          const newStudent = {
            id: `std_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
            firstName,
            lastName,
            fullName: fullName || `${firstName} ${lastName}`.trim(),
            tcNo,
            phone,
            absentHours: 0,
            attendance: 'Devamlı',
            attendanceNote: '',
            dailyAbsences: [],
            moduleScores: modScores,
            examScore: null,
            result: 'Devam Ediyor'
          };
          currentList.push(newStudent);
          addedCount++;
        }
      });

      // Kursiyerleri alfabetik sırala (A-Z)
      sortStudentsAlphabetically(currentList);
      activeCourseForDetail.students = currentList;
      currentCourses = currentCourses.map(c => c.id === activeCourseForDetail.id ? activeCourseForDetail : c);
      DataStore.saveCourses(currentCourses);

      renderStudentTable();
      renderTeacherDashboard();
      alert(`Excel aktarımı tamamlandı!\n• ${addedCount} yeni kursiyer eklendi.\n• ${updatedCount} kursiyer güncellendi.`);
    } catch (err) {
      console.error('Excel okuma hatası:', err);
      alert('Excel dosyası işlenirken hata oluştu: ' + err.message);
    } finally {
      e.target.value = '';
    }
  };
  reader.readAsArrayBuffer(file);
}

// =================== JSON SİSTEM YEDEKLEME & GERİ YÜKLEME ===================

function exportSystemBackupJson() {
  const backupData = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    courses: DataStore.getCourses(),
    centers: DataStore.getCenters(),
    templates: DataStore.getCourseTemplates(),
    users: DataStore.getUsers()
  };

  const jsonStr = JSON.stringify(backupData, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const dStr = new Date().toISOString().split('T')[0];
  a.href = url;
  a.download = `kurs_sonu_sistem_yedegi_${dStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function handleImportSystemBackupJson(e) {
  const file = e.target.files?.[0];
  if (!file) return;

  if (!confirm('Dikkat! Yedek dosyasını yüklediğinizde mevcut veriler güncellenecektir. Onaylıyor musunuz?')) {
    e.target.value = '';
    return;
  }

  const reader = new FileReader();
  reader.onload = function(evt) {
    try {
      const data = JSON.parse(evt.target.result);
      if (!data || (!data.courses && !data.users)) {
        alert('Geçersiz yedek dosyası formatı!');
        return;
      }

      if (Array.isArray(data.courses)) DataStore.saveCourses(data.courses);
      if (Array.isArray(data.centers)) DataStore.saveCenters(data.centers);
      if (Array.isArray(data.templates)) DataStore.saveCourseTemplates(data.templates);
      if (Array.isArray(data.users)) DataStore.saveUsers(data.users);

      loadData();
      renderTeacherDashboard();
      if (typeof renderAdminPanel === 'function') renderAdminPanel();
      alert('Sistem yedeği başarıyla geri yüklendi!');
    } catch (err) {
      alert('Yedek dosyası okunurken hata oluştu: ' + err.message);
    } finally {
      e.target.value = '';
    }
  };
  reader.readAsText(file);
}

// =========================================================================
// ============= PROJE GELİŞTİRİCİ TODO LIST (ÖZGÜR & ÖNDER) ==============
// =========================================================================

function isDevUser(user) {
  if (!user) return false;
  if (user.role === 'admin') return true;
  const u = typeof normalizeUsername === 'function' ? normalizeUsername(user.username || '') : (user.username || '').toLowerCase().trim();
  if (u === 'ozgur' || u === 'onder' || u === 'admin' || u.includes('ozgur') || u.includes('onder') || u.includes('dev') || u.includes('admin')) return true;
  const fn = typeof normalizeUsername === 'function' ? normalizeUsername(user.fullName || '') : (user.fullName || '').toLowerCase().trim();
  if (fn.includes('onder') || fn.includes('ozgur') || fn.includes('yonetici')) return true;
  const title = (user.title || '').toLowerCase();
  if (title.includes('geliştirici') || title.includes('gelistirici') || title.includes('developer') || title.includes('dev') || title.includes('yonetici')) return true;
  return false;
}

let currentDevTodoFilter = 'all'; // 'all' | 'active' | 'completed'
let editingDevTodoId = null;
let devTodoInitialized = false;

function checkDevTodoList() {
  const wrapper = document.getElementById('devTodoFloatingWrapper');
  const navbarBtn = document.getElementById('navbarDevTodoBtn');
  const adminTabBtn = document.getElementById('adminTabTodosBtn');

  if (isDevUser(currentUser)) {
    if (wrapper) wrapper.classList.remove('hidden');
    if (navbarBtn) navbarBtn.classList.remove('hidden');
    if (adminTabBtn) adminTabBtn.classList.remove('hidden');
    if (!devTodoInitialized) {
      initDevTodoList();
    }
    renderDevTodos();
  } else {
    hideDevTodoList();
  }
}

function hideDevTodoList() {
  const wrapper = document.getElementById('devTodoFloatingWrapper');
  const navbarBtn = document.getElementById('navbarDevTodoBtn');
  const adminTabBtn = document.getElementById('adminTabTodosBtn');
  if (wrapper) wrapper.classList.add('hidden');
  if (navbarBtn) navbarBtn.classList.add('hidden');
  if (adminTabBtn) adminTabBtn.classList.add('hidden');
  closeDevTodoModal();
}

function openDevTodoModal(e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();
  const modal = document.getElementById('devTodoModal') || document.getElementById('devTodoDrawer');
  if (modal) {
    modal.style.removeProperty('display');
    modal.classList.remove('hidden');
  }

  // Eğer kullanıcı Admin panelindeyse, Admin sekmesini de 'todos'a geçir
  if (typeof currentActiveView !== 'undefined' && currentActiveView === 'admin' && typeof switchAdminTab === 'function') {
    try {
      switchAdminTab('todos');
    } catch(err) {
      console.warn("switchAdminTab todos hatası:", err);
    }
  }

  try {
    renderDevTodos();
  } catch (err) {
    console.error("renderDevTodos error:", err);
  }
  refreshLucide();

  setTimeout(() => {
    const input = document.getElementById('devTodoInput');
    if (input) input.focus();
  }, 100);
}

function closeDevTodoModal(e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();
  const modal = document.getElementById('devTodoModal') || document.getElementById('devTodoDrawer');
  if (modal) {
    modal.style.removeProperty('display');
    modal.classList.add('hidden');
  }
}

function openDevTodoDrawer(e) {
  openDevTodoModal(e);
}

function closeDevTodoDrawer(e) {
  closeDevTodoModal(e);
}

window.openDevTodoModal = openDevTodoModal;
window.closeDevTodoModal = closeDevTodoModal;
window.openDevTodoDrawer = openDevTodoModal;
window.closeDevTodoDrawer = closeDevTodoModal;

function initDevTodoList() {
  if (devTodoInitialized) return;
  devTodoInitialized = true;

  const openBtn = document.getElementById('devTodoOpenBtn');
  const navbarBtn = document.getElementById('navbarDevTodoBtn');
  const closeBtn = document.getElementById('devTodoCloseBtn');
  const backdrop = document.getElementById('devTodoBackdrop');
  const form = document.getElementById('devTodoForm');
  const clearCompletedBtn = document.getElementById('devTodoClearCompletedBtn');

  if (openBtn) {
    openBtn.onclick = (e) => { e.preventDefault(); openDevTodoModal(); };
  }
  if (navbarBtn) {
    navbarBtn.onclick = (e) => { e.preventDefault(); openDevTodoModal(); };
  }
  if (closeBtn) {
    closeBtn.onclick = (e) => { e.preventDefault(); closeDevTodoModal(); };
  }
  if (backdrop) {
    backdrop.onclick = (e) => { e.preventDefault(); closeDevTodoModal(); };
  }

  // Drawer Form submit (Yeni Görev Ekleme)
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('devTodoInput');
      const assigneeSelect = document.getElementById('devTodoAssignee');
      const prioritySelect = document.getElementById('devTodoPriority');
      if (!input) return;

      const text = input.value.trim();
      if (!text) return;

      const assignee = assigneeSelect ? assigneeSelect.value : 'Ortak';
      const priority = prioritySelect ? prioritySelect.value : 'normal';

      const todos = DataStore.getTodos();
      const newTodo = {
        id: 'todo_' + Date.now(),
        text: text,
        assignee: assignee,
        priority: priority,
        completed: false,
        createdAt: new Date().toISOString(),
        createdBy: currentUser?.fullName || (isDevUser(currentUser) && currentUser.username.includes('ozgur') ? 'Özgür' : 'Önder')
      };

      todos.unshift(newTodo);
      DataStore.saveTodos(todos);
      input.value = '';
      renderDevTodos();
    });
  }

  // Admin Tab Form submit (Admin Sekmesinden Yeni Görev Ekleme)
  const adminForm = document.getElementById('adminDevTodoForm');
  if (adminForm) {
    adminForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('adminDevTodoInput');
      const assigneeSelect = document.getElementById('adminDevTodoAssignee');
      const prioritySelect = document.getElementById('adminDevTodoPriority');
      if (!input) return;

      const text = input.value.trim();
      if (!text) return;

      const assignee = assigneeSelect ? assigneeSelect.value : 'Ortak';
      const priority = prioritySelect ? prioritySelect.value : 'normal';

      const todos = DataStore.getTodos();
      const newTodo = {
        id: 'todo_' + Date.now(),
        text: text,
        assignee: assignee,
        priority: priority,
        completed: false,
        createdAt: new Date().toISOString(),
        createdBy: currentUser?.fullName || (isDevUser(currentUser) && currentUser.username.includes('ozgur') ? 'Özgür' : 'Önder')
      };

      todos.unshift(newTodo);
      DataStore.saveTodos(todos);
      input.value = '';
      renderDevTodos();
    });
  }

  // Filtre butonları (Drawer)
  document.querySelectorAll('.dev-todo-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentDevTodoFilter = btn.getAttribute('data-filter') || 'all';
      document.querySelectorAll('.dev-todo-filter-btn').forEach(b => {
        b.className = 'dev-todo-filter-btn px-2.5 py-1 rounded-md font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 cursor-pointer';
      });
      btn.className = 'dev-todo-filter-btn px-2.5 py-1 rounded-md font-bold bg-white dark:bg-[#152125] text-slate-800 dark:text-slate-100 shadow-xs cursor-pointer';
      // Admin filtre butonlarını da senkronize et
      document.querySelectorAll('.admin-todo-filter-btn').forEach(b => {
        if (b.getAttribute('data-filter') === currentDevTodoFilter) {
          b.className = 'admin-todo-filter-btn px-3 py-1 rounded-lg font-bold bg-white text-slate-800 shadow-xs cursor-pointer';
        } else {
          b.className = 'admin-todo-filter-btn px-3 py-1 rounded-lg font-medium text-slate-500 hover:text-slate-800 cursor-pointer';
        }
      });
      renderDevTodos();
    });
  });

  // Filtre butonları (Admin Paneli Sekmesi)
  document.querySelectorAll('.admin-todo-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentDevTodoFilter = btn.getAttribute('data-filter') || 'all';
      document.querySelectorAll('.admin-todo-filter-btn').forEach(b => {
        b.className = 'admin-todo-filter-btn px-3 py-1 rounded-lg font-medium text-slate-500 hover:text-slate-800 cursor-pointer';
      });
      btn.className = 'admin-todo-filter-btn px-3 py-1 rounded-lg font-bold bg-white text-slate-800 shadow-xs cursor-pointer';
      // Drawer filtre butonlarını da senkronize et
      document.querySelectorAll('.dev-todo-filter-btn').forEach(b => {
        if (b.getAttribute('data-filter') === currentDevTodoFilter) {
          b.className = 'dev-todo-filter-btn px-2.5 py-1 rounded-md font-bold bg-white dark:bg-[#152125] text-slate-800 dark:text-slate-100 shadow-xs cursor-pointer';
        } else {
          b.className = 'dev-todo-filter-btn px-2.5 py-1 rounded-md font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 cursor-pointer';
        }
      });
      renderDevTodos();
    });
  });

  // Bitenleri temizle (Drawer)
  if (clearCompletedBtn) {
    clearCompletedBtn.addEventListener('click', () => {
      const todos = DataStore.getTodos();
      const remaining = todos.filter(t => !t.completed);
      if (todos.length === remaining.length) {
        alert('Tamamlanmış görev bulunmuyor.');
        return;
      }
      if (confirm('Tamamlanan tüm görevler silinsin mi?')) {
        DataStore.saveTodos(remaining);
        renderDevTodos();
      }
    });
  }

  // Bitenleri temizle (Admin Paneli)
  const adminClearBtn = document.getElementById('adminTodoClearCompletedBtn');
  if (adminClearBtn) {
    adminClearBtn.addEventListener('click', () => {
      const todos = DataStore.getTodos();
      const remaining = todos.filter(t => !t.completed);
      if (todos.length === remaining.length) {
        alert('Tamamlanmış görev bulunmuyor.');
        return;
      }
      if (confirm('Tamamlanan tüm görevler silinsin mi?')) {
        DataStore.saveTodos(remaining);
        renderDevTodos();
      }
    });
  }
}

function renderDevTodos() {
  const container = document.getElementById('devTodoListContainer');
  const adminContainer = document.getElementById('adminTodoListContainer');
  const badge = document.getElementById('devTodoBadge');
  const dot = document.getElementById('devTodoUncompletedDot');
  const statsText = document.getElementById('devTodoStatsText');
  const activeUserTag = document.getElementById('devTodoActiveUserTag');
  const adminCount = document.getElementById('adminDevTodoCount');
  const navbarCount = document.getElementById('navbarDevTodoCount');
  const adminStatsText = document.getElementById('adminTodoStatsText');

  const rawTodos = (typeof DataStore !== 'undefined' && DataStore.getTodos) ? DataStore.getTodos() : [];
  const todos = Array.isArray(rawTodos) ? rawTodos : (rawTodos && Array.isArray(rawTodos.list) ? rawTodos.list : []);
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const active = total - completed;

  if (badge) badge.innerText = active;
  if (navbarCount) navbarCount.innerText = active;
  if (adminCount) adminCount.innerText = active;

  if (dot) {
    if (active > 0) dot.classList.remove('hidden');
    else dot.classList.add('hidden');
  }
  if (statsText) statsText.innerText = `${total} görevden ${completed}'i tamamlandı`;
  if (adminStatsText) adminStatsText.innerText = `${total} görevden ${completed}'i tamamlandı (${active} bekliyor)`;
  if (activeUserTag && currentUser) {
    activeUserTag.innerText = currentUser.fullName || currentUser.username;
  }

  // Filtreleme
  let filtered = [...todos];
  if (currentDevTodoFilter === 'active') {
    filtered = filtered.filter(t => !t.completed);
  } else if (currentDevTodoFilter === 'completed') {
    filtered = filtered.filter(t => t.completed);
  }

  let html = '';
  if (filtered.length === 0) {
    html = `
      <div class="py-12 text-center text-slate-400">
        <i data-lucide="inbox" class="w-8 h-8 mx-auto mb-2 opacity-50"></i>
        <p class="text-xs font-medium">Bu filtrede gösterilecek görev yok.</p>
      </div>
    `;
  } else {
    html = filtered.map(t => {
      // Sorumlu rozeti
      let assigneeBadge = '';
      if (t.assignee === 'Özgür') {
        assigneeBadge = `<span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-300/40">👤 Özgür</span>`;
      } else if (t.assignee === 'Önder') {
        assigneeBadge = `<span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300 border border-orange-300/40">👤 Önder</span>`;
      } else {
        assigneeBadge = `<span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-300/40">👥 Ortak</span>`;
      }

      // Öncelik rozeti ve sol kenar renk vurgusu
      const prio = (t.priority || 'normal').toLowerCase();
      let priorityBadge = '';
      let priorityBorder = 'border-l-[3.5px] border-l-sky-500';

      if (prio === 'urgent' || prio === 'acil') {
        priorityBadge = `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-300/60 shadow-2xs">🔥 Acil</span>`;
        priorityBorder = 'border-l-[3.5px] border-l-rose-500';
      } else if (prio === 'high' || prio === 'yuksek' || prio === 'yüksek') {
        priorityBadge = `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-300/60 shadow-2xs">⚡ Yüksek</span>`;
        priorityBorder = 'border-l-[3.5px] border-l-amber-500';
      } else if (prio === 'low' || prio === 'dusuk' || prio === 'düşük') {
        priorityBadge = `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border border-slate-300/60 shadow-2xs">☕ Düşük</span>`;
        priorityBorder = 'border-l-[3.5px] border-l-slate-400';
      } else {
        priorityBadge = `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-sky-100 text-sky-700 dark:bg-sky-950/70 dark:text-sky-300 border border-sky-300/60 shadow-2xs">📌 Normal</span>`;
        priorityBorder = 'border-l-[3.5px] border-l-sky-500';
      }

      // Düzenleme modunda mı?
      if (editingDevTodoId === t.id) {
        return `
          <div class="p-3 bg-white dark:bg-[#152125] rounded-xl border-2 border-[#335C67] shadow-md space-y-2">
            <input
              type="text"
              id="editTodoInput_${t.id}"
              value="${escapeHtml(t.text)}"
              class="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-[#10191b] border border-slate-300 dark:border-[#2b3e45] rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#335C67]"
            />
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-1.5">
                <select id="editTodoAssignee_${t.id}" class="px-2 py-1 text-[11px] rounded border border-slate-200 dark:border-[#2b3e45] bg-slate-50 dark:bg-[#10191b] text-slate-700 dark:text-slate-200">
                  <option value="Özgür" ${t.assignee === 'Özgür' ? 'selected' : ''}>Özgür</option>
                  <option value="Önder" ${t.assignee === 'Önder' ? 'selected' : ''}>Önder</option>
                  <option value="Ortak" ${t.assignee === 'Ortak' ? 'selected' : ''}>Ortak</option>
                </select>
                <select id="editTodoPriority_${t.id}" class="px-2 py-1 text-[11px] rounded border border-slate-200 dark:border-[#2b3e45] bg-slate-50 dark:bg-[#10191b] text-slate-700 dark:text-slate-200">
                  <option value="urgent" ${prio === 'urgent' ? 'selected' : ''}>🔥 Acil</option>
                  <option value="high" ${prio === 'high' ? 'selected' : ''}>⚡ Yüksek</option>
                  <option value="normal" ${prio === 'normal' || !t.priority ? 'selected' : ''}>📌 Normal</option>
                  <option value="low" ${prio === 'low' ? 'selected' : ''}>☕ Düşük</option>
                </select>
              </div>
              <div class="flex items-center gap-1">
                <button type="button" onclick="saveEditDevTodo('${t.id}')" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold cursor-pointer transition">Kaydet</button>
                <button type="button" onclick="cancelEditDevTodo()" class="px-2.5 py-1 bg-slate-200 dark:bg-[#2b3e45] text-slate-700 dark:text-slate-200 rounded-lg text-[11px] cursor-pointer transition">İptal</button>
              </div>
            </div>
          </div>
        `;
      }

      // Tarih formatı
      let dateStr = '';
      if (t.createdAt) {
        try {
          const d = new Date(t.createdAt);
          dateStr = d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
        } catch(e) {}
      }

      return `
        <div class="group p-3 rounded-xl border ${priorityBorder} ${t.completed ? 'bg-slate-100/70 dark:bg-[#121c1f]/70 border-slate-200 dark:border-[#223338] opacity-70' : 'bg-white dark:bg-[#152125] border-slate-200 dark:border-[#2b3e45] shadow-xs hover:border-[#335C67]/50'} transition flex items-start gap-2.5">
          <input
            type="checkbox"
            onchange="toggleDevTodo('${t.id}')"
            ${t.completed ? 'checked' : ''}
            class="mt-1 w-4 h-4 rounded text-[#335C67] focus:ring-[#335C67] cursor-pointer"
          />
          <div class="flex-1 min-w-0">
            <div class="text-xs sm:text-sm font-medium ${t.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-100'} break-words">
              ${escapeHtml(t.text)}
            </div>
            <div class="flex flex-wrap items-center gap-1.5 mt-2">
              ${assigneeBadge}
              ${priorityBadge}
              <span class="text-[10px] text-slate-400">
                ${escapeHtml(t.createdBy || 'Dev')} • ${dateStr}
              </span>
            </div>
          </div>
          <div class="flex items-center gap-1 opacity-60 group-hover:opacity-100 shrink-0 transition">
            <button
              type="button"
              onclick="startEditDevTodo('${t.id}')"
              class="p-1 hover:bg-slate-100 dark:hover:bg-[#223338] rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer transition"
              title="Düzenle"
            >
              <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
            </button>
            <button
              type="button"
              onclick="deleteDevTodo('${t.id}')"
              class="p-1 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg text-slate-400 hover:text-rose-600 cursor-pointer transition"
              title="Sil"
            >
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  if (container) container.innerHTML = html;
  if (adminContainer) adminContainer.innerHTML = html;

  refreshLucide();
}

window.toggleDevTodo = function(id) {
  const todos = DataStore.getTodos();
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    DataStore.saveTodos(todos);
    renderDevTodos();
  }
};

window.deleteDevTodo = function(id) {
  if (!confirm('Bu görevi silmek istediğinize emin misiniz?')) return;
  let todos = DataStore.getTodos();
  todos = todos.filter(t => t.id !== id);
  DataStore.saveTodos(todos);
  renderDevTodos();
};

window.startEditDevTodo = function(id) {
  editingDevTodoId = id;
  renderDevTodos();
  setTimeout(() => {
    const input = document.getElementById(`editTodoInput_${id}`);
    if (input) {
      input.focus();
      input.select();
    }
  }, 50);
};

window.cancelEditDevTodo = function() {
  editingDevTodoId = null;
  renderDevTodos();
};

window.saveEditDevTodo = function(id) {
  const input = document.getElementById(`editTodoInput_${id}`);
  const assigneeSelect = document.getElementById(`editTodoAssignee_${id}`);
  const prioritySelect = document.getElementById(`editTodoPriority_${id}`);
  if (!input) return;

  const newText = input.value.trim();
  if (!newText) {
    alert('Görev metni boş olamaz!');
    return;
  }

  const todos = DataStore.getTodos();
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.text = newText;
    if (assigneeSelect) todo.assignee = assigneeSelect.value;
    if (prioritySelect) todo.priority = prioritySelect.value;
    DataStore.saveTodos(todos);
    editingDevTodoId = null;
    renderDevTodos();
  }
};

window.openDevTodoModal = openDevTodoModal;
window.closeDevTodoModal = closeDevTodoModal;
window.openDevTodoDrawer = openDevTodoModal;
window.closeDevTodoDrawer = closeDevTodoModal;
window.checkDevTodoList = checkDevTodoList;
window.isDevUser = isDevUser;
