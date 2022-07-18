import { UserAuthNS } from "./auth";
import { MongoDB, FromMongoData, ToMongoData, MongoModel } from "../lib/mongodb";

export class UserAuthDALMongo implements UserAuthNS.DAL {
    constructor(
        private db: MongoDB
    ) { }

    async init() { }

    private col_user_secret = this.db.collection<MongoModel<UserAuthNS.UserSecret>>("user_secret");
    private col_user_session = this.db.collection<MongoModel<UserAuthNS.UserSession>>("user_session");

    async SaveUserSecret(obj: UserAuthNS.UserSecret) {
        await this.col_user_secret.updateOne({
            user_id:obj.user_id,
            name: obj.name
        }, {
            $set: {
                user_id:obj.user_id,
                name: obj.name,
                value: obj.value,
                encode: obj.encode,
            }
        }, { upsert: true });
    }

    async GetUserSecret(user_id: string, name: string) {
        const doc = await this.col_user_secret.findOne({ user_id: user_id, name });
        return FromMongoData.One<UserAuthNS.UserSecret>(doc);
    }

    async CreateUserSession(session: UserAuthNS.UserSession) {
        const doc = ToMongoData.One(session);
        await this.col_user_session.insertOne(doc);
    }

    async GetUserSession(id: string) {
        const doc = await this.col_user_session.findOne({_id : id});
        return FromMongoData.One<UserAuthNS.UserSession>(doc);
    }

    async GetSessionByUser(user_id : string) {
        const docs = await this.col_user_session.find({ user_id }).toArray();
        return FromMongoData.Many<UserAuthNS.UserSession>(docs);
    }

    async DisableSession(session : UserAuthNS.UserSession) {
        const doc = ToMongoData.One(session);
        await this.col_user_session.updateOne({_id : session.id} , {$set : doc});
    }

    async DeleteSecret(user_id : string) {
        try {
            await this.col_user_secret.deleteOne({user_id : user_id})
        } catch (error) {
            throw error
        }
    }
}
