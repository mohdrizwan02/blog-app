import { Client, Databases, ID, ImageGravity, Storage, Query } from "appwrite";
import appwrite from "../conf/conf";
class PostService {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client.setEndpoint(appwrite.url).setProject(appwrite.projectId);

    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ userid, title, content, imageid, bloggenre }) {
    
    let postId = ID.unique();
    let blogdate = String(new Date());
    try {
      const post = await this.database.createDocument(
        appwrite.databaseId,
        appwrite.collectionId,
        postId,
        {
          title,
          content,
          userid,
          blogimage: imageid,
          blogdate,
          bloggenre,
        }
      );
      if (post) {
        console.log("post created successfuly");
        return post;
      }
    } catch (error) {
      console.log(error, "errorr creating the post");
    }
  }

  async getPost(postid) {
    try {
      const response = await this.database.getDocument(
        appwrite.databaseId,
        appwrite.collectionId,
        postid
      );
      return response;
    } catch (error) {
      console.log(error, "errorr getting the post");
    }
  }

  async getUserPosts(userid) {
    
    try {
      const posts = await this.database.listDocuments(
        appwrite.databaseId,
        appwrite.collectionId,
        
        [Query.equal("userid", userid)]
      );
      if (posts) {
        console.log("posts fetched successfully");
        
        return posts;
      }
    } catch (error) {
      console.log("error in getting user posts", error);
    }
  }

  async getPosts() {
    try {
      const posts = await this.database.listDocuments(
        appwrite.databaseId,
        appwrite.collectionId
      );
      if (posts) {
        console.log("posts fetched successfully");
        return posts;
      }
    } catch (error) {
      console.log("appwrite Post Error", error);
    }

    return posts.documents;
  }

  async addImage(image) {
    let fileId = ID.unique();

    try {
      const response = await this.bucket.createFile(
        appwrite.bucketId,
        fileId,
        image
      );
      if (response) {
        return response;
      }
    } catch (error) {
      console.log("appwrite Upload Error", error);
      return {
        success: false,
        error,
      };
    }
  }

  getImageUrl(imageid) {
    return this.bucket.getFilePreview(appwrite.bucketId, imageid);
  }
}

const postService = new PostService();

export default postService;
