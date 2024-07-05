import config from "../config/config";
import { Client, Account, ID } from "appwrite";
import config from "../config/config";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwrtieUrl)
            .setProject(config.appwrtieProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password);

            if(userAccount) {
                //call another method
                return this.login({email, password});
            }
            else{
                return userAccount;
            }

        }catch(error) {
            throw error;
        }
    }

    async login({email, password}) {
        try{
            return await this.account.createEmailSession(email, password)

        } catch(error) {
            throw error;
        }
    }

}

const authService = new AuthService()


export default authService