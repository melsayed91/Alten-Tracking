docker-compose -f ../docker-compose.yml build

kubectl create -f deployment.yml

kubectl create -f service.yml