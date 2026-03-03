# terraform/environments/dev/terraform.tfvars
# Development environment configuration

aws_region            = "us-east-2"
project_name          = "freights-management"
environment           = "dev"
instance_type         = "t3.micro"   # Free tier eligible (750 hrs/month)
jenkins_instance_type = "t3.small"   # 2 GB RAM - free tier eligible on this account
key_name              = "freights-dev-key"
root_volume_size      = 15           # Keep within 30 GB free tier total (15+15=30)
enable_monitoring     = false
ssh_allowed_cidr      = ["0.0.0.0/0"]  # Allow from anywhere for dev
