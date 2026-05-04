#!/bin/bash
git checkout 9a2b0e66f91ae3ecd98f12f1757665e6fadf00a6 -- _archive/pricing
git add .
git commit -m "chore: restore pricing archive directory"
git push
