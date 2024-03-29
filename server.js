import express from "express";
import mongoose from "mongoose";
import multer from "multer"
import cors from "cors"
import cookieParser from "cookie-parser"
import "dotenv/config"
import doctorsRoute from "./routes/doctor.route.js"
import userRoute from "./routes/user.route.js"
import authRoute from "./routes/auth.route.js"

// Function to handle Error on MongoDB connection
const connect = async ( ) => {
    try{        
        await mongoose.connect(process.env.MONGODB)
        console.log("Connect to MongoDB");
    }catch (error){
        throw(error)
    }
}
// Connection watch for MongoDB
mongoose.connection.on("disconnected", ()=> {
    console.log("mongoDB disconnected!");
})

const app = express()

// middlewares
app.use(cors({
    origin: true,
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use("/images", express.static("./images"));

app.use("/api/users", userRoute)
app.use("/api/doctors", doctorsRoute)
app.use("/api/auth", authRoute)

//ErrorHandler
app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong, Error in Errorhandler!"
    return res.status(errorStatus).json({
        success: false,
        status:errorStatus,
        message:errorMessage,
        // more Details about the error
        stack: err.stack,
    })
})

// Server Listen with connect() function call for restart every change
app.listen(process.env.PORT, () => 
{
connect()
console.log("Server läuft auf Port:", process.env.PORT)
})