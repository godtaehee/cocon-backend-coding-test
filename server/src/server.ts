import express from "express";
import {connect} from "./database/database";
import dataRouter from "./router/dataRouter";
import dotenv from "dotenv";

const app = express();
const port = process.env.PORT || 3000;

dotenv.config({path:'./config/.env'});

app.use(express.json());
app.use("/", dataRouter);
connect();
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});