const express = require("express")
const router = express.Router()
const {getGoals,setGoals,putGoals,deleteGoals} = require("../controller/goalController.js")

// Send Request using ThunderClient at https://localhost:5000/api/goals
// To listen to GET request
// app.get(endpoint,(response,request)) 
// router.get('/',(req,res)=>{
//         // Sends response to the get request
//         // res.send("Get Goals")
//         res.json({
//                 message:"Get Goals"
//         })
// })
//      router.get('/',getGoals)

// Set/Create a Goal for a POST request
//      router.post('/',setGoals)
// Shorter verson of the code above
router.route('/').get(getGoals).post(setGoals)

// To update goal using PUT which requires an id:
        // router.put('/:id',putGoals)
// To delete goal using delete which also requires an id
        // router.delete('/:id',deleteGoals)
// Shorter version of the code above
router.route('/:id').delete(deleteGoals).put(putGoals)

module.exports = router