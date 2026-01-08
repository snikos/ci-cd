<template>
    <div class="row jobMigration">
        <h3 class="jobMigration__title"><span class="battle">Battle of Comments:</span> {{ currentCountry }}</h3>
        <div class="col-12">
            <div class="row">
                <div class="col-12 col-sm-8">
                    <HashInputBlock
                            v-model.trim="searchQuery"
                            @searchInputQuery="searchHashButton($event)"
                            :stringRepeat="stringRepeat = comments.length"
                    />
                </div>
                <div class="col-12 col-sm-4">
                    <MySelect
                            v-model="selectedCountry"
                            :options="sortOptions"
                            @change="countrySelect" />
                </div>
            </div>
        </div>
        <div class="col-12 col-md-3">
            <HashTagBlock
                    @loadAllComments="loadAllComments"
                    @searchHash="searchHashButton"
                    :arrHash="currentHashCollection"
                    :activeValue="searchQuery"
                    :allCounterWord="allCounterWord"
                    :allCommLength="getAllCommentsLength"
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
    import Axios from "axios";
    import MySelect from "@/components/UI/MySelect";
    import HashTagBlock from "@/components/HashTagBlock";
    import HashInputBlock from "@/components/HashInputBlock";
    import ListCommentsButton from "@/components/ListCommentsButton";
    import ListComments from "@/components/ListComments";
    export default {
        name: "MigrationJobJson",
        props: ["jsonLocation"],
        components: {
            HashTagBlock,
            HashInputBlock,
            ListCommentsButton,
            ListComments,
            MySelect,
        },
        data() {
            return {
                loadComments: [],
                comments: [],
                cur: [],
                loading: false,
                showCommentsAreDone: 0,
                nextCount: 0,
                comCount: 10,//100
                arrayHashStrings: [],
                searchQuery: '',
                searchQueryTemp: '',
                stringRepeat: 0,
                allCounterWord: {},
                selectedCountry: "rabota-v-mongolii",
                sortOptions: [],
            }
        },
        mounted() {
            this.loading = true;
            this.fetchSortOptions();
            setTimeout( () => {
                this.fetchHashCountries(this.selectedCountry);
                //this.fetchComments(this.selectedCountry);
                //console.log(this.selectedCountry)
            }, 10)
        },
        methods: {
            countrySelect() {
                this.searchQuery = '';
                this.fetchHashCountries(this.selectedCountry);
                //this.fetchComments(this.selectedCountry);
            },
            async fetchSortOptions() {
                try {
                    await Axios.get('../options/allOptions.json')
                    .then( res => {
                        //console.log(res.data);
                        this.sortOptions = res.data;
                    })
                } catch (e) {
                    console.log('Error hash collection loading: ' + e);
                }
            },
            async fetchHashCountries( countryName ) {
                await Axios.get('../options/hashCollection.json')
                    .then( result => {
                        if(result.data[countryName] === undefined) {
                            this.selectedCountry = "rabota-v-omane";
                            countryName = "rabota-v-omane";
                        }
                    });
                try {
                    const country = String(countryName);
                    await Axios.get('../options/hashCollection.json')
                    .then( result => {
                        if(result.data[country]) {
                            this.arrayHashStrings = result.data[country];
                        }
                    }).then(() => {
                        this.fetchComments(countryName);
                    });
                    //this.fetchComments(countryName);
                } catch (e) {
                    console.log('Error hash collection loading: ' + e);
                }
            },
            fetchComments( countryName ) {
                try {
                    setTimeout( async () => {
                        Axios.get(`../json/${countryName}.json`)
                        .then( result => {
                            this.comments = [];
                            this.cur = [];
                            this.nextCount = 0;
                            this.showCommentsAreDone = 0;
                            this.loadComments = [...result.data];
                        })
                        .then(() => {
                            this.loadNextComments();
                        }).then(() => {
                            this.searchHashLength();
                        });
                    }, 500);
                }
                catch (e) {
                    console.log('Error comments loading: ' + e)
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
                    if ( this.comments.length >= this.loadComments.length ) {
                        this.showCommentsAreDone = 1;
                        this.nextCount = 0;
                    }
                }, 1000);
            },
            searchHashButton(event) {
                if (event.target.value) {
                    this.showCommentsAreDone = 1;
                    //this.searchQuery = event.target.value;
                    this.arrayHashStrings.forEach( (word) => {
                        //console.log(event.target.value, '|', word, '|', (typeof word === 'object'));
                        word = (typeof word === 'object') ? Object.values(word)[0] : word;
                        if ( event.target.value === word ) {
                            this.searchQuery = word;
                        }
                    });
                }
                //console.log(this.searchQuery)
                if (this.searchQuery.length < 1) {
                    console.log('Add text!');
                    return;
                }
                let search = this.searchComments;
                this.loading = true;
                setTimeout( async () => {
                    this.comments = search;
                    this.loading = false;
                }, 100); //500
                if (!this.comment) {
                    this.showCommentsAreDone = 1;
                }
            },
            searchHashLength() {
                setTimeout( () => {
                    this.arrayHashStrings.forEach( (word) => {
                        //this.searchQuery = (typeof word === 'object') ? Object.values(word)[0] : word;
                        this.searchQueryTemp = (typeof word === 'object') ? Object.values(word)[0] : word;
                        let res = this.searchCommentsTemp;
                        this.allCounterWord[word] = res.length;
                    });
                }, 0);
            },
            findComment(comment){
                let search = this.searchQuery;
                let word = (search.includes(',')) ? search.split(',') : search;
                return search.includes(',') ? word.find( (txt) => {
                    return comment.toLowerCase().includes(txt.toLowerCase())
                }) : comment.toLowerCase().includes(word.toLowerCase());
            },
            findCommentTemp(comment){
                let search = this.searchQueryTemp;
                let word = (search.includes(',')) ? search.split(',') : search;
                return search.includes(',') ? word.find( (txt) => {
                    return comment.toLowerCase().includes(txt.toLowerCase())
                }) : comment.toLowerCase().includes(word.toLowerCase());
            },
        },
        computed: {
            getFirstLoad() {
                return [...this.loadComments].filter( (el, i) => {
                    return ( i >= this.nextCount && i < this.nextCount + this.comCount )
                });
            },
            searchComments() {
                let commArray = this.loadComments.filter( (obj) => {
                    const { commentText, commentName, commentDate } = obj;

                    if (this.findComment(commentText)) {
                        return this.findComment(commentText);
                    }
                    if (this.findComment(commentName)) {
                        return this.findComment(commentName);
                    }
                    if (this.findComment(commentDate)) {
                        return this.findComment(commentDate);
                    }
                });
                //console.log('this.loadComments.filter: ', y, '|this.searchQuery: ', this.searchQuery);
                return commArray;
            },
            searchCommentsTemp() {
                let commArray = this.loadComments.filter( (obj) => {
                    const { commentText, commentName, commentDate } = obj;
                    if (this.findCommentTemp(commentText)) {
                        return this.findCommentTemp(commentText);
                    }
                    if (this.findCommentTemp(commentName)) {
                        return this.findCommentTemp(commentName);
                    }
                    if (this.findCommentTemp(commentDate)) {
                        return this.findCommentTemp(commentDate);
                    }
                });
                return commArray;
            },
            currentCountry() {
                //return (this.selectedCountry.split('-')[2]).toUpperCase();
                return (this.selectedCountry).toUpperCase();
            },
            currentHashCollection() {
                return this.arrayHashStrings;
            },
            getAllCommentsLength() {
                return this.loadComments.length;
            }
        },
        watch: {
            stringRepeat() {
                //console.log( 'Watcher: ', this.stringRepeat, '; ', this.comments.length, '; ', this.loadComments.length );
                //console.log('allCounterWord: ', this.allCounterWord);
            },
            searchQuery() {
                //console.log('this.searchQuery: ', this.searchQuery, this.searchQueryTemp)
            },
            arrayHashStrings() {
                //console.log('arrayHashStrings: ', this.arrayHashStrings);
            },
        }
    }
</script>

<style scoped>
    .jobMigration {
        text-align: left;
    }
    .jobMigration__title {
        text-align: center;
        padding: 0 0 1em 0;
        margin: 0 auto;
    }
    .jobMigration__title .battle{
        font-family: unset, monospace;
        font-size: 1.1rem;
        color: rgb(40, 167, 69);
    }
    .loading {
        padding: 1em;
        margin: 0 auto;
        text-align: center;
    }
</style>