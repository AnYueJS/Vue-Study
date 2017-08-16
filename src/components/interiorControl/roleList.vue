<template>
  <div id="systemUserList">
    <div id="product">
      <div id="breadcrumb">
        <Breadcrumb>
          <Breadcrumb-item href="/systemAccountList">内部管理</Breadcrumb-item>
          <Breadcrumb-item href="/systemAccountList">系统用户</Breadcrumb-item>
        </Breadcrumb>
        <Button class="createSystemUser" type="error" shape="circle" @click="modal1=true">+ 新建系统角色</Button>
      </div>
      <table border="1" cellspacing="0" cellpadding="0">
        <thead>
        <tr>
          <th>ID</th>
          <th>权限角色</th>
          <th>创建时间</th>
          <th>权限操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(i,index) in data">
          <td>{{i.id}}</td>
          <td>{{i.name}}</td>
          <td>{{i.created_at}}</td>
          <td><a @click="systemUserDetail(i.id,i.name)" href="javascript:;">查看</a></td>
        </tr>
        </tbody>
      </table>
    </div>
    <Modal v-model="modal1" width="460">
      <p slot="header" style="color:#f60;text-align:center">
        <span>新建系统用户</span>
      </p>
      <div style="text-align:center; padding: 0 10px">
        <Form :model="formItem" :label-width="60" label-position="left" style="text-align: left; padding: 0 30px">
          <Form-item label="角色名称">
            <Input v-model="formItem.name" placeholder="请输入角色名称"></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" style="padding: 0 20px">
        <Button type="primary" size="small" long :loading="modal_loading" @click="createSystemUser">确定</Button>
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
        data:[],
        formItem:{
          name:'',
        },
        documentType:[],
        modal_loading:false,    //点击时样式
      }
    },
    methods:{
      createSystemUser(){
        this.$https.get('/obtain/product/auth/addRole',
          {
            params: {
              name: this.formItem.name
            }
          }
        ).then((response) => {
          this.modal1 = false;
          this.$Message.success(response.data.msg);
          this.getRoleList();
        }).catch(function(response) {
          console.log(response)
        })
      },
      systemUserDetail(id,name){
        this.$router.push({name:'RoleDetail',query:{id:id,name:name}});
      },
      getRoleList(){
        this.$https.get('/obtain/product/auth/findRoleList').then((response) => {
          this.data = response.data.body;
        }).catch(function(response) {
          console.log(response)
        })
      },
    },
    created: function() {
      //获取角色列表
      this.getRoleList();
    }
  }
</script>
