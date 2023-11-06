# Mama Recipes Web Apps
<p align="center">
  <img src="https://i.pinimg.com/originals/db/e2/1e/dbe21e079ab9fc87b282f5d42d20241a.png" align="right" height="220" width="210" />
</p>

# decription
"Mama Recipe" is a culinary application that aims to help users find the best food recipes from all over Indonesia. This app offers thousands of recipes, cooking guides, and more. We want to provide an easier and more enjoyable cooking experience.

# contributor
@arsyad12 @rizqikazukun @muhwanto0123

# setup database
```
const postgres = require('postgres') // import postgres
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const sql = postgres({

  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  pass: process.env.DB_PASS

})

module.exports = sql
```
# setup dependencies
```
    npm i bcrypt
    npm i body-parser
    npm i cors
    npm i dotenv
    npm i express
    npm i helmet
    npm i joi
    npm i jsonwebtoken
    npm i postgres
    npm i uuid
```
# setup env
```
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
DB_PORT=
FE_URI=
APP_SECRET_TOKEN=""
APP_PORT=
APP_HOST=
```
# how to run
```
npm run start
```
# API collection
