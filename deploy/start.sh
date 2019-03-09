#!/bin/bash
echo "[Abayro]: I'am killing the current build"
pm2 kill || killall node
echo "[Abayro]: Install all required deps"
npm i --production
echo "[Abayro]: Prune packages I don't need!"
npm prune --production
echo "[Abayro]: Starting...."
npm start
fi