import {Entity, 
    PrimaryGeneratedColumn, 
    Column,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,BeforeUpdate, BeforeInsert} from "typeorm";
import {Company} from "./Company";
// Job applications created by user
@Entity()
export class JobApplication {
    @PrimaryGeneratedColumn({type:"bigint"})
    jobId: bigint;

    @Column({type: "integer"})
    compId: number;

    @ManyToOne(type => Company, company => company.jobApplications)
    @JoinColumn({name: "compId"})
    company: Company;

    @Column({type: "varchar", length: 1000,nullable: false})
    jobTitle: string;

    @Column({type: "varchar", length: 500,nullable: true})
    location: string;

    @Column({type: "varchar", length: 500,nullable: true})
    region: string;

    @Column({type: "varchar", length: 500,nullable: true})
    type: string;

    @Column({type: "varchar", length: 500,nullable: true})
    category: string;

    @Column({type: "boolean",default:true})
    active: boolean;

    @Column({type:"varchar",length:15, nullable: true})
    phoneNumber: string;

    @Column({type:"varchar",length:15, nullable: true})
    description: string;

    @Column({type:"double precision", nullable: true})
    salarymin: number;
    @Column({type:"double precision", nullable: true})
    salarymax: number;

    @Column({type: "boolean",default:false})
    approved: boolean;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}
