<template>
  <div style="margin-top: 70px;">
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <div class="login-frame">
          <h4>登录</h4>
          <el-input v-model='account' placeholder="请输入账号" prefix-icon="el-icon-user"></el-input>
          <el-input v-model='password' show-password prefix-icon="el-icon-key" placeholder="请输入密码"
                    type="password"></el-input>
          <br/>
          <br/>
          <el-button :loading="loading" type="primary" @click="login">登录</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="visitor-btn"><el-button type="primary" @click="turnToTemPage" size="small">来访人信息登记</el-button></div>
  </div>
</template>

<script>
  import { login } from "@/request/login";
  import { Notification } from 'element-ui';

  export default {
        name: "login",
        data: function () {
            return {
                account: '',
                password: '',
                loading: false
            }
        },
        methods:{
            login: function () {
                this.loading = true;
                let account = this.account;
                let password = this.password;
                setTimeout(()=>{
                    this.loading = false;
                },2000);
                const data = {
                    account,
                    password
                };
                login(data).then((res) => {
                  if (res.statusCode !== 0) {
                    const showMsg = {
                      title: '失败',
                      message: res.message,
                      duration: 0
                    };
                    Notification.warning(showMsg);
                    return;
                  }
                  const message = res.message;
                  if (message.mark === `'student'`) {
                    this.$router.push({ path: '/SQInterface' });
                  } else if (message.mark === `'manager'`) {
                    const power = message.power;
                    if (/visitor-manager/g.test(power)) {
                      this.$router.push({ path: '/visitorInfo'});
                    }
                  }
                });
            },
            turnToTemPage: function () {
                this.$router.push({path:'/visitorInfo'});
            }
        }
    }
</script>

<style scoped>
    .login-frame{
        border-radius: 4px;
        box-shadow: 0 0 3px #b5b5b5;
        padding: 10px 10px 20px;
    }
    div.login-frame > h4{
        color: #b5b5b5;
    }
    .visitor-btn {
      position: absolute;
      top: 40px;
      right: 40px;
    }
</style>
