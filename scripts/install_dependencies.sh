#!/bin/bash
cd /home/ubuntu/next-app
npm install pm2 -g
npm install --production
npm run build