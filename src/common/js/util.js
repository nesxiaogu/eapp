/**
 * Created with Webstorm 2017.2.1
 * User: xiaogu
 * Date: 2017/11/7
 * Time: 16:48
 *
 */

/*
* 处理url参数
* @example ?a=ccc&id=123456
* @return Object {a:ccc, id=123456}
* */

export function urlParse() {
  let url = window.location.search;
  let obj = {};

  if(url) { // 没有参数直接返回空对象
    let reg = /[?&][^?&]+=[^?&]*/g
    let arr = url.match(reg);
    // [?a=ccc, &id=123456]
    arr.forEach((arrItem) => {
      let temArr = arrItem.substr(1).split('=');
      let key = decodeURIComponent(temArr[0]);
      let val = temArr[1] ? decodeURIComponent(temArr[1]) : null;
      obj[key] = val;
    });
  }

  return obj;
}
