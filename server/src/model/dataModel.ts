import {model} from "mongoose";
import {IData} from "./dataTypes";
import DataSchema from "./dataSchema";

export const DataModel = model<IData>("data", DataSchema);