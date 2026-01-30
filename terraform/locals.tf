# terraform/locals.tf
# Local values for computed configurations and common tags

locals {
  # Common tags applied to all resources
  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
    Owner       = "theenukabandara"
  }

  # Resource naming convention
  name_prefix = "${var.project_name}-${var.environment}"

  # Security group rules - easily maintainable
  ingress_rules = [
    {
      description = "HTTP - Frontend"
      port        = 80
      cidr_blocks = ["0.0.0.0/0"]
    },
    {
      description = "Admin Dashboard"
      port        = 3000
      cidr_blocks = ["0.0.0.0/0"]
    },
    {
      description = "Backend API"
      port        = 8000
      cidr_blocks = ["0.0.0.0/0"]
    },
    {
      description = "SSH Access"
      port        = 22
      cidr_blocks = var.ssh_allowed_cidr
    }
  ]
}
