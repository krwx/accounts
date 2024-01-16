var express = require('express');
var router = express.Router();
const md5 = require("md5");

const UserModel = require("../../models/UserModel");

// 注册页面
router.get('/reg', function (req, res) {
    // 响应 HTML 内容
    res.render("auth/reg");
});

// 注册用户
router.post('/reg', async function (req, res) {
    try {
        await UserModel.create({ ...req.body, password: md5(req.body.password) });
        res.render("success", { msg: "注册成功", url: "/login" })
    } catch (error) {
        res.status(500).send("注册失败");
    }
});

// 登录页面
router.get('/login', function (req, res) {
    // 响应 HTML 内容
    res.render("auth/login");
});

// 登录操作
router.post('/login', async function (req, res) {
    let { username, password } = req.body;
    try {
        const data = await UserModel.findOne({ username, password: md5(password) });
        if (!data) {
            return res.send("账号或密码错误");
        }

        // 写入 session
        req.session.username = data.username;
        req.session._id = data._id;

        res.render("success", { msg: "登录成功", url: "/account" })
    } catch (error) {
        res.status(500).send("登录失败");
    }
});

// 退出登录
router.get('/logout', function (req, res) {
    req.session.destroy(() => {
        res.render("success", { msg: "退出登录成功", url: "/login" });
    })
});


module.exports = router;
