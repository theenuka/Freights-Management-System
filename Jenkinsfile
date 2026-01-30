// Jenkinsfile - CI/CD Pipeline for Freights Management System
// Uses DockerHub for container registry

pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    environment {
        // DockerHub Configuration
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKERHUB_USERNAME = 'theenukabandara'

        // Image names
        IMAGE_BACKEND = "${DOCKERHUB_USERNAME}/freights-backend"
        IMAGE_FRONTEND = "${DOCKERHUB_USERNAME}/freights-frontend"
        IMAGE_ADMIN = "${DOCKERHUB_USERNAME}/freights-admin"
        IMAGE_BACKGROUND = "${DOCKERHUB_USERNAME}/freights-background"

        // AWS Configuration
        AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
        AWS_DEFAULT_REGION = 'us-east-1'

        // Ansible Configuration
        ANSIBLE_VAULT_PASSWORD = credentials('ansible-vault-password')
        ANSIBLE_HOST_KEY_CHECKING = 'False'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    // Get commit info for tagging
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
                script {
                    sh '''
                        echo "${DOCKERHUB_CREDENTIALS_PSW}" | docker login -u "${DOCKERHUB_CREDENTIALS_USR}" --password-stdin
                    '''
                }
            }
        }

        stage('Build Docker Images') {
            parallel {
                stage('Build Backend') {
                    steps {
                        script {
                            sh """
                                docker build -t ${IMAGE_BACKEND}:${IMAGE_TAG} \
                                    -t ${IMAGE_BACKEND}:latest \
                                    --label "git.commit=${GIT_COMMIT_SHORT}" \
                                    --label "git.branch=${GIT_BRANCH_NAME}" \
                                    --label "build.number=${BUILD_NUMBER}" \
                                    ./Backend
                            """
                        }
                    }
                }
                stage('Build Frontend') {
                    steps {
                        script {
                            sh """
                                docker build -t ${IMAGE_FRONTEND}:${IMAGE_TAG} \
                                    -t ${IMAGE_FRONTEND}:latest \
                                    --label "git.commit=${GIT_COMMIT_SHORT}" \
                                    --label "git.branch=${GIT_BRANCH_NAME}" \
                                    --label "build.number=${BUILD_NUMBER}" \
                                    ./Frontend
                            """
                        }
                    }
                }
                stage('Build Admin') {
                    steps {
                        script {
                            sh """
                                docker build -t ${IMAGE_ADMIN}:${IMAGE_TAG} \
                                    -t ${IMAGE_ADMIN}:latest \
                                    --label "git.commit=${GIT_COMMIT_SHORT}" \
                                    --label "git.branch=${GIT_BRANCH_NAME}" \
                                    --label "build.number=${BUILD_NUMBER}" \
                                    ./Admin
                            """
                        }
                    }
                }
                stage('Build Background') {
                    steps {
                        script {
                            sh """
                                docker build -t ${IMAGE_BACKGROUND}:${IMAGE_TAG} \
                                    -t ${IMAGE_BACKGROUND}:latest \
                                    --label "git.commit=${GIT_COMMIT_SHORT}" \
                                    --label "git.branch=${GIT_BRANCH_NAME}" \
                                    --label "build.number=${BUILD_NUMBER}" \
                                    ./BackgroundServices
                            """
                        }
                    }
                }
            }
        }

        stage('Push Docker Images') {
            parallel {
                stage('Push Backend') {
                    steps {
                        sh """
                            docker push ${IMAGE_BACKEND}:${IMAGE_TAG}
                            docker push ${IMAGE_BACKEND}:latest
                        """
                    }
                }
                stage('Push Frontend') {
                    steps {
                        sh """
                            docker push ${IMAGE_FRONTEND}:${IMAGE_TAG}
                            docker push ${IMAGE_FRONTEND}:latest
                        """
                    }
                }
                stage('Push Admin') {
                    steps {
                        sh """
                            docker push ${IMAGE_ADMIN}:${IMAGE_TAG}
                            docker push ${IMAGE_ADMIN}:latest
                        """
                    }
                }
                stage('Push Background') {
                    steps {
                        sh """
                            docker push ${IMAGE_BACKGROUND}:${IMAGE_TAG}
                            docker push ${IMAGE_BACKGROUND}:latest
                        """
                    }
                }
            }
        }

        stage('Terraform Init & Plan') {
            steps {
                dir('terraform') {
                    script {
                        sh '''
                            terraform init -input=false
                            terraform plan -var-file=environments/dev/terraform.tfvars -out=tfplan
                        '''
                    }
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                dir('terraform') {
                    script {
                        sh '''
                            terraform apply -auto-approve tfplan
                            terraform output -raw server_public_ip > ../server_ip.txt
                        '''
                    }
                }
            }
        }

        stage('Deploy with Ansible') {
            steps {
                script {
                    def serverIP = readFile('server_ip.txt').trim()

                    echo "==================================="
                    echo "Deployment Target: ${serverIP}"
                    echo "==================================="

                    // Create vault password file
                    writeFile file: '.vault_pass', text: env.ANSIBLE_VAULT_PASSWORD

                    dir('ansible') {
                        sshagent(['ec2-ssh-key']) {
                            sh """
                                # Install Ansible collections
                                ansible-galaxy collection install -r requirements.yml --force

                                # Run deployment
                                ansible-playbook site.yml \
                                    -i inventories/dev/hosts.yml \
                                    -e "server_ip=${serverIP}" \
                                    -e "image_tag=${IMAGE_TAG}" \
                                    --vault-password-file ../.vault_pass
                            """
                        }
                    }

                    // Clean up vault password file
                    sh 'rm -f .vault_pass'

                    echo "==================================="
                    echo "Deployment Successful!"
                    echo ""
                    echo "Application URLs:"
                    echo "Frontend: http://${serverIP}"
                    echo "Admin:    http://${serverIP}:3000"
                    echo "API:      http://${serverIP}:8000"
                    echo "Health:   http://${serverIP}:8000/api/v1/health"
                    echo "==================================="
                }
            }
        }
    }

    post {
        always {
            script {
                // Logout from DockerHub
                sh 'docker logout || true'

                // Clean up Docker images to save space
                sh '''
                    docker image prune -f || true
                '''

                // Clean up workspace files
                sh 'rm -f .vault_pass server_ip.txt || true'
            }
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs for details.'
        }
    }
}
