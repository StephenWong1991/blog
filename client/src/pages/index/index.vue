<template>
  <y-layout menu="index">
    <div class="content-home">
      <div class="content-home-tip text-shadow" :class="{'content-home-switch-tip': switchTip}">{{ tip }}</div>
      <div class="content-home-cover" :style="'background-image: url(' + imageUrl + ');'"></div>
    </div>
  </y-layout>
</template>

<script>
import YLayout from 'components/layout/layout'
import CONST from 'api/const'

const tips = CONST.tips || []

export default {
  components: {
    YLayout
  },
  data () {
    return {
      imageUrl: '',
      tip: '',
      switchTip: false
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.initBgImage()
      this.sayAWord()
      setInterval(this.sayAWord, 5000)
    },
    sayAWord () {
      this.switchTip = true
      setTimeout(() => {
        this.tip = `“${tips[Math.random() * tips.length >> 0]}”`
        this.switchTip = false
      }, 500)
    },
    initBgImage () {
      this.imageUrl = 'https://source.unsplash.com/random'
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.content-home
  position: relative
  height: 100%
  .content-home-tip
    position: absolute
    left: 50%
    top: 40%
    z-index: 1
    font-size: 0.19rem
    text-align: center
    line-height: 1.5
    padding: .1rem .2rem
    color: #ffffff
    background: #000000
    background-color: rgba(0, 0, 0, 0.6)
    transform: translate(-50%)
    transition: all .6s ease
    &.content-home-switch-tip
      opacity: 0
      transform: translate(-50%, 0%) translateY(10px)
  .content-home-cover
    // background-image: url(./image/banner1.jpg)
    background-position: center center
    background-repeat: no-repeat
    background-size: cover
    height: 80%
    position: relative
    top: 10%
    &:before
      content: ''
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      z-index: 0
      background-image: url(./image/mask.png)
@media (max-width: 992px)
  .content-home
    .content-home-cover
      top: 15%
</style>
