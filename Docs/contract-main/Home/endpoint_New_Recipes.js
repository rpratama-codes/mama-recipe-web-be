// Endpoint localhost:3000/recipes/new
// SELECT * FROM commnents ORDER BY created_at DESC

const newSuccess = {
  status: 200,
  message: 'ok',
  data: [
    {
      title: 'string',
      ingredient: 'array of object',
      image: 'string',
      video_url: 'string',
      receipt_uid: 'uuid'
    }
  ]
}

const newFailed = {
  status: 404,
  message: 'failed',
  data: []
}
