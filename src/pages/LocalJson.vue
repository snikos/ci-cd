<template>
    <div>
        <h3>{{ $options.localJson.name }}</h3>
        <ul class="list_catalog">
            <li
                    v-for="(item, index) in $options.localJson.apis"
                    :key="item.id"
                    :class="`${ index%2===0 ? 'style_ui1' : 'style_ui2' }`">
                <p class="text_head">Api: {{item.id}}. Name: {{ item.name }}.</p>
                <p>
                    <img
                            src="../assets/img/ui.png"
                            :alt="item.id"
                            class="img_thick" />
                    <a
                            :href="item.endpoint"
                            :title="item.endpoint"
                            class="link_name">
                        <font-awesome-icon
                                :icon="item.icon"
                                class="icon_thick" />
                        {{ item.name }}
                    </a>
                </p>
                <p class="text">{{ item.description }}</p>
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
    .text_head {
        color: rgb(0,0,0);
    }
    .text {
        padding: 1.2em 0 0 2em;
        border-left: 2px solid;
        border-color: inherit;
    }
    .img_thick {
        max-width: 12px;
        border-radius: 8px;
    }
    .icon_thick {
        max-width: 16px;
        border-radius: 8px;
    }
    .link_name {
        color: inherit;
        padding: 0 6px;
        font-weight: 600;
    }
    .style_ui1 {
        color: rgb(184, 25, 0);
    }
    .style_ui2 {
        color: rgb(104, 104, 104);
    }
</style>