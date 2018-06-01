#!/usr/bin/env bash

docker rm -f driverservice

docker rmi driverservice

docker image prune

docker volume prune

docker build -t gcr.io/alten-189513/driverservice:0.0.1 .