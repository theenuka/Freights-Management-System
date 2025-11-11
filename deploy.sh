#!/bin/bash
set -e
REGION="us-east-1"
# ඔයාගේ ECR මූලික URI එක
ECR_BASE_URI="487409145731.dkr.ecr.us-east-1.amazonaws.com"

echo "Logging into ECR..."
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ECR_BASE_URI

echo "Creating Docker network..."
docker network create freights-net || true

echo "Stopping old containers..."
docker rm -f backend frontend admin background || true

echo "Pulling latest images..."
docker pull $ECR_BASE_URI/freights-management-app:latest
docker pull $ECR_BASE_URI/freights-management-frontend:latest
docker pull $ECR_BASE_URI/freights-management-admin:latest
docker pull $ECR_BASE_URI/freights-management-background:latest

echo "Starting new containers..."
# 1. Backend
docker run -d --name backend --net freights-net --restart unless-stopped -p 8000:8000   -e MONGO_URL="mongodb://mongo:27017/freights"   $ECR_BASE_URI/freights-management-app:latest

# 2. Frontend (Runs on port 80)
docker run -d --name frontend --net freights-net --restart unless-stopped -p 80:80   $ECR_BASE_URI/freights-management-frontend:latest

# 3. Admin (Runs on port 3000)
docker run -d --name admin --net freights-net --restart unless-stopped -p 3000:80   $ECR_BASE_URI/freights-management-admin:latest

# 4. Background Service
docker run -d --name background --net freights-net --restart unless-stopped   -e MONGO_URL="mongodb://mongo:27017/freights"   $ECR_BASE_URI/freights-management-background:latest

echo "Deployment handled successfully!"
