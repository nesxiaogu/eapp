<template>
  <transition name="slider">
    <div class="food" v-show="foodShow" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hideFood">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="name">{{food.name}}</h1>
          <div class="detial">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="newPrice">&yen;{{food.price}}</span>
            <span class="oldPrice" v-if="food.oldPrice">&yen;{{food.oldPrice}}</span>
          </div>
          <transition name="fade">
            <div class="cartControl-wrapper">
              <v-cartControl :food="food"></v-cartControl>
            </div>
          </transition>
          <transition name="fade">
            <div class="buy" v-show="!food.count" @click="addFirst">加入购物车</div>
          </transition>
        </div>
        <v-split v-show="food.info"></v-split>
        <!--商家介绍-->
        <div class="info" v-show="food.info">
          <div class="title">商家介绍</div>
          <div class="content">{{food.info}}</div>
        </div>
        <v-split></v-split>
        <div class="rating">
          <div class="title">商品评价</div>
          <v-ratingSelect></v-ratingSelect>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import BScroll from 'better-scroll'
  import cartControl from '../cartControl/cartControl.vue'
  import Vue from 'vue'
  import split from '../split/split.vue'
  import ratingSelect from '../ratingSelect/ratingSelect.vue'
  export default {
    data () {
      return {}
    },
    computed: mapGetters([
      'foodShow'
    ]),
    methods: {
      ...mapActions([
      'showFood',
      'hideFood'
      ]),
      show() {
        this.showFood();
        this.$nextTick(() => {
          if(this.scroll) {
            this.scroll.refresh();
          }else {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          }
        });
      },
      addFirst(event) {
        if(event._constructed) {
          this.Event.$emit('cart.add', event.target);
          Vue.set(this.food, 'count', 1);
        }
      }
    },
    props: {
      food: {
        type: Object
      }
    },
    created() {
      this.Event.$emit('show', this.show);
    },
    components: {
      vCartControl: cartControl,
      vSplit: split,
      vRatingSelect: ratingSelect
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .food
    position: fixed
    top: 0
    left: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background-color: #fff
    transform: translate3d(0, 0, 0)
    &.slider-enter-active,
    &.slider-leave-active
      transition: all .4s linear
    &.slider-enter,
    &.slider-leave-to
      transform: translate3d(100%, 0, 0)
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 0
        left: 0
        .icon-arrow_lift
          display: block
          font-size: 16px
          color: #fff
          padding: 18px
    .content
      position: relative
      padding: 18px
      .name
        line-height: 14px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detial
        height: 10px
        margin-top: 8px
        line-height: 10px
        font-size: 0
        color: rgb(147, 153, 159)
        .sell-count,
        .rating
          line-height: 10px
          font-size: 10px
        .rating
          margin-left: 12px
      .price
        margin-top: 18px
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
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        height: 24px
        padding: 0 12px
        line-height: 24px
        font-size: 10px
        color: #fff
        border-radius: 12px
        background-color: rgb(0, 160, 220)
      .fade-enter-active,
      .fade-leave-active
        transition: all .5s
      .fade-enter,
      .fade-leave-to
        opacity: 0
    .info
      padding: 18px
      .title
        font-size: 14px
        line-height: 14px
        color: rgb(7, 17, 27)
      .content
        margin-top: 6px
        padding: 0 8px
        line-height: 24px
        font-size: 12px
        color: rgb(77, 85, 93)
    .rating
      padding: 18px
      .title
        color: rgb(7, 17, 27)
        font-size: 14px
        line-height: 14px
</style>
