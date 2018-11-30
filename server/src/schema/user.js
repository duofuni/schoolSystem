const Photos = {
    time: String,
    photos: Array
};

const user = {
    name: {
        type: String,
        require: true,
    },
    avatar: {
        type: String,
        require: true,
    },
    account: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    sex: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true,
    },
    weChat: {
        type: String,
        require: true,
    },
    qq: {
        type: Number,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    constellation: {
        type: String,
        require: true,
    },
    hobby: {
        type: String,
        require: true,
    },
    speciality: {
        type: String,
        require: true,
    },
    photoList: {
        type: [Photos],
        require: true,
    },
    message: {
        type: Array,
        require: true,
    },
};

const mongoose = require('mongoose');
const User = mongoose.Schema(user, {timestamps: true});

module.exports = User;