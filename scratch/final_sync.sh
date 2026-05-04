#!/bin/bash
# Re-sync everything
npm i
git add .
git commit -m "chore: ensure all dependencies and branding fixes are synced"
git push
