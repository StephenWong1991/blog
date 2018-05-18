/**
  工具方法
*/
// 内核判断
const deviceCore = {
  _ua: navigator.userAgent.toLowerCase(),
  // 获取浏览器版本
  _getVersion: (nece) => {
    let arr = nece.split('.')
    return parseFloat(`${arr[ 0 ]}.${arr[ 1 ]}`)
  },
  // 设备检测
  _detect: (kernel) => {
    let reg = new RegExp(kernel, 'img')
    return reg.test(deviceCore._ua)
  }
}

export const device = {
  isIOS: () => { return deviceCore._detect('iPhone|iPad|iPod|iOS|mac os') },
  isAndroid: () => { return deviceCore._detect('Android') },
  isUCBrowser: () => { return deviceCore._detect('UCBrowser') },
  isQQBrowser: () => { return deviceCore._detect('QQBrowser') },
  isWeixin: () => { return deviceCore._detect('MicroMessenger') },
  isPC: () => { return !deviceCore._detect('phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone') },
  qqBrowserVersion: () => { return device.isQQBrowser() ? deviceCore._getVersion(deviceCore._ua.split('mqqbrowser/')[ 1 ]) : 0 },
  ucBrowserVersion: () => { return device.isUCBrowser() ? deviceCore._getVersion(deviceCore._ua.split('ucbrowser/')[ 1 ]) : 0 },
  iOSVersion: () => { return device.isIOS() ? parseInt(deviceCore._ua.match(/\s*os\s*\d+/gi)[ 0 ].split(' ')[ 2 ], 10) : 0 }
}

export const dateFormat = (date, format = 'yyyy-MM-dd hh:mm:ss', readability = false) => {
  if (!date) {
    date = new Date()
  }
  if (typeof date === 'string' && /^\d+$/.test(date)) {
    date = new Date(+date)
  }
  if (typeof date === 'number') {
    date = new Date(date)
  }
  if (typeof date !== 'number' && !(date instanceof Date)) {
    date = date.replace(/年|月/g, '-').replace(/日/g, '')
    date = new Date(date)
  }

  const duration = Date.now() - date
  const level1 = 60 * 1000                // 1 分钟
  const level2 = 60 * 60 * 1000           // 1 小时
  const level3 = 24 * 60 * 60 * 1000      // 1 天
  const level4 = 3 * 24 * 60 * 60 * 1000  // 3 天
  if (readability && duration < level4) {
    let str = ''
    if (duration < level1) str = '刚刚'
    if (duration > level1 && duration < level2) str = `${Math.round(duration / level1)}分钟前`
    if (duration > level2 && duration < level3) str = `${Math.round(duration / level2)}小时前`
    if (duration > level3 && duration < level4) str = `${Math.round(duration / level3)}天前`
    return str
  }
  const o = {
    'M+': date.getMonth() + 1,  // 月份
    'd+': date.getDate(),       // 日
    'h+': date.getHours(),      // 小时
    'm+': date.getMinutes(),    // 分
    's+': date.getSeconds(),    // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, String(date.getFullYear()).substr(4 - RegExp.$1.length))
  }
  Object.keys(o).forEach(k => {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[ k ]) : ((`00${o[ k ]}`).substr((String(o[ k ])).length)))
    }
  })
  return format
}

// **** 压缩图片 ****
// 压缩
function compress (sourceImgObj, quality) {
  let cvs = document.createElement('canvas')
  let multiple = (sourceImgObj.naturalWidth > 1000) ? 2 : 1
  // naturalWidth真实图片的宽度
  cvs.width = sourceImgObj.naturalWidth / multiple
  cvs.height = sourceImgObj.naturalHeight / multiple
  cvs.getContext('2d').drawImage(sourceImgObj, 0, 0, cvs.width, cvs.height)
  let newImageData = cvs.toDataURL('image/jpeg', quality / 100)
  let resultImageObj = new Image()
  resultImageObj.src = newImageData
  return resultImageObj
}
// 转blob
function convertBase64UrlToBlob (urlData) {
  // 去掉url的头，并转换为byte
  let bytes = window.atob(urlData.split(',')[ 1 ])
  // 处理异常,将ascii码小于0的转换为大于0
  let ab = new ArrayBuffer(bytes.length)
  let ia = new Uint8Array(ab)
  for (let i = 0; i < bytes.length; i++) {
    ia[ i ] = bytes.charCodeAt(i)
  }
  return new Blob([ ab ], { type: 'image/png' })
}
export function compressImage (imageFile, callback) {
  const size = imageFile.size
  if (size < 2 * 1024 * 1024) {
    callback(imageFile)
  } else {
    const url = URL.createObjectURL(imageFile)
    let img = new Image()
    let timestamp = Date.now()
    img.src = url
    img.addEventListener('load', () => {
      let blobFile = convertBase64UrlToBlob(compress(img, 70).src)
      blobFile.src = compress(img, 70).src
      blobFile.name = imageFile.name
      blobFile.isCompress = true
      blobFile.timestamp = timestamp
      callback(blobFile)
    })
  }
}

