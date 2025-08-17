// pipeline {
//     agent any

//     tools {
//         nodejs "NodeJS 24"
//     }

//     environment {
//         IMAGE_NAME = "lunaticriz/express-jest-app"
//         DOCKERHUB_CRED = "docker-hub-creds"
//         PATH = "/usr/local/bin:/usr/bin:/bin:$PATH"
//     }

//     stages {

//         stage("Checkout") {
//             steps {
//                 checkout scm
//             }
//         }

//         stage("Test") {
//             steps {
//                 sh '''
//                     echo "Using Node: $(node -v)"
//                     echo "Using NPM: $(npm -v)"
//                     npm install
//                     npm test
//                 '''
//             }
//         }

//         stage("Build") {
//             steps {
//                 sh 'npm run build'
//             }
//         }

//         stage("Check Docker") {
//             steps {
//                 sh '''
//                     echo "Docker path: $(which docker)"
//                     docker --version
//                 '''
//             }
//         }

//         stage("Build Image") {
//             steps {
//                 sh 'docker build -t express-jest-app .'
//             }
//         }
//     }

//     post {
//         success {
//             echo "✅ Build completed successfully."
//         }
//         failure {
//             echo "❌ Build failed."
//         }
//         always {
//             cleanWs()
//         }
//     }
// }
pipeline {
    agent any

    tools {
        nodejs "NodeJS 24"
    }

    environment {
        IMAGE_NAME = "express-jest-app"
        DOCKERHUB_CRED = "docker-hub-creds"
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

        stage("Build Docker Image") {
            steps {
                sh "docker build -t $IMAGE_NAME ."
            }
        }

        stage("Push Docker Image") {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CRED}", 
                                                  usernameVariable: 'DOCKER_USER', 
                                                  passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker tag $IMAGE_NAME $DOCKER_USER/$IMAGE_NAME:latest
                        docker push $DOCKER_USER/$IMAGE_NAME:latest
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ Build and Docker push completed successfully."
        }
        failure {
            echo "❌ Build or Docker push failed."
        }
        always {
            cleanWs()
        }
    }
}
