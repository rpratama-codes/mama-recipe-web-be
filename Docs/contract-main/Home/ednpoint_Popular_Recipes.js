// Endpoint localhost:3000/recipes/popular
// SELECT * FROM commnents WHERE isPopular="y"


const popularSuccess = {	
	"status": 200,
	"message": "ok",
	"data" : [
		{
			"title" : "string",
			"ingredient": "array of object",
			"image" : "string",
			"video_url" : "string",
			"receipt_uid" : "uuid"
		}
	]
}

const popularFailed = {	
	"status": 404,
	"message": "failed",
	"data" : []
}