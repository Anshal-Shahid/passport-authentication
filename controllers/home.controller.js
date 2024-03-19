
const express = require("express")
const jwt = require("jsonwebtoken")
const User=require("../models/user.model.js")

const asyncHandler=require("express-async-handler")

const home=asyncHandler(async (req, res) => {
    let token;

    if (!token && req.cookies.token) {
        token = req.cookies.token

    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            console.log("yelo1");
            res.clearCookie("token");
            res.render("welcome")
        } else {
            console.log("yelo2");
            // get name from User model
            let user=await User.findById(decoded.userID)
            let username =user.name

            res.status(201)
            res.render('layout.ejs', { user: username });
        }
    });

})

module.exports={home}