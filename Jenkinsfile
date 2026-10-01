pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Backend Test') {
            steps {
                bat 'cd backend && mvn test'
            }
        }

        stage('Frontend Build') {
            steps {
                bat 'cd frontend && npm install'
                bat 'cd frontend && npx ng build'
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker compose build'
            }
        }

        stage('Deploy') {
            steps {
                bat 'docker compose up -d'
            }
        }
    }
}