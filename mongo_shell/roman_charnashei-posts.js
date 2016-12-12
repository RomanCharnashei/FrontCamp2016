conn = new Mongo();

db = conn.getDB("roman_charnashei-posts");

db.dropDatabase();

authorsIds = db.authors.insertMany([
	{ name: "author1" },
	{ name: "author2" },
	{ name: "author3" }
	
]).insertedIds;

articles = [];
authorsIds.forEach(function(authorsId) {  
  articles.push({
    title: "title1",
    text: "text1",
    tags: ["cars", "girls"],
    comments: [{
      text: "comment1",
      tags: ["fun", "joke"]
    }, {
      text: "comment2",
      tags: ["swearing", "filthy"]
    }],
    author_id: authorsId
  });
  
  articles.push({
    title: "title2",
    text: "text2",
    tags: ["drugs", "girls"],
    comments: [{
      text: "comment1",
      tags: ["policy", "restrictions"]
    }, {
      text: "comment2",
      tags: ["music", "cinema"]
    }],
    author_id: authorsId
  });
  
});

db.articles.insertMany(articles);

db.articles.createIndex( { tags: 1 } );
db.articles.createIndex( { "comments.tags": 1 } );

db.articles.find({"comments.tags": {$eq: "filthy"}}, {title: 1, comments: 1}).sort({title: -1}).pretty();

db.articles.update(
{ $and: [{
  	  tags: { 
  	    $all:["drugs", "girls"]
  	    }
  	}, {
  	  comments: {
  	    $elemMatch:{
  	      tags:{
  	        $in:["policy", "restrictions"]
  	        }
  	      }
  	    }
  	}
  ]}, {
    $pullAll: {
      tags: ["drugs", "girls"]
      }, 
      $set: {
        text: "some another text"
      }
    } ,{multi:true});

author = db.authors.findOne({name: "author3"});
db.articles.remove({author_id: author._id});
db.authors.remove({_id: author._id});
