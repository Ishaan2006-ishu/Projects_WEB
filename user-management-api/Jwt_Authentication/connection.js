// const mongoose=  require("mongoose");

// async function connectMongoDb(url){
//     return mongoose.connect(url)
// }

// module.export={
//     connectMongoDb,
// }

const mongoose = require("mongoose");

async function connectMongoDb(url){

    return mongoose.connect(url);

}

module.exports = {
    connectMongoDb
};