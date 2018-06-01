# Deploying Alten Application on the local machine 

This document will show the steps to deploy our docker containers foreach service using

  - Docker
  - Docker Compose

# Installtion and setup

  - Docker



Docker:
  - for mac https://docs.docker.com/docker-for-mac/install/
  - for windows https://docs.docker.com/docker-for-windows/install/
  

  
# Building the Docker Images

we have in that application 4 docker images 
 - driver service
 - vehicle service
 - monitor service
 - web ui application
 
we have two options here for building the images
 - build each service/application seperatly 
 - use docker compose to build all the images one time
 
build using noraml docker commands:
 - for each service/application navigate to the folder and  run the create-image.sh which is equl to the following command
 ```sh
docker rm -f driverservice

docker rmi driverservice

docker image prune

docker volume prune

docker build -t gcr.io/alten-189513/driverservice:0.0.1 .
```
 - runing the Docker images  containers navigate to each service folder and run the run-image.sh which is equal to the following command
 ```sh
docker run --name driverservice -p 3000:3000 --env-file config.env -d gcr.io/alten-189513/driverservice:0.0.1
```
build using  docker-compose command:
Navigate to the deployment/local folder and run run.sh file which is equal to the following command
For reference please see the docker-compose.yml file which has the build configurations

 ```sh
docker-compose -f ../docker-compose.yml up --build
```