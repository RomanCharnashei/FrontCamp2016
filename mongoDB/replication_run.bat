start cmd /k mongod --replSet testApp --dbpath "./data/node1" --port 40000
start cmd /k mongod --replSet testApp --dbpath "./data/node2" --port 40001
start cmd /k mongod --replSet testApp --dbpath "./data/arbiter" --port 40002
mongo --port 40000 "./replication_init.js"