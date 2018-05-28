<template>
  <y-layout menu="login">
    <div class="content-home">
      <div class="content-login-box shadow">
        <h1 class="iconfont">登陆 Sign in</h1>
        <div class="input-group">
          <div class="input-item">
            <input type="text" v-model="email" placeholder="用户名" class="input-name form-input shadow"/>
          </div>
          <div class="input-item">
            <input type="password" v-model="password" placeholder="密码" class="form-input shadow"/>
          </div>
        </div>
        <div class="btn form-btn iconfont" @click="submit">登录</div>
      </div>
    </div>
  </y-layout>
</template>

<script>
import YLayout from 'components/layout/layout'
import api from 'api'
import storage from 'common/js/storage.js'
import CONST from 'api/const'

export default {
  components: {
    YLayout
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    submit () {
      if (this._validate()) {
        this._login((error, data) => {
          if (error) {
            return this.errorTip(error)
          }
          if (data.status.code === 0) {
            this.successTip('登录成功')
            storage.set(CONST.STORAGE_AUTH_TOKEN, data.result.token)
            this.$router.push('/')
          }
        })
      }
    },
    _validate () {
      if (!this.email || !this.email.trim().length) {
        this.warnTip('您的账号不能为空')
        return false
      }
      // if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)) {
      //   this.warnTip('您的账号格式错误')
      //   return false
      // }
      if (!this.password || !this.password.trim().length) {
        this.warnTip('您的密码不能为空')
        return false
      }
      return true
    },
    _login (callback) {
      api.login({
        email: this.email,
        password: this.password
      }).then(data => {
        callback(null, data)
      }).catch(error => {
        callback(error.status.message)
      })
    },
    successTip (msg) {
      this.$notify({ type: 'success', title: '成功', text: msg })
    },
    errorTip (msg) {
      this.$notify({ type: 'error', title: '错误', text: msg })
    },
    warnTip (msg) {
      this.$notify({ type: 'warn', title: '警告', text: msg })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.content-home
  position: relative
  height: 100%
  .content-login-box
    width: 5rem
    padding: 0.04rem 0.25rem 0.4rem
    background-color: #fff
    position: absolute
    top: 40%
    left: 50%
    margin-left: -2.5rem
    margin-top: -1.91rem
    border-radius: 6px
    h1
      margin: 0 auto 0.25rem
      height: 0.5rem
      color: #000000
      font-size: 20px
      letter-spacing: 4px
      line-height: 0.5rem
      border-bottom: 1px solid #b1b1b1
    .input-group
      margin: 0 auto
      width: 4.28rem
      .input-item
        position: relative
        margin-bottom: 0
        input
          width: 100%
          height: 0.4rem
          margin-bottom: 0.27rem
          text-indent 2em
        .input-icon
          position: absolute
          top: 0.15rem
          left: 0.11rem
          font-size: 18px
          color: #969696
          display: block
          width: 0.18rem
          height: 0.2rem
          background-size: 18px 20px
          background-repeat: no-repeat
    .btn
      display: block
      margin: 0 auto
      padding: .06rem .18rem
      font-weight: bold
      &:hover
      &:focus
        color: #fff
        background-color: #ff5f52
        border-color: #ff5f52
@media (max-width:768px)
  .content-home
    .content-login-box
      width: 2rem
      margin-left: -1.5rem
      .input-group
        .input-item
          input
            width: 1.51rem
</style>
