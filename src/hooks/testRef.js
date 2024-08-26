import {ref, computed, onMounted, onUpdated, onUnmounted} from "vue";

export function useTestRef(x) {
    const testRef = ref(x);
    const doubleTestRef = computed(() => testRef.value = 'Does that mean the Composition API is superior in every way to Vue’s classic API? No. In most cases you’ll be fine to stick with the classic API. But if you’re planning to reuse code, the Composition API is unquestionably superior.');
    function incrementTestRef(value) {
        testRef.value += value;
    }
    function mount() {
        console.log('composition API - mount');
    }
    function update() {
        console.log('composition API - update');
    }
    function unmount() {
        console.log('composition API - unmount');
    }

    onMounted(mount);
    onUpdated(update);
    onUnmounted(unmount);

    return {
        testRef,
        doubleTestRef,
        incrementTestRef,
    }
}