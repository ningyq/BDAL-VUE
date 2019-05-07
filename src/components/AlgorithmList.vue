<template>
  <div id="list">
    <div v-for="a in algorithm"
         :key="a.id">
      <el-card shadow="hover">
        <div slot="header" class="clearfix">
          <span style="font-size: 18px; font-weight: bolder; text-align: left" @click="show_button">{{a.title}}</span>
          <el-button style="float: right;
               padding: 3px 0" @click="showAlgorithm(a.id)" type="text">查看全文</el-button>
        </div>
        <div class="text item"
             style="
               height:60px;
               line-height: 20px;
               overflow: hidden;
               text-overflow: ellipsis;
               display: -webkit-box;
               -webkit-box-orient: vertical;
               -webkit-line-clamp:3;
               text-align: left;
            " >
          <span style="color: #8a8a8a;">{{a.context}}</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="6">
              <div style="text-align: left" v-show="showButton">
                <el-button @click="edit_algorithm(a.id)" type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
                <el-button :plain="true" @click="dialogVisible = true" type="danger" size="mini" icon="el-icon-delete">删除</el-button>
                <el-dialog
                  :visible.sync="dialogVisible"
                  width="25%">
                  <span>确认删除？</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                    <el-button size="mini" type="primary" @click="delete_algorithm(a.id)">确 定</el-button>
                  </span>
                </el-dialog>
              </div>
            </el-col>
            <el-col :span="18" :offset="p_offset">
              <div style="text-align: right">
                <span>发表于{{a.createTime}}</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <div style="height: 20px"></div>
    </div>
    <div style="text-align: center">
      <el-pagination
        background
        hide-on-single-page=""
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pageNum"
        layout="prev, pager, next"
        :page-count="pageInfo.pages">
      </el-pagination>
    </div>
    <div v-show="show"
         style="text-align: center">
      <span>没有更多文章啦！</span>
    </div>
  </div>
</template>

<script>
import {getRequest, putRequest} from '@/util/api'

export default {
  name: 'AlgorithmList',
  inject: ['reload'],
  data () {
    return {
      p_offset: 6,
      dialogVisible: false,
      showButton: false,
      show: false,
      pageInfo: {
        pages: 1,
        pageNum: 1
      },
      algorithm: [

      ]
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      getRequest('/api/algorithm/all?pageSize=5&pageNum=' + this.pageInfo.pageNum).then(resp => {
        if (resp.data.data.list != null) {
          console.log(resp.data.data.list)
          this.pageInfo.pages = resp.data.data.pages
          this.algorithm = resp.data.data.list
        } else {
          this.show = true
        }
      }, (resp) => {
        console.log(resp)
      })
    },
    showAlgorithm (id) {
      this.$router.push({name: 'Algorithm', query: {id: id}})
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pageInfo.pageNum = val
      this.getList()
    },
    show_button () {
      if (this.showButton) {
        this.showButton = false
        this.p_offset = 6
      } else {
        this.showButton = true
        this.p_offset = 0
      }
    },
    edit_algorithm (id) {
      this.$router.push({name: 'EditAlgorithm', query: {id: id}})
    },
    delete_algorithm (id) {
      putRequest('/api/algorithm/delete?id=' + id).then(resq => {
        console.info(resq.data.msg)
        this.dialogVisible = false
        this.reload()
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      })
    }
  }
}
</script>

<style scoped>
  #list {
    margin: auto;
    width: 80%;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>
