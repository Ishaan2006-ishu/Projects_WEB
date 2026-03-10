const mongoose=  require("mongoose");

async function connectMongoDb(url){
    return mongoose.connect(url)
}

module.export={
    connectMongoDb,
}