import { getConnection } from "typeorm";
import { AdminUser } from "../entity/AdminUser";
const connectionName = process.env.DB_COMMECTION_NAME;
export class AdminUserModel {
    async getAdminUserByUserName(userName: string) {
        const connection = getConnection(connectionName);
        return await connection.getRepository(AdminUser)
            .findOne({
                where: {
                    userName

                }
            });
    }
    async getAdminUserByUserId(userId: number) {
        const connection = getConnection(connectionName);
        const adminUser = await connection.getRepository(AdminUser)
            .findOne({
                where: {
                    userId
                }
            });
    }
}