<template>
  <div class="user_info">
    <Form v-model="formItem" :label-width="80" label-position="left">
      <span class="userDetailTitle">| 用户详情</span>
      <div class="base_info">
        <Row type="flex" justify="space-around" class="code-row-bg">
          <Col span="6">
          <Form-item label="姓">
            <Input size="small" v-model="formItem.last_name"></Input>
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="名">
            <Input size="small" v-model="formItem.first_name"></Input>
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="用户id">
            {{formItem.user_id}}
          </Form-item>
          </Col>
        </Row>
        <Row type="flex" justify="space-around" class="code-row-bg">
          <Col span="6">
          <Form-item label="电话">
            <Input size="small" v-model="formItem.phone"></Input>
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="邮箱">
            <Input size="small" v-model="formItem.email"></Input>
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="国籍">
            <Input size="small" v-model="formItem.base_info.nationality"></Input>
          </Form-item>
          </Col>
        </Row>
        <Row type="flex" justify="space-around" class="code-row-bg">
          <Col span="6">
          <Form-item label="出生日期">
            <Input size="small" v-model="formItem.base_info.date_of_birth"></Input>
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="出生国家">
            <Input size="small" v-model="formItem.base_info.country_of_birth"></Input>
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="SSN">
            <Input size="small" v-model="formItem.base_info.ssn"></Input>
          </Form-item>
          </Col>
        </Row>
        <Row type="flex" justify="space-around" class="code-row-bg">
          <Col span="6">
          <Form-item label="资金来源">
            <Input size="small" v-model="formItem.base_info.source_of_capital"></Input>
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="职能">
            <Input size="small" v-model="formItem.base_info.industry"></Input>
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="职业">
            <Input size="small" v-model="formItem.base_info.occupation"></Input>
          </Form-item>
          </Col>
        </Row>
        <Row type="flex" justify="space-around" class="code-row-bg">
          <Col span="6">
          <Form-item label="纳税国">
            <Input size="small" v-model="formItem.base_info.country_of_tax_residency"></Input>
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="纳税号">
            <Input size="small" v-model="formItem.base_info.foreign_tax_number"></Input>
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="注册时间">
            {{formItem.create_at}}
          </Form-item>
          </Col>
        </Row>
      </div>
      <span class="userDetailTitle">| 渠道来源</span>
      <div class="channel_source">
        <Row type="flex" justify="space-around" class="code-row-bg">
          <Col span="6">
          <Form-item label="渠道">
            {{formItem.channel_name}}
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="渠道id">
            {{formItem.channel_id}}
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="">
          </Form-item>
          </Col>
        </Row>
      </div>
      <span class="userDetailTitle">| 投资人类型</span>
      <div class="investor_type">
        <Row type="flex" justify="space-around" class="code-row-bg">
          <Col span="6">
          <Form-item label="投资人类型">
            {{formItem.investor_type | investorType}}
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="">
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="">
          </Form-item>
          </Col>
        </Row>
      </div>
      <span class="userDetailTitle">| 地址信息</span>
      <span
      style="margin: 0 20px;">地址类型</span><span>{{formItem.address_type | addressType}}</span>
      <div class="address">
        <Row type="flex" justify="space-around" class="code-row-bg">
          <Col span="6">
          <Form-item label="国家／地区">
            <Input size="small" v-model="formItem.address.country"></Input>
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="省/直辖市">
            <Input size="small" v-model="formItem.address.region"></Input>
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="市/州/地区">
            <Input size="small" v-model="formItem.address.city"></Input>
          </Form-item>
          </Col>
        </Row>
        <Row type="flex" justify="space-around" class="code-row-bg">
          <Col span="6" v-if="formItem.investor_type==1">
          <Form-item label="区/县">
            <Input size="small" v-model="formItem.address.district"></Input>
          </Form-item>
          </Col>
          <Col span="14" v-if="formItem.investor_type==1">
          <Form-item label="详细地址">
            <Input size="small" v-model="formItem.address.detail"></Input>
          </Form-item>
          </Col>
          <Col span="22" v-if="formItem.investor_type!=1">
          <Form-item label="地址第一行">
            <Input size="small" v-model="formItem.address.line1"></Input>
          </Form-item>
          </Col>
          <Col span="22" v-if="formItem.investor_type!=1">
          <Form-item label="地址第二行">
            <Input size="small" v-model="formItem.address.line2"></Input>
          </Form-item>
          </Col>
          <Col span="22">
          <Form-item label="邮编">
            <Input size="small" v-model="formItem.address.postal_code"></Input>
          </Form-item>
          </Col>
        </Row>
      </div>
      <span class="userDetailTitle">| 银行信息</span><span
      style="margin: 0 20px;">银行类型</span>
      <span>{{formItem.bank_type | bankType}}</span>
      <div class="bank">
        <Row type="flex" justify="space-around" class="code-row-bg">
          <Col span="6">
          <Form-item label="银行名称">
            <Input size="small" v-model="formItem.bank.bank_name"></Input>
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="银行账户">
            <Input size="small" v-model="formItem.bank.account_number"></Input>
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="Swift Code">
            <Input size="small" v-model="formItem.bank.swift_code"></Input>
          </Form-item>
          </Col>
          <Col span="22">
          <Form-item label="银行地址">
            <Input size="small" v-model="formItem.bank.bank_address"></Input>
          </Form-item>
          </Col>
        </Row>
        <Row type="flex" justify="space-around" class="code-row-bg" v-if="formItem.bank_type=='US'">
          <Col span="6">
          <Form-item label="ABA/routing # (ACH)">
            <Input size="small" v-model="formItem.bank.routing_number_ach"></Input>
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="ABA/routing # (Wire)">
            <Input size="small" v-model="formItem.bank.routing_number"></Input>
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="账户类型">
            <Input size="small" v-model="formItem.bank.account_type"></Input>
          </Form-item>
          </Col>
        </Row>
        <Row type="flex" justify="space-around" class="code-row-bg"
             v-if="formItem.bank_type=='NON_US'&&formItem.bank.have_middle_bank==1">
          <Col span="6">
          <Form-item label="中间行名称">
            <Input size="small" v-model="formItem.bank.middle_bank_name"></Input>
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="中间行地址">
            <Input size="small" v-model="formItem.bank.middle_bank_address"></Input>
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="中间行Swiftcode">
            <Input size="small" v-model="formItem.bank.middle_bank_swift_code"></Input>
          </Form-item>
          </Col>
        </Row>
      </div>
      <div class="accreditation" v-if="formItem.investor_type==2">
        <span class="userDetailTitle">| 合规审查</span><!--<span
        style="margin: 0 20px;">审查方式</span><Input size="small" style="display: inline-block; width: 200px;" v-model="formItem.accreditation.type"></Input>-->
        <Row type="flex" justify="space-around" class="code-row-bg">
          <Col span="6">
          <Form-item label="审查方式">
            <Input size="small" v-model="formItem.accreditation.type"></Input>
          </Form-item>
          </Col>
          <Col span="6"></Col>
          <Col span="6"></Col>
        </Row>
        <Row type="flex" justify="space-around" class="code-row-bg" v-if="formItem.accreditation.with_spouse">
          <Col span="6">
          <Form-item label="配偶姓">
            <Input size="small" v-model="formItem.accreditation.spouse_last_name"></Input>
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="配偶名">
            <Input size="small" v-model="formItem.accreditation.spouse_first_name"></Input>
          </Form-item>
          </Col>
          <Col span="6">
          </Col>
        </Row>
        <Row type="flex" justify="space-around" class="code-row-bg" v-if="formItem.accreditation.with_spouse">
          <Col span="6">
          <Form-item label="配偶电话">
            <Input size="small" v-model="formItem.accreditation.spouse_phone"></Input>
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="配偶邮箱">
            <Input size="small" v-model="formItem.accreditation.spouse_email"></Input>
          </Form-item>
          </Col>
          <Col span="6">
          </Col>
        </Row>
      </div>
      <span class="userDetailTitle">| 证件材料</span>
      <div class="base_info" >
        <div style="padding: 10px 30px">
          <table border="1" cellspacing="0" cellpadding="0" class="product_list">
            <thead>
            <tr>
              <th>证件类型</th>
              <th>有效期至</th>
              <th>证件号码</th>
              <th>链接</th>
              <th>下载</th>
              <th>上传</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(i,index) in cards">
              <td>{{i.file_type|cards}}</td>
              <td @dblclick="modificationDate(index)">
                <Input @on-enter="saveModificationDate(i.user_id,i.file_number,i.file_type,i.file_url,i.id)"
                       v-if="expireDate===index" v-model="file_expire_date" format="yyyy/MM/dd" placeholder="yyyy-mm-dd"></Input>
                <span v-else="">{{i.file_expire_date}}</span>
              </td>
              <td @dblclick="modificationNumber(index)">
                <Input @on-enter="saveModificationNumber(i.user_id,i.file_expire_date,i.file_type,i.file_url,i.id)"
                       v-if="expireNumber===index" v-model="file_number"></Input>
                <span v-else="">{{i.file_number}}</span>
              </td>
              <td><a v-bind:href="i.file_url" target="_blank">{{i.file_url}}</a></td>
              <td><a v-bind:href="i.file_url" download="">下载</a></td>
              <td><a href="javascript:;">上传</a></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="next">
        <Button @click="save" type="info">保存</Button>
      </div>
    </Form>
  </div>
