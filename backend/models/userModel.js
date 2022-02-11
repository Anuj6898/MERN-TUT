// Import Mongoose
const mongoose = require("mongoose")

// Creating user schema
const userSchema = mongoose.Schema({
        name:{
                type: String,
                required:[true, "Please add a name"]
        },
        email:{
                type: String,
                required:[true, "Please add a email"],
                unique:true,
        },
        password:{
                type: String,
                required:[true, "Please enter password"]
        },

},{timestamps: true})

module.exports = mongoose.model("User",userSchema)