# Alten Monitoring System

This document will show the following points
  
  - Description
  - Technologies 
  - Solution 
  - Deployment
  - TO be done

# Description
This is a solution for monitoring the vehicles that is used by clients/drivers by simulating a signals from the vehicles to indicate if the vehicle is connected or not and then push those updates to the monitor screen 
# Technologies
  - Nodejs
  - Express framework 
  - Mongodb 
  - socket.io
  - angular v2+
  - html 5
  - TypeScript
  - material design
  - Docker
  - Kubernetes
  - GCP (Google CLoud Platform)
  - nginx (for hosting the frontend application)
# Solution
  - Database Design
      - Driver collection (this collection will hold all the driver data including a reference of all the vehicle the driver/client has)
      - Vehicle collection (this collection will hold all the vehicle data)
      - signal collection (this collection will hold only the current status of each vehicle assigned to a driver)
      - signalHostory collection (this collection will hold all the signals comming from the vehicles and this will be used for analysis and historical data purpose)
  - Solution architcture
      - Driver microservice (this for handling everything related to the driver) you can check the documentation on http://35.226.207.117:3000/apidoc/
      - Vehicels microservice (this for handling everything related to the vehicle)  you can check the documentation on http://35.226.80.98:3001/apidoc/
      - Monitor microservice (this service will generate the random signals every one minute and then push the updates to all connected clients to see the last status of vehicles on the dashboard)
      you can check the documentation on http://35.202.25.240:3002/apidoc/
      - alten.fronend (this is our web ui frontend application and it consists of three pages dashboard page that will show the monitoring updates and a simple metrics , driver pgae , vehicle page)
  - Cloud architcture
    - we have every application containrized using docker
    - i used the google container engine with kubernetes to deploy my application
    - we have a cluster that has one replica for each the applications
# Deployment
 #### 1- Running The Code on the local machine
    - clone the repo from here https://github.com/melsayed91/Alten.git
    - make sure that you have nodejs installed on your machine by run the command node --version
    - navigate to each folder in alten.backend and run npm install
    - navigate to alten.frontend and run npm install 
    - navigate to each folder in altern backend and run npm start
    - navigate to alten.frontend and run ng serve
# 2- Deploying Alten Application on the Cloud using GCP (Google Cloud Platform)

This document will show the steps to deploy our docker containers foreach service using
  
  - Kubernetes https://kubernetes.io/
  - Google Kubernetes engine 
  - Docker
  - Docker Compose

# Installtion and setup

  - Docker
  - gcloud
  - kubectl


Docker:
  - for mac https://docs.docker.com/docker-for-mac/install/
  - for windows https://docs.docker.com/docker-for-windows/install/
  

gcloud:
  - for mac https://cloud.google.com/sdk/docs/#mac
  - for windows https://cloud.google.com/sdk/docs/quickstart-windows

after downloading and setup gcloud run the following command
```sh
gcloud init
```



kubectl:
```sh
gcloud components install kubectl
```

# Creating the Project on Cloud
  - go to https://console.cloud.google.com
  - create new project named "alten"

# Preparing the Deployment environment
  - Set default project by run the command 
  ```sh
gcloud config set project alten-189513
```
 - Create new cluster by run the command
  ```sh
gcloud container clusters create alten-cluster
```
- set the default cluster 
```sh
gcloud config set container/cluster alten-cluster
```

we have now a Kubernetes cluster on Our GCP project that will contain our containerized services
  
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
 - for each service/application run the command  
 ```sh
docker build -t gcr.io/alten-189513/driverservice:0.0.1 .
docker build -t gcr.io/alten-189513/vehicleservice:0.0.1 .
docker build -t gcr.io/alten-189513/monitorservice:0.0.1 .
docker build -t gcr.io/alten-189513/webui:0.0.1 .
```
 - pushing the Docker images to the container registery
 ```sh
gcloud docker -- push gcr.io/alten-189513/driverservice:0.0.1
gcloud docker -- push gcr.io/alten-189513/vehicleservice:0.0.1
gcloud docker -- push gcr.io/alten-189513/monitorservice:0.0.1
gcloud docker -- push gcr.io/alten-189513/webui:0.0.1
```
 - Make the Docker containers from the images created
 ```sh
kubectl run alten-deployment --image=gcr.io/alten-189513/driverservice:0.0.1 --port=3000
kubectl run alten-deployment --image=gcr.io/alten-189513/vehicleservice:0.0.1 --port=3001
kubectl run alten-deployment --image=gcr.io/alten-189513/monitorservice:0.0.1 --port=3002
kubectl run alten-deployment --image=gcr.io/alten-189513/webui:0.0.1 --port=8080
```
 -Expose the services to external traffic
 ```sh
kubectl expose alten-deployment driverservice --type="LoadBalancer"
kubectl expose alten-deployment vehicleservice --type="LoadBalancer"
kubectl expose alten-deployment monitorservice --type="LoadBalancer"
kubectl expose alten-deployment webui --type="LoadBalancer"
```
Note: i have used here a deployment.yml file to do all of the deployment steps
and for building the images i have used docker-compose to build all the images at one time
you can check the docker-compose.yml file alse to see the configurations

and run only two commands
 ```sh
gcloud container clusters get-credentials alten-cluster --zone us-central1-a --project alten-189513
kubectl proxy
kubectl create -f deployment.yml
kubectl create -f service.yml
```



# 3- Deploying Alten Application on the local machine 

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

# 4- To be Done
 - security using webtokens 
 - apply https , ssl
 - add the modify data functions to the driver service (adding new driver , update driver data)
 - add the modify data functions to the vehicles service (adding new vehicle , assign vehicle to driver , update or remove a vehicle )