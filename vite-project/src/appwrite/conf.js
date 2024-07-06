import conf from "../config/config";
import {Client, ID, Databases, Storage, Query} from "appwrite"

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwrtieUrl)
            .setProject(config.appwrtieProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {

            return await this.databases.createDocument(conf.appwrtieDatabaseId, conf.appwrtieCollectionId, slug, {title, content, featuredImage, status, userId})

        }   catch(error) {
            console.log(error)
        }
    }

    async updatePost(slug,{title, content, featuredImage, status}) {
        try {

            return await this.databases.updateDocument(
                conf.appwrtieDatabaseId,
                conf.appwrtieCollectionId,
                slug,
                {
                    title,
                    content, 
                    featuredImage, 
                    status
                }
            )

        }   catch(error) {
            console.log(error);
        }
    }

    async deletePost (slug) {
        try {

            await this.databases.deleteDocument(conf.appwrtieDatabaseId, conf.appwrtieCollectionId, slug)
            return true;

        }   catch(error) {
            console.log(error)
            return false;
        }
    }

    async getPost (slug) {
        try {
            return await this.databases.getDocument(conf.appwrtieDatabaseId, conf.appwrtieCollectionId, slug)

        }   catch(error) {
            console.log(error)
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(conf.appwrtieDatabaseId, conf.appwrtieCollectionId,queries)
        }   catch(error) {
            console.log(error)
            return false;
        }
    }

    //File Upload services
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(conf.appwrtieBucketId, ID.unique(), file)
        }   catch(error) {
            console.log(error)
            return false;
        }
    }

    //Delete file
    async deletefile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appwrtieBucketId, fileId)
            return true;
        }   catch(error) {
            console.log(error)
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(conf.appwrtieBucketId, fileId);
    }
}


const service = new Service();

export default service