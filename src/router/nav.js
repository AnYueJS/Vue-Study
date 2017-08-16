/**
 * Created by zhiqiang on 2017/5/6.
 */
export default [
  {
    path: '/index',
    name: 'Index',
    meta: {
      header: {
        require: false,
        title: '上导航和左导航',
      }
    },
    component: (resolve) => require(['../components/common/Nav.vue'], resolve),
    children:[
      //dashboard
      {
        path: '/dashboard',
        name: 'Dashboard',
        meta: {
          header: {
            require: false,
            title: 'dashboard',
          }
        },
        component: (resolve) => require(['../components/dashboard/dashboard.vue'], resolve),
      },

      //金融订单
      {
        path: '/orderDetail',
        name: 'OrderDetail',
        meta: {
          header: {
            require: false,
            title: '产品详情',
          }
        },
        component: (resolve) => require(['../components/orders/orderDetail.vue'], resolve)
      },
      {
        path: '/appointList',
        name: 'AppointList',
        meta: {
          header: {
            require: false,
            title: '预约列表',
          }
        },
        component: (resolve) => require(['../components/orders/appointList.vue'], resolve)
      },

      //用户管理
      {
        path: '/userList',
        name: 'UserList',
        meta: {
          header: {
            require: false,
            title: '全部用户',
          }
        },
        component: (resolve) => require(['../components/user/userList.vue'], resolve)
      },
      {
        path: '/investUserList',
        name: 'InvestUserList',
        meta: {
          header: {
            require: false,
            title: '投资用户',
          }
        },
        component: (resolve) => require(['../components/user/investUserList.vue'], resolve)
      },
      {
        path: '/appointUserList',
        name: 'AppointUserList',
        meta: {
          header: {
            require: false,
            title: '预约用户',
          }
        },
        component: (resolve) => require(['../components/user/appointUserList.vue'], resolve)
      },
      {
        path: '/userDetail',
        name: 'UserDetail',
        meta: {
          header: {
            require: false,
            title: '用户详情',
          }
        },
        component: (resolve) => require(['../components/user/userDetail.vue'], resolve)
      },

      //渠道管理
      {
        path: '/channelList',
        name: 'ChannelList',
        meta: {
          header: {
            require: false,
            title: '渠道列表',
          }
        },
        component: (resolve) => require(['../components/channel/channelList.vue'], resolve)
      },
      {
        path: '/channelDetail',
        name: 'ChannelDetail',
        meta: {
          header: {
            require: false,
            title: '主渠道详情',
          }
        },
        component: (resolve) => require(['../components/channel/channelDetail.vue'], resolve)
      },
      {
        path: '/createChannel',
        name: 'CreateChannel',
        meta: {
          header: {
            require: false,
            title: '新建主渠道',
          }
        },
        component: (resolve) => require(['../components/channel/createChannel.vue'], resolve)
      },
      {
        path: '/joinRequestList',
        name: 'JoinRequestList',
        component: (resolve) => require(['../components/channel/joinRequestList.vue'], resolve)
      },

      //文件管理
      {
        path: '/upload',
        name: 'Upload',
        meta: {
          header: {
            require: false,
            title: '文件上传',
          }
        },
        component: (resolve) => require(['../components/fileControl/upload.vue'], resolve)
      },

      //内部管理
      {
        path: '/testAccountList',
        name: 'TestAccountList',
        meta: {
          header: {
            require: false,
            title: '测试账户',
          }
        },
        component: (resolve) => require(['../components/interiorControl/testAccountList.vue'], resolve)
      },
      {
        path: '/systemAccountList',
        name: 'SystemAccountList',
        meta: {
          header: {
            require: false,
            title: '系统用户',
          }
        },
        component: (resolve) => require(['../components/interiorControl/systemAccountList.vue'], resolve)
      },
      {
        path: '/roleList',
        name: 'RoleList',
        meta: {
          header: {
            require: false,
            title: '角色列表',
          }
        },
        component: (resolve) => require(['../components/interiorControl/roleList.vue'], resolve)
      },
      {
        path: '/roleDetail',
        name: 'RoleDetail',
        meta: {
          header: {
            require: false,
            title: '角色详情',
          }
        },
        component: (resolve) => require(['../components/interiorControl/roleDetail.vue'], resolve)
      },

      //block
      {
        path: '/block',
        name: 'Block',
        meta: {
          header: {
            require: false,
            title: 'Block',
          }
        },
        component: (resolve) => require(['../components/block/block.vue'], resolve)
      },

    ]
  },
]
