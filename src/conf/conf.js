const conf = {
  appwriteURL: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteCollectionID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteDatabaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),

  appwriteBucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  timyMCEKye: String(import.meta.env.VITE_TINY_API_KEY),
};
export default conf;
