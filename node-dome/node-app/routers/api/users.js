//作用是login register 的作用
  //引入express
  const express=require('express');
  //引入数据库user
  const User=require('../../modules/Users')
  const gravatar=require('gravatar')
  //引入加密
  const bcrypt=require('bcrypt');
  //引入设置tokrn
  const jwt=require('jsonwebtoken')

  const passport=require('passport')
  const router=express.Router();
  //route get/uesrs/test
  //@desc  返回请求的数据
  //@access 公开的数据





  //注册接口   需要传入 name password email avator 
  router.post('/register', async(req,res)=>{
    //   判断用户名是否被注册
  let data=await User.findOne({name:req.body.name})
   if(data) return res.status(400).json({message:'用户名被注册'})
  
   // 1查询数据库中是否有这个邮箱
    User.findOne({email:req.body.email}).then( async(user)=>{
        // 判断是否查询到邮箱 如果查询到   返回400  如果没有    创建新用户
         if(user)return res.status(400).json({message:'邮箱已经被注册'})
         var avatar = gravatar.url(req.body.email, {s: '200', r: 'pg'});
          // const newUser=new User({
            
          //       })
         // 密码加密
    let salt=await bcrypt.genSalt(10);
    let result=await bcrypt.hash(req.body.password,salt)

          User.create({
            name:req.body.name,
              email:req.body.email,
              password:result,
              identity:req.body.identity,
              avatar
            })
  
         res.json('注册成功')

           })
           

  })

  //登录接口的搭建  传入邮箱  he密码
  router.post('/login', async (req,res)=>{
    //获取传过来的的邮箱和密码
    let email=req.body.email;
    let password=req.body.password;
    let data=await User.findOne({email})
       
   
    if(!data) return res.status(400).json({message:'邮箱不存在'})
     let pwd= await bcrypt.compare(password,data.password);
     if(pwd){ 
        const roles={id:data.id,
                   name:data.name,
                  identity:data.identity           };  
      jwt.sign(roles,'jiangheng',{expiresIn:86400000},(err,token)=>{
          if(err) throw err
         res.json({
           success:true,
           token:'Bearer '+token
         })
      })
    }else{
      res.status(400).json({message:'密码错误'})
    }
 
     
           
  })

  //token接口的验证
  router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json(
    {
      id:req.user.id,
      name:req.user.name,
      email:req.user.email,
      identity:req.user.identity 
    }
    )
  })


  module.exports=router