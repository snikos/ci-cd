export default {
  mounted(el, binding) {
    const { color, bgColor } = binding.value;
    el.style.color = color;
    el.style.backgroundColor = bgColor;
  },
  name: 'test'
}