pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS-18'
    }
    
    environment {
        HEADLESS = 'true'
        BROWSER = 'chrome'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
            post {
                always {
                    junit 'reports/junit/*.xml'
                    publishHTML([
                        reportDir: 'reports/mochawesome',
                        reportFiles: 'test-report.html',
                        reportName: 'Test Report'
                    ])
                }
            }
        }
        
        stage('Archive Reports') {
            steps {
                archiveArtifacts artifacts: 'reports/**/*'
            }
        }
    }
    
    post {
        failure {
            emailext (
                to: 'team@example.com',
                subject: "Test Pipeline Failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                body: "Pipeline failed. Check console output at ${env.BUILD_URL}"
            )
        }
    }
}
