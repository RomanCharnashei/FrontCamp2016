mongo < roman_charnashei-posts.js
mongodump --db roman_charnashei-posts --gzip --archive=.
mongoimport --db roman_charnashei-students --collection marks --file grades.json
mongo < roman_charnashei-students.js