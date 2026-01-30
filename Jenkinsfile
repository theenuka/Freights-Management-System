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
