<template>
  <div id="orderDetail">
    <p class="describe">| 订单详情 &nbsp;&nbsp;&nbsp;订单编号: <span v-html="orderNumber"></span>&nbsp;&nbsp;&nbsp; 投资时间: <span v-html="createAt"></span> </p>
    <div style="text-align: right; padding-right: 30px;">
      <template>
        <Dropdown @on-click="moreBtn" style="margin-left: 20px" placement="bottom-end">
          <a href="javascript:void(0)">
            更多操作
            <Icon type="arrow-down-b"></Icon>
          </a>
          <Dropdown-menu slot="list">
            <Dropdown-item name="重置">重置为未付款</Dropdown-item>
            <Dropdown-item name="移动">移动到其他产品</Dropdown-item>
            <Dropdown-item name="取消">强制取消订单</Dropdown-item>
          </Dropdown-menu>
        </Dropdown>
      </template>
      <template>
        <Modal v-model="modal1" width="360">
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>重置确认</span>
          </p>
          <div style="text-align:center">
            <p>点击确认会将订单重置为未付款订单。</p>
            <p>是否确认重置订单？</p>
          </div>
          <div slot="footer">
            <Button type="primary" size="small" long :loading="modal_loading" @click="confirmResetBtn">确定</Button>
          </div>
        </Modal>
        <Modal v-model="modal2" width="360">
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>移动确认</span>
          </p>
          <div style="text-align:center">
            <Input v-model="value" placeholder="请输入移动至的产品ID" style="width: 230px; margin-bottom: 5px"></Input>
            <p>点击确认会将订单移动至其他产品类。</p>
            <p>是否确认移动订单？</p>
          </div>
          <div slot="footer">
            <Button type="primary" size="small" long :loading="modal_loading" @click="confirmRemoveBtn">确定</Button>
          </div>
        </Modal>
        <Modal v-model="modal3" width="360">
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>取消确认</span>
          </p>
          <div style="text-align:center">
            <p>点击确认会将订单取消。</p>
            <p>是否确认取消订单？</p>
          </div>
          <div slot="footer">
            <Button type="primary" size="small" long :loading="modal_loading" @click="confirmCancelBtn">确定</Button>
          </div>
        </Modal>
      </template>
    </div>
    <Tabs value="订单信息" type="card" :animated="false">
      <Tab-pane label="订单信息" name="订单信息">
        <div id="block1">
          <div class="base_info">
            <p class="title">| 基本信息</p>
            <div class="base_info_list_one">
              <Form :model="formItem1" :label-width="100" label-position="left" style="text-align: left">
                <Form-item label="产品ID">
                  <Input v-model="formItem1.product_id" disabled placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="用户名">
                  <Input v-model="formItem1.user_name" disabled placeholder="请输入"></Input>
                </Form-item>
              </Form>
            </div>
            <div class="base_info_list_two">
              <Form :model="formItem2" :label-width="100" label-position="left" style="text-align: left">
                <Form-item label="产品编号">
                  <Input v-model="formItem2.product_number" disabled placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="投资顾问">
                  <Input v-model="formItem2.invest_consultant"disabled placeholder="请输入"></Input>
                </Form-item>
              </Form>
            </div>
            <div class="base_info_list_three">
              <Form :model="formItem3" :label-width="110" label-position="left" style="text-align: left">
                <Form-item label="产品名称">
                  <Input v-model="formItem3.product_name" disabled placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="渠道">
                  <Input v-model="formItem3.source" disabled placeholder="请输入"></Input>
                </Form-item>
              </Form>
            </div>
          </div>    <!--基本信息-->
          <div class="base_info">
            <p class="title">| 收益情况</p>
            <div class="base_info_list_one">
              <Form :model="formItem1" :label-width="100" label-position="left" style="text-align: left">
                <Form-item label="投资金额">
                  <Input v-model="formItem1.invest_amount" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="投资收益">
                  <Input v-model="formItem1.invest_income" disabled placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="已提现金额">
                  <Input v-model="formItem1.mentioned_amount" disabled placeholder="请输入"></Input>
                </Form-item>
              </Form>
            </div>
            <div class="base_info_list_two">
              <Form :model="formItem2" :label-width="100" label-position="left" style="text-align: left">
                <Form-item label="入金金额">
                  <Input v-model="formItem2.received_amount" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="累积收益">
                  <Input v-model="formItem2.all_income" disabled placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="可提现金额">
                  <Input v-model="formItem2.withdraw_able_amount" disabled placeholder="请输入"></Input>
                </Form-item>
              </Form>
            </div>
            <div class="base_info_list_three">
              <Form :model="formItem3" :label-width="110" label-position="left" style="text-align: left">
                <Form-item label="体验金">
                  <Input v-model="formItem3.promotion" disabled placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="体验收益">
                  <Input v-model="formItem3.promotion_income" disabled placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="提现中金额">
                  <Input v-model="formItem3.withdraw_amount" disabled placeholder="请输入"></Input>
                </Form-item>
              </Form>
            </div>
          </div>    <!--收益信息-->
          <div class="base_info">
            <p class="title">| 支付信息</p>
            <Form :model="formItem" :label-width="100" label-position="left" style="text-align: left; padding-left: 30px; padding-right: 30px">
              <Form-item label="支付方式">
                <Input v-model="formItem.payment_method" disabled  placeholder="请输入"></Input>
              </Form-item>
            </Form>
            <div style="padding: 0 30px 0 50px" v-if="formItem.payment_method==='ach'">
              <a @click="createACH" style="float: right;" href="javascript:;">点击生成ACH File</a>
              <table border="1" cellspacing="0" cellpadding="0">
                <thead>
                <tr>
                  <th>生成时间</th>
                  <th>交易金额</th>
                  <th>类型</th>
                  <th>连接(点击下载)</th>
                  <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="i in formItem.payData">
                  <td>{{i.created_at}}</td>
                  <td>{{i.invest_amount}}</td>
                  <td>{{i.type|ach_document}}</td>
                  <td><a :href="i.url" download="ACH文件">{{i.url}}</a></td>
                  <td><a @click="delACH(i.id)" href="javascript:(0)">删除</a></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>    <!--支付信息-->
          <div class="base_info" v-if="incomeIndex">
            <p class="title">| 收益记录</p>
            <div style="padding: 10px 400px 0 50px">
              <table border="1" cellspacing="0" cellpadding="0">
                <thead>
                <tr>
                  <th>时间</th>
                  <th>体验金收益</th>
                  <th>投资收益</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="i in formItem.receivedData">
                  <td>{{i.interest_day}}</td>
                  <td>{{i.bonus_earnings}}</td>
                  <td>{{i.capital_earnings}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>    <!--收益记录-->
          <div class="base_info" v-if="settleIndex">
            <p class="title">| 提现记录</p>
            <div style="padding: 10px 400px 0 50px">
              <table border="1" cellspacing="0" cellpadding="0">
                <thead>
                <tr>
                  <th>时间</th>
                  <th>提现金额</th>
                  <th>处理状态</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="i in formItem.withdrawalData">
                  <td>{{i.updated_at}}</td>
                  <td>{{i.withdraw_amount}}</td>
                  <td>{{i.status|redeemType}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>    <!--提现记录-->
          <div class="base_info">
            <p class="title">| 备注</p>
            <Form :model="formItem" :label-width="100" label-position="left" style="text-align: left; padding-left: 30px; padding-right: 30px">
              <Form-item label="备注信息">
                <Input v-model="formItem.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入"></Input>
              </Form-item>
            </Form>
            <Form v-show="formItem.audit_remark" :model="formItem" :label-width="100" style="text-align: left; padding-left: 30px; padding-right: 30px">
              <Form-item label="审核失败原因">
                <Input v-model="formItem.audit_remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入"></Input>
              </Form-item>
            </Form>
          </div>    <!--备注信息-->
          <div class="base_info" v-if="startInterest==='start_interest'">
            <p class="title">| 强制提息结算订单</p>
            <p style="padding: 10px 0 0 30px">
              <a @click="modal7=true" href="JavaScript:;">提息本订单</a><br>
              <a @click="modal8=true" href="JavaScript:;">结算本订单</a>
            </p>
          </div>  <!--提息结算-->
          <div class="next">
            <Button @click="saveData" type="info">保存</Button>
          </div>
        </div>
      </Tab-pane>
      <Tab-pane label="投资信息" name="投资信息">
        <div id="block2">
          <div class="base_info">
            <p class="title">| 基本信息</p>
            <div class="base_info_list_one">
              <Form :model="formItem1" :label-width="100" label-position="left" style="text-align: left">
                <Form-item label="姓氏">
                  <Input v-model="formItem1.last_name" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="电话">
                  <Input v-model="formItem1.phone" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="出生日期">
                  <Input v-model="formItem1.date_of_birth" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="资金来源">
                  <Input v-model="formItem1.source_of_capital" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="纳税国">
                  <Input v-model="formItem1.country_of_tax_residency" placeholder="请输入"></Input>
                </Form-item>
              </Form>
            </div>
            <div class="base_info_list_two">
              <Form :model="formItem2" :label-width="100" label-position="left" style="text-align: left">
                <Form-item label="用户ID">
                  <Input v-model="formItem2.user_id" disabled placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="国籍">
                  <Input v-model="formItem2.nationality" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="SSN">
                  <Input v-model="formItem2.SSN" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="职业">
                  <Input v-model="formItem2.occupation" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="注册时间">
                  <Input v-model="formItem2.create_at" disabled placeholder="请输入"></Input>
                </Form-item>
              </Form>
            </div>
            <div class="base_info_list_three">
              <Form :model="formItem3" :label-width="110" label-position="left" style="text-align: left">
                <Form-item label="名">
                  <Input v-model="formItem3.first_name" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="邮箱">
                  <Input v-model="formItem3.email" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="出生国家">
                  <Input v-model="formItem3.country_of_birth" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="职能">
                  <Input v-model="formItem3.industry" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="纳税号">
                  <Input v-model="formItem3.foreign_tax_number" placeholder="请输入"></Input>
                </Form-item>
              </Form>
            </div>
          </div>   <!--基本信息-->
          <div class="base_info">
            <p class="title">| 投资人类型</p>
            <Form :model="formItem" :label-width="100" label-position="left" style="text-align: left; padding-left: 30px; padding-right: 30px">
              <Form-item label="投资人类型">
                {{formItem.investor_type | investorType}}
              </Form-item>
            </Form>
          </div>   <!--投资人类型-->
          <div class="base_info">
            <p class="title">| 地址信息</p>
            <Form :model="formItem" :label-width="100" label-position="left" style="text-align: left; padding-left: 30px; padding-right: 30px;">
              <Form-item label="地址类型">
                {{formItem.address_type |addressType}}
              </Form-item>
            </Form>
            <div class="base_info" v-if="formItem.address_type==='NON_CN'">
              <div class="base_info_list_one">
                <Form :model="formItem1" :label-width="100" label-position="left" style="text-align: left">
                  <Form-item label="国家/地区">
                    <Input v-model="formItem1.country" placeholder="请输入"></Input>
                  </Form-item>
                </Form>
              </div>
              <div class="base_info_list_two">
                <Form :model="formItem2" :label-width="100" label-position="left" style="text-align: left">
                  <Form-item label="州">
                    <Input v-model="formItem2.region" placeholder="请输入"></Input>
                  </Form-item>
                </Form>
              </div>
              <div class="base_info_list_three">
                <Form :model="formItem3" :label-width="110" label-position="left" style="text-align: left">
                  <Form-item label="市">
                    <Input v-model="formItem3.city" placeholder="请输入"></Input>
                  </Form-item>
                </Form>
              </div>
              <Form :model="formItem" :label-width="100" label-position="left" style="text-align: left; padding-left: 30px; padding-right: 30px">
                <Form-item label="地址第一行">
                  <Input v-model="formItem.line1" placeholder="请输入"></Input>
                </Form-item>
              </Form>
              <Form :model="formItem" :label-width="100" label-position="left" style="text-align: left; padding-left: 30px; padding-right: 30px">
                <Form-item label="地址第二行">
                  <Input v-model="formItem.line2" placeholder="请输入"></Input>
                </Form-item>
              </Form>
            </div>         <!--美国地址-->
            <div class="base_info" v-if="">
              <div class="base_info_list_one">
                <Form :model="formItem1" :label-width="100" label-position="left" style="text-align: left">
                  <Form-item label="省/直辖市">
                    <Input v-model="formItem1.chinese_region" placeholder="请输入"></Input>
                  </Form-item>
                </Form>
              </div>
              <div class="base_info_list_two">
                <Form :model="formItem2" :label-width="100" label-position="left" style="text-align: left">
                  <Form-item label="区/县">
                    <Input v-model="formItem2.chinese_district" placeholder="请输入"></Input>
                  </Form-item>
                </Form>
              </div>
              <div class="base_info_list_three">
                <Form :model="formItem3" :label-width="110" label-position="left" style="text-align: left">
                  <Form-item label="市/州/地区">
                    <Input v-model="formItem3.chinese_city" placeholder="请输入"></Input>
                  </Form-item>
                </Form>
              </div>
              <Form :model="formItem" :label-width="100" label-position="left" style="text-align: left; padding-left: 30px; padding-right: 30px">
                <Form-item label="详细地址">
                  <Input v-model="formItem.chinese_detail" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入"></Input>
                </Form-item>
              </Form>
              <Form :model="formItem" :label-width="100" label-position="left" style="text-align: left; padding-left: 30px; padding-right: 30px">
                <Form-item label="邮编">
                  <Input v-model="formItem.postal_code" placeholder="请输入"></Input>
                </Form-item>
              </Form>
            </div>           <!--大陆地址-->
          </div>   <!--地址信息-->
          <div class="base_info">
            <p class="title">| 银行信息</p>
            <Form :model="formItem" :label-width="100" label-position="left" style="text-align: left; padding-left: 30px; padding-right: 30px">
              <Form-item label="银行类型">
                {{formItem.bank_type |bankType}}
              </Form-item>
            </Form>
            <div class="base_info" v-if="formItem.bank_type==='US'">
              <div class="base_info_list_one">
                <Form :model="formItem1" :label-width="100" label-position="left" style="text-align: left">
                  <Form-item label="银行名称">
                    <Input v-model="formItem1.bank_name" placeholder="请输入"></Input>
                  </Form-item>
                  <Form-item label="账户号">
                    <Input v-model="formItem1.account_number" placeholder="请输入"></Input>
                  </Form-item>
                </Form>
              </div>
              <div class="base_info_list_two">
                <Form :model="formItem2" :label-width="120" label-position="left" style="text-align: left">
                  <Form-item label="Swift Code">
                    <Input v-model="formItem2.swift_code" placeholder="请输入"></Input>
                  </Form-item>
                  <Form-item label="ABA/rout #(Wire)">
                    <Input v-model="formItem2.wire_rout_number" placeholder="请输入"></Input>
                  </Form-item>
                </Form>
              </div>
              <div class="base_info_list_three">
                <Form :model="formItem3" :label-width="120" label-position="left" style="text-align: left">
                  <Form-item label="账户类型">
                    <Input v-model="formItem3.account_type" placeholder="请输入"></Input>
                  </Form-item>
                  <Form-item label="ABA/rout #(ACH)">
                    <Input v-model="formItem3.ach_rout_number" placeholder="请输入"></Input>
                  </Form-item>
                </Form>
              </div>
              <Form :model="formItem" :label-width="100" label-position="left" style="text-align: left; padding-left: 30px; padding-right: 30px">
                <Form-item label="银行地址">
                  <Input v-model="formItem.bank_address" placeholder="请输入"></Input>
                </Form-item>
              </Form>
            </div>       <!--美国银行-->
            <div class="base_info" v-else="">
              <div class="base_info_list_one">
                <Form :model="formItem1" :label-width="100" label-position="left" style="text-align: left">
                  <Form-item label="银行名称">
                    <Input v-model="formItem1.chinese_bank_name" placeholder="请输入"></Input>
                  </Form-item>
                </Form>
              </div>
              <div class="base_info_list_two">
                <Form :model="formItem2" :label-width="100" label-position="left" style="text-align: left">
                  <Form-item label="Swift Code">
                    <Input v-model="formItem2.chinese_swift_code" placeholder="请输入"></Input>
                  </Form-item>
                </Form>
              </div>
              <div class="base_info_list_three">
                <Form :model="formItem3" :label-width="110" label-position="left" style="text-align: left">
                  <Form-item label="账户号">
                    <Input v-model="formItem3.chinese_account_number" placeholder="请输入"></Input>
                  </Form-item>
                </Form>
              </div>
              <Form :model="formItem" :label-width="100" label-position="left" style="text-align: left; padding-left: 30px; padding-right: 30px">
                <Form-item label="银行地址">
                  <Input v-model="formItem.chinese_bank_address" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入"></Input>
                </Form-item>
              </Form>
              <div v-show="isMiddleBank" class="base_info_list_one">
                <Form :model="formItem1" :label-width="100" label-position="left" style="text-align: left">
                  <Form-item label="中间行名称">
                    <Input v-model="formItem1.intermediary_bank_name" placeholder="请输入"></Input>
                  </Form-item>
                </Form>
              </div>
              <div v-show="isMiddleBank" class="base_info_list_two">
                <Form :model="formItem2" :label-width="130" label-position="left" style="text-align: left">
                  <Form-item label="中间行 Swift Code">
                    <Input v-model="formItem2.intermediary_bank_swift_code" placeholder="请输入"></Input>
                  </Form-item>
                </Form>
              </div>
              <Form v-show="isMiddleBank" :model="formItem" :label-width="100" label-position="left" style="text-align: left; padding-left: 30px; padding-right: 30px">
                <Form-item label="中间行地址">
                  <Input v-model="formItem.intermediary_bank_address" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入"></Input>
                </Form-item>
              </Form>
            </div>       <!--非美银行-->
          </div>   <!--银行信息-->
          <div class="base_info">
            <p class="title">| 签名</p>
            <Form :model="formItem" :label-width="100" label-position="left" style="text-align: left; padding-left: 30px; padding-right: 30px">
              <Form-item label="签名">
                <Input v-model="formItem.signature" placeholder="请输入"></Input>
              </Form-item>
            </Form>
          </div>   <!--签名-->
          <div class="base_info" v-if="formItem.accreditation">
            <p class="title">| 合规审查</p>
            <Form :model="formItem" :label-width="100" label-position="left" style="text-align: left; padding-left: 30px; padding-right: 30px">
              <Form-item label="审查方式">
                <Select v-model="formItem.accreditation" placeholder="请选择">
                  <Option v-for="i in accreditationArr" :value="i.value" :key="i">{{i.name}}</Option>
                </Select>
              </Form-item>
            </Form>
            <div class="base_info_list_one">
              <Form :model="formItem1" :label-width="100" label-position="left" style="text-align: left">
                <Form-item label="配偶姓">
                  <Input v-model="formItem1.spouse_last_name" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="配偶电话">
                  <Input v-model="formItem1.spouse_phone" placeholder="请输入"></Input>
                </Form-item>
              </Form>
            </div>
            <div class="base_info_list_two">
              <Form :model="formItem2" :label-width="100" label-position="left" style="text-align: left">
                <Form-item label="配偶名">
                  <Input v-model="formItem2.spouse_first_name" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="配偶邮箱">
                  <Input v-model="formItem2.spouse_email" placeholder="请输入"></Input>
                </Form-item>
              </Form>
            </div>
            <Form :model="formItem" :label-width="100" label-position="left" style="text-align: left; padding-left: 30px; padding-right: 30px">
              <Form-item label="配偶签名">
                <Input v-model="formItem.spouse_signature" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入"></Input>
              </Form-item>
            </Form>
          </div>   <!--合规审查-->
          <div class="next">
            <Button @click="saveData" type="info">保存</Button>
          </div>
        </div>
      </Tab-pane>
      <Tab-pane label="下载文件" name="下载文件">
        <div id="block3">
          <div class="base_info" >
            <p class="title">| 证件材料</p>
            <div style="padding: 10px 30px">
              <table border="1" cellspacing="0" cellpadding="0">
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
                  <td>{{i.file_expire_date}}</td>
                  <td>{{i.file_number}}</td>
                  <td><a v-bind:href="i.file_url" target="_blank">{{i.file_url}}</a></td>
                  <td><a @click="downloadPhoto(i.id)">下载</a></td>
                  <td><a @click="updatePhoto(i.file_expire_date,i.file_number,i.file_type),modal9=true" href="javascript:(0)">更新</a></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>  <!--证件材料-->
          <div class="base_info" >
            <p class="title">| 投资文件</p>
            <div style="padding: 10px 30px">
              <a style="float: right; text-decoration: none; margin-top: -15px" @click="modal5=true">添加文件</a>
              <table border="1" cellspacing="0" cellpadding="0">
                <thead>
                <tr>
                  <th>文件名称</th>
                  <!--<th>文件类型</th>-->
                  <th>链接</th>
                  <th>重新生成</th>
                  <th>下载</th>
                  <th>更新</th>
                  <th>删除</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="d in items">
                  <td>{{d.document_name}}</td>
                  <!--<td>{{d.document_type}}</td>-->
                  <td><a v-bind:href="d.document_url" target="_blank">{{d.document_url}}</a></td>
                  <td><a @click="regenerateDocument(d.id)" href="javascript:;">重新生成</a></td>
                  <td><a @click="downloadDocument(d.id)">下载</a></td>
                  <td><a @click="updateDocument(d.id,d.document_type,modal4 = true)" href="javascript:;">更新</a></td>
                  <td><a @click="deleteDocument(d.id)" href="javascript:;">删除</a></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>  <!--投资文件-->
          <Modal v-model="modal4" width="460">
            <p slot="header" style="color:#f60;text-align:center">
              <span>更新投资文档</span>
            </p>
            <div style="text-align:center">
              <Form :model="formItem" :label-width="60" label-position="left" style="text-align: left; padding: 0 30px">
                <Form-item label="文档名称">
                  <Input v-model="formItem.document_name" placeholder="请输入文档名称"></Input>
                </Form-item>
                <Form-item label="文档类型">
                  <Input v-model="formItem.document_type" disabled></Input>
                </Form-item>
              </Form>
              <Upload :on-success="handleSuccess" :action="this.uploadHost">
                <Button type="primary" icon="ios-cloud-upload-outline">选择文件</Button>
              </Upload>
            </div>
            <div slot="footer">
              <Button type="primary" size="small" long :loading="modal_loading" @click="updateDocumentBtn">确定</Button>
            </div>
          </Modal>
          <Modal v-model="modal5" width="460">
            <p slot="header" style="color:#f60;text-align:center">
              <span>添加投资文档</span>
            </p>
            <div style="text-align:center">
              <Form :model="formItem" :label-width="60" label-position="left" style="text-align: left; padding: 0 30px">
                <Form-item label="文档名称">
                  <Input v-model="formItem.add_document_name" placeholder="请输入文档名称"></Input>
                </Form-item>
                <Form-item label="文档类型">
                  <Select v-model="formItem.add_document_type">
                    <Option v-for="item in documentType" :value="item.value" :key="item">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Form>
              <Upload :on-success="handleSuccess" :action="this.uploadHost">
                <Button type="primary" icon="ios-cloud-upload-outline">选择文件</Button>
              </Upload>
            </div>
            <div slot="footer">
              <Button type="primary" size="small" long :loading="modal_loading" @click="addDocumentBtn">确定</Button>
            </div>
          </Modal>
          <Modal v-model="modal6" width="460">
            <p slot="header" style="color:#f60;text-align:center">
              <Icon type="information-circled"></Icon>
              <span>打包下载确认</span>
            </p>
            <div style="text-align:center">
              <p>点击确认会将订单中包含的用户证件及投资文件全部下载。</p>
              <p>是否确认下载？</p>
            </div>
            <div slot="footer">
              <Button type="primary" size="small" long :loading="modal_loading" @click="confirmBtn">确定</Button>
            </div>
          </Modal>
          <div class="base_info" >
            <p class="title">| 打包下载以上证件和文件</p>
            <p style="padding: 10px 0 0 30px">
              <a @click="modal6=true" href="JavaScript:;">打包下载</a>
            </p>
          </div>  <!--打包下载-->
          <Modal v-model="modal7" width="460">
            <p slot="header" style="color:#f60;text-align:center">
              <span>强制提息</span>
            </p>
            <div style="text-align:center">
              <Form :model="formItem" :label-width="60" label-position="left" style="text-align: left; padding: 0 30px">
                <Form-item label="可提息">
                  <Input v-model="formItem.force_withdraw_able_amount" disabled=""></Input>
                </Form-item>
                <Form-item label="本次提息">
                  <Input v-model="formItem.force_withdraw_amount" placeholder="请输入提息金额"></Input>
                </Form-item>
              </Form>
            </div>
            <div slot="footer">
              <Button type="primary" size="small" long :loading="modal_loading" @click="pending">确定</Button>
            </div>
          </Modal>
          <Modal v-model="modal8" width="460">
            <p slot="header" style="color:#f60;text-align:center">
              <span>强制结算</span>
            </p>
            <div style="text-align:center">
              <Form :model="formItem" :label-width="60" label-position="left" style="text-align: left; padding: 0 30px">
                <Form-item label="结算金额">
                  <Input v-model="formItem.settlement_amount" disabled=""></Input>
                </Form-item>
                <Form-item label="实际结算">
                  <Input v-model="formItem.final_settlement_amount" placeholder='请输入结算金额'></Input>
                </Form-item>
              </Form>
            </div>
            <div slot="footer">
              <Button type="primary" size="small" long :loading="modal_loading" @click="settlement">确定</Button>
            </div>
          </Modal>
          <Modal v-model="modal9" width="460">
            <p slot="header" style="color:#f60;text-align:center">
              <span>更新照片</span>
            </p>
            <div style="text-align:center">
              <Form :model="formItem" :label-width="60" label-position="left" style="text-align: left; padding: 0 30px">
                <Form-item label="证件类型">
                  <Input v-model="formItem.file_type" disabled=""></Input>
                </Form-item>
                <Form-item label="有效期至">
                  <Input v-model="formItem.file_expire_date"></Input>
                </Form-item>
                <Form-item label="证件号码">
                  <Input v-model="formItem.file_number" placeholder='请输入证件号码'></Input>
                </Form-item>
              </Form>
              <Upload :on-success="handleSuccess" :action="this.uploadHost">
                <Button type="primary" icon="ios-cloud-upload-outline">选择图片</Button>
              </Upload>
            </div>
            <div slot="footer">
              <Button type="primary" size="small" long :loading="modal_loading" @click="updatePhotoBtn">确定</Button>
            </div>
          </Modal>
          <div class="next">
            <Button @click="saveData" type="info">保存</Button>
          </div>
        </div>
      </Tab-pane>
    </Tabs>
  </div>
</template>
<style scoped>
  .title{
    padding-left: 10px;
    font-size: 14px;
    margin-bottom: 1px;
  }
  .describe{
    margin-bottom: 10px;
  }
  #block1{
    padding: 20px 0 20px;
  }
  #block1 .base_info{
    margin-bottom: 10px;
  }
  #block1 .base_info_list_one{
    width: 33%;
    padding: 0 30px;
    display: inline-block
  }
  #block1 .base_info_list_two{
    width: 33%;
    padding: 0 30px;
    display: inline-block;
    float: right
  }
  #block1 .base_info_list_three{
    width: 33%;
    padding: 0 30px;
    display: inline-block;
    float: right
  }
  #block2{
    padding: 20px 0 20px;
  }
  #block2 .base_info{
    margin-bottom: 10px;
  }
  #block2 .base_info_list_one{
    width: 33%;
    padding: 0 30px;
    display: inline-block
  }
  #block2 .base_info_list_two{
    width: 33%;
    padding: 0 30px;
    display: inline-block;
    float: right
  }
  #block2 .base_info_list_three{
    width: 33%;
    padding: 0 30px;
    display: inline-block;
    float: right
  }
  #block3{
    padding: 20px 0 20px;
  }
  #block3 .base_info{
    margin-bottom: 10px;
  }
  #block3 .base_info_list_one{
    width: 33%;
    padding: 0 30px;
    display: inline-block
  }
  #block3 .base_info_list_two{
    width: 33%;
    padding: 0 30px;
    display: inline-block;
    float: right
  }
  #block3 .base_info_list_three{
    width: 33%;
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
  .ivu-input[disabled], fieldset[disabled] .ivu-input{
    background-color: #fff;
    color: #000;
  }
  textarea.ivu-input{
    font-size: 12px;
  }
