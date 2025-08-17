pipeline {
    agent any

    tools {
        nodejs "NodeJS 24"  // Name you configured in Jenkins global tools
    }

    environment {
        IMAGE_NAME = "lunaticriz/express-jest-app"
        DOCKERHUB_CREDS = "docker-hub-creds"   // Jenkins Credentials ID
    }

    stages {
        stage("checkout") {
            steps{
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

        stage("Build Image") {
            steps {
                sh 'docker build -t express-jest-app:1.0 .'
            }
        }

        stage("Build & Push Docker Image") {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-creds') {
                        def app = docker.build("lunaticriz/express-jest-app:${BUILD_NUMBER}")
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