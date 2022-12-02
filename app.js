import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import orderProcessorRoutes from "./routes/orderProcessorRoutes.js";
import chefRoutes from "./routes/chefRoutes.js";

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// set view engine
app.set("view engine", "ejs");
//no need for app.set("views", "newfolderName");
//since looks into views folders by default

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
