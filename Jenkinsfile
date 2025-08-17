pipeline {
    agent any
    tools {
        nodejs "NodeJS 24"  // Name you configured in Jenkins global tools
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
    }
}