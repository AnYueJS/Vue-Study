<template>
  <div id="appoint">
    <div id="breadcrumb">
      <Breadcrumb>
        <Breadcrumb-item href="/appointList">投资系统</Breadcrumb-item>
        <Breadcrumb-item href="/appointList">预约列表</Breadcrumb-item>
      </Breadcrumb>
      <Checkbox @on-change="measure" class="is_measure" v-model="single">包含测试数据</Checkbox>
      <Input @on-enter="getList(1)" class="search" v-model="value1" icon="ios-search-strong" placeholder="用户名／产品名／产品编号／订单ID／订单编号" style="width: 300px"></Input>
    </div>
    <table border="1" cellspacing="0" cellpadding="0" class="product_list">
      <thead>
      <tr>
        <th>预约单号</th>
        <th>联系人姓名</th>
        <th>产品名称</th>
        <th>产品编号</th>
        <th>电话</th>
        <th>邮箱</th>
        <th>城市</th>
        <th>预约时间</th>
        <th>渠道</th>
        <th>状态</th>
        <th>详情</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="i in data">
        <td>{{i.number}}</td>
        <td>{{i.user_contact_name}}</td>
        <td>{{i.product_name}}</td>
        <td>{{i.product_number}}</td>
        <td>{{i.phone}}</td>
        <td>{{i.email}}</td>
        <td>{{i.city}}</td>
        <td>{{i.appointment_date}}</td>
        <td>{{i.channel_name}}</td>
        <td>{{i.status|appointStatus}}</td>
        <td><a @click="enterDetail(i.id)" href="javascript:;">详情</a></td>
      </tr>
      </tbody>
    </table>
    <div class="footer_page">
      <Page @on-change="setPage" :page-size="20" :current="1" :total="total" simple></Page>
    </div>
  </div>
</template>
<style scoped lang="less">
  #appoint{
    #breadcrumb{
      text-align: left;
      line-height: 30px;
      position: relative;
      margin-bottom: 10px;
      .is_measure{
        position: absolute;
        right: 360px;
        top: 0;
      }
      .search{
        position: absolute;
        right: 0;
        top: 0;
      }
    }
    table{
      width: 100%;
      border: 1px solid #ccc;
      text-align: center;
      color: #000;
    }
    .footer_page{
      float: right;
      margin-top: 20px;
    }
  }
</style>
<script>
  export default {
    name: 'appointList',
    data () {
      return {
        value1: '',
        single:false,
        data: [],
        total:null,
        page:1,
      }
    },
    methods:{
      setPage(page){
        this.getList(page);
      },
      //搜索
      getList(page){
        if(this.single===true){
          var measure = '1'
        }else{
          measure = '0'
        }
        this.$https.post('/big_bend/backstage/order/appoints_list',
          ({
            condition: this.value1,
            is_measure: measure,
            name: "",
            number: "",
            page_current: page,
            page_size: 20,
          })
        ).then((response) => {
          let d = response.data.body;
          this.data = d.appoints;
          this.total = d.page.total;
        }).catch(function(response) {
          console.log(response)
        })
      },
      //测试数据
      measure(){
        this.getList(1)
      },
      //产品详情
      enterDetail(id){
        this.$router.push({name:'AppointOrderDetail',query:{id:id}});
      }
    },

    created: function() {
      this.getList(1);
    }
  }
</script>
