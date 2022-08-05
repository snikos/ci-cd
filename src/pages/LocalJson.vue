<template>
    <div>
        <h2>What problems help you solve Nuxt.js</h2>
        <ul class="list_catalog">
            <li>
                <p class="align_left"><strong>1.static page:</strong> On the basis of the routing, nuxt generate html files, which are SEO-frendly. This works, for example, for business card pages (main page + several subpages). You get ready-made html files e.g. index.html, contact.html etc.</p>
            </li>
            <li>
                <p class="align_left"><strong>2.SPA:</strong> applications that do not require SEO, but have dynamic paths and interface. Does not use server side rendering. Some methods are unavailable, but still use some of the benefits of nuxt. For example, dynamic routing or many options available in the configuration in nuxt.</p>
            </li>
            <li>
                <p class="align_left"><strong>3.Universal:</strong> allows you to enjoy all the benefits of nuxt.js. With the help of dedicated website methods (fetch, asyncData, nuxtServerInit etc.), it allows you to prepare data on the server side to generate them on the browser side so that they are SEO-friendly.</p>
            </li>
        </ul>
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
    .align_left {
        text-align: left;
    }
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