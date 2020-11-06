import {Entity, 
    PrimaryGeneratedColumn, 
    Column,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,BeforeUpdate, BeforeInsert, PrimaryColumn} from "typeorm";
import {Company} from "./Company";
import { Applicant } from "./Applicant";
import { JobApplication } from "./JobApplication";
// stores applications by user
@Entity()
export class Applications {

    @PrimaryColumn({type:"bigint"})
    jobId: bigint;

    @PrimaryColumn({type: "varchar",length: 150})
    applicantemail: string;

    @ManyToOne(type => JobApplication,jobapplication =>jobapplication.applications, {primary: true})
    @JoinColumn({name: "jobId"})
    jobApplication: JobApplication;


    @Column({type: "varchar", length: 1000,nullable: true})
    cvPath: string;

    @Column({type: "varchar", length: 15,nullable: false})
    phonenumber: string;
    

    @Column({type: "boolean",default:true})
    active: boolean;

    @Column({type: "varchar", length: 1000,nullable: true})
    applicantmessage: string;

    @Column({type: "varchar", length: 500,nullable: true})
    applicantfullName: string;


    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}
