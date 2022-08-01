<template>
    <div class="row jobMigration">
        <h3 class="jobMigration__title">Comment analytics: {{ currentCountry }}</h3>
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
                    @searchHash="searchHashButton"
                    :arrHash="currentHashCollection"
                    :activeValue="searchQuery"
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
                allCounter: {},
                selectedCountry: "rabota-v-mongolii",
                sortOptions: [],
            }
        },
        mounted() {
            this.fetchSortOptions();
            setTimeout( () => {
                this.fetchHashCountries(this.selectedCountry);
                //this.fetchComments(this.selectedCountry);
            }, 1000)
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
                    });
                    this.fetchComments(countryName);
                } catch (e) {
                    console.log('Error hash collection loading: ' + e);
                } finally {
                    //this.fetchComments(countryName);
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
                        });
                        this.loadNextComments();
                        this.searchHashLength();
                    }, 500);
                }
                catch (e) {
                    console.log('Error comments loading: ' + e)
                }
                finally {
                    //this.searchHashLength();
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
                }, 500);
                //console.log('search with button: ', search);
            },
            searchHashLength() {
                setTimeout( () => {
                    this.arrayHashStrings.forEach( (word, index) => {
                        //this.searchQuery = (typeof word === 'object') ? Object.values(word)[0] : word;
                        this.searchQueryTemp = (typeof word === 'object') ? Object.values(word)[0] : word;
                        let res = this.searchCommentsTemp;
                        this.allCounter[index] = res.length;
                    });
                }, 1000);
            },
        },
        computed: {
            getFirstLoad() {
                return [...this.loadComments].filter( (el, i) => {
                    return ( i >= this.nextCount && i < this.nextCount + this.comCount )
                });
            },
            searchComments() {
                let y = this.loadComments.filter( ({ commentText }) => {
                    let x = this.searchQuery;
                    let word = (x.includes(',')) ? x.split(',') : x;
                    return x.includes(',') ? word.find( (txt) => {
                        return commentText.toLowerCase().includes(txt.toLowerCase())
                    }) : commentText.toLowerCase().includes(word.toLowerCase());
                });
                console.log('y: ', y, '|', this.searchQuery);
                return y;
            },
            searchCommentsTemp() {
                return this.loadComments.filter( ({ commentText }) => {
                    let x = this.searchQueryTemp;
                    let word = (x.includes(',')) ? x.split(',') : x;
                    return x.includes(',') ? word.find( (txt) => {
                        return commentText.toLowerCase().includes(txt.toLowerCase())
                    }) : commentText.toLowerCase().includes(word.toLowerCase());
                });
            },
            currentCountry() {
                //return (this.selectedCountry.split('-')[2]).toUpperCase();
                return (this.selectedCountry).toUpperCase();
            },
            currentHashCollection() {
                return this.arrayHashStrings;
            }
        },
        watch: {
            stringRepeat() {
                //console.log( 'Watcher: ', this.stringRepeat, '; ', this.comments.length, '; ', this.loadComments.length );
                //console.log('allCounter: ', this.allCounter);
            },
            searchQuery() {
                console.log('this.searchQuery: ', this.searchQuery, this.searchQueryTemp)
            },
            arrayHashStrings() {
                console.log('arrayHashStrings: ', this.arrayHashStrings);
            }
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
    .loading {
        padding: 1em;
        margin: 0 auto;
        text-align: center;
    }
</style>