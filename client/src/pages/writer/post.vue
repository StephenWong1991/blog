<template>
  <y-layout menu="article">
    <div class="bm-panel post-content text-shadow">
      <div v-show="!loading">
        <div class="post-img" :style="'background-image: url(' + info.category.cover + ')'"></div>
        <div class="post-header">
          <h1 class="post-title iconfont">{{ info.title }}</h1>
          <div class="post-meta">
            <span class="post-time">发表于 {{ info.time }}</span>
            <span>{{ info.hits }} 次浏览</span>
            <span class="post-tags" v-for="(item, index) in info.tag">{{ item }}</span>
          </div>
          <hr/>
        </div>
        <div class="post-body shadow">
          <div v-html="info.html"></div>
          <div class="post-bar">
            <span class="post-like">
              <div class="post-like-case">
                <i class="post-heart"></i>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- <y-post-near v-show="!loading" :next="next" :prev="prev"></y-post-near>
    <y-comment-list v-if="false"></y-comment-list>
    <y-comment-create v-if="false"></y-comment-create> -->
    <y-post-near :next="next" :prev="prev"></y-post-near>
    <y-comment-create></y-comment-create>
    <y-comment-list></y-comment-list>
  </y-layout>
</template>

<script>
import YLayout from 'components/layout/layout'
import YCommentCreate from 'components/comment/create'
import YCommentList from 'components/comment/list'
import YPostNear from 'components/post-near/post-near'
import api from 'api'
import { dateFormat } from 'common/js/util'

