#!/usr/bin/env bash

docker rm -f vehicleservice

docker rmi vehicleservice

docker image prune

docker volume prune

docker build -t gcr.io/alten-189513/vehicleservice:0.0.1 .