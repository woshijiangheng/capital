//作用是login register 的作用
  //引入express
  const express=require('express');
  //引入数据库user
  const User=require('../../modules/profiles')

  const passport=require('passport')
  const router=express.Router();
  //route get/profiles/test
  //@desc  返回请求的数据
  //@access 公开的数据

//测试
router.get('/test',(req,res)=>{
    res.json('profiles')
})


  


  module.exports=router