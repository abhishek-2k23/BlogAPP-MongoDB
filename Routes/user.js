import express from "express";

//router initialization
const userRouter = express.Router();

//controller imports
import { register,login, logout} from "../Controllers/user.js";

//creating routes
userRouter.post("/register",register);
userRouter.post("/login",login);
userRouter.post("/logout",logout);


//exporting Router
export default userRouter;