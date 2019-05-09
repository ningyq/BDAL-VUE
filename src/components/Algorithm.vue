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
              <el-button @click="edit_algorithm(algorithm.id)" type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
              <el-button :plain="true" @click="dialogVisible = true" type="danger" size="mini" icon="el-icon-delete">删除</el-button>
              <el-dialog
                :visible.sync="dialogVisible"
                width="25%">
                <span>确认删除？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                    <el-button size="mini" type="primary" @click="
                    delete_algorithm(a.id)">确 定</el-button>
                  </span>
              </el-dialog>
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
import {getRequest} from '@/util/api'

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
  }
}
</script>

<style scoped>

</style>
