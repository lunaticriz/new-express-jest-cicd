pipeline {
    agent any

    tools {
        nodejs "NodeJS 24"
    }

    environment {
        IMAGE_NAME = "lunaticriz/express-jest-app"
        PATH = "/usr/local/bin:${env.PATH}"
        DOCKERHUB_CREDS = "docker-hub-creds"
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

        stage("Build & Push Docker Image") {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CREDS) {
                        def app = docker.build("${IMAGE_NAME}:${BUILD_NUMBER}")
                        app.push()
                        app.push("latest")
                    }
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
            cleanWs()
        }
    }
}
