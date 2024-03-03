
const express=require("express")


const router=express.Router();

router.get("/",(req,res)=>{
    
    console.log("df szc zsds dlb");
    
    const a=req.headers.authorization;
    console.log(a);
    console.log("abe yar!");
    res.render("welcome.ejs")
})




module.exports=router


