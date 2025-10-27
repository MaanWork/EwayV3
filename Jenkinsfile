pipeline {
    agent any

    environment {
        REMOTE_DIR = 'jenkins/WeCore'
    }
    tools {
        nodejs 'NodeJS_22'
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building Angular application...'
                sh 'npm install'
                sh 'ng build --configuration development --aot --build-optimizer --vendor-chunk=true --base-href=./ --source-map=false'
            }
        }

        stage('Deploy') {
            parallel {
                stage('Dev') {
                    when { branch 'dev' }
                    steps {
                        deployApp('dev-server')
                    }
                }

                stage('UAT') {
                    when { branch 'uat' }
                    steps {
                        deployApp('uat-server')
                    }
                }

                stage('Prod') {
                    when { branch 'prod' }
                    steps {
                        input message: "Deploy to Production?"
                        deployApp('prod-server')
                    }
                }
            }
        }
    }
}

def deployApp(String serverConfig) {
    script {

        sshPublisher(
            publishers: [
                sshPublisherDesc(
                    configName: serverConfig,
                    transfers: [
                        sshTransfer(
                            sourceFiles: "dist/**",
                            remoteDirectory: "${REMOTE_DIR}/tmp",
                            removePrefix: 'dist',
                            execCommand: """
                                bash -c '
                                    set -x
                                    echo "Step 1: Copied new build to tmp folder"

                                    echo "Step 2: Deleting old frontend files..."
                                    rm -rf ${REMOTE_DIR}/current/*

                                    echo "Step 3: Moving new build into current..."
                                    mv ${REMOTE_DIR}/tmp/* ${REMOTE_DIR}/current/

                                    echo "Step 4: Cleaning up tmp folder..."
                                    rm -rf ${REMOTE_DIR}/tmp

                                    echo "✅ Deployment finished. Active build is in ${REMOTE_DIR}/current"
                                '
                            """
                        )
                    ],
                    verbose: true
                )
            ]
        )
    }
}
