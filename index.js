import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/Database.js";
import bookRoutes from "./Routes/Book.Routes.js";
import userRoutes from "./Routes/User.Routes.js";
import cors from "cors";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api", bookRoutes);
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
