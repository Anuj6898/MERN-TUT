Inside root dir
        mkdir backend touch server.js
        touch .gitigore node_modules .env

In terminal
        git init
        npm init
        npm i express mongoose dotenv colors
        npm i -D nodemon //As a dev dependency
        git add .
        git commit -m "Initial Commit"
In package.json for nodemon server reload shortcut
        "scripts": {
                "start" : "node backend/server.js",
                "server" : "nodemon backend/server.js"
        }
Inside backend
        mkdir routes //For all the routes
        mkdir controller 
        mkdir middleware touch errorMiddleware
For Database
        npm i express-async-handler
        connect mongoatlas cluster to mongocompass
        remove <password> and add your own password ck%4069 change test to db name
        in .env make a variable with the given url at atlas for application change myfirstdb to db name
        mkdir config touch db
Create Models for Database
        in backend mkdir models
        


In server.js



