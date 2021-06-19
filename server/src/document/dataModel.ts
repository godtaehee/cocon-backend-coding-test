import { model } from "mongoose";
import { IDataDocument} from "./dataTypes";
import DataSchema from "./dataSchema";

export const DataModel = model<IDataDocument>("data", DataSchema);