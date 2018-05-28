<template>
  <div class="bm-panel content-comment-creat shadow">
    <h4 class="content-comment-title iconfont">評論 Commit</h4>
    <div class="content-comment-creat-meta">
      <div class="content-comment-creat-name">
        <input class="form-control form-input shadow" v-model="name" type="text" name="name" placeholder="昵称[111.207.128.*]">
      </div>
      <div class="content-comment-creat-email">
        <input class="form-control form-input shadow" v-model="email" type="text" name="email" placeholder="邮箱">
      </div>
    </div>
    <div class="content-comment-creat-textarea">
      <span class="content-comment-creat-placeholder iconfont" v-if="!content.length">畅所欲言</span>
      <textarea class="form-control form-input shadow" v-model="content" placeholder="说点什么吧~" name="content"></textarea>
    </div>
    <div class="content-comment-creat-submit clearfix">
      <a class="form-btn btn-submit iconfont" @click="submit">评论</a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      email: '',
      content: ''
    }
  },
  methods: {
    submit () {
      if (this._validate()) {
        this.$emit('submit', {
          name: this.name,
          email: this.email,
          content: this.content
        })
      }
    },
    reset () {
      this.name = ''
      this.email = ''
      this.content = ''
    },
    _validate () {
      if (this.email && !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)) {
        this.warnTip('您的邮箱格式错误')
        return false
      }
      if (!this.content || !this.content.trim().length) {
        this.warnTip('请输入您的留言内容')
        return false
      }
      return true
    },
    warnTip (msg) {
      this.$notify({ type: 'warn', title: '警告', text: msg })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
@import "~common/stylus/base"
.content-comment-creat
  margin-top: 0.4rem
  padding: .35rem .5rem
  border-radius: 10px
  .content-comment-title
    width: 50%
    padding-bottom: .2rem
    margin-bottom: .25rem
    font-size: .2rem
    border-bottom: 1px solid #b1b1b1
  .content-comment-creat-meta
    font-size: 0
    margin-bottom: 0.15rem
    .content-comment-creat-name
    .content-comment-creat-email
      display: inline-block
      width: 49%
      font-size: 0.14rem
      .form-control
        width: 96%
        padding: 0.07rem 2%
    .content-comment-creat-name
      margin-right: 2%
  .content-comment-creat-textarea
    margin-bottom: 0.3rem
    position: relative
    .content-comment-creat-placeholder
      font-size .24rem
      color: #bbbbbb
      letter-spacing: .08rem
      position: absolute
      left: 50%
      top: 50%
      transform: translate(-50%, -50%)
    textarea
      width: calc(100% - 0.4rem)
      height: 1.2rem
      padding: .15rem .2rem
      background-image: url(./image/smile.png)
      background-repeat: no-repeat
      background-position: .15rem 1.2rem
      background-size: 22px
  .content-comment-creat-submit
    .btn-submit
      float: right
</style>
