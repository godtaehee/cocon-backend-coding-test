import { Document, Model } from "mongoose";

export interface IData {
    data: String
}

export interface IDataDocument extends  IData, Document {

}