export default {
  components: {
    YLayout,
    YCommentCreate,
    YCommentList,
    YPostNear
  },
  data () {
    return {
      loading: false,
      info: {
        title: null,
        html: null,
        hits: null,
        time: null,
        category: {
          title: null,
          desc: null
        },
        tag: null
      },
      prev: null,
      next: null
    }
  },
  activated () {
    this.initData()
  },
  methods: {
    initData () {
      this.getContentInfo()
    },
    getContentInfo () {
      this.loading = true
      this._getContentInfo((error, data) => {
        this.loading = false
        if (error) {
          return this.errorTip(error)
        }
        if (data.status.code === 0) {
          data.result.content.html = data.result.content.html.replace(/src="\/images/img, 'src="http://localhost:3000/images')
          data.result.content.html = data.result.content.html.replace(/src="\/i\//img, 'src="http://localhost:3000/i/')
          if (/^[0-9a-f]{24}$/.test(data.result.category.cover)) {
            data.result.category.cover = `${api.host}/i/${data.result.category.cover}`
          }
          this.info = {
            title: data.result.content.title || null,
            html: data.result.content.html || null,
            hits: data.result.content.hits || null,
            time: dateFormat(data.result.content.createdAt, 'yyyy-MM-dd'),
            // tag: data.result.content.tag || [],
            category: {
              title: data.result.category.name || null,
              desc: data.result.category.desc || null,
              cover: data.result.category.cover || null
            }
          }
          this.prev = (data.result.near && data.result.near.prev) || null
          this.next = (data.result.near && data.result.near.next) || null
        }
      })
    },
    _getContentInfo (callback) {
      api.getContentInfo(this.$route.params.id).then(data => {
        callback(null, data)
      }).catch(error => {
        callback(error.status.message)
      })
    },
    errorTip (msg) {
      this.$notify({ type: 'error', title: '错误', text: msg })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.post-img
  width: 100%
  height: 4rem
  background-repeat: no-repeat
  background-size: cover
  position: relative
  transition: 3s all linear
  &:before
    content: ""
    display: block
    position: absolute
    left: 0
    top: 0
    width: 0
    height: 100%
    z-index: 0
    background-image: url(../index/image/mask.png)
    transition: 3s all linear
  &:hover
    filter: sepia(65%)
  &:hover::before
    width: 100%
.post-header
  background-color: #fff
  padding: 3% 0 2%
  color: #222
  .post-title
    color: #333
    font-size: 0.3rem
    font-weight: 700
    line-height: 0.42rem
  .post-meta
    display: block
    font-size: .14rem
    margin-top: .1rem
    margin-bottom: .2rem
    color: #7f8c8d
    span
      margin-right: 0.15rem
      vertical-align: middle
      display: inline-block
    .post-tags
      color: #999
      background: #f8f8f8
      font-size: 12px
      line-height: 16px
      padding: 1px 7px
      border-radius: 4px
      border: 1px solid #ccc
      margin-right: 0.05rem
    .post-tags-br
      display: none
.post-body
  margin-top: 0.5rem
  border-radius: 10px
  padding: 0.25rem
  .markdown-text
    font-size: .16rem
    color: #000000
    line-height: 1.7
    word-break: break-all
    overflow: hidden
    width: 100%
    padding-bottom: .16rem
    padding-top: 0.1rem
    h1
    h2
    h3
    h4
    h5
    h6
      +p
        margin-top: 0.1rem
    h1
      font-size: 0.28rem
      margin-top: 0.4rem
      margin-bottom: 0.1rem
    h2
      font-size: 0.24rem
      margin-top: 0.4rem
      margin-bottom: 0.1rem
    h3
      font-size: 0.18rem
      margin-top: 0.4rem
      margin-bottom: 0.1rem
    p
      margin-bottom: 0.18rem
      margin-top: 0.18rem
      text-indent: 2em
      text-align: left
    a
      color: #009a61
      text-decoration: none
      border-bottom: 1px dashed #009a61
      &:hover
        color: #004e31
        border-bottom: 1px dashed #004e31
    code
      font-size: 0.14rem
      padding: 1px 4px
      border-radius: 3px
      margin: 0 3px
      background-color: #f7f7f7
      color: #009a61
    pre
      margin: 0
      line-height: 0
      code
        color: inherit
        font-size: 0.14rem
        margin: 0
        padding: 0.1rem 0.15rem
        border-radius: 6px
        border: 2px dashed #eee
        background-color: #fcfcfc
        display: block
        overflow: auto
        line-height: 1.7
    blockquote
      padding: 0.15rem 0.2rem
      border-left: 5px solid #ccc
      background-color: #f8f8f8
      margin: 0.2rem 0
      p
        margin: 0
    table
      font-size: 0.14rem
      width: 100%
      border-width: 1px
      border-color: #ddd
      border-collapse: collapse
      th
        padding: 5px
        border: 1px solid #ddd
        background-color: #eee
      td
        padding: 5px
        border: 1px solid #ddd
        background-color: #fcfcfc
    ul
      list-style: circle
      padding-left: 0.4rem
      li
        list-style: circle
        margin: 0.05rem 0
    ol
      padding-left: 0.4rem
      li
        list-style: cjk-ideographic
        list-style: outside
        list-style: inherit
        margin: 0.05rem 0
    hr
      margin: 0.25rem 0
      border: 0
      border-top: 1px dashed #ddd
    img
      margin: 0.15rem auto
      max-width: 100%
      display: block
      border-radius: 5px
    strong
      font-weight: bold
.post-bar
  padding: 2% 4%
  background-color: #fff
  text-align: center
  .post-like
    display: block
    margin: 0 auto
    width: .6rem
    height: .6rem
    line-height: .6rem
    cursor: pointer
    text-align: center
    border-radius: .12rem
    background-color: #ff6661
    .post-like-case
      width: 100%
      height: 100%
      transition: .5s all linear
      &:hover
        transform: rotateY(720deg) scale(1.3)
      .post-heart
        display: inline-block
        vertical-align: middle
        width: .2rem
        height: .2rem
        position: relative
        background: -webkit-linear-gradient(left top, #ffcdcb 50% , #ffe9e9 50%)
        transform: rotate(-45deg)
        &::after
          content: ''
          position: absolute
          z-index: -1
          left: 0
          top: -0.09rem
          width: .2rem
          height: .1rem
          background: #ffcdcb
          border-radius: 50px 50px 0 0
        &::before
          content: ''
          position: absolute
          z-index: -1
          left: 0.19rem
          top: 0
          width: .1rem
          height: .2rem
          background: #ffe9e9
          border-radius: 0 50px 50px 0
  .name
    color: #293846
    font-weight: 700
    font-size: 0.18rem
  .plan
    display: block
    margin-top: 0.16rem
    margin-bottom: 0.3rem
    font-size: 0.14rem
    color: #7f8c8d
@media (max-width: 992px)
  .post-content
    margin-top: 0.5rem
    margin-bottom: 0
    .post-title
    .post-body
    .post-bar
      padding-left: 0
      padding-right: 0
@media (max-width:768px)
  .post-header
    .post-meta
      span
        margin-bottom: 0.1rem
      .post-tags-br
        display: block
</style>
