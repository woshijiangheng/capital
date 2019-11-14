<template>
   <header class="head-nav ">
<el-row>
    <el-col :span="6" class="logo-container">
        <img  src="../assets/1.jpg"  alt=""  class='logo'>
        <span class="title"><router-link to="/index">在线后台管理系统</router-link></span>
    </el-col>
    <el-col :span='6' class="user">
  <div class="userinfo">
    <img src="../assets/1.jpg" class='avatar' alt="">
   <div class='welcome'>
   <p class='name comename'>欢迎</p>
   <p class='name avatarname'>{{user.name}}</p>
   </div>
  </div>
   <span class='username'>
<el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
   <i class="el-icon-caret-bottom el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command="info">个人信息</el-dropdown-item>
    <el-dropdown-item command="logout">退出</el-dropdown-item>
   
</el-dropdown-menu>
</el-dropdown>
   </span>

    </el-col>
</el-row>

   </header>
</template>
<script>
export default {
    data(){
        return {

        }
    },
  methods: {
        handleCommand(command){
          
            
          if(command=='logout'){
              //删除session退出到登陆界面
              sessionStorage.clear();
              this.$store.dispatch("clearCurrentState");
              this.$router.push('/login')
              this.$message.success('退出成功')
          }else if(command=="info"){
              this.$router.push('/infoshow')
          }
        
    }
  },
  computed: {
        user() {
      return this.$store.getters.user;
    }
  },
}
</script>
<style scoped>
.head-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
}
.logo {
  height: 50px;
  width: 50px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
}
.user {
    position: relative;
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 15px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.username {
    position: absolute;
top:0;
right: 2px;

  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}
a{
    color: #fff;
    text-decoration: none;
}
</style>
