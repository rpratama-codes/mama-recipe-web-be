// Endpoint localhost:3000/recipes/:receipt_uid/detail/comments
// SELECT * FROM commnents WHERE receipt_uid="receipt_uid"


// BE memerlukan

const paramRequest = {
	"recipe_uid": "string"
}

// BE mengembalikan

const commentsSuccess = {
	"status": 200,
	"message": "ok",
	"data": [
		{
			"recipe_uid": "string",
			"user_uid": "string",
			"message": "sting"
		}
	]
}

const failedSuccess = {
	"status": 404,
	"message": "failed",
	"data": [ "No comment found" ]
}
