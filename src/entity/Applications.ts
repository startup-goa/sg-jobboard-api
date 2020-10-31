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

    @PrimaryColumn({type:"bigint"})
    applicantId: bigint;

    @ManyToOne(type => JobApplication,{primary: true})
    @JoinColumn({name: "jobId"})
    jobApplication: JobApplication;

    @ManyToOne(type => Applicant,{primary: true})
    @JoinColumn({name: "applicantId"})
    applicant: Applicant;

    @Column({type: "boolean",default:true})
    active: boolean;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}
