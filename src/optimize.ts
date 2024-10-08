/**
 * @description 优化相关
 */
import { FunctionType } from './types/common';

/**
 * @description 节流函数
 * 使用示例 throttle(test,200,true)(data),data为传递给test函数的参数，对应下面的args
 * @param callback
 * @param time
 * @param immediate
 */
const throttle = function (
  callback: FunctionType,
  time: number,
  immediate = false
) {
  if (immediate) {
    let prevTime = 0;

    return function (...args: any) {
      const nowTime = Date.now();

      if (nowTime - prevTime >= time) {
        callback.apply(this, args);
        prevTime = nowTime;
      }
    };
  } else {
    let timer: number | null = null;

    return function (...args: any) {
      if (!timer) {
        timer = setTimeout(() => {
          callback.apply(this, args);
          timer = null;
        }, time);
      }
    };
  }
};

/**
 * @description 防抖函数
 * @param callback
 * @param time
 * @param immediate
 */
const debounce = (callback: FunctionType, time: number, immediate = false) => {
  let timer: number | null = null;

  return function (...args: any) {
    if (timer) clearTimeout(timer);

    if (immediate) {
      if (!timer) callback.apply(this, args);

      timer = setTimeout(() => {
        timer = null;
      }, time);
    } else {
      timer = setTimeout(() => {
        callback.apply(this, args);
      }, time);
    }
  };
};

export { throttle, debounce };

export default {
  throttle,
  debounce
};
