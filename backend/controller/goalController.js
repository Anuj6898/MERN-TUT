// Async handler to handle try and catch for async functions
const asyncHandler = require("express-async-handler") 

// desc = Get Goals
// route = GET api/goals
// access = private
// Use Async await as we use mongoose and we get back a promise 
const getGoals = asyncHandler(async (req,res) =>{
        res.status(200).json({
                message:"Get Goals"
        })
})

// desc = set/create Goals
// route = POST api/goals
// access = private
// Use Async await as we use mongoose and we get back a promise 
const setGoals = asyncHandler(async (req,res) =>{
        // Check if request body is there if not response client error 400
        if(!req.body.text){
                res.status(400)
                // Error handler
                throw new Error("Please add a text field")
        }
        res.status(200).json({
                message:"Set Goals"
        })
})

// desc = put/update Goals
// route = POST api/goals/:id
// access = private
// Use Async await as we use mongoose and we get back a promise 
const putGoals = asyncHandler(async (req,res)=>{
        res.status(200).json({
                message:`Update goal ${req.params.id}`
        })
})

// desc = Delete Goals
// route = DELETE api/goals/:id
// access = private
// Use Async await as we use mongoose and we get back a promise 
const deleteGoals = asyncHandler(async (req,res)=>{
        res.status(200).json({
                message:`Delete goal ${req.params.id}`
        })
})

// export to the routes
module.exports = {getGoals,setGoals,putGoals,deleteGoals,}