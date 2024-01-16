const jwt = require("jsonwebtoken");
// 导入配置文件
const { secret } = require("../config/config");

module.exports = (req, res, next) => {
    // 从请求头取 token
    const token = req.get("token");
    if (!token) {
        return res.json({
            code: '2003',
            msg: "token 缺失",
            data: null
        })
    }
    // 校验 token
    jwt.verify(token, secret, async (err, data) => {
        // 检测 token 是否正确
        if (err) {
            return res.json({
                code: '2004',
                msg: "token 校验失败",
                data: null
            })
        }
        // 保存用户的信息. 用于后面的请求可以访问到用户信息
        req.user = data;
        // 检测通过
        next()
    })
}