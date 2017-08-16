<template>
  <div id="systemUserList">
    <div id="product">
      <div id="breadcrumb">
        <Breadcrumb>
          <Breadcrumb-item href="/systemAccountList">内部管理</Breadcrumb-item>
          <Breadcrumb-item href="/systemAccountList">角色权限设置</Breadcrumb-item>
        </Breadcrumb>
      </div>
    </div>
    <p style="margin-bottom: 20px; font-size: 14px">角色类型:  <span v-html="name"></span></p>
    <p style="margin-bottom: 10px; font-size: 14px">权限设置:</p>
    <div id="auth">
      <div class="nav">
        <!--一级导航-->
        <div class="nav_first" v-for="(i,index1) in data">
          <a href="javascript:;">
            <span @click="selectOne(index1, i.name)">{{i.name}}
            <Icon ref="firstIcon" class="first_icon" v-show="i.has_child" type="ios-arrow-down"></Icon></span>
            <span style="position: absolute; right: 150px">权限</span>
            <i-switch ref="firstSwitch" class="first_switch" v-model="i.open" @on-change="changeFirst(index1,i.id,i.open)">
              <span slot="open">开</span><span slot="close">关</span>
            </i-switch>
          </a>
          <!--二级导航-->
          <div class="nav_kids" v-for="(t,index2) in i.kids" v-show="show === i.name">
            <a href="javascript:;">
              <span @click="selectTwo(index2, t.name)">{{t.name}}
              <Icon ref="kidsIcon" class="kids_icon" v-show="t.has_child" type="ios-arrow-down"></Icon></span>
              <span style="position: absolute; right: 150px">权限</span>
              <i-switch ref="secondSwitch" class="first_switch" v-model="t.open" @on-change="changeSecond(index2,t.id,t.open)">
                <span slot="open">开</span><span slot="close">关</span>
              </i-switch>
            </a>
            <!--三级导航-->
            <div class="nav_kids" v-for="(d,index3) in t.kids" v-show="isShow === t.name">
              <a href="javascript:;">
                <span @click="selectThree">{{d.name}}</span>
                <span style="position: absolute; right: 150px">权限</span>
                <i-switch ref="thirdSwitch" class="first_switch" v-model="d.open" @on-change="changeThird(index3,d.id,d.open)">
                  <span slot="open">开</span><span slot="close">关</span>
                </i-switch>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
  #systemUserList{
    #breadcrumb{
      text-align: left;
      line-height: 30px;
      position: relative;
      margin-bottom: 10px;
      .createSystemUser{
        position: absolute;
        right: 10px;
        top: 0;
      }
    }
    #auth{
      text-align: left;
      padding-left: 60px;
      .nav{
        width: 40%;
        display: inline-block;
        color: #000;
        background-color: #f4f4f4;
        padding-left: 3px;
        text-align: left;
        .nav_first{
          font-size: 14px;
          position: relative;
          a{
            color: #000;
            text-decoration: none;
            display: inline-block;
            width: 100%;
            padding: 10px 1px 10px 30px;
            .first_switch{
              position: absolute;
              right: 80px;
            }
            .first_icon{
              float: right;
              margin-right: 30px;
            }
          }
          .nav_kids{
            background-color: #f4f4f4;
            a{
              color: #000;
              text-decoration: none;
              display: inline-block;
              width: 100%;
              padding: 6px 1px 6px 50px;
              .kids_icon{
                float: right;
                margin-right: 30px;
              }
            }
            .nav_kids{
              a{
                color: #000;
                text-decoration: none;
                display: inline-block;
                width: 100%;
                padding: 6px 1px 6px 70px;
              }
            }
          }
        }
        .nav_first a:hover{
          color: #223976!important;
          background-color: #f4f4f4;
        }
      }
    }
  }
</style>
<script>
  export default {
    data () {
      return {
        modal1: false,
        data:[],
        formItem:{},
        name:'',
        documentType:[],
        modal_loading:false,    //点击时样式
        isShow: false,
        show: false,
        switch1:false,
        value:false,
        auth_type:[],
      }
    },
    methods:{
      selectOne(index, name){
        if(this.show === name){
          this.$refs.firstIcon[index].$el.style.transform = 'rotate(0deg)';
          this.$refs.firstIcon[index].$el.style.transition = 'all 0.5s';
          this.show = '';
          return
        }
        this.show = name;
        this.$refs.firstIcon[index].$el.style.transform = 'rotate(180deg)';
        this.$refs.firstIcon[index].$el.style.transition = 'all 0.5s';
      },
      selectTwo(number, name){
        if(this.isShow === name){
          this.$refs.kidsIcon[number].$el.style.transform = 'rotate(0deg)';
          this.$refs.kidsIcon[number].$el.style.transition = 'all 0.5s';
          this.isShow = '';
          return
        }
        this.isShow = name;
      },
      selectThree(){},
      changeFirst(index,id,open){
        const role_id = this.$route.query.id;
        if(open){
          this.$https.get('/product/auth/addRoleResource',
            {
              params: {
                role_id: role_id,
                resource_id: id,
              },
            }
          ).then((response) => {
            this.$Message.success(response.body.msg)
          }).catch(function(response) {
            console.log(response)
          })
        }else{
          this.$https.get('/product/auth/delRoleResourceById',
            {
              params: {
                role_id: role_id,
                resource_id: id,
              },
            }
          ).then((response) => {
            this.$Message.success(response.body.msg)
          }).catch(function(response) {
            console.log(response)
          })
        }
      },
      changeSecond(index,id,open){
        const role_id = this.$route.query.id;
        if(open){
          this.$https.get('/product/auth/addRoleResource',
            {
              params: {
                role_id: role_id,
                resource_id: id,
              },
            }
          ).then((response) => {
            this.$Message.success(response.body.msg)
          }).catch(function(response) {
            console.log(response)
          })
        }else{
          this.$https.get('/product/auth/delRoleResourceById',
            {
              params: {
                role_id: role_id,
                resource_id: id,
              },
            }
          ).then((response) => {
            this.$Message.success(response.body.msg)
          }).catch(function(response) {
            console.log(response)
          })
        }
      },
      changeThird(index,id,open){
        const role_id = this.$route.query.id;
        if(open){
          this.$https.get('/product/auth/addRoleResource',
            {
              params: {
                role_id: role_id,
                resource_id: id,
              },
            }
          ).then((response) => {
            this.$Message.success(response.body.msg)
          }).catch(function(response) {
            console.log(response)
          })
        }else{
          this.$https.get('/product/auth/delRoleResourceById',
            {
              params: {
                role_id: role_id,
                resource_id: id,
              },
            }
          ).then((response) => {
            this.$Message.success(response.body.msg)
          }).catch(function(response) {
            console.log(response)
          })
        }
      },
    },
    created: function() {
      this.name = this.$route.query.name;
      const id = this.$route.query.id;
      //获取角色资源列表
      this.$https.get('/product/auth/findResourceAndRole',
        {
          params: {
            role_id: id,
          },
        }
      ).then((response) => {
        this.data = response.data.body;
      }).catch(function(response) {
        console.log(response)
      });
    }
  }
</script>
