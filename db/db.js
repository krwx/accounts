const mongoose = require("mongoose");
const {DBHOST, DBPORT, DBNAME} = require("../config/config");

/**
 * 
 * @param {连接成功的回调} success 
 * @param {连接错误的回调} error 
 */
module.exports = (success, error) => {

    // 设置默认的连接错误处理函数
    if (!error || typeof error != "function") {
        error = () => {
            console.log("连接错误");
        }
    }

    /**
     * mongodb：协议
     * 127.0.0.1：IP地址
     * 27017：默认端口号
     * bilibili：数据库名称
     */
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);


    mongoose.connection.once('open', async () => {
        // console.log("连接成功");
        success();
    })

    mongoose.connection.on('error', () => {
        // console.log("连接错误");
        error();
    })

    mongoose.connection.on('close', () => {
        console.log("连接停止");
    })
}