// 小游戏
export function consoleGame () {
  if (!window.console) {
    window.console = {
      log () {}
    }
    return
  }
  let me = 19
  let Star = () => {
    this.x = 0
    this.speed = 1
    this.y = 0
  }
  let score = 0
  let strs = () => {
    let result = ''
    for (let i = 0; i < 20; i++) {
      result += '\n'
      for (var n = 0; n < 40; n++) {
        let now = '一'
        if (i === 19 && n === me) {
          now = '码'
        }
        if (i === 19 && n === me + 1) {
          now = '农'
        }
        stars.forEach(star => {
          let x = Math.floor(star.x)
          let y = Math.floor(star.y)
          if (x === n && y === i) {
            if (Math.abs(star.y - 19) < 1 && (n === me || n === me + 1)) {
              die()
            }
            now = '车'
          }
        })
        result += now
      }
    }
    result += `       《全民躲车车》得分：${score}`
    return result
  }
  window.onkeydown = (e) => {
    if (e.keyCode === 37) {
      me -= 1
      if (me < 0) {
        me = 0
      }
    } else if (e.keyCode === 39) {
      me += 1
      if (me > 38) {
        me = 38
      }
    }
  }
  let count = 0
  let die = () => {
    clearInterval(timer1)
    clearInterval(timer2)
    clearInterval(timer3)
    setTimeout(() => {
      console.log(`游戏结束，您的得分：${score},分享到微博：%o http://service.weibo.com/share/share.php?url=http%3A%2F%2Ftangeche.com&pic=http://img.souche.com/test/aab0c3d397799533e446759083c2f97c.gif&title=%E6%88%91%E5%9C%A8%E3%80%90%E5%BC%B9%E4%B8%AA%E8%BD%A6%E3%80%91%E7%8E%A9%E7%A0%81%E5%86%9C%E4%B8%93%E6%9C%89%E6%B8%B8%E6%88%8F%E3%80%8A%E7%A0%81%E5%86%9C%E8%BA%B2%E8%BD%A6%E8%BD%A6%E3%80%8B%E8%8E%B7%E5%BE%97%E4%BA%86${score}%E5%88%86%2C%E5%BF%AB%E6%9D%A5%E6%8C%91%E6%88%98%E6%AF%94%E6%AF%94%E7%9C%8B%E3%80%82%E7%94%A8%E8%B0%B7%E6%AD%8C%E6%B5%8F%E8%A7%88%E5%99%A8%E6%89%93%E5%BC%80www.tangeche.com%E9%A6%96%E9%A1%B5%EF%BC%8C%E6%89%93%E5%BC%80%E8%B0%83%E8%AF%95%E5%B7%A5%E5%85%B7%E7%9A%84%E6%8E%A7%E5%88%B6%E5%8F%B0%EF%BC%8C%E8%BE%93%E5%85%A5start%28%29%3B%E5%9B%9E%E8%BD%A6%EF%BC%8C%E7%84%B6%E5%90%8E%E6%8C%89%E7%85%A7%E6%8F%90%E7%A4%BA%E5%8D%B3%E5%8F%AF%E5%BC%80%E5%A7%8B%E6%B8%B8%E6%88%8F%E3%80%82%40%E5%BC%B9%E4%B8%AA%E8%BD%A6`)
    }, 100)
  }
  let stars = []
  let appearP = 1
  let timer1, timer2, timer3
  let begin = () => {
    timer1 = setInterval(() => {
      let createCount = Math.floor(Math.random() * 5 * appearP)
      for (let i = 0; i < createCount; i++) {
        let star = new Star()
        star.x = Math.floor(Math.random() * 40)
        star.y = 0
        star.speed = Math.random() * appearP // Math.floor(Math.random()*3+1)
        stars.push(star)
      }
    }, 1000)
    timer2 = setInterval(() => {
      stars.forEach((star, i) => {
        star.y += star.speed
        if (star.y >= 31) {
          stars.splice(i, 1)
          score++
        }
      })
      console.log(strs())
      count++
      if (count > 300) {
        console.clear()
        count = 0
      }
    }, 100)
    timer3 = setInterval(() => {
      appearP *= 1.1
    }, 3000)
  }
  console.log('输入 start(); 后即可开始《码农躲车车》游戏！')
  window.start = () => {
    appearP = 1.1
    // starts = []
    score = 0
    me = 19
    count = 0
    console.log('%c请先用鼠标点击一下弹个车网页页面，游戏需要捕捉网页上的键盘事件（你应该懂吧）！', 'font-size:16px;color:#ff6700;')
    console.log('使用键盘左右键移动最下方的码农，躲开所有的汽车，汽车数量和速度会一直增加，看看谁坚持的最久吧！')
    let countdown = 6
    setTimeout(function f () {
      if (countdown-- <= 1) {
        begin()
      } else {
        console.log(countdown)
        setTimeout(f, 1000)
      }
    }, 1000)
    return ('倒计时！')
  }
}
