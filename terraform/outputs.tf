# terraform/outputs.tf
# Output values for use by other tools (Ansible, Jenkins, etc.)

output "server_public_ip" {
  description = "Public IP address of the application server"
  value       = aws_instance.app_server.public_ip
}

output "server_private_ip" {
  description = "Private IP address of the application server"
  value       = aws_instance.app_server.private_ip
}

output "server_instance_id" {
  description = "EC2 Instance ID"
  value       = aws_instance.app_server.id
}

output "security_group_id" {
  description = "Security Group ID"
  value       = aws_security_group.app_sg.id
}

output "ssh_connection" {
  description = "SSH connection command"
  value       = "ssh -i ~/.ssh/${var.key_name}.pem ubuntu@${aws_instance.app_server.public_ip}"
}

output "application_urls" {
  description = "Application access URLs"
  value = {
    frontend = "http://${aws_instance.app_server.public_ip}"
    admin    = "http://${aws_instance.app_server.public_ip}:3000"
    api      = "http://${aws_instance.app_server.public_ip}:8000"
    health   = "http://${aws_instance.app_server.public_ip}:8000/api/v1/health"
  }
}

#------------------------------------------------------------------------------
# Jenkins Outputs
#------------------------------------------------------------------------------
output "jenkins_public_ip" {
  description = "Public IP of Jenkins server"
  value       = aws_instance.jenkins_server.public_ip
}

output "jenkins_instance_id" {
  description = "Jenkins EC2 Instance ID"
  value       = aws_instance.jenkins_server.id
}

output "jenkins_url" {
  description = "Jenkins Web UI URL"
  value       = "http://${aws_instance.jenkins_server.public_ip}:8080"
}

output "jenkins_ssh" {
  description = "SSH command for Jenkins server"
  value       = "ssh -i ~/.ssh/${var.key_name}.pem ubuntu@${aws_instance.jenkins_server.public_ip}"
}
