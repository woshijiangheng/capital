//用mongodb创建用户
//引入mongoose
const mongoose=require('mongoose');
//创建
const Schema=mongoose.Schema;
   
const ProfileSchema=new Schema({
type:{
    type:String
},
describe:{
    type:String
},
incode:{
    type:String,
    require:true

},
cash:{
    type:String,
    require:true
},
remark:{
    type:String,

},
//时间 
date:{
    type:Date,
   default:Date.now
}
})
module.exports= Profile =mongoose.model(" Profile", ProfileSchema)