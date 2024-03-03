const express=require("express")
const expressLayouts = require("express-ejs-layouts")
const {connectDB}=require("./config/connectionDB.js")
const { errorHandler } = require("./middleware/errorHandler.js")
const app=express()
const dotenv=require('dotenv')
const bodyParser=require("body-parser")
dotenv.config()
// const {errorHandler}=require("./middleware/errorHandler.js");

connectDB()

//EJS
// app.use(expressLayouts)
app.set("view engine","ejs")


//middleware
app.use(express.json())
app.use(bodyParser.urlencoded( { extended: true} ))
app.use(errorHandler)


app.use("/app",require("./routes/index.routes.js"))
app.use("/app",require("./routes/user.routes.js"))

app.get("/",(req,res)=>{
    res.send("dlmfs")
})


const port=3000

app.listen(3000,()=>{
    console.log("server is running on port",port)
})