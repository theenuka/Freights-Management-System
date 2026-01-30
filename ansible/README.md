# Ansible Deployment

This directory contains Ansible playbooks and roles for deploying the Freights Management System.

## Structure

```
ansible/
├── ansible.cfg                 # Ansible configuration
├── requirements.yml            # Galaxy dependencies
├── site.yml                    # Main entry point
├── inventories/
│   ├── dev/
│   │   └── hosts.yml          # Development inventory
│   └── prod/
│       └── hosts.yml          # Production inventory
├── group_vars/
│   ├── all.yml                # Common variables
│   └── vault.yml              # Encrypted secrets (create from vault.yml.example)
├── playbooks/
│   └── deploy.yml             # Main deployment playbook
└── roles/
    ├── common/                # Base system setup
    ├── docker/                # Docker installation
    └── app_deploy/            # Application deployment
```

## Prerequisites

1. **Ansible >= 2.12** installed
2. **SSH access** to target servers
3. **Vault password** for encrypted secrets

## Initial Setup

### 1. Install Ansible Collections

```bash
ansible-galaxy collection install -r requirements.yml
```

### 2. Create Vault File

```bash
cp group_vars/vault.yml.example group_vars/vault.yml

# Edit with your actual secrets
nano group_vars/vault.yml

# Encrypt the vault file
ansible-vault encrypt group_vars/vault.yml
```

### 3. Create Vault Password File (for CI/CD)

```bash
echo "your_vault_password" > ~/.ansible_vault_pass
chmod 600 ~/.ansible_vault_pass
```

## Usage

### Deploy to Development

```bash
# With vault password prompt
ansible-playbook site.yml -i inventories/dev/hosts.yml \
  -e "server_ip=YOUR_SERVER_IP" \
  --ask-vault-pass

# With vault password file
ansible-playbook site.yml -i inventories/dev/hosts.yml \
  -e "server_ip=YOUR_SERVER_IP" \
  --vault-password-file ~/.ansible_vault_pass
```

### Deploy to Production

```bash
ansible-playbook site.yml -i inventories/prod/hosts.yml \
  -e "server_ip=YOUR_SERVER_IP" \
  --vault-password-file ~/.ansible_vault_pass
```

### Deploy Specific Tag

```bash
# Deploy specific image version
ansible-playbook site.yml -i inventories/dev/hosts.yml \
  -e "server_ip=YOUR_SERVER_IP image_tag=v1.2.3" \
  --vault-password-file ~/.ansible_vault_pass

# Only run specific tasks
ansible-playbook site.yml -i inventories/dev/hosts.yml \
  -e "server_ip=YOUR_SERVER_IP" \
  --tags "deploy" \
  --vault-password-file ~/.ansible_vault_pass
```

### Syntax Check

```bash
ansible-playbook site.yml --syntax-check
```

### Dry Run

```bash
ansible-playbook site.yml -i inventories/dev/hosts.yml \
  -e "server_ip=YOUR_SERVER_IP" \
  --check --diff \
  --vault-password-file ~/.ansible_vault_pass
```

## Variables

### Required Vault Variables

| Variable | Description |
|----------|-------------|
| `vault_dockerhub_password` | DockerHub access token |
| `vault_db_string` | MongoDB connection string |
| `vault_backend_pass` | AES encryption key |
| `vault_backend_jwt` | JWT secret key |
| `vault_email_user` | SMTP email address |
| `vault_email_pass` | SMTP password |

### Optional Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `image_tag` | `latest` | Docker image tag to deploy |
| `env` | `dev` | Environment name |

## Tags

- `common` - Base system setup
- `docker` - Docker installation
- `deploy` - Application deployment
- `health` - Health checks only
- `cleanup` - Cleanup tasks

## Troubleshooting

### View Vault Contents

```bash
ansible-vault view group_vars/vault.yml
```

### Edit Vault

```bash
ansible-vault edit group_vars/vault.yml
```

### Debug Mode

```bash
ansible-playbook site.yml -i inventories/dev/hosts.yml \
  -e "server_ip=YOUR_SERVER_IP" \
  -vvv
```
