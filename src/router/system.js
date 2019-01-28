import Main from '@/view/Main'

import MemberInfoApp from '@/view/system/memberinfo/MemberInfoApp'
import OrderDesignApp from '@/view/system/OrderDesign/OrderDesignApp'

const Router = [{
  path: '/system',
  name: '系统设置',
  component: Main,
  iconCls: 'fa fa-bitcoin',
  children: [ {
    path: '/system/memberinfo',
    component: MemberInfoApp,
    name: '用户信息'
  },{
    path: '/system/orderDesign',
    component: OrderDesignApp,
    name: '表单设计'
  },
  ]
}]

export {
  Router
}
