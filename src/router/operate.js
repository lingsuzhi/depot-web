import Main from '@/view/Main'
import Member from '@/view/operate/member/Member'
import MemberInfoApp from '@/view/operate/memberinfo/MemberInfoApp'
const Router = [{
  path: '/operate',
  name: '运营中心',
  component: Main,
  iconCls: 'fa fa-bitcoin',
  children: [ {
      path: '/operate/member',
      component: Member,
      name: '用户信息'
    },{
    path: '/operate/memberinfo',
    component: MemberInfoApp,
    name: '用户信息2'
  },
  ]
}]

export {
  Router
}
