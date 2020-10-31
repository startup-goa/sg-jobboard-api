import * as jwt from "jsonwebtoken" ;
import {jwtKeyPrivate,jwtKeyPublic} from "../util/secrets";
import {TokenPayload} from "../beans/TokenPayload";

import * as bcrypt from "bcrypt";
export class Auth{
    username: string ;
    password: string ;
    constructor(username: string,password: string){
        this.username = username;
        this.password = password;
    }
    async login(){
        // const muserModel: MuserModel = new MuserModel();
        // const _user =  await muserModel.findByUserName(this.username);
        // try{
        //     const passValid: boolean = await bcrypt.compare(this.password, _user.password);
            
        //     return new Promise<Muser>((resolve,reject)=>{
        //         passValid? resolve(_user) : reject(new MgameError(401,"Login failed","Password mismatch"));
        //     });
        // }catch(err){
        //     throw new MgameError(401,"Login failed","Password mismatch");
        // }
    }
    // getToken(user: Muser){
    //     const privateKey = jwtKeyPrivate;
    //     const payload = {
    //         userId : user.user_id,
    //     };
    //     return jwt.sign(payload, privateKey, { algorithm: "RS256" , expiresIn: 60 * 60 * 24 * 365 });
    // }

    // static verifyToken(token: string){
    //     // verify a token symmetric - synchronous
    //     try{
    //         const decoded: TokenPayload = (jwt.verify(token, jwtKeyPublic) as TokenPayload);    
    //         return decoded; 
    //     }catch(err){
    //         return null; 
    //     }
        
    // }
}