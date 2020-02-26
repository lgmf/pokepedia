import getColorByType from "../helpers/getColorByType";

export default (el: HTMLElement, binding: any) => {
  const color = getColorByType(binding.value);
  el.style.setProperty("color", color);
};
