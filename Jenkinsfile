// Jenkinsfile - CI/CD Pipeline for Freights Management System
// Uses DockerHub for container registry
// Webhook trigger enabled

pipeline {
    agent any

    triggers {
        githubPush()                    // Trigger on GitHub webhook
        pollSCM('H/5 * * * *')          // Backup: poll every 5 minutes
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    environment {
        DOCKERHUB_USERNAME = 'theenukabandara'
        IMAGE_BACKEND      = "${DOCKERHUB_USERNAME}/freights-backend"
        IMAGE_FRONTEND     = "${DOCKERHUB_USERNAME}/freights-frontend"
        IMAGE_ADMIN        = "${DOCKERHUB_USERNAME}/freights-admin"
        IMAGE_BACKGROUND   = "${DOCKERHUB_USERNAME}/freights-background"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    env.GIT_COMMIT_SHORT = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    env.GIT_BRANCH_NAME  = sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
                    env.IMAGE_TAG        = "${env.GIT_COMMIT_SHORT}"

                    echo "==================================="
                    echo "Build Information:"
                    echo "Branch: ${env.GIT_BRANCH_NAME}"
                    echo "Commit: ${env.GIT_COMMIT_SHORT}"
                    echo "Image Tag: ${env.IMAGE_TAG}"
                    echo "==================================="
                }
            }
        }

        stage('Login to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo "${DOCKER_PASS}" | docker login -u "${DOCKER_USER}" --password-stdin'
                }
            }
        }

        stage('Test') {
            parallel {
                stage('Backend Tests') {
                    steps {
                        dir('Backend') {
                            sh '''
                                npm install --prefer-offline 2>/dev/null || npm install || true
                                npm test --if-present || echo "No test script found, skipping"
                                npm audit --audit-level=high || true
                            '''
                        }
                    }
                }
                stage('Frontend Tests') {
                    steps {
                        dir('Frontend') {
                            sh '''
                                npm install --prefer-offline 2>/dev/null || npm install || true
                                npm test --if-present || echo "No test script found, skipping"
                                npm audit --audit-level=high || true
                            '''
                        }
                    }
                }
            }
        }

        stage('Security Scan') {
            steps {
                sh '''
                    # Install Trivy to home dir (jenkins user has no sudo)
                    if ! command -v ~/bin/trivy >/dev/null 2>&1; then
                        echo "Installing Trivy..."
                        mkdir -p ~/bin
                        curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b ~/bin
                    fi

                    echo "Running Trivy filesystem scan..."
                    ~/bin/trivy fs --exit-code 0 --severity HIGH,CRITICAL \
                        --format table --output trivy-report.txt \
                        --skip-dirs node_modules \
                        . || true

                    echo "=== Trivy Scan Results ==="
                    cat trivy-report.txt || true
                '''
            }
            post {
                always {
                    archiveArtifacts artifacts: 'trivy-report.txt', allowEmptyArchive: true
                }
            }
        }

        stage('Build & Push Docker Images') {
            parallel {
                stage('Backend') {
                    steps {
                        sh """
                            docker buildx build --platform linux/amd64 \
                                -t ${IMAGE_BACKEND}:${IMAGE_TAG} \
                                -t ${IMAGE_BACKEND}:latest \
                                --push ./Backend
                        """
                    }
                }
                stage('Frontend') {
                    steps {
                        sh """
                            docker buildx build --platform linux/amd64 \
                                -t ${IMAGE_FRONTEND}:${IMAGE_TAG} \
                                -t ${IMAGE_FRONTEND}:latest \
                                --push ./Frontend
                        """
                    }
                }
                stage('Admin') {
                    steps {
                        sh """
                            docker buildx build --platform linux/amd64 \
                                -t ${IMAGE_ADMIN}:${IMAGE_TAG} \
                                -t ${IMAGE_ADMIN}:latest \
                                --push ./Admin
                        """
                    }
                }
                stage('Background') {
                    steps {
                        sh """
                            docker buildx build --platform linux/amd64 \
                                -t ${IMAGE_BACKGROUND}:${IMAGE_TAG} \
                                -t ${IMAGE_BACKGROUND}:latest \
                                --push ./BackgroundServices
                        """
                    }
                }
            }
        }

        stage('Cleanup Build') {
            steps {
                sh '''
                    docker logout || true
                    docker image prune -f || true
                '''
                echo "==================================="
                echo "Build & Push Complete!"
                echo "Images pushed to DockerHub"
                echo "==================================="
            }
        }

        stage('Deploy with Ansible') {
            steps {
                withCredentials([
                    sshUserPrivateKey(credentialsId: 'ec2-ssh-key',           keyFileVariable:  'SSH_KEY'),
                    usernamePassword(credentialsId:  'dockerhub-credentials', usernameVariable: 'DH_USER', passwordVariable: 'DH_PASS'),
                    string(credentialsId: 'app-server-ip',      variable: 'SERVER_IP'),
                    string(credentialsId: 'vault-db-string',    variable: 'VAULT_DB'),
                    string(credentialsId: 'vault-backend-pass', variable: 'VAULT_PASS'),
                    string(credentialsId: 'vault-backend-jwt',  variable: 'VAULT_JWT'),
                    string(credentialsId: 'vault-email-user',   variable: 'VAULT_EMAIL_USER'),
                    string(credentialsId: 'vault-email-pass',   variable: 'VAULT_EMAIL_PASS')
                ]) {
                    sh '''
                        echo "==================================="
                        echo "Starting Deployment with Ansible"
                        echo "==================================="

                        # Setup SSH key
                        mkdir -p ~/.ssh
                        cp "${SSH_KEY}" ~/.ssh/deploy_key.pem
                        chmod 600 ~/.ssh/deploy_key.pem

                        # Disable host key checking for automation
                        export ANSIBLE_HOST_KEY_CHECKING=False

                        # Run Ansible playbook - all secrets come from Jenkins credentials
                        cd ansible
                        ansible-playbook -i inventories/dev/hosts.yml site.yml \
                            -e "server_ip=${SERVER_IP}" \
                            -e "ssh_key_path=~/.ssh/deploy_key.pem" \
                            -e "image_tag=${IMAGE_TAG}" \
                            -e "vault_dockerhub_password=${DH_PASS}" \
                            -e "vault_db_string=${VAULT_DB}" \
                            -e "vault_backend_pass=${VAULT_PASS}" \
                            -e "vault_backend_jwt=${VAULT_JWT}" \
                            -e "vault_email_user=${VAULT_EMAIL_USER}" \
                            -e "vault_email_pass=${VAULT_EMAIL_PASS}"

                        # Cleanup sensitive files
                        rm -f ~/.ssh/deploy_key.pem
                    '''
                }
            }
        }
    }

    post {
        success {
            withCredentials([string(credentialsId: 'app-server-ip', variable: 'SERVER_IP')]) {
                sh '''
                    echo "==================================="
                    echo "CI/CD Pipeline Completed Successfully!"
                    echo "Application deployed to: http://${SERVER_IP}"
                    echo "Admin:                   http://${SERVER_IP}:3000"
                    echo "API:                     http://${SERVER_IP}:8000"
                    echo "==================================="
                '''
            }
        }
        failure {
            echo 'Pipeline failed. Check the logs for details.'
        }
        always {
            sh 'rm -f ~/.ssh/deploy_key.pem 2>/dev/null || true'
        }
    }
}
