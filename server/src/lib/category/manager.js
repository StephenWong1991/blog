import Model from './model'
import { getMeta } from '../util/pagination'

const findAll = async (queryOptions = {}, options = {}) => {
  // const total = await Model.count({ removed: false })
  const total = await Model.count()
  // options = Object.assign(options, { removed: false })
  // const list = await Model.find(options).limit(queryOptions.limit).skip(queryOptions.offset).sort({ weight: -1 })
  const list = await Model.find(options)
  return {
    // meta: getMeta(total, list.length, queryOptions),
    list
  }
}

const getById = async (id) => {
  const result = await Model.findById(id)
  return result
}

const getByName = async (name) => {
  const result = await Model.findOne({ name })
  return result
}

// const getByPathname = async (pathname) => {
//   const result = await Model.findOne({ pathname })
const getByPathname = async (_id) => {
  const result = await Model.findOne({ _id })
  return result
}

const insert = async (options = {}) => {
  const result = await Model.create(Object.assign({}, options))
  return result
}

export default {
  findAll,
  getById,
  getByName,
  getByPathname,
  insert
}
