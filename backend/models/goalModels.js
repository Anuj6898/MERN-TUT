const mongoose = require("mongoose")

// Create a Schema for your model
// mongoose.Schema({fields},{timestamps})
const goalSchema = mongoose.Schema({
        text: {
                type: String,
                required: [true, "Please Add a Text value"]
        }

}, {
        timestamps: true,
})

// Export your model mongoose.model("Name of model",schema) 
module.exports = mongoose.model("Goal", goalSchema)