</template>
<style lang="less">
  .user_info {
    font-size: 12px;
    .ivu-form-item {
      margin-bottom: 10px;
    }
    .userDetailTitle {
      font: 14px/32px "Lantinghei SC", "Open Sans", Arial, "Hiragino Sans GB", "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", STHeiti, "WenQuanYi Micro Hei", SimSun, sans-serif !important;
    }
    .next{
      margin-top: 30px;
      padding: 0 60px;
      text-align: right
    }
  }
</style>
<script>
  export default {
    name: 'UserDetail',
    data () {
      return {
        formItem: {
          first_name: null,
          last_name: null,
          base_info: {
            country_of_birth: null,
            country_of_tax_residency: null,
            date_of_birth: null,
            foreign_tax_number: null,
            industry: null,
            nationality: null,
            occupation: null,
            source_of_capital: null,
            ssn: null
          },
          address: {
            city: null,
            country: null,
            detail: null,
            district: null,
            postal_code: null,
            region: null,
            line1: null,
            line2: null
          },
          address_type: null,
          bank_type: null,
          bank: {
            account_number: null,
            bank_address: null,
            bank_name: null,
            have_middle_bank: 0,
            middle_bank_address: null,
            middle_bank_name: null,
            middle_bank_swift_code: null,
            swift_code: null,
            routing_number: null,
            routing_number_ach: null,
            account_type: null
          },
          accreditation: {
            debt_amount: null,
            spouse_email: null,
            spouse_first_name: null,
            spouse_last_name: null,
            spouse_phone: null,
            type: null,
            verification_method: null,
            with_spouse: false
          },
          signature: null,
          spouse_signature: null,
          user_id: null,
          email: null,
          phone: null,
          investor_type: null,
          referral: null,
          channel_id: null,
          create_at: null,
          channel_name: null,
          channel_code: null
        },
        cards:[],   //证件
        file_expire_date: '',
        file_number:'',
        expireDate: false,
        expireNumber: false,
      }
    },
    methods: {
      save(){
        let formData = {};
        formData.email = this.formItem.email;
        formData.phone = this.formItem.phone;
        formData.user_id = this.formItem.user_id;
        this.$https.post('/big_bend/backstage/user/update', (formData),
        ).then((response) => {
          this.$Message.success(response.data.msg);
          this.getUserDetail();
        }).catch(function (response) {
          console.log(response)
        });
        return false;
      },
      //修改证件材料日期
      modificationDate(index){
        this.expireDate = index;
      },
      saveModificationDate(userId,file_number,file_type,file_url,id){
        this.$https.post('/meixin/userFile/updateUserFile',
          JSON.stringify({
            user_id: userId,
            proof_file:[
              {
                expire_date: this.file_expire_date,
                number: file_number,
                file_type: file_type,
                file: file_url,
                id: id,
              }
            ],
            mx_token: this.token,
            mx_secret: this.secret
          })
        ).then((response) => {
          console.log(response);
          this.expireDate = false;
          this.getUserList();
        }).catch(function(response) {
          console.log(response)
        });
      },
      //修改证件材料号码
      modificationNumber(index){
        this.expireNumber = index;
      },
      saveModificationNumber(userId,file_expire_date,file_type,file_url,id){
        this.$https.post('/meixin/userFile/updateUserFile',
          JSON.stringify({
            user_id: userId,
            proof_file:[
              {
                expire_date: file_expire_date,
                number: this.file_number,
                file_type: file_type,
                file: file_url,
                id: id,
              }
            ],
            mx_token: this.token,
            mx_secret: this.secret
          })
        ).then((response) => {
          this.expireNumber = false;
          this.getUserList();
        }).catch(function(response) {
          console.log(response)
        });
      },
      //用于回调时用户详情
      getUserDetail(){
        const id = this.$route.query.id;
        this.$https.get('/big_bend/backstage/user/detail',
          {
            params: {
              user_id: id,
            }
          },
        ).then((response) => {
          let d = response.data.body;
          this.formItem.last_name = d.last_name;
          this.formItem.first_name = d.first_name;
          this.formItem.user_id = d.user_id;
          this.formItem.phone = d.phone;
          this.formItem.email = d.email;
          if (d.base_info != null) {
            this.formItem.base_info = JSON.parse(d.base_info);
          }
          if (d.address != null) {
            this.formItem.address = JSON.parse(d.address);
          }
          if (d.bank != null) {
            this.formItem.bank = JSON.parse(d.bank);
          }
          if (d.accreditation != null) {
            this.formItem.accreditation = JSON.parse(d.accreditation);
          }
          this.formItem.create_at = d.create_at;
          this.formItem.channel_name = d.advisor_name;
          this.formItem.channel_id = d.channel_id;
          this.formItem.investor_type = d.investor_type;
          this.formItem.address_type = d.address_type;
          this.formItem.bank_type = d.bank_type;
          this.cards = d.user_file_list;
        }).catch(function (response) {
          console.log(response)
        });
      }
    },
    created: function () {
      this.getUserDetail();
    },
    filters: {
      addressType: function (value) {
        return {
          "CN": "中国大陆地址",
          "NON_CN": "非中国大陆地址"
        }[value]
      },
      bankType: function (value) {
        return {
          "US": "美国银行",
          "NON_US": "非美国银行"
        }[value]
      },
    }
  }
</script>
