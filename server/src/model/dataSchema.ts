import {Schema} from "mongoose";

const dataSchema = new Schema({
    date: {
        type: Date,
    },
    description: {
        type: String,
    },
    image: {
        type: String
    },
    publisher: {
        type: String
    },
    title: {
        type: String
    },
    url: {
        type: String
    }
});

export default dataSchema;