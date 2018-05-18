import { mongoose } from '../../middleware/db'

const Schema = mongoose.Schema

const ContentSchema = new Schema({
  title: { type: String, default: '' }, // 文章标题
  html: { type: String, default: '' }, // 内容
  markdown: { type: String, default: '' }, // markdown
  images: { type: Array, default: null }, // 图片
  category: { type: String, default: null }, // 类别
  featured: { type: Boolean, default: true },
  // hits: { type: Number, default: 0 }, // 点击量
  // isTop: { type: Number, default: 0 }, // 是否置顶
  removed: { type: Boolean, default: false },
  createdByID: { type: Schema.Types.ObjectId, required: true }
}, {
  collection: 'content',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

export default mongoose.model('Content', ContentSchema)
