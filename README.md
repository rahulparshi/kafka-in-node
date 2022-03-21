# kafka-in-node
Sample project to use kafka in node js

## To start kafka 
docker-compose up -d --build
docker-compose exec broker bash

### To create a topic
kafka-topics --create --bootstrap-server broker:9092 --topic my-topic --partitions 1 --replication-factor 1

## To start kafka consumer
node app.js

## references:
https://blog.soname.solutions/apache-kafka-micro-batch-consumer-in-python-779d930b53d6
https://www.geeksforgeeks.org/node-js-async-queue-method/
