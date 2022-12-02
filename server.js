import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import orderProcessorRoutes from "./routes/orderProcessorRoutes.js";
import chefRoutes from "./routes/chefRoutes.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// set view engine
app.set("view engine", "ejs");
//no need for app.set("views", "newfolderName");
//since looks into views folders by default

// database connection
const dbURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.xwddugt.mongodb.net/${process.env.MONGODB_DATABASE_NAME}`;
mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("Connected to DB");
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.render("home");
});


app.use(authRoutes);
app.use("/student", studentRoutes);
app.use("/orderprocessor", orderProcessorRoutes);
app.use("/chef", chefRoutes);

app.use((req, res) => {
  res.status(404).render("404");
})

export default app;