//用mongodb创建用户
//引入mongoose
const mongoose=require('mongoose');
//创建
const Schema=mongoose.Schema;
   
const UserSchema=new Schema({
    //姓名
name:{
    //类型
    type:String,
    //必填
    required:true
},
//邮箱
email:{
    type:String,
    required:true
},
//密码
password:{
    type:String,
    required:true
},

avatar:{
    type:String,
   
},
identity:{
    type:String,
    
},
//时间 
date:{
    type:Date,
   default:Date.now
}
})
module.exports=User =mongoose.model("users",UserSchema)