#!/bin/bash
set -e
REGION="us-east-1"
ECR_BASE_URI="487409145731.dkr.ecr.us-east-1.amazonaws.com"

# 1. Install Docker if missing
if ! command -v docker &> /dev/null
then
    echo "Docker not found. Installing..."
    sudo apt-get update
    sudo apt-get install -y docker.io
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo usermod -aG docker ubuntu
fi

# 2. Install AWS CLI if missing (Official Method)
if ! command -v aws &> /dev/null
then
    echo "AWS CLI not found. Installing..."
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
    sudo apt-get install -y unzip
    unzip -o awscliv2.zip
    sudo ./aws/install --update
    rm -rf aws awscliv2.zip
fi

echo "Logging into ECR..."
aws ecr get-login-password --region $REGION | sudo docker login --username AWS --password-stdin $ECR_BASE_URI

echo "Creating Docker network..."
sudo docker network create freights-net || true

echo "Stopping old containers..."
sudo docker rm -f backend frontend admin background || true

echo "Pulling latest images..."
sudo docker pull $ECR_BASE_URI/freights-management-app:latest
sudo docker pull $ECR_BASE_URI/freights-management-frontend:latest
sudo docker pull $ECR_BASE_URI/freights-management-admin:latest
sudo docker pull $ECR_BASE_URI/freights-management-background:latest

echo "Starting new containers..."
sudo docker run -d --name backend --net freights-net --restart unless-stopped -p 8000:8000 \
  -e DB="mongodb+srv://theenkabandara:test1234@cluster0.rdjc9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" \
  -e PORT=8000 \
  -e PASS="parcel@2025" \
  -e JWT_SEC="parcel12345" \
  $ECR_BASE_URI/freights-management-app:latest

sudo docker run -d --name frontend --net freights-net --restart unless-stopped -p 80:80 \
  $ECR_BASE_URI/freights-management-frontend:latest

sudo docker run -d --name admin --net freights-net --restart unless-stopped -p 3000:80 \
  $ECR_BASE_URI/freights-management-admin:latest

sudo docker run -d --name background --net freights-net --restart unless-stopped \
  -e DB="mongodb+srv://theenkabandara:test1234@cluster0.rdjc9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" \
  $ECR_BASE_URI/freights-management-background:latest

echo "Deployment handled successfully!"