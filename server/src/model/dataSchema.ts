import {Schema} from "mongoose";

const dataSchema = new Schema({
    date: {
        type: Date,
    },
    description: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    publisher: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    url: {
        type: String,
        default: ''
    }
});

export default dataSchema;