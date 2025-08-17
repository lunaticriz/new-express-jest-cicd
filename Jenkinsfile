pipeline {
    agent any

    tools {
        nodejs "NodeJS 24"
    }

    environment {
        // Append system paths instead of overwriting PATH
        PATH = "/usr/local/bin:/usr/bin:/bin:$PATH"
        IMAGE_NAME = "lunaticriz/express-jest-app"
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
