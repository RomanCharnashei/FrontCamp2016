start cmd /k mongod --replSet testApp --dbpath "./data/node1" --port 40000
start cmd /k mongod --replSet testApp --dbpath "./data/node2" --port 40001
start cmd /k mongod --replSet testApp --dbpath "./data/arbiter" --port 40002
pause 0
mongo< replication_run.js