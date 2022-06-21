<template>
    <div class="row mongolia">
        <h3 class="mongolia__title">Comment analytics</h3>
        <div class="col-12">
            <HashInputBlock
                    v-model.trim="searchQuery"
                    @searchInputQuery="searchHashButton($event)"
                    :stringRepeat="stringRepeat = comments.length"
            />
        </div>
        <div class="col-12 col-md-3">
            <HashTagBlock
                    @searchHash="searchHashButton"
                    :arrHash="arrayHashStrings"
                    :allCounter="allCounter"
            />
        </div>
        <div class="col-12 col-md-9">
            <ListComments
                    :comments="comments"
                    :loading="loading"/>
            <ListCommentsButton
                    @loadNextComments="loadNextComments"
                    @loadAllComments="loadAllComments"
                    :isCheckButton="showCommentsAreDone"
                    :comCount="comCount"
            />
        </div>
    </div>
</template>

<script>
    import mongoliaJson from "@/json/comments-all-complete.json";
    import HashTagBlock from "@/components/HashTagBlock";
    import HashInputBlock from "@/components/HashInputBlock";
    import ListCommentsButton from "@/components/ListCommentsButton";
    import ListComments from "@/components/ListComments";
    export default {
        name: "MongoliaJson",
        mongol:  mongoliaJson,
        components: {
            HashTagBlock,
            HashInputBlock,
            ListCommentsButton,
            ListComments,
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
                arrayHashStrings: [
                    'бурят',
                    'стаж',
                    'врач',
                    'работ',
                    'монгол',
                    'таджик',
                    'учител',
                    'англ',
                    'охран',
                    'вайбер',
                    ['ватсап', 'watsapp'],
                    'viber'
                ],
                stringRepeat: 0,
                allCounter: [],
            }
        },
        mounted() {
            this.fetchComments();
            this.searchHashLength();
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
            searchHashButton(event) {
                if (event.target.value) {
                    this.searchQuery = event.target.value;
                }
                if (this.searchQuery.length <= 1) {
                    console.log('Add text!');
                    return;
                }
                let search = this.searchComments;
                this.loading = true;
                setTimeout( async () => {
                    this.comments = search;
                    this.loading = false;
                }, 500);
                //console.log('search with button: ', search);
            },
            searchHashLength() {
                setTimeout( () => {
                    this.arrayHashStrings.forEach( (word) => {
                        this.searchQuery = (typeof word === 'object') ? Object.values(word)[0] : word;
                        let res = this.searchComments;
                        this.allCounter.push(res.length);
                    });
                }, 3000);
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
                    let x = this.searchQuery;
                    let word = (x.includes(',')) ? x.split(',') : x;
                    return x.includes(',') ? word.find( (txt) => {
                        return commentText.toLowerCase().includes(txt.toLowerCase())
                    }) : commentText.toLowerCase().includes(word.toLowerCase());
                });
            }
        },
    }
</script>

<style scoped>
    .mongolia {
        text-align: left;
    }
    .mongolia__title {
        text-align: center;
        padding: 0 0 1em 0;
        margin: 0 auto;
    }
    .loading {
        padding: 1em;
        margin: 0 auto;
        text-align: center;
    }
</style>