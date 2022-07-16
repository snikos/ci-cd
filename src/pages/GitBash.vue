<template>
    <div class="bash_box">
        <h2>{{ $options.myJson.title }}</h2>
        <ul class="row bash_list">
            <li v-for="item in $options.myJson.commands"
                :key="item.id"
                :class="['col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 bash_li ', {active: currentTab === item.id}]"
                @click.prevent.stop="showModal(item.id)"
            >
                <div>
                    <h5>
                        <img
                                class="git-scm"
                                :src="item.icon"
                                :alt="item.title"
                                :title="item.title"
                        >
                        {{item.title}}
                    </h5>
                </div>
                <ul :class="['tab_box', {activist: currentTab === item.id}]">
                    <li v-for="(desc, index) in item.description"
                        :key="item.id + index"
                    >
                        <p>{{ desc.substr(0, 240) }}</p>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    <my-modal v-model:showModal="modalVisible">
        <h5>{{ getTitle }}</h5>
        <div v-for="(list, index) in getDescription"
            :key="list.substr(0,6) + index"
        >
            <p>{{ list }}</p>
            <kbd>{{ getConsole[index] }}</kbd>
        </div>
    </my-modal>
</template>

<script>
    import gitBash from '@/json/git-bash.json';
    import MyModal from "@/components/UI/MyModal";
    export default {
        name: "GitBash",
        myJson: gitBash,
        components: {
            MyModal,
        },
        data() {
            return {
                currentTab: 'sign',
                modalVisible: false,
                curId: '',
            }
        },
        methods: {
            showModal(id) {
                this.currentTab = id;
                this.modalVisible = true;
                this.curId = id;
            },
        },
        computed: {
            getObj() {
                return this.$options.myJson['commands']
                    .filter( ({id}) => id === this.curId )
                    .find( (el, idx) => idx === 0);
            },
            getTitle() {
                return this.getObj['title'];
            },
            getDescription() {
                return this.getObj['description'];
            },
            getConsole() {
                return this.getObj['console'];
            },
        },
    }
</script>

<style scoped>
    .bash_box {
        text-align: left;
        padding: 1em 2em;
    }
    .bash_list {
        list-style-type: none;
        margin: 0 auto;
        padding: 0;
    }
    .bash_list li {
        padding: 1em 0 0;
    }
    .bash_li {
        cursor: pointer;
        transform: scale(1);
    }
    .bash_li.active {
        box-shadow: 0 0 10px 0 #757d85;
        transform: scale(1.1);
        padding: 16px;
        border-radius: 36px;
        margin-top: 12px;
        margin-bottom: 12px;
        opacity: 0.5;
    }
    .bash_box .git-scm {
        max-width: 58px;
        padding: 0 0.5em 0.5em 0;
    }
    .tab_box {
        max-height: 86px;
        overflow: hidden;
    }
    .tab_box li::marker {
        color: red;
    }
    .tab_box:after {
        content: "";
        display: block;
        height: 36px;
        background-color: rgba(25, 255, 255, 0);
        box-shadow: inset 0 -20px 12px 0 rgba(255, 255, 255, 0.5);
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 0;
    }
</style>