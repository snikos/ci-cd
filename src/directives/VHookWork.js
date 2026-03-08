export default {
  created(el, binding, vNode) {
    console.log('created');
    console.log('Element:');
    console.log(el);
    console.log('Binding:');
    console.log(binding);
    console.log('vNode:');
    console.log(vNode);
  },
  mounted(el, binding, vNode) {
    console.log('mounted');
    console.log('Element:');
    console.log(el);
    console.log('Binding:');
    console.log(binding);
    console.log('vNode:');
    console.log(vNode);
  },
  beforeUpdate(el, binding, vNode, prevNode) {
    console.log('beforeUpdate');
    console.log('Element:');
    console.log(el);
    console.log('Binding:');
    console.log(binding);
    console.log('vNode:');
    console.log(vNode);
    console.log('prevNode:');
    console.log(prevNode);
  },
  updated(el, binding, vNode, prevNode) {
    console.log('updated');
    console.log('Element:');
    console.log(el);
    console.log('Binding:');
    console.log(binding);
    console.log('vNode:');
    console.log(vNode);
    console.log('prevNode:');
    console.log(prevNode);
  },
  beforeUnmount(el, binding, vNode) {
    console.log('beforeUnmount');
    console.log('Element:');
    console.log(el);
    console.log('Binding:');
    console.log(binding);
    console.log('vNode:');
    console.log(vNode);
  },
  unmounted(el, binding, vNode) {
    console.log('unmounted');
    console.log('Element:');
    console.log(el);
    console.log('Binding:');
    console.log(binding);
    console.log('vNode:');
    console.log(vNode);
  },
  name: 'hookWork'
}