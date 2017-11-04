<template>
  <div>
    <div class="shopCart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight': totalCount > 0}">
              <i class="icon-shopping_cart" :class="{'highlight': totalCount > 0}"></i>
            </div>
            <div class="count" v-if="totalCount > 0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight': totalCount > 0}">&yen;{{totalPrice}}</div>
          <div class="desc">另需配送费&yen;{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass" @click.stop="pay">{{payDesc}}</div>
        </div>
      </div>
      <!--抛物小球-->
      <div class="ball-wrapper">
        <transition name="drop"
          @before-enter="dropBeforeEnter"
          @enter="dropEnter"
          @after-enter="dropAfterEnter"
          v-for="(ball, index) in balls"
          key="index"
        >
          <div class="ball" v-if="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
      <!--购物车列表-->
      <transition name="fold">
        <div class="shopCart-list" v-show="listShow">
          <div class="list-header">
            <span class="title">购物车</span>
            <div class="empty" @click="empty">清空</div>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food-list border-1px" v-for="food in selectFoods">
                <div class="name">{{food.name}}</div>
                <div class="price">&yen;{{food.price * food.count}}</div>
                <div class="cartControl-wrapper">
                  <v-cartControl :food="food"></v-cartControl>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <!--遮罩层-->
    <transition name="fade">
      <div class="list-mask" v-if="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'; // 引入better-scroll
  import cartControl from '../cartControl/cartControl';
  export default {
    name: 'shopCart',
    data () {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true // 购物车列表是否折叠
      }
    },
    methods: {
      drop(el) {
        // console.log(el);
        for(let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if(!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return '';
          }
        }

        // forEach 里面return不会退出循环
        /* this.balls.forEach((ball) => {

        }); */
      },
      dropBeforeEnter(el) {
        this.balls.forEach((ball) => {
          if(ball.show) {
            let rect = ball.el.getBoundingClientRect(); // 获取元素相对于窗口的位置
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = ''; // 手动让盒子显示
            el.style.transfrom = `translate3d(0, ${y}px, 0)`;
            el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
            let inner = el.querySelector('.inner-hook');
            inner.style.transform = `translate3d(${x}px, 0, 0)`;
            inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
          }
        });
      },
      dropEnter(el) {
        // 触发浏览器重绘
        let refresh = el.offsetHeight;
        this.$nextTick(() => {
          el.style.transform = 'translate3d(0, 0, 0)';
          el.style.webkitTransform = 'translate3d(0, 0, 0)';
          let inner = el.querySelector('.inner-hook');
          inner.style.transform = 'translate3d(0, 0, 0)';
          inner.style.webkitTransform = 'translate3d(0, 0, 0)';
        })
      },
      dropAfterEnter(el) {
        // js对象是引用 相同对象在内存同一个地址保存
        // 这里面的删除的dropBalls最前面的一项是从this.balls里面的一个对象引用过来的
        // 数组shift这个api返回被删除的那一项，用ball变量来接收，这样ball便引用this.balls里面对应的一个对象
        // 所以操作这个ball就相等于操作this.balls里面的某一个对象
        let ball = this.dropBalls.shift();
        if(ball) {
          ball.show = false;
          el.style.display = 'none'; // 手动让盒子隐藏
        }
      },
      toggleList() { // 切换是否显示购物车列表
        if(this.totalCount) { // 购物车不为空切换fold的值
          this.fold = !this.fold;
        }else { // 购物车为空始终折叠
          this.fold = true;
        }
      },
      empty() { // 清空购物车
        this.selectFoods.forEach((food) => {
          food.count = 0; // 将购买的个数置为零
        });
      },
      pay() { // 支付
        if(this.totalPrice < this.minPrice) {

        }else {
          alert(`支付${this.totalPrice}`);
        }
      },
      hideList() {
        this.fold = true; // 折叠购物车
      }
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc() {
        if(this.totalCount === 0) {
          return `¥${this.minPrice}元起送`;
        }else if(this.totalPrice < this.minPrice) {
          let diff = 0;
          diff = this.minPrice - this.totalPrice;
          return `还差¥${diff}元起送`;
        }else {
          return '去结算';
        }
      },
      payClass() {
        if(this.totalPrice < this.minPrice) {
          return 'no-enough';
        }else {
          return 'enough';
        }
      },
      listShow() { // 购物列表显示隐藏处理
        // 为什么借助计算属性来控制购物车列表显示隐藏
        // 因为让购物车为空的触发按钮不只一个，如果我们不用计算属性而是用事件来控制
        // 这样我们要把每个触发按钮的点击事件加上把listShow的属性设置为false
        // 有了计算属性,每次操作都会重新计算listShow的值，实时更新listShow的值，以达到关闭购物车列表的作用
        if(this.totalCount) { // 购物车不为空
          // fold表示是否折叠为true表示折叠，因此与listShow值相反
          let show = !this.fold;
          if(show) { // 出现购物车列表的时候初始化better-scroll
            this.$nextTick(() => {
              if(!this.scroll) { // 判断是否已经new BScroll
                this.scroll = new BScroll(this.$refs.listContent, {
                  click: true
                });
              }else {
                this.scroll.refresh(); // 重加载
              }
            });
          }
          return show;
        }else { // 购物车为空
          // 放在计算属性里面这样清空都会将fold的值改为false
          // 如果放在methods事件里面那么只会在触发事件的时候设置为false
          // 那样我们就需要把每种能将购物车设置为零对象设置相关事件处理fold为0 特别麻烦
          this.fold = true; // 折叠购物车
          return false;
        }
      }
    },
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [
            {
              price: 4,
              count: 5
            }
          ];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    created() {
      this.Event.$on('cart.add', (target) => {
        // 体验优化，异步加载抛物球动画
        this.$nextTick(() => {
          this.drop(target);
        });
      });

      // 把drop函数发送给父组件
      // this.Event.$emit('sendDrop', this.drop);
    },
    components: {
      vCartControl: cartControl
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .shopCart
    position: fixed
    left: 0
    bottom: 0
    width: 100%
    height: 48px
    z-index: 40
    .content
      display: flex
      .content-left
        flex: 1
        font-size: 0
        background-color: #141d27
        .logo-wrapper
          display: inline-block
          position: relative
          top: -10px
          width: 44px
          height: 44px
          margin: 0 12px
          padding: 6px
          border-radius: 50%
          background-color: #141d27
          .logo
            width: 100%
            height: 100%
            text-align: center
            border-radius: 50%
            background-color: #2B343C
            &.highlight
              background-color: #00A0DC
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858A
              &.highlight
                color #fff
          .count
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            color: #fff
            font-size: 9px
            font-weight: 700
            text-align: center
            background-color: rgb(240, 20, 20)
            border-radius: 6px
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          padding-right: 12px
          line-height: 24px
          color: rgba(255, 255, 255, .4)
          font-size: 16px
          font-weight: 700
          border-right: 1px solid rgba(255, 255, 255, .1)
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin-left: 12px
          line-height: 48px
          font-size: 12px
          color: rgba(255, 255, 255, .4)
      .content-right
        flex: 0 0 105px
        width: 105px
        height: 48px
        text-align: center
        .pay
          line-height: 48px
          font-size: 12px
          font-weight: 700
          color: rgba(255, 255, 255, .4)
          &.no-enough
            background-color: #2B333B
          &.enough
            color: #fff
            background-color: #00b43c
    // 抛物小球
    .ball-wrapper
      .ball
        position: fixed
        z-index: 200
        left: 32px
        bottom: 22px
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background-color: rgb(0, 160, 220)
        &.drop-enter-active
          transition: all .5s cubic-bezier(.47,-0.61,.83,.67)
          .inner
            transition: all .5s linear
    // 购物车列表
    .shopCart-list
      position: absolute
      top: 0
      left: 0
      z-index: -1
      width: 100%
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active,
      &.fold-leave-active
        transition: all .5s
      &.fold-enter,
      &.fold-leave-to
        transform: translate3d(0, 0, 0);
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        border-bottom: 1px solid rgba(7, 17, 27, .1)
        background-color: #f3f5f7
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          padding-left: 24px
          font-size: 12px
          color: rgb(0, 160, 220)
      .list-content
        max-height: 217px
        padding: 0 18px
        overflow: hidden
        background-color: #fff
        .food-list
          position: relative
          padding: 12px 0
          border-1px-bottom(rgba(7, 17, 27, .1))
          .name
            height: 24px
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 84px
            bottom: 12px
            height: 24px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartControl-wrapper
            position: absolute
            right: -6px
            bottom: 6px
  .list-mask
    position: fixed
    top: 0
    left: 0
    z-index: 35
    width: 100%
    height: 100%
    background-color: rgba(7, 17, 27, .6)
    backdrop-filter: blur(10px)
    &.fade-enter-active,
    &.fade-leave-active
      transition: all .5s
    &.fade-enter,
    &.fade-leave-to
      opacity: 0
</style>
