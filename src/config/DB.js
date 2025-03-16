const mongoose = require('mongoose')

function connectDB(){
    return mongoose.connect(process.env.dbUrl)
}

module.exports = {
    connectDB
}