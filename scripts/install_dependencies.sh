#!/bin/bash
cd /home/ec2-user/next-app
npm install pm2 -g
npm install --production
npm run build