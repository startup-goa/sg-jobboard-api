import { getConnection } from "typeorm";
import { Company } from "../entity/Company";
import bcrypt = require("bcrypt");
import { JobApplication } from "../entity/JobApplication";
import { Applications } from "../entity/Applications";
import { query } from "express-validator";
import * as path from "path";
const saltRounds = 10;
const connectionName = process.env.DB_COMMECTION_NAME;
export class CompanyModel {
    async createCompany(
        companyName: string,
        companyDispName: string,
        phoneNumber: string,
        tagline: string,
        description: string,
        video: string,
        website: string,
        facebookPage: string,
        linkedinPage: string,
        logo: string,
        password: string
    ) {
        const connection = getConnection(connectionName);
        const companyObj = new Company();
        companyObj.companyName = companyName;
        companyObj.companyDispName = companyDispName;
        companyObj.phoneNumber = phoneNumber;
        companyObj.tagline = tagline;
        companyObj.description = description;
        companyObj.video = video;
        companyObj.website = website;
        companyObj.facebookPage = facebookPage;
        companyObj.linkedinPage = linkedinPage;
        companyObj.logo = logo;
        const hash = await bcrypt.hash(password, saltRounds);
        companyObj.password = hash;
        await connection.createEntityManager().insert(Company, companyObj);
        return companyObj;
    }
    async getCompany(compId: number) {
        const connection = getConnection(connectionName);
        const compObject = await connection.getRepository(Company)
            .findOne({
                where: {
                    compId

                }
            });
        if (compObject.logo) {
            compObject.logo = path.join(process.env.BASE_URL, "company/logo", compObject.logo);
        }
        return compObject;
        // return this.getAllCompaniesWithJobCount(compId, 1, 1);

    }
    async getCompanyByuserName(compUserName: string) {
        const connection = getConnection(connectionName);
        const compObject = await connection.getRepository(Company)
            .findOne({
                where: {
                    companyName: compUserName
                }
            });
        if (compObject.logo) {
            compObject.logo = path.join(process.env.BASE_URL, "company/logo", compObject.logo);
        }
        return compObject;
    }
    async getJobs(compId: number, approved: boolean, type: number, pageno: number, perpage: number) {
        const connection = getConnection(connectionName);

        const queryB = connection.getRepository(JobApplication)
            .createQueryBuilder("jobapplication")
            .innerJoinAndSelect("jobapplication.company", "company")
            .select([
                "jobapplication.jobId as jobId",
                "jobapplication.compId as compId",
                "jobapplication.jobTitle as jobTitle",
                "jobapplication.location as location",
                "jobapplication.region as region",
                "jobapplication.type as type",
                "jobapplication.category as category",
                "jobapplication.active as active",
                "jobapplication.phoneNumber as phoneNumber",
                "jobapplication.description as description",
                "jobapplication.salarymin as salarymin",
                "jobapplication.salarymax as salarymax",
                "jobapplication.approved as approved",
                "company.companyDispName as companyDispName",
                "company.description as companydescription",
                "company.website as website",
                "company.logo as logo",


            ]);
        if (compId) {
            queryB.andWhere("jobapplication.compId = :compId", { compId });
        }
        if (approved) {
            queryB.andWhere("jobapplication.approved = :approved", { approved });
        }
        if (type) {
            queryB.andWhere("jobapplication.compId = :compId", { type });
        }
        queryB.offset((pageno - 1) * perpage)
            .limit(perpage);
        const records = await connection
            .createQueryBuilder()
            .from("(" + queryB.getQuery() + ")", "jobapplication")
            .setParameters(queryB.getParameters())
            // .leftJoinAndSelect(Applications, "applications", "applications.jobId = jobapplication.jobId")
            .select([
                "jobapplication.jobId",
                "jobapplication.jobTitle",
                "jobapplication.location",
                "jobapplication.region",
                "jobapplication.type",
                "jobapplication.category",
                "jobapplication.active",
                "jobapplication.phoneNumber",
                "jobapplication.description",
                "jobapplication.salarymin",
                "jobapplication.salarymax",
                "jobapplication.approved",
                "jobapplication.compId",
                "jobapplication.companyDispName",
                "jobapplication.companydescription",
                "jobapplication.website",
                "jobapplication.logo",
                // "count(applications.applicantemail) as total_applications",
            ])
            // .groupBy("jobapplication.jobId")
            .getRawMany();
        for (const compObject of records) {
            if (compObject.logo) {
                compObject.logo = path.join(process.env.BASE_URL, "company/logo", compObject.logo);
            }

        }
        return records;
    }
    async getAllCompanies(pageno: number, perpage: number, approved: boolean) {
        const connection = getConnection(connectionName);
        const query = connection.getRepository(Company)
            .createQueryBuilder("company");
        if (approved !== undefined) {
            console.log("approved: ", approved);

            query.where(
                "company.approved = :approved", { approved }
            );
        }
        const records = await query.getMany();
        for (const compObject of records) {
            if (compObject.logo) {
                compObject.logo = path.join(process.env.BASE_URL, "company/logo", compObject.logo);
            }
            delete compObject.password;
            delete compObject.passwordPpdate_time;

        }
        console.log("query: ", records);

        return records;

    }
    async getAllCompaniesWithJobCount(compId: number, pageno: number, perpage: number) {
        const finalresutls: { [key: number]: Record<string, any> } = {};
        const connection = getConnection(connectionName);
        const query = connection.getRepository(Company)
            .createQueryBuilder("company")
            .innerJoinAndSelect("company.jobApplications", "jobApplications")
            .innerJoinAndSelect("company.jobApplications", "jobApplicationspending")
            .select(
                [
                    "company.compId as compId",
                    "company.companyName as companyName",
                    "company.phoneNumber as phoneNumber",
                    "company.tagline as tagline",
                    "company.description as description",
                    "company.video as video",
                    "company.website as website",
                    "company.facebookPage as facebookPage",
                    "company.linkedinPage as linkedinPage",
                    "company.logo as logo",
                    "company.active as active",
                    "company.approved as approved",
                    "sum(jobApplications.jobId) as totalJobApplications"
                ]
            )
            .where("active = true")

            .groupBy("company.compId")
            .addGroupBy("company.approved")
            .offset((pageno - 1) * perpage)
            .limit(perpage)
            .orderBy("company.companyName");
        if (compId) {
            query.andWhere("compId = :compId", { compId });
        }
        const records = await query.getRawMany();
        for (const record of records) {
            if (!finalresutls[record["compId"]]) {
                finalresutls[record["compId"]] = record;
            }
            if (record["approved"] === true) {
                finalresutls[record["compId"]]["approvedcount"] = record["totalJobApplications"];
            }
            if (record["approved"] === false) {
                finalresutls[record["compId"]]["pendingcount"] = record["totalJobApplications"];
            }
        }
        return finalresutls;

    }
    async assignJobsToCompany(compId: number,
        jobTitle: string,
        location: string,
        region: string,
        type: number,
        category: string,
        phoneNumber: string,
        description: string,
        salarymin: number,
        salarymax: number,

    ) {
        const connection = getConnection(connectionName);
        const jobapplication: JobApplication = new JobApplication();
        jobapplication.compId = compId;
        jobapplication.jobTitle = jobTitle;
        jobapplication.location = location;
        jobapplication.region = region;
        jobapplication.type = type;
        jobapplication.category = category;
        jobapplication.phoneNumber = phoneNumber;
        jobapplication.description = description;
        jobapplication.salarymin = salarymin;
        jobapplication.salarymax = salarymax;

        await connection.createEntityManager().insert(JobApplication, jobapplication);
        return jobapplication;

    }
    async disablejob(jobId: bigint) {
        const connection = getConnection(connectionName);
        await connection.createEntityManager().update(JobApplication, { jobId }, { active: false });
    }
    async disablecompany(compId: number) {
        const connection = getConnection(connectionName);
        await connection.createEntityManager().update(Company, { compId }, { active: false });
    }
    async enablecompany(compId: number) {
        const connection = getConnection(connectionName);
        await connection.createEntityManager().update(Company, { compId }, { active: true });
    }
    async approveCompany(compId: number) {
        const connection = getConnection(connectionName);
        await connection.createEntityManager().update(Company, { compId }, { approved: true });
    }
    async applyForJob(
        jobId: bigint,
        applicantemail: string,
        cvPath: string,
        applicantmessage: string,
        applicantfullName: string,
        phonenumber: string
    ) {
        const applicationobj = new Applications();
        applicationobj.jobId = jobId;
        applicationobj.applicantemail = applicantemail;
        applicationobj.cvPath = cvPath;
        applicationobj.applicantmessage = applicantmessage;
        applicationobj.applicantfullName = applicantfullName;
        applicationobj.phonenumber = phonenumber;
        const connection = getConnection(connectionName);
        await connection.createEntityManager().insert(Applications, applicationobj);
        return applicationobj;
    }
    async getJobApplications(compId: number,jobId: bigint, pageno: number = 1, perpage: number = 20) {
        const connection = getConnection(connectionName);
        const records =  await connection.getRepository(Applications).createQueryBuilder("appl")
        .innerJoinAndSelect("appl.jobApplication","jobApplication")
            .where("appl.jobId = :jobId and jobApplication.compId = :compId", { jobId,compId })
            .skip((pageno - 1)*perpage)
            .take(perpage)
            .getMany();
        for(const record of records){
            record.cvPath = path.join(process.env.BASE_URL, "company/cv", record.cvPath);
        }
        return records;
    }
}