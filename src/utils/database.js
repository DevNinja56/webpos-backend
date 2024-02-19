const mongoose = require('mongoose');

async function _connect_to_db(){
    try{
        await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to DB");
    }catch(e){
        console.error("Error connecting database: ", err);
    }
}

module.exports = _connect_to_db;
