import express from "express";
import {connect} from "./database/database";
import dataRouter from "./router/dataRouter";

const app = express();
const port = 5002;

app.use(express.json());
app.use("/", dataRouter);
connect();
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});