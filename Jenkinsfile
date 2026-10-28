pipeline {
    agent any

    stages {

        stage('Stage 1: Pull Code from GitHub') {
            steps {
                echo 'Pulling source code from GitHub...'
                checkout scm
                echo 'GitHub code pulled successfully.'
            }
        }

        stage('Stage 2: Build Docker Images') {
            steps {
                echo 'Building backend Docker image...'

                bat 'docker build -t maarak/todo-app-backend:version2 ./todo-app/backend'

                echo 'Building frontend Docker image...'

                bat 'docker build -t maarak/todo-app-frontend:version2 ./todo-app/frontend'

                echo 'Both Docker images built successfully.'
            }
        }

       stage('Stage 3: Push Images to Docker Hub') {
          steps {
               echo 'Pushing images to Docker Hub...'
               withCredentials([usernamePassword(
               credentialsId: 'dockerhub-credentials',
            usernameVariable: 'DOCKER_USER',
            passwordVariable: 'DOCKER_PASS')]) {
            bat '''
            echo Logging in to Docker Hub...
            echo %DOCKER_PASS%| docker login -u %DOCKER_USER% --password-stdin
            docker push maarak/todo-app-backend:version2
            docker push maarak/todo-app-frontend:version2
            '''
        }
    }
}
    }

    post {
        success {
            echo 'SUCCESS: GitHub checkout, Docker build, and Docker Hub push completed.'
        }

        failure {
            echo 'FAILED: Check Console Output for the exact error.'
        }
    }
}

