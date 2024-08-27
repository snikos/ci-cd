<template>
    <div>
        <h1>
            {{ alphabetUpperCase[count] }}<span v-html="newStr" @click="setWave('goon')" class="waves" ref="wave"></span>
        </h1>
        <p style="color: dodgerblue;">
            <button @click="counterPrev">-</button>
            {{ count }}
            <button @click="counterNext">+</button>
        </p>
        <div style="text-align: left;padding: 1em 2em;">
            <h3>Wrapping up! (Composition API)</h3>
            <p style="color: tomato;">The mixin pattern looks pretty safe on the surface. However, sharing code by merging objects becomes an anti-pattern due to the fragility it adds to code and the way it obscures the ability to reason about the functionality</p>
            <p><b>testRef:</b> {{ testRef }}</p>
            <p><b>doubleTestRef:</b> {{ doubleTestRef }}</p>
            <button @click.once="incrementTestRef('\n The End')">testRef + end</button>
        </div>
    </div>
</template>

<script>
    import { ref } from "vue";
    import { useTestRef } from "@/hooks/testRef";
    import { useTestMouse } from "@/hooks/testVueUse";

    export default {
        name: "VueUse",
        data() {
            return {
                count: 0,
                alphabetUpperCase: this.getAlphabet(65),
                alphabetLowerCase: this.getAlphabet(97),
                str: 'dmin page:',
            }
        },
        methods: {
            counterPrev() {
                if (this.count < 1) {
                    this.count = 0;
                    return;
                }
                this.count -= 1;
            },
            counterNext() {
                if( this.count >= this.alphabetLowerCase.length-1 ) {
                    this.count = this.alphabetLowerCase.length-1;
                    return;
                }
                this.count += 1;
            },
            getAlphabet(num) {
                // 65 or 97
                //return new Array(26).fill(1).map((_, i) => String.fromCharCode(num + i));
                return [...Array(26).keys()].map(i => String.fromCharCode(i + num));
                // return [...Array(26)].map((e,i)=>(i+10).toString(36));
                // return const charList = (a,z,d=1)=>(a=a.charCodeAt(),z=z.charCodeAt(),[...Array(Math.floor((z-a)/d)+1)].map((_,i)=>String.fromCharCode(a+i*d)));
                // console.log("from A to G", charList('A', 'G'));
                // console.log("from A to Z with step/delta of 2", charList('A', 'Z', 2));
                // console.log("reverse order from Z to P", charList('Z', 'P', -1));
                // console.log("from 0 to 5", charList('0', '5', 1));
                // console.log("from 9 to 5", charList('9', '5', -1));
                // console.log("from 0 to 8 with step 2", charList('0', '8', 2));
                // console.log("from α to ω", charList('α', 'ω'));
                // console.log("Hindi characters from क to ह", charList('क', 'ह'));
                // console.log("Russian characters from А to Я", charList('А', 'Я'));
            },
            setWave(customClass) {
                let time = 500;
                let timer = 0;
                let ref = this.$refs['wave'];
                // console.log(this.$refs.wave.baseURI); // -> http://localhost:8080/admin
                // console.log(this.$refs); // Object
                [].forEach.call(ref.children, (el, index) => {
                    let cls = el.classList[0];
                    let mtd = (!cls) ? 'add' : 'remove';

                    timer = setTimeout( () => {
                        el.classList[mtd](customClass);
                    }, time += 50);

                    if ( index >= ref.children.length ) {
                        clearTimeout(timer);
                        time = 50;
                    }
                });
            },
        },
        computed: {
            newStr() {
                let word = this.str.split('');
                return word.map( (el) => {
                    return el.replace(el, `<b>${el}</b>`)
                }).join('');
            },
        },
        setup() {
            const myLocalVal = ref('The most clever part of the Composition API is that it allows Vue to lean on the safeguards built into native JavaScript in order to share code, like passing variables to functions, and the module system.');
            const { testRef, doubleTestRef, incrementTestRef } = useTestRef(myLocalVal);
            const {x, y} = useTestMouse();

            return {
                testRef,
                doubleTestRef,
                incrementTestRef,
                x,
                y,
            }
        }
    }
</script>

<style scoped>
    .waves {
        cursor: pointer;
        position: relative;
    }
</style>