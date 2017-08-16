<template>
  <div id="stepOne">
    <p class="describe">| 主渠道详情</p>
    <div id="block1">
      <div class="base_info">
        <div class="base_info_list_one">
          <Form :model="formItem" :label-width="120" label-position="left" style="text-align: left">
            <Form-item label="识别码">
              <Input v-model="formItem.code" disabled="" placeholder="请输入"></Input>
            </Form-item>
            <Form-item label="电话(用于登录)">
              <Input v-model="formItem.phone" placeholder="请输入"></Input>
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
              <Select v-model="formItem.bd_id">
                <Option v-for="item in bdList" :value="item.id" :key="item">{{ item.name }}</Option>
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
            <Checkbox-group v-model="asset_checked">
              <Checkbox label="理财顾问" style="margin-right: 95px" disabled>理财顾问</Checkbox>
              <Checkbox label="资管方">资管方</Checkbox>
            </Checkbox-group>
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
            <Form-item label="邮件短信模板" v-show="this.formItem.open_email">
              <Input v-model="formItem.email_ids" placeholder="选填"></Input>
            </Form-item>
          </Form>
        </div>
        <div class="certification">
          <p class="describe">| 认证信息</p>
          <Form :label-width="180" label-position="left" style="text-align: left; padding: 0 30px;">
            <Form-item label="认证权限">
              <Radio-group v-model="formItem.is_legalize">
                <Radio style="margin-right: 120px" label="true"><span>开</span></Radio>
                <Radio label="false"><span>关</span></Radio>
              </Radio-group>
            </Form-item>
          </Form>
        </div>
        <div class="history">
          <p class="describe">| 操作记录</p>
          <Form :model="formItem" :label-width="180" label-position="left" style="text-align: left; padding: 0 30px;">
            <Form-item label="用户创建时间">
              {{createdTime}}
            </Form-item>
            <Form-item label="上次登录时间">
              {{lastLogin}}
            </Form-item>
            <Form-item label="上次操作人">
              {{lastOperator}}
            </Form-item>
          </Form>
        </div>
      </div>
      <div class="next">
        <Button @click="saveData" type="info">保存</Button>
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
  #block1 .investor_type{
    margin-top: 10px
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
          id:'',
          bd_id:'',
          name:'',
          phone:'',
          docking_person:'',
          code:'',
          email:'',
          remark:'',
          attribute:'',
          is_active:'',
          email_ids:'',
          finance_group_ids:'',
          estate_ids:'',
          role: '',
          is_legalize:'false',
          is_financial_planner:true,
          include_universal_finance:'',
          include_universal_estate:'',
          open_email:'false',   //是否开启邮件
        },
        single: 'false',
        asset_checked:['理财顾问'],//默认理财顾问勾选
        value1:'',
        select1: '+86 ',
        select2:[],       //邮件模板
        countryList:[],
        emailList:[],
        bdList:[],
        dockingList:[],
        statusList:[
            {value: '0', name: '待完善'},
            {value: '1', name: '审核中'},
            {value: '2', name: '认证成功'},
            {value: '3', name: '认证失败'}
        ],
        createdTime:'',
        lastLogin:'',
        lastOperator:'',
      }
    },
    methods:{
      //更新渠道详情
      saveData(){
        if(this.asset_checked.length>1){
            this.formItem.is_asset_management = true;
        }else{
          this.formItem.is_asset_management = false;
        }
        this.$https.post('/obtain/product/channel/addOrUpChannel', this.formItem).then((response) => {
          this.$Message.success(response.data.msg);
        }).catch(function(response) {
          console.log(response)
        });
      },
      //查询主渠道详情
      getChannelDetail(id){
        this.$https.get('/product/channel/getChannelDetail',
          {
            params: {
              channel_id: id,
            },
          }
        ).then((response) => {
          let d = response.data.body;
          this.formItem.id = d.id;
          if(d.bd_id){
            this.formItem.bd_id = JSON.stringify(d.bd_id);
          }
          this.formItem.name = d.name;
          this.formItem.phone = d.phone;
          this.formItem.docking_person = d.docking_person;
          this.formItem.code = d.code;
          this.formItem.email = d.email;
          this.formItem.remark = d.remark;
          //状态
          if(d.is_active){
            this.formItem.is_active = 'true'
          }else{
            this.formItem.is_active = 'false'
          }
          //是否开放邮件
          if(d.open_email){
            this.formItem.open_email = 'true'
          }else{
            this.formItem.open_email = 'false'
          }
          //房产
          if(d.include_universal_estate){
            this.formItem.include_universal_estate = 'true'
          }else{
            this.formItem.include_universal_estate = 'false'
          }
          //金融
          if(d.include_universal_finance){
            this.formItem.include_universal_finance = 'true'
          }else{
            this.formItem.include_universal_finance = 'false'
          }
          this.formItem.email_ids = d.email_ids;
          this.formItem.attribute = d.attribute;
          this.formItem.estate_ids = d.estate_ids;
          this.formItem.finance_group_ids = d.finance_group_ids;
          this.formItem.is_legalize = JSON.stringify(d.is_legalize);
          this.formItem.role = d.role;

          this.createdTime = d.create_at;
          this.lastLogin = d.last_login_time;
          this.lastOperator = d.last_operator;
          if(d.is_asset_management){
            this.asset_checked.push('资管方')
          }
          this.getChannelLegalize(d.advisor_id);
        }).catch(function(response) {
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
      //产品详情
      const id = this.$route.query.channel_id;
      this.getBDList(id);
      this.getChildChannelList();
      this.getChannelDetail(id);

    }
  }
</script>

