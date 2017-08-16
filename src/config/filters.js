/**
 * Created by zhiqiang on 2017/5/9.
 */
let filter = (Vue) => {
    Vue.filter("shore", function (value) { //产品属地
      return {
        'OFF_SHORE': '离岸', 'BOTH': '在岸+离岸', 'ON_SHORE': '在岸'
      }[value];
    });
    Vue.filter("productType", function (value) { //产品类型
      return {
        'CROWD_FUNDING': '众筹', 'NON_CROWD_FUNDING': '基金', 'ON_SHORE': '在岸'
      }[value];
    });
    Vue.filter("productModal", function (value) { //产品运作模式
      return {
        'CLOSED': '封闭', 'OPENED': '开放'
      }[value];
    });
    Vue.filter("isUniversal", function (value) { //产品组类型
      return {
        'true': '开放型产品组', 'false': '定制型产品组'
      }[value];
    });
    Vue.filter("isActive", function (value) { //渠道状态
      return {
        'true': '启用', 'false': '停用'
      }[value];
    });
    Vue.filter("trueOrFalse", function (value) { //点选$映射
      return {
        'true': '是', 'false': '否'
      }[value];
    });
    Vue.filter("cards", function (value) {
      return {
        'ID_CARD': '身份证', 'PASSPORT': '护照', 'BILL': '账单', 'DRIVING_LICENSE': '美国驾照'
      }[value];
    });
    Vue.filter("status", function (value) {
      return {
        'FOR_INVEST': '在售', 'CREATED': '创建', 'FOR_APPOINTMENT': '预约', 'SOLD_OUT': '售罄', 'OFFLINE': '下架'
      }[value];
    });
    Vue.filter("productStatus", function (value) {
      return {
        'not_received': '未付款', 'received': '付款', 'start_audit': '审核中', 'audit_success': '审核成功',
        'appoint': '投资成功', 'start_interest': '投资中', 'refunded': '还款成功', 'not_commit': '未完成',
        'invest_success': '投资成功', 'closed': '历史', 'voided': '取消', 'auditSuccess': '未完成', 'audit_failed': '审核失败'
      }[value];
    });
    Vue.filter("investorType", function (value) { //资产部分
      return {
        '2': '美国投资人', '1': '中国大陆投资人', '99': '其他国家地区投资人',
      }[value];
    });
    Vue.filter("redeemType", function (value) {
      return {
        'pending': '待处理', 'processing': '处理中', 'success': '处理完',
      }[value];
    });
    Vue.filter("received", function (value) { //入金余额
      if (value < 0) {
        return 0;
      } else {
        return value;
      }
      ;
    });
    Vue.filter("history", function (value) {
      if (value < 0) {
        return 0;
      } else {
        return value;
      }
      ;
    }); //历史总提现
    Vue.filter("address", function (value) {
      const ad = JSON.parse(value);
      if (ad != null) {
        return ad.country + ad.region + ad.city + ad.district;
      }
    }); //用户地址
    Vue.filter("investor", function (value) {
      return {
        '1': '大陆',
        '2': '美国',
        '99': '其他',
        '1,2': '大陆/美国',
        '1,99': '大陆/其他',
        '1,2,99': '大陆/美国/其他',
      }[value];
    }); //产品&渠道
    Vue.filter("effect_type", function (value) {  //促销类型
      return {
        'EXPERIENCE_GOLD': '体验金', 'CASH_OFF': '立减', 'RAISE_RATE': '生息券', 'RED_PACKET': '红包'
      }[value];
    });
    Vue.filter("effect_status", function (value) {  //促销类型
      return {
        '0': '停用', '1': '启用'
      }[value];
    });
    Vue.filter("email_send", function (value) {  //邮件发送至
      return {
        'channel': '渠道', 'meixin': '美信', 'investor': '用户'
      }[value];
    });
    Vue.filter("email_status", function (value, key) {  //邮件触发状态
        return {
          'FOR_APPOINTMENT': '产品预售',
          'FOR_INVEST': '产品开售',
          'SOLD_OUT': '产品售罄',
          'not_commit': '未签署',
          'not_received': key == 'ach' ? '订单未入金ACH' : key == 'is_imbank' ? '订单未入金Wire-有中间行' : key == 'no_imbank' ? '订单未入金Wire-无中间行' : '',
          'received': '审核中',
          'audit_success': '审核成功',
          'audit_failed': '审核失败',
          'pending': key == 'not_last' ? '派息提醒' : key == 'is_last' ? '结算提醒' :'',
          'success': key == 'not_last' ? '派息成功' : key == 'is_last' ? '结算成功': '',
          'appointment_notice': '预约提醒',
        }[value];
      }
    );
    Vue.filter("ach_document", function (value) {  //ACH文档类型
      return {
        '1': '投资文件', '2': '提息文件', '3': '结算文件'
      }[value];
    });
    Vue.filter("attribute", function (value) {  //ACH文档类型
      return {
        '1': '个人', '2': '团队'
      }[value];
    });
    Vue.filter("appointStatus", function (value) {  //ACH文档类型
      return {
        '0': '未成单', '1': '审核中', '2': '已成单', '3':'已失效'
      }[value];
    });
  }
;
export default filter

