<template>
  <div id="zionProductList">
    <div id="breadcrumb">
      <Breadcrumb>
        <Breadcrumb-item href="/joinRequestList">渠道管理</Breadcrumb-item>
        <Breadcrumb-item href="/joinRequestList">入驻申请</Breadcrumb-item>
      </Breadcrumb>
    </div>
    <div id="search_nav">
      <Form :model="model1" :label-width="80" label-position="left">
        <span style="margin-right: 30px">状态</span>
          <Select v-model="model1.status" @on-change="selected" style="width:180px">
            <Option v-for="item in statueList" :value="item.value" :key="item">{{ item.label }}</Option>
          </Select>
      </Form>
    </div>
    <table border="1" cellspacing="0" cellpadding="0" class="product_list">
      <thead>
      <tr>
        <th>ID</th>
        <th>用户名称</th>
        <th>电话</th>
        <th>邮箱</th>
        <th>名片</th>
        <th>申请时间</th>
        <th>操作</th>
        <th>处理</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="i in data">
        <td>{{i.id}}</td>
        <td>{{i.name}}</td>
        <td>{{i.phone}}</td>
        <td>{{i.email}}</td>
        <td><a v-if="i.card_url" :href="i.card_url" target="_blank">名片</a><a v-else="" :href="i.card_url" target="_blank"></a></td>
        <td>{{i.create_at}}</td>
        <td><a v-if="!i.is_opened" @click="createChannel(i.id)" href="javascript:(0)">开通用户</a><span v-else="">已开通</span></td>
        <td><a v-if="!i.is_handled" @click="updateApply(i.id)" href="javascript:(0)">标记为已处理</a><span v-else="">已处理</span></td>
      </tr>
      </tbody>
    </table>
    <Modal
      v-model="modal3" id="applyModal"
      title="标记为已处理"
      :mask-closable="false"
      @on-ok="remark"
      @on-cancel="cancel" style="text-align: center">
      <Form style="padding: 10px 30px">
        <div style="text-align: center">
          <p>确认将此申请标记为已处理?</p>
        </div>
      </Form>
    </Modal>
  </div>
</template>
<style scoped lang="less">
  #breadcrumb{
    text-align: left;
    line-height: 30px;
  }
  #search_nav{
    text-align: left;
    margin: 10px 0;
  }
  table{
    width: 100%;
    border: 1px solid #ccc;
    text-align: center;
    color: #000;
  }
</style>
<style>
  #applyModal{

  }
</style>
<script>
  export default {
    data () {
      return {
        data: [],
        model1:{
          status:'',
        },
        modal3:false, //标记
        statueList:[
          {value: '', label: '请选择'},
          {value: '0', label: '未处理'},
          {value: '1', label: '已处理'}
        ]
      }
    },
    methods:{
      productDetail(id){
        this.$router.push({name:'ChannelProductDetail',query:{id:id}});
      },
      createChannel(id){
        this.$router.push({name:'CreateChannel',query:{apply_id:id}});
      },
      updateApply(id){
        this.modal3=true;
        this.app_id = id;
      },
      remark(){
        this.$https.post('/obtain/product/channel/upChannelApply', ({is_handled: this.model1.status, id: this.app_id})).then((res) => {
          this.$Message.success(res.body.msg)
        }).catch(function(response) {
          console.log(response)
        });
      },
      cancel(){},
      selected(){
        this.getData();
      },
      getData(){
        this.$https.get('/product/channel/getChannelApplyList', {params: {
          is_handled: this.model1.status,
          page_current: 1,
          page_size: 1000,
        },}).then((response) => {
          this.data = response.data.body.channelApplys;
        }).catch(function(response) {
          console.log(response)
        })
      },
    },
    created: function() {
      this.getData();
    }
  }
</script>
