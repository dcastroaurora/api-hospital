import { config } from "dotenv";

config();

export default {
  mongodb_url:
    process.env.MONGODB_URI || "mongodb://localhost/hospitaldb_local",
  jwt_secret: process.env.JWT_SECRET,
  google_id: process.env.GOOGLE_ID,
  google_secret: process.env.GOOGLE_SECRET,
};
