# terraform/environments/dev/terraform.tfvars
# Development environment configuration

aws_region       = "us-east-1"
project_name     = "freights-management"
environment      = "dev"
instance_type    = "t3.micro"  # Free tier eligible
key_name         = "freights-dev-key"
root_volume_size = 20
enable_monitoring = false
ssh_allowed_cidr = ["0.0.0.0/0"]  # Allow from anywhere for dev
