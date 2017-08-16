<template>
  <div id="data">
    <div class="data_wrapper">
      <div id="homePage">
        <div class="home_icon_line">
          <Icon class="icon_home" type="ios-home"></Icon>
          <span>我的主页</span>
        </div>
        <div class="detail-list">
          <div class="detail newUser">
            <div class="top user">
              <div class="Totals">
                <span class="totalCount">{{data.day_new_user}}</span><br/>
                <span class="totalIcon"><img src="../../assets/img/index/1.png" alt=""></span>
              </div>
              <div class="respectively">
                日:<span class="day-account"> {{data.day_new_user}}</span><br/>
                周:<span class="week-account"> {{data.week_new_user}}</span><br/>
                月:<span class="month-account"> {{data.month_new_user}}</span><br/>
              </div>
            </div>
            <div class="bottom">
              <span>昨日新增用户</span>
            </div>
          </div>
          <div class="detail newInvest">
            <div class="top invest">
              <div class="Totals">
                <span class="totalCount">{{data.day_new_user}}</span><br/>
                <span class="totalIcon"><img src="../../assets/img/index/2.png" alt=""></span>
              </div>
              <div class="respectively">
                日:<span class="day-account"> {{data.day_new_user}}</span><br/>
                周:<span class="week-account"> {{data.week_new_user}}</span><br/>
                月:<span class="month-account"> {{data.month_new_user}}</span><br/>
              </div>
            </div>
            <div class="bottom">
              <span>昨日新增投资</span>
            </div>
          </div>
          <div class="detail newOrder">
            <div class="top appoint">
              <div class="Totals">
                <span class="totalCount">{{data.day_new_user}}</span><br/>
                <span class="totalIcon"><img src="../../assets/img/index/3.png" alt=""></span>
              </div>
              <div class="respectively">
                日:<span class="day-account"> {{data.day_new_user}}</span><br/>
                周:<span class="week-account"> {{data.week_new_user}}</span><br/>
                月:<span class="month-account"> {{data.month_new_user}}</span><br/>
              </div>
            </div>
            <div class="bottom">
              <span>昨日新增预约</span>
            </div>
          </div>
        </div>
        <div class="detail-list">
          <div class="detail onProduct">
            <div class="top product">
              <div class="Totals">
                <span class="totalCount" v-html="data.onsale_product_count">0</span><br/>
                <span class="totalIcon"><img src="../../assets/img/index/4.png" alt=""></span>
              </div>
              <div class="respectively">
                入金人数:<span class="account" v-html="data.onsale_user_count"> 0</span><br/>
                入金金额:<span class="amount" v-html="parseInt(data.onsale_order_amount/10000)+'万'"> 00</span><br/>
              </div>
            </div>
            <div class="bottom">
              <span>在售产品</span>
            </div>
          </div>
          <div class="detail orderProduct">
            <div class="top orderProduct-top appoint-product">
              <div class="Totals">
                <span class="totalCount" v-html="data.appoint_product_count"></span><br/>
                <span class="totalIcon"><img src="../../assets/img/index/5.png" alt=""></span>
              </div>
              <div class="respectively">
                预约人数:<span class="account" v-html="data.appoint_user_count"></span><br/>
                感兴趣金额:<span class="amount" v-html="parseInt(data.appoint_order_amount/10000)+'万'"></span><br/>
              </div>
            </div>
            <div class="bottom">
              <span>预约产品</span>
            </div>
          </div>
          <div class="detail soldOutProduct">
            <div class="top soldOutProduct-top soldout-product">
              <div class="Totals">
                <span class="totalCount" v-html="data.soldout_product_count">0</span><br/>
                <span class="totalIcon"><img src="../../assets/img/index/6.png" alt=""></span>
              </div>
              <div class="respectively">
                入金人数:<span class="account" v-html="data.soldout_user_count"> 0</span><br/>
                入金金额:<span class="amount" v-html="data.soldout_order_amount"> 00</span><br/>
              </div>
            </div>
            <div class="bottom">
              <span>售罄产品</span>
            </div>
          </div>
        </div>
        </div>
    </div>
  </div>
</template>
<style scoped lang="less">
  .data_wrapper{
    #homePage{
      .home_icon_line{
        text-align: left;
        margin-left: 10px;
        font-size: 14px;
        margin-bottom: 10px;
        .icon_home{
          font-size: 18px;
        }
      }
      .detail-list{
        width: 100%;
        text-align: center;
        .detail{
          width: 30%;
          color: #fff;
          font-size: 16px;
          margin-right: 3%;
          margin-bottom: 30px;
          display: inline-block;
          text-align: center;
          .top{
            height: 100px;
            padding: 20px 0 0;
          }
          .bottom{
            height: 35px;
            line-height: 35px;
            text-align: center;
          }
          .Totals{
            width: 35%;
            float: left;
            .totalCount{
              font-size: 24px;
            }
          }
          .respectively{
            width: 60%;
            float: right;
            text-align: right;
            margin-right: 10px;
          }
        }
        .newUser{
          background-color: #a9d86e;
          .bottom{
            background-color: #95cc4f;
          }
        }
        .newInvest{
          background-color: #5ed3fe;
          .bottom{
            background-color: #57c7f0;
          }
        }
        .newOrder{
          background-color: #ff6c60;
          margin-right: 0;
          .bottom{
            background-color: #ee6358;
          }
        }
        .onProduct{
          background-color: #fccb48;
          .bottom{
            background-color: #e7b83c;
          }
        }
        .orderProduct{
          background-color: #8175c7;
          .bottom{
            background-color: #7165b9;
          }
        }
        .soldOutProduct{
          background-color: #53b2fb;
          margin-right: 0;
          .bottom{
            background-color: #55a8e8;
          }
        }
      }
    }
  }
</style>
<script>
  export default {
    name: 'dashboard',
    data () {
      return {
        data:{
          'day_new_user':1,
          'week_new_user':2,
          'month_new_user':3,
          'onsale_product_count':4,
          'onsale_user_count':5,
          'onsale_order_amount':1000000,
          'appoint_product_count':10,
          'appoint_user_count':10,
          'soldout_product_count':10,
          'appoint_order_amount':100000,
          'soldout_user_count':10,
          'soldout_order_amount':1000,
        },
      }
    },
    methods: {
      //查询首页信息
      getWelcomeInfo(){
        this.$https.get('/backstage/index').then((response) => {
//          this.data = response.data.body;
        }).catch(function(response) {
          console.log(response)
        })
      },
    },
    created: function() {
      this.getWelcomeInfo();
    }
  }
</script>
