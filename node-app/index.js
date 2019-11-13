//引入express框架
const express=require('express');
//引入mongoose
const mongoose=require('mongoose');
//引入 bodyParser
const bodyParser=require('body-parser');
//引入 登录注册 路由uesers
const users=require('./routers/api/users');
//管理页面的路由接口数据
const profiles=require('./routers/api/profiles')
//引入passport
const passport=require('passport')
//引用gravatat




// 链接数据库
mongoose.connect('mongodb://jiangheng:123456@localhost/serve').then(()=>{
    console.log('服务器连接成功');
    
}).catch((err)=>{
    console.log('失败',err);
    
})
// 创建一个开始源
const app=express();
//配置bodyparser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// pssport初始化
app.use(passport.initialize());
require('./config/passport')(passport)

//使用中间键
app.use('/users',users);
app.use('/profiles',profiles);



// 配饰服务器第地址
const port = process.env.PORT || 5000;

//  监听的端口
app.listen(port,()=>{
    console.log(`服务器打开了${port}`);
    
})