@echo off
chcp 65001 >nul
title Kurum Ici Yerel Sunucu (Kurulumsuz)
cls

cd /d "%~dp0"
echo Kurum ici test sunucusu baslatiliyor (Sifir Kurulum - Standart TCP Motoru)...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"

pause
