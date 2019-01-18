import Main from '@/view/Main'
import ProductTypeInfoApp from '@/view/product/producttypeinfo/ProductTypeInfoApp'
import ProductInfoApp from '@/view/product/productinfo/ProductInfoApp'

const Router = [{
  path: '/product',
  name: '商品管理',
  component: Main,
  iconCls: 'fa fa-bitcoin',
  children: [ {
      path: '/product/producttypeinfo',
      component: ProductTypeInfoApp,
      name: '商品类别'
    },
    {
    path: '/product/productinfo',
    component: ProductInfoApp,
    name: '商品资料'
  },
  ]
}]

export {
  Router
}
