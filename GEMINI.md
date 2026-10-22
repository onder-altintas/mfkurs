# Proje Kuralları

- **GitHub Push Kapalı (Yerel Çalışma)**: Kullanıcının talimatı doğrultusunda bu projedeki değişiklikler artık kesinlikle GitHub'a (remote repo) push EDİLMEYECEKTİR. Tüm geliştirmeler sadece yerel makinede kalacaktır.
- **Veri Ekleme Yasağı & Boş Veritabanı İlkesi**: Kullanıcı özellikle ve açıkça talep etmedikçe sisteme kesinlikle hiçbir varsayılan, örnek, dummy kurs, şablon, alan veya test verisi eklenmemelidir. Veritabanı boşsa kesinlikle boş kalmalı; hiçbir otomatik tohumlama (seeding), varsayılan geri yükleme (`DEFAULT_COURSE_TEMPLATES`, `DEFAULT_CENTERS`, `DEFAULT_AREAS` vb.) fonksiyonu çalıştırılmamalıdır. Veri tanımlama ve yönetimi tamamen kullanıcının inisiyatifindedir.
- **Veritabanı Sıfırlama ve Değişiklik Öncesi Otomatik Yedekleme**: Gelecekte herhangi bir prompt veya işlemde veritabanı yapısının sıfırlanması veya migrasyonu gerekiyorsa; işlem yapılmadan ÖNCE verilerin eksiksiz bir yedeği alınmalı, değişiklikler uygulandıktan sonra kullanıcının mevcut verileri bu yeni yapıya uygun olarak geri yüklenmeli ve kullanıcı bu süreç hakkında detaylıca bilgilendirilmelidir.

