#!/bin/bash

# This line ensures that the script will exit immediately if any command fails.
set -e

# Fix Volume Permissions
sudo chown -R $(whoami): /commandhistory

git clone -b 2027 --single-branch https://github.com/gcastillo56/com111-class.git 2027-1
