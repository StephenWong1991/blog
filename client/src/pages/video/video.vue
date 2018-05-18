<template>
  <y-layout menu="video">
    <div class="content-home">
      <ul class="content-video-box clearfix">
        <li v-for="(item, index) in list" :key="index" class="content-video shadow">
          <div class="video-poster" :style="'background-image: url(' + item.img  + ')'">
            <span class="play" @click="play(item.address)"></span>
          </div>
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
        { img: 'http://yitianyibu.com/static/image/small/1.jpg', desc: '咆哮 MV', address: '1', mark: '“他开始说中肯话，不再偏向我”' },
        { img: 'http://yitianyibu.com/static/image/small/1.jpg', desc: '咆哮 MV', address: '2', mark: '“他开始说中肯话，不再偏向我”' },
        { img: 'http://yitianyibu.com/static/image/small/1.jpg', desc: '咆哮 MV', address: '3', mark: '“他开始说中肯话，不再偏向我”' },
        { img: 'http://yitianyibu.com/static/image/small/1.jpg', desc: '咆哮 MV', address: '4', mark: '“他开始说中肯话，不再偏向我”' },
        { img: 'http://yitianyibu.com/static/image/small/1.jpg', desc: '咆哮 MV', address: '5', mark: '“他开始说中肯话，不再偏向我”' },
        { img: 'http://yitianyibu.com/static/image/small/1.jpg', desc: '咆哮 MV', address: '6', mark: '“他开始说中肯话，不再偏向我”' }
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
        .play
          position: absolute
          width: 1rem
          height: 1rem
          left: 50%
          top: 50%
          transform: translate3d(-50%, -50%, 0)
          background: url(./image/play.png) no-repeat
          background-size: 100% 100%
          cursor: pointer
      p
        padding: 0.2rem 0.2rem 0
        font-size 0.2rem
      .video-mark
        padding-top: 0.15rem
        font-size 0.16rem
        color: #848484

// @media (max-width:768px)
//   .content-home
//     .content-login-box
//       width: 2rem
//       margin-left: -1.5rem
//       .input-group
//         .input-item
//           input
//             width: 1.51rem
</style>
