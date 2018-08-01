import Vue from 'vue'
import Router from 'vue-router'
import Index from 'pages/index/index'
import Login from 'pages/login/login'
import Video from 'pages/video/video'
import Article from 'pages/article/article'
import ArticleCreate from 'pages/article/create'
import More from 'pages/article/more'
import PostCreate from 'pages/writer/create'
import Post from 'pages/writer/post'

Vue.use(Router)

let routes = [
  {
    name: '首页',
    path: '/',
    component: Index
  },
  {
    path: '/index',
    redirect: '/'
  },
  {
    name: '登陆',
    path: '/login',
    component: Login
  },
  {
    name: '视频',
    path: '/video',
    component: Video
  },
  {
    name: '文章',
    path: '/article',
    component: Article
  },
  {
    name: '创建合集',
    path: '/article/create',
    component: ArticleCreate
  },
  {
    name: '写博文',
    path: '/article/editPost',
    component: PostCreate
  },
  {
    name: '文章详情',
    path: '/p/:id',
    component: Post
  },
  {
    name: '更多',
    path: '/article/more',
    component: More
  },
  {
    path: '*',
    redirect: '/'
  }
]

export default new Router({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
