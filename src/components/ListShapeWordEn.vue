<template>
  <div class="table-responsive">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col" :class="`table-${classes[7]}`" class="text-capitalize">pre(su)fix</th>
          <th scope="col" :class="`table-${classes[7]}`" class="text-capitalize">example</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in shapeword"
            :key="'key_' + index + '_' + Math.random()"
            :class="[{'table-primary': currentTab === index}]">
          <td>
            <h5 class="text-left">
              <span class="badge badge-info">{{ item["prefix"] }}</span>
              <button type="button"
                class="btn btn-outline-info btn-sm"
                @click.prevent.stop="showModal(index)">
                <span class="badge badge-light">
                  Info {{ !item['value'].includes('') ? item['value'].length : 0 }}
                </span>
              </button>
            </h5>
          </td>
          <td>
            <ul style="max-width: 700px" class="list-unstyled">
              <li v-for="(exam, idx) in item['examples']"
                  :key="'exam_' + Math.random() + '_' + idx"
                  class="float-left">
                  <div v-if="exam.includes('|')">
                    <span 
                      v-for="(ex, i) in exam.split('|')"
                      :key="'exos_' + Math.random() + '_' + i"
                      class="badge badge-primary text-nowrap breakText"
                    >
                      {{ ex }}
                    </span>
                  </div>
                  <div v-else>
                    <span 
                      class="badge badge-success breakText"
                      style="max-width: 300px;"
                    >
                      {{ exam }}
                    </span>
                  </div>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <my-modal v-model:showModal="modalVisible">
    <ul class="modal-text list-group">
      <li v-for="(list, index) in getMtd('value')"
        :key="Math.random().toFixed(5) + index"
        class="list-unstyled list-group-item">
        {{ list }}
      </li>
    </ul>
  </my-modal>
</template>
<script>
  import MyModal from '@/components/UI/MyModal'
  export default{
    name: "ListShapeWordEn",
    components: {
      MyModal,
    },
    data() {
      return {
        currentTab: '',
        modalVisible: false,
        curIndex: '',
      }
    },
    props: {
      shapeword: {
        type: Array,
        require: true
      },
      classes: {
        type: Array,
      }
    },
    computed: {
      getObj() {
        return this.shapeword
        .filter( (_, index) => index === this.curIndex )
        .find( (el, idx) => idx === 0)
      },
      getMtd() {
        return (name) => {
          return this.getObj[name.toLowerCase()]
        }
      }
    },
    methods: {
      showModal(id) {
        this.currentTab = id;
        this.modalVisible = true;
        this.curIndex = id;
      },
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

<style scoped></style>