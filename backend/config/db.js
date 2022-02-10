// Import Mongoose
const mongoose = require("mongoose")

// Establish connection with your databse
// Should be an async as it returns a promise
// Pass in the uri copied from the mongodb page
const connectDB = async ()=>{
        try{
                const conn = await mongoose.connect(process.env.MONGO_URI)
                console.log(`Mongo DB connected : ${conn.connection.host}`.green.bgYellow.underline.italic)
        }
        catch(err){
                console.log(err)
                process.exit(1)
        }
}

module.exports = connectDB