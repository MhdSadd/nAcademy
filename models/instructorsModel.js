const mongoose = require();
const {Schema} = mongoose;

const instructorSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})