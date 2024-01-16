const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

let UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;