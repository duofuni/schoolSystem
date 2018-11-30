const constellation = {
    label: {
        type: String,
        require: true,
    },
    value: {
        type: String,
        require: true,
    },
};
const mongoose = require('mongoose');
const Constellation = mongoose.Schema(constellation);

module.exports = Constellation;