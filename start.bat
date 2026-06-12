@echo off
echo =====================================
echo  ML Algorithm Learning Platform
echo =====================================
echo.
echo Starting Streamlit app on port 3000...
echo.
cd /d "%~dp0"
streamlit run app.py --server.port 3000
pause