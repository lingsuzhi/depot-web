import Main from '@/view/Main'
import OrderXsck from '@/view/operate/order/OrderXsck'
import OrderThrk from '@/view/operate/order/OrderThrk'


const Router = [{
  path: '/operate',
  name: '运营中心',
  component: Main,
  iconCls: 'fa fa-bitcoin',
  children: [{
    path: '/operate/orderXsck',
    component: OrderXsck,
    name: '销售出库',
  },
    {
    path: '/operate/orderThrk',
    component: OrderThrk,
    name: '退货入库',
  },
  ]
}]

export {
  Router
}
