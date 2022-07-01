<template>
    <button v-for="button in buttons"
            :key="button.mtd"
            type="button"
            class="list-group-item list-group-item-action"
            @click="button.mtd"
    >{{button.name}}</button>
</template>

<script>
    export default {
        name: "MySort",
        props: {
            buttons: {
                type: Array,
                required: true,
            }
        },
    }
</script>

<style scoped>

</style>