#!/bin/bash
cd /home/ec2-user/next-app
npx pm2 restart next-app || npx pm2 start || npm --name "next-app" -- start
