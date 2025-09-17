#!/bin/bash
# Auto push script: pull, add, commit, and push (Git Bash / Windows)

# Navigate to your frontend project folder (change if needed)
cd ~/primepicks-frontend || exit

# Pull latest changes from remote with rebase
echo "⏳ Pulling latest changes from remote..."
git pull origin main --rebase

# Stage all local changes
git add .

# Commit changes
if [ -z "$1" ]; then
  git commit -m "Update frontend code"
else
  git commit -m "$1"
fi

# Push changes to remote
git push origin main

echo "✅ Updates pushed to GitHub successfully!"
