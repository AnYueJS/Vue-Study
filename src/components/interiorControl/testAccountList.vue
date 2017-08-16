<template>
  <div id="control">
    <div id="breadcrumb">
      <Breadcrumb>
        <Breadcrumb-item href="/channelList">渠道列表</Breadcrumb-item>
        <Breadcrumb-item href="/channelList">主渠道列表</Breadcrumb-item>
      </Breadcrumb>
      <Button class="create_test" @click="modal1=true" type="error" shape="circle">+ 新建测试账户</Button>
    </div>
    <table border="1" cellspacing="0" cellpadding="0">
      <thead>
      <tr>
        <th>电话</th>
        <th>添加时间</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="i in data">
        <td>{{i.phone}}</td>
        <td>{{i.update_at}}</td>
        <td><a @click="deleteTestAccount(i.id)" href="javascript:;">移除</a></td>
      </tr>
      </tbody>
    </table>
    <Modal v-model="modal1" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <span>添加测试账户</span>
      </p>
      <div style="text-align:center">
        <Form :model="formItem" :label-width="60" label-position="left" style="text-align: left; padding: 0 30px">
          <Form-item label="账户号码">
            <Input v-model="formItem.phone" placeholder="请输入测试账户号"></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" size="small" long :loading="modal_loading" @click="createTestAccount">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<style scoped lang="less">
  #breadcrumb{
    text-align: left;
    line-height: 30px;
    margin-bottom: 10px;
    position: relative;
    .create_test{
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
  }
</style>
<script>
  export default {
    data () {
      return {
        data: [],
        modal1:false,
        modal_loading:false,
        formItem:{
          phone:''
        },
      }
    },
    methods:{
      createTestAccount(){
        this.$https.get('/big_bend/backstage/user/add_black_list',
          {
            params:{
              phone: this.formItem.phone,
            }
          }
        ).then((response) => {
          this.$Message.success(response.data.msg);
          this.modal1 = false;
          this.getList();
        }).catch(function(response) {
          console.log(response)
        })
      },
      deleteTestAccount(id){
        this.$https.get('/big_bend/backstage/user/delete_black_list',
          {params:{
            black_list_id:id,
          }}
        ).then((response) => {
          this.$Message.success(response.body.msg);
          this.getList();
        }).catch(function(response) {
          console.log(response)
        })
      },
      getList(){
        this.$https.get('/big_bend/backstage/user/black_list').then((response) => {
          this.data = response.data.body;
        }).catch(function(response) {
          console.log(response)
        });
      }
    },
    created: function() {
      this.getList();
    }
  }
</script>
