<template>
    <md-list>
        <md-list-item v-for="item in model" :key="item.cat_name" :class="getClass(item.cat_id, level)" @click="openItem(item)">
            <md-icon v-if="level === 0">whatshot</md-icon>
            <span>{{item.cat_name}}</span>

            <md-list-expand v-if="item.children">
                <CatTree :model='item.children' :level="level+1"></CatTree>
            </md-list-expand>
        </md-list-item>
    </md-list>
</template>

<script>
import * as types from '@/types'
export default {
  name: 'CatTree',
  props: ['model', 'level'],
  methods: {
    getClass (catId, level) {
      let cls = 'md-inset-' + level
      if (this.$store.state.cat.cat_id === catId) {
        cls += ' active'
      }
      return cls
    },
    openItem (item) {
      let vm = this
      if (item.leaf) {
        console.log(item.leaf, item.cat_id)
        vm.$store.commit(types.CHANGE_CAT, item)
        vm.$axios.get('Works/getCatArticles/' + item.cat_id).then((response) => {
          vm.$store.commit(types.UPDATE_LIST, response.data)
          vm.$router.push({name: 'articleList', params: {id: item.cat_id}})
        })
      } else {
        console.log(item)
      }
    }
  }
}
</script>

<style>
    .md-list-item.md-inset-1 .md-list-item-container {
        padding-left: 72px
    }
    .md-list-item.md-inset-2 .md-list-item-container {
        padding-left: 80px
    }
    .md-list-item.md-inset-2 .md-list-item-container {
        padding-left: 88px
    }
    .md-list-item.active .md-button {
        background: rgba(150, 112, 112, 0.09);
    }
    .md-list .md-list-item.active .md-list-item-container {
        color: #2196f3;
    }
</style>
