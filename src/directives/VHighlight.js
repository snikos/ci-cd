export default {
    mounted(el, binding) {
        el.style.backgroundColor = binding.value ? binding.value : 'dodgerblue';
        el.style.fontStyle = 'italic';
        el.style.fontSize = '24px';
        el.style.textIndent = '1em';
        el.style.padding = '12px';
    },
    name: 'highlight',
}