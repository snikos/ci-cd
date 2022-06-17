<template>
    <div class="btn-toolbar pb-2">
        <div class="btn-group-vertical btn-group-sm">
<!--            <button v-for="(hash, index) in arrHash"-->
<!--                    @click="$emit('searchHash', $event)"-->
<!--                    :key="hash + index"-->
<!--                    type="button"-->
<!--                    class="btn btn-success btn__left"-->
<!--                    :value="hash"-->
<!--            >{{hash}}</button>-->
            <button v-for="(hash, index) in arrHash"
                    @click="$emit('searchHash', $event)"
                    :key="hash + index"
                    type="button"
                    class="btn btn-success btn__left"
                    :value="hash"
            >{{hash}}</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HashTagBlock",
        props: {
            arrHash: {
                type: Array,
                required: true,
            }
        },
    }
</script>

<style scoped>
    .btn__left {
        text-align: left;
    }
    .btn__left:before {
        content: '#';
        background-color: inherit;
        color: inherit;
        padding: 0 6px 0 0;
    }
</style>