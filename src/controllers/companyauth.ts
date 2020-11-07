import * as express from "express";
import { Authfactory, AuthCompany } from "../models/Auth";
import { auth } from "../middleware/auth";
import { CompanyModel } from "../models/Company";
import multer from "multer";
import path = require("path");
import * as bodyParser from "body-parser";
import { Constants } from "../util/constants";
const appDir = path.dirname(require.main.filename);
const upload = multer({ dest: path.join(appDir, "/logos") });
const router = express.Router();

router.get("/", function (req, res) {
    res.status(200).send("get auth");
});

router.post("/login",
    async (req: express.Request, res: express.Response) => {
        try {

            const auth: AuthCompany = Authfactory.getInstance(req.body.username, req.body.password, Constants.UTYPE_COMPANY) as AuthCompany;
            const companyobj = await auth.login();
            delete companyobj.password;
            delete companyobj.passwordPpdate_time;;

            const token = await auth.getToken(companyobj.compId, companyobj.companyName, Constants.UTYPE_COMPANY);
            if (token == null) {
                res.status(500).send("Token generation failed");
            } else {

                res.status(200).send({
                    token: token,
                    company: companyobj
                });
            }
        } catch (err) {console.log(err);
            res.status(500).send({ error: "some error" });
        }
    });
// router.use("/signup", bodyParser.urlencoded({ extended: true }));
router.post("/signup", upload.single("logo"),
    async (req: express.Request, res: express.Response) => {
        console.log("file: ", req.file);
        let filelogo;
        if (req.file) {
            filelogo = req.file.filename;
        }

        try {
            const companymodelObj = new CompanyModel();
            const companyObj = await companymodelObj.createCompany(
                req.body.companyUserName,
                req.body.companyDispName,
                req.body.phoneNumber,
                req.body.tagline,
                req.body.description,
                req.body.video,
                req.body.website,
                req.body.facebookPage,
                req.body.linkedinPage,
                filelogo,
                req.body.password,
                req.body.email
            );
            delete companyObj.password;
            delete companyObj.passwordPpdate_time;
            res.status(201).send({ message: "Company created",data: companyObj });

        } catch (err) {
            if (err.code == Constants.DB_ERROR_DUPLICATE) {
                res.status(422).send({ error: "Company already Exists" });

            }else{
                res.status(500).send({ error: "some error, please pass all params" });

            }

        }
    });

// router.post("/logout", auth, async (req, res) => {
//     try {
//         logout(req.user, req.token);
//         res.redirect("/");
//     } catch (e) {
//         res.status(500).send();
//     }
// });
export { router as CompanyAuthRoutes };



