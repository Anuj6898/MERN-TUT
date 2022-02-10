// console.log(require('dotenv').config())
// Import installed packages 
const express = require("express")
const dotenv = require("dotenv").config({path: './.env'}).parsed
const colors = require("colors")

// Connecting to Mongo DB
const connectDB = require("./config/db")
connectDB()

// Error Handler
const {errorHandler} = require("./middlware/errorMIddleware")
const { connect } = require("mongoose")

// Import port from .env file if not found use 5000
const port = process.env.PORT || 5000

// Start express App
const app = express()

// Middleware for the req body data
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/goals', require('./routes/goalRoutes'))
app.use(errorHandler)

// Start server at particular port
app.listen(port, ()=> console.log(`Server Start at Port : ${port}`))