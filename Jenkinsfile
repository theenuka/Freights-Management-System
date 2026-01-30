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
                sh '''
                    echo "${DOCKERHUB_CREDENTIALS_PSW}" | docker login -u "${DOCKERHUB_CREDENTIALS_USR}" --password-stdin
                '''
            }
        }

        stage('Build Docker Images') {
            parallel {
                stage('Build Backend') {
                    steps {
                        sh """
                            docker build -t ${IMAGE_BACKEND}:${IMAGE_TAG} \
                                -t ${IMAGE_BACKEND}:latest \
                                ./Backend
                        """
                    }
                }
                stage('Build Frontend') {
                    steps {
                        sh """
                            docker build -t ${IMAGE_FRONTEND}:${IMAGE_TAG} \
                                -t ${IMAGE_FRONTEND}:latest \
                                ./Frontend
                        """
                    }
                }
                stage('Build Admin') {
                    steps {
                        sh """
                            docker build -t ${IMAGE_ADMIN}:${IMAGE_TAG} \
                                -t ${IMAGE_ADMIN}:latest \
                                ./Admin
                        """
                    }
                }
                stage('Build Background') {
                    steps {
                        sh """
                            docker build -t ${IMAGE_BACKGROUND}:${IMAGE_TAG} \
                                -t ${IMAGE_BACKGROUND}:latest \
                                ./BackgroundServices
                        """
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

        stage('Cleanup') {
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
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs for details.'
        }
    }
}
