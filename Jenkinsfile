pipeline {
    agent any
    environment {
        AWS_ACCESS_KEY_ID     = credentials('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
        AWS_DEFAULT_REGION    = 'us-east-1'
        ECR_BACKEND_URI       = '487409145731.dkr.ecr.us-east-1.amazonaws.com/freights-management-app'
        ECR_FRONTEND_URI      = '487409145731.dkr.ecr.us-east-1.amazonaws.com/freights-management-frontend'
        ECR_ADMIN_URI         = '487409145731.dkr.ecr.us-east-1.amazonaws.com/freights-management-admin'
        ECR_BG_SERVICE_URI    = '487409145731.dkr.ecr.us-east-1.amazonaws.com/freights-management-background'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Login to ECR') {
            steps {
                script {
                    sh 'aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $ECR_BACKEND_URI'
                }
            }
        }

        stage('Build & Push Backend') {
            steps {
                script {
                    sh 'docker build -t $ECR_BACKEND_URI:latest ./Backend'
                    sh 'docker push $ECR_BACKEND_URI:latest'
                }
            }
        }

        stage('Build & Push Frontend') {
            steps {
                script {
                    sh 'docker build -t $ECR_FRONTEND_URI:latest ./Frontend'
                    sh 'docker push $ECR_FRONTEND_URI:latest'
                }
            }
        }

        stage('Build & Push Admin') {
            steps {
                script {
                    sh 'docker build -t $ECR_ADMIN_URI:latest ./Admin'
                    sh 'docker push $ECR_ADMIN_URI:latest'
                }
            }
        }

        stage('Build & Push Background') {
            steps {
                script {
                    sh 'docker build -t $ECR_BG_SERVICE_URI:latest ./BackgroundServices'
                    sh 'docker push $ECR_BG_SERVICE_URI:latest'
                }
            }
        }
    }
    post {
        always {
            sh 'docker rmi $(docker images -q) || true'
        }
    }
}
