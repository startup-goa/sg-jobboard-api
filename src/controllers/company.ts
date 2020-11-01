import * as express from "express";
import { Auth } from "../models/Auth";
import { auth } from "../middleware/auth";
import { CompanyModel } from "../models/Company";
import multer from "multer";
import path = require("path");
import * as bodyParser from "body-parser";
import * as fs from "fs";
const appDir = path.dirname(require.main.filename);
const upload = multer({ dest: path.join(appDir, "/logos") });
const router = express.Router();
const logoDirectory = path.join(appDir, "/logos");
// get all companies which are approved or not approved or both
router.get("/", async (req, res) => {
    const pageno = 1;
    const approved = true;
    const companymodel = new CompanyModel();
    try {
        const companyList = await companymodel.getAllCompanies(
            1, 1, approved
        );
        res.send({
            companyList
        });
    } catch (err) {
        res.send("Something went wrong");
    }
});
router.get("/logo/:filename", async (req, res) => {
    const filename = req.params.filename;
    const companymodel = new CompanyModel();
    try {
        const filestream = fs.createReadStream(path.join(logoDirectory,filename));
        filestream.pipe(res);
    } catch (err) {
        res.status(404).send("not found");
    }
});
router.get("/jobs/:compid", async (req, res) => {
    const pageno = 1;
    const approved = true;
    const compid = req.params.compid as any as number;
    const type = req.query.type;
    const companymodel = new CompanyModel();
    try {
        const jobsList = await companymodel.getJobs(
            compid,
            approved,
            type,
            1,10000
        );
        res.send({
            jobsList
        });
    } catch (err) {
        res.send("Something went wrong");
    }
});

export {router as companyRouter };