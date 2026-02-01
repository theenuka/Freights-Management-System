// Jenkinsfile - CI/CD Pipeline for Freights Management System
// Uses DockerHub for container registry

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
        IMAGE_BACKEND = "${DOCKERHUB_USERNAME}/freights-backend"
        IMAGE_FRONTEND = "${DOCKERHUB_USERNAME}/freights-frontend"
        IMAGE_ADMIN = "${DOCKERHUB_USERNAME}/freights-admin"
        IMAGE_BACKGROUND = "${DOCKERHUB_USERNAME}/freights-background"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    env.GIT_COMMIT_SHORT = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    env.GIT_BRANCH_NAME = sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
                    env.IMAGE_TAG = "${env.GIT_COMMIT_SHORT}"

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
                    sh '''
                        echo "${DOCKER_PASS}" | docker login -u "${DOCKER_USER}" --password-stdin
                    '''
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
                    sshUserPrivateKey(credentialsId: 'ec2-ssh-key', keyFileVariable: 'SSH_KEY'),
                    usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DH_USER', passwordVariable: 'DH_PASS')
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

                        # Run Ansible playbook with variables passed directly
                        cd ansible
                        ansible-playbook -i inventories/dev/hosts.yml site.yml \
                            -e "server_ip=34.228.166.118" \
                            -e "ssh_key_path=~/.ssh/deploy_key.pem" \
                            -e "image_tag=${IMAGE_TAG}" \
                            -e "vault_dockerhub_password=${DH_PASS}" \
                            -e "vault_db_string=mongodb://mongo:27017/fms" \
                            -e "vault_backend_pass=devpass123" \
                            -e "vault_backend_jwt=devjwtsecret456"

                        # Cleanup sensitive files
                        rm -f ~/.ssh/deploy_key.pem
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "==================================="
            echo "CI/CD Pipeline Completed Successfully!"
            echo "Application deployed to: http://34.228.166.118"
            echo "Admin: http://34.228.166.118:3000"
            echo "API: http://34.228.166.118:8000"
            echo "==================================="
        }
        failure {
            echo 'Pipeline failed. Check the logs for details.'
        }
        always {
            sh 'rm -f /tmp/vault_pass.txt ~/.ssh/deploy_key.pem 2>/dev/null || true'
        }
    }
}
