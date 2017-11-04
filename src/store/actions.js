/**
 * Created with Webstorm 2017.2.1
 * User: xiaogu
 * Date: 2017/10/26
 * Time: 16:37
 *
 */

export default {
  showDetial: ({commit}) => {
    commit('showDetial');
  },
  hideDetial: ({commit}) => {
    commit('hideDetial');
  },
  showFood: ({commit}) => {
    commit('showFood');
  },
  hideFood: ({commit}) => {
    commit('hideFood');
  }
}
