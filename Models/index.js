const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/myschool", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("数据库连接成功");

}).catch(err => {
    console.log("数据库连接失败:" + err);
})