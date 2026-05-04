#!/bin/bash
# Reset to the commit before 'refactor: remove final traces of AI terminology from project'
# 7884ce6bba20808c2f3c13b3705d8141257713b7 is the commit to remove.
# 9a2b0e66f91ae3ecd98f12f1757665e6fadf00a6 is the parent.

git reset --soft 9a2b0e66f91ae3ecd98f12f1757665e6fadf00a6
git add .
git commit -m "refactor: standardize platform terminology and human-centric brand voice"
git push --force
