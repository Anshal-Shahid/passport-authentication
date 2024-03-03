const jwt=require("jsonwebtoken")
const bcrypt=require('bcrypt')
const User=require("../models/user.model.js")
const axios=require("axios");


const userRegister_get=(req,res)=>{
    res.status(201)
    res.render("register")
}
const userRegister_post=async(req,res)=>{
    const {name,email,password,cpassword}=req.body;
    console.log("jbsd so");
    console.log(req.body)

    
    if(!name||!email||!password||!cpassword){
        res.status(404)
        throw new Error("All fields are mandatory")
    }
    
    if(password !== cpassword){
        res.status(404)
        throw new Error("Password is not matching with confirm password")
    }
    const hashPassword=await bcrypt.hash(password,10)
    

    const user=await User.create({
        name,
        email,
        password:hashPassword
    })

    // fetch("http://localhost:3000/app",{
    //     method:"GET",
    //     headers:{
    //         "Authorization":`Bearer ${token}`
    //     }
    // })  
    // .then((response)=> console.log("token is fetched!"))
    // .catch((err)=>console.log(err))
    res.redirect("/app/login")
}

const userLogin_get=(req,res)=>{
    
    
    console.log("tttttttt");

    res.render("login")
}

const userLogin_post=async(req,res)=>{
    const {email,password}=req.body;

    const user=await User.findOne( {email} )  
    .select("-password")
    const token=await jwt.sign({userID:user.id},process.env.SECRET_KEY,{expiresIn:"1m"})

    axios.get("http://localhost:3000/app",{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    console.log("hi");

    res.redirect("/app")
    
}

module.exports={
    userRegister_get,
    userRegister_post,
    userLogin_get,
    userLogin_post
};