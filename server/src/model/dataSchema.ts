import {Schema} from "mongoose";

const dataSchema = new Schema({
    data: {
        type: String,
        required: true
    }
});

export default dataSchema;