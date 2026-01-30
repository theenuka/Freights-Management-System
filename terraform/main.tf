# terraform/main.tf
# Main infrastructure resources

#------------------------------------------------------------------------------
# Security Group
#------------------------------------------------------------------------------
resource "aws_security_group" "app_sg" {
  name        = "${local.name_prefix}-sg"
  description = "Security group for ${var.project_name} application"

  dynamic "ingress" {
    for_each = local.ingress_rules
    content {
      description = ingress.value.description
      from_port   = ingress.value.port
      to_port     = ingress.value.port
      protocol    = "tcp"
      cidr_blocks = ingress.value.cidr_blocks
    }
  }

  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${local.name_prefix}-sg"
  }

  lifecycle {
    create_before_destroy = true
  }
}

#------------------------------------------------------------------------------
# EC2 Instance
#------------------------------------------------------------------------------
resource "aws_instance" "app_server" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.instance_type
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.app_sg.id]
  monitoring             = var.enable_monitoring

  root_block_device {
    volume_size           = var.root_volume_size
    volume_type           = "gp3"
    encrypted             = true
    delete_on_termination = true

    tags = {
      Name = "${local.name_prefix}-root-volume"
    }
  }

  user_data = base64encode(templatefile("${path.module}/scripts/user_data.sh", {
    project_name = var.project_name
  }))

  tags = {
    Name = "${local.name_prefix}-server"
  }

  lifecycle {
    ignore_changes = [ami]  # Don't recreate on AMI updates
  }
}
