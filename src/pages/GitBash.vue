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
                    <h5 class="bash_list_title">
                        <img
                                class="git-scm"
                                :src="item.icon"
                                :alt="item.title"
                                :title="item.title"
                        >
                        <span>{{item.title}}</span>
                    </h5>
                </div>
                <ul :class="['tab_box', {activisto: currentTab === item.id}]">
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
        <h5>{{ getMtd('Title') }}</h5>
        <div v-for="(list, index) in getMtd('Description')"
            :key="list.substr(0,6) + index"
        >
            <p>{{ list }}</p>
            <kbd>{{ getMtd('Console')[index] }}</kbd>
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
                currentTab: '',
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
            getMtd() {
                return (name) => {
                    return this.getObj[name.toLowerCase()];
                }
            }
        },
        watch: {
            modalVisible() {
                if (!this.modalVisible) {
                    this.currentTab = !this.currentTab;
                }
            }
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
        padding: 1em 0 10px 0;
        list-style-type: none;
        text-align: justify;
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
        max-width: 40px;
    }
    .bash_list_title {
        display: flex;
        padding: 4px;
        align-items: center;
        min-height: 78px;
    }
    .bash_list_title span{
        padding-left: 14px;
        padding-right: 30px;
    }
    .tab_box {
        max-height: 92px;
        overflow: hidden;
        padding: 0px 32px 0px 32px;
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