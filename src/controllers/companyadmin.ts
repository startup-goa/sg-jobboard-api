import * as express from "express";
import { Auth } from "../models/Auth";
import { auth } from "../middleware/auth";
import { CompanyModel } from "../models/Company";
import multer from "multer";
import path = require("path");
import * as bodyParser from "body-parser";
const appDir = path.dirname(require.main.filename);
const upload = multer({ dest: path.join(appDir, "/logos") });
const router = express.Router();
// get all companies which are approved or not approved or both
router.get("/", async (req, res) => {
    const pageno = 1;
    const approved = req.query.approved as boolean;
    const companymodel = new CompanyModel();
    try {
        const companyList = await companymodel.getAllCompanies(
            1, 1, approved
        );
        res.send({
            companyList
        });
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
});
router.get("/jobs/:compid", async (req, res) => {
    const pageno = 1;
    const approved = req.query.approved as boolean ;
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
        res.status(500).send("Something went wrong");
    }
});
router.put("/approve/:compid", async (req, res) => {
    const pageno = 1;
    const compid = req.params.compid as any as number;
    const companymodel = new CompanyModel();
    try {
        await companymodel.approveCompany(compid);
        res.send({
            approved: true
        });
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
});

router.put("/disable/:compid", async (req, res) => {
    const pageno = 1;
    const compid = req.params.compid as any as number;
    const companymodel = new CompanyModel();
    try {
        await companymodel.disablecompany(compid);
        res.send({
            disabled: true
        });
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
});

router.put("/enable/:compid", async (req, res) => {
    const pageno = 1;
    const compid = req.params.compid as any as number;
    const companymodel = new CompanyModel();
    try {
        await companymodel.enablecompany(compid);
        res.send({
            enabled: true
        });
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
});

export {router as companyadminRouter };