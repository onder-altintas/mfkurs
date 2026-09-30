# 🎓 Kurs Sonu Evrak, Müfredat & Kullanıcı Yönetim Sistemi

Kurs merkezleri tanımlama, her saat için ders müfredatı hazırlama, kullanıcı hesapları ve şifre yönetimi, kursiyer takibi ve kurs sonu resmi evraklarının şablonlara uygun şekilde otomatik oluşturulmasını sağlayan tam kapsamlı web uygulaması.

---

## 🚀 Hızlı Başlangıç

### Yöntem 1: Yerel Sunucu
```bash
node server.js
```
Tarayıcınızda açın: **[http://localhost:3000](http://localhost:3000)**

### Yöntem 2: Doğrudan Açma
`index.html` dosyasına çift tıklayarak tarayıcınızda sıfır kurulumla çalıştırabilirsiniz.

---

## 🔑 Tanımlı Test Hesapları

Giriş ekranında yer alan tek tıkla giriş butonlarını kullanabilir ya da aşağıdaki bilgileri girebilirsiniz:

| Rol | Kullanıcı Adı | Şifre | Yetkileri |
| :--- | :--- | :--- | :--- |
| **Sistem Yöneticisi (Admin)** | `admin` | `123` | **Sadece Admin giriş yapabilir.** Kullanıcı hesapları oluşturur, şifreleri görür ve değiştirir, Admin yetkisi atar, merkez ve müfredatları yönetir. |
| **Eğitmen 1** | `egitmen1` | `123456` | Ahmet Yılmaz (Bilişim Teknolojileri Eğitmeni - Yalnızca kendi kurslarını görür). |
| **Eğitmen 2** | `egitmen2` | `123456` | Ayşe Demir (El Sanatları Eğitmeni - Yalnızca kendi kurslarını görür). |

---

## ✨ Sistem Özellikleri

### 1. 🛡️ Admin Paneli & Güvenlik
- **Yalnızca Admin Girişi:** Normal eğitmenler admin paneline kesinlikle erişemez.
- **Kullanıcı Yönetimi:**
  - Sistemdeki tüm kayıtlı kullanıcıları listeleme.
  - **Yeni Kullanıcı Hesabı Ekleme:** Kullanıcı adı, şifre, ad soyad, unvan, kurum ve yetki (Eğitmen / Admin) belirleme.
  - **Mevcut Şifreleri Görme ve Değiştirme:** Tüm kullanıcıların şifreleri tabloda görünür ve istenildiğinde anında güncellenebilir.
  - **Admin Yetkisi Verme / Kaldırma:** Eğitmen bir kullanıcıya tek tıkla Admin yetkisi tanımlayabilir ya da geri alabilirsiniz.
  - **Kullanıcı Silme:** İstenmeyen hesapları sistemden kaldırabilme.
- **Kurs Merkezleri Yönetimi:** Yalnızca merkez adlarını sade bir şekilde ekleme, düzenleme ve silme.
- **Kurs ve Saatlik Müfredat Planları:** Her ders saati için anlatılacak resmi konu dağılımını tek tek veya toplu olarak tanımlama.

### 2. 👨‍🏫 Eğitmen Paneli
- Eğitmenler sadece kendi kurslarını ve kursiyerlerini yönetir.
- Kurs açarken adminin tanımladığı hazır merkezlerden ve müfredat şablonlarından tek tıkla kurs oluşturabilir.

### 3. 📄 Resmi Evrak & Çıktı Çizelgeleri
- Sınav Değerlendirme Tutanağı
- Not ve Başarı Çizelgesi
- Sertifika Basım Listesi
- Ders Defteri & Saatlik Konu Dağılım Çizelgesi
