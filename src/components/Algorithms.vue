<template>
  <div id="list">
    <div v-for="a in algorithm"
         :key="a.id">
      <el-card shadow="hover">
        <div slot="header" class="clearfix">
          <span style="font-size: 18px;font-weight: bolder; text-align: left">{{a.title}}</span>
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
            <el-col :span="12">
              <div style="text-align: left">
                <el-button @click="edit_algorithm(a.id)" type="primary" size="mini" >编辑</el-button>
                <el-button :plain="true" @click="delete_id(a.id)" type="danger" size="mini">删除</el-button>
              </div>
            </el-col>
            <el-col :span="12">
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
  name: 'Algorithms',
  inject: ['reload'],
  data () {
    return {
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
      getRequest('/api/algorithm/' + this.$route.query.searchType + '?pageSize=5&pageNum=' + this.pageInfo.pageNum + '&' + this.$route.query.searchType + '=' + this.$route.query.searchText).then(resp => {
        console.log(resp.data.data.list)
        this.pageInfo.pages = resp.data.data.pages
        this.algorithm = resp.data.data.list
        if (resp.data.data.total !== 0) {
          this.show = false
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
