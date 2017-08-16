<template>
  <div id="create">
    <p class="describe">| 新建用户</p>
    <div id="block1">
      <div class="base_info">
        <div class="base_info_list_one">
          <Form :model="formItem" :label-width="120" label-position="left" style="text-align: left">
            <Form-item label="识别码">
              <Input v-model="formItem.code" :maxlength=num placeholder="请输入"></Input>
            </Form-item>
            <Form-item label="电话(用于登录)">
              <Input v-model="phone">
              <Select v-show="!fromApply" v-model="phone_select" slot="prepend" style="width: 80px">
                <template>
                  <Option v-for="item in countryList" :value="item.code" :key="item"></Option>
                </template>
              </Select>
              </Input>
            </Form-item>
            <Form-item label="美信对接人员">
              <Select v-model="formItem.docking_person">
                <Option v-for="item in dockingList" :value="item.name" :key="item">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Form>
        </div>
        <div class="base_info_list_two">
          <Form :model="formItem" :label-width="100" label-position="left" style="text-align: left">
            <Form-item label="用户名">
              <Input v-model="formItem.name" placeholder="请输入"></Input>
            </Form-item>
            <Form-item label="邮箱">
              <Input v-model="formItem.email" placeholder="请输入"></Input>
            </Form-item>
            <Form-item label="BD经理">
            <Select v-model="formItem.docking_person">
              <Option v-for="item in bdList" :value="item.name" :key="item">{{ item.name }}</Option>
            </Select>
            </Form-item>
          </Form>
        </div>
        <Form :model="formItem" :label-width="120" label-position="left" style="text-align: left; padding: 0 30px;">
          <Form-item label="备注">
            <Input v-model="formItem.remark" type="textarea" placeholder="请输入"></Input>
          </Form-item>
          <Form-item label="角色">
            <Radio-group v-model="formItem.role">
              <Radio style="margin-right: 120px" label="4"><span>理财顾问</span></Radio>
              <Radio style="margin-right: 120px" label="3"><span>渠道机构</span></Radio>
              <Radio style="margin-right: 120px" label="2"><span>城市合伙人</span></Radio>
              <Radio label="1"><span>内部管理</span></Radio>
            </Radio-group>
          </Form-item>
          <Form-item label="属性">
            <Radio-group v-model="formItem.attribute">
              <Radio style="margin-right: 120px" label="2"><span>团队</span></Radio>
              <Radio label="1"><span>个人</span></Radio>
            </Radio-group>
          </Form-item>
          <Form-item label="状态">
            <Radio-group v-model="formItem.is_active">
              <Radio style="margin-right: 120px" label="true"><span>启用</span></Radio>
              <Radio label="false"><span>停用</span></Radio>
            </Radio-group>
          </Form-item>
          <Form-item label="使用身份">
            <Checkbox style="margin-right: 100px" v-model="formItem.is_financial_planner" disabled="">理财顾问</Checkbox>
            <Checkbox v-model="formItem.is_asset_management">资管方</Checkbox>
          </Form-item>
        </Form>
        <div class="investorAdviser">
          <p class="describe">| 理财顾问配置</p>
          <Form :model="formItem" :label-width="180" label-position="left" style="text-align: left; padding: 0 30px;">
            <Form-item label="是否对接所有标准金融产品">
              <Radio-group v-model="formItem.include_universal_finance">
                <Radio style="margin-right: 120px" label="true"><span>是</span></Radio>
                <Radio label="false"><span>否</span></Radio>
              </Radio-group>
            </Form-item>
            <Form-item label="特定金融产品组ID">
              <Input v-model="formItem.finance_group_ids" placeholder="选填"></Input>
            </Form-item>
            <Form-item label="是否对接所有标准房产">
              <Radio-group v-model="formItem.include_universal_estate">
                <Radio style="margin-right: 120px" label="true"><span>是</span></Radio>
                <Radio label="false"><span>否</span></Radio>
              </Radio-group>
            </Form-item>
            <Form-item label="特定房产产品ID">
              <Input v-model="formItem.estate_ids" placeholder="选填"></Input>
            </Form-item>
            <Form-item label="是否开启邮件短信提醒服务">
              <Radio-group v-model="formItem.open_email">
                <Radio style="margin-right: 120px" label="false"><span>否</span></Radio>
                <Radio label="true"><span>是</span></Radio>
              </Radio-group>
            </Form-item>
            <Form-item label="邮件短信模板" v-show="JSON.parse(this.formItem.open_email)">
              <Input v-model="formItem.email_ids" placeholder="选填"></Input>
            </Form-item>
          </Form>
        </div>
      </div>
      <div class="next">
        <Button v-if="fromApply" @click="saveData" type="info">保存</Button>
        <Button v-else="" @click="createData" type="info">保存</Button>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .describe{
    margin-bottom: 10px;
    font-weight: 600;
  }
  #block1{
    padding: 10px 0 20px;
  }
  #block1 .base_info_list_one{
    width: 50%;
    padding: 0 30px;
    display: inline-block
  }
  #block1 .base_info_list_two{
    width: 50%;
    padding: 0 30px;
    display: inline-block;
    float: right
  }
  .next{
    margin-top: 30px;
    padding: 0 60px;
    text-align: right
  }
  .ivu-form-item{
    margin-bottom: 10px;  /*自定义输入框样式*/
  }
