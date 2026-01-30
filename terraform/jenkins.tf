# terraform/jenkins.tf
# Jenkins CI/CD Server

#------------------------------------------------------------------------------
# Jenkins Security Group
#------------------------------------------------------------------------------
resource "aws_security_group" "jenkins_sg" {
  name        = "${local.name_prefix}-jenkins-sg"
  description = "Security group for Jenkins server"

  ingress {
    description = "Jenkins Web UI"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "SSH Access"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = var.ssh_allowed_cidr
  }

  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${local.name_prefix}-jenkins-sg"
  }

  lifecycle {
    create_before_destroy = true
  }
}

#------------------------------------------------------------------------------
# Jenkins EC2 Instance
#------------------------------------------------------------------------------
resource "aws_instance" "jenkins_server" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.jenkins_instance_type
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.jenkins_sg.id]
  monitoring             = false

  root_block_device {
    volume_size           = 25
    volume_type           = "gp3"
    encrypted             = true
    delete_on_termination = true

    tags = {
      Name = "${local.name_prefix}-jenkins-volume"
    }
  }

  user_data = base64encode(templatefile("${path.module}/scripts/jenkins_user_data.sh", {
    project_name = var.project_name
  }))

  tags = {
    Name = "${local.name_prefix}-jenkins"
  }

  lifecycle {
    ignore_changes = [ami]
  }
}
