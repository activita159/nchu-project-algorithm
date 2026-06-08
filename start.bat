@echo off
echo =====================================
echo  ML Algorithm Learning Platform
echo =====================================
echo.
echo Starting Backend (FastAPI on port 8000)...
start "ML-Backend" cmd /c "cd /d %~dp0backend && python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload"
echo.
echo Starting Frontend (Next.js on port 3000)...
start "ML-Frontend" cmd /c "cd /d %~dp0frontend && npm run dev"
echo.
echo Both servers starting...
echo Frontend: http://localhost:3000
echo Backend API: http://localhost:8000
echo.
echo Close this window after both are running.
pause
