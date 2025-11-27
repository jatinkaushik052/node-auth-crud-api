const mongoose = require('mongoose')

const connectDB = async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/myCrud')
        console.log("MongoDb Connected!!!!!!")
    } catch (error) {
        console.log("MongoDB Not Connected", error)
    }
}

module.exports = connectDB;