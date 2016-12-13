rs.initiate()
rs.add(getHostName()+":40001")
rs.add(getHostName()+":40002", {arbiterOnly: true})
rs.status()
use bookstore
db.books.insert({title: "Some book"})