/* import {Entity, 
    PrimaryGeneratedColumn, 
    Column,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,BeforeUpdate, BeforeInsert} from "typeorm";

@Entity()
export class Company {

    @PrimaryGeneratedColumn({type:"bigint"})
    comp_id: bigint;

    @Column({type: "varchar", length: 200, unique: true ,nullable: false})
    user_name: string;

    @Column({type: "varchar", length: 200})
    display_name: string;

    @Column({type: "varchar", length: 500,nullable: false})
    password: string;

    @Column({type: "boolean",default:true})
    active: boolean;

    @Column({type:"varchar",length:15})
    phone_number: string;
    @Column({type:"bigint" ,nullable: true})

    @Column({type:"timestamp",default: ()=>"CURRENT_TIMESTAMP"})
    password_update_time: Date;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}
 */