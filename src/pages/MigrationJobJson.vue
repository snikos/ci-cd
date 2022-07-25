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
                selectedCountry: "comments-all-asia",
                sortOptions: [
                    {name: "Asia", value: "comments-all-asia"},
                    {name: "AustriaVienna", value: "comments-all-austriavienna"},
                    {name: "Bangladesh", value: "comments-all-bangladesh"},
                    {name: "China1", value: "comments-all-china1"},
                    {name: "Contract", value: "comments-all-contract"},
                    {name: "Cuba", value: "comments-all-cuba"},
                    {name: "Cyprus1", value: "comments-all-cyprus1"},
                    {name: "Estonia", value: "comments-all-estonia"},
                    {name: "Finland", value: "comments-all-finland"},
                    {name: "Germany1", value: "comments-all-germany1"},
                    {name: "Germany2", value: "comments-all-germany2"},
                    {name: "Greenland", value: "comments-all-greenland"},
                    {name: "Indonesia", value: "comments-all-indonesia"},
                    {name: "Interpreter", value: "comments-all-interpreter"},
                    {name: "Israel", value: "comments-all-israel"},
                    {name: "Italy", value: "comments-all-italy"},
                    {name: "Italy2", value: "comments-all-italy2"},
                    {name: "Jordan", value: "comments-all-jordan"},
                    {name: "Luxemburg", value: "comments-all-luxemburg"},
                    {name: "Marseille", value: "comments-all-marseille"},
                    {name: "Mongolia", value: "comments-all-mongolia"},
                    {name: "NewZeland", value: "comments-all-newzeland"},
                    {name: "Nice", value: "comments-all-nice"},
                    {name: "Norway", value: "comments-all-norway"},
                    {name: "Prague", value: "comments-all-prague"},
                    {name: "Schweiz", value: "comments-all-schweiz"},
                    {name: "Spain", value: "comments-all-spain"},
                    {name: "Teacher", value: "comments-all-teacher"},
                    {name: "Tourism", value: "comments-all-tourism"},
                    {name: "Turkey", value: "comments-all-turkey"},
                    {name: "Volunteer", value: "comments-all-volunteer"}
                ],
            }
        },
        mounted() {
            this.fetchHashCountries(this.selectedCountry);
            //this.fetchComments(this.selectedCountry);
        },
        methods: {
            countrySelect() {
                this.fetchHashCountries(this.selectedCountry);
                //this.fetchComments(this.selectedCountry);
            },
            async fetchHashCountries( countryName ) {
                try {
                    const country = String(countryName.split('-')[2]);
                    await Axios.get('../json/hashCollection.json')
                    .then( result => {
                        let x = result.data[country];
                        this.arrayHashStrings = x;
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
                    this.arrayHashStrings.forEach( (word, index) => {
                        word = (typeof word === 'object') ? Object.values(word)[0] : word;
                        console.log('index: ', index, '|', event.target.value === word);
                        if ( event.target.value === word ) {
                            this.searchQuery = word;
                        }
                    });
                }
                //console.log(this.searchQuery)
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
                const result = this.loadComments.filter( ({ commentText }) => {
                    let x = this.searchQuery;
                    let word = (x.includes(',')) ? x.split(',') : x;
                    return x.includes(',') ? word.find( (txt) => {
                        return commentText.toLowerCase().includes(txt.toLowerCase())
                    }) : commentText.toLowerCase().includes(word.toLowerCase());
                });
                return result;
            },
            searchCommentsTemp() {
                const result = this.loadComments.filter( ({ commentText }) => {
                    let x = this.searchQueryTemp;
                    let word = (x.includes(',')) ? x.split(',') : x;
                    return x.includes(',') ? word.find( (txt) => {
                        return commentText.toLowerCase().includes(txt.toLowerCase())
                    }) : commentText.toLowerCase().includes(word.toLowerCase());
                });
                return result;
            },
            currentCountry() {
                return (this.selectedCountry.split('-')[2]).toUpperCase();
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