import Vue from 'vue'
import Router from 'vue-router'
import AddAlgorithm from '@/components/AddAlgorithm'
import AlgorithmList from '@/components/AlgorithmList'
import Algorithm from '@/components/Algorithm'
import AlgorithmClassify from '@/components/AlgorithmClassify'
import Error404 from '@/components/Error404'
import EditAlgorithm from '@/components/EditAlgorithm'
import Algorithms from '@/components/Algorithms'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AlgorithmList',
      component: AlgorithmList,
      meta: {
        title: '大数据与人工智能协会算法管理系统'
      }
    },
    {
      path: '/add',
      name: 'AddAlgorithm',
      component: AddAlgorithm,
      meta: {
        title: '添加文章_大数据与人工智能协会算法管理系统'
      }
    },
    {
      path: '/id',
      name: 'Algorithm',
      component: Algorithm,
      meta: {
        title: '详情_大数据与人工智能协会算法管理系统'
      }
    },
    {
      path: '/search',
      name: 'Algorithms',
      component: Algorithms,
      meta: {
        title: '搜索_大数据与人工智能协会算法管理系统'
      }
    },
    {
      path: '/edit',
      name: 'EditAlgorithm',
      component: EditAlgorithm,
      meta: {
        title: '编辑文章_大数据与人工智能协会算法管理系统'
      }
    },
    {
      path: '/classify/:classify',
      name: 'AlgorithmClassify',
      component: AlgorithmClassify,
      meta: {
        title: '分类_大数据与人工智能协会算法管理系统'
      }
    },
    {
      path: '*',
      name: Error404,
      component: Error404,
      meta: {
        title: '错误页_大数据与人工智能协会算法管理系统'
      }
    }
  ]
})
