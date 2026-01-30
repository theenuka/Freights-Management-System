#!/bin/bash
# User data script for EC2 instance initialization
# Project: ${project_name}

set -e

# Update system packages
apt-get update -y
apt-get upgrade -y

# Install Docker
apt-get install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Start and enable Docker
systemctl start docker
systemctl enable docker

# Add ubuntu user to docker group
usermod -aG docker ubuntu

# Install useful utilities
apt-get install -y htop curl wget unzip jq

# Create app directory
mkdir -p /opt/${project_name}
chown ubuntu:ubuntu /opt/${project_name}

# Log completion
echo "User data script completed at $(date)" >> /var/log/user-data.log
