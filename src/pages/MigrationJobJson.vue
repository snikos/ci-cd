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
                            v-model="selectedSort"
                            :options="sortOptions"
                            @change="countrySelect" />
                </div>
            </div>
        </div>
        <div class="col-12 col-md-3">
            <HashTagBlock
                    @searchHash="searchHashButton"
                    :arrHash="arrayHashStrings"
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
                arrayHashStrings: [
                    'хочу',
                    'украин',
                    'тел',
                    'бур',
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
                    'viber',
                    ['@', 'mail', 'email'],
                    ['+38', '8', '7']
                ],
                searchQuery: '',
                stringRepeat: 0,
                allCounter: {},
                selectedSort: "comments-all-asia",
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
                    {name: "Praga", value: "comments-all-praga"},
                    {name: "Spain", value: "comments-all-spain"},
                    {name: "Teacher", value: "comments-all-teacher"},
                    {name: "Tourism", value: "comments-all-tourism"},
                    {name: "Turkey", value: "comments-all-turkey"},
                    {name: "Volunteer", value: "comments-all-volunteer"}
                ]
            }
        },
        mounted() {
            this.fetchComments(this.selectedSort);
        },
        methods: {
            countrySelect() {
                this.fetchComments(this.selectedSort);
            },
            async fetchComments( countryName ) {
                try {
                    setTimeout( async () => {
                        await Axios.get(`../json/${countryName}.json`)
                        .then( result => {
                            this.comments = [];
                            this.cur = [];
                            this.nextCount = 0;
                            this.showCommentsAreDone = 0;
                            this.loadComments = [...result.data];
                        } );
                        this.loadNextComments();
                    }, 500);
                }
                catch (e) {
                    console.log('Error load: ' + e)
                }
                finally {
                    this.searchHashLength();
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
                    }
                }, 1000);
            },
            searchHashButton(event) {
                if (event.target.value) {
                    this.searchQuery = event.target.value;
                    //console.log(event.target.value);
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
                    this.arrayHashStrings.forEach( (word, index) => {
                        this.searchQuery = (typeof word === 'object') ? Object.values(word)[0] : word;
                        let res = this.searchComments;
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
                return this.loadComments.filter( ({ commentText }) => {
                    let x = this.searchQuery;
                    let word = (x.includes(',')) ? x.split(',') : x;
                    return x.includes(',') ? word.find( (txt) => {
                        return commentText.toLowerCase().includes(txt.toLowerCase())
                    }) : commentText.toLowerCase().includes(word.toLowerCase());
                });
            },
            currentCountry() {
                return (this.selectedSort.split('-')[2]).toUpperCase();
            },
        },
        watch: {
            stringRepeat() {
                //console.log( this.stringRepeat, '; ', this.comments.length, '; ', this.loadComments.length );
                console.log('allCounter: ', this.allCounter);
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