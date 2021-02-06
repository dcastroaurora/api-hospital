import { config } from "dotenv";

config();

export default {
  mongodbUrl: process.env.MONGODB_URI || "mongodb://localhost/hospitaldb_local",
};
