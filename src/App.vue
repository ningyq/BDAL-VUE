<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple" style="margin-top: 8px">
            <img src="./assets/logoData.png"/>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content bg-purple-light">
            <el-menu :default-active="$route.path"
                     class=""
                     mode="horizontal"
                     background-color="#B3C0D1"
                     text-color="#333"
                     active-text-color="#111"
                     menu-trigger="click"
                     router=""
                     @select="handleSelect">
              <el-menu-item index="/" route="/">首页</el-menu-item>
              <el-submenu index="">
                <template slot="title">分类</template>
                <el-menu-item
                  v-for="item in options"
                  :key="item.value"
                  :index="item.url"
                  :route="item.url">{{item.value}}</el-menu-item>
              </el-submenu>
              <el-menu-item index="/add" route="/add">编写文章</el-menu-item>
            </el-menu>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <div id="app">
        <router-view v-if="isRouterAlive"/>
      </div>
    </el-main>
    <el-footer style="height: 40px">&copy;2019 西安邮电大学大数据与人工智能协会</el-footer>
  </el-container>
</template>

<script>
import {getRequest} from '@/util/api'

export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      activeIndex: '1',
      isRouterAlive: true,
      options: [

      ]
    }
  },
  mounted () {
    getRequest('/api/classify/all').then(resp => {
      this.options = resp.data.data
    }, (resp) => {
      console.log(resp)
    })
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 40px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /*text-align: center;*/
    /*line-height: 800px;*/
    /*height: 800px;*/
    min-height: 640px;
    height: 100%;
  }
</style>
