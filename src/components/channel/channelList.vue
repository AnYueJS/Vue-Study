<template>
  <div id="channelList">
    <div id="breadcrumb">
      <Breadcrumb>
        <Breadcrumb-item href="/channelList">渠道列表</Breadcrumb-item>
        <Breadcrumb-item href="/channelList">主渠道列表</Breadcrumb-item>
      </Breadcrumb>
    </div>
    <div id="search_nav">
      <div class="status1">
        <Form :model="model1" :label-width="80" label-position="left">
          <Form-item label="对接人员">
            <Select v-model="model1.dockingPerson" style="width:180px">
              <Option v-for="item in dockingList" :value="item.name" :key="item">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item label="状态">
            <Select v-model="model1.status" style="width:180px">
              <Option v-for="item in statueList" :value="item.value" :key="item">{{ item.label }}</Option>
            </Select>
          </Form-item>
        </Form>
      </div>
      <div class="status3">
        <Form :model="model1" :label-width="90" label-position="left" style="text-align: left">
          <Form-item label="属性">
            <Select v-model="model1.attributes" style="width:243px">
              <Option v-for="item in attributesList" :value="item.value" :key="item">{{ item.label }}</Option>
            </Select>
          </Form-item>
          <Form-item label="创建时间" style="position: relative">
            <Date-picker v-model="model1.create_start_time" type="date" placeholder="开始日期" style="width: 115px; display: inline-block"></Date-picker> -
            <Date-picker v-model="model1.create_end_time" type="date" placeholder="截止日期" style="width: 115px; position: absolute; top: 1px;left: 128px"></Date-picker>
          </Form-item>
        </Form>
      </div>
      <div class="status4">
        <Form :model="model1" :label-width="50" label-position="left" style="text-align: left">
          <Form-item>
            <Button style="width: 100px" type="error" shape="circle" @click="resetCondition">重置条件</Button>
          </Form-item>
          <Form-item>
            <Button style="width: 100px" type="error" shape="circle" @click="getList">搜索</Button>
          </Form-item>
        </Form>
      </div>
    </div>
    <Form :model="model1" :label-width="80" label-position="left" style="text-align: left; width: 300px; display: inline-block">
      <Form-item label="用户">
        <Input @on-change="getChannelList" class="channel_search" v-model="value1" icon="ios-search-strong" placeholder="名称/电话/邮箱" style="width: 180px"></Input>
      </Form-item>
    </Form>
    <Button style="width: 100px;" class="createParentChannel" type="error" shape="circle" @click="createParentChannel">+ 新建用户</Button>
    <table border="1" cellspacing="0" cellpadding="0">
      <thead>
      <tr>
        <th>ID</th>
        <th>名称</th>
        <th>电话</th>
        <th>邮箱</th>
        <th>对接人员</th>
        <th>使用身份</th>
        <th>属性</th>
        <th>子用户数</th>
        <th>上次登录</th>
        <th>创建时间</th>
        <th>状态</th>
        <th>子用户列表</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="i in data">
        <td>{{i.id}}</td>
        <td><a @click="detail(i.id)" href="javascript:(0)">{{i.company_name}}</a></td>
        <td>{{i.phone}}</td>
        <td>{{i.email}}</td>
        <td>{{i.docking_person}}</td>
        <td>
          <span v-show="i.is_financial_planner">理财顾问</span>
          <span v-show="i.is_financial_planner && i.is_asset_management">/</span>
          <span v-show="i.is_asset_management">资管方</span>
        </td>
        <td>{{i.attribute|attribute}}</td>
        <td>{{i.advisor_count}}</td>
        <td>{{i.last_login_time}}</td>
        <td>{{i.create_at}}</td>
        <td>{{i.is_active|isActive}}</td>
        <td><a @click="checkChild(i.id)" href="javascript:(0)">查看</a></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped lang="less">
  #channelList{
    #breadcrumb{
      text-align: left;
      line-height: 30px;
    }
    #search_nav{
      text-align: left;
      margin: 10px 0;
      position: relative;
      border-bottom: 1px solid #ccc;
      .status3{
        position: absolute;
        left: 350px;
        top: 0;
      }
      .status4{
        position: absolute;
        right: 20px;
        top: 0;
      }
    }
    .createParentChannel{
      float: right;
      margin-right: 20px;
      margin-bottom: 10px;
    }
    table{
      width: 100%;
      border: 1px solid #ccc;
      text-align: center;
      color: #000;
    }
  }
</style>
<style>
  .ivu-form-item{
    margin-bottom: 10px;
  }
</style>
<script>
  export default {
    name: 'channelList',
    data () {
      return {
        value1:'',
        data: [],
        phone:'',
        model1: {
          status:'',
          dockingPerson:'',
          identity:'',
          attributes:'',
          create_start_time:'',
          create_end_time:'',
        },
        dockingList:[],
        statueList:[
          {value:'', label:'请选择'},
          {value:'true', label:'启用'},
          {value:'false', label:'停用'},
        ],
        attributesList:[
          {value:'', label:'请选择'},
          {value:'2', label:'团体'},
          {value:'1', label:'个人'},
        ],
      }
    },
    methods:{
      resetCondition(){
        this.create_start_time = '',
        this.create_end_time = '',
        this.model1.status = '',
        this.model1.dockingPerson = '',
        this.model1.attributes = ''
      },
      //根据条件搜索
      getList(){
          if(this.model1.create_start_time!==''){
            this.model1.create_start_time = new Date(this.model1.create_start_time).toLocaleDateString().replace(/\//g,'-');
          }if(this.model1.create_end_time!==''){
            this.model1.create_end_time = new Date(this.model1.create_end_time).toLocaleDateString().replace(/\//g,'-');
          }
        this.$https.post('/product/channel/searchChannelList',
          ({
            attribute: this.model1.attributes,
            docking_person: this.model1.dockingPerson,
            start_create_at: this.model1.create_start_time,
            end_create_at: this.model1.create_end_time,
            is_active: this.model1.status,
            page_current: '1',
            page_size: '1000',
          })
        ).then((response) => {
          this.data = response.data.body.channels;
        }).catch(function(response) {
          console.log(response)
        })
      },
      //主渠道详情
      detail(id){this.$router.push({name:'ChannelDetail', query:{channel_id:id}})},
      //新建主渠道
      createParentChannel(){this.$router.push({name:'CreateChannel'})},
      //查看子渠道
      checkChild(id){this.$router.push({name:'ChildChannelList', query:{channel_id:id}})},
      //查询主渠道
      getChannelList(){
        this.$https.get('/product/channel/getChannelList',
          {
            params: {
              params: this.value1,
              page_current: '1',
              page_size: '1000',
            },
          }
        ).then((response) => {
          this.data = response.data.body.channels;
        }).catch(function(response) {
          console.log(response)
        });
      },
      //查询finance主渠道下所有子渠道
      getChildChannelList(){
        this.$https.get('/product/channel/getAdvisorByChannelId',
          {
            params: {
              channel_id: this.customization_channel_id,
            },
          }
        ).then((response) => {
          this.dockingList = response.data.body;
        }).catch(function(response) {
          console.log(response)
        });
      }
    },
    created: function() {
      this.getChannelList();
      this.getChildChannelList();
    }
  }
</script>
