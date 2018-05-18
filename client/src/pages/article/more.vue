<template>
  <y-layout menu="article">
    <div class="content-home">
      <ul class="content-video-box clearfix">
        <li v-for="(item, index) in list" :key="index" class="content-video shadow">
          <div class="video-poster"></div>
          <p class="video-name text-overflow" :title="item.desc">{{ item.desc }}</p>
          <p class="video-mark text-overflow" :title="item.mark">{{ item.mark }}</p>
        </li>
      </ul>
    </div>
  </y-layout>
</template>

<script>
import YLayout from 'components/layout/layout'

export default {
  components: {
    YLayout
  },
  props: {

  },
  data () {
    return {
      list: []
    }
  },
  activated () {
    this.initData()
  },
  methods: {
    initData () {
      this.list = [
        { desc: '学长你别怕，学弟不可怕', address: '1', mark: '你最珍贵，你别皱眉' },
        { desc: '学长你别怕，学弟不可怕', address: '1', mark: '你最珍贵，你别皱眉' },
        { desc: '学长你别怕，学弟不可怕', address: '1', mark: '你最珍贵，你别皱眉' },
        { desc: '学长你别怕，学弟不可怕', address: '1', mark: '你最珍贵，你别皱眉' },
        { desc: '学长你别怕，学弟不可怕', address: '1', mark: '你最珍贵，你别皱眉' },
        { desc: '学长你别怕，学弟不可怕', address: '1', mark: '你最珍贵，你别皱眉' }
      ]
    },
    play (address) {
      console.log(address)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.content-home
  position: relative
  height: 100%
  padding: 0.5rem 0
  .content-video-box
    width: 9.5rem
    margin: 0 auto
    .content-video
      width: 4.6rem
      height: 3.7rem
      float: left
      margin-bottom: 0.3rem
      background: #FFFFFF
      border-radius: 3px
      overflow: hidden
      &:nth-child(2n)
        margin-left: 0.3rem
      .video-poster
        width: 100%
        height: 2.55rem
        position: relative
        background: url(../../assets/400102213_wx.jpg) no-repeat
        background-size: contain
      p
        padding: 0.2rem 0.2rem 0
        font-size 0.2rem
      .video-mark
        padding-top: 0.15rem
        font-size 0.16rem
        color: #848484
</style>
