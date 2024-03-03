const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")


const connectDB = asyncHandler(async () => {

    try {
        mongoose.connect(process.env.DATABASE_URL + '/passport')
        .then(() => console.log('Database connected successfully'))
    } catch (err) {
        console.log(err);
        process.exit(1)
    }

})

module.exports={connectDB}

