import getColorByType from '../helpers/getColorByType';

export default (el: HTMLElement, name: any) => {
  const color = getColorByType(name.value);
  el.style.setProperty('color', color);
};
