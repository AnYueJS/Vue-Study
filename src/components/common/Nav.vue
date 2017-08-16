<template>
  <div id="nav">
    <div id="TopHead">
      <div class="top_head">
        <div class="left_bar">
          <a href="javascript:;">
            <img src="../../assets/img/logo.png" alt="">
          </a>
        </div>
        <div class="right_bar">

          <a @click="logout" href="javascript:;">
            <Icon class="exit" type="power"></Icon>
          </a>
        </div>
      </div>
    </div>
    <div id="bottom">
      <div class="nav" id="navBar">
        <!--一级导航-->
        <div class="nav_first" v-for="(i,index) in data">
          <a @click="selectOne(index, i.name, i.route)" href="javascript:;">
            <img style="width: 12px;" v-bind:src="i.out_url" alt="">&nbsp;
            {{i.name}}
            <Icon ref="firstIcon" class="first_icon" v-show="i.has_child" type="ios-arrow-down"></Icon>
          </a>
          <!--二级导航-->
          <div class="nav_kids" v-for="(t,number) in i.kids" v-show="show === i.name">
            <a @click="selectTwo(number, t.name, t.route)" href="javascript:;">
              {{t.name}}
              <Icon ref="kidsIcon" class="kids_icon" v-show="t.has_child" type="ios-arrow-down"></Icon>
            </a>
            <!--三级导航-->
            <div class="nav_kids" v-for="d in t.kids" v-show="isShow === t.name">
              <a @click="selectThree(d.route)" href="javascript:;">
                {{d.name}}
              </a>
            </div>

          </div>

        </div>
      </div>
      <div style="width: 86%;float: right;padding: 10px 10px;" id="rightCon">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
  #TopHead {
    position: relative;
    .top_head {
      width: 100%;
      height: 100px;
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      text-align: left;
      background-image: url('./../../assets/img/background.png');
      .left_bar {
        width: 14%;
        float: left;
        padding-top: 10px;
        display: inline-block;
      }
      .right_bar {
        width: 50px;
        height: 100px;
        line-height: 100px;
        margin-right: 30px;
        display: inline-block;
        position: absolute;
        right: 10px;
        .exit {
          font-size: 24px;
          color: #fff;
        }
      }
    }
  }

  #bottom {
    text-align: left;
    position: relative;
    .nav {
      width: 14%;
      /*min-width: 150px;*/
      display: inline-block;
      color: #fff;
      background-color: #223B6C;
      padding-left: 3px;
      .nav_first {
        font-size: 14px;
        a {
          color: #fff;
          text-decoration: none;
          display: inline-block;
          width: 100%;
          padding: 10px 1px 10px 20px;
          .first_icon {
            float: right;
            margin-right: 20px;
          }
        }
        .nav_kids {
          background-color: #223B6C;
          a {
            color: #fff;
            text-decoration: none;
            display: inline-block;
            width: 100%;
            padding: 6px 1px 6px 50px;
            .kids_icon {
              float: right;
              margin-right: 20px;
            }
          }
          .nav_kids {
            a {
              color: #fff;
              text-decoration: none;
              display: inline-block;
              width: 100%;
              padding: 6px 1px 6px 70px;
            }
          }
        }
      }
      .nav_first a:hover {
        color: #223976 !important;
        background-color: #f4f4f4;
      }
    }
  }
