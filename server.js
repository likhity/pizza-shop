import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js"

const PORT = process.env.PORT || 3000;

// database connection
const dbURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.xwddugt.mongodb.net/${process.env.MONGODB_DATABASE_NAME}`;
mongoose.connect(dbURI).then((result) => {
    console.log("Connected to DB");
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  }).catch((err) => {
    console.log(err)
  });
