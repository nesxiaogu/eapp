<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <router-link to="/goods" tag="div" class="tab-item">商品</router-link>
      <router-link to="/ratings" tag="div" class="tab-item">评价</router-link>
      <router-link to="/seller" tag="div" class="tab-item">商家</router-link>
    </div>
    <keep-alive>
      <router-view class="content" :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import header from './components/header/header.vue';
  import {urlParse} from './common/js/util'

  const ERR_NO = 0;

  export default {
    name: 'app',
    components: {
      'v-header': header
    },
    data() {
      return {
        seller: {
          id: (() => {
            let queryParams = urlParse();
            return queryParams.id;
          })()
        }
      };
    },
    created() {
      this.$http.get('/api/seller').then((response) => { // 头部商家数据获取
        if(response.data.errno === ERR_NO) {
          // this.seller = response.data.data;
          this.seller = Object.assign({}, this.seller, response.data.data);
          this.$nextTick(() => {
            this.Event.$emit('ready', '完成了');
          });
        }
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import 'common/stylus/mixin.styl'
  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      text-align: center
      border-1px-bottom(rgba(7, 17, 27, 0.1))
      z-index: 1
      background-color: #fff
      .tab-item
        flex: 1
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
</style>
