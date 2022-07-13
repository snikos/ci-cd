<template>
    <div class="row">
        <div class="col-12 col-md-6">
            <h3 class="pb-4">English irregular verbs</h3>
        </div>
        <div class="col-12 col-md-6">
            <MySelect v-model="selectedSort"
                      :options="sortOptions"
            />
        </div>
        <div class="col-12 col-sm-12 col-md-3">
            <div class="list-group">
                <button v-for="(button, index) in checkButtons"
                        :key="button.name"
                        @click="getMtdClick(button.comp, index)"
                        type="button"
                        :class="'list-group-item list-group-item-action ' +  (index === isActive ? 'active' : '')"
                >
                    {{button.name}}
                </button>
            </div>
        </div>
        <div class="col-12 col-sm-12 col-md-9">
            <ListIrregularVerbs :verbs="checkVerbs" :classes="classes"/>
        </div>
    </div>
</template>

<script>
    import verbsJson from "@/json/irregular-verbs.json";
    import ListIrregularVerbs from "@/components/ListIrregularVerbs";
    import MySelect from "@/components/UI/MySelect";
    //import MySort from "@/components/UI/MySort";
    export default {
        name: "IrregularVerbs",
        //verbs: verbsJson,
        components: {
            //MySort,
            MySelect,
            ListIrregularVerbs,
        },
        data() {
            return {
                loadVerbs: [],
                checkVerbs: [],
                selectedSort: '',
                sortOptions: [
                    {value: 'Infinitive', name: 'Infinitive sort'},
                    {value: 'Past-Indefinite', name: 'Past Indefinite sort'},
                    {value: 'Past-Participle', name: 'Past Participle sort'},
                    {value: 'translate', name: 'translate sort'},
                ],
                checkButtons: [
                    { name: 'All verbs', comp: 'sortedVerbs' },
                    { name: 'do,go,lie', comp: 'sortShorts' },
                    { name: 'Infinitive=Indefinite', comp: 'sortInfinitiveIndefinite' },
                    { name: 'Indefinite=Participle', comp: 'sortIndefiniteParticiple' },
                    { name: 'sort Twin', comp: 'sortTwin' },
                    { name: 'Participle ends with En', comp: 'sortEndsWithEn' },
                    { name: 'Participle ends with N', comp: 'sortEndsWithN' }
                ],
                classes: ['primary','secondary','success','danger','warning','info','light','dark','active'],
                ups: 'list-group-item list-group-item-action',
                isActive: 0,
            }
        },
        mounted() {
            this.fetchVerbs();
        },
        methods: {
            async fetchVerbs() {
                try {
                    const res = await verbsJson;
                    this.loadVerbs = res["verbs"];
                    this.checkVerbs = res["verbs"];
                } catch (e) {
                    console.log('Error load json verbs: '+ e)
                }
            },
            getMtdClick(comp, idx) {
                this.isActive = idx;
                this.checkVerbs = this[comp];
            },
        },
        computed: {
            sortedVerbs() {
                return [...this.loadVerbs].sort((v1, v2) => {
                    return String(v1[this.selectedSort])?.localeCompare(String(v2[this.selectedSort]))
                })
            },
            sortShorts() {
                return this.sortedVerbs.filter( (el) => {
                    if ( /\b(do|go|lie)\b/im.test( String(el['Infinitive']) ) ) {
                        return /\b(do|go|lie)\b/im.test( String(el['Infinitive']) )
                    }
                });
            },
            sortInfinitiveIndefinite() {
                return this.sortedVerbs.filter( (el) => {
                    return String(el['Infinitive']) === String(el['Past-Indefinite']);
                })
            },
            sortIndefiniteParticiple() {
                return this.sortedVerbs.filter( (el) => {
                    return String(el['Past-Indefinite']) === String(el['Past-Participle'])
                        && String(el['Infinitive']) !== String(el['Past-Participle']);
                })
            },
            sortTwin() {
                return this.sortedVerbs.filter( (el) => {
                    return String(el['Infinitive']) === String(el['Past-Participle'])
                        && String(el['Infinitive']).includes(String(el['Past-Indefinite']));
                })
            },
            sortEndsWithEn() {
                return this.sortedVerbs.filter( (el) => {
                    return String(el['Past-Participle']).endsWith('en');
                })
            },
            sortEndsWithN() {
                return this.sortedVerbs.filter( (el) => {
                    if ( /[^eiou]n$/.test(String(el['Past-Participle'])) ){
                        return /[^eiou]n$/.test(String(el['Past-Participle']));
                    }
                });
            }
        },
    }
</script>

<style scoped>

</style>