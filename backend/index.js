import express from "express";
import connectDB from "./config/db.js";
import crudOperations from "./routes/crudOperation.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDB();

app.use("/api", crudOperations);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
