<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="login-title">用户登录</span>
      </div>
      <el-form ref="form" class="login-form" :model="formData" :rules="loginRules">
        <el-form-item class="login-item-form" prop="username">
          <el-input
            placeholder="请输入用户名"
            v-model="formData.username"
            ref="username"
            name="username"
            type="text"
            auto-complete="on"
          ></el-input>
        </el-form-item>
        <el-form-item class="login-item-form" prop="password">
          <el-input
            :key="passwordType"
            placeholder="请输入密码"
            v-model="formData.password"
            :type="passwordType"
            ref="password"
            name="password"
            auto-complete="on"
          ></el-input>
        </el-form-item>
        <el-button
          type="primary"
          class="login-form-btn"
          @click.native.prevent="handleLogin"
        >登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { reqUserLogin } from "../../api";
export default {
  name: "Login",
  data() {
    // 表单验证：用户名验证
    const validateUsername = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("The username can not be less than 5 digits"));
      } else {
        callback();
      }
    };
    // 表单验证：密码验证
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      //表单数据：用户名、密码
      formData: {
        username: "",
        password: ""
      },
      //登录验证规则
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      passwordType: "password"
    };
  },
  methods: {
    //登录业务：发请求，带着用户名和密码给服务器（成功与失败）
    handleLogin() {
      //验证表单元素（用户名和密码）是否符合规则
      this.$refs.form.validate(valid => {
        if (valid) {
          //符合规则
          reqUserLogin(this.formData).then(res => {
            if (res.code === 200) { //成功
              // 路由跳转到首页
              this.$router.push("/home");                                        
            } else {
              alert("用户名或密码错误");
              this.formData = {}
            }
          })
        }
      });
    }
  }
};
</script>

<style scoped>
.login {
  background: url("./images/login_bg.png") no-repeat;
  width: 100%;
  height: 100%;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
}
.box-card {
  width: 400px;
  height: 400px;
  text-align: center;
  position: fixed;
  top: 110px;
  left: 800px;
}
.login-title {
  color: #888888;
  font-size: 18px;
}
.login-form {
  padding-top: 40px;
}
.login-item-form {
  padding-bottom: 20px;
}
.login-form-btn {
  width: 100%;
  height: 40px;
}
</style>