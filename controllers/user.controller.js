const jwt=require("jsonwebtoken")
const bcrypt=require('bcrypt')
const User=require("../models/user.model.js")
const asyncHandler=require("express-async-handler")



//funcs

const userRegister_get=asyncHandler(async(req,res)=>{
    res.status(201)
    res.render("register")
})
const userRegister_post=asyncHandler( async(req,res)=>{
    const {name,email,password,cpassword}=req.body;
    
    if(!name||!email||!password||!cpassword){
        res.status(404)
        throw new Error("All fields are mandatory")
    }
    
    if(password !== cpassword){
        res.status(404)
        throw new Error("Password is not matching with confirm password")
    }
    const hashPassword=await bcrypt.hash(password,10)
    
    const verifyUser= await User.findOne({email:email})
    if(verifyUser){
        res.status(404)
        throw new Error("Email already exists")
    }
    const user=await User.create({
        name,
        email,
        password:hashPassword
    })

    res.redirect("/app/login")
})

const userLogin_get=asyncHandler((req,res)=>{
    res.render("login")
})

const userLogin_post=asyncHandler( async(req,res)=>{
    const {email,password}=req.body;

    //check user from db
    const user=await User.findOne( {email} )  
    const hashPassword=await bcrypt.compare(password,user.password)


    if(!user||!(hashPassword )){
        res.status(404)
        throw new Error("Invalid Email or Password") 
    }

    //token
    const token=await jwt.sign({userID:user.id},process.env.SECRET_KEY,{expiresIn:"30m"})
    
    //cookie
    res.clearCookie('token');
    res.cookie('token', token, { maxAge: 3600000, httpOnly: true });

    res.redirect("/app")
})

const userLogout=asyncHandler( async(req,res)=>{
    res.clearCookie('token');
    res.redirect("/app/login")

})

module.exports={
    userRegister_get,
    userRegister_post,
    userLogin_get,
    userLogin_post,
    userLogout
};