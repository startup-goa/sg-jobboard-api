/* import {Entity, 
    PrimaryGeneratedColumn, 
    Column,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,BeforeUpdate, BeforeInsert} from "typeorm";

@Entity()
export class JobApplication {

    @PrimaryGeneratedColumn({type:"bigint"})
    comp_id: bigint;

    @Column({type: "varchar", length: 200, unique: true ,nullable: false})
    applicant_name: string;

    @Column({type: "varchar", length: 500,nullable: false})
    resume_path: string;

    @Column({type: "boolean",default:true})
    active: boolean;

    @Column({type:"varchar",length:15})
    phone_number: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}
 */