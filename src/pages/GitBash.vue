<template>
    <div class="col-md-12 bash_box">
        <h2>{{ $options.myJson.title }}</h2>
        <ul class="bash_list">
            <li v-for="item in $options.myJson.commands"
                :key="item.id">
                <p>
                    <img :src="item.icon"
                         class="git-scm"
                         alt="alt">
                    {{item.title}}
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
    import gitBash from '@/json/git-bash.json';
    export default {
        name: "GitBash",
        myJson: gitBash,
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
        max-width: 64px;
        padding: 0 0.5em 0.5em 0;
    }
</style>