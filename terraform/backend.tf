# terraform/backend.tf
# Remote state configuration with S3 and DynamoDB locking
#
# SETUP INSTRUCTIONS:
# Before running terraform init, create these resources manually or via AWS CLI:
#
# 1. Create S3 bucket for state:
#    aws s3api create-bucket --bucket freights-tf-state-<YOUR_ACCOUNT_ID> --region us-east-1
#    aws s3api put-bucket-versioning --bucket freights-tf-state-<YOUR_ACCOUNT_ID> --versioning-configuration Status=Enabled
#    aws s3api put-bucket-encryption --bucket freights-tf-state-<YOUR_ACCOUNT_ID> --server-side-encryption-configuration '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}'
#
# 2. Create DynamoDB table for state locking:
#    aws dynamodb create-table --table-name freights-tf-lock --attribute-definitions AttributeName=LockID,AttributeType=S --key-schema AttributeName=LockID,KeyType=HASH --billing-mode PAY_PER_REQUEST --region us-east-1

terraform {
  backend "s3" {
    bucket         = "freights-tf-state-268539558877"
    key            = "freights-management/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "freights-tf-lock"
  }
}
