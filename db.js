const mongoose = require('mongoose');
mongoose.Promise = Promise;
const {dbUrl} = require('./config');

mongoose.connect(dbUrl);

mongoose.connection.on('open',()=>{
    console.log('数据库连接成功');
})

mongoose.connection.on('error',(error)=>{
    console.log('连接数据库失败!',error);
});
module.exports = mongoose;
