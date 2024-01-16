var express = require('express');
var router = express.Router();

// 转换时间格式
const moment = require("moment");

const AccountModel = require('../../models/AccountModel');

// 导入检测登录的中间件
const checkLoginMiddleware = require("../../middlewares/checkLoginMiddleware");

// 首页路由
router.get("/" ,(req, res) => {
  res.redirect("/account");
})

//记账本的列表
router.get('/account', checkLoginMiddleware, async function (req, res, next) {
  try {
    //获取所有的账单信息
    let accounts = await AccountModel.find().sort({ time: -1 });
    res.render('list', { accounts: accounts, moment });
  } catch (error) {
    res.status(500).send("读取失败")
  }
});

//添加记录页面
router.get('/account/create', checkLoginMiddleware, function (req, res, next) {
  res.render('create');
});

//新增记录
router.post('/account', checkLoginMiddleware, async (req, res) => {
  try {
    // 插入数据
    await AccountModel.create({
      ...req.body,
      time: new Date(req.body.time)
    })

    //成功提醒
    res.render('success', { msg: '添加成功哦~~~', url: '/account' });
  } catch (error) {
    console.log(error);
    res.status(500).send("插入失败")
  }
});

//删除记录
router.get('/account/:id', checkLoginMiddleware, async (req, res) => {
  //获取 params 的 id 参数
  let id = req.params.id;
  try {
    //删除
    await AccountModel.deleteOne({ _id: id });
    //提醒
    res.render('success', { msg: '删除成功~~~', url: '/account' });
  } catch (error) {
    res.status(500).send("删除失败")
  }

});

module.exports = router;
