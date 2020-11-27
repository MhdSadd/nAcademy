const mongoose = require("mongoose");
const {MONGO_SERVER, DATABASE_NAME} = require("../config/db");

const _connect = () => {
    // DATABASE CONNECTION
    mongoose.connect(`${MONGO_SERVER}/${DATABASE_NAME}`, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    })
    .then((res) => {
        console.log(`Database Connected Successfully @`)
    })
    .catch((err) => {
        console.log(err)
    })
}

module.exports = _connect();