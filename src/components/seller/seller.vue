<template>
    <div id="seller" ref="seller">
      <div class="seller-content">
        <div class="overview">
          <h1 class="title">{{seller.name}}</h1>
          <div class="star-wrapper">
            <v-star :size="36" :score="seller.score"></v-star>
            <span class="text">({{seller.ratingCount}})</span>
            <span class="text">月售{{seller.sellCount}}单</span>
          </div>
          <ul class="remark border-1px">
            <li class="block">
              <h2 class="title">起送价</h2>
              <div class="content">
                <em class="stress">{{seller.minPrice}}</em>
                <span class="unit">元</span>
              </div>
            </li>
            <li class="block">
              <h2 class="title">商家配送</h2>
              <div class="content">
                <em class="stress">{{seller.deliveryPrice}}</em>
                <span class="unit">元</span>
              </div>
            </li>
            <li class="block">
              <h2 class="title">平均配送时间</h2>
              <div class="content">
                <em class="stress">{{seller.deliveryTime}}</em>
                <span class="unit">分钟</span>
              </div>
            </li>
          </ul>
          <div class="favorite" @click="toggleFavorite">
            <i class="icon-favorite" :class="{'favorited': favorite}"></i>
            <div class="text">{{favoriteText}}</div>
          </div>
        </div>
        <v-split></v-split>
        <div class="bulletin">
          <h1 class="title">公告与活动</h1>
          <div class="content-wrapper">
            <p class="content">{{seller.bulletin}}</p>
          </div>
          <ul v-if="seller.supports" class="support">
            <li v-for="item in seller.supports" class="support-item border-1px">
              <span class="icon" :class="imgMap[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
        </div>
        <v-split></v-split>
        <div class="pics">
          <div class="title">商家实景</div>
          <div class="pics-wrapper" ref="picsWrapper">
            <ul class="pics-list" ref="picsList">
              <li class="pics-item" v-for="pic in seller.pics">
                <img width="120" height="90" :src="pic">
              </li>
            </ul>
          </div>
        </div>
        <v-split></v-split>
        <div class="info">
          <div class="title">商家信息</div>
          <ul class="info-item-wrapper">
            <li class="info-item border-1px" v-for="info in seller.infos">{{info}}</li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import star from 'components/star/star'
  import split from 'components/split/split'
  import BScroll from 'better-scroll'
  import {saveToLocal, loadFromLocal} from 'common/js/store'
  export default {
    name: 'seller',
    data () {
      return {
        imgMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        favorite: loadFromLocal(this.seller.id, 'favorite', false)
      };
    },
    methods: {
      toggleFavorite(event) {
        if(event._constructed) {
          this.favorite = !this.favorite;
          saveToLocal(this.seller.id, 'favorite', this.favorite);
        }
      },
      _initScroll() {
        if(this.scroll) {
          this.scroll.refresh();
        }else {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          });
        }
      },
      _initPicScroll() {
        if(this.seller.pics) { // 有商家图片
          if(!this.$refs.picsList.style.width) { // 是否已经计算高度
            // 计算存放图片盒子的宽度
            let picWidth = 120;
            let margin = 6;
            let width = (picWidth + margin) * this.seller.pics.length - 6;
            this.$refs.picsList.style.width = width + 'px';
          }
          if(this.picScroll) {
            this.picScroll.refresh();
          }else {
            this.picScroll = new BScroll(this.$refs.picsWrapper, {
              scrollX: true,
              enterPassthrough: 'vertical'
            });
          }
        }
      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      vStar: star,
      vSplit: split
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏'
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll();
        this._initPicScroll();
      });
      this.Event.$on('ready', () => {
        this.$nextTick(() => {
          this._initScroll();
          this._initPicScroll();
        });
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  #seller
    position: absolute
    top: 174px
    left: 0
    bottom: 0
    width: 100%
    overflow: hidden
    .seller-content
      .overview
        position: relative
        padding: 18px
        > .title
          line-height: 14px
          font-size: 14px
          color: rgb(7, 17, 27)
        .star-wrapper
          margin-top: 8px
          font-size: 0
          #star
            display: inline-block
            vertical-align: top
            margin-right: 8px
          .text
            display: inline-block
            vertical-align: top
            margin-right: 12px
            line-height: 18px
            font-size: 10px
            color: rgb(77, 85, 93)
        .remark
          display: flex
          margin-top: 18px
          padding-top: 18px
          border-1px-top(rgba(7, 17, 27, .1))
          .block
            flex: 1
            text-align: center
            + .block
              border-left: 1px solid rgba(7, 17, 27, .1)
            .title
              line-height: 10px
              font-size: 10px
              color: rgb(147, 153, 159)
            .content
              margin-top: 4px
              font-size: 0
              color: rgb(7, 17, 27)
              .stress
                line-height: 24px
                font-style: normal
                font-size: 24px
              .unit
                font-size: 10px
        // 收藏
        .favorite
          position: absolute
          top: 16px
          right: 16px
          width: 36px
          text-align: center
          font-size: 0
          .icon-favorite
            line-height: 24px
            font-size: 24px
            color: rgb(147, 153, 159)
            &.favorited
              color: rgb(240, 20, 20)
          .text
            margin-top: 4px
            line-height: 10px
            font-size: 10px
            color: rgb(77, 85, 93)
      .bulletin
        padding: 18px 18px 0
        .title
          line-height: 14px
          font-size: 14px
          color: rgb(7, 17, 27)
        .content-wrapper
          margin-top: 8px
          padding-bottom: 16px
          .content
            padding: 0 12px
            line-height: 24px
            font-size: 12px
            color: rgb(240, 20, 20)
        .support
          .support-item
            padding: 16px 12px
            font-size: 0
            border-1px-top(rgba(7, 17, 27, .1))
            .icon
              display: inline-block
              vertical-align: top
              width: 16px
              height: 16px
              background-size: 16px
              background-repeat: no-repeat
              &.decrease
                bg-img('decrease_4')
              &.discount
                bg-img('discount_4')
              &.guarantee
                bg-img('guarantee_4')
              &.invoice
                bg-img('special_4')
              &.special
                bg-img('special_4')
            .text
              display: inline-block
              vertical-align: top
              margin-left: 6px
              line-height: 16px
              font-size: 12px
              color: rgb(7, 17, 27)
      .pics
        padding: 18px 0 18px 18px
        .title
          line-height: 14px
          font-size: 14px
          color: rgb(7, 17, 27)
        .pics-wrapper
          width: 100%
          overflow: hidden
          margin-top: 12px
          font-size: 0
          white-space: nowrap
          .pics-list
            .pics-item
              display: inline-block
              margin-right: 6px
      .info
        padding: 18px 18px 0 18px
        color: rgb(7, 17, 27)
        .title
          line-height: 14px
          font-size: 14px
        .info-item-wrapper
          margin-top: 12px
          .info-item
            padding: 16px 12px
            line-height: 16px
            font-size: 12px
            border-1px-top(rgba(7, 17, 27, .1))
</style>
