# Backend Recipes Apps (Mama Recipe and Tomato )

![badge](./Docs/Pictures/badge-mama-recipe-x-tomato.png)  
This is a repository for Mama Recipe and Tomato, both are same application while Tomato is a fork from Mama Recipe Project. This Project is about a recipe applicaion that has a service like adding,save,favorite,like recipe, and other.

Check this link to view the Mama Recipe Web : <https://recipes-web-fe.vercel.app/>

## Table of content
- [Backend Recipes Apps (Mama Recipe and Tomato )](#backend-recipes-apps-mama-recipe-and-tomato-)
	- [Table of content](#table-of-content)
	- [How to run](#how-to-run)
		- [Environment](#environment)
	- [Contributor](#contributor)
	- [Screenshoots](#screenshoots)
		- [Home](#home)
		- [Recipe Detail](#recipe-detail)
		- [Recipe Login Register](#recipe-login-register)

## How to run  

On Local :

1. Clone this repository ``https://github.com/Team-A-Pijarcamp-Batch-15/receipes-web-be``
2. Install the dependencies with command  ``npm install``  
3. Setup the environment variable bellow.
4. Run with command ``npm run start`` or for the next using ``npm run dev``

note that npm run start will also running the migration database, so please configure the environment properly.

### Environment

Please use ``.env.local`` for local environment setting for development. Fill related configuration below before running the app.

```bash
# ADD APP Environment Setting
NODE_ENV=
APP_HOST=
PORT=

# Fill with generated SHA1 hash for JWT Secret
APP_SECRET_TOKEN=

# ADD FE_URI for Spesific CORS Setting
FE_URI=

# CONFIG DB PRODUCTION
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
DB_PORT=

# CONFIG FOR LOCAL
DB_HOST_LOCAL=
DB_USER_LOCAL=
DB_PASS_LOCAL=
DB_NAME_LOCAL=
DB_PORT_LOCAL=

```

## Contributor

- @arsyad12
- @rizqikazukun
- @muhwanto0123

## Screenshoots

### Home

![badge](./Docs/Pictures/recipes-web-fe.vercel.app_home.png)  

### Recipe Detail

![badge](./Docs/Pictures/recipes-web-fe.vercel.app_detail.png)

### Recipe Login Register

Note that login register has same design.

![badge](./Docs/Pictures/recipes-web-fe.vercel.app_login.png)
