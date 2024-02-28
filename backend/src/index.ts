import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import router from "./routers/todo";
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("🚀 Express server started on port: " + port);
});
