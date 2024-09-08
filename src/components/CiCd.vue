<template>
    <div style="text-align: left; padding: 1em;">
        <h2 class="plan_h2">{{ msg }}</h2>
        <p><strong>CI</strong> - Continuous Integration (build - test - audit - document - publish)</p>
        <p><strong>CD</strong> - Continuous Delivery</p>
        <div class="plan_box">
            Plan: <b v-for="plan in showMix(plan)" :key="plan">{{ plan }}</b> ({{ getLengthPlan('plan') }})
        </div>
        <div class="plan_box">
            Test: <b v-for="test in showMix(test)" :key="test">{{ test }}</b> ({{ getLengthPlan('test') }})
        </div>
        <div>
NDA (non-disclosure agreement) — это соглашение, по которому сотрудники или подрядчики обязуются хранить в тайне конфиденциальную информацию, полученную от работодателя или партнёра в ходе сотрудничества.

В договоре NDA можно зафиксировать:

условия сделок,

управленческую отчётность,

маркетинговую стратегию,

информацию о производственных процессах.

NDA защищает компанию от утечек секретных данных, которые не должны попасть в открытый доступ.

Соглашение может быть односторонним, когда данные в тайне хранит только одна сторона, и взаимным — тогда хранят обе.
        </div>
    </div>
</template>

<script>
    import { showString } from "@/mixins/showString";
    export default {
        name: "CiCd",
        data() {
            return {
                a: 0,
            }
        },
        mixins: [showString],
        props: {
            plan: {
                type: String,
                default: '---',
                required: true,
                validator: (v) => {
                    return v.length > 0
                }
            },
            test: String,
            msg: String,
        },
        computed: {
            getLen: (vm) => vm.a + 3,
        },
        methods: {
            getLengthPlan(text) {
                return this[text].length;
            },
            plusTwo(){
                this.a += 7;
            },
        },
        created() {
            this.plusTwo();
            console.log( "a: ", this.a )
        }
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