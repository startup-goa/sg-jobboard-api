import * as express from "express";
import { Auth } from "../models/Auth";

const router = express.Router();

router.get("/", function (req, res) {
    res.status(200).send("get auth");
});

router.post("/",
    async (req: express.Request, res: express.Response) => {

        const auth: Auth = new Auth(req.body.username, req.body.password);
        try {
            
        } catch (err) {
            res.status(500).send({error: "some error"});

        }
    });

export { router as AuthRoutes };



