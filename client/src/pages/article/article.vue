<template>
  <y-layout menu="article">
    <div class="content-home">
      <y-button class="iconfont" :text="'创建合集'" @submit="toPage('/article/create')"></y-button>
      <y-button class="iconfont" :text="'写博文'" @submit="toPage('/article/editPost')"></y-button>

      <div class="article-header">
        <h2 class="iconfont">文章推荐</h2>
        <p>既然有心易悲伤，何不无心走一遭</p>
      </div>
      <ul class="content-article-box clearfix">
        <li v-for="(item, index) in list" :key="index" class="content-article shadow">
          <div class="article-poster" :style="'background-image: url(' + item.cover  + ')'">
            <span class="article-title" @click="play(item.pathname)">{{ item.name }} 系列</span>
          </div>
          <p class="video-name text-overflow" :title="item.time">{{ item.time }}</p>
        </li>
      </ul>

      <div class="article-header">
        <h2 class="iconfont">合集</h2>
        <p>日光倾城，暖了遍地流年</p>
      </div>

      <div v-if="category1">
        <y-collection
          :title="'短篇合集'"
          :desc="'Short collection'"
          :list="shortList"
          :category="category1"></y-collection>
      </div>
      <div v-if="category2">
        <y-collection
          :title="'长篇合集'"
          :desc="'Long collection'"
          :list="longList"
          :category="category2"></y-collection>
      </div>
    </div>
  </y-layout>
</template>

<script>
import YLayout from 'components/layout/layout'
import YCollection from 'components/collection/collection'
import YButton from 'components/button/button'
import api from 'api'
import { dateFormat } from 'common/js/util'

const tempImageUrl = 'http://yitianyibu.com/static/image/small/*.jpg'

export default {
  components: {
    YLayout,
    YCollection,
    YButton
  },
  data () {
    return {
      list: [],
      shortList: [],
      longList: [],
      // articleList1: [],
      // articleList2: []
      category1: null,
      category2: null
    }
  },
  activated () {
    this.getArticleList()
  },
  methods: {
    // 获取全部合集(系列)
    getArticleList () {
      this._getArticleList((error, data) => {
        if (error) {
          return this.errorTip(error)
        }
        this.list = data.result.list.map(item => {
          item.time = dateFormat(item.updatedAt, 'yyyy-MM-dd hh:ss')
          if (item.cover) {
            if (/^[0-9a-f]{24}$/.test(item.cover)) {
              item.cover = `${api.host}/i/${item.cover}`
            } else {
              item.cover = item.cover
            }
          } else {
            item.cover = tempImageUrl.replace('*', String(item._id)[23])
          }
          return item
        })
        // 短篇合集
        this.shortList = this.list.filter(item => item.length === 'shortCollection')
        this.category1 = this.shortList[0]._id
        // this.articleList1 = await this.getContentByCategory(this.shortList[0]._id)
        // 长篇合集
        this.longList = this.list.filter(item => item.length === 'longCollection')
        this.category2 = this.longList[0]._id
        // this.articleList2 = await this.getContentByCategory(this.longList[0]._id)
      })
    },
    // // 获取文章标题
    // getContentByCategory (type) {
    //   this._getContentByCategory(type, (error, data) => {
    //     if (error) {
    //       return this.errorTip(error)
    //     }
    //     if (data.status.code === 0) {
    //       return data.result.list
    //       // console.log('-----------')
    //       // console.log(data)
    //       // console.log('-----------')
    //       // this.info = {
    //       //   id: data.result.info._id,
    //       //   name: data.result.info.name,
    //       //   desc: data.result.info.desc
    //       // }
    //       // if (data.result.info.cover) {
    //       //   if (/^[0-9a-f]{24}$/.test(data.result.info.cover)) {
    //       //     this.info.cover = `${api.host}/i/${data.result.info.cover}`
    //       //   } else {
    //       //     this.info.cover = data.result.info.cover
    //       //   }
    //       // } else {
    //       //   this.info.cover = tempImageUrl.replace('*', String(data.result.info._id)[23])
    //       // }
    //       // this.list = data.result.list.map(item => {
    //       //   item.time = dateFormat(item.createdAt, 'yyyy-MM-dd hh:mm')
    //       //   return item
    //       // })
    //       // this.offset = data.result.meta.offset + this.limit
    //     }
    //   })
    // },
    toPage (path) {
      this.$router.push(path)
    },
    play (address) {
      console.log(address)
    },
    /** tip **/
    errorTip (error) {
      return this.$notify({ type: 'error', title: '错误', text: error })
    },
    /** api **/
    // 获取全部合集
    _getArticleList (callback) {
      api.getCategory().then(data => {
        callback(null, data)
      }).catch(error => {
        callback(error.status.message)
      })
    }
    // // 获取文章标题
    // async _getContentByCategory (category, callback) {
    //   api.getContentByCategory(category, {
    //     offset: this.offset,
    //     limit: this.limit
    //   }).then(data => {
    //     callback(null, data)
    //   }).catch(error => {
    //     callback(error.status.message)
    //   })
    // }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.content-home
  position: relative
  height: 100%
  padding: 0.5rem 0
  .article-header
    text-align: right
    color: #000000
    h2
      font-size: 0.24rem
    p
      font-size: 0.18rem
      line-height: 0.78rem
      position: relative
      margin-bottom: 0.4rem
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
    // margin: 0 auto
    .content-article
      width: 4.5rem
      height: 2.6rem
      float: left
      margin-bottom: 0.3rem
      background: #FFFFFF
      border-radius: 3px
      overflow: hidden
      &:nth-child(2n)
        margin-left: 0.3rem
      .article-poster
        width: 100%
        height: 2.3rem
        position: relative
        background-size: 100% 100%
        .article-title
          position: absolute
          width: 2.8rem
          height: 0.5rem
          background: rgba(0, 0, 0, 0.4)
          color: #FFFFFF
          line-height: 0.5rem
          text-align: center
          font-size: 0.18rem
          left: 50%
          top: 50%
          transform: translate3d(-50%, -50%, 0)
          cursor: pointer
      p
        line-height: 0.3rem
        font-size: 0.14rem
        text-indent: 0.3rem
      .video-mark
        padding-top: 0.15rem
        font-size 0.16rem
        color: #848484
</style>
