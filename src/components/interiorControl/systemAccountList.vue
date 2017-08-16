<template>
  <div id="systemUserList">
    <div id="product">
      <div id="breadcrumb">
        <Breadcrumb>
          <Breadcrumb-item href="/roleList">内部管理</Breadcrumb-item>
          <Breadcrumb-item href="/roleList">系统用户列表</Breadcrumb-item>
        </Breadcrumb>
        <Button class="createSystemUser" type="error" shape="circle" @click="modal1=true">+ 新建系统用户</Button>
      </div>
      <table border="1" cellspacing="0" cellpadding="0">
        <thead>
        <tr>
          <th>ID</th>
          <th>登录账号</th>
          <th>姓名</th>
          <th>权限角色</th>
          <th>创建时间</th>
          <th>详情</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(i,index) in data">
          <td>{{i.id}}</td>
          <td>{{i.phone}}</td>
          <td>{{i.advisor_name}}</td>
          <td>{{i.role_name}}</td>
          <td>{{i.created_at}}</td>
          <td><a @click="systemUserDetail(i.advisor_name, i.advisor_id)" href="javascript:;">查看</a></td>
        </tr>
        </tbody>
      </table>
    </div>
    <Modal v-model="modal1" width="460">
      <p slot="header" style="color:#f60;text-align:center">
        <span>新建系统用户</span>
      </p>
      <div style="text-align:center; padding: 0 10px">
        <Form :model="formItem1" :label-width="60" label-position="left" style="text-align: left; padding: 0 30px">
          <Form-item label="所有用户">
            <Select v-model="formItem1.userType">
              <Option v-for="item in channelUser" :value="item.id" :key="item">{{item.name}}</Option>
            </Select>
          </Form-item>
          <Form-item label="权限角色">
            <Select v-model="formItem1.roleType">
              <Option v-for="item in roleUser" :value="item.id" :key="item">{{item.name}}</Option>
            </Select>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" style="padding: 0 20px">
        <Button type="primary" size="small" long :loading="modal_loading" @click="createSystemUser">确定</Button>
      </div>
    </Modal>
    <Modal v-model="modal2" width="460">
      <p slot="header" style="color:#f60;text-align:center">
        <span>修改系统用户</span>
      </p>
      <div style="text-align:center; padding: 0 10px">
        <Form :model="formItem2" :label-width="60" label-position="left" style="text-align: left; padding: 0 30px">
          <Form-item label="用户名称">
            <Input v-model="formItem2.userName" disabled="" placeholder="请输入"></Input>
            <!--<Select v-model="formItem2.userType">
              <Option v-for="item in channelUser" :value="item.id" :key="item">{{item.name}}</Option>
            </Select>-->
          </Form-item>
          <Form-item label="权限角色">
            <Select v-model="formItem2.roleType">
              <Option v-for="item in roleUser" :value="item.id" :key="item">{{item.name}}</Option>
            </Select>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" style="padding: 0 20px">
        <Button type="primary" size="small" long :loading="modal_loading" @click="updateSystemUser">确定</Button>
      </div>
    </Modal>
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
    table{
      width: 100%;
      border: 1px solid #ccc;
      text-align: center;
      color: #000;
      .moreBtn{
        position: relative;
        .show{
          position: absolute;
          display: inline-block;
          left: -40px;
          top: 0;
          background-color: #fff;
        }
      }
    }
  }
  .ivu-form-item{
    margin-bottom: 10px;  /*自定义输入框样式*/
  }
</style>
<script>
  export default {
    data () {
      return {
        modal1: false,
        modal2: false,
        data:[],
        formItem1:{
          userType:'',
          roleType:'',
        },
        formItem2:{
          userType:'',
          userName:'',
          roleType:'',
        },
        channelUser:[],
        roleUser:[],
        userTypeItem:[],
        documentType:[],
        modal_loading:false,    //点击时样式
      }
    },
    methods:{
      //创建系统用户
      createSystemUser(){
        this.$https.get('/obtain/product/auth/addOrUpdateUserRole',
          {params:{'advisor_id':this.formItem1.userType,'role_id':this.formItem1.roleType}}
        ).then((response) => {
          this.modal1 = false;
          this.$Message.success(response.data.msg);
          this.getUserList();
        }).catch(function(response) {
          console.log(response)
        })
      },
      systemUserDetail(name,id){
         this.modal2 = true;
         this.formItem2.userName =  name;
         this.formItem2.userType =  id;
      },
      //更新用户详情
      updateSystemUser(){
        this.$https.get('/obtain/product/auth/addOrUpdateUserRole',
          {params:{'advisor_id':this.formItem2.userType,'role_id':this.formItem2.roleType}}
        ).then((response) => {
          this.modal2 = false;
          this.$Message.success(response.body.msg);
          this.getUserList();
        }).catch(function(response) {
          console.log(response)
        });
      },
      //获取用户列表
      getUserList(){
        this.$https.get('/obtain/product/auth/getAdvisorRoleList').then((response) => {
          this.data = response.data.body;
        }).catch(function(response) {
          console.log(response)
        });
      },
      //获取美信所有子渠道
      getChildChannelList(){
        this.$https.get('/product/channel/getAdvisorByChannelId',
          {
            params: {
              channel_id: this.customization_channel_id,
            },
          }
        ).then((response) => {
          this.channelUser = response.data.body;
        }).catch(function(response) {
          console.log(response)
        })
      },
      //获取角色列表
      getRoleList(){
        this.$https.get('/obtain/product/auth/findRoleList').then((response) => {
          this.roleUser = response.data.body;
        }).catch(function(response) {
          console.log(response)
        })
      }
    },
    created: function() {
        this.getChildChannelList();
        this.getRoleList();
        this.getUserList();
    }
  }
</script>
