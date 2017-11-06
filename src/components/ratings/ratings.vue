<template>
  <div id="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper wrapper">
            <span class="title">服务态度</span>
            <v-star :size="36" :score="seller.serviceScore"></v-star>
            <div class="score-count">{{seller.serviceScore}}</div>
          </div>
          <div class="score-wrapper wrapper">
            <span class="title">商品评分</span>
            <v-star :size="36" :score="seller.foodScore"></v-star>
            <span class="score-count">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <!--分割线-->
      <v-split></v-split>
      <v-ratingSelect
        :select-type="selectType"
        :only-content="onlyContent"
        :desc="desc"
        :ratings="ratings"
      >
      </v-ratingSelect>
      <div class="rating-wrapper">
        <ul>
          <li v-show="needShow(rating.rateType, rating.text)" v-for="rating in ratings" class="rating-item border-1px">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h2 class="name">{{rating.username}}</h2>
              <div class="star-wrapper">
                <v-star :size="24" :score="rating.score"></v-star>
                <span class="deliveryTime" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <i class="icon-thumb_up"></i>
                <span class="recommend-item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatTime('yyyy-MM-dd hh:ss')}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import star from 'components/star/star.vue';
  import split from 'components/split/split';
  import ratingSelect from 'components/ratingSelect/ratingSelect';
  import BScroll from 'better-scroll'
  const ALL = 2;
  const ERR_OK = 0;
  export default {
    name: 'ratings',
    data () {
      return {
        selectType: {
          type: ALL
        },
        onlyContent: {
          only: false
        },
        desc: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        },
        ratings: []
      };
    },
    methods: {
      needShow(type, text) { // 处理显示的评论的类别
        if(this.onlyContent.only && !text) { // 只显示有评论的并且评论为空
          return false;
        }
        if(this.selectType.type === ALL) { // 显示所有
          return true;
        }else {
          return type === this.selectType.type;
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
      vSplit: split,
      vRatingSelect: ratingSelect
    },
    created() {
      this.$http.get('api/ratings').then((response) => {
        if(response.data.errno === ERR_OK) {
          this.ratings = response.data.data;
          // 数据更新之后调用$nextTick方法等dom更新完毕初始化better-scroll
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            });
          });
        }
      });
    },
    watch: { // 监视属性改变
      selectType: {
        deep: true,
        handler() {
          // 重新计算better-scroll高度
          this.$nextTick(() => {
            this.scroll.refresh();
          });
        }
      },
      onlyContent: {
        deep: true, // 深度监视 用于监视json对象 如果不深度监视市监视不到json数据的改变
        handler() {
          // 重新计算better-scroll高度
          this.$nextTick(() => {
            this.scroll.refresh();
          });
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  #ratings
    position: absolute
    top: 174px
    left: 0
    bottom: 0
    overflow: hidden
    width: 100%
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        width: 137px
        padding: 6px 0
        text-align: center
        border-right: 1px solid rgba(7, 17, 27, .1)
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          line-height: 28px
          font-size: 24px
          color: rgb(255, 153, 0)
        .title
          margin-top: 6px
          line-height: 12px
          font-size: 12px
          color: rgb(7, 17, 27)
        .rank
          margin-top: 8px
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          font-size: 0
          .title
            display: inline-block
            vertical-align: top
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)
          #star
            display: inline-block
            vertical-align: top
            margin: 0 12px
          .score-count
            display: inline-block
            vertical-align: top
            line-height: 18px
            font-size: 12px
            color: rgb(255, 153, 0)
        .delivery-wrapper
          .title
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)
          .delivery
            margin-left: 12px
            line-height: 18px
            font-size: 12px
            color: rgb(147, 153, 159)
        .wrapper + .wrapper
          margin-top: 8px
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        border-1px-bottom(rgba(7, 17, 27, .1))
        .avatar
          flex: 0 0 28px
          width: 28px
          img
            border-radius: 50%
        .content
          position: relative
          flex: 1
          margin-left: 12px
          .name
            line-height: 12px
            font-size: 10px
            color: rgb(7, 17, 27)
          .star-wrapper
            margin-top: 4px
            font-size: 0
            #star
              display: inline-block
              vertical-align: top
            .deliveryTime
              display: inline-block
              vertical-align: top
              margin-left: 6px
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
          .text
            margin-top: 6px
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)
          .recommend
            margin-top: 8px
            font-size: 0
            .icon-thumb_up,
            .recommend-item
              display: inline-block
              vertical-align: top
              font-size: 9px
              line-height: 16px
            .icon-thumb_up
              margin-right: 8px
              color: rgb(0, 160, 220)
            .recommend-item
              padding: 0 6px
              margin: 0 8px 8px 0
              color: rgb(147, 153, 159)
              border: 1px solid rgba(7, 17, 27, .1)
          .time
            position: absolute
            top: 0
            right: 0
            font-size: 10px
            line-height: 12px
            color: rgb(147, 153, 159)
</style>
