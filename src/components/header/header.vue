<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}} / {{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="imgMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetial">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetial">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="">
    </div>
    <transition name="fade">
      <div v-show="isDetial" class="detial">
        <!--清除浮动里面的伪类的字体撑大了盒子detial盒子-->
        <div class="detial-wrapper clearfix">
          <div class="detial-main">
            <h1 class="name">{{seller.name}}</h1>
            <v-star :size="48" :score="seller.score" class="star-wrapper"></v-star>
            <!--<div class="title">-->
            <!--<div class="line"></div>-->
            <!--<div class="text">优惠信息</div>-->
            <!--<div class="line"></div>-->
            <!--</div>-->
            <v-detialTitle :title="'优惠信息'" class="title"></v-detialTitle>
            <ul v-if="seller.supports" class="support">
              <li v-for="(item, index) in seller.supports" class="support-item">
                <span class="icon" :class="imgMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <v-detialTitle :title="'商家公告'" class="title"></v-detialTitle>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detial-close" @click="hideDetial">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import star from 'components/star/star.vue'
  import detialTitle from 'components/detial-title/detial-title'
  export default {
    data () {
      return {
        imgMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      };
    },
    computed: mapGetters([
      'isDetial'
    ]),
    methods: mapActions([
      'showDetial',
      'hideDetial'
    ]),
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      'v-star': star,
      'v-detialTitle': detialTitle
    }
  };
</script>
<!--stylus 需要两个模块 stylus stylus-loader-->
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .header
    position: relative
    background-color: rgba(7, 17, 27, .5)
    color: #fff
    .content-wrapper
      position: relative
      padding: 24px 16px 18px 24px
      font-size: 0
      .avatar
        display: inline-block
        img
          border-radius: 2px
      .content
        display: inline-block
        vertical-align: top
        margin-left: 16px
        .title
          margin: 2px 0 8px 0
          font-size: 0
          .brand
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            bg-img('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            margin-left: 6px
            font-size: 16px
            font-weight: bold
            line-height: 18px
        .description
          margin-bottom: 10px
          font-size: 12px
          line-height: 12px
        .support
          font-size: 0
          .icon
            display: inline-block
            vertical-align: middle
            width: 12px
            height: 12px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-img('decrease_1')
            &.discount
              bg-img('discount_1')
            &.guarantee
              bg-img('guarantee_1')
            &.invoice
              bg-img('invoice_1')
            &.special
              bg-img('special_1')
          .text
            display: inline-block
            vertical-align: middle
            margin-left: 4px
            line-height: normal
            font-size: 10px
      .support-count
        position: absolute
        right: 12px
        bottom: 18px
        padding: 0 8px
        line-height: 24px
        height: 24px
        border-radius: 7px
        background-color: rgba(0, 0, 0, .2)
        text-align: center;
        .count
          display: inline-block
          vertical-align: middle
          line-height: normal
          font-size: 10px
        .icon-keyboard_arrow_right
          display: inline-block
          vertical-align: middle
          margin-left: 2px
          line-height: normal
          font-size: 10px
    .bulletin-wrapper
      display: flex
      align-items: center
      padding: 0 12px
      line-height: normal
      height: 28px
      font-size: 0
      background-color: rgba(7, 17, 27, .2)
      .bulletin-title
        width: 22px
        height: 12px
        bg-img('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        flex: 1
        margin-left: 4px
        font-size: 10px
        white-space: nowrap
        /*flex布局如果有一个盒子里面的内容超过了分到的宽度或高度会影响其他盒子的大小，一般可以给该盒子设置overflow: hidden*/
        overflow: hidden
        text-overflow: ellipsis
      .icon-keyboard_arrow_right
        width: 10px
        line-height: 28px
        font-size: 10px
        text-align: left
    .background
      overflow: hidden
      position: absolute
      z-index: -1
      top: 0
      left: 0
      width: 100%
      height: 100%
      img
        width: 100%
        filter: blur(10px)
    .detial
      position: fixed
      z-index: 100
      top: 0
      left: 0
      width: 100%
      height: 100%
      overflow: auto
      -webkit-backdrop-filter: blur(10px)
      background-color: rgba(7, 17, 27, .8)
      // filter: blur(10px)
      .detial-wrapper
        display: inline-block
        width: 100%
        min-height: 100%
        .detial-main
          margin-top: 64px
          padding-bottom: 64px
          .name
            line-height: 16px
            font-size: 16px
            font-weight: 700
            text-align: center
          .star-wrapper
            margin-top: 16px
            padding: 2px 0
            text-align: center
          .title
            margin: 28px auto 0
          .support
            width: 80%
            margin: 24px auto 0
            font-size: 0
            .support-item
              margin: 0 12px
              & + .support-item
                margin-top: 12px
              .icon
                display: inline-block
                vertical-align: top
                width: 16px
                height: 16px
                background-size: 16px 16px
                background-repeat: no-repeat
                &.decrease
                  bg-img('decrease_2')
                &.discount
                  bg-img('discount_2')
                &.guarantee
                  bg-img('guarantee_2')
                &.invoice
                  bg-img('invoice_2')
                &.special
                  bg-img('special_2')
              .text
                margin-left: 6px
                line-height: 16px
                font-size: 12px
          .bulletin
            width: 80%
            margin: 24px auto 0
            .content
              padding: 0 12px
              line-height: 24px
              font-size: 12px
      .detial-close
        position: relative
        margin-top: -64px
        height: 32px
        font-size: 32px
        clear: both
        text-align: center
        color: rgba(255, 255, 255, .5)
  // 动画
  .fade-enter-active,
  .fade-leave-active
    transition: opacity .5s
  .fade-enter,
  .fade-leave-to
    opacity: 0
</style>
