<template>
    <form>
        <div class="form-group">
            <select :model-value="modelValue"
                    @change="changeOption"
                    class="form-control"
            >
                <option disaled value="">Select one</option>
                <option v-for="(option, idx) in options"
                        :key="option.value"
                        :value="option.value"
                        :selected="modelValue === option.value"
                        :title="option.name"
                >
                    {{ idx }}: {{option.name}}
                </option>
            </select>
        </div>
    </form>
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
            }
        },
        computed: {
            localModelValue: {
                get() {
                    return this.modelValue
                },
                set(newValue) {
                    this.$emit('update:modelValue', newValue);
                },
            }
        }
    }
</script>

<style scoped>

</style>