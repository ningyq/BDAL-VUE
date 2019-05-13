<template>
  <div style="text-align: left" id="algorithmForm">
    <el-form label-width="55px" :model="algorithm" :rules="rules" ref="algorithm">
      <el-form-item label="标题" prop="title">
        <el-input v-model="algorithm.title" clearable="" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="classify"  style="width: 160px">
        <el-select v-model="algorithm.classify" clearable placeholder="请选择分类">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.value"
            :value="item.value"
           >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="context">
        <mavon-editor style="height: 100%; min-height: 400px" v-model="algorithm.context" :toolbarsFlag="false" :shortCut="false" @change="changeData" />
      </el-form-item>
      <el-form-item>
        <el-button :plain="true" type="primary" @click="submit_algorithm('algorithm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getRequest, putRequest} from '@/util/api'

export default {
  name: 'EditAlgorithm',
  data () {
    return {
      algorithm: {
      },
      options: [

      ],
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        classify: [
          { required: true, message: '请选择分类', trigger: 'change' }
        ],
        context: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.getClassify()
    this.getAlgorithm()
  },
  methods: {
    getClassify () {
      getRequest('/api/classify/all').then(resp => {
        this.options = resp.data.data
      }, (resp) => {
        console.log(resp)
      })
    },
    getAlgorithm () {
      getRequest('/api/algorithm/id?id=' + this.$route.query.id).then(resp => {
        this.algorithm = resp.data.data
      }, (resp) => {
        console.log(resp)
      })
    },
    changeData (value, render) {
      console.log(value)
      console.log(render)
      this.algorithm.remark = render
    },
    submit_algorithm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          putRequest('/api/algorithm/update',
            {
              id: this.algorithm.id,
              title: this.algorithm.title,
              classify: this.algorithm.classify,
              context: this.algorithm.context,
              remark: this.algorithm.remark
            }).then(resp => {
            this.$message({
              message: '恭喜你，' + resp.data.msg,
              type: 'success'
            })
            console.log(resp.data.msg)
          })
          this.$refs[formName].resetFields()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #algorithmForm {
    margin: auto;
    width: 80%;
  }
</style>
