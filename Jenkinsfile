pipeline {
    agent any

    stages {
        stage('Start Database') {
            steps {
                bat 'docker compose up -d mongodb'
            }
        }

        stage('Backend Test') {
            steps {
                bat 'docker run --rm --network student-management-network -v "%cd%\\backend:/app" -w /app maven:3.9.11-eclipse-temurin-17 mvn test'
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