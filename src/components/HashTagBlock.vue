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
            <button 
                v-for="(key, count) in showHashWord"
                @click="$emit('searchHash', $event)"
                :key="key+'_'+count"
                type="button"
                :class="'btn btn__left ' + (key[0] === activeValue ? 'btn-active' : 'btn-success')"
                :value="key[0]">
                {{ key[0].length ? (key[0]).split(",")[0] : key[0]  }}
                <span class="badge badge-light">{{key[1]}}</span>
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
            allCounterWord: {
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
            showHashWord() {
                return Object.entries(this.allCounterWord).filter((el) => {
                    if ( this.arrHash.find((item) => item === el[0]) && Number(el[1]) > 0) return el
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