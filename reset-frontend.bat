@echo off
echo ==============================
echo 🔥 Resetting primepicks-frontend repo
echo ==============================

cd %USERPROFILE%\Projects\primepicks-frontend

:: Remove old git history
rmdir /s /q .git

:: Reinitialize git
git init
git add .
git commit -m "Fresh start: clean frontend repo"
git branch -M main
git remote add origin https://github.com/vault9-repo/primepicks-frontend.git

:: Force push to GitHub
git push -u origin main --force

echo.
echo ✅ Frontend repo has been cleaned and pushed!
pause
