#!/bin/bash
# Reset to before the 'admin@buildunix.com' commit to consolidate authorship
git reset --soft 033e77e
git add .
git commit -m "chore: standardize platform branding, integrate analytics, and refine site-wide metadata"
git push --force
