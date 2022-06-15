<template>
    <div class="mongolia">
        <h1>Mongolia</h1>
        <div class="btn-toolbar pb-2">
            <div class="btn-group-sm">
                <button @click="searchHash" type="button" class="btn btn-warning">Search Hash</button>
            </div>
            <div class="input-group">
                <div class="input-group-prepend">
                    <div class="input-group-text" id="btnGroupAddon">#</div>
                </div>
                <input v-model="searchQuery" type="text" placeholder="Enter word..." aria-label="Input group example" aria-describedby="btnGroupAddon">
            </div>
        </div>
        <ul class="row list-group">
            <li
                    class="col-12 list-group-item"
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
                <button @click="loadNextComments" type="button" class="btn btn-secondary">Load 10 comments</button>
                <button @click="loadAllComments" type="button" class="btn btn-secondary ml-3">Load All comments</button>
            </div>
        </div>
    </div>
</template>

<script>
    import mongoliaJson from "@/json/comments-all-complete.json";
    export default {
        name: "MongoliaJson",
        mongol:  mongoliaJson,
        data() {
            return {
                loadComments: [],
                comments: [],
                cur: [],
                loading: false,
                nextCount: 0,
                searchQuery: '',
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
                    }, 1000);
                }
                catch (e) {
                    console.log('Error load: ' + e)
                }
            },
            loadAllComments() {
                this.comments = this.loadComments;
            },
            loadNextComments() {
                this.loading = true;
                setTimeout( async () => {
                    this.cur = await this.getFirstLoad;
                    this.nextCount += 5;
                    this.comments = [...this.comments, ...this.cur];
                    this.loading = false;
                }, 1000);
            },
            searchHash() {
                let search = this.searchComments;
                this.loading = true;
                setTimeout( async () => {
                    this.comments = search;
                    this.loading = false;
                }, 1000);
                console.log(search);
            },
        },
        computed: {
            getFirstLoad() {
                return [...this.loadComments].filter( (el, i) => {
                    return ( i >= this.nextCount && i < this.nextCount+9 )
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