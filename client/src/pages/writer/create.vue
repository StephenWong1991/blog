<template>
  <y-layout menu="article">
    <div class="bm-panel plan-content shadow text-shadow">
      <h1>写文章</h1>
      <y-input name="title" v-model="title" placeholder="请输入标题" value="category"></y-input>
      <y-input type="radio" :value="category" :list="categoryList" @change="changeRadio"></y-input>
      <y-editor name="content" placeholder="编辑器" ref="editor"></y-editor>
      <y-button @submit="submit"></y-button>
    </div>
  </y-layout>
</template>

<script>
import YLayout from 'components/layout/layout'
import YInput from 'components/input/input'
import YEditor from 'components/editor/editor'
import YButton from 'components/button/button'
import api from 'api'

export default {
  components: {
    YLayout,
    YInput,
    YEditor,
    YButton
  },
  data () {
    return {
      title: null,
      categoryList: [],
      category: null,
      markdown: null
    }
  },
  activated () {
    this.clearData()
  },
  methods: {
    clearData () {
      this.title = null
      this.markdown = null
      this.$refs.editor.set('')
      this.getArticleList()
    },
    changeRadio (value) {
      this.category = value
    },
    getArticleList () {
      this._getArticleList((error, data) => {
        if (error) {
          return this.errorTip(error)
        }
        this.categoryList = data.result.list.map(item => {
          item.value = item.name
          return item
        })
        this.category = this.categoryList[0].value
      })
    },
    submit () {
      this.markdown = this.$refs.editor.get()
      if (this._validate()) {
        this._insertContent({
          title: this.title,
          category: this.category,
          markdown: this.markdown
        }, (error, data) => {
          if (error) {
            return this.errorTip(error)
          }
          if (data.status.code === 0) {
            this.successTip('创建成功')
            setTimeout(() => {
              this.$router.back()
            }, 1000)
          }
        })
      }
    },
    _validate () {
      if (!this.title) {
        this.warnTip('请输入标题')
        return false
      }
      if (!this.markdown) {
        this.warnTip('请输入内容')
        return false
      }
      return true
    },
    _getArticleList (callback) {
      api.getCategory().then(data => {
        callback(null, data)
      }).catch(error => {
        callback(error.status.message)
      })
    },
    _insertContent (option, callback) {
      api.insertContent(option).then(data => {
        callback(null, data)
      }).catch(error => {
        callback(error.status.message)
      })
    },
    successTip (msg) {
      this.$notify({ type: 'success', title: '成功', text: msg })
    },
    warnTip (msg) {
      this.$notify({ type: 'warn', title: '警告', text: msg })
    },
    errorTip (msg) {
      this.$notify({ type: 'error', title: '错误', text: msg })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.plan-content
  padding: 3% 4% 4%
  h1
    letter-spacing: 2px
    font-size: 0.40rem
    padding-bottom: 3%
    margin-bottom: 4%
    border-bottom: 1px dashed #ddd
    color: rgba(0,0,0,0.75)
    text-align: center
  .btn
    width: 100%
    margin: 0 auto
@media (max-width: 768px)
  .plan-content
    margin-top: 0.5rem
    margin-bottom: 0
    .input
      padding-right: 0
    .btn
      width: 100%
</style>
