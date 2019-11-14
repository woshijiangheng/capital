//作用是login register 的作用
  //引入express
  const express=require('express');
  //引入数据库user
  const profiles=require('../../modules/profiles')

  const passport=require('passport')
  const router=express.Router();
  //route get/profiles/test
  //@desc  返回请求的数据
  //@access 公开的数据

//测试
router.get('/test',(req,res)=>{
    res.json('profiles')
})


  //route post/profiles/add
  //@desc  创建信息的接口
  //@access 公开的数据

  router.post('/add',passport.authenticate('jwt',{session:false}),(req,res)=>{
   const profilesFieds={};
//    判断是否传过了
   if(req.body.type) profilesFieds.type=req.body.type
   if(req.body.describe)profilesFieds.describe=req.body.describe
   if(req.body.income)profilesFieds.income=req.body.income
   if(req.body.cash) profilesFieds.cash=req.body.cash
   if(req.body.remark) profilesFieds.remark=req.body.remark
   if(req.body.expend) profilesFieds.expend=req.body.expend

new profiles(profilesFieds).save().then(data=>{
    res.json(data)
})
     })


       //route post/profiles/
  //@desc  获取所有信息
  //@access 公开的数据
  router.get('/find',async (req,res)=>{
  let data=await profiles.find();
       
  if(data){
      res.json(data)
  }else{
      res.status(400).json('错误')
  }
})

      //route post/profiles/:id
  //@desc  获取单个信息
  //@access 公开的数据
  router.get('/:id', passport.authenticate('jwt',{session:false}),async (req,res)=>{
    let data=await profiles.findOne({_id:req.params.id});
         
    if(data){
        res.json(data)
    }else{
        res.status(400).json('错误')
    }
  })


   //route post/profiles/edit/:id    passport.authenticate('jwt',{session:false}),
  //@desc 编辑单个信息
  //@access 公开的数据
  router.post('/edit/:id', passport.authenticate('jwt',{session:false}), async (req,res)=>{
    const profilesFieds={};
 //    判断是否传过了
    if(req.body.type) profilesFieds.type=req.body.type
    if(req.body.describe)profilesFieds.describe=req.body.describe
    if(req.body.income)profilesFieds.income=req.body.income
    if(req.body.cash) profilesFieds.cash=req.body.cash
    if(req.body.remark) profilesFieds.remark=req.body.remark
    if(req.body.expend) profilesFieds.expend=req.body.expend
 
    profiles.findOneAndUpdate(
         {_id:req.params.id},
         {$set:profilesFieds},
         {new:true},

         ).then(data=>{
         res.json(data)
         }).catch(err=>{
           console.log(err);
           
         });
        
     
})

  //route get/profiles/remove/:id    passport.authenticate('jwt',{session:false}),
  //@desc 删除单个信息
  //@access 公开的数据

router.delete('/remove/:id',passport.authenticate('jwt',{session:false}), async (req,res)=>{
   let data=await profiles.deleteOne({_id:req.params.id})
     if(data) {
       res.json('删除成功')
     }
     res.status(400).json('删除失败')
})


  


  module.exports=router