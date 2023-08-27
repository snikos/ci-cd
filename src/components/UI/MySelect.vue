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
                        title="option.name"
                >
                    {{ idx }}: {{changeWord(option.name)}}
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
            },
            changeWord(word) {
                if ( String(word).match(/[ ]+/g) ) return;
                let x = String(word).match(/[A-Z][a-z]*/g);
                return x.join(' ');
            }
        },
        computed: {
            localModelValue: {
                get() {
                    return this.modelValue
                },
                set(newValue) {
                    this.$emit('update:modelValue', newValue)
                },
            }
        }
    }
</script>

<style scoped>

</style>