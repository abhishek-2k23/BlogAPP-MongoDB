import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let conn = null;

const dbConnection = async() => {
    if(conn == null){
        console.log("creating new connection");
        conn =  mongoose.connect(process.env.DB_URL).then(() => mongoose);
        await conn;

        // const postdata = await posts.find();
        // console.log('connection established');

        // await mongoose.disconnect();
        // return postdata;
        return conn;
    }

    console.log('connection already established');
    return conn;
}

export default dbConnection;