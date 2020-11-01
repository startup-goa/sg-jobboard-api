import * as express from "express";
import { Auth } from "../models/Auth";
import { auth } from "../middleware/auth";
import { CompanyModel } from "../models/Company";
import multer from "multer";
import path = require("path");
import * as bodyParser from "body-parser";
import * as fs from "fs";
const appDir = path.dirname(require.main.filename);
const upload = multer({ dest: path.join(appDir, "/cvs") });
const router = express.Router();
const logoDirectory = path.join(appDir, "/logos");
const cvDirectory = path.join(appDir, "/cvs");

// get all companies which are approved or not approved or both
router.get("/", async (req, res) => {
    const pageno = 1;
    const approved = true;
    const companymodel = new CompanyModel();
    try {
        const companyList = await companymodel.getAllCompanies(
            1, 1, approved
        );console.log("companyList: ",companyList);
        res.send({
            companyList
        });
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
});
router.get("/jobs/:compid?", async (req, res) => {
    const pageno = req.query.pageno || 1;
    const perpage = req.query.perpage || 20;
    const approved = true;
    const compid = req.params.compid ?  req.params.compid as any as number : undefined;
    const type = req.query.type;
    const companymodel = new CompanyModel();
    try {
        const jobsList = await companymodel.getJobs(
            compid,
            approved,
            type,
            pageno,perpage
        );
        res.send({
            jobsList
        });
    } catch (err) {console.log(err);
        res.send("Something went wrong");
    }
});
router.get("/:compId", async (req, res) => {
    const pageno = 1;
    const approved = true;
    const companymodel = new CompanyModel();
    try {
        const companyObj = await companymodel.getCompany(
           req.params.compId as any as number
        );console.log("companyList: ");
        delete companyObj.password;
        delete companyObj.passwordPpdate_time;

        res.send({
            "company": companyObj
        });
    } catch (err) {
        res.status(500).send("Something went wrong");
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
router.get("/cv/:filename", async (req, res) => {
    const filename = req.params.filename;
    const companymodel = new CompanyModel();
    try {
        const filestream = fs.createReadStream(path.join(cvDirectory,filename));
        filestream.pipe(res);
    } catch (err) {
        res.status(404).send("not found");
    }
});


router.post("/job",auth ,async (req: any, res: express.Response) => {
    const compId = req.user["compId"] as number;
    const type = req.query.type;
    const companymodel = new CompanyModel();
    try {
        const jobobject =  await companymodel.assignJobsToCompany(
            compId,
            req.body.title,
            req.body.location,
            req.body.region,
            req.body.type,
            req.body.category,
            req.body.phonenumber,
            req.body.desc,
            req.body.salarymin,
            req.body.salarymax
        );
        res.send({
            job: jobobject
        });
    } catch (err) {
        res.send("Something went wrong");
    }
});
router.post("/job/apply",upload.single("cv") ,async (req: any, res: express.Response) => {
    
    const companymodel = new CompanyModel();
    let filecv;
        if (req.file) {
            filecv = req.file.filename;
        }

    try {
        
        const jobobject =  await companymodel.applyForJob(
            req.body.jobId,
            req.body.email,
            filecv,
            req.body.message,
            req.body.fullname
        );
        res.send({
            applicationDetails: jobobject
        });
    } catch (err) {
        res.send("Something went wrong");
    }
});
router.get("/job/applications/:jobid" ,auth,async (req: any, res: express.Response) => {
    const compId = req.user["compId"] as number;
    const companymodel = new CompanyModel();
    const pageno = req.query.pageno || 1;
    const perpage = req.query.perpage || 20;
    try {
        const applications =  await companymodel.getJobApplications(
            compId,
            req.params.jobid,
            pageno,
            perpage
        );
        res.send({
            applications
        });
    } catch (err) {
        res.send("Something went wrong");
    }
});

export {router as companyRouter };