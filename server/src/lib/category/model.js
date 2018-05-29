import { mongoose } from '../../middleware/db'

const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: { type: String, required: true }, // 类别名称
  desc: { type: String, required: true }, // 类别描述
  length: { type: String, default: null, required: true }, // 合集篇幅
  cover: { type: String, default: null, required: true }, // 封面图片id
  // weight: { type: Number, default: 0 }, // 权重
  createdByID: { type: Schema.Types.ObjectId, required: true }
}, {
  collection: 'category',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

export default mongoose.model('Category', CategorySchema)