</style>
<script>
  export default{
    data () {
      return {
        formItem1: {
          product_id:'',  //block1
          user_name:'',
          invest_amount:'',
          invest_income:'',
          mentioned_amount:'',
          last_name:'',   //2
          phone:'',
          date_of_birth:'',
          source_of_capital:'',
          country_of_tax_residency:'',
          country:'',
          chinese_region:'',
          spouse_last_name:'',
          spouse_phone:'',
          bank_name:'',
          account_number:'',
          chinese_bank_name:'',
          intermediary_bank_name:'',
        },
        formItem2: {
          product_number:'', //1
          invest_consultant:'',
          received_amount:'',
          all_income:'',
          withdraw_able_amount:'',
          user_id:'',  //2
          nationality:'',
          SSN:'',
          occupation:'',
          create_at:'',
          region:'',
          chinese_district:'',
          spouse_first_name:'',
          spouse_email:'',
          swift_code:'',
          wire_rout_number:'',
          chinese_swift_code:'',
          intermediary_bank_swift_code:'',
        },
        formItem3: {
          product_name:'',  //1
          source:'',
          promotion:'',
          promotion_income:'',
          withdraw_amount:'',
          first_name:'',  //2
          email:'',
          country_of_birth:'',
          industry:'',
          foreign_tax_number:'',
          city:'',
          chinese_city:'',
          account_type:'',
          ach_rout_number:'',
          chinese_account_number:'',
        },
        formItem: {
          payment_method:'',
          remark:'',
          audit_remark:'',
          investor_type:'',
          address_type:'',
          bank_type:'',
          line1:'',
          line2:'',
          chinese_detail:'',
          postal_code:'',
          bank_type_show:'',
          signature:'',
          accreditation:'',
          spouse_signature:'',
          bank_address:'',
          chinese_bank_address:'',
          intermediary_bank_address:'',
          country:'中国',           //大陆地址时默认国家
          document_name:'',
          add_document_name:'',
          document_type:'',
          add_document_type:'',
          force_withdraw_able_amount:'',
          force_withdraw_amount:'',
          settlement_amount:'',
          final_settlement_amount:'',

          file_type:'',
          file_expire_date:'',
          file_number:'',

          payData:[],
          receivedData:[],        //收益记录
          withdrawalData:[],      //提现记录
        },
        social:[],              //投资人类型
        modal1:false,
        modal2:false,
        modal3:false,
        modal4:false,           //更新文件
        modal5:false,           //添加文件
        modal6:false,           //添加文件
        modal7:false,           //强制提息
        modal8:false,           //强制提现
        modal9:false,           //更新证件材料
        documentType:[
          {value:'W8',label:'W8'},
          {value:'W9',label:'W9'},
          {value:'SUB_DOC',label:'SUB_DOC'},
          {value:'PB',label:'PB'},
          {value:'OA',label:'OA'},
          {value:'LP',label:'LP'},
          {value:'PPM',label:'PPM'},
          {value:'HCG_AML',label:'HCG_AML'},
          {value:'DUE_DILIGENCE',label:'DUE_DILIGENCE'},
          {value:'FATCA',label:'FATCA'},
          {value:'K1',label:'K1'},
          {value:'TC_A',label:'TC_A'},
          {value:'TC_P',label:'TC_P'},
          {value:'OTHER',label:'OTHER'},
        ],
        value:'',               //移动的产品ID
        modal_loading:false,    //点击时样式
        accreditationArr:[
          {name:'INCOME', value:'INCOME'},
          {name:'NET_WORTH', value:'NET_WORTH'}
        ], //合规审查
        accreditation:'',
        countryData:[],         //国家列表
        items:[],   //文件
        cards:[],   //证件
        id:'',      //更新文件时id
        file_id:'',
        user_id:'',     //更新文件时id
        url:'',         //更新文件时url
        add_url:'',     //添加文件时url
        file_expire_date: '',
        file_number:'',
        is_valid:'',
        expireDate: false,
        expireNumber: false,
        isMiddleBank:'',
        have_middle_bank: 0,
        investor_type: '',
        incomeIndex:'',   //判断是否有收益记录
        settleIndex:'',   //判断是否有结算记录
        startInterest: '',  //投资中订单有强制提息结算
        orderNumber:'',
        createAt:'',
      }
    },
    methods:{
      //更多
      moreBtn(name){
        if(name==='重置'){
          this.modal1=true;
        }
        if(name==='取消'){
          this.modal3=true;
        }
        if(name==='移动'){
          this.modal2=true;
        }
      },
      //重置
      confirmResetBtn(){
        const id = this.$route.query.id;
        this.$https.post('/big_bend/backstage/order/update_status',
          ({
            order_id: id,
            order_status: "not_received",
          })
        ).then((response) => {
          this.modal1=false;
          this.$Message.info("订单重置成功");
        }).catch(function(response) {
          console.log(response)
        });
      },
      //移动
      confirmRemoveBtn(){
        const id = this.$route.query.id;
        this.$https.post('/big_bend/backstage/order/change_finance',
          ({
            order_id: id,
            finance_id: this.value,
          })
        ).then((response) => {
          this.modal2=false;
          this.$Message.success(response.data.msg);
        }).catch(function(response) {
          console.log(response)
        });
      },
      //取消
      confirmCancelBtn(){
        const id = this.$route.query.id;
        this.$https.post('/big_bend/backstage/order/update_status',
          ({
            order_id: id,
            order_status: "voided",
          })
        ).then((response) => {
          this.modal3 = false;
          this.$Message.success("订单取消成功");
        }).catch(function(response) {
          console.log(response)
        });
      },
      //生成ACH
      createACH(){
        if(confirm("确认生成ACH文件")){
          this.$https.get('/big_bend/backstage/order/generate_ach_file',
            {
                params:{"order_id": this.order_id}
            }
          ).then((response) => {
            this.$Message.info(response.data.msg);
            this.getOrderDetail();
          }).catch(function(response) {
            console.log(response)
          });
        }
      },
      //删除ACH
      delACH(id){
        if(confirm("确认删除此ACH文件吗?")){
          this.$https.get('/big_bend/backstage/order/delete_ach_file',
            {
              params: {file_id: id,}
            }
          ).then((response) => {
            this.$Message.info(response.data.msg);
            this.getOrderDetail();
          }).catch(function(response) {
            console.log(response)
          });
        }
      },
      //更新证件材料
      updatePhoto(file_expire_date,file_number,file_type){
        this.formItem.file_expire_date = file_expire_date;
        this.formItem.file_number = file_number;
        this.formItem.file_type = file_type;
      },
      updatePhotoBtn(){
        let order_id = this.$route.query.id;
        this.$https.post('/big_bend/backstage/order/update_user_file',
          ({
            file_expire_date: this.formItem.file_expire_date,
            file_number: this.formItem.file_number,
            file_type: this.formItem.file_type,
            file_url: this.url,
            order_id: order_id,
          })
        ).then((response) => {
          this.modal9 = false;
          this.$Message.success(response.data.msg);
          this.getOrderDetail();
        }).catch(function(response) {
          console.log(response)
        });
      },
      //下载文件
      downloadPhoto(id){
        this.$https.get('/big_bend/backstage/download/order_user_file', {params:{file_id: id}}).then((res) => {
          this.$Message.success(res.data.msg);
          this.download(res.data.body);
        }).catch(function(response) {
          console.log(response)
        });
      },
      //添加文件
      addDocumentBtn(){
        let order_id = this.$route.query.id;
        this.$https.post('/big_bend/backstage/order/update_document',
          ({
            document_name: this.formItem.add_document_name,
            document_type: this.formItem.add_document_type,
            document_url: this.add_url,
            order_id: order_id,
          })
        ).then((response) => {
          this.modal5=false;
          this.$Message.success(response.data.msg);
          this.getOrderDetail();
        }).catch(function(response) {
          console.log(response)
        });
      },
      //重新生成文件
      regenerateDocument(d_id){
        let data = {id: d_id};
        this.$https.get('/big_bend/doc_api/internal/regen/byOrderDocId', {params:data}).then((res) => {
          if(res.data.code=='1'){
            this.$Message.success(res.data.msg);
            this.getOrderDetail();
          }
        }).catch(function(response) {
          console.log(response)
        });
      },
      //更新文件
      updateDocument(id,type){
        this.id = id;
        this.formItem.document_type = type;
      },
      updateDocumentBtn(){
        this.$https.post('/big_bend/backstage/order/update_document',
          ({
            id: this.id,
            document_name: this.formItem.document_name,
            document_type: this.formItem.document_type,
            document_url: this.url,
            order_id: this.order_id,
          })
        ).then((response) => {
          this.modal4=false;
          this.$Message.success(response.data.msg);
          this.getOrderDetail();
        }).catch(function(response) {
          console.log(response)
        });
      },
      //下载文件
      downloadDocument(id){
        this.$https.get('/big_bend/backstage/download/order_document', {params:{document_id: id}}).then((res) => {
          this.$Message.success(res.data.msg);
          this.download(res.data.body);
        }).catch(function(response) {
          console.log(response)
        });
      },
      //自动下载
      download(src) {
        var $a = document.createElement('a');
        $a.setAttribute("href", src);
        $a.setAttribute("download", "");

        var evObj = document.createEvent('MouseEvents');
        evObj.initMouseEvent( 'click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null);
        $a.dispatchEvent(evObj);
      },
      //删除文件
      deleteDocument(id){
        this.$https.get('/big_bend/backstage/order/delete_document', {params:{document_id: id}}).then((res) => {
          this.$Message.success(res.data.msg);
          this.getOrderDetail();
        }).catch(function(response) {
          console.log(response)
        });
      },
      //上传
      handleSuccess(response){
        this.url = response.body;
        this.add_url = response.body;
      },
      //下载全部文件
      confirmBtn(){
        this.modal_loading = true;
        this.$https.get('/big_bend/backstage/download/file_package',
          {
            params: {
              order_id: this.order_id,
            }
          }
        ).then((response) => {
          window.location.href = response.data.body;
          this.modal_loading = false;
          this.modal6 = false;
        }).catch(function(response) {
          console.log(response)
        });
      },
      //提息
      pending(){
        const order_id = this.$route.query.id;
        if(this.formItem.force_withdraw_amount===0){
          return false;
        }
        this.$https.post('/big_bend/backstage/order/withdraw',
          ({
            is_last: false,
            withdraw_amount: this.formItem.force_withdraw_amount,
            order_id: order_id,
          })
        ).then((res) => {
          this.modal7=false;
          this.getOrderDetail();
          this.$Message.success(res.data.msg);
        }).catch(function(response) {
          console.log(response)
        });
      },
      //结算
      settlement(){
        let order_id = this.$route.query.id;
        /*if(this.formItem.force_withdraw_able_amount===0){
          return false;
        }*/
        if(this.formItem.final_settlement_amount===0){
          return false;
        }
        this.$https.post('/big_bend/backstage/order/withdraw',
          ({
            is_last: true,
            withdraw_amount: this.formItem.final_settlement_amount,
            order_id: order_id,
          })
        ).then((res) => {
          this.modal8=false;
          this.getOrderDetail();
          this.$Message.success(res.data.msg);
        }).catch(function(response) {
          console.log(response)
        });
      },
      //保存
      saveData(){
        if(this.accreditation===0){
          this.$https.post('/big_bend/backstage/order/update_info',
            ({
              address_type: this.formItem.address_type,
              address_cn:
                {
                  country: "中国",
                  region: this.formItem1.chinese_region,
                  city:  this.formItem3.chinese_city,
                  district: this.formItem2.chinese_district,
                  detail: this.formItem.chinese_detail,
                  postal_code: this.formItem.postal_code
                },
              address_non_cn:
                {
                  country: this.formItem1.country,
                  city: this.formItem3.city,
                  region: this.formItem2.region,
                  line1: this.formItem.line1,
                  line2: this.formItem.line2
                },
              bank_type: this.formItem.bank_type,
              bank_non_us:
                {
                  swift_code: this.formItem2.chinese_swift_code,
                  account_number: this.formItem3.chinese_account_number,
                  bank_address: this.formItem.chinese_bank_address,
                  bank_name: this.formItem1.chinese_bank_name,
                  have_middle_bank :this.have_middle_bank,
                  middle_bank_address: this.formItem.intermediary_bank_address,
                  middle_bank_name: this.formItem1.intermediary_bank_name,
                  middle_bank_swift_code: this.formItem2.intermediary_bank_swift_code
                },
              bank_us:
                {
                  account_number: this.formItem1.account_number,
                  account_type: this.formItem3.account_type,
                  bank_address: this.formItem.bank_address,
                  bank_name: this.formItem1.bank_name,
                  routing_number: this.formItem2.wire_rout_number,
                  routing_number_ach: this.formItem3.ach_rout_number,
                  swift_code: this.formItem2.swift_code
                },
              user_base_info:
                {
                  country_of_birth:  this.formItem3.country_of_birth,
                  country_of_tax_residency: this.formItem1.country_of_tax_residency,
                  date_of_birth: this.formItem1.date_of_birth,
                  foreign_tax_number: this.formItem3.foreign_tax_number,
                  industry: this.formItem3.industry,
                  nationality: this.formItem2.nationality,
                  occupation: this.formItem2.occupation,
                  source_of_capital: this.formItem1.source_of_capital,
                  ssn: this.formItem2.SSN
                },
              email: this.formItem3.email,
              remark: this.formItem.remark,
              failed_remark: this.formItem.failed_remark,
              first_name: this.formItem3.first_name,
              invest_amount: this.formItem1.invest_amount,
              investor_type: this.formItem.investor_type,
              last_name: this.formItem1.last_name,
              order_id: this.order_id,
              phone: this.formItem1.phone,
              signature: this.formItem.signature,
              received_amount: this.formItem2.received_amount,
            })
          ).then((response) => {
            this.getOrderDetail();
            this.$Message.success(response.data.msg);
          }).catch(function(response) {
            console.log(response)
          })
        }else {
          this.$https.post('/big_bend/backstage/order/update_info',
            ({
              address_type: this.formItem.address_type,
              address_cn:
                {
                  country: "中国",
                  region: this.formItem1.chinese_region,
                  city:  this.formItem3.chinese_city,
                  district: this.formItem2.chinese_district,
                  detail: this.formItem.chinese_detail,
                  postal_code: this.formItem.postal_code
                },
              address_non_cn:
                {
                  country: this.formItem1.country,
                  city: this.formItem3.city,
                  region: this.formItem2.region,
                  line1: this.formItem.line1,
                  line2: this.formItem.line2
                },
              bank_type: this.formItem.bank_type,
              bank_non_us:
                {
                  swift_code: this.formItem2.chinese_swift_code,
                  account_number: this.formItem3.chinese_account_number,
                  bank_address: this.formItem.chinese_bank_address,
                  bank_name: this.formItem1.chinese_bank_name,
                  have_middle_bank :this.have_middle_bank,
                  middle_bank_address: this.formItem.intermediary_bank_address,
                  middle_bank_name: this.formItem1.intermediary_bank_name,
                  middle_bank_swift_code: this.formItem2.intermediary_bank_swift_code
                },
              bank_us:
                {
                  account_number: this.formItem1.account_number,
                  account_type: this.formItem3.account_type,
                  bank_address: this.formItem.bank_address,
                  bank_name: this.formItem1.bank_name,
                  routing_number: this.formItem2.wire_rout_number,
                  routing_number_ach: this.formItem3.ach_rout_number,
                  swift_code: this.formItem2.swift_code
                },
              user_base_info:
                {
                  country_of_birth:  this.formItem3.country_of_birth,
                  country_of_tax_residency: this.formItem1.country_of_tax_residency,
                  date_of_birth: this.formItem1.date_of_birth,
                  foreign_tax_number: this.formItem3.foreign_tax_number,
                  industry: this.formItem3.industry,
                  nationality: this.formItem2.nationality,
                  occupation: this.formItem2.occupation,
                  source_of_capital: this.formItem1.source_of_capital,
                  ssn: this.formItem2.SSN
                },
              email: this.formItem3.email,
              remark: this.formItem.remark,
              failed_remark: this.formItem.failed_remark,
              first_name: this.formItem3.first_name,
              invest_amount: this.formItem1.invest_amount,
              investor_type: this.formItem.investor_type,
              last_name: this.formItem1.last_name,
              order_id: this.order_id,
              phone: this.formItem1.phone,
              signature: this.formItem.signature,
              received_amount: this.formItem2.received_amount,
              accreditation:
                {
                  with_spouse: true,
                  spouse_last_name : this.formItem1.spouse_last_name,
                  spouse_phone : this.formItem1.spouse_phone,
                  spouse_first_name: this.formItem2.spouse_first_name,
                  spouse_email: this.formItem2.spouse_email,
                  type: this.formItem.accreditation,
                  spouse_signature: this.formItem.spouse_signature,
                }
            })
          ).then((response) => {
            this.getOrderDetail();
            this.$Message.success(response.data.msg);
          }).catch(function(response) {
            console.log(response)
          })
        }
      },
      //用于回调的获取订单详情函数
      getOrderDetail(){
        let id = this.$route.query.id;
        this.$https.get('/big_bend/backstage/order/detail', {params: {order_id: id}}).then((response) => {
          let d = response.data.body;
          if(d){
            let address = JSON.parse(d.order_user_info.address);
            let bank = JSON.parse(d.order_user_info.bank);
            if(d.order_user_info.accreditation){
              this.formItem.accreditation = 'true';
              var accreditation = JSON.parse(d.order_user_info.accreditation);
            }
            let base_info = JSON.parse(d.order_user_info.base_info);
            this.formItem1.product_id = d.product_id;
            this.formItem1.user_name = d.order_user_info.first_name + " " + d.order_user_info.last_name;;
            this.formItem1.invest_amount = d.invest_amount;
            this.formItem1.invest_income = d.invest_income;
            this.formItem1.mentioned_amount = d.withdrawed_amount;
            this.formItem1.last_name = d.order_user_info.last_name;
            this.formItem1.phone = d.order_user_info.phone;
            this.formItem1.date_of_birth = base_info.date_of_birth;
            this.formItem1.source_of_capital = base_info.source_of_capital;
            this.formItem1.country_of_tax_residency = base_info.country_of_tax_residency;

            this.formItem2.product_number = d.product_number;
            this.formItem2.invest_consultant = d.advisor_name;
            this.formItem2.received_amount = d.received_amount;
            this.formItem2.all_income = (d.invest_income + d.promotion_income);
            this.formItem2.withdraw_able_amount = d.withdraw_able_amount;
            this.formItem2.user_id = d.order_user_info.user_id;
            this.formItem2.nationality = base_info.nationality;
            this.formItem2.SSN = base_info.ssn||'';
            this.formItem2.occupation = base_info.occupation;
            this.formItem2.create_at = d.order_user_info.user_create_at;

            this.formItem3.product_name = d.product_name;
            this.formItem3.source = d.channel_name;
            this.formItem3.promotion = d.promotion_amount;
            this.formItem3.promotion_income = d.promotion_income;
            this.formItem3.withdraw_amount = d.withdrawing_amount;
            this.formItem3.first_name = d.order_user_info.first_name;
            this.formItem3.email = d.order_user_info.email;
            this.formItem3.country_of_birth = base_info.country_of_birth;
            this.formItem3.industry = base_info.industry;
            this.formItem3.foreign_tax_number = base_info.foreign_tax_number;

            this.formItem.payment_method = d.payment_method;
            this.formItem.audit_remark = d.failed_remark;
            this.formItem.remark = d.remark;
            this.formItem.signature = d.order_user_info.signature;
            this.formItem.force_withdraw_able_amount = d.withdraw_able_amount;
            this.formItem.settlement_amount = (d.withdraw_able_amount + d.received_amount);

            this.startInterest = d.order_status;
            this.orderNumber = d.order_number;
            this.createAt = d.order_create_at;

            this.formItem.investor_type = d.order_user_info.investor_type;

            //用户证件
            this.cards = d.order_user_file_list;

            //ACH文件
            this.formItem.payData = d.order_ach_file_list;

            //收益列表
            if(d.order_earnings_list){
              this.incomeIndex = true;
              this.formItem.receivedData = d.order_earnings_list;
            }else {
              this.incomeIndex = false;
            }

            //提现列表
            if(d.withdraw_list){
              this.settleIndex = true;
              this.formItem.withdrawalData = d.withdraw_list;
            }else{
              this.settleIndex = false;
            }

            if(address){
              this.formItem.address_type = d.order_user_info.address_type;
              if(d.order_user_info.address_type==='CN'){
                this.formItem.country = address.country;
                this.formItem1.chinese_region = address.region;
                this.formItem3.chinese_city = address.city;
                this.formItem2.chinese_district = address.district;
                this.formItem.chinese_detail = address.detail;
                this.formItem.postal_code = address.postal_code;
              }else{
                this.formItem1.country = address.country;
                this.formItem2.region = address.region;
                this.formItem3.city = address.city;
                this.formItem.line1 = address.line1;
                this.formItem.line2 = address.line2;
              }
            }

            if(bank){
              this.formItem.bank_type = d.order_user_info.bank_type;
              if(d.order_user_info.bank_type==='NON_US'){
                this.formItem1.chinese_bank_name = bank.bank_name;
                this.formItem2.chinese_swift_code = bank.swift_code;
                this.formItem3.chinese_account_number = bank.account_number;
                this.formItem.chinese_bank_address = bank.bank_address;
                if(bank.have_middle_bank===1){
                  this.isMiddleBank = true;
                  this.have_middle_bank = 1;
                  this.formItem1.intermediary_bank_name = bank.middle_bank_name;
                  this.formItem2.intermediary_bank_swift_code = bank.middle_bank_swift_code;
                  this.formItem.intermediary_bank_address = bank.middle_bank_address;
                }else{
                  this.isMiddleBank = false;
                }
              }else{
                this.formItem1.bank_name = bank.bank_name;
                this.formItem1.account_number = bank.account_number;
                this.formItem2.swift_code = bank.swift_code;
                this.formItem2.wire_rout_number = bank.routing_number;
                this.formItem3.account_type = bank.account_type;
                this.formItem3.ach_rout_number = bank.routing_number_ach;
                this.formItem.bank_address = bank.bank_address;
              }
            }

            if(accreditation){
              this.accreditation = 1;
              this.formItem1.spouse_last_name = accreditation.spouse_last_name;
              this.formItem1.spouse_phone = accreditation.spouse_phone;
              this.formItem2.spouse_first_name = accreditation.spouse_first_name;
              this.formItem2.spouse_email = accreditation.spouse_email;
              this.formItem.accreditation = accreditation.type;
              this.formItem.spouse_signature = d.order_user_info.spouse_signature;
            }else {
              this.accreditation = 0;
            }

            if(d.order_document_list.length){
              this.items = d.order_document_list;
            }

          }
        }).catch(function(response) {
          console.log(response)
        });
      },
    },
    created:function () {
      //订单详情
      this.getOrderDetail();
      this.order_id = this.$route.query.id;
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
