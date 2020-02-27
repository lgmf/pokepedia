/* eslint-disable prefer-rest-params */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
export default function Debounce(wait: number) {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    let timeout: any;
    const originalMethod = descriptor.value;
    descriptor.value = function () {
      const context = this;
      const args = arguments;
      const later = function () {
        timeout = null;
        originalMethod.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
    return descriptor;
  };
}
