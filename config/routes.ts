/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,title 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @doc https://umijs.org/docs/guides/routes
 */
export default [



  {
    path: '/result',
    layout: false,
    routes: [

      {
        path: '/result/fail/twitter',
        component: './result/fail/twitter',
      },

      {
        path: '/result/success/twitter',
        component: './result/success/twitter',
      },
      {
        component: '404',
      },
    ],
  },


  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        layout: false,
        name: 'login',
        component: './User/login',
      },
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        name: 'register',
        icon: 'smile',
        path: '/user/register',
        component: './User/register',
      },

      {
        component: '404',
      },
    ],
  },

  {
    path: '/',
    redirect: '/welcome',
  },

  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },

  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'dashboard',
    routes: [
      {
        path: '/dashboard',
        redirect: '/dashboard/goods/list',
      },





      //---------------------------------商品管理分類----------------------------
      {
        name: 'goodsTypeManage',
        icon: 'smile',
        path: '/dashboard/goods/type-list',
        component: './GoodsType',
        access: 'AdminGroup',
      },

      //---------------------------------商品管理----------------------------

      {
        name: 'goodsManage',
        icon: 'smile',
        path: '/dashboard/goods/list',
        component: './Goods/list',
        access: 'AdminGroup',
      },
      {
        name: 'goodsShow',
        icon: 'smile',
        path: '/dashboard/goods/userlist',
        component: './Goods/userList',
        access: 'UserGroup',
      },
      {
        name: 'goodsShow',
        icon: 'smile',
        path: '/dashboard/goods/merchantlist',
        component: './Goods/merchantList',
        access: 'MerchantGroup',
      },

      //---------------------------------订单管理----------------------------
      {
        name: 'ordersManage',
        icon: 'smile',
        path: '/dashboard/orders/list',
        component: './Orders/list',
        access: 'AdminGroup',
      },
      {
        name: 'myOrders',
        icon: 'smile',
        path: '/dashboard/orders/userlist',
        component: './Orders/userList',
        access: 'UserGroup',
      },

      {
        name: 'rushOrders',
        icon: 'smile',
        path: '/dashboard/orders/userPushList',
        component: './Orders/userPushList',
        access: 'UserGroup',
      },

      {
        name: 'rushOrders',
        icon: 'smile',
        path: '/dashboard/orders/merchantlist',
        component: './Orders/merchantList',
        access: 'MerchantGroup',
      },



      //---------------------------------账单管理----------------------------

      {
        name: 'billManage',
        path: '/dashboard/bill/list',
        component: './Bill',
        access: 'AdminGroup',
      },
      {
        name: 'myBill',
        path: '/dashboard/bill/userlist',
        component: './Bill/userList',
        access: 'UserGroup',
      },
      {
        name: 'myBill',
        icon: 'smile',
        path: '/dashboard/bill/merchantlist',
        component: './Bill/merchantList',
        access: 'MerchantGroup',
      },

      //---------------------------------Bind管理----------------------------
      {
        name: 'bindManage',
        icon: 'smile',
        path: '/dashboard/bind/list',
        component: './Bind/list',
        access: 'AdminGroup',
      },
      {
        name: 'myBind',
        icon: 'smile',
        path: '/dashboard/bind/merchantlist',
        component: './Bind/merchantList',
        access: 'MerchantGroup',
      },
      {
        name: 'myBind',
        icon: 'smile',
        path: '/dashboard/bind/userList',
        component: './Bind/userList',
        access: 'UserGroup',
      },
      //---------------------------------TSTask管理----------------------------

      {
        name: 'tstaskManage',
        icon: 'smile',
        path: '/dashboard/tstask/list',
        component: './TSTask/list',
        access: 'AdminGroup',
      },
      {
        name: 'myTSTask',
        icon: 'smile',
        path: '/dashboard/tstask/merchantlist',
        component: './TSTask/merchantList',
        access: 'MerchantGroup',
      },
      {
        name: 'myTSTask',
        icon: 'smile',
        path: '/dashboard/tstask/userList',
        component: './TSTask/userList',
        access: 'UserGroup',
      },
      //---------------------------------Users管理----------------------------
      {
        name: 'usersManage',
        icon: 'smile',
        path: '/dashboard/users/list',
        component: './Users/index',
        access: 'AdminGroup',
      },
      //---------------------------------Notice管理----------------------------
      {
        name: 'noticeManage',
        icon: 'smile',
        path: '/dashboard/notice/list',
        component: './Notice/index',
        access: 'AdminGroup',
      },
      {
        component: '404',
      },

    ],
  },
  {

    name: 'environment',
    icon: 'chrome',
    path: '/environment',
    routes: [
      {
        path: '/environment',
        redirect: '/environment/list',
      },
      //---------------------------------环境管理----------------------------
      {
        name: 'environmentManage',
        icon: 'smile',
        path: '/environment/list',
        component: './Environment/list',
        access: 'AdminGroup',
      },

      {
        name: 'environmentManage',
        icon: 'smile',
        path: '/environment/merchantlist',
        component: './Environment/merchantlist',
        access: 'MerchantGroup',
      },

      {
        name: 'environmentManage',
        icon: 'smile',
        path: '/environment/userlist',
        component: './Environment/userlist',
        access: 'UserGroup',
      },

      //---------------------------------管理分類----------------------------
      {
        name: 'accountTypeManage',
        path: '/environment/accountType/list',
        component: './AccountType',
        access: 'AdminGroup',
      },

      //---------------------------------代理管理----------------------------
      {
        name: 'proxyManage',
        icon: 'smile',
        path: '/environment/proxy/list',
        component: './Proxy/list',
        access: 'AdminGroup',
      },
      {
        name: 'proxyManage',
        icon: 'smile',
        path: '/environment/proxy/merchantlist',
        component: './Proxy/merchantlist',
        access: 'MerchantGroup',
      },
      {
        name: 'proxyManage',
        icon: 'smile',
        path: '/environment/proxy/userlist',
        component: './Proxy/userlist',
        access: 'UserGroup',
      },

      {
        component: '404',
      },
    ],
  },

  {
    name: 'account',
    icon: 'user',
    path: '/account',
    routes: [
      {
        path: '/account',
        redirect: '/account/settings',
      },
      {
        name: 'settings',
        icon: 'smile',
        path: '/account/settings',
        component: './Account/index',
      },
      {
        component: '404',
      },
    ],
  },

  {
    component: '404',
  },
];
