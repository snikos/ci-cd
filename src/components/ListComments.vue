<template style="min-height:720px;height:720px;">
    <ul class="list-group"
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
    <div v-if="showEmpty" class="commentNotFound">No comments</div>
    <div v-if="loading" class="d-flex justify-content-center mb-0">
        <div class="spinner-grow text-success">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    <div v-else class="swipe-box">
        <button type="button" class="swipe-btn"></button>
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
        },
        computed: {
            showEmpty() {
                return ( this.comments.length < 1 && !this.loading )
            }
        }
    }
</script>

<style scoped>
.commentNotFound{
    padding: 1em 0;
    margin: 0 auto;
    text-align: center;
}
.swipe-box {
    margin: 1em auto;
}
.swipe-btn {
    cursor: pointer;
    background-color: transparent;
    background-image: url('../assets/swipe.png');
    background-size: contain;
    background-position: 1px 0;
    background-repeat: no-repeat;
    display: block;
    margin: 0em auto;
    width: 24px;
    height: 14px;
    border-color: transparent;
    /*box-sizing: content-box;*/
}
.swipe-btn:hover {
    background-image: url('../assets/swipe-white.png');
    border-color: transparent;
}
.swipe-btn:focus {
    border-color: transparent;
}
</style>