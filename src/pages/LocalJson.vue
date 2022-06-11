<template>
    <div>
        <h3>{{ $options.localJson.name }}</h3>
        <ul class="list_catalog">
            <li v-for="item in $options.localJson.apis" :key="item.id">
                <p>Api: {{item.id}}. Name: {{ item.name }}.</p>
                <p>
                    <img
                            src="../assets/ui.png"
                            :alt="item.id"
                            class="icon_thick">
                    <a
                            :href="item.endpoint"
                            :title="item.endpoint"
                            class="link_name">{{ item.name }}</a>
                </p>
                <p>{{ item.description }}</p>
                <p>
                    <b v-for="(tag, index) in item.tags" :key="tag + index"> #{{tag}}</b>
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
    import catalog from '@/json/catalog.json';
    export default {
        name: "LocalJson",
        localJson: catalog,
    }
</script>

<style scoped>
    .list_catalog {
        list-style-type: none;
        text-align: left;
        padding: 0 2em;
    }
    .list_catalog li {
        padding: 1em;
    }
    .icon_thick {
        max-width: 16px;
        border-radius: 8px;
    }
    .link_name {
        color: rgb(184, 25, 0);
        padding: 0 6px;
        font-weight: 600;
    }
</style>