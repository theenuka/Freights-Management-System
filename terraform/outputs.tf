output "server_public_ip" {
  description = "Public IP address of the Freights App server"
  value       = aws_instance.app_server.public_ip
}

output "server_instance_id" {
  description = "Instance ID of the Freights App server"
  value       = aws_instance.app_server.id
}