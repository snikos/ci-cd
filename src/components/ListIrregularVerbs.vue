<template>
    <div class="table-responsive">
        <table class="table table-sm table-striped table-bordered">
            <thead>
            <tr>
                <th scope="col" :class="`table-${classes[7]}`">---</th>
                <th scope="col" :class="`table-${classes[7]}`">Infinitive</th>
                <th scope="col" :class="`table-${classes[7]}`">Past Indefinite</th>
                <th scope="col" :class="`table-${classes[7]}`">Past Participle</th>
                <th scope="col" :class="`table-${classes[7]}`">Translate</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, idx) in verbs"
                :key="item['Infinitive'] + '_' + idx"
                :class="`tabloid-${curClass}`"
            >
                <th scope="row">{{ idx+1 }}</th>
                <td>{{ item["Infinitive"] }}</td>
                <td>{{ item["Past-Indefinite"] }}</td>
                <td>{{ item["Past-Participle"] }}</td>
                <td>{{ item["translate"] }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "ListIrregularVerbs",
        props: {
            verbs: {
                type: Array,
                required: true,
            },
            curClass: {
                type: String,
            },
            classes: {
                type: Array,
            }
        }
    }
</script>

<style scoped>

</style>