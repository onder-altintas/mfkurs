@echo off
chcp 65001 >nul
title Kurs Sistemi Uygulama Penceresi
cls

:: Sunucunun yerel IP adresi veya localhost
:: Eğer bu dosya sunucunun olduğu bilgisayarda çalışıyorsa localhost açılır.
:: Ağdaki diğer bilgisayarlar için IP adresi aşağıdaki değişkene yazılabilir veya kullanıcıya sorulabilir.

set TARGET_URL=http://localhost:3000

if exist "sunucu_ip.txt" (
    set /p TARGET_URL=<sunucu_ip.txt
)

echo Kurs Sistemi Başlatılıyor: %TARGET_URL%

:: Microsoft Edge uygulamasını masaüstü penceresi modunda başlat (Adres çubuğu olmadan)
start msedge --app="%TARGET_URL%"

exit
