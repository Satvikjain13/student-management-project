pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                bat 'if exist project rmdir /s /q project'
                bat 'git clone https://github.com/Satvikjain13/student-management-project.git project'
            }
        }

        stage('Docker Down') {
            steps {
                bat 'cd project && "C:\\Users\\NCS\\.docker\\cli-plugins\\docker-compose.exe" down'
            }
        }

        stage('Docker Up') {
            steps {
                bat 'cd project && "C:\\Users\\NCS\\.docker\\cli-plugins\\docker-compose.exe" up -d --build'
            }
        }
    }
}