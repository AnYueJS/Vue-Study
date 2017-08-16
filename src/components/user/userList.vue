<template>
  <div id="userList">
    <div id="breadcrumb">
      <Breadcrumb>
        <Breadcrumb-item href="/userList">用户管理</Breadcrumb-item>
        <Breadcrumb-item href="/userList">所有用户</Breadcrumb-item>
      </Breadcrumb>
      <Button class="users_list" type="warning" @click="downloadFile" shape="circle">导出列表</Button>
    </div>
    <div id="search_nav">
      <span>日期</span>
      <Date-picker class="start_time" v-model="start_time" type="date" placeholder="选择开始日期"
                   style="width: 150px"></Date-picker>
      <Date-picker class="end_time" v-model="end_time" type="date" placeholder="选择截止日期"
                   style="width: 150px"></Date-picker>
      <Button class="search_users_bar" type="warning" @click="searchUsers(1)">搜索</Button>
      <Input class="search_users" @on-enter="searchUsers(1)" v-model="value1" icon="ios-search-strong" placeholder="请输入查询条件..." style="width: 200px"></Input>
    </div>
    <Table width="100%" border :columns="columns4" :data="data" @on-selection-change="tableRowSelected"></Table>
    <div class="footer_page">
      <Page @on-change="setPage" :page-size="20" :current="1" :total="total" simple></Page>
    </div>
  </div>
</template>
<style scoped lang="less">
  #userList {
    #breadcrumb {
      text-align: left;
      line-height: 30px;
      position: relative;
      .users_list {
        position: absolute;
        right: 0;
        top: 0;
      }
    }
    #search_nav {
      text-align: left;
      margin: 10px 0;
      height: 40px;
      position: relative;
      .start_time {
        position: absolute;
        left: 40px;
        top: 0;
      }
      .end_time {
        position: absolute;
        left: 200px;
        top: 0;
      }
      .search_users_bar {
        position: absolute;
        left: 370px;
        top: 0;
      }
      .search_users {
        position: absolute;
        right: 0;
        top: 0;
      }
    }
    table {
      width: 100%;
      border: 1px solid #ccc;
      text-align: center;
      color: #000;
    }
    .footer_page {
      float: right;
      margin-top: 20px;
    }
  }

</style>
<style>
  .ivu-table-cell{
    padding: 0 5px;
  }
</style>
<script>
  export default {
    name: 'UserList',
    data () {
      return {
        start_time: '',
        end_time: '',
        value1: '',
        model1: '请选择',
        single: false,
        data: [],
        channelList: [],
        total: null,
        page: 1,
        columns4:[
          {
            type: 'selection',
            width: 30,
            align: 'center'
          },
          {
            title: '用户ID',
            align: 'center',
            key: 'user_id'
          },
          {
            title: '用户名',
            align: 'center',
            key: 'user_contact_name'
          },
          {
            title: '电话',
            align: 'center',
            key: 'phone'
          },
          {
            title: '邮箱',
            align: 'center',
            key: 'email'
          },
          {
            title: '所在地',
            key: 'address',
            align: 'center',
            width:200,
            render: (h, params) => {
              const row = params.row;
              if(row.address==null) return;
              const text = row.investor_type === 1 ? JSON.parse(row.address).country+ JSON.parse(row.address).region+JSON.parse(row.address).city+JSON.parse(row.address).district+JSON.parse(row.address).detail: JSON.parse(row.address).country+ JSON.parse(row.address).region+JSON.parse(row.address).city+JSON.parse(row.address).line1+JSON.parse(row.address).line2;
              return h('div', {

              }, text);
            }
          },
          {
            title: '投资人类型',
            align: 'center',
            key: 'investor_type',
            render: (h, params) => {
              const row = params.row;
              const text = row.investor_type === 1 ? '中国大陆投资人' : row.investor_type === 2 ? '美国投资人' : '其他国家地区投资人';
              return h('div', {

              }, text);
            }
          },
          {
            title: '渠道',
            align: 'center',
            key: 'advisor_name'
          },
          {
            title: '注册时间',
            align: 'center',
            key: 'create_at'
          },
          {
            title: '操作',
            key: 'control',
            width: 60,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.enterUserDetail(params.row.user_id);
                    }
                  }
                }, '查看')
              ]);
            }
          }],
        channelVal: '',
        downloadList:''
      }
    },
    methods: {
      setPage(page){
        this.searchUsers(page);
      },
      selectChannel(value){
        this.channelVal = value;
        if (value == '请选择') {
          this.channelVal = '';
        }
      },
      changeStartDate(value){
        this.start_time=value;
      },
      changeEndDate(value){
        this.end_time=value;
      },
      conditionVal(value){
        this.condition=value;
      },
      searchUsers(page){
        this.$https.post('/big_bend/backstage/user/list',
          ({
            condition: this.value1,
            end_date: this.end_time,
            is_measure: 1,
            start_date: this.start_time,
            usertype: 0,
            page_current: page,
            page_size: 20,
          }),
        ).then((response) => {
          this.data = response.data.body.users;
          this.total = response.data.body.page.total;
        }).catch(function (response) {
          console.log(response)
        })
      },
      enterUserDetail(id){
          this.$router.push({name:'UserDetail',query:{id:id}})
      },
      tableRowSelected(value){
        var arr=[];
        value.forEach(function (item,index) {
          return arr.push(item.user_id);
        });
        this.downloadList=arr.join(',');
      },
      downloadFile(){
        var export_data = (
            {
              condition:this.value1,
              is_measure:1,
              usertype:0,
              ids_str:this.downloadList,
              start_date:this.start_time,
              end_date:this.end_time,
            });
        this.$https.post('/big_bend/backstage/download/export_user',export_data ,
        ).then((response) => {
            window.location.href=response.data.body
        }).catch(function (response) {
          console.log(response)
        });
      },
    },
    created: function () {
       this.searchUsers(1);
    }
  }
</script>
