const conf = {
    appwrtieUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwrtieProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwrtieDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwrtieCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwrtieBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}



export default config;