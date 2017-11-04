<template>
    <div id="star" :class="startType">
      <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
    </div>
</template>

<script>
  const LENGTH = 5;
  const CLASS_ON = 'on';
  const CLASS_HALF = 'HALF';
  const CLASS_OFF = 'off'
  export default {
    name: 'star',
    data () {
      return {}
    },
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      startType() {
        return 'star-' + this.size
      },
      itemClasses() {
        let result = []
        let score = Math.floor(this.score * 2) / 2; // 评分处理
        let on_num = score >> 0;
        let half_num = (on_num % score) === 0 ? 0 : 1;
        let off_num = LENGTH - on_num - half_num;
        for(let i = 0; i < on_num; i++) {
          result.push(CLASS_ON);
        }
        if(half_num) result.push(CLASS_HALF);
        for(let i = 0; i < off_num; i++) {
          result.push(CLASS_OFF);
        }
        return result;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  #star
    font-size: 0
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        background-size: 20px 20px
        &.on
          bg-img('star48_on')
        &.half
          bg-img('star48_half')
        &.off
          bg-img('star48_off')
        & + .star-item
          margin-left: 22px
    &.star-36
      .star-item
        width: 15px
        height: 15px
        background-size: 15px 15px
        &.on
          bg-img('star36_on')
        &.half
          bg-img('star36_half')
        &.off
          bg-img('star36_off')
        & + .star-item
          margin-left: 16px
    &.star-24
      .star-item
        width: 10px
        height: 10px
        background-size: 10px 10px
        &.on
          bg-img('star24_on')
        &.half
          bg-img('star24_half')
        &.off
          bg-img('star24_off')
        & + .star-item
          margin-left: 3px
</style>
