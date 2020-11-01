import * as jwt from "jsonwebtoken" ;
import {jwtKeyPrivate,jwtKeyPublic} from "../util/secrets";
import {TokenPayload} from "../beans/TokenPayload";

import * as bcrypt from "bcrypt";
import { CompanyModel } from "./Company";
import { Company } from "../entity/Company";
export class Auth{
    username: string ;
    password: string ;
    constructor(username: string,password: string){
        this.username = username;
        this.password = password;
    }
    async login(){
        const companyModel: CompanyModel = new CompanyModel();
        const _user =  await companyModel.getCompanyByuserName(this.username);
        try{
            const passValid: boolean = await bcrypt.compare(this.password, _user.password);
            
            return new Promise<Company>((resolve,reject)=>{
                passValid? resolve(_user) : reject(new Error("Auth failed"));
            });
        }catch(err){
            throw new Error("something went wrong");
        }
    }
    getToken(companyObj: Company){
        const privateKey = jwtKeyPrivate;
        const payload = {
            compId: companyObj.compId,
            companyName: companyObj.companyName,
            createdDate : new Date(new Date().toUTCString())
        };
        return jwt.sign(payload, privateKey, { algorithm: "RS256" , expiresIn: 60 * 60 * 24 * 365 });
    }
    static verifyToken(token: string){
        // verify a token symmetric - synchronous
        try{console.log("token: ",token);
            const decoded: TokenPayload = (jwt.verify(token, jwtKeyPublic) as TokenPayload);    
            console.log("decoded: ",decoded);
            return decoded; 
        }catch(err){
            console.log("token invalid ");
        }
        
    }
}