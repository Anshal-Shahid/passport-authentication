
const express=require("express")
const {userRegister_get,userRegister_post,userLogin_get,userLogin_post}=require("../controllers/user.controller.js")

const router=express.Router();

router.route("/login").get()
router.route("/register").get(userRegister_get).post(userRegister_post)
router.route("/login").get(userLogin_get).post(userLogin_post)



module.exports=router


