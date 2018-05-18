<!-- 文章 > 合集 -->
<template>
  <div class="collection clearfix">
    <!-- left -->
    <div class="nav">
      <h3 class="title text-center">{{ title }}</h3>
      <p class="desc text-center">{{ desc }}</p>
      <ul class="mark-box shadow">
        <li class="mark"
            :class="{'active': index === activeIndex}"
            v-for="(item, index) in list"
            :key="index"
            @click="selectArticle(index, item._id)">
          <y-crown></y-crown>
          {{ item.name }}
        </li>
      </ul>
    </div>
    <!-- right -->
    <div class="article-box shadow clearfix">
      <ul>
        <li class="content text-left"
            v-for="(item, index) in articleList"
            :key="index"
            @click="toArticle(item._id)">
          <router-link  :to="'/p/'+ item._id">
            <y-crown></y-crown>
            <span>{{ item.title }}</span>
            <span class="right">{{ item.time }}</span>
          </router-link>
        </li>
      </ul>
      <a class="more-article"
          href="javascript:;"
          v-if="articleList.length > 10"
          @click="toMore">查看更多文章</a>
    </div>
  </div>
</template>

<script>
import YCrown from 'components/crown/crown'
import api from 'api'
import { dateFormat } from 'common/js/util'

export default {
  /**
   * props   :
   * desc    :
   * list    :
   * category:
   */
  props: {
    title: {
      type: String,
      default: '文章合集'
    },
    desc: {
      type: String,
      default: 'Collection of articles'
    },
    list: {
      type: Array,
      default: []
    },
    category: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      articleList: [],
      activeIndex: 0
    }
  },
  components: {
    YCrown
  },
  mounted () {
    this.getContentByCategory(this.category)
  },
  methods: {
    toMore () {
      this.$router.push('/article/more')
    },
    selectArticle (index, _id) {
      this.activeIndex = index
      // todo from api to content
      this.getContentByCategory(_id)
    },
    // 获取文章标题
    getContentByCategory (type) {
      this._getContentByCategory(type, (error, data) => {
        if (error) {
          return this.errorTip(error)
        }
        if (data.status.code === 0) {
          this.articleList = data.result.list.map(item => {
            item.time = dateFormat(item.createdAt, 'yyyy-MM-dd hh:ss')
            return item
          })
        }
      })
    },
    // 获取文章标题
    _getContentByCategory (category, callback) {
      api.getContentByCategory(category, {
        offset: this.offset,
        limit: this.limit
      }).then(data => {
        callback(null, data)
      }).catch(error => {
        callback(error.status.message)
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.collection
  margin-bottom: 0.5rem
  .nav
    float: left
    padding-top: 0.8rem
    .title
      font-size: 0.18rem
      margin-bottom: 0.15rem
    .desc
      font-size: 0.14rem
      margin-bottom: 0.5rem
  .mark-box
    border: 1px solid #cacaca
    border-radius: 3px
    width: 1.5rem
    text-align: center
    .mark
      height: 0.4rem
      line-height: 0.4rem
      position: relative
      transition: 0.2s all
      cursor: pointer
      transition: 0.5s all
      &:after
        content: ''
        width: 1rem
        height: 1px
        background: #cacaca
        position: absolute
        left: 0.25rem
        bottom: 0
      &:last-child:after
        height: 0
      &:hover
        border-radius: 3px
        background: #ff5f52
        color: #ffffff
        box-shadow: 0 0 40px #bbb
      &:hover:after
        z-index: -1
      .crown
        position: absolute
        left: 0.15rem
        top: 0.08rem
    .active
      border-radius: 3px
      background: #ff5f52
      color: #ffffff
      box-shadow: 0 0 40px #bbb
  .article-box
    float: right
    width: 7.5rem
    max-height: 4rem
    padding: 0.14rem 0
    border-radius: 3px
    background: #ffffff
    .content
      font-size: 0.18rem
      line-height: 0.35rem
      padding: 0 0.5rem
      position: relative
      cursor: pointer
      &:hover
        background: #082038
        color: #ffffff
        a
          color: #ffffff
      &:hover:after
        z-index: -1
      &:after
        content: ''
        width: 6.5rem
        height: 1px
        background: #d9d9d9
        position: absolute
        left: 0.5rem
        bottom: 0
      .crown
        float: left
        margin-top: 0.03rem
        margin-right 0.13rem
    .more-article
      float: right
      color: #ff5f52
      line-height: 0.7rem
      font-size: 0.18rem
      margin-right: 0.5rem
</style>
