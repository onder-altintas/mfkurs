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
const mobileNavSwitcher = document.getElementById('mobileNavSwitcher');
const navTeacherViewBtn = document.getElementById('navTeacherViewBtn');
const navAdminViewBtn = document.getElementById('navAdminViewBtn');
const mobileTeacherBtn = document.getElementById('mobileTeacherBtn');
const mobileAdminBtn = document.getElementById('mobileAdminBtn');
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

// Modal: Kurs Merkezi (Sadece Merkez İsmi)
const centerModal = document.getElementById('centerModal');
const centerModalTitle = document.getElementById('centerModalTitle');
const closeCenterModalBtn = document.getElementById('closeCenterModalBtn');
const cancelCenterModalBtn = document.getElementById('cancelCenterModalBtn');
const centerForm = document.getElementById('centerForm');
const centerFormId = document.getElementById('centerFormId');
const centerFormName = document.getElementById('centerFormName');

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
const markDayPresentBtn = document.getElementById('markDayPresentBtn');

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
    }
  } else if (type === 'centers') {
    currentCenters = data;
    if (typeof renderCentersTable === 'function') renderCentersTable();
  } else if (type === 'templates') {
    currentTemplates = data;
    if (typeof renderTemplatesTable === 'function') renderTemplatesTable();
  }
};

