import {Entity, 
    PrimaryGeneratedColumn, 
    Column,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,BeforeUpdate, BeforeInsert, OneToMany} from "typeorm";
import { JobApplication } from "./JobApplication";
@Entity()
export class Company {

    @PrimaryGeneratedColumn()
    compId: number;

    @Column({type: "varchar", length: 200, unique: true ,nullable: false})
    companyName: string;

    @Column({type: "varchar", length: 200, unique: true ,nullable: false})
    companyDispName: string;

    @Column({type:"varchar",length:15})
    phoneNumber: string;

    @Column({type:"varchar",length:1000, nullable: true})
    tagline: string;

    @Column({type:"varchar",length:1000, nullable: true})
    description: string;

    @Column({type:"varchar",length:1000, nullable: true})
    video: string;
    
    @Column({type:"varchar",length:1000, nullable: true})
    website: string;
    
    @Column({type:"varchar",length:1000, nullable: true})
    facebookPage: string;

    @Column({type:"varchar",length:1000, nullable: true})
    linkedinPage: string;
    
    @Column({type:"varchar",length:1000,nullable: true})
    logo: string;

    @Column({type: "varchar", length: 500,nullable: false})
    password: string;

    @Column({type: "boolean",default:true})
    active: boolean;

    @Column({type: "boolean",default:false})
    approved: boolean;

    @Column({type:"timestamp",default: ()=>"CURRENT_TIMESTAMP"})
    passwordPpdate_time: Date;

    @OneToMany(type => JobApplication,aobApplication => aobApplication.company)
    jobApplications: JobApplication[];


    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}
