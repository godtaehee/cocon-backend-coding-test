import express from "express";
import dotenv from "dotenv";
import { connect } from "./database/database";
import dataRouter from "./router/dataRouter";

const app = express();
const port = process.env.PORT;

dotenv.config({ path: "./config/.env" });

app.use(express.json());
app.use("/", dataRouter);
connect();
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