</style>
<style>
  textarea.ivu-input{
    font-size: 12px;
  }
  .ivu-input-group-append, .ivu-input-group-prepend{
    background-color: #fff;
  }
  .ivu-input-group-append .ivu-select, .ivu-input-group-prepend .ivu-select{
    /*width: 120px!important;*/
    text-align: left;
  }
  .ivu-checkbox-disabled+span{
    color: #000;
  }
</style>
<script>
  export default{
    data () {
      return {
        formItem: {
          apply_id:'',
          bd_id:'',
          name:'',
          password:'',
          docking_person:'',
          code:'',
          email:'',
          remark:'',
          attribute:'2',
          role: '4',
          is_active:'true',
          is_financial_planner: true,  //理财师
          is_asset_management: false,  //是否资管方
          email_ids:'',
          finance_group_ids:'',
          estate_ids:'',
          include_universal_finance:'true',
          include_universal_estate:'true',
          open_email:'false',   //是否开启邮件
        },
        createdTime:'',
        lastLogin:'',
        lastOperator:'',
        select2:[],       //邮件模板
        countryList:[],
        emailList:[],
        dockingList:[],
        bdList:[],
        fromApply: false,
        num:7,
        value1:'',
        phone:'',
        phone_select: '+86',
      }
    },
    methods:{
      saveData(){
        this.$https.post('/obtain/product/channel/addOrUpChannel', (this.formItem)).then((response) => {
          this.$Message.success(response.data.msg);
        }).catch(function(response) {
          console.log(response)
        });
      },
      //自主替用户创建渠道
      createData(){
        this.formItem.phone = this.phone_select + " " + this.phone;
        this.$https.post('/obtain/product/channel/addOrUpChannel', (this.formItem)
          /*({
            'name': this.formItem.name,
            'code': this.formItem.code,
            'phone': this.formItem.phone,
            'email': this.formItem.email,
            'docking_person': this.formItem.docking_person,
            'remark': this.formItem.remark,
            'is_financial_planner': this.formItem.is_financial_planner,
            'is_asset_management': this.formItem.is_asset_management,
            'is_active': this.formItem.is_active,
            'attribute': this.formItem.attribute,

            'include_universal_estate': this.formItem.include_universal_finance,
            'estate_ids': this.formItem.estate_ids,
            'include_universal_finance': this.formItem.include_universal_finance,
            'finance_group_ids': this.formItem.finance_group_ids,
            'open_email': this.formItem.open_email,
            'email_ids': this.formItem.email_ids,
          })*/
        ).then((response) => {
          this.$Message.success(response.data.msg);
        }).catch(function(response) {
          console.log(response)
        })
      },
      //由申请列表进入时调用
      getApplyDetail(){
        this.$https.get('/product/channel/getChannelApply', {params: {'apply_id': this.formItem.apply_id}}).then((response) => {
          let d = response.data.body;
          this.formItem.name = d.name;
          this.formItem.phone = d.phone;
          this.phone = d.phone;
          this.formItem.email = d.email;
          this.formItem.channel_name = d.name;
          this.formItem.is_asset_management = d.is_asset_management;
          this.formItem.password = d.password;
        }).catch((response) => {
          console.log(response)
        })
      },
      //获取电话编码列表
      getPhoneList(){
        this.$https.get('/big_bend/common/cms_content/info',
          {
            params: {
              'content_key': 'phone_code'
            }
          }
        ).then((response) => {
          this.countryList = JSON.parse(response.data.body.content)
        }).catch((response) => {
          console.log(response)
        })
      },
      //获取BD经理列表
      getBDList(){
        this.$https.get('/big_bend/common/cms_content/info',
          {
            params: {
              'content_key': 'bd'
            }
          }
        ).then((response) => {
          this.bdList = JSON.parse(response.data.body.content)
        }).catch((response) => {
          console.log(response)
        })
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
    created:function () {
       this.getPhoneList();
       this.getBDList();
       this.getChildChannelList();
       let apply_id = this.$route.query.apply_id || '';
       this.formItem.apply_id = apply_id;

       if(apply_id!==''){
           this.getApplyDetail();
         this.fromApply = true;
       }
    },
  }
</script>