function loadData() {
  currentCourses = DataStore.getCourses();
  currentCenters = DataStore.getCenters();
  currentTemplates = DataStore.getCourseTemplates();
  currentUsers = DataStore.getUsers();
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
    if (mobileNavSwitcher) mobileNavSwitcher.style.setProperty('display', 'flex', 'important');
    switchView('admin');
  } else {
    roleBadge.innerText = 'Öğretici Paneli';
    roleBadge.className = 'px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-[#FFF3B0] text-[#540B0E] border border-[#E09F3E]/40 shadow-xs';
    navViewSwitcher.style.setProperty('display', 'none', 'important');
    if (mobileNavSwitcher) mobileNavSwitcher.style.setProperty('display', 'none', 'important');
    switchView('teacher');
  }

  renderTeacherDashboard();
  renderAdminPanel();
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
    if (mobileAdminBtn) {
      mobileAdminBtn.className = 'px-3.5 py-1.5 bg-white dark:bg-[#152125] text-xs font-bold text-[#540B0E] dark:text-[#FFF3B0] rounded-lg shadow-xs border border-slate-200 dark:border-[#23353c] cursor-pointer';
    }
    if (mobileTeacherBtn) {
      mobileTeacherBtn.className = 'px-3.5 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 rounded-lg cursor-pointer';
    }
    renderAdminPanel();
  } else {
    adminSection.classList.add('hidden');
    teacherSection.classList.remove('hidden');
    navTeacherViewBtn.className = 'px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-[#152125] text-[#335C67] dark:text-[#FFF3B0] shadow-xs cursor-pointer flex items-center gap-1.5 transition border border-[#335C67]/20';
    navAdminViewBtn.className = 'px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 cursor-pointer flex items-center gap-1.5 transition';
    if (mobileTeacherBtn) {
      mobileTeacherBtn.className = 'px-3.5 py-1.5 bg-white dark:bg-[#152125] text-xs font-bold text-[#335C67] dark:text-[#FFF3B0] rounded-lg shadow-xs border border-slate-200 dark:border-[#23353c] cursor-pointer';
    }
    if (mobileAdminBtn) {
      mobileAdminBtn.className = 'px-3.5 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 rounded-lg cursor-pointer';
    }
    renderTeacherDashboard();
  }
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

  // Arayüzü güncelle
  if (userAvatar) {
    userAvatar.src = currentUser.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80';
  }
  if (userFullName) userFullName.innerText = currentUser.fullName;
  if (userTitle) userTitle.innerText = currentUser.title || '';
  if (welcomeUserName) welcomeUserName.innerText = currentUser.fullName;
  if (userInstitution) userInstitution.innerText = currentUser.institution || '';

  // Eğer admin ekranı açıksa oradaki kullanıcı listesini de tazele
  if (typeof renderAdminUsers === 'function') {
    renderAdminUsers();
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
    const found = users.find((u) => u.username.toLowerCase() === uName && u.password === pass);

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
  mobileTeacherBtn?.addEventListener('click', () => switchView('teacher'));
  mobileAdminBtn?.addEventListener('click', () => switchView('admin'));

  // Admin Alt Sekmeleri
  adminTabCentersBtn.addEventListener('click', () => switchAdminTab('centers'));
  adminTabTemplatesBtn.addEventListener('click', () => switchAdminTab('templates'));
  adminTabUsersBtn.addEventListener('click', () => switchAdminTab('users'));

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
  if (markDayPresentBtn) {
    markDayPresentBtn.addEventListener('click', handleMarkDayPresent);
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
  [adminTabCentersBtn, adminTabTemplatesBtn, adminTabUsersBtn].forEach(btn => {
    btn.className = 'flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 border-transparent text-slate-600 hover:text-slate-900 transition cursor-pointer whitespace-nowrap';
  });
  adminTabCentersContent.classList.add('hidden');
  adminTabTemplatesContent.classList.add('hidden');
  adminTabUsersContent.classList.add('hidden');

  if (tab === 'centers') {
    adminTabCentersBtn.className = 'flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 border-indigo-600 text-indigo-700 transition cursor-pointer whitespace-nowrap';
    adminTabCentersContent.classList.remove('hidden');
  } else if (tab === 'templates') {
    adminTabTemplatesBtn.className = 'flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 border-sky-600 text-sky-700 transition cursor-pointer whitespace-nowrap';
    adminTabTemplatesContent.classList.remove('hidden');
  } else if (tab === 'users') {
    adminTabUsersBtn.className = 'flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 border-purple-600 text-purple-700 transition cursor-pointer whitespace-nowrap';
    adminTabUsersContent.classList.remove('hidden');
    renderAdminUsers();
  }
  refreshLucide();
}

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

    card.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="p-3 rounded-xl bg-indigo-50 text-indigo-700 shrink-0">
          <i data-lucide="building-2" class="w-6 h-6"></i>
        </div>
        <div>
          <h4 class="font-bold text-slate-800 text-sm sm:text-base leading-snug">${escapeHtml(center.name)}</h4>
          <span class="text-[11px] text-slate-400">Kayıtlı Kurs Merkezi</span>
        </div>
      </div>

      <div class="flex items-center gap-1.5 shrink-0">
        <button
          onclick="editCenter('${center.id}')"
          class="p-2 text-indigo-700 hover:bg-indigo-50 rounded-xl transition cursor-pointer"
          title="Merkez Adını Düzenle"
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
    centerModalTitle.innerText = 'Kurs Merkezi Adını Güncelle';
    centerFormId.value = centerToEdit.id;
    centerFormName.value = centerToEdit.name;
  } else {
    centerModalTitle.innerText = 'Yeni Kurs Merkezi Ekle';
    centerForm.reset();
    centerFormId.value = '';
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
  if (!name) return;

  if (id) {
    currentCenters = currentCenters.map(c => c.id === id ? { ...c, name } : c);
  } else {
    const newCenter = {
      id: `center_${Date.now()}`,
      name
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
    courseFormSupervisor.value = courseToEdit.supervisor || '';
    courseFormInstructor.value = courseToEdit.instructor || currentUser.fullName;
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
  detailCourseMeta.innerText = `${activeCourseForDetail.institution} • ${activeCourseForDetail.totalHours} Saat • Eğitmen: ${activeCourseForDetail.instructor}${activeCourseForDetail.supervisor ? ' • Sorumlu: ' + activeCourseForDetail.supervisor : ''}${daysText}${timeText}`;

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

    const isEven = (idx % 2 === 0);
    const rowBgClass = isEven 
      ? 'bg-white dark:bg-[#152125]' 
      : 'bg-slate-50/80 dark:bg-[#10191b]';
    const rowHoverClass = 'hover:bg-[#E09F3E]/15 dark:hover:bg-[#E09F3E]/25 transition-colors duration-150';

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
        <div class="flex items-center justify-center gap-1">
          <input
            type="number"
            min="0"
            max="${dailyHours}"
            step="1"
            placeholder="0"
            data-std-id="${s.id}"
            value="${hoursOnDate > 0 ? hoursOnDate : ''}"
            class="att-day-hour-input w-16 h-7 px-1.5 py-0.5 rounded-lg border-2 text-center text-xs font-black transition-all ${
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
  }
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
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50 transition';
    tr.setAttribute('data-std-id', s.id);

    const modScores = s.moduleScores || {};

    let moduleInputsHtml = '';
    for (let m = 1; m <= moduleCount; m++) {
      const score = modScores[m];
      const val = (score !== null && score !== undefined && score !== '') ? score : '';
      moduleInputsHtml += `
        <td class="px-2 py-2.5 text-center border-x border-slate-100">
          <input
            type="number"
            min="0"
            max="100"
            placeholder="0 - 100"
            value="${val}"
            data-std-id="${s.id}"
            data-module="${m}"
            class="exam-cell-score text-center w-20 px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-purple-950 focus:ring-2 focus:ring-purple-500 focus:outline-none"
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
      <td class="px-3 py-3 text-slate-400 font-medium">${idx + 1}</td>
      <td class="px-4 py-3 font-semibold text-slate-800">
        <div>${escapeHtml(s.fullName)}</div>
        <div class="text-[10px] text-slate-400 font-mono">${escapeHtml(s.phone || '-')}</div>
      </td>
      <td class="px-3 py-3 font-mono text-slate-600">${escapeHtml(s.tcNo || '-')}</td>
      ${moduleInputsHtml}
      <td class="px-3 py-3 text-center">
        <span class="exam-row-avg text-sm font-extrabold text-purple-900" data-std-id="${s.id}">
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

  // Not değiştiğinde canlı ortalama ve durum hesaplama
  examsMatrixTbody.querySelectorAll('.exam-cell-score').forEach(input => {
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

  const institution = course.institution || course.centerName || 'Halk Eğitimi Merkezi';
  const courseName = course.name || course.title || 'Kurs';
  const instructor = course.instructor || (currentUser?.fullName || 'Kurs Eğitmeni');
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

window.closeKararDurumuPreview = function() {
  const modal = document.getElementById('kararDurumuModal');
  modal?.classList.add('hidden');
};

// Güvenli ve Zamanlamalı Yazdırma Motoru (Baskı önizlemesinin boş çıkmasını önler)
function safePrint(htmlContent, isLandscape = false) {
  const printArea = document.getElementById('printArea');
  const printAreaContent = document.getElementById('printAreaContent');
  if (!printArea || !printAreaContent) return;

  let styleTag = document.getElementById('landscapePrintStyle');
  if (isLandscape) {
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'landscapePrintStyle';
      document.head.appendChild(styleTag);
    }
    styleTag.innerHTML = `@page { size: A4 landscape !important; margin: 6mm 8mm !important; }`;
  } else {
    styleTag?.remove();
  }

  printAreaContent.innerHTML = htmlContent;
  printArea.classList.remove('hidden');

  let cleaned = false;
  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    printArea.classList.add('hidden');
    printAreaContent.innerHTML = '';
    if (isLandscape) {
      document.getElementById('landscapePrintStyle')?.remove();
    }
    window.removeEventListener('afterprint', cleanup);
  };

  window.addEventListener('afterprint', cleanup);

  setTimeout(() => {
    window.print();
    setTimeout(cleanup, 2000);
  }, 120);
}

window.triggerPrintKararDurumu = function() {
  if (!activeCourseForDetail) return;
  safePrint(generateKararDurumuHtml(activeCourseForDetail), false);
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

  const institution = course.institution || course.centerName || 'Halk Eğitimi Merkezi Müdürlüğü';
  const courseName = course.name || course.title || 'Kurs';
  const instructor = course.instructor || (currentUser?.fullName || 'Kurs Öğretmeni');
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
};

window.triggerPrintDefter = function() {
  if (!activeCourseForDetail) return;
  safePrint(generateDefterHtml(activeCourseForDetail), false);
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
  } else {
    triggerPrintKararDurumu();
  }
};

// =================== RESMİ EVRAK 3: MODÜL DEĞERLENDİRME ÇİZELGESİ (NOT ÇİZELGESİ) ===================

function generateNotCizelgesiHtml(course) {
  if (!course) return '<p class="p-6 text-center text-slate-500">Kurs bilgisi bulunamadı.</p>';

  const institution = course.institution || course.centerName || 'İBB MESLEK FABRİKASI ŞUBE MÜDÜRLÜĞÜ';
  const courseName = course.name || course.title || 'Kurs';
  const instructor = course.instructor || (currentUser?.fullName || 'Kurs Öğretmeni');
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

  const totalRows = Math.max(20, sortedStudents.length);
  const maxModules = 20;

  // Header 20 Modül Sütunları
  let moduleHeadersHtml = '';
  for (let m = 1; m <= maxModules; m++) {
    moduleHeadersHtml += `
      <th style="border: 1px solid black; width: 33px; height: 95px; padding: 2px 1px; font-size: 6.5pt; text-align: center; vertical-align: bottom; background: #fff;">
        <div style="writing-mode: vertical-lr; transform: rotate(180deg); margin: 0 auto; white-space: nowrap; line-height: 1.15; font-family: Arial, sans-serif;">
          <span style="font-weight: bold; font-size: 7pt;">${m}.Modül</span><br>
          <span style="font-size: 5.5pt; color: #333;">Teorik veya Pratik Not</span>
        </div>
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
              <td style="border: 1px solid black; text-align: center; font-size: 8pt; font-weight: bold; color: #b91c1c; padding: 1px;">
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
                <td style="border: 1px solid black; text-align: center; font-size: 8pt; font-weight: 600; padding: 1px;">
                  ${numSc}
                </td>
              `;
            } else {
              // Devam ettiği halde sınava girmediyse 'G'
              failedCount++;
              moduleCellsHtml += `
                <td style="border: 1px solid black; text-align: center; font-size: 7.5pt; font-weight: bold; color: #b45309; padding: 1px;">
                  G
                </td>
              `;
            }
          }
        } else {
          // Boş kalacak olan modüllerin not hücreleri yatay olarak çizilir
          moduleCellsHtml += `
            <td style="border: 1px solid black; text-align: center; padding: 0; position: relative; height: 20px;">
              <div style="width: 100%; border-bottom: 1.5px solid black; position: absolute; top: 50%; left: 0;"></div>
            </td>
          `;
        }
      }

      // Sonuç Belirleme:
      // 1. Devamsızlığı varsa: "Devamsız"
      // 2. Tüm modüllerden başarılı ise: docType ("Sertifika" veya "Katılım Belgesi")
      // 3. Herhangi bir modülden kaldı diğerlerinden geçti ise: "Transkript"
      // 4. Tüm modüllerden kaldıysa: "Başarısız"
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
        <tr style="height: 20px;">
          <td style="border: 1px solid black; text-align: center; font-size: 8pt; font-weight: bold; padding: 1px;">${i}</td>
          <td style="border: 1px solid black; padding: 1px 6px; font-size: 8pt; font-weight: 500; text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 180px;">${escapeHtml(sFullName)}</td>
          ${moduleCellsHtml}
          <td style="border: 1px solid black; text-align: center; font-size: 7.5pt; font-weight: bold; color: ${sonucColor}; padding: 1px; white-space: nowrap;">
            ${sonucText}
          </td>
        </tr>
      `;
    } else {
      // Boş satırlar (en az 20 satıra tamamlamak için)
      let emptyCellsHtml = '';
      for (let m = 1; m <= maxModules; m++) {
        if (m <= moduleCount) {
          emptyCellsHtml += `<td style="border: 1px solid black; padding: 0;">&nbsp;</td>`;
        } else {
          emptyCellsHtml += `
            <td style="border: 1px solid black; text-align: center; padding: 0; position: relative; height: 20px;">
              <div style="width: 100%; border-bottom: 1.5px solid black; position: absolute; top: 50%; left: 0;"></div>
            </td>
          `;
        }
      }

      rowsHtml += `
        <tr style="height: 20px;">
          <td style="border: 1px solid black; text-align: center; font-size: 8pt; font-weight: bold; padding: 1px;">${i}</td>
          <td style="border: 1px solid black; padding: 1px 6px;">&nbsp;</td>
          ${emptyCellsHtml}
          <td style="border: 1px solid black; padding: 0;">&nbsp;</td>
        </tr>
      `;
    }
  }

  return `
    <div class="not-cizelgesi-document" style="font-family: Arial, Helvetica, sans-serif; color: #000; line-height: 1.25; width: 100%; max-width: 1060px; margin: 0 auto; background: #fff; padding: 20px 25px; box-sizing: border-box;">
      
      <!-- BAŞLIK -->
      <div style="text-align: center; margin-bottom: 12px;">
        <h2 style="font-size: 11pt; font-weight: bold; margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">
          ${escapeHtml(institution)}
        </h2>
        <h1 style="font-size: 12.5pt; font-weight: bold; margin: 3px 0 0 0; text-transform: uppercase; letter-spacing: 1px;">
          MODÜL DEĞERLENDİRME ÇİZELGESİ
        </h1>
      </div>

      <!-- KURS BİLGİLERİ (3 SÜTUN) -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; font-size: 8.5pt; margin-bottom: 10px; line-height: 1.6;">
        
        <!-- Sol Sütun -->
        <table style="border-collapse: collapse; border: none; font-size: 8.5pt;">
          <tr>
            <td style="font-weight: bold; width: 110px;">Kurs Adı</td>
            <td style="font-weight: bold; width: 15px;">:</td>
            <td style="font-weight: 600;">${escapeHtml(courseName)}</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Kurs No</td>
            <td style="font-weight: bold;">:</td>
            <td style="font-family: monospace;">${escapeHtml(courseNumber)}</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Düzenlendiği Yer</td>
            <td style="font-weight: bold;">:</td>
            <td>${escapeHtml(classroom)}</td>
          </tr>
        </table>

        <!-- Orta Sütun -->
        <table style="border-collapse: collapse; border: none; font-size: 8.5pt;">
          <tr>
            <td style="font-weight: bold; width: 85px;">Modül Sayısı</td>
            <td style="font-weight: bold; width: 15px;">:</td>
            <td style="font-weight: bold; font-size: 9pt;">${moduleCount}</td>
          </tr>
        </table>

        <!-- Sağ Sütun -->
        <table style="border-collapse: collapse; border: none; font-size: 8.5pt;">
          <tr>
            <td style="font-weight: bold; width: 95px;">Başlama Tarihi</td>
            <td style="font-weight: bold; width: 15px;">:</td>
            <td>${startDate}</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Bitiş Tarihi</td>
            <td style="font-weight: bold;">:</td>
            <td>${endDate}</td>
          </tr>
        </table>

      </div>

      <!-- NOT ÇİZELGESİ ANA TABLOSU -->
      <table style="width: 100%; border-collapse: collapse; border: 1.5px solid black; font-size: 7.5pt;">
        <thead>
          <tr style="background: #fafafa;">
            <th rowspan="2" style="border: 1px solid black; width: 28px; text-align: center; font-weight: bold; font-size: 7.5pt;">
              Sıra<br>No
            </th>
            <th rowspan="2" style="border: 1px solid black; width: 180px; position: relative; padding: 0; min-width: 160px; background: #fff;">
              <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;" preserveAspectRatio="none" viewBox="0 0 100 100">
                <line x1="0" y1="0" x2="100" y2="100" stroke="black" stroke-width="0.8" />
              </svg>
              <div style="position: absolute; top: 6px; right: 8px; font-size: 6.5pt; font-weight: bold; text-align: right; line-height: 1.15;">
                Modül<br>Kodu / Adı
              </div>
              <div style="position: absolute; bottom: 6px; left: 8px; font-size: 6.5pt; font-weight: bold; text-align: left; line-height: 1.15;">
                Kursiyerin Adı Soyadı
              </div>
            </th>
            <th colspan="${maxModules}" style="border: 1px solid black; text-align: center; font-weight: bold; font-size: 8pt; padding: 4px; letter-spacing: 0.5px;">
              MODÜL DEĞERLENDİRME NOTU
            </th>
            <th style="border: 1px solid black; width: 85px; text-align: center; font-weight: bold; font-size: 8pt; padding: 4px;">
              SONUÇ
            </th>
          </tr>
          <tr style="background: #fff;">
            ${moduleHeadersHtml}
            <th style="border: 1px solid black; width: 85px; padding: 2px; font-size: 5.5pt; text-align: center; font-weight: normal; line-height: 1.25;">
              Tüm modüller başarılı ise<br>
              <strong style="font-size: 6.5pt;">"${escapeHtml(docType)}"</strong><br>
              <span style="color: #444; font-size: 5pt;">Transkript / Başarısız / Devamsız</span>
            </th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>

      <!-- ALT AÇIKLAMA NOTLARI VE İMZA -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-top: 10px; font-size: 7pt; line-height: 1.4;">
        
        <!-- Notlar -->
        <div style="max-width: 72%;">
          <div><strong>NOT :</strong></div>
          <div><strong>1-</strong> Modüller, öğrenme faaliyetlerindeki teorik ve uygulamalı tüm içeriği kapsadığından teorik/pratik ayrımı gözetilmeksizin tek değerlendirme yapılır.</div>
          <div><strong>2-</strong> Modül sonunda yapılacak değerlendirmenin (Yazılı, sözlü ve uygulama notlarından biri ya da birkaçının ortalaması) aritmetik ortalaması alınarak işlenecektir.</div>
          <div><strong>3-</strong> Kursiyerlerin devam etmediği modüllere <strong>(D)</strong>, devam ettiği halde çeşitli nedenlerle sınava girmediyse <strong>(G)</strong> harfi işlenecektir.</div>
          <div style="display: flex; align-items: center; gap: 4px;">
            <span><strong>4-</strong> Boş kalacak olan modüllerin not hücreleri</span>
            <span style="display: inline-block; width: 35px; border-bottom: 1.5px solid black; vertical-align: middle; margin: 0 4px;"></span>
            <span>şeklinde yatay olarak çizilmelidir.</span>
          </div>
        </div>

        <!-- Öğretmen İmza Alanı -->
        <div style="text-align: center; min-width: 190px; margin-top: 4px;">
          <div style="font-size: 7.5pt;">... / ... / 202...</div>
          <div style="margin-top: 24px; font-weight: bold; font-size: 8.5pt;">${escapeHtml(instructor)}</div>
          <div style="font-size: 7pt; color: #222;">Adı Soyadı - İmzası</div>
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
};

window.triggerPrintNotCizelgesi = function() {
  if (!activeCourseForDetail) return;
  safePrint(generateNotCizelgesiHtml(activeCourseForDetail), true);
};

// =================== RESMİ EVRAK 4: SINAV TUTANAĞI (SINAV KATILIM LİSTESİ) ===================

function generateSinavTutanagiHtml(course) {
  if (!course) return '<p class="p-6 text-center text-slate-500">Kurs bilgisi bulunamadı.</p>';

  const institution = course.institution || course.centerName || 'İBB MESLEK FABRİKASI ŞUBE MÜDÜRLÜĞÜ';
  const courseName = course.name || course.title || 'Kurs';
  const instructor = course.instructor || (currentUser?.fullName || 'Kurs Eğitmeni');

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
};

window.triggerPrintSinavTutanagi = function() {
  if (!activeCourseForDetail) return;
  safePrint(generateSinavTutanagiHtml(activeCourseForDetail), false);
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
};

window.triggerPrintImzaListesi = function() {
  if (!activeCourseForDetail) return;
  safePrint(generateImzaListesiHtml(activeCourseForDetail), true);
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
