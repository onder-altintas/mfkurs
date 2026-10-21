@echo off
chcp 65001 >nul
title Kurum İçi Test Sunucusu
cls

echo ===============================================================
echo     KURUM İÇİ YEREL AĞ TEST SUNUCUSU BAŞLATILIYOR...
echo ===============================================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [HATA] Bu bilgisayarda Node.js kurulu görünmüyor!
    echo.
    echo Sunucuyu başlatabilmek için bu tek ana bilgisayara Node.js kurulmalıdır:
    echo 1. https://nodejs.org/en adresinden "LTS" sürümünü indirin.
    echo 2. Kurulumu tamamladıktan sonra bu dosyaya tekrar çift tıklayın.
    echo.
    echo (Not: Bu kurulum SADECE sunucunun duracağı BU BİLGİSAYARDA 1 kez yapılır.
    echo  Diğer 100 bilgisayara hiçbir şey kurulmayacaktır.)
    echo.
    pause
    exit /b
)

echo Node.js tespit edildi. Sunucu çalıştırılıyor...
echo.
node server.js
pause
