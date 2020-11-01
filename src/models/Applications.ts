
import { getConnection } from "typeorm";
import { Company } from "../entity/Company";
import bcrypt = require("bcrypt");
import { JobApplication } from "../entity/JobApplication";
import { Applications } from "../entity/Applications";

const saltRounds = 10;
const connectionName = process.env.DB_COMMECTION_NAME;
export class ApplicationsModel {
    async applyForAJob(jobId: bigint,
        applicantemail: string,
        cvPath: string,
        applicantmessage: string,
        applicantfullName: string,
    ) {
        const connection = getConnection(connectionName);
        const jobObj = await connection.getRepository(JobApplication).findOne({jobId,active: true,approved: true});
        if(!jobObj){
            throw new Error("job Disabled");
        }
        const companyObj = connection.getRepository(Company).find({compId: jobObj.compId,active: true,approved: true});
        if(!companyObj){
            throw new Error("Company approval pending");
        }
        const applicationsObj: Applications = new Applications();
        applicationsObj.applicantemail = applicantemail;
        applicationsObj.cvPath = cvPath;
        applicationsObj.applicantmessage = applicantmessage;
        applicationsObj.applicantfullName = applicantfullName;
        applicationsObj.jobId = jobId;

        return await connection.createEntityManager().insert(Applications,applicationsObj);

    }
   
}