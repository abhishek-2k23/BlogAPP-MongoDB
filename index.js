//imports
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import fileupload from "express-fileupload";
import cookieParser from "cookie-parser";
import { cloudinaryConnect } from "./Configuration/cloudinary.js";


// app intialization
const app = express();

const corsOptions = {
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  };

//app using middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use(cookieParser());

//for serverless 
// app.use((req, res,error, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

//     if(req.method === "OPTIONS"){
//         res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//         return res.status(200).json({});
//     }

//     next();
// })

cloudinaryConnect();

//server up
app.get("/", (req,res)=>{
  return {
    statusCode: 200,
    body: JSON.stringify("Server up and running"),
  }
});


//Route Mounting
import postRouter from "./Routes/post.js";
import userRouter from "./Routes/user.js";

//mounting routes
app.use("/post",postRouter);
app.use("/auth",userRouter);

//exporting our app on serverless
export {app};
