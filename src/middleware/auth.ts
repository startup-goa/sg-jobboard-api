import * as jwt from "jsonwebtoken";
import * as express from "express";
import { Auth } from "../models/Auth";


const JWT_SECRET = "1234567890nfrij";

const auth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        if (req.headers.authorization == null) {
            //no token 
            // next(new Error("Authorization Error"));
            return res.status(401).send("Not Auth");

            return;
        }
        const tokenPayload = Auth.verifyToken(req.headers.authorization.split(" ")[1]);
        if (tokenPayload) {
            req.user = tokenPayload;
            // valid
            return next();
        } else {
            return res.status(401).send("Not Auth");
        }

    } catch (e) {
        return res.status(401).send("Not Auth");
    }
};


export { auth };