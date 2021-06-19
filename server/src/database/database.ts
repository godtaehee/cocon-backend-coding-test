import Mongoose from "mongoose";
import dotenv from "dotenv";

let database: Mongoose.Connection;
dotenv.config({path:'./config/.env'});
export const connect = () => {
    const uri = process.env.MONGODB_URL;
    if (database) {
        return;
    }
    Mongoose.connect(`${uri}`, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    database = Mongoose.connection;
    database.once("open", async () => {
        console.log("Connected to database");
    });
    database.on("error", () => {
        console.log("Error connecting to database");
    });
};
export const disconnect = () => {
    if (!database) {
        return;
    }
    Mongoose.disconnect();
};
