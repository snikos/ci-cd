<template>
    <div class="mongolia">
        <h1>Mongolia</h1>
        <ul class="row list-group">
            <li
                    class="col-12 list-group-item"
                    v-for="(post, idx) in $options.mongol"
                    :key="idx"
            >
                <strong>{{ idx }}</strong> - {{ post.commentName }} ({{ post.commentDate }})
                <p>{{ post.commentText }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    import mongoliaJson from "@/json/comments-all-complete.json";
    export default {
        name: "MongoliaJson",
        mongol:  mongoliaJson,
    }
</script>

<style scoped>
    .mongolia {
        text-align: left;
    }
</style>