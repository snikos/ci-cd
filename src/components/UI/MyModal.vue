<template>
    <teleport to="#modals">
        <div v-if="showModal"
             @click.stop="toggleModal"
             class="mymodal"
        >
            <div @click.stop
                 class="mymodal-content"
            >
                <b
                        @click.prevent="toggleModal"
                        class="mymodal-close">x</b>
                <slot></slot>
            </div>
        </div>
    </teleport>
</template>

<script>
    export default {
        name: "MyModal",
        props: {
            showModal: {
                type: Boolean,
                required: false,
            }
        },
        methods: {
            toggleModal() {
                this.$emit('update:showModal', false);
            },
        }
    }
</script>

<style scoped>
    .mymodal{
        display: flex;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.5);
        position: fixed;
    }
    .mymodal-content{
        background: #eeeeee;
        margin: auto;
        border-radius: 10px;
        min-height: 50px;
        min-width: 300px;
        width: 420px;
        padding: 20px;
        position: relative;
    }
    .mymodal-close{
        cursor: pointer;
        padding: 2px 10px;
        background-color: rgb(66, 185, 131);
        color: #fff;
        position: absolute;
        top: 1px;
        right: 1px;
        border-radius: 0 9px 0 9px;
        z-index: 1;
    }
</style>