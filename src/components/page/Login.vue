<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">智能监控后台管理系统</div>
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="username">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              type="password"
              placeholder="password"
              v-model="loginForm.password"
              @keyup.enter.native="login"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="login">登录</el-button>
        </div>
        <div class="login-btn">
          <el-button type="primary" @click="editVisible = true">注册</el-button>
        </div>

        <p class="login-tips">Tips : 用户名luoyang 密码123456</p>
      </el-form>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="注册用户" :visible.sync="editVisible" width="35%">
      <el-form ref="registerForm" :rules="registerFormRules" :model="registerForm" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="输入密码">
          <el-input type="password" v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input type="password" v-model="registerForm.passwordConfirm"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="register">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {str_md5} from '../../assets/js/md5'
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      loginFormRules: {
        username: [{required: true, message: '账号不可为空', trigger: 'blur'}],
        password: [{required: true, message: '密码不可为空', trigger: 'blur'}]
      },
      //
      editVisible: false,
      registerForm:{
        username:"",
        password:"",
        passwordConfirm:""
      },
      registerFormRules: {
        username: [{required: true, message: '账号不可为空', trigger: 'blur'}],
        password: [{required: true, message: '密码不可为空', trigger: 'blur'}],
        passwordConfirm: [{required: true, message: '密码不可为空', trigger: 'blur'}]
      },
    }
  },
  methods: {
    login(){
      this.$http.get("http://localhost:8787/login?username="+this.loginForm.username+"&password="+str_md5(this.loginForm.password)).then((res)=>{
        if(res.data.status){
          localStorage.setItem("ms_username", this.loginForm.username);
          sessionStorage.setItem("user_id",this.loginForm.username);
          this.$router.push("/dashboard");
        }else{
          this.$alert('用户名或密码错误', '提示', {
            confirmButtonText: '确定',
          });
        }
      })
    },
    register(){
      if(this.registerForm.password === this.registerForm.passwordConfirm){
        this.$http.get("http://localhost:8787/register?username="+this.registerForm.username+"&password="+str_md5(this.registerForm.password)).then((res)=>{
          if(res.data.status){
            this.$alert(res.data.msg, '提示', {
              confirmButtonText: '确定',
            });
            this.editVisible = false;
          }else{
            this.$alert(res.data.msg, '提示', {
              confirmButtonText: '确定',
            });
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
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/login-bg.jpg);
  background-size: 100%;
}

.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 23px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.ms-content {
  padding: 30px 30px;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}

.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
