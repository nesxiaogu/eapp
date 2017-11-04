<template>
  <div class="ratingSelect">
    <div class="rating-type">
      <span class="all">{{desc.all}}</span>
      <span class="positive">{{desc.positive}}</span>
      <span class="negative">{{desc.nagative}}</span>
    </div>
    <div class="switch">
      <i class="icon-check_circle"></i>
      <span class="text">只看有内容的评论</span>
    </div>
  </div>
</template>

<script>
  const POSITIVE = 0; // 积极的
  const NEGATIVE = 1; // 消极的
  const ALL = 2;
  export default {
    name: 'ratingSelect',
    data () {
      return {}
    },
    props: {
      ratings: { // 所有评论
        type: Array,
        default() {
          return [];
        }
      },
      selectType: { // 评论类型
        type: Number,
        default: ALL
      },
      onlyContent: { // 是否看只有内容的评论
        type: Boolean,
        default: false
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

</style>
