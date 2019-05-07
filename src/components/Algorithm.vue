<template>
  <div style="margin-right: 10%; margin-left: 10%">
    <div style="text-align: left">
      <p style="font-weight: bolder;">标题：{{algorithm.title}}</p>
      <p>分类：{{algorithm.classify}}</p>
      <p>发表于：{{algorithm.updateTime}}</p>
    </div>
    <mavon-editor
      v-model="algorithm.context"
      :subfield="false"
      :defaultOpen="defaultData"
      :toolbarsFlag="false"
      :boxShadow="false" />
  </div>
</template>

<script>
import {getRequest} from '@/util/api'

export default {
  name: 'Algorithm',
  data () {
    return {
      algorithm: {

      },
      defaultData: 'preview'
    }
  },
  mounted () {
    getRequest('/api/algorithm/id?id=' + this.$route.query.id).then(resp => {
      this.algorithm = resp.data.data
    }, (resp) => {
      console.log(resp)
    })
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
