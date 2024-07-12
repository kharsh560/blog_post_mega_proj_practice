import { Client, Account, ID } from "appwrite";
import conf from "../config/conf";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // If the userAccount already exists, then get the user Logged in! 
        // NOOO, this upper statement is wrong. See 14:38 of L20 of chai aur react playlist.
        // The concept flow is:- If the userAccount is not null, means the user is created, 
        // then get the user logged in also hand in hand, else, if the userAccount is null
        // then return the UserAccount as of now. We eill see later, what has happened.
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error; 
    }
  }

  async getCurrentUser() {
    try {
        return await this.account.get();
        // 21 min:- But what if we don't get any account only? For this, we must return "NULL"
    } catch (error) {
        console.log("Appwrite service :: getCurrentUser :: error", error);
        // throw error;
    }
    return null;
  }

  async logout() {
    try { 
        await this.account.deleteSessions();
    } catch (error) {
        console.log("Appwrite service :: logout :: error", error);
    }
  }

}

const authService = new AuthService();

export default authService;
