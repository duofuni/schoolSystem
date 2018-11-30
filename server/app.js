const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('./')); // 使用静态资源

const settings = require('./config/settings');
const router = require('./src/router/router');
app.use('/', router);
app.listen(settings.port);
