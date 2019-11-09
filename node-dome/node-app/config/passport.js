const JwtStrategy= require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;

//引入数据库
const mongoose=require('mongoose')

const User=mongoose.model('users')

const opts={}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'jiangheng';
module.exports=passport=>{
    passport.use(new JwtStrategy(opts,async (jwt_payload, done)=> {
       //console.log(jwt_payload);
      let data=await User.findById(jwt_payload.id)
      if(data){
          return done(null,data);
      }
      return done(null,fasle)
    }));
}