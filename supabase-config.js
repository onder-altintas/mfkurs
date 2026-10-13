// =====================================================================
// SUPABASE İSTEMCİ & BAĞLANTI YAPILANDIRMASI
// =====================================================================

const DEFAULT_SUPABASE_CONFIG = {
  url: 'https://jomeyxlobmqmimyvnoks.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvbWV5eGxvYm1xbWlteXZub2tzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE1NDM1ODksImV4cCI6MjEwNzExOTU4OX0.qJyvn6oJ5NnoPFsJlulvSc2BCk9JNMILYYG359uS3ow'
};

let supabaseClient = null;

function initSupabase(url = null, anonKey = null) {
  const targetUrl = url || localStorage.getItem('supabase_url') || DEFAULT_SUPABASE_CONFIG.url;
  const targetKey = anonKey || localStorage.getItem('supabase_anon_key') || DEFAULT_SUPABASE_CONFIG.anonKey;

  if (!targetUrl || !targetKey) {
    console.warn("⚠️ Supabase URL ve Anon Key henüz tanımlanmamış.");
    return null;
  }

  try {
    if (window.supabase && typeof window.supabase.createClient === 'function') {
      supabaseClient = window.supabase.createClient(targetUrl, targetKey);
      localStorage.setItem('supabase_url', targetUrl);
      localStorage.setItem('supabase_anon_key', targetKey);
      console.log("✅ Supabase İstemcisi Başarıyla Başlatıldı:", targetUrl);
      return supabaseClient;
    } else {
      console.error("❌ Supabase JS kütüphanesi yüklenemedi.");
      return null;
    }
  } catch (err) {
    console.error("❌ Supabase başlatma hatası:", err);
    return null;
  }
}

function getSupabase() {
  if (!supabaseClient) {
    supabaseClient = initSupabase();
  }
  return supabaseClient;
}

window.initSupabase = initSupabase;
window.getSupabase = getSupabase;
