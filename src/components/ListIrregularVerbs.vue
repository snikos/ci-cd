<template>
    <div class="table-responsive-sm">
        <table class="table table-sm table-striped table-bordered">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Infinitive</th>
                <th scope="col">Past Indefinite</th>
                <th scope="col">Past Participle</th>
                <th scope="col">Translate</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, idx) in verbs"
                :key="item['Infinitive'] + '_' + idx"
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
        }
    }
</script>

<style scoped>

</style>