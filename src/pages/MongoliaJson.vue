<template>
    <div class="row mongolia">
        <h1>Mongolia</h1>
        <div class="col-12">
            <div class="btn-toolbar pb-2">
                <div class="input-group input-group-sm">
                    <div class="input-group-prepend">
                        <div class="input-group-text" id="btnGroupAddon">#</div>
                    </div>
                    <input
                            v-model="searchQuery"
                            type="text"
                            placeholder="Enter word..."
                            aria-label="Input group example"
                            aria-describedby="btnGroupAddon">
                    <div class="input-group-append">
                        <button
                                type="button"
                                class="btn btn-outline-secondary"
                                @click="searchHashButton($event)"
                        >
                            Go!
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-10">
            <ul class="list-group">
                <li
                        class="list-group-item"
                        v-for="({commentText, commentName, commentDate}, idx) in comments"
                        :key="idx"
                >
                    <div>
                        <strong>{{ idx }}</strong> - {{ commentName }} ({{ commentDate }})
                        <p>{{ commentText }}</p>
                    </div>
                </li>
                <li v-show="loading" class="loading">Loading...</li>
            </ul>
            <div class="btn-toolbar justify-content-sm-center mb-3">
                <div class="btn-group btn-group-sm mt-3">
                    <button
                            @click="loadNextComments"
                            type="button"
                            class="btn btn-secondary"
                            :disabled="showCommentsAreDone == 1"
                    >Load {{ comCount }} comments</button>
                    <button
                            @click="loadAllComments"
                            type="button"
                            class="btn btn-secondary ml-3"
                            :disabled="showCommentsAreDone == 1"
                    >Load All comments</button>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-2">
            <HashTagBlock @searchHash="searchHashButton" :arrHash="testHash" />
<!--            <div class="btn-toolbar pb-2">-->
<!--                <div class="btn-group-vertical btn-group-sm">-->
<!--                    <button-->
<!--                            @click="searchHashButton($event)"-->
<!--                            type="button"-->
<!--                            class="btn btn-warning"-->
<!--                            value="охран"-->
<!--                    >охран</button>-->
<!--                    <button-->
<!--                            @click="searchHashButton($event)"-->
<!--                            type="button"-->
<!--                            class="btn btn-warning"-->
<!--                            value="таджик"-->
<!--                    >таджик</button>-->
<!--                </div>-->
<!--            </div>-->
        </div>
    </div>
</template>

<script>
    import mongoliaJson from "@/json/comments-all-complete.json";
    import HashTagBlock from "@/components/HashTagBlock";
    export default {
        name: "MongoliaJson",
        mongol:  mongoliaJson,
        components: {
            //HashTagBlock: () => import ('@/components/HashTagBlock'),
            HashTagBlock,
        },
        data() {
            return {
                loadComments: [],
                comments: [],
                cur: [],
                loading: false,
                showCommentsAreDone: 0,
                nextCount: 0,
                comCount: 100,
                searchQuery: '',
                testHash: ['таджик','ольга','охран'],
            }
        },
        mounted() {
            this.fetchComments();
        },
        methods: {
            async fetchComments() {
                try {
                    setTimeout( async () => {
                        const res = await mongoliaJson;
                        this.loadComments = [...res];
                        this.loadNextComments();
                    }, 500);
                }
                catch (e) {
                    console.log('Error load: ' + e)
                }
            },
            loadAllComments() {
                this.comments = this.loadComments;
                this.showCommentsAreDone = 1;
            },
            loadNextComments() {
                this.loading = true;
                setTimeout( async () => {
                    this.cur = await this.getFirstLoad;
                    this.nextCount += this.comCount;
                    this.comments = [...this.comments, ...this.cur];
                    this.loading = false;
                    if ( this.comments.length >= 800) {
                        this.showCommentsAreDone = 1;
                    }
                }, 1000);
            },
            /*searchHashInput() {
                let search = this.searchComments;
                this.loading = true;
                setTimeout( async () => {
                    this.comments = search;
                    this.loading = false;
                }, 500);
                //console.log('search with input', search);
            },*/
            searchHashButton(event) {
                if (event.target.value) {
                    this.searchQuery = event.target.value;
                }
                let search = this.searchComments;
                this.loading = true;
                setTimeout( async () => {
                    this.comments = search;
                    this.loading = false;
                }, 500);
                //console.log('search with button: ', search);
            },
        },
        computed: {
            getFirstLoad() {
                return [...this.loadComments].filter( (el, i) => {
                    return ( i >= this.nextCount && i < this.nextCount + this.comCount )
                });
            },
            searchComments() {
                return this.loadComments.filter( ({ commentText }) => {
                    return commentText.toLowerCase().includes(this.searchQuery.toLowerCase());
                });
            }
        },
    }
</script>

<style scoped>
    .mongolia {
        text-align: left;
    }
    .loading {
        padding: 1em;
        margin: 0 auto;
        text-align: center;
    }
</style>