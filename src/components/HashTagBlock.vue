<template>
    <div class="btn-toolbar pb-2">
        <div class="btn-group-vertical btn-group-sm">
<!--            <button-->
<!--                    @click="$emit('searchHash', $event)"-->
<!--                    type="button"-->
<!--                    class="btn btn-warning"-->
<!--                    value="охран"-->
<!--            >охран</button>-->
            <button v-for="(hash, index) in arrHash"
                    @click="$emit('searchHash', $event)"
                    :key="hash + index"
                    type="button"
                    class="btn btn-success"
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

</style>