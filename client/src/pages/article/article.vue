<template>
  <y-layout menu="article">
    <div class="content-home">
      <!-- need auth -->
      <div v-if="isAuth">
        <button class="form-btn iconfont" @click="toPage('/article/create')">创建合集</button>
        <button class="form-btn iconfont" @click="toPage('/article/editPost')">写博文</button>
      </div>

      <div class="article-header">
        <h2 class="article-header-title iconfont">文章推荐</h2>
        <p class="article-header-desc">既然有心易悲伤，何不无心走一遭</p>
      </div>
      <ul class="content-article-box clearfix">
        <li v-for="(item, index) in list" :key="index" class="content-article shadow">
          <div class="article-poster" :style="'background-image: url(' + item.cover  + ')'">
            <span class="article-title" @click="toArticle(item.pathname)">{{ item.name }} 系列</span>
          </div>
          <p class="content-article-time" :title="item.time">{{ item.time }}</p>
        </li>
      </ul>

      <div class="article-header">
        <h2 class="article-header-title iconfont">合集</h2>
        <p class="article-header-desc">日光倾城，暖了遍地流年</p>
      </div>
      <div v-if="category1">
        <y-collection :title="'短篇合集'" :desc="'Short collection'" :list="shortList" :category="category1"></y-collection>
      </div>
      <div v-if="category2">
        <y-collection :title="'长篇合集'" :desc="'Long collection'" :list="longList" :category="category2"></y-collection>
      </div>
    </div>
  </y-layout>
</template>

<script>
import YLayout from 'components/layout/layout'
import YCollection from 'components/collection/collection'
import storage from 'common/js/storage.js'
import CONST from 'api/const'
import api from 'api'
import { dateFormat } from 'common/js/util'

export default {
  components: {
    YLayout,
    YCollection
  },
  data () {
    return {
      isAuth: false,
      list: [],
      shortList: [],
      longList: [],
      category1: null,
      category2: null
    }
  },
  activated () {
    this.initDate()
  },
  methods: {
    initDate () {
      this.isAuth = !!storage.get(CONST.STORAGE_AUTH_TOKEN)
      this.getArticleList()
    },
    getArticleList () {
      this._getArticleList((error, data) => {
        if (error) {
          return this.errorTip(error)
        }
        this.list = data.result.list.map(item => {
          item.time = dateFormat(item.updatedAt, 'yyyy-MM-dd hh:ss')
          if (/^[0-9a-f]{24}$/.test(item.cover)) {
            item.cover = `${api.host}/i/${item.cover}`
          }
          return item
        })
        this.shortList = this.list.filter(item => item.length === 'shortCollection')
        this.category1 = this.shortList[0]._id
        this.longList = this.list.filter(item => item.length === 'longCollection')
        this.category2 = this.longList[0]._id
      })
    },
    toPage (path) {
      this.$router.push(path)
    },
    toArticle (address) {
      console.log(address)
    },
    _getArticleList (callback) {
      api.getCategory().then(data => {
        callback(null, data)
      }).catch(error => {
        callback(error.status.message)
      })
    },
    errorTip (error) {
      return this.$notify({ type: 'error', title: '错误', text: error })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.content-home
  position: relative
  height: 100%
  padding: .5rem 0
  .form-btn
    font-weight: bold
  .article-header
    text-align: right
    color: #000000
    .article-header-title
      font-size: .24rem
    .article-header-desc
      font-size: .18rem
      line-height: .78rem
      margin-bottom: .4rem
      position: relative
      &:before
        content: ""
        width: 5rem
        height: 1px
        background: #b2b2b2
        position: absolute
        right: 0
        bottom: 0
  .content-article-box
    width: 9.5rem
    margin: 0 auto
    .content-article
      width: 4.5rem
      height: 2.6rem
      float: left
      margin-bottom: 0.3rem
      background: #ffffff
      border-radius: 3px
      overflow: hidden
      &:nth-child(2n)
        margin-left: .3rem
      .article-poster
        width: 100%
        height: 2.3rem
        position: relative
        background-size: 100% 100%
        background-position: center center
        transition: .4s all linear
        &:hover
          background-size: 130% 130%
        .article-title
          position: absolute
          width: 2.8rem
          height: .5rem
          background: rgba(0, 0, 0, 0.4)
          color: #FFFFFF
          line-height: .5rem
          text-align: center
          font-size: .18rem
          left: 50%
          top: 50%
          transform: translate3d(-50%, -50%, 0)
          cursor: pointer
      .content-article-time
        line-height: .3rem
        font-size: .14rem
        text-indent: .3rem
      .video-mark
        padding-top: .15rem
        font-size .16rem
        color: #848484
</style>
