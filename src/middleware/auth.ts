import * as jwt from "jsonwebtoken";
import * as express from "express";


const JWT_SECRET = "1234567890nfrij";

const auth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const token = req.cookies["auth_token"];
        const decoded = jwt.verify(token, JWT_SECRET);

        
        return next();

    } catch (e) {
        res.status(401).send("Not Auth");
    }
};


export  {auth};