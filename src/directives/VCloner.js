export default {
  mounted(el, binding) {
    let elParent = el.parentNode;
    let elClone  = el.cloneNode(true);
    elParent.prepend(elClone);
    elClone.classList.add('cloner');

    if (binding.value) {
      elClone.innerHTL = binding.value;
    }

    switch (binding.arg) {
      case 'right':
        elClone.classList.add('cloner-right')
        break;
      case 'left':
        elClone.classList.add('cloner-left')
        break;
      default:
        elClone.classList.add('cloner')
        break;
    }

    if (binding.modifiers.italic) {
      elClone.style.fontStyle = 'italic';
    }
    if (binding.modifiers.bold) {
      elClone.style.fontWeight = 'bold';
    }
  },
  name: 'cloner',
}