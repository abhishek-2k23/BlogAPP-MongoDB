//imports
import express from "express";
import dbConnection from "./Configuration/db.js";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import fileupload from "express-fileupload";
import cookieParser from "cookie-parser";
import { cloudinaryConnect } from "./Configuration/cloudinary.js";


// app intialization
const app = express();

//app using middlewares
app.use(express.json());
app.use(cors());
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use(cookieParser());

//for serverless 
app.use((req, res,error, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }

    next();
})
//configurations
dbConnection();
cloudinaryConnect();

//server up
app.get((req,res)=>{res.send(`<h1>Welcome to the Home Route of the Blog App Backend`)});



//Route Mounting
import postRouter from "./Routes/post.js";
import userRouter from "./Routes/user.js";

//mounting routes
app.use("/post",postRouter);
app.use("/auth",userRouter);



//exporting our app on serverless


export {app};
