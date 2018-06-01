# Deploying Alten Application on the Cloud using GCP (Google Cloud Platform)

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