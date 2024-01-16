var express = require('express');
var router = express.Router();
const md5 = require("md5");
// 导入 jwt
const jwt = require("jsonwebtoken");

const UserModel = require("../../models/UserModel");

// 导入配置文件
const { secret } = require("../../config/config");

// 登录操作
router.post('/login', async function (req, res) {
    let { username, password } = req.body;
    try {
        const data = await UserModel.findOne({ username, password: md5(password) });
        if (!data) {
            return res.json({
                code: '2001',
                msg: "账号或密码错误",
                data: null
            })
        }

        // 创建 token
        const token = jwt.sign({
            username: data.username,
            _id: data._id
        }, secret, {
            expiresIn: 60 * 60 * 24 * 7
        })
        // 响应 token
        res.json({
            code: '0000',
            msg: "登录成功",
            data: token
        })
    } catch (error) {
        res.json({
            code: '2001',
            msg: "登录失败",
            data: null
        })
    }
});

// 退出登录
router.get('/logout', function (req, res) {
    req.session.destroy(() => {
        res.render("success", { msg: "退出登录成功", url: "/login" });
    })
});


module.exports = router;
