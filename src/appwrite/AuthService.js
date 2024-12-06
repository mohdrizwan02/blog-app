import { Account, Client, ID } from "appwrite";
import appwrite from "../conf/conf";
class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client.setEndpoint(appwrite.url).setProject(appwrite.projectId);
    this.account = new Account(this.client);
  }

  async register({ name, email, password }) {
    console.log(name, email, password); 
    let userId = ID.unique();
    try {
      const userAccount = await this.account.create(
        userId,
        email,
        password,
        name
      );
      if (userAccount) {
       
        return { response: 201, success: true ,userAccount };
      }
    } catch (error) {
      console.log("Error creating user", error);
      return { response: 400, success: false };
    }
  }

  async login({ email, password }) {
    try {
      const userData = await this.account.createEmailPasswordSession(
        email,
        password
      );
      if (userData) {
        
        return { response: 200, success: true, userData };
      }
    } catch (error) {
      console.log("Error logging in", error);
      return { response: 400, success: false };
    }
  }

  async logout() {
    try {
      const result = await this.account.deleteSessions();
      if (result) {
        console.log("User logged out");
        return { response: 200, success: true };
      }
    } catch (error) {
      console.log("error in logging out", error);
    }
  }
}

const authService = new AuthService();

export default authService;