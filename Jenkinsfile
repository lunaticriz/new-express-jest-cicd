pipeline {
    agent any

    parameters {
        string(name: 'IMAGE_TAG', defaultValue: '1.0', description: 'App version')
    }

    tools {
        nodejs "NodeJS 24"
    }

    environment {
        IMAGE_NAME = "express-jest-app"
        DOCKERHUB_CRED = "docker-hub-creds"
        PATH = "/usr/local/bin:/usr/bin:/bin:$PATH"
        IMAGE_TAG = "${params.IMAGE_TAG}"
    }

    stages {
        stage("Checkout") {
            steps {
                checkout scm
            }
        }

        stage("Test") {
            steps {
                sh '''
                    echo "Using Node: $(node -v)"
                    echo "Using NPM: $(npm -v)"
                    npm install
                    npm test
                '''
            }
        }

        stage('SonarQube Analysis with Docker') {
            steps {
                script {
                    // Start SonarQube server
                    sh 'docker run -d --name sonarqube -p 9000:9000 sonarqube:community'
                    // Wait for SonarQube to be up (simple wait, for demo purposes)
                    sh 'sleep 60'
                    // Run sonar-scanner in a container, replace values as needed
                    sh '''
                    docker run --rm \
                        -e SONAR_HOST_URL="http://host.docker.internal:9000" \
                        -v $(pwd):/usr/src \
                        sonarsource/sonar-scanner-cli \
                        -Dsonar.projectKey=your_project_key \
                        -Dsonar.sources=src \
                        -Dsonar.tests=tests \
                        -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
                    '''
                    // Stop SonarQube server
                    sh 'docker stop sonarqube && docker rm sonarqube'
                }
            }
        }

        stage("Check Docker") {
            steps {
                sh '''
                    echo "Docker path: $(which docker)"
                    docker --version
                '''
            }
        }

        stage("Build Docker Image") {
            steps {
                sh "docker build -t $IMAGE_NAME ."
            }
        }

        stage("Push Docker Image") {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: "${DOCKERHUB_CRED}", 
                        usernameVariable: 'DOCKER_USER', 
                        passwordVariable: 'DOCKER_PASS')
                    ]) {
                    sh '''
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker tag $IMAGE_NAME $DOCKER_USER/$IMAGE_NAME:$IMAGE_TAG
                        docker push $DOCKER_USER/$IMAGE_NAME:$IMAGE_TAG
                    '''
                }
            }
        }

        stage("Run Docker Container") {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: "${DOCKERHUB_CRED}", 
                        usernameVariable: 'DOCKER_USER', 
                        passwordVariable: 'DOCKER_PASS')
                    ]) {
                    sh '''
                        docker run -d -p 3000:3000 --name $IMAGE_NAME $DOCKER_USER/$IMAGE_NAME:$IMAGE_TAG
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ Build $IMAGE_NAME:$IMAGE_TAG and Docker push completed successfully."
        }
        failure {
            echo "❌ Build $IMAGE_NAME:$IMAGE_TAG or Docker push failed."
        }
        always {
            cleanWs()
        }
    }
}
