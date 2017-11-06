<template>
  <div class="ratingSelect">
    <div class="rating-type border-1px">
      <span @click="select(2, $event)" class="block positive all" :class="{'active': selectType.type === 2}">
        {{desc.all}}<span class="count">{{ratings.length}}</span>
      </span>
      <span @click="select(0, $event)" class="block positive" :class="{'active': selectType.type === 0}">
        {{desc.positive}}<span class="count">{{positives.length}}</span>
      </span>
      <span @click="select(1, $event)" class="block negative" :class="{'active': selectType.type === 1}">
        {{desc.negative}}<span class="count">{{negatives.length}}</span>
      </span>
    </div>
    <div class="switch">
      <i @click="toggleContent" class="icon-check_circle" :class="{'on': onlyContent.only}"></i>
      <span class="text">只看有内容的评论</span>
    </div>
  </div>
</template>

<script>
  const POSITIVE = 0; // 积极的
  const NEGATIVE = 1; // 消极的
  const ALL = 2;      // 全部
  export default {
    name: 'ratingSelect',
    data () {
      return {
        type: this.selectType, // 选择类型
        only: this.onlyContent // 只看有内容评论
      }
    },
    methods: {
      select(type, event) {
        if(event._constructed) {
          this.selectType.type = type;
          // 发送改变给food组件
          // this.$emit('selectType.change', type);
        }
      },
      toggleContent(event) {
        if(event._constructed) {
          this.onlyContent.only = !this.onlyContent.only;
          // 发送改变给food组件
          // this.$emit('onlyContent.change', this.only);
        }
      }
    },
    computed: {
      positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negatives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    },
    props: {
      ratings: { // 所有评论
        type: Array,
        default() {
          return [];
        }
      },
      selectType: { // 评论类型
        type: Object,
        default() {
          return {
            type: ALL
          }
        }
      },
      onlyContent: { // 是否看只有内容的评论
        type: Object,
        default() {
          return {
            only: false
          }
        }
      },
      desc: {
        type: Object,
        default() { // 评论类型对应的文字
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .ratingSelect
    .rating-type
      padding: 18px 0
      margin: 0 18px
      font-size: 0
      border-1px-bottom(rgba(7, 17, 27, .1))
      .block
        display: inline-block
        margin-right: 12px
        padding: 8px 12px
        line-height: 16px
        font-size: 12px
        color: rgb(77, 85, 93)
        border-radius: 1px
        .count
          font-size: 8px
          margin-left: 2px
        &.active
          color: #fff
        &.positive
          background-color: rgba(0, 160, 200, .2)
          &.active
            background-color: rgb(0, 160, 200)
        &.negative
          background-color: rgba(77, 85, 93, .2)
          &.active
            background-color: rgb(77, 85, 93)
  .switch
    padding: 12px 18px
    color: rgb(147, 153, 159)
    // line-height: 24px
    font-size: 0
    border-bottom: 1px solid rgba(7, 17, 27, .1)
    .icon-check_circle
      font-size: 24px
      line-height: 24px
      &.on
        color: rgb(0, 160, 20)
      &::before
        line-height: 24px
    .text
      display: inline-block
      vertical-align: top
      margin-left: 4px
      line-height: 24px
      font-size: 12px
</style>
