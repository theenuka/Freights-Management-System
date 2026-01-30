# Freights Management System - Setup Guide

Complete guide to deploy the Freights Management System using Jenkins, DockerHub, Terraform, and Ansible on AWS.

## Prerequisites

- AWS Free Tier Account
- DockerHub Account
- Git installed locally
- Jenkins server (can be local or on EC2)

---

## Step 1: AWS Account Setup

### 1.1 Create IAM User for Jenkins

1. Go to AWS Console → IAM → Users → Create User
2. User name: `jenkins-deployer`
3. Attach policies:
   - `AmazonEC2FullAccess`
   - `AmazonS3FullAccess`
   - `AmazonDynamoDBFullAccess`

4. Create access keys:
   - Go to Security credentials tab
   - Create access key → Application running outside AWS
   - Save the Access Key ID and Secret Access Key

### 1.2 Create S3 Bucket for Terraform State

```bash
# Get your AWS Account ID
aws sts get-caller-identity --query Account --output text

# Create S3 bucket (replace ACCOUNT_ID with your actual ID)
aws s3api create-bucket \
  --bucket freights-tf-state-ACCOUNT_ID \
  --region us-east-1

# Enable versioning
aws s3api put-bucket-versioning \
  --bucket freights-tf-state-ACCOUNT_ID \
  --versioning-configuration Status=Enabled

# Enable encryption
aws s3api put-bucket-encryption \
  --bucket freights-tf-state-ACCOUNT_ID \
  --server-side-encryption-configuration '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}'
```

### 1.3 Create DynamoDB Table for State Locking

```bash
aws dynamodb create-table \
  --table-name freights-tf-lock \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region us-east-1
```

### 1.4 Create EC2 Key Pair

```bash
aws ec2 create-key-pair \
  --key-name freights-dev-key \
  --query 'KeyMaterial' \
  --output text > ~/.ssh/freights-dev-key.pem

chmod 400 ~/.ssh/freights-dev-key.pem
```

### 1.5 Update Terraform Backend

Edit `terraform/backend.tf` and replace `ACCOUNT_ID` with your AWS account ID:

```hcl
terraform {
  backend "s3" {
    bucket         = "freights-tf-state-YOUR_ACCOUNT_ID"
    key            = "freights-management/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "freights-tf-lock"
  }
}
```

---

## Step 2: DockerHub Setup

### 2.1 Create Repositories

