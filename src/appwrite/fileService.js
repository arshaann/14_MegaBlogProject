import conf from "../conf/conf";
import { Client, ID, Storage } from "appwrite";

export class FileService {
  client = new Client();
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectID);
    this.bucket = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("FileService :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketID, fileId);
      return true;
    } catch (error) {
      console.log("FileService :: deleteFile :: error", error);
      return false;
    }
  }

  async getFile(fileId) {
    try {
      return await this.bucket.getFile(conf.appwriteBucketID, fileId);
    } catch (error) {
      console.log("FileService :: getFile :: error", error);
      return false;
    }
  }

  getImagePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketID, fileId);
  }

  async updateFile(fileId, file) {
    try {
      return await this.bucket.updateFile(conf.appwriteBucketID, fileId, file);
    } catch (error) {
      console.log("FileService :: updateFile :: error", error);
      return false;
    }
  }

  downLoadFile(fileId) {
    try {
      return this.bucket.getFileDownload(conf.appwriteBucketID, fileId);
    } catch (error) {
      console.log("FileService :: downLoadFile :: error", error);
      return false;
    }
  }
}

const fileService = new FileService();
export default fileService;
