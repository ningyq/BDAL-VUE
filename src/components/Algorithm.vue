<template>
  <div style="margin-right: 10%; margin-left: 10%">
    <div>
      <div style="text-align: left">
        <p style="font-weight: bolder;">标题：{{algorithm.title}}</p>
        <p>分类：{{algorithm.classify}}</p>
        <p>发表于{{algorithm.createTime}}</p>
      </div>
      <div>
        <el-row>
          <el-col :span="12">
            <div style="text-align: left">
              <span>更新于{{algorithm.updateTime}}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div style="text-align: right">
              <el-button @click="edit_algorithm(algorithm.id)" type="primary" size="mini" >编辑</el-button>
              <el-button :plain="true" @click="delete_id(algorithm.id)" type="danger" size="mini">删除</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
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
import {getRequest, putRequest} from '@/util/api'

export default {
  name: 'Algorithm',
  data () {
    return {
      dialogVisible: false,
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
    edit_algorithm (id) {
      this.$router.push({name: 'EditAlgorithm', query: {id: id}})
    },
    delete_algorithm (id) {
      putRequest('/api/algorithm/delete?id=' + id).then(resq => {
        console.info(resq.data.msg)
        this.reload()
      })
    },
    delete_id (id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delete_algorithm(id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
