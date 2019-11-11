//用mongodb创建用户
//引入mongoose
const mongoose=require('mongoose');
//创建
const Schema=mongoose.Schema;
   
const ProfileSchema=new Schema({
type:{
   type:String,
      },
describe:{
    type:String
},
income:{
    type:String,
    required:true
  },
cash:{
    type:String,
    required:true
},
remark:{
    type:String,
    required:true

},
expend:{
    type:String,
    required:true
  
},
//时间 
date:{
    type:Date,
   default:Date.now
}
})
module.exports= Profile =mongoose.model(" Profile", ProfileSchema)