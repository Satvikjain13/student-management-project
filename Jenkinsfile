pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                bat 'if exist project rmdir /s /q project'
                bat 'git clone https://github.com/Satvikjain13/student-management-project.git project'
            }
        }

        stage('Maven Build') {
            steps {
                bat 'cd project\\backend && mvn clean package -DskipTests'
            }
        }

        stage('NPM Build') {
            steps {
                bat 'cd project\\frontend && npm install'
                bat 'cd project\\frontend && npx ng build'
            }
        }

        stage('Docker Down') {
            steps {
                bat 'cd project && docker compose down'
            }
        }

        stage('Docker Up') {
            steps {
                bat 'cd project && docker compose up -d'
            }
        }
    }
}