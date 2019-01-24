import Main from '@/view/Main'

import MemberInfoApp from '@/view/system/memberinfo/MemberInfoApp'
const Router = [{
  path: '/system',
  name: '系统设置',
  component: Main,
  iconCls: 'fa fa-bitcoin',
  children: [ {
    path: '/operate/memberinfo',
    component: MemberInfoApp,
    name: '用户信息'
  },
  ]
}]

export {
  Router
}
