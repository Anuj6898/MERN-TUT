// Middleware works during the request response cycle 
// To protect the user route by using jwt

// Import packages
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

// 
const protect = asyncHandler(async (req,res,next)=>{
        let token 

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
                try{
                        // Get token from header
                        // http auth is in format of:
                        // Bearer tokenkfjsklf 
                        token = req.headers.authorization.split(' ')[1]
                        // After split 
                        // bearer dfksdjfklsj <- token 
                        //   0      1

                        // Verify token
                        const decoded = jwt.verify( token, process.env.JWT_SECRET )

                        // Get user from the token
                        req.user = await User.findById(decoded.id).select('-password')

                        // Calls next middleware
                        next()

                }catch(error){
                        res.status(401)
                        throw new Error("Not authorized")
                }
        }

        if(!token){
                res.status(401)
                throw new Error("Not authorized , no token")
        }
})

module.exports = { protect }
