import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
/**
 * [fastclick]
 * 移动设备上的浏览器默认会在用户点击屏幕大约延迟300毫秒后才会触发点击事件
 * 这是为了检查用户是否在做双击。为了能够立即响应用户的点击事件，才有了FastClick
 * https://github.com/ftlabs/fastclick
 */
import fastclick from 'fastclick'
import { device } from 'common/js/util'
/**
 * [vue-notification]
 * Vue.js 2 library for showing notifications
 * https://github.com/euvl/vue-notification
 */
import Notifications from 'vue-notification'
/**
 * [mavon-editor]
 * 基于Vue的markdown编辑器
 * https://github.com/hinesboy/mavonEditor
 */
import mavonEditor from 'mavon-editor'
import 'common/stylus/index.styl'
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor)
Vue.use(Notifications)
// 设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false


// 根据ua 处理移动端适配
if (device.isPC()) {
  document.documentElement.style.fontSize = '100px'
} else {
  var deviceWidth = document.documentElement.clientWidth
  if (deviceWidth > 420) {
    deviceWidth = 420
  }
  document.documentElement.style.fontSize = deviceWidth / 3.75 + 'px'
}
document.body.style.display = 'none'
setTimeout(() => {
  document.body.style.display = 'block'
}, 10)

// 处理移动端点击事件
fastclick.attach(document.body)

// 百度统计
// const NODE_ENV = process.env.NODE_ENV || 'development'
// if (NODE_ENV === 'production') {
//   const hmSite = '362807aa3174bef7d10276019cb0d733'
//   let hmSrc = `https://hm.baidu.com/hm.js?${hmSite}`
//   let _hmt = []
//   let hm = document.createElement('script')
//   hm.src = hmSrc
//   let s = document.getElementsByTagName('script')[0]
//   s.parentNode.insertBefore(hm, s)
//   router.beforeEach((to, from, next) => {
//     _hmt.push(['_trackPageview', to.path])
//     next()
//   })
// }

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
