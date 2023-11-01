// Endpoint localhost:3000/recipes/popular
// SELECT * FROM recipes LIMIT 6;

const listSuccess = {	
	"status": 200,
	"message": "ok",
	"data" : [
		{
			"title" : "string",
			"simple_desc" : "tring",
			"image": "string"
		},
		{
			"title" : "string",
			"simple_desc" : "tring",
			"image": "string"
		},
		{
			"title" : "string",
			"simple_desc" : "tring",
			"image": "string"
		}
		
	]
}

const listFailed = {	
	"status": 404,
	"message": "failed",
	"data" : []
}