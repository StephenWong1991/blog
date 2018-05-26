<template>
  <div class="app-wrapper">
    <y-header :class="{'home': menu === 'index'}"
              :isTransparent="menu === 'index'"
              :title="blog.title"
              @openMenus="openSideBar"></y-header>
    <!-- left -->
    <div class="app-wrapper-menus iconfont" :class="{'side-bar': isOpenSideBar}">
      <div class="sidebar-close" @click="closeSideBar">
        <y-icon name="close-w" width="22" height="22" />
      </div>
      <router-link tag="a" class="logo-wrapper" to="/">
        <img class="shadow" src="../../assets/logo.jpg"/>
      </router-link>
      <y-menus :menu="menu" @clickMenus="closeSideBar"></y-menus>
      <div class="logo-title text-shadow">
        <span>copyright©</span>
        <a target="_blank" class="font-text" :href="blog.weibo">{{blog.title}}</a>
        <a class="font-text" @click="gotoLogin" href="javascript:;">个人博客</a>
      </div>
    </div>
    <div class="app-wrapper-mask" :class="{'side-bar': isOpenSideBar}"></div>
    <!-- right -->
    <div class="app-wrapper-main">
      <div class="content-wrapper clearfix" :class="{'home': ['index', 'login', 'video'].indexOf(menu) > -1, 'fade-in': menu !== 'index', 'opacity-in': menu === 'index'}">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import YMenus from 'components/layout/menus'
import YHeader from 'components/layout/header'
import YIcon from 'components/icon/icon'

import CONST from 'api/const'
const blog = CONST.blog || []

export default {
  components: {
    YMenus,
    YHeader,
    YIcon
  },
  props: {
    menu: {
      type: String,
      default: 'index'
    }
  },
  data () {
    return {
      blog: blog,
      isOpenSideBar: false
    }
  },
  methods: {
    openSideBar () {
      this.isOpenSideBar = true
    },
    closeSideBar () {
      this.isOpenSideBar = false
    },
    gotoLogin () {
      // if (storage.get(STORAGE_AUTH_TOKEN)) {
      //   this.$router.push('/')
      // } else {
      this.$router.push('/login')
      // }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.fade-in
  animation: fade-in .5s
@keyframes fade-in
  0%
    opacity: 0
    transform: translateY(20px)
  100%
    opacity: 1
    transform: translateY(0px)
.opacity-in
  animation: opacity .5s
@keyframes opacity
  0%
    opacity: 0
  100%
    opacity: 1
</style>
