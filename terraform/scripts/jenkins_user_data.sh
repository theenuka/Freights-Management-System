#!/bin/bash
# Jenkins Server Bootstrap Script
# Project: ${project_name}
#
# Minimal bootstrap — only installs Python3 so Ansible can connect.
# Full provisioning is handled by: ansible/site-jenkins.yml

set -e
exec > >(tee /var/log/jenkins-bootstrap.log) 2>&1

echo "=== Jenkins Bootstrap Starting ==="

# Ensure Python3 is available (required by Ansible)
apt-get update -y
apt-get install -y python3 python3-pip

echo "=== Bootstrap Complete — ready for Ansible provisioning ==="
echo "Run: ansible-playbook -i inventories/jenkins/hosts.yml site-jenkins.yml -e server_ip=<THIS_IP>"
