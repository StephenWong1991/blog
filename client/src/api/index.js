import axios from 'axios'
import storage from 'common/js/storage.js'
import CONST from './const'

const NODE_ENV = process.env.NODE_ENV || 'development'

const host = {
  'production': 'http://api.yitianyibu.com',
  // 'development': 'http://api.yitianyibu.com'
  'development': 'http://localhost:3000'
}[NODE_ENV]

const API = {
  host,
  // 核心
  _core (url, data = {}, method = 'GET', headers = { 'Content-Type': 'application/json' }) {
    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json'
    }
    // token
    let token = storage.get(CONST.STORAGE_AUTH_TOKEN, null)
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    let options = {
      url,
      method,
      headers
    }
    if (method === 'GET') {
      options.params = data
    } else {
      options.data = data
    }
    return axios(options).then(results => {
      return Promise.resolve(results.data)
    }).catch(function (error) {
      let data = error.response.data
      if (error.response.status === 401) {
        data = {status: { code: 401401, message: '非法用户操作' }}
      }
      return Promise.reject(data)
    })
  },
  /** common **/
  _get (url, data, headers) {
    return this._core(url, data, 'GET', headers)
  },
  _post (url, data, headers) {
    return this._core(url, data, 'POST', headers)
  },
  _delete (url, data, headers) {
    return this._core(url, data, 'DELETE', headers)
  },
  /** api **/
  insertCategory (options = {}) {
    const url = `${host}/api/category`
    return this._post(url, options)
  },
  // 获取留言
  getMessageList (options = {}) {
    const url = `${host}/api/message`
    return this._get(url, options)
  },
  // 发布留言
  insertMessage (options = {}) {
    const url = `${host}/api/message`
    return this._post(url, options)
  },
  // 删除留言
  deleteMessage (id) {
    const url = `${host}/api/message/${id}`
    return this._delete(url)
  },
  // 登录
  login (options = {}) {
    const url = `${host}/api/user/login`
    return this._post(url, options)
  },
  // // 获取文章
  // getArticleList (options = {}) {
  //   const url = `${host}/api/article`
  //   return this._get(url, options)
  // },
  // // 发表文章
  // insertArticle (options = {}) {
  //   const url = `${host}/api/article`
  //   return this._post(url, options)
  // },
  // 上传图片
  uploadImage (file) {
    let formdata = new FormData()
    formdata.append('file', file)
    const url = `${host}/api/file`
    return this._post(url, formdata, {
      'Content-Type': 'multipart/form-data'
    })
  },
  // ************ add ws ************
  getCategory (options = {}) {
    const url = `${host}/api/category`
    return this._get(url, options)
  },
  // 内容
  getContentList (options = {}) {
    const url = `${host}/api/content`
    return this._get(url, options)
  },
  getContentInfo (id) {
    const url = `${host}/api/content/${id}`
    return this._get(url)
  },
  insertContent (options = {}) {
    const url = `${host}/api/content`
    return this._post(url, options)
  },
  // ************
  getContentByCategory (id, options = {}) {
    const url = `${host}/api/content/by/category/${id}`
    return this._get(url, options)
  }
}

export default API
