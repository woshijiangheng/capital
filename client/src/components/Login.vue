<template>
    <div class="register">
    <section class="form_container">
            <div class="manage_tip">
                <span class="title">后台管理系统</span>
                <!-- 表单提交 -->
                <el-form :model="registerRuleForm" :rules="registeRules" ref="registerRefForm" label-width="80px"  class="registerForm">
                     
                      <el-form-item label="邮箱" prop="email">
                      <el-input v-model="registerRuleForm.email"></el-input>
                      </el-form-item>
                      <el-form-item label="密码" prop="password">
                      <el-input type='password' v-model="registerRuleForm.password"></el-input>
                      </el-form-item>

                      <el-form-item>
                      <el-button type="primary"  @click="loginUser" class="submit_btn">登录</el-button>
                      </el-form-item>
                      <div class="div">还没有账号? 立即<router-link to="/register">注册</router-link></div>
                </el-form>
               </div>
          </section>
    </div>
</template>
<script>

export default {
  data () {
   
    return {
      registerRuleForm: {
        password: '',
        email: '',
       

      },
      //  表单验证
      registeRules: {
      
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
       
      }
    }
  },
  methods: {
    loginUser(){
       this.$refs.registerRefForm.validate(async valid =>{
           if(valid){
        // 发送登录请求
        let {data}=await this.$axios.post('users/login',this.registerRuleForm)
             
               if(data){
                    const token=data.token
                 console.log(data.token);
                 
                   
                   this.$message.success('登陆成功')
                sessionStorage.setItem('token',token)
                   this.$router.push('/index')
               }else{
                   this.$message.error('请重新输入')
               }
               
               
           }
       })
       
   }
  }
}

</script>

<style  scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
</style>
