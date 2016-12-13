mongo roman_charnashei-posts --eval "db.dropDatabase()"
mongo < roman_charnashei-posts.js
mongodump --db roman_charnashei-posts --gzip --archive=.
mongo roman_charnashei-students --eval "db.dropDatabase()"
mongoimport --db roman_charnashei-students --collection marks --file grades.json
mongo < roman_charnashei-students.js