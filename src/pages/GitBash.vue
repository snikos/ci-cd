<template>
    <div class="bash_box">
        <h2>{{ $options.myJson.title }}</h2>
        <ul class="row bash_list">
            <li v-for="item in $options.myJson.commands"
                :key="item.id"
                class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4"
            >
                <div @click.prevent.stop="currentTab = item.id"
                   style="cursor: pointer;"
                >
                    <h5>
                        <img
                                :src="item.icon"
                                class="git-scm"
                                :alt="item.title"
                                :title="item.title"
                        >
                        {{item.title}}
                    </h5>
                </div>
                <ul :class="['tab_box', {active: currentTab === item.id}]">
                    <li v-for="(desc, index) in item.description"
                       :key="item.id + index"
                    >
                        <p>{{ desc }}</p>
                        <kbd>{{ item.console[index] }}</kbd>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    import gitBash from '@/json/git-bash.json';
    export default {
        name: "GitBash",
        myJson: gitBash,
        data() {
            return {
                currentTab: 'sign',
            }
        },
        methods: {},
    }
</script>

<style scoped>
    .bash_box {
        text-align: left;
        padding: 1em 2em;
    }
    .bash_list {
        list-style-type: none;
        margin: 0 auto;
        padding: 0;
    }
    .bash_list li {
        padding: 1em 0 0;
    }
    .bash_box .git-scm {
        max-width: 58px;
        padding: 0 0.5em 0.5em 0;
    }
    .tab_box {
        list-style-type: square;
    }
    .tab_box li::marker {
        color: red;
    }
    .bash_box .tab_box {
        display: none;
    }
    .bash_box .active {
        display: block;
    }
</style>