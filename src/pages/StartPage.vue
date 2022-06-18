<template>
    <div>
        <h1 v-highlight="'rgb(174, 249, 191)'">Test from this video (CI/CD)</h1>
        <CiCd
                plan="plan,code,build,test,release,deploy,operate"
                test="test:unit,test:e2e,lint,type:check,i18n:check"
                msg="https://www.youtube.com/watch?v=ANj7qUgzNq4&ab_channel=UlbiTV"/>
    </div>
</template>

<script>
    import CiCd from '@/components/CiCd';
    export default {
        name: "StartPage",
        components: {
              CiCd,
        },
    }
</script>

<style lang="scss" scoped>

</style>