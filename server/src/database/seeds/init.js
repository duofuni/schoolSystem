const data = require("./data");
const mongoose = require('mongoose');
const settings = require('../../../config/settings');
const constellation = require('../../schema/constellation');

mongoose.connect(`mongodb://${settings.db.host}/${settings.db.database}`);
mongoose.connection.on('open', (err) => {
    if(err) throw err;
    console.log('connect success');
});

const Constellation = mongoose.model('constellation', constellation);
Constellation.find((err, doc) => {
    if (err) throw err;
    doc.forEach((item) => {
        item.remove((err) => {
            if (err) throw err;
        })
    })
}).then(() => {
    Constellation.insertMany(data.constellation, (err, res) => {
        if (err) throw err;
        console.log('add success');
    });
});