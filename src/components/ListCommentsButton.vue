<template>
    <div v-if="isCheckButton !== 1"
        class="btn-toolbar justify-content-center mb-5">
        <div class="btn-group btn-group-sm mt-3">
            <button
                    @click="$emit('loadNextComments')"
                    type="button"
                    class="btn btn-secondary"
                    :disabled="isCheckButton == 1"
            >Load {{ comCount }} comments</button>
            <button
                    @click="$emit('loadAllComments')"
                    type="button"
                    class="btn btn-secondary ml-3"
                    :disabled="isCheckButton == 1"
            >Load All comments</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ListCommentsBlock",
        props: {
            isCheckButton: {
                type: Number,
                required: true,
            },
            comCount: {
                type: Number,
                required: true,
                default: 10,
            }
        }
    }
</script>

<style scoped>

</style>