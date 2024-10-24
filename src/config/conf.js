const conf = {
  appwriteProjectId: String(process.env.REACT_APP_APPWRITE_PROJECT_ID),
  appwriteUrl: String(process.env.REACT_APP_APPWRITE_URL),
  appwriteDatabaseId: String(process.env.REACT_APP_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(process.env.REACT_APP_APPWRITE_COLLECTION_ID),
  appwriteBucketId: String(process.env.REACT_APP_APPWRITE_BUCKET_ID),
  appwriteGetAllUsersApi: String(
    process.env.REACT_APP_APPWRITE_GET_ALL_USERS_API_KEY
  ),
};

export default conf;
