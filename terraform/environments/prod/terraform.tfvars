# terraform/environments/prod/terraform.tfvars
# Production environment configuration

aws_region            = "us-east-2"
project_name          = "freights-management"
environment           = "prod"
instance_type         = "t2.micro"   # Free tier eligible (750 hrs/month)
jenkins_instance_type = "t2.micro"   # Free tier eligible (750 hrs/month)
key_name              = "freights-prod-key"
root_volume_size      = 15           # Keep within 30 GB free tier total (15+15=30)
enable_monitoring     = false
ssh_allowed_cidr      = ["0.0.0.0/0"]  # IMPORTANT: Restrict to your IP in production
