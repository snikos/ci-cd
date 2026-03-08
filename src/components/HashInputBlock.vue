<template>
    <form class="btn-toolbar pb-2 novalidate">
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
                aria-describedby="btnGroupAddon"
                required />
            <div class="input-group-append">
                <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="$emit('searchInputQuery', $event)"
                >Go!</button>
            </div>
            <div class="input-group-append">
                <div class="input-group-text">Overlap: {{stringRepeat}}</div>
            </div>
        </div>
        <div v-show="validSearch" class="myinvalid-feedback">Add text and type button Go!</div>
    </form>
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
            validSearch: {
                type: Boolean,
                required: true,
            }
        },
        methods: {
            searchHashStr(event) {
                this.$emit('update:modelValue', event.target.value)
            }
        },
    }
</script>

<style scoped>
.myvalid-feedback{
    width: 100%;
    margin-top: 0.25rem;
    font-size: 80%;
    color: rgb(40 167 69);
    padding-left: 30px;
}
.myinvalid-feedback{
    margin-top: 0.25rem;
    font-size: 80%;
    color: rgb(220 53 69);
    padding-left: 30px;
}
</style>