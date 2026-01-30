# terraform/environments/prod/terraform.tfvars
# Production environment configuration

aws_region       = "us-east-1"
project_name     = "freights-management"
environment      = "prod"
instance_type    = "t2.micro"  # Free tier eligible
key_name         = "freights-prod-key"
root_volume_size = 25
enable_monitoring = false  # Set to true if budget allows
ssh_allowed_cidr = ["0.0.0.0/0"]  # IMPORTANT: Restrict to your IP in production
