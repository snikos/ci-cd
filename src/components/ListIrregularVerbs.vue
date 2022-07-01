<template>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Base</th>
                <th scope="col">Simple</th>
                <th scope="col">Participle</th>
                <th scope="col">Trans</th>
            </tr>
        </thead>
        <tbody>
        <tr v-for="(item, idx) in verbs"
            :key="item.Base + '_' + idx"
        >
            <th scope="row">{{ idx+1 }}</th>
            <td>{{ item["Base"] }}</td>
            <td>{{ item["Past-simple"] }}</td>
            <td>{{ item["Past-Participle"] }}</td>
            <td>trans</td>
        </tr>
        </tbody>
    </table>
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