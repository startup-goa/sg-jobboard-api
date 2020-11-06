import {Entity, 
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn,
    UpdateDateColumn} from "typeorm";
@Entity()
export class AdminUser {

    @PrimaryGeneratedColumn()
    userId: number;

    @Column({type: "varchar", length: 200, unique: true ,nullable: false})
    userName: string;

    @Column({type: "varchar", length: 200, unique: true ,nullable: false})
    userDispName: string;

    @Column({type:"varchar",length:15,nullable: true})
    phoneNumber: string;

    @Column({type: "varchar", length: 500,nullable: false})
    password: string;

    @Column({type: "boolean",default:true})
    active: boolean;

    @Column({type:"timestamp",default: ()=>"CURRENT_TIMESTAMP"})
    passwordPpdate_time: Date;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}
