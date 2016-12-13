db = connect(getHostName()+":40000/bookstore");
db.books.insert({title: "Some book"});