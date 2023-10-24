import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    Post : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "posts",
    }]
});
const users = mongoose.model("users",userschema);
export default users;