1. Go to [hub.docker.com](https://hub.docker.com)
2. Create these repositories:
   - `theenukabandara/freights-backend`
   - `theenukabandara/freights-frontend`
   - `theenukabandara/freights-admin`
   - `theenukabandara/freights-background`

### 2.2 Generate Access Token

1. Go to Account Settings → Security → New Access Token
2. Description: `jenkins-ci`
3. Permissions: Read & Write
4. Save the token securely

---

## Step 3: MongoDB Atlas Setup (Optional - for Production)

### 3.1 Create Free Cluster

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free M0 cluster
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (for dynamic EC2 IPs)
5. Get connection string

---

## Step 4: Jenkins Setup

### 4.1 Install Jenkins (on EC2 or Local)

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y openjdk-17-jdk
wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt update
sudo apt install -y jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins
```

### 4.2 Install Required Plugins

Go to Manage Jenkins → Plugins → Available:

- Docker Pipeline
- Pipeline
- SSH Agent
- Credentials Binding
- Git
- Terraform (optional)
- AnsiColor (for colored output)

### 4.3 Install Tools on Jenkins Server

```bash
# Docker
sudo apt install -y docker.io
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins

# Terraform
wget https://releases.hashicorp.com/terraform/1.5.7/terraform_1.5.7_linux_amd64.zip
unzip terraform_1.5.7_linux_amd64.zip
sudo mv terraform /usr/local/bin/

# Ansible
sudo apt install -y ansible

# AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

### 4.4 Configure Jenkins Credentials

Go to Manage Jenkins → Credentials → System → Global credentials:

| Credential ID | Type | Description |
|--------------|------|-------------|
| `dockerhub-credentials` | Username with password | DockerHub username + access token |
| `aws-access-key-id` | Secret text | AWS Access Key ID |
| `aws-secret-access-key` | Secret text | AWS Secret Access Key |
| `ec2-ssh-key` | SSH Username with private key | Ubuntu + freights-dev-key.pem content |
| `ansible-vault-password` | Secret text | Your Ansible vault password |

### 4.5 Create Pipeline Job

1. New Item → Pipeline
2. Name: `freights-management-pipeline`
3. Pipeline:
   - Definition: Pipeline script from SCM
   - SCM: Git
   - Repository URL: Your GitHub repo URL
   - Branch: `*/main`
   - Script Path: `Jenkinsfile`

---

## Step 5: Ansible Vault Setup

### 5.1 Create Vault File

```bash
cd ansible

# Copy example file
cp group_vars/vault.yml.example group_vars/vault.yml

# Edit with your values
nano group_vars/vault.yml
```

### 5.2 Add Your Secrets

```yaml
# DockerHub credentials
vault_dockerhub_password: "your_dockerhub_access_token"

# MongoDB connection string
vault_db_string: "mongodb+srv://user:pass@cluster.mongodb.net/fms?retryWrites=true&w=majority"

# Backend secrets
vault_backend_pass: "your_strong_aes_key_here"
vault_backend_jwt: "your_strong_jwt_secret_here"

# Email service (optional)
vault_email_user: "your_email@gmail.com"
vault_email_pass: "your_app_password"
```

### 5.3 Encrypt Vault File

```bash
ansible-vault encrypt group_vars/vault.yml

# Remember this password - you'll need it in Jenkins!
```

---

## Step 6: Local Development

### 6.1 Quick Start

```bash
# Clone repository
git clone <your-repo-url>
cd Freights-Management-System

# Create environment file
cp .env.example .env
# Edit .env with your values

# Start all services
docker compose up -d

# View logs
docker compose logs -f

# Access:
# Frontend: http://localhost
# Admin: http://localhost:3000
# API: http://localhost:8000
```

### 6.2 Useful Commands

```bash
# Rebuild images
docker compose build

# Stop all services
docker compose down

# Stop and remove volumes
docker compose down -v

# View container status
docker compose ps
```

---

## Step 7: Run the Pipeline

### 7.1 Trigger Build

1. Go to Jenkins → freights-management-pipeline
2. Click "Build Now"
3. Watch the console output

### 7.2 Pipeline Stages

1. **Checkout** - Clone repository
2. **Login to DockerHub** - Authenticate
3. **Build Docker Images** - Build all 4 images (parallel)
4. **Push Docker Images** - Push to DockerHub (parallel)
5. **Terraform Init & Plan** - Initialize and plan infrastructure
6. **Terraform Apply** - Create/update AWS resources
7. **Deploy with Ansible** - Deploy containers to EC2

### 7.3 Access Application

After successful deployment:

```
Frontend: http://<EC2_PUBLIC_IP>
Admin:    http://<EC2_PUBLIC_IP>:3000
API:      http://<EC2_PUBLIC_IP>:8000
Health:   http://<EC2_PUBLIC_IP>:8000/api/v1/health
```

---

## Troubleshooting

### Common Issues

**1. Terraform init fails - "bucket does not exist"**
- Create the S3 bucket first (Step 1.2)
- Update bucket name in `terraform/backend.tf`

**2. Ansible vault password error**
- Ensure `ansible-vault-password` credential is set in Jenkins
- Verify vault.yml is encrypted

**3. SSH connection refused**
- Check EC2 security group allows port 22
- Verify SSH key is correct in Jenkins credentials

**4. Docker images fail to push**
- Verify DockerHub credentials
- Check repository names exist on DockerHub

**5. Backend health check fails**
- Check MongoDB connection string
- Verify DB environment variable is set correctly

### Useful Commands

```bash
# Test Ansible connection
ansible all -i "IP_ADDRESS," -u ubuntu --private-key ~/.ssh/freights-dev-key.pem -m ping

# Check Terraform state
cd terraform && terraform state list

# View container logs on EC2
ssh -i ~/.ssh/freights-dev-key.pem ubuntu@<IP>
docker logs backend
docker logs frontend
```

---

## Security Checklist

- [ ] IAM user has minimum required permissions
- [ ] SSH keys are not committed to git
- [ ] Ansible vault is encrypted
- [ ] MongoDB uses authentication
- [ ] JWT secret is strong and unique
- [ ] AES encryption key is strong and unique
- [ ] DockerHub uses access token, not password
- [ ] Security group restricts SSH to your IP (production)

---

## Cost Optimization (Free Tier)

- Use `t2.micro` instance (750 hours/month free)
- EBS volume ≤ 30GB (30GB/month free)
- S3 minimal usage for Terraform state
- DynamoDB on-demand for state locking
- Stop EC2 when not in use
