const mongoose = require('mongoose');

async function connect() {

    try {
        // await mongoose.connect('mongodb://127.0.0.1:27017/loyal');
        await mongoose.connect('mongodb+srv://tin2805:TrungTin123@cluster0.2nifahj.mongodb.net/loyal');
        console.log('Connect Successfully');

    } catch (error) {
        console.log('Connect Failure');
    }
}

module.exports = { connect }
