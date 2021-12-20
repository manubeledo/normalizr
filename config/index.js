require("dotenv").config();

let configdb = {
    DBConection: process.env.MONGO_DB_URI,
}

module.exports = configdb

