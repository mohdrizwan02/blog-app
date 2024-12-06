import { Client, Databases, ID, Storage } from "appwrite";
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

  async createPost({ userId, title, content, imageId }) {
    let postId = ID.unique();
    try {
      const post = await this.database.createPost(
        appwrite.databaseId,
        appwrite.collectionId,
        postId,
        {
          userId,
          title,
          content,
          imageId,
        }
      );
      if (post) {
        console.log("post created successfuly");
        console.log(post);
        return {
          success: true,
          post,
        };
      }
    } catch (error) {
      console.log(error, "errorr creating the post");
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
        return {
          success: true,
          posts,
        };
      }
    } catch (error) {
      console.log("appwrite Post Error", error);
    }

    return posts.documents;
  }
}

const postService = new PostService();

export default postService;
