/**
 * Created with Webstorm 2017.2.1
 * User: xiaogu
 * Date: 2017/10/24
 * Time: 14:15
 *
 */

import goods from 'components/goods/goods.vue';
import ratings from 'components/ratings/ratings.vue';
import seller from 'components/seller/seller.vue';

export default {
  routes: [
    {
      name: '商品',
      path: '/goods',
      component: goods
    },
    {
      name: '评价',
      path: '/ratings',
      component: ratings
    },
    {
      name: '商家',
      path: '/seller',
      component: seller
    },
    {
      path: '/',
      redirect: '/goods'
    }
  ],
  mode: 'history', // 解决express路由配置无法访问
  linkActiveClass: 'active' // 设置路由高亮项的类名 默认为router-link-active
};
