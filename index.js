const express = require("express");

const bodyparser = require("body-parser")

const app = express()


app.use(bodyparser.urlencoded({
    extended: true
}))


app.use((err, req, res, next) => {
    console.log(err);
    res.sendStatus(500).send("服务器出错，请稍后再试")
})


app.listen(7788)

console.log("服务器启动成功");

module.exports = [app, express]