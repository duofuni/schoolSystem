const mongoose = require('mongoose');
const settings = require('../../config/settings');
const userSchema = require('../schema/user');
const constellationSchema = require('../schema/constellation');
mongoose.connect(`mongodb://${settings.db.host}/${settings.db.database}`,{ useNewUrlParser: true });

const User = mongoose.model('user', userSchema);
const Constellation = mongoose.model('constellation', constellationSchema);

const db = {
    loginUser(account) {
        return User.findOne({account: account});
    },
    getUserById(id) {
        return User.findOne({_id: id});
    },
    getUsers() {
        return User.find();
    },
    getConstellations() {
        return Constellation.find();
    },
    registerUser(data) {
        return User(data).save();
    },
    updateUser(id, data) {
        return User.update({_id: id}, data);
    },
};

module.exports = db;