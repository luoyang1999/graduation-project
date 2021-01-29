<template>
  <div class="register-box">
    <transition name="el-zoom-in-center">
      <div v-show="show" class="transition-box">
        <!-- 通过:rules="loginFormRules"来绑定输入内容的校验规则 -->
        <el-form :rules="loginFormRules" ref="loginForm" :model="loginForm" label-position="right" label-width="auto" show-message>
          <span class="rigister-title">请填入注册信息</span>
          <div style="margin-top: 5px"></div>

          <el-form-item label="用户名" prop="loginName">
            <el-col :span="22">
              <el-input type="text" v-model="loginForm.username"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="密码" prop="loginPassword">
            <el-col :span="22">
              <el-input type="password" v-model="loginForm.password"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="确认密码" prop="loginPassword">
            <el-col :span="22">
              <el-input type="password" v-model="loginForm.passwordConfirm"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="register">注册</el-button>
            <el-button type="primary" @click="clear">清空</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Register",
  data(){
    return{
      show:true,
      loginForm:{
        username:"",
        password:"",
        passwordConfirm:""
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      loginFormRules: {
        username: [
          {required: true, message: '账号不可为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不可为空', trigger: 'blur'}
        ],
        passwordConfirm: [
          {required: true, message: '请再次确认密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods:{
    register(){
      if(this.loginForm.password === this.loginForm.passwordConfirm){
        console.log(this.loginForm.username);
        console.log(this.loginForm.password);
        this.$http.get("http://localhost:8787/register?username="+this.loginForm.username+"&password="+this.loginForm.password).then((res)=>{
          if(res.data.status){
            alert(res.data.msg);
            this.$router.push("/login");
          }else{
            alert(res.data.msg);
          }
        })
      }else {
        alert("请确认两次输入的密码保持一致");
      }
    },
    clear(){
      this.loginForm={username:"", password:"", passwordConfirm:""}
    }
  }
}
</script>

<style scoped>
.register-box {
  border: 1px solid #DCDFE6;
  width: 500px;
  margin-top: 150px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px 10px 10px 10px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 15px cornflowerblue;
}
.rigister-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: dodgerblue;
  font-size: 28px;
  font-weight: bold;
}
</style>