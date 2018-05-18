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
  { path: '/', component: Index },
  { path: '/index', redirect: '/' },
  { path: '/login', component: Login },
  { path: '/video', component: Video },
  // 文章页
  { path: '/article', component: Article },
  // 创建合集
  { path: '/article/create', component: ArticleCreate },
  // 写博文
  { path: '/article/editPost', component: PostCreate },
  // 文章详情
  { path: '/p/:id', component: Post },
  { path: '/article/more', component: More },
  { path: '*', redirect: '/' }
]

export default new Router({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
