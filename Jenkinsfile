pipeline {
    agent any

    tools {
        nodejs "NodeJS 24"
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

        stage("Build Image") {
            steps {
                sh 'docker build -t express-jest-app .'
            }
        }
    }

    post {
        success {
            echo "✅ Build completed successfully."
        }
        failure {
            echo "❌ Build failed."
        }
        always {
            cleanWs()
        }
    }
}
