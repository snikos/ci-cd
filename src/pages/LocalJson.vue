<template>
    <div>
        <h3>{{ $options.localJson.name }}</h3>
        <ul class="list_catalog">
            <li
                    v-for="(item, index) in $options.localJson.apis"
                    :key="item.id"
                    :class="`${ index%2===0 ? 'style_ui1' : 'style_ui2' }`">
                <p class="head-name">Api: {{item.id}}. Name: {{ item.name }}.</p>
                <p class="head-title">
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
                <p class="head-text">{{ item.description }}</p>
                <p class="head-footer">
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
    .head-name {
        color: rgb(0,0,0);
        font-weight: bold;
        margin: 0 auto;
        padding: 0 0 0 38px;
        font-size: 10px;
    }
    .head-title {
        border-width: 1px;
        border-style: solid;
        border-right: 0;
        border-bottom: 0;
        border-color: inherit;
        margin: 0 auto 0 2px;
        padding: 12px 0 0 34px;
    }
    .head-text {
        padding: 14px 0 14px 30px;
        margin: 0 auto;
        border-left: 5px solid;
        border-color: inherit;
    }
    .head-footer {
        border-width: 1px;
        border-style: solid;
        border-right: 0;
        border-top: 0;
        border-color: inherit;
        margin: 0 auto 0 2px;
        padding: 12px 0 12px 34px;
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
</style>