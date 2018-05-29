/**
 * 文章系列分类
 */
import categoryManager from './manager'
import { getFromReq } from '../util/pagination'
import { formatResult, handlerCustomError } from '../util/format'
import { CATEGORY_LIMIT_DEFAULT } from '../util/const'

const findAll = async (req, res, next) => {
  try {
    const result = await categoryManager.findAll(getFromReq(req.query, CATEGORY_LIMIT_DEFAULT))
    res.json(formatResult(result))
  } catch (e) {
    next(handlerCustomError(102003, '查询失败'))
  }
}

const insert = async (req, res, next) => {
  const name = (req.body.name || '').trim()
  const desc = (req.body.desc || '').trim()
  const length = (req.body.length || 'shortCollection').trim()
  const cover = (req.body.cover || '').trim()
  // const weight = parseInt(req.body.weight) || 1
  const createdByID = req.user.id

  if (!name) {
    next(handlerCustomError(102001, '名称不能为空'))
  }
  if (!desc) {
    next(handlerCustomError(102002, '描述不能为空'))
  }
  if (!createdByID) {
    next(handlerCustomError(102005, '非法用户操作'))
  }

  try {
    const result = await categoryManager.insert({
      name,
      desc,
      cover,
      length,
      createdByID
    })
    res.json(formatResult())
  } catch (e) {
    console.log(e)
    next(handlerCustomError(102002, '创建失败'))
  }
}

export default {
  findAll,
  insert
}
