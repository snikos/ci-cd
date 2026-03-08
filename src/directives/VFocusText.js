export default {
  mounted(el, binding) {
    const mods = ['primary','secondary','success','danger','warning','info','light','dark'];
    let styleClass = '';
    let objMods = Object.keys(binding.modifiers);

    switch (binding.arg) {
      case 'badge':
        styleClass += 'badge';
        break;
      case 'super-set':
        styleClass += 'btn';
        break;
      default:
        styleClass += '';
        break;
    }

    // rounded-pill

    if (objMods.length < 1) return;
    let checkMods = objMods.filter(item => {
      item = item.split('-').length > 0 ? item.split('-')[1] : item;
      let x = mods.includes(item);
      if ( x ) {
        return []
      }
      return mods.includes(item);
    });

    checkMods.forEach(item => styleClass += ' '+item);

    if (binding.modifiers.round) {
      styleClass += ' rounded-pill';
    }

    if (binding.value) {
      let keys = (binding.value).toUpperCase().replace(/,/g, '|');
      let str = (el.textContent);
      let rx = new RegExp(`${keys}`, 'gi');
      str = str.replace(rx, (w) => `<strong class="${styleClass}">${w}</strong>`);
      el.innerHTML = str;
    }
  },
  name: 'focusText'
}