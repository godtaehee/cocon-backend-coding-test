import Mongoose from "mongoose";
import dotenv from "dotenv";

let database: Mongoose.Connection;
dotenv.config({ path: "./config/.env" });
export const connect = (): void => {
  const uri = process.env.MONGODB_URL;
  if (database) {
    return;
  }
  Mongoose.connect(`${uri}`, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
    .then(() => console.log("Connected to database"))
    .catch(error => console.log(error));
};
