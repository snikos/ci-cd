<template>
    <div class="btn-toolbar pb-2">
        <div :class="`${windowWidth <= 770 ? '' : 'btn-group-vertical'} btn-group-sm`">
            <button v-for="(hash, index) in arrHash"
                    @click="$emit('searchHash', $event)"
                    :key="hash + index"
                    type="button"
                    class="btn btn-success btn__left"
                    :value="hash"
            >
                {{ $filters.isObject(hash) ? Object.values(hash)[0] : hash }}
                <span class="badge badge-light">{{ allCounter[index] }}</span>
                <span class="sr-only">sr</span>
            </button>
        </div>
    </div>
</template>

<script>

    export default {
        name: "HashTagBlock",
        data() {
            return {
                windowWidth: window.innerWidth,
            }
        },
        props: {
            arrHash: {
                type: Array,
                required: true,
            },
            allCounter: {
                type: Array,
                required: true,
            }
        },
        mounted() {
            window.onresize = () => {
                this.windowWidth = window.innerWidth
            }
        }
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