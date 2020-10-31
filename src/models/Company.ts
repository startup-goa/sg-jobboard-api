import { getConnection } from "typeorm";
import { Company } from "../entity/Company";
import bcrypt = require("bcrypt");
import { JobApplication } from "../entity/JobApplication";
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
    async getCompany(compId: number){
        const connection = getConnection(connectionName);
        return await connection.getRepository(Company)
        .createQueryBuilder("company")
        .select([

        ]);

    }
    async getCompanyJobs(compId: number,pageno: number,perpage: number){
        const connection = getConnection(connectionName);
        return await connection.getRepository(JobApplication)
        .find({
           where: {
            compId
           },
           skip: (pageno-1)*perpage,
           take: perpage
        });
    }
    // async getAllCompanies(){

    // }
    // async verifyPassword(password: string){
    //     const isTrue: boolean = await bcrypt.compare(password, _user.password);

    // }

}