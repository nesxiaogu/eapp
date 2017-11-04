<template>
    <div id="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item border-1px" v-for="(item, index) in goods" :class="{'current': index === currentIndex}" @click="selectIndex(index, $event)">
            <span class="text">
              <span class="icon" v-if="item.type > -1" :class="imgMap[item.type]"></span>
              {{item.name}}
            </span>
            <!--<span class="white"></span>-->
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li class="foods-list foods-list-hook" v-for="item in goods">
            <h2 class="title">{{item.name}}</h2>
            <ul>
              <li class="foods-item border-1px" v-for="food in item.foods" @click="selectFood(food, $event)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h3 class="name">{{food.name}}</h3>
                  <div class="desc" v-if="food.description">{{food.description}}</div>
                  <div class="extra">
                    <span class="sellCount">月售{{food.sellCount}}份</span>
                    <span class="rating">好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="newPrice">&yen;{{food.price}}</span>
                    <span class="oldPrice" v-if="food.oldPrice">&yen;{{food.oldPrice}}</span>
                  </div>
                  <div class="cartControl-wrapper" @click.stop="">
                    <v-cartControl :food="food"></v-cartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <v-shopCart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></v-shopCart>
      <v-food :food="selectedFood"></v-food>
    </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import shopCart from '../shopCart/shopCart'
  import cartControl from '../cartControl/cartControl'
  import food from '../food/food'
  const ERR_OK = 0;
  export default {
    name: 'goods',
    data () {
      return {
        goods: [],
        imgMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        listHeight: [], // 存放楼梯高度
        scrollY: 0, // 存放滚动高度
        selectedFood: {} // 选中的商品 进详情页用
      };
    },
    props: {
      seller: {
        type: Object
      }
    },
    created() {
      this.$http.get('/api/goods').then((response) => {
        if(response.data.errno === ERR_OK) {
          this.goods = response.data.data;
          this.$nextTick(() => {
            this._initScroll();
            this._getFloorHeight();
          });
        }
      });

      this.Event.$on('show', (fn) => {
        this.show = fn; // 接收food组件的show方法
      });

      // 接收cartControl组件传递过来的数据
//       this.Event.$on('cart.add', (target) => {
//         this.drop(target);
//       });
      // 接收子组件的drop函数
//       this.Event.$on('sendDrop', (fn) => {
//         this.drop = fn;
//       });
    },
    computed: {
      currentIndex() { // 计算当前索引号
        for(let i = 0; i < this.listHeight.length - 1; i++) {
          let minHeight = this.listHeight[i];
          let maxHeight = this.listHeight[i + 1];
          if(this.scrollY >= minHeight && this.scrollY < maxHeight) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let Foods = [];
        this.goods.forEach((good) => {
          let foods = good.foods;
          foods.forEach((food) => {
            if(food.count) {
              Foods.push(food);
            }
          });
        });
        return Foods;
      }
    },
    methods: {
      selectIndex(index, event) {
        if(event._constructed) { // better-scroll 触发的事件
          let el = this.$refs.foodsWrapper.querySelectorAll('.foods-list-hook')[index];
          this.foodsScroll.scrollToElement(el, 300);
        }
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true // 点击
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true, // 允许点击
          probeType: 3 // 实时返回滚动位置
        });
        this.foodsScroll.on('scroll', (position) => { // 事件
          this.scrollY = Math.abs(Math.floor(position.y)); // 获取滚动高度
        });
      },
      _getFloorHeight() { // 获取楼层高度
        let foodsListHook = this.$refs.foodsWrapper.querySelectorAll('.foods-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for(let i = 0; i < foodsListHook.length; i++) {
          let item = foodsListHook[i];
          height += item.clientHeight + 18; // 算上下面的margin-bottom 18px
          this.listHeight.push(height);
        }
      },
      selectFood(food, event) { // 选择商品进详情页
        if(event._constructed) {
          this.selectedFood = food;
          // this.$store.dispatch('showFood'); // 显示商品详情页
          // 调用show方法等于调用food组件的show方法
          this.show();
        }
      }
    },
    components: {
      vShopCart: shopCart,
      vCartControl: cartControl,
      vFood: food
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  #goods
    overflow: hidden
    display: flex
    position: absolute
    left: 0
    top: 174px
    bottom: 48px
    width: 100%
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background-color: #f3f5f7
      .menu-item
        display: table
        width: 56px
        height: 54px
        // margin: 0 auto
        padding: 0 12px
        line-height: 54px
        font-size: 0
        // border-1px-bottom(rgba(7, 17, 27, .1))
        &.current
          position: relative
          margin-top: -1px
          font-weight: 700
          // border-bottom: 0 none
          background-color: #fff
          .text
            &::after
              border-bottom: 0 none
        .text
          display: table-cell
          // display: inline-block
          vertical-align: middle // 表格内容垂直居中
          width: 56px
          height: 54px
          line-height: 14px // 重新设置行高
          font-size: 12px
          color: rgb(77, 85, 93)
          border-1px-bottom(rgba(7, 17, 27, .1))
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            line-height: 1.4em
            &.decrease
              bg-img('decrease_3')
            &.discount
              bg-img('discount_3')
            &.guarantee
              bg-img('guarantee_3')
            &.invoice
              bg-img('invoice_3')
            &.special
              bg-img('special_3')
            background-size: 12px
            background-repeat: no-repeat
        .white
          display: inline-block
          vertical-align: middle
          width: 0
          font-size: 0
    .foods-wrapper
      flex: 1
      background-color: #fff
      .title
        height: 26px
        padding-left: 14px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background-color: #f3f5f7
      .foods-item
        display: flex
        position: relative
        font-size: 0
        margin: 18px
        + .foods-item
          padding-top: 18px
          border-1px-top(rgba(7, 17, 27, .1))
        .icon
          flex: 0 0 57
          width: 57px
        .content
          flex: 1
          margin-left: 10px
          .name
            margin-top: 2px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc
            margin-top: 8px
            line-height: 12px
            font-size: 10px
            color:rgb(147, 153, 159)
          .extra
            margin-top: 8px
            line-height: 10px
            font-size: 0
            color: rgb(147, 153, 159)
            .sellCount
              font-size: 10px
            .rating
              margin-left: 12px
              font-size: 10px
          .price
            // margin-top: 8px
            font-size: 0
            .newPrice
              line-height: 24px
              color: rgb(240, 20, 20)
              font-size: 14px
              font-weight: 700
            .oldPrice
              margin-left: 8px
              line-height: 24px
              color: rgb(147, 153, 159)
              font-size: 10px
              font-weight: 700
              text-decoration: line-through
          .cartControl-wrapper
            position: absolute
            right: -6px
            bottom: -6px
</style>
