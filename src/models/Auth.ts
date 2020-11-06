import * as jwt from "jsonwebtoken";
import { jwtKeyPrivate, jwtKeyPublic } from "../util/secrets";
import { TokenPayload } from "../beans/TokenPayload";
import * as bcrypt from "bcrypt";
import { CompanyModel } from "./Company";
import { Company } from "../entity/Company";
import { Constants } from "../util/constants";
import { AdminUser } from "../entity/AdminUser";
import { AdminUserModel } from "./AdminUser";
interface IntAuth<T> {
    username: string;
    password: string;
    login(): Promise<T>;
}
export class Auth {
    getToken(id: number, userName: string, userType: number) {
        const privateKey = jwtKeyPrivate;
        const payload = {
            id: id,
            userName: userName,
            userType: userType,
            createdDate: new Date(new Date().toUTCString())
        };
        return jwt.sign(payload, privateKey, { algorithm: "RS256", expiresIn: 60 * 60 * 24 * 365 });
    }
    static verifyToken(token: string) {
        // verify a token symmetric - synchronous
        try {
            console.log("token: ", token);
            const decoded: TokenPayload = (jwt.verify(token, jwtKeyPublic) as TokenPayload);
            console.log("decoded: ", decoded);
            return decoded;
        } catch (err) {
            console.log("token invalid ");
        }

    }
}

export class AuthCompany extends Auth implements IntAuth<Company>{
    username: string;
    password: string;
    constructor(username: string, password: string) {
        super();
        this.username = username;
        this.password = password;
    }
    async login() {
        const companyModel: CompanyModel = new CompanyModel();
        const _user = await companyModel.getCompanyByuserName(this.username);
        try {
            const passValid: boolean = await bcrypt.compare(this.password, _user.password);

            return new Promise<Company>((resolve, reject) => {
                passValid ? resolve(_user) : reject(new Error("Auth failed"));
            });
        } catch (err) {
            throw new Error("something went wrong");
        }
    }

}

export class AuthAdmin extends Auth implements IntAuth<AdminUser>{
    username: string;
    password: string;
    constructor(username: string, password: string) {
        super();
        this.username = username;
        this.password = password;
    }
    async login() {
        const adminUserModel: AdminUserModel = new AdminUserModel();
        const _user = await adminUserModel.getAdminUserByUserName(this.username);
        try {
            const passValid: boolean = await bcrypt.compare(this.password, _user.password);
            return new Promise<AdminUser>((resolve, reject) => {
                passValid ? resolve(_user) : reject(new Error("Auth failed"));
            });
        } catch (err) {
            throw new Error("something went wrong");
        }
    }
}
export class Authfactory {
    public static getInstance(userName: string, password: string, userType: number): AuthCompany | AuthAdmin {
        switch (userType) {
            case Constants.UTYPE_COMPANY:
                return new AuthCompany(userName, password);
            case Constants.UTYPE_ADMIN:
                return new AuthAdmin(userName, password);

        }
    }
}
