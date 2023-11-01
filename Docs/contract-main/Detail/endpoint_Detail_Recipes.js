// Endpoint localhost:3000/recipes/:receipt_uid/detail
// SELECT * FROM recipes WHERE receipt_uid="receipt_uid"

// yang di butuhkan BE

const paramDetail = {
	"receipt_uid": "string"
}

// BE mengembalikan

const detailSuccess = {	
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

const detailFailed = {	
	"status": 404,
	"message": "failed",
	"data" : []
}
