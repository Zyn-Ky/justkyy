#!/bin/bash
cd /home/ec2-user/next-app
pm2 restart next-app || pm2 start npm --name "next-app" -- start
