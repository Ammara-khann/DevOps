pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = 'YOUR_DOCKERHUB_USERNAME'
    }

    stages {

        stage('Pull Code from GitHub') {
            steps {
                checkout scm
                echo 'Code pulled successfully from GitHub'
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Building Backend Docker Image'
                bat 'docker build -t %DOCKERHUB_USERNAME%/devops-backend:latest -f backend/Dockerfile backend'

                echo 'Building Frontend Docker Image'
                bat 'docker build -t %DOCKERHUB_USERNAME%/devops-frontend:latest -f frontend/Dockerfile frontend'
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DH_USER',
                    passwordVariable: 'DH_TOKEN'
                )]) {
                    bat 'echo %DH_TOKEN%| docker login -u %DH_USER% --password-stdin'
                    bat 'docker push %DOCKERHUB_USERNAME%/devops-backend:latest'
                    bat 'docker push %DOCKERHUB_USERNAME%/devops-frontend:latest'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed. Please check the console output.'
        }
    }
}
