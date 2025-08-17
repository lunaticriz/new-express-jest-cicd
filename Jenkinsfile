pipeline {
    agent any

    tools {
        nodejs "NodeJS 24"
    }

    environment {
        IMAGE_NAME = "lunaticriz/express-jest-app"
        DOCKERHUB_CRED = "docker-hub-creds"
        PATH = "/usr/local/bin:/usr/bin:/bin:$PATH"
    }

    environment {
        IMAGE_NAME = "lunaticriz/express-jest-app"
        DOCKERHUB_USERNAME = credentials('docker-hub-creds') 
        DOCKERHUB_PASSWORD = credentials('docker-hub-creds') 
        PATH = "/usr/local/bin:/usr/bin:/bin:$PATH"
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

        stage("Build") {
            steps {
                sh 'npm run build'
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

        stage("Build & Push Docker Image") {
            steps {
                script {
                    sh """
                        /usr/local/bin/docker login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_PASSWORD
                        /usr/local/bin/docker build -t $IMAGE_NAME:$BUILD_NUMBER .
                        /usr/local/bin/docker push $IMAGE_NAME:$BUILD_NUMBER
                        /usr/local/bin/docker tag $IMAGE_NAME:$BUILD_NUMBER $IMAGE_NAME:latest
                        /usr/local/bin/docker push $IMAGE_NAME:latest
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Build #${BUILD_NUMBER} completed successfully."
        }
        failure {
            echo "❌ Build #${BUILD_NUMBER} failed."
        }
        always {
            node {
                cleanWs()
            }
        }
    }
}