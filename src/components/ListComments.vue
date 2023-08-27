<template style="min-height:720px;height:720px;">
    <div v-show="loading" class="progressLoading">
        Loading...
    </div>
    <div v-show="!loading">
        <ul
                class="list-group"
                v-if="comments.length > 0"
        >
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
        </ul>
        <div v-else class="commentNotFound">
            No comments found
        </div>
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
    .commentNotFound,
    .progressLoading{
        padding: 1em 0;
        margin: 0 auto;
        text-align: center;
    }
</style>