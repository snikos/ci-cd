<template>
    <select :model-value="modelValue"
            @change="changeOption"
    >
        <option disaled value="">Select one</option>
        <option v-for="option in options"
                :key="option.value"
                :value="option.value"
        >
            {{ option.name }}
        </option>
    </select>
</template>

<script>
    export default {
        name: "MySelect",
        props: {
            modelValue: {
                type: [String]
            },
            options: {
                type: Array,
                default: () => []
            },
        },
        emits: ["update:modelValue"],
        methods: {
            changeOption(event) {
                this.$emit("update:modelValue", event.target.value);
            },
        },
        computed: {
            localModelValue: {
                get() {
                    return this.modelValue
                },
                set(newValue) {
                    this.$emit('update:modelValue', newValue)
                },
            },
        },
    }
</script>

<style scoped>

</style>