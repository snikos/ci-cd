<template>
    <div class="row">
        <div class="col-12 col-md-6">
            <h4>English irregular verbs</h4>
        </div>
        <div class="col-12 col-md-6">
            <MySelect v-model="selectedSort"
                      :options="sortOptions"
            />
        </div>
        <div class="col-10">
            <ListIrregularVerbs :verbs="checkVerbs"/>
        </div>
        <div class="col-2">
            <div class="list-group">
                <button v-for="button in checkButtons"
                        :key="button.name"
                        @click="getMtdClick(button.comp)"
                        type="button"
                        class="list-group-item list-group-item-action"
                >
                    {{button.name}}
                </button>
            </div>
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
                    { name: 'firstClick', comp: 'sortClickFirst' },
                    { name: 'secondClick', comp: 'sortClickSecond' }
                ],
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
            getMtdClick(comp) {
                this.checkVerbs = this[comp];
            },
        },
        computed: {
            sortedVerbs() {
                return [...this.loadVerbs].sort((v1, v2) => {
                    return String(v1[this.selectedSort])?.localeCompare(String(v2[this.selectedSort]))
                })
            },
            sortClickFirst() {
                return this.sortedVerbs.filter( (el) => {
                    return String(el['Infinitive']) === String(el['Past-Indefinite']);
                })
            },
            sortClickSecond() {
                return this.sortedVerbs.filter( (el) => {
                    return String(el['Past-Indefinite']) === String(el['Past-Participle']) && String(el['Infinitive']) !== String(el['Past-Participle']);
                })
            },
        },
    }
</script>

<style scoped>

</style>