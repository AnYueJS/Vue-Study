<template>
  <div class="index">
    <img class="login_bgi" src="../../assets/img/focus.png">
    <template>
      <div id="username">
        <Input class="login_account"
               v-model="login_account.val" placeholder="手机号..." style="width: 300px"></Input>
      </div>
      <div id="password">
        <Input class="login_password" @on-enter="Login" type="password"
               v-model="login_password.val" placeholder="密码..." style="width: 300px"></Input>
      </div>
      <div class="find_password">
        <p>忘记密码？请电话与负责人联系</p>
      </div>
      <Button :class="nextStatus ? 'can' : ''" :disabled="!nextStatus"
              @click="Login" id="login" type="primary">登录</Button>
      <div class="copyright">
        <p>Powered by 美信金融技术团队</p>
        <p>本系统仅对已授权人员开放，未经授权不得登录，美信保留追究一切法律责任的权利。</p>
      </div>
    </template>
  </div>
</template>
<style scoped lang="less">
  .index{
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    text-align: center;
    background-color: #fff;
    .login_bgi{
      width: 100%;
      height: auto;
    }
    #username{
      height: 50px;
      margin-top: 50px;
      font-size: 14px;
      text-align: center;
      .login_account{
        display: inline-block;
      }
    }
    #password{
      margin-top: 10px;
      font-size: 14px;
      .login_password{
        display: inline-block;
      }
    }
    .find_password{
      margin-top: 3px;
      height: 30px;
      position: relative;
      p{
        width: 300px;
        position: absolute;
        left: 50%;
        margin-left: -150px;
        text-align: right;
      }
    }
    #login{
      padding: 5px 30px;
      background-color: #223976;
    }
    .copyright{
      width: 100%;
      position: fixed;
      bottom: 10px;
      text-align: center;
    }
  }
</style>
<script>
  import Auth from '../../config/auth.js'
  export default {
    name: 'Login',
    data () {
      return {
        login_account: {
            name: '手机号',
            val: '',
        },
        login_password: {
            code: '密码',
            val: '',
        },

      }
    },
    computed: {
      nextStatus: function () {
        if (this.login_account.val && this.login_password.val) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      /*
      * 调取登录接口,
      * 成功后保存token和secret,
      * 并查询账号的权限内容
      */
      Login() {
        this.$router.push({name:'Dashboard'});//为实现跳转效果
        this.$https.post('/login', ({phone: this.login_account.val, password: this.login_password.val,})).then((res) => {
           //保存token,secret
            Auth.login(res.data.body.mx_token , res.data.body.mx_secret);
            this.$router.push({name:'Dashboard'});
        }).catch(function(response) {
          console.log(response)
        });
      },
    }
  }
</script>
