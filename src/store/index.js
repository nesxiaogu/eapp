/**
 * Created with Webstorm 2017.2.1
 * User: xiaogu
 * Date: 2017/10/26
 * Time: 16:37
 *
 */

import Vue from 'vue';
import Vuex from 'vuex';

import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
});
