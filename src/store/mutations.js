/**
 * Created with Webstorm 2017.2.1
 * User: xiaogu
 * Date: 2017/10/26
 * Time: 16:37
 *
 */

export default {
  showDetial: (state) => {
    state.isDetial = true;
  },
  hideDetial: (state) => {
    state.isDetial = false;
  },
  showFood: (state) => {
    state.foodShow = true;
  },
  hideFood: (state) => {
    state.foodShow = false;
  }
}
