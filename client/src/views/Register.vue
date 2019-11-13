<template>
    <div class="register">
    <section class="form_container">
            <div class="manage_tip">
                <span class="title">后台管理系统</span>
                <!-- 表单提交 -->
                <el-form :model="registerRuleForm" :rules="registeRules" ref="registerRefForm" label-width="80px"  class="registerForm">
                      <el-form-item label="用户名" prop="name">
                      <el-input v-model="registerRuleForm.name"></el-input>
                      </el-form-item>
                      <el-form-item label="邮箱" prop="email">
                      <el-input v-model="registerRuleForm.email"></el-input>
                      </el-form-item>
                      <el-form-item label="密码" prop="password">
                      <el-input type='password' v-model="registerRuleForm.password"></el-input>
                      </el-form-item>
                      <el-form-item label="确认密码" prop="password2">
                      <el-input type='password' v-model="registerRuleForm.password2"></el-input>
                      </el-form-item>
                      <el-form-item label="选择身份" prop="name">
                      <el-select v-model="registerRuleForm.identity">
                      <el-option label='管理员' value='manager'></el-option>
                      <el-option label='员工' value='employee'></el-option>
                      </el-select>
                      </el-form-item>
                      <el-form-item>
                      <el-button type="primary"  @click="registerUser">立即注册</el-button>
                      </el-form-item>
                </el-form>
               </div>
          </section>
    </div>
</template>
<script>

export default {
  data () {
    // 密码验证
    var validatePass = (rule, value, callback) => {
      if (value !== this.registerRuleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registerRuleForm: {
        name: '',
        password: '',
        password2: '',
        email: '',
        identity: ''

      },
      //  表单验证
      registeRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在1  到 10个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    registerUser () {
      this.$refs.registerRefForm.validate( async valid => {
        if (valid) {
          let{ data }=await this.$axios.post('users/register',this.registerRuleForm)
         if(data){
           this.$message.success('注册成功')
           this.$router.push('/login')
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
