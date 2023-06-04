const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const { dbHost, dbName } = require("./config");
// USE MONGODB LOCAL
const mongoURI = `mongodb://${dbHost}/${dbName}`;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Database Connection Estabilished....');
    })
    .catch((err) => {
        console.log("Error : Database Connection can not be estabilished...", err);
    })
const db = mongoose.connection;

module.exports = db;