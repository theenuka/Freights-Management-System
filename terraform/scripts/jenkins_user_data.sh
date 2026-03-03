#!/bin/bash
# Jenkins Server Installation Script
# Project: ${project_name}

set -e
exec > >(tee /var/log/jenkins-setup.log) 2>&1

echo "=== Starting Jenkins Server Setup ==="

# ── Swap space (extra buffer for t3.small / 2 GB RAM) ───────────────────────
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
# Reduce swap aggressiveness so RAM is preferred
echo 'vm.swappiness=10' >> /etc/sysctl.conf
sysctl -p
echo "=== Swap enabled (2 GB) ==="

# Update system
apt-get update -y
apt-get upgrade -y

# Install Java (required for Jenkins)
apt-get install -y fontconfig openjdk-17-jre

# Add Jenkins repository (current key as of 2025)
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | \
  gpg --dearmor -o /usr/share/keyrings/jenkins-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.gpg] https://pkg.jenkins.io/debian-stable binary/" | \
  tee /etc/apt/sources.list.d/jenkins.list > /dev/null

# Install Jenkins
apt-get update -y
apt-get install -y jenkins

# Jenkins JVM heap for t3.small (2 GB RAM) — give Jenkins 1 GB, leave 1 GB for OS/Docker
mkdir -p /etc/systemd/system/jenkins.service.d
cat > /etc/systemd/system/jenkins.service.d/override.conf <<'EOF'
[Service]
Environment="JAVA_OPTS=-Xms256m -Xmx1g -XX:+UseG1GC -Djava.awt.headless=true"
EOF
systemctl daemon-reload

# Start Jenkins
systemctl enable jenkins
systemctl start jenkins

# Install Docker
apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Add jenkins user to docker group
usermod -aG docker jenkins

# Start Docker
systemctl enable docker
systemctl start docker

# Install Terraform
wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/hashicorp.list
apt-get update -y
apt-get install -y terraform

# Install Ansible
apt-get install -y software-properties-common
add-apt-repository --yes --update ppa:ansible/ansible
apt-get install -y ansible

# Install AWS CLI v2
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "/tmp/awscliv2.zip"
apt-get install -y unzip
unzip /tmp/awscliv2.zip -d /tmp
/tmp/aws/install
rm -rf /tmp/awscliv2.zip /tmp/aws

# Install Git
apt-get install -y git

# Install useful tools
apt-get install -y jq htop curl wget

# Restart Jenkins to pick up docker group
systemctl restart jenkins

# Wait for Jenkins to start and get initial password
sleep 30

echo "=== Jenkins Setup Complete ==="
echo "Jenkins Initial Admin Password:"
cat /var/lib/jenkins/secrets/initialAdminPassword
echo ""
echo "Access Jenkins at: http://<PUBLIC_IP>:8080"
