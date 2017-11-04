<template>
    <div class="cartControl">
      <transition name="move">
        <div class="cart-decrease icon-remove_circle_outline" v-if="food.count > 0" @click="decreaseCart($event)"></div>
      </transition>
      <div class="cart-count" v-if="food.count > 0">{{food.count}}</div>
      <div class="cart-add icon-add_circle" @click="addCart($event)"></div>
    </div>
</template>

<script>
  import Vue from 'vue';
  export default {
    data () {
      return {}
    },
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if(event._constructed) { // better-scroll 触发的点击
          if(!this.food.count) {
            // 通过这样的方式去添加绑定时不存在的属性，属性值得改变才能被vue检测到
            // this.food.count = 1 这种方式更新数据，vue检测不到
            Vue.set(this.food, 'count', 1);
            // this.food.count = 1;
          }else {
            this.food.count++; // 加一
          }

          // 传递给shopCart组件
          this.Event.$emit('cart.add', event.target);
        }
      },
      decreaseCart(event) {
        if(event._constructed) {
          if(this.food.count) {
            this.food.count--; // 减一
          }
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartControl
    font-size: 0
    .cart-decrease,
    .cart-add
      display: inline-block
      vertical-align: top
      padding: 6px
      font-size: 24px
      color: #00a0dc
    .move-enter-active,
    .move-leave-active
      transition: all .5s linear
    .move-enter,
    .move-leave-to
      opacity: 0
      transform: translate3d(30px, 0, 0) rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      height: 36px
      line-height: 36px
      color: rgb(147, 153, 159)
      text-align: center
      font-size: 10px
    .cart-add
      display: inline-block
</style>
