import { defineConfig } from "cypress";
import dotenv from "dotenv";
dotenv.config();
import mongo from "cypress-mongodb";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      mongo.configurePlugin(on);
    },
    baseUrl: "http://localhost:3000",
    viewportWidth: 1000,
    viewportHeight: 660,
  },
  env: {
    "mongodb": {
      "uri": `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.xwddugt.mongodb.net/${process.env.MONGODB_DATABASE_NAME}`,
  }
  }
});
