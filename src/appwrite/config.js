import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../config/conf";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("error in createPost of Appwrite service", error);
    }
  }

  async updatePost({ title, slug, content, featuredImage, status }) {
    // We did not provide "userId" bcoz we wanted the author only to delete the post.
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("error in updatePost of Appwrite service", error);
    }
  }

  async deletePost(slug) {
    try {
      return await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true; // In order to handel it in the frontend.
    } catch (error) {
      console.log("error in deletePost of Appwrite service", error);
      return false; // In order to handel it in the frontend.
    }
  }

  // For a single post
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("error in getPost of Appwrite service", error);
      return false;
    }
  }

  //   async getPosts(queries = [Query.equal("status", "active")]) {
  //     // No parameter needed. Like "slug"
  //     // Because we need all the posts, we are just applying a "query" onto them.
  //     try {
  //       return await this.databases.listDocuments(
  //         conf.appwriteDatabaseId,
  //         conf.appwriteCollectionId,
  //         queries
  //       );
  //     } catch (error) {
  //       console.log("error in getPosts of Appwrite service", error);
  //     }
  //   }

  // For all the posts
  async getPosts() {
    // No parameter needed. Like "slug"
    // Because we need all the posts, we are just applying a "query" onto them.
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.equal("status", "active")]
        // This upper line, sir wrote it inside the getPosts' parenthesis.
      );
    } catch (error) {
      console.log("error in getPosts of Appwrite service", error);
    }
  }

  //   ******************************** File upload service ********************************

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("error in uploadFile of Appwrite service", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("error in deleteFile of Appwrite service", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    // It will return us a URL
  }
}

const service = new Service();
export default service;
