#!/bin/bash
set -e
cd /root/echophrase
git pull origin main
npm install
npm run build
sudo systemctl restart echophrase
echo "Deploy complete!"
