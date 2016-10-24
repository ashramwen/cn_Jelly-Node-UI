# Jelly Node Server Deployment Guide

## Database Setup

 1. Download [Mongodb](https://www.mongodb.com/)
 2. Start Mongodb
 
 	```
 	mongod
 	```
 3. Connect to Mongodb and create Database `Jelly_Node`
 
	```
	mongo
	use Jelly_Node
	```
 4. Create User

 	```
 	db.createUser({
  		user: "<username>",
  		pwd: "<password>",
  		roles: [{
   			role: "readWrite",
    		db: "Jelly_Node"
  		}]
	})
 	```
 5. Set User credentials to local environment variables by adding the following lines to file: `~/.bash_rc` if on Linux or `_/.bash_profile` if on MacOS.
 	
 	```
 	export MONGODB_JELLY_NODE_USERNAME=<username>
	export MONGODB_JELLY_NODE_PASSWORD=<password>
 	```
 	
##Server Deployment
 
  1. Code clone or pull

  	```
  	git clone https://github.com/KiiCorp/cn_Jelly-Node-UI.git
  	git pull origin master
  	```
  2. Branch switch
  
  	```
  	git checkout master
  	```
  3. Install libraries
 	
 	```
 	cd server
 	npm install
 	```
 
  4. Run Tests

  	```
  	npm test
  	```
  5. Start server

  	```
  	pm2 start app.js --name Jelly_Node
  	```
  	
 
 

