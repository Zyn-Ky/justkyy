#!/bin/bash
cd /home/ubuntu/next-app
npx pm2 restart next-app || npx pm2 start || npm --name "next-app" -- start
