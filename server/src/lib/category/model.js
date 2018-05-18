import { mongoose } from '../../middleware/db'

const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: { type: String, required: true }, // 类别名称
  pathname: { type: String, default: '' }, // 自定义链接
  cover: { type: String, default: null }, // 封面图片id
  length: { type: String, default: null, required: true }, // 合集篇幅
  // weight: { type: Number, default: 0 }, // 权重
  // removed: { type: Boolean, default: false },
  createdByID: { type: Schema.Types.ObjectId, required: true }
}, {
  collection: 'category',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

export default mongoose.model('Category', CategorySchema)
