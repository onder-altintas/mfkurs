@echo off
chcp 65001 >nul
title Kurum Ici Test Sunucusu
cls

echo ===============================================================
echo     KURUM ICI YEREL AG TEST SUNUCUSU BASLATILIYOR...
echo ===============================================================
echo.

:: 1. Sistemde PATH icinde node var mi?
set NODE_EXE=
where node >nul 2>nul
if %errorlevel% equ 0 (
    set NODE_EXE=node
    goto :start_node
)

:: 2. Program Files altinda kurulu mu?
if exist "C:\Program Files\nodejs\node.exe" (
    set NODE_EXE="C:\Program Files\nodejs\node.exe"
    goto :start_node
)

:: 3. Ayni klasorde tasinabilir node.exe var mi?
if exist "%~dp0node.exe" (
    set NODE_EXE="%~dp0node.exe"
    goto :start_node
)

:: Eger hicbiri yoksa hata goster ve PowerShell sunucusuna yonlendir
echo [BILGI] Bu bilgisayarda Node.js kurulu gorunmuyor.
echo.
echo Iki seceneginiz var:
echo.
echo [SECENEK 1 - SIFIR KURULUM]:
echo "1_BASLAT_KURULUMSUZ_POWERSHELL.bat" dosyasini calistirabilirsiniz.
echo Bu yontem hicbir program veya Node.js kurmadan Windows'un kendi
echo altyapisiyla sunucuyu HEMEN baslatir.
echo.
echo [SECENEK 2 - NODE.JS KURULUMU]:
echo https://nodejs.org adresinden Node.js indirip kurabilirsiniz.
echo.
echo ===============================================================
echo Simdi Kurulumsuz PowerShell sunucusu baslatilsin mi? (E/H)
set /p SECIM="Seciminiz: "
if /i "%SECIM%"=="E" (
    goto :run_powershell
)
pause
exit /b

:start_node
echo Node.js bulundu. Sunucu baslatiliyor...
echo.
cd /d "%~dp0"
%NODE_EXE% server.js
pause
exit /b

:run_powershell
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
exit /b
