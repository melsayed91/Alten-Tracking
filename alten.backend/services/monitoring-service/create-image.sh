#!/usr/bin/env bash

docker rm -f monitorservice

docker rmi monitorservice

docker image prune

docker volume prune

docker build -t gcr.io/alten-189513/monitorservice:0.0.1 .