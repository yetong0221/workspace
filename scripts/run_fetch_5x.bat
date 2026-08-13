@echo off
setlocal
cd /d "%~dp0.."
set "PY=C:\Program Files\Python312\python.exe"
set "LOG=%~dp0fetch_log.log"
set "PYTHONIOENCODING=utf-8"

echo.>> "%LOG%"
echo ===== RUN START %date% %time% =====>> "%LOG%"
"%PY%" scripts\fetch_ai_posts.py >> "%LOG%" 2>&1
ping -n 6 127.0.0.1 >nul
"%PY%" scripts\fetch_ai_posts.py >> "%LOG%" 2>&1
ping -n 6 127.0.0.1 >nul
"%PY%" scripts\fetch_ai_posts.py >> "%LOG%" 2>&1
ping -n 6 127.0.0.1 >nul
"%PY%" scripts\fetch_ai_posts.py >> "%LOG%" 2>&1
ping -n 6 127.0.0.1 >nul
"%PY%" scripts\fetch_ai_posts.py >> "%LOG%" 2>&1
echo ===== RUN END %date% %time% =====>> "%LOG%"
endlocal
