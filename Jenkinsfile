pipeline {
    agent any

    stages {

        stage('Stage 1: Pull Code from GitHub') {
            steps {
                checkout scm
                echo 'Successfully pulled code from GitHub.'
            }
        }

        stage('Stage 2: Build Docker Images') {
            steps {
                bat 'docker build -t maarak/todo-app-backend:version2 ./backend'
                bat 'docker build -t maarak/todo-app-frontend:version2 ./frontend'
            }
        }

        stage('Stage 3: Push Images to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    bat 'docker login -u %DOCKER_USER% --password-stdin'
                    bat 'docker push maarak/todo-app-backend:version2'
                    bat 'docker push maarak/todo-app-frontend:version2'
                    bat 'docker logout'
                }
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: All three pipeline stages completed.'
        }

        failure {
            echo 'FAILED: Check the Console Output for details.'
        }
    }
}

