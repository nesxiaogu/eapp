<template>
    <div id="detial-title">
      <div class="line"></div>
      <div class="text">{{title}}</div>
      <div class="line"></div>
    </div>
</template>

<script>
  export default {
    name: 'detial-title',
    data () {
      return {}
    },
    props: {
      title: {
        type: String
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #detial-title
    display: flex
    width: 80%
    .line
      flex: 1
      position: relative
      top: -6px
      border-bottom: 1px solid rgba(255, 255, 255, .2)
    .text
      padding: 0 12px
      line-height: 14px
      font-size: 14px
      font-weight: 700
</style>
