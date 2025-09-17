@echo off
REM Auto Push Frontend to GitHub (Windows)

REM Change to your project directory
cd /d C:\Users\EMMANUEL\primepicks\primepicks-frontend

REM Fetch and merge remote changes safely
echo Fetching latest changes...
git fetch origin
git merge origin/main --allow-unrelated-histories -m "Merge remote changes"

REM Stage all changes
git add .

REM Commit with message (first argument) or default
IF "%1"=="" (
    git commit -m "Update frontend code"
) ELSE (
    git commit -m "%1"
)

REM Push to GitHub
git push origin main

echo.
echo ✅ Updates pushed to GitHub successfully!
pause
