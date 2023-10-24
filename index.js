//imports
import express from "express";
import dbConnection from "./Configuration/db.js";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import fileupload from "express-fileupload";
import cookieParser from "cookie-parser";

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

//configurations
dbConnection();

//server up
app.listen(process.env.DB_PORT,()=>{console.log("server is up at ",process.env.DB_PORT)});
app.get("/",(req,res)=>{res.send(`<h1>Welcome to the Home Route of the Blog App Backend`)});

//Route Mounting
import postRouter from "./Routes/post.js";
import userRouter from "./Routes/user.js";

//mounting routes
app.use("/post",postRouter);
app.use("/auth",userRouter);