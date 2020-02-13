/* eslint-disable prefer-rest-params */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
export default function Debounce(wait:number, immediate:boolean = false) {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    let timeout:any;
    const originalMethod = descriptor.value;
    descriptor.value = function () {
      const context = this;
      const args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) originalMethod.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) originalMethod.apply(context, args);
    };
    return descriptor;
  };
}
