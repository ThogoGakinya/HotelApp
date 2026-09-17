import { NextFunction, Request, Response } from "express";
import { IUser, User } from "../models/User.js";
import jwt from "jsonwebtoken";


export interface AuthRequest extends Request{
    user?: IUser;
}

export const protect = async(req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    //TODO: Implement authentication logic
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    {
        try{
            token = req.headers.authorization.split(" ")[1];
            //TODO: Verify token
            const decode = jwt.verify(token, process.env.JWT_SECRET!) as {id: string};
            console.log(decode);
            req.user = await User.findById(decode.id).select("-password");
            next();
            
        }
        catch(error){
            console.error(error);
            res.status(401).json({message: "Not authorized, invalid token"});
        }
    }
    if(!token){
        res.status(401).json({message: "Not authorized, no token"});
    }
}

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
    if(req.user && req.user.role === "admin"){
        next();
    }
    else{
        res.status(401).json({message: "Not authorized as admin"});
    }
}
export const isOwner = (req: AuthRequest, res: Response, next: NextFunction): void => {
    if(req.user && req.user.role === "owner"){
        next();
    }
    else{
        res.status(401).json({message: "Not authorized as owner"});
    }
}

