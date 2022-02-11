const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")


// @desc        Register new User
// @route       POST   api/users/
// @acces       Public

        /*       Registering User     */
const registerUser = asyncHandler(async (req,res)=>{
        const {name, email, password} = req.body

        // If any field is missing 
        if( !name|| !email|| !password ){
                res.status(400)
                throw new Error("Please enter all the fields")
        }

        // Check if User exists compare it to email in database
        // Use findOne()
        const userExists = await User.findOne({email})
        if(userExists){
                res.status(400)
                throw new Error("This user already exists")
        }

        // Hash new user Password
        const salt = await bcrypt.genSalt(10) 
        const hashedPassword = await bcrypt.hash(password,salt)

        // Create User
        const user = await User.create({
                name,
                email,
                password: hashedPassword,
        })

        // Check if User is created or added in the database
        if(user){
                res.status(201).json({
                        _id: user.id,
                        name: user.name, 
                        email: user.email,
                        token: generateToken(user.id)
                })
        } else{
                res.status(400)
                throw new Error("Invalid User Data")
        }

        // res.json({message: 'Register User'})

})

// @desc        Login/Authenticate User
// @route       POST   api/users/login
// @acces       Public

        /*       Authenticating/Login In User     */

const loginUser = asyncHandler(async (req,res)=>{
        const {email,password} = req.body

        // Check for user Email
        const user = await User.findOne({email})

        // Check for hashed password
        // Password sent by the user is not hashed so compare that to hashed use bcrypt compare
        // If both User email and password are true 
        if(user && (await bcrypt.compare(password, user.password))){
                res.json({
                        _id: user.id,
                        name: user.name,
                        email: user.email,
                        token: generateToken(user.id)
                })
        }

        // If password/email not correct
        else{
                // If wrong email
                if(!user){
                        res.status(400)
                        throw new Error("Enter valid email")
                }

                // If wrong password
                res.status(400)
                throw new Error("Invalid Credentials")
        }

        // res.json({message: 'Login User'})
})

// @desc        Get User data
// @route       GET   api/users/me
// @acces       Public

const getMe = asyncHandler(async (req,res)=>{
        // res.json({message: 'User display'})
        const { _id , name , email } = await User.findById(req.user.id)
        res.status(200).json({id:_id,name,email})

})

// To Generate a JWT 
const generateToken = (id) =>{
        // sign( id , jwtsecret , life )
        return jwt.sign({ id }, process.env.JWT_SECRET, {
                expiresIn: '30d'
        })
}

module.exports = {
        registerUser,
        loginUser,
        getMe
}