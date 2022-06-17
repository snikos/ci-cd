<template>
    <ul class="list-group">
        <li
                class="list-group-item"
                v-for="({commentText, commentName, commentDate, id}) in comments"
                :key="commentDate + id"
        >
            <div>
                <strong>{{ id }}</strong> - {{ commentName }} ({{ commentDate }})
                <p>{{ commentText }}</p>
            </div>
        </li>
        <li v-show="loading" class="loading">Loading...</li>
    </ul>
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

</style>