// Async handler to handle try and catch for async functions
const asyncHandler = require("express-async-handler") 

// Import Models
const Goal = require("../models/goalModels")
const User = require("../models/userModel")

// desc = Get Goals
// route = GET api/goals
// access = private
// Use Async await as we use mongoose and we get back a promise 
const getGoals = asyncHandler(async (req,res) =>{
                // Respond with all the goals
                const goals = await Goal.find({ user: req.user.id })
                res.status(200).json(goals)
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
        // If body is present 
        else{
                // Create a text field in Goal and input the req.body.text
                const goal = await Goal.create({
                        text: req.body.text,
                        user: req.user.id,
                })
                res.status(200).json(goal)
        }
})

// desc = put/update Goals
// route = POST api/goals/:id
// access = private
// Use Async await as we use mongoose and we get back a promise 
const putGoals = asyncHandler(async (req,res)=>{
        const goal = await Goal.findById(req.params.id)
        // Check if given id is present if not throw error
        if(!goal){
                res.status(400)
                throw new Error("Goal not found")
        }

        // Check for user
        const user = await User.findById(req.user.id)
        if(!user){
                res.status(401)
                throw new Error("User not found")
        }

        // Make sure logged in user matches the goal user
        if(goal.user.toString()!= user.id){
                res.status(401)
                throw new Error("User not authorized")
        }

        // If id present then findByIdAndUpdate(id,updatedtext,optionsObject)
        // optionsObject - create if it doesn't exists
                const updatedGoal = await Goal.findByIdAndUpdate(
                        req.params.id,
                        req.body,
                        {new:true}
                        )
                res.status(200).json(updatedGoal)
})

// desc = Delete Goals
// route = DELETE api/goals/:id
// access = private
// Use Async await as we use mongoose and we get back a promise 
const deleteGoals = asyncHandler(async (req,res)=>{
        const goal = await Goal.findById(req.params.id)
        if(!goal){
                res.status(400)
                throw new Error
        }
        // Check for user
        const user = await User.findById(req.user.id)
        if(!user){
                res.status(401)
                throw new Error("User not found")
        }

        // Make sure logged in user matches the goal user
        if(goal.user.toString()!= user.id){
                res.status(401)
                throw new Error("User not authorized")
        }
                await goal.remove()
                res.status(200).json({id:req.params.id})
})

// export to the routes
module.exports = {getGoals,setGoals,putGoals,deleteGoals,}