</style>
<script>
  import Auth from '../../config/auth.js'
  export default {
    name: 'Nav',
    data () {
      this.$Loading.config({
        color: '#5cb85c',
        failedColor: '#f0ad4e',
        height: 5
      });
      return {
        theme2: 'light',
        kidsOpen: false,
        isShow: false,
        show: false,
        user_name:'',
        RoleData:[],   //角色资源
        data: [
          {name: 'dashboard', has_child: false, route: 'Dashboard'},
          {name: '金融订单', has_child: false, route: 'AppointList'},
          {
            name: '用户管理', has_child: true,
            kids: [
              {name: '所有用户', has_child: false, route: 'UserList'},
              {name: '投资用户', has_child: false, route: 'InvestUserList'},
              {name: '预约用户', has_child: false, route: 'AppointUserList'},
            ]
          },
          {
            name: '渠道管理', has_child: true,
            kids: [
              {name: '渠道列表', has_child: false, route: 'ChannelList'},
              {name: '入驻申请', has_child: false, route: 'JoinRequestList'},
            ]
          },
          {name: '美信学堂', has_child: false, route: 'Block'},
          {name: '文件上传', has_child: false, route: 'Upload'},
          {
            name: '内部管理', has_child: true,
            kids: [
              {
                name: '所有用户', has_child: true,
                kids: [
                  {name: '系统用户', has_child: false, route: 'SystemAccountList'},
                  {name: '角色设置', has_child: false, route: 'RoleList'},
                ]
              },
              {name: '测试账户', has_child: false, route: 'TestAccountList'},
            ]
          },
        ],   //角色资源-本地
      }
    },
    mounted () {
      this.setHeight();
    },
    methods: {
      /*
       * 设置左导航最小高度
       * */
      setHeight() {
        var rightCon = document.getElementById('rightCon');
        var navBar = document.getElementById('navBar');
        navBar.style.minHeight = window.innerHeight - 100 + 'px';
        document.addEventListener('DOMNodeInserted', function () {
          var mh = Math.max(rightCon.offsetHeight, window.innerHeight - 100);
          navBar.style.minHeight = mh + 'px';
        });
        document.addEventListener('DOMAttrModified',function(){
          var mh = Math.max(rightCon.offsetHeight, window.innerHeight - 100);
          navBar.style.minHeight = mh + 'px';
        });
        document.addEventListener('DOMNodeRemoved',function(){
            var mh = Math.max(rightCon.offsetHeight, window.innerHeight - 100);
          navBar.style.minHeight = mh + 'px';});
      },

      /*
       * 登出
       * */
      logout () {
        this.$https.post('/product/channel/logout').then((res)=>{
          this.$router.push({name: 'Login'});
          Auth.clearCookie('mx_token');
          Auth.clearCookie('mx_secret');
//          Auth.logout();
        }).catch(function(response) {
          console.log(response)
        })
      },

      /*
       * 左导航
       * */
      selectOne(index, name, route){
        if (this.show === name) {
          this.$refs.firstIcon[index].$el.style.transform = 'rotate(0deg)';
          this.$refs.firstIcon[index].$el.style.transition = 'all 0.5s';
          this.show = '';
          return
        }
        this.show = name;
        this.$refs.firstIcon[index].$el.style.transform = 'rotate(180deg)';
        this.$refs.firstIcon[index].$el.style.transition = 'all 0.5s';
        this.$router.push({
          name: route
        });
      },
      selectTwo(number, name, route){
        if (this.isShow === name) {
          this.$refs.kidsIcon[number].$el.style.transform = 'rotate(0deg)';
          this.$refs.kidsIcon[number].$el.style.transition = 'all 0.5s';
          this.isShow = '';
          return
        }
        this.isShow = name;
        this.$refs.kidsIcon[number].$el.style.transform = 'rotate(180deg)';
        this.$refs.kidsIcon[number].$el.style.transition = 'all 0.5s';
        this.$router.push({
          name: route
        });
      },
      selectThree(route){
        this.$router.push({
          name: route
        });
      },

      /*
      * 根据token和secret查询登录用户角色
      * */
      getAdvisorRole(){
        this.$https.get('/auth/getRole').then((res) => {
          if(res.data.code === 1){
            this.Role.role_id = res.data.body.role_id;
            this.getNav(this.Role.role_id);
          }else{
            this.$Message.info(res.body.msg);
          }
        }).catch((response) => {
          console.log(response)
        })
      },

      /*
       * 根据用户角色查询用户拥有权限
       * */
      getNav(id){
        this.$https.get('/product/auth/findResourceByRoleId', {params: {role_id: id}}).then((response) => {
          this.RoleData = response.data.body;
        }).catch(function(response) {
          console.log(response)
        })
      },
    },
    created: function () {
      this.getAdvisorRole();
    }
  }
</script>
