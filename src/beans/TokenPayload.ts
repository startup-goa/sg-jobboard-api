/* eslint-disable @typescript-eslint/camelcase */
export class TokenPayload {
    public user_id: bigint;
    public user_name: string;
    public user_phone: string;
    public createdDate: Date;
    static createInstance(user_id: bigint,
        user_name: string,
        user_phone: string,
        createdDate: Date) {

        const obj = new TokenPayload();
        obj.user_id = user_id;
        obj.user_name = user_name;
        obj.user_phone = user_phone;
        obj.createdDate = createdDate;
        return obj;
    }
}