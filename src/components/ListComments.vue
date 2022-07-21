<template>
    <ul
            class="list-group"
            v-if="comments.length > 0">
        <li
                class="list-group-item"
                v-for="({commentText, commentName, commentDate, id}) in comments"
                :key="commentDate + '_' + id"
        >
            <div>
                <strong>{{ id }}</strong> - {{ commentName }} ({{ commentDate }})
                <p>{{ commentText }}</p>
            </div>
        </li>
        <li v-show="loading" class="loading">Loading...</li>
    </ul>
    <div v-else class="commentNotFound">
        Comments not found
    </div>
</template>

<script>
    export default {
        name: "ListComments",
        props: {
            comments: {
                type: Array,
                required: true,
            },
            loading: {
                type: Boolean
            }
        }
    }
</script>

<style scoped>
    .commentNotFound {
        padding: 1em 0;
        margin: 0 auto;
        text-align: center;
    }
</style>