const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const settings = require('../../config/settings');
const upload = require('../utils/img_upload');
const getTime = require('../utils/get_time');
const db = require('../database/db');

router.use((req, res, next) => {
    let { url = '' } = req;
    const constellation = url.indexOf('/constellation');
    const login = url.indexOf('/login');
    const register = url.indexOf('/register');
    if (!constellation || !login || !register) { // 除去注册和登陆页的请求
        next();
        return
    }
    jwt.verify(
        req.headers['x_access_token'],
        settings.tokenSecretKey,
        (err, decoded) => {
            if (err) {
                return res.json({status: 401, msg: 'no auth'});
            } else {
                next(); //继续下一步路由
            }
        })
});

router.get('/constellation', async (req, res) => {
    const doc = await db.getConstellations();
    res.send(doc);
});

router.get('/users', async (req, res) => {
    const doc = await db.getUsers();
    res.send(doc);
});

router.get('/classmateDetail/:id', async (req, res) => {
    const doc = await db.getUserById(req.params.id);
    res.json({status: 1, msg: 'ok', user: doc});
});

router.post('/login', async (req, res) => {
    const account = req.body.account;
    const password = req.body.password;
    const exisUser = await db.loginUser(account);

    if (!exisUser) {
        res.json({status: 404, msg: '账户不存在'});
        return;
    }

    const content = {account: req.body.account}; // 要生成token的主题信息
    const token = jwt.sign(content, settings.tokenSecretKey, {
        expiresIn: 60*10*1, // 600秒过期
    });
    bcrypt.compare(password, exisUser.password, (err, res) => {
        tryLogin(res);
    });
    tryLogin = (pwdMatchFlag) => {
        if (!pwdMatchFlag) {
            res.json({status: 0, msg: '密码错误'});
            return false;
        }
        res.json({status: 1, msg: 'ok', token: token, user: exisUser})
    };
});

router.post('/register', async (req, res) => {
    req.body.password = await bcrypt.hash(req.body.password, 12);
    const success = await db.registerUser(req.body);
    if (success) {
        res.json({status: 1, msg: 'ok'});
    }
});

router.put('/resetPassword/:id', async (req, res) => {
    let exisUser = await db.getUserById(req.params.id);
    if (!exisUser) {
        res.json({status: 0, msg: '账户不存在'});
    }

    bcrypt.compare(req.body.originalPassword, exisUser.password, (err, res) => {
        tryLogin(res);
    }); // 判断原密码是否正确
    tryLogin = async (pwdMatchFlag) => {
        if (!pwdMatchFlag) {
            res.json({status: 0, msg: '请输入正确旧密码！'});
            return false;
        }

        exisUser.password = await bcrypt.hash(req.body.newPassword, 12);
        const {ok} = await db.updateUser(req.params.id, exisUser); // 更新密码

        if (!ok) {
            res.json({status: 0, msg: '错误！'});
        }

        const newUser = await db.getUserById(req.params.id);
        res.json({status: 1, msg: 'ok', user: newUser});
    };
});

router.put('/user/:id', async (req, res) => {
    let exisUser = await db.getUserById(req.params.id);
    if (!exisUser) {
        res.json({status: 0, msg: '账户不存在!'});
    }

    const {ok} = await db.updateUser(req.params.id, req.body); // 更新密码
    if (!ok) {
        res.json({status: 0, msg: '错误！'});
    }

    const newUser = await db.getUserById(req.params.id);
    res.json({status: 1, msg: 'ok', user: newUser});
});

router.put('/user/uploadAvatar/:id', upload, async (req, res) => {
    const url = 'http://' + req.headers.host + '/images/' + req.file.originalname; // 图片路径
    let exisUser = await db.getUserById(req.params.id);

    if (exisUser) {
        exisUser.avatar = url;
        const {ok} = await db.updateUser(req.params.id, exisUser);
        if (!ok) {
            res.json({status: 0, msg: '上传失败！'});
        }

        const newUser = await db.getUserById(req.params.id);
        res.json({status: 1, msg: 'ok', user: newUser});
    }
});

router.post('/user/uploadPhoto/:id', upload, async (req, res) => {
    const url = 'http://' + req.headers.host + '/images/' + req.file.originalname; // 图片路径
    let exisUser = await db.getUserById(req.params.id);

    if (exisUser) {
        const reuse = exisUser.photoList.some((item) => { // 判断图片是否重复上传
            return item.photos.includes(url) == true;
        });
        
        if (reuse) {
            res.json({status: 0, msg: '请勿上传同名图片！'});
            return
        }
    
        let falg = true;
        if (exisUser.photoList.length) { // 相册不为空
            exisUser.photoList.forEach((item) => {
                if (item.time == getTime()) { // 日期相同
                    item.photos = [].concat(item.photos, url); // 拼接
                    falg = false;
                }
            });
        }
        if (!exisUser.photoList.length || falg) { // 相册为空||日期相同
            const Photos = {
                time: getTime(),
                photos: [].concat(url),
            };
            exisUser.photoList.push(Photos); // push值
        }

        const {ok} = await db.updateUser(req.params.id, exisUser);

        if (!ok) {
            res.json({status: 0, msg: '上传失败！'});
        }

        const newUser = await db.getUserById(req.params.id);
        res.json({status: 1, msg: 'ok', user: newUser});
    }
});

module.exports = router;