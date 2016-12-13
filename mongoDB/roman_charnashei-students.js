conn = new Mongo();

db = conn.getDB("roman_charnashei-students");

db.marks.aggregate([
	{
	  $project: {
	    student_id: 1,
	   	class_id: 1,
	   	scores: {
	   	  $filter: {
	   	    input: "$scores",
	   	    as: "score",
	   	    cond: { $ne: ["$$score.type", "quiz"]  }
	   	  }
	   	}	   	
	  }
	},
	{
	  $unwind: "$scores"
	},
	{
	  $group: {
	    _id: {
	      student_id: "$student_id",
	      class_id: "$class_id"
	    },
	    avg_score: {
	      $avg: "$scores.score"
	    }
	  }
	},
	{
	  $project: {
	    _id: 0,
	    student_id: "$_id.student_id",
	    class_id: "$_id.class_id",
	    avg_score: 1
	  }
	},
	{
	  $group: {
	    _id: "$class_id",
	    class_avg_mark: {$avg: "$avg_score"}
	  }
	},
	{
	  $sort: {class_avg_mark: -1}
	},
	{
	  $limit: 1
	}
]).pretty().toArray();