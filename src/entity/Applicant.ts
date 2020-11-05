import {Entity, 
    PrimaryGeneratedColumn, 
    Column,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,BeforeUpdate, BeforeInsert} from "typeorm";
import {Company} from "./Company";
// applicant
@Entity()
export class Applicant {

    @PrimaryGeneratedColumn({type:"bigint"})
    id: bigint;

    @Column({type: "varchar", length: 1000,nullable: false})
    cvPath: string;

    @Column({type: "varchar", length: 1000,nullable: true})
    message: string;

    @Column({type: "varchar", length: 500,nullable: true})
    fullName: string;

    @Column({type: "varchar", length: 500,nullable: true})
    email: string;


    @Column({type: "boolean",default:true})
    active: boolean;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}
