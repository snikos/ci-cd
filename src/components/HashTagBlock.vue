<template>
    <div class="btn-toolbar pb-2">
        <div :class="`${windowWidth <= 770 ? '' : 'btn-group-vertical'} btn-group-sm`">
            <button type="button"
                    @click="$emit('loadAllComments')"
                    :class="'btn btn__left btn-warning'"
                    :value="allComm"
            >
                {{allComm}}
                <span class="badge badge-light">{{ allCommLength }}</span>
                <span class="sr-only">sr</span>
            </button>
            <button v-for="(hash, key) in rewriteArrHash"
                    @click="$emit('searchHash', $event)"
                    :key="hash + key"
                    type="button"
                    :class="'btn btn__left ' + (hash === activeValue ? 'btn-active' : 'btn-success')"
                    :value="hash"
            >
                {{ $filters.isObject(hash) ? Object.values(hash)[0] : hash }}
                <span class="badge badge-light">{{ allCounter[key] }}</span>
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
                allComm: 'All comments',
                windowWidth: window.innerWidth,
            }
        },
        props: {
            arrHash: {
                type: Array,
                required: true,
            },
            activeValue: {
                type: [String, Number],
                required: true,
            },
            allCounter: {
                type: Object,
                required: true,
            },
            allCommLength: {
                type: [String, Number],
                required: true,
            }
        },
        mounted() {
            window.onresize = () => {
                this.windowWidth = window.innerWidth
            }
        },
        computed: {
            rewriteArrHash() {
                return this.arrHash.map( (hash) => {
                    return (typeof hash === 'object') ? Object.values(hash)[0] : hash;
                });
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