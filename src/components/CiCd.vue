<template>
    <div style="text-align: left; padding: 1em;">
        <h2 class="plan_h2">{{ msg }}</h2>
        <p><strong>CI</strong> - Continuous Integration (build - test - audit - document - publish)</p>
        <p><strong>CD</strong> - Continuous Delivery</p>
        <div class="plan_box">
            Plan: <b v-for="plan in showMix(plan)" :key="plan">{{ plan }}</b>
        </div>
        <div class="plan_box">
            Test: <b v-for="test in showMix(test)" :key="test">{{ test }}</b>
        </div>
    </div>
</template>

<script>
    import { showString } from "@/mixins/showString";
    export default {
        name: "CiCd",
        mixins: [showString],
        props: {
            plan: String,
            test: String,
            msg: String,
        },
        computed: {},
        methods: {},
    }
</script>

<style lang="scss" scoped>
    .plan_h2 {
        color: $color-red;
    }
.plan_box {
    color: $color-blue;
}
</style>