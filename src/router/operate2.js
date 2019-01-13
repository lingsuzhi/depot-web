import Main from '@/view/Main'
import Member from '@/view/operate2/Member2'
import RealNameSwitch from '@/view/operate2/RealNameSwitch2'

const Router = [{
  path: '/operate2',
  name: '运营中心2',
  component: Main,
  iconCls: 'fa fa-bitcoin',
  children: [ {
      path: '/operate2/member2',
      component: Member,
      name: '会员管理2'
    },{
    path: '/operate2/realNameSwitch2',
    component: RealNameSwitch,
    name: '实名审核2'
  },
  ]
}]

export {
  Router
}
