/**
 * Created with Webstorm 2017.2.1
 * User: xiaogu
 * Date: 2017/11/7
 * Time: 18:12
 *
 */

// 存值
export function saveToLocal(id, key, val) {
  let seller = window.localStorage.__seller__;
  if(!seller) { // 没有存过
    seller = {};
    seller[id] = {};
  }else {
    seller = JSON.parse(seller);
    if(!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = val;
  window.localStorage.__seller__ = JSON.stringify(seller);
}

// 取值
export function loadFromLocal(id, key, def) {
  let seller = window.localStorage.__seller__;
  if(!seller) {
    return def;
  }
  seller = JSON.parse(seller);
  if(!seller[id] || !seller[id][key]) {
    return def;
  }
  return seller[id][key];
}
