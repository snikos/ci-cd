<template>
    <div class="btn-toolbar pb-2">
        <div class="input-group input-group-sm">
            <div class="input-group-prepend">
                <div class="input-group-text" id="btnGroupAddon">#</div>
            </div>
            <input
                    :value="modelValue"
                    @input="searchHashStr"
                    type="text"
                    placeholder="Enter word..."
                    aria-label="Input group example"
                    aria-describedby="btnGroupAddon">
            <div class="input-group-append">
                <button
                        type="button"
                        class="btn btn-outline-secondary"
                        @click="$emit('searchInputQuery', $event)"
                >
                    Go!
                </button>
            </div>
            <div class="input-group-append">
                <div class="input-group-text">
                    String repeats: {{stringRepeat}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HashInputBlock",
        props: {
            modelValue: {
                type: [String, Number],
            },
            stringRepeat: {
                type: [String, Number],
                default: 0,
            },
        },
        methods: {
            searchHashStr(event) {
                this.$emit('update:modelValue', event.target.value)
            }
        },
    }
</script>

<style scoped>

</style>