<template>
    <teleport to="#modals">
        <div v-if="showModal"
             @click.stop="toggleModal"
             class="mymodal"
        >
            <div @click.stop
                 class="mymodal-content"
            >
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
    }
</style>