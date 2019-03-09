#!/bin/bash
if [ "$NODE_ENV" = "production" ] 
then
   git pull origin master
   echo "[Abayro]: I've deployed the latest build from master(Stable Build)"
else
   git pull origin release/v4
   echo "[Abayro]: I've deployed the latest build from V4 release."
fi