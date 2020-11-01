import { getConnection } from "typeorm";
import { Company } from "../entity/Company";
import bcrypt = require("bcrypt");
import { JobApplication } from "../entity/JobApplication";
import { Applications } from "../entity/Applications";
import { query } from "express-validator";
const saltRounds = 10;
const connectionName = process.env.DB_COMMECTION_NAME;
export class CompanyModel {
    async createCompany(
        companyName: string,
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
        return await connection.createEntityManager().insert(Company, companyObj);
    }
    async getCompany(compId: number) {
        return this.getAllCompaniesWithJobCount(compId, 1, 1);

    }
    async getJobs(compId: number, approved: boolean, type: number, pageno: number, perpage: number) {
        const connection = getConnection(connectionName);

        const queryB = connection.getRepository(JobApplication)
            .createQueryBuilder("jobapplication");
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
        return await connection
            .createQueryBuilder()
            .from("(" + queryB.getQuery() + ")", "jobapplication")
            .setParameters(queryB.getParameters())
            .leftJoinAndSelect(Applications,"applications", "applications.jobId = jobapplication.jobId")
            .select([
                "jobapplication.jobId",
                "jobapplication.compId",
                "jobapplication.company",
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
                "sum(applications.applicantemail) as total_applications",
            ])
            .getRawMany();

    }
    async getAllCompanies(pageno: number, perpage: number, approved: boolean) {
        const connection = getConnection(connectionName);
        return await connection.getRepository(Company)
            .find({
                where: {
                    ...(() => {
                        return (approved !== undefined) ? { approved } : null;
                    })()
                },
                skip: (pageno - 1) * perpage,
                take: perpage
            });
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

        return await connection.createEntityManager().insert(JobApplication, jobapplication);

    }
    async disablejob(jobId: bigint) {
        const connection = getConnection(connectionName);
        await connection.createEntityManager().update(JobApplication, { jobId }, { active: false });
    }
    async disablecompany(compId: number) {
        const connection = getConnection(connectionName);
        await connection.createEntityManager().update(Company, { compId }, { active: false });
    }

}