const mongoose = require("mongoose")

const connectDB = (uri) => {
    console.log("Connected Database")
    return mongoose.connect(uri)
}

module.exports = connectDB;


// zeeshanansari347
// nvjTPdoZhMVkH5Tm