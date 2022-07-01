<template>
    <div class="row">
        <h1>English irregular verbs</h1>
        <div class="col-12">
            <ListIrregularVerbs :verbs="loadVerbs"/>
        </div>
    </div>
</template>

<script>
    import verbsJson from "@/json/irregular-verbs.json";
    import ListIrregularVerbs from "@/components/ListIrregularVerbs";
    export default {
        name: "IrregularVerbs",
        verbs: verbsJson,
        components: {
            ListIrregularVerbs,
        },
        data() {
            return {
                loadVerbs: [],
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
                } catch (e) {
                    console.log('Error load json verbs: '+ e)
                }
            },
        }
    }
</script>

<style scoped>

</style>