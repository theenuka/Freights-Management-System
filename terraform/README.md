# Terraform Infrastructure

This directory contains Terraform configurations for the Freights Management System infrastructure.

## Structure

```
terraform/
├── backend.tf              # Remote state configuration (S3 + DynamoDB)
├── data.tf                 # Data sources (AMI, account info)
├── locals.tf               # Local values and common tags
├── main.tf                 # Main resources (EC2, Security Group)
├── outputs.tf              # Output values
├── provider.tf             # AWS provider configuration
├── variables.tf            # Input variables with validation
├── versions.tf             # Version constraints
├── scripts/
│   └── user_data.sh        # EC2 initialization script
└── environments/
    ├── dev/
    │   └── terraform.tfvars
    └── prod/
        └── terraform.tfvars
```

## Prerequisites

1. **AWS CLI configured** with your credentials
2. **Terraform >= 1.5.0** installed
3. **S3 bucket** for remote state (see backend.tf for setup instructions)
4. **DynamoDB table** for state locking
5. **EC2 Key Pair** created in AWS console

## Initial Setup

### 1. Create S3 Bucket for State

```bash
# Replace YOUR_ACCOUNT_ID with your AWS account ID
aws s3api create-bucket \
  --bucket freights-tf-state-YOUR_ACCOUNT_ID \
  --region us-east-1

aws s3api put-bucket-versioning \
  --bucket freights-tf-state-YOUR_ACCOUNT_ID \
  --versioning-configuration Status=Enabled

aws s3api put-bucket-encryption \
  --bucket freights-tf-state-YOUR_ACCOUNT_ID \
  --server-side-encryption-configuration '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}'
```

### 2. Create DynamoDB Table for Locking

```bash
aws dynamodb create-table \
  --table-name freights-tf-lock \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region us-east-1
```

### 3. Update backend.tf

Replace `ACCOUNT_ID` in `backend.tf` with your actual AWS account ID.

### 4. Create EC2 Key Pair

```bash
aws ec2 create-key-pair \
  --key-name freights-dev-key \
  --query 'KeyMaterial' \
  --output text > ~/.ssh/freights-dev-key.pem

chmod 400 ~/.ssh/freights-dev-key.pem
```

## Usage

### Initialize Terraform

```bash
terraform init
```

### Deploy Development Environment

```bash
terraform plan -var-file=environments/dev/terraform.tfvars
terraform apply -var-file=environments/dev/terraform.tfvars
```

### Deploy Production Environment

```bash
terraform plan -var-file=environments/prod/terraform.tfvars
terraform apply -var-file=environments/prod/terraform.tfvars
```

### View Outputs

```bash
terraform output
```

### Destroy Infrastructure

```bash
terraform destroy -var-file=environments/dev/terraform.tfvars
```

## Security Notes

- SSH access is open to all by default. Restrict `ssh_allowed_cidr` to your IP.
- EBS volumes are encrypted by default.
- All resources are tagged for cost tracking.

## Free Tier Considerations

- `t2.micro` instance is free tier eligible (750 hours/month)
- 30GB EBS storage is free tier eligible
- S3 and DynamoDB usage for state is minimal and typically free
