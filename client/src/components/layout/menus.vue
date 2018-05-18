<template>
  <div class="menus-wrapper">
    <nav>
      <h1>
        {{ blog.title }}
        <br>
        {{ blog.describe }}
      </h1>
      <a
        v-for="(item, index) in list"
        :key="index"
        :class="{'on': menu === item.menu}"
        @click="clickMenus(item.to || '/')">
        {{ item.title }}
      </a>
    </nav>
  </div>
</template>

<script>
import CONST from 'api/const'

const menus = CONST.menus || []
const blog = CONST.blog || []

export default {
  props: {
    menu: {
      type: String,
      default: 'index'
    }
  },
  data () {
    return {
      list: [],
      blog: {}
    }
  },
  mounted () {
    this._initData()
  },
  methods: {
    _initData () {
      this.list = menus
      this.blog = blog
    },
    clickMenus (to) {
      if (document.documentElement.clientWidth >= 992) {
        this.$router.push(to)
      } else {
        this.$emit('clickMenus')
        setTimeout(() => {
          this.$router.push(to)
        }, 400)
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.menus-wrapper
  position: absolute
  top: 2.1rem
  left: 0
  width: 100%
  bottom: 0.50rem
  nav
    height: 100%
    width: 100%
    overflow-x: hidden
    overflow-y: auto
    font-size: 0.2rem
    text-align: center
    letter-spacing: 4px
    h1
      position: relative
      left: 50%
      transform: translate3d(-50%, 0, 0)
      width: 100%
      color: #ffffff
      padding-bottom: 0.3rem
      font-weight: bold
    a
      position: relative
      display: block
      width: 100%
      line-height: 0.8rem
      color: #ffffff
      transition: all 0.5s
      cursor: pointer
      &.on
      &:hover
        color: #13d1ae
      &:after
      &:before
        content: ''
        display: block
        background-color: currentColor
        position: absolute
        width: 0
        height: 0.04rem
        margin: auto
        transition: all 0.5s
      &:after
        bottom: 0.2rem
        right: 50%
      &:before
        bottom: 0.2rem
        left: 50%
      &.on:after
      &.on:before
      &:hover:after
      &:hover:before
        color: #13d1ae
        width: 0.1rem
</style>
