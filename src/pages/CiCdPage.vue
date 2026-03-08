<template>
    <div>
        <h1 v-highlight="'rgb(174, 249, 191)'">Test v-highlight directive</h1>
        <h2 v-test="{color: 'dodgerblue', bgColor: 'lightgreen'}">Test v-test directive!</h2>
        <CiCd
                plan="plan,code,build,test,release,deploy,operate"
                test="test:unit,test:e2e,lint,type:check,i18n:check"
                msg="https://www.youtube.com/watch?v=ANj7qUgzNq4&ab_channel=UlbiTV"/>
    </div>
</template>

<script>
    import CiCd from '@/components/CiCd';
    export default {
        name: "CiCdPage",
        components: {
              CiCd,
        },
    }
</script>

<style lang="scss" scoped>

</style>