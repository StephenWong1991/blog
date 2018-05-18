import { mongoose } from '../../middleware/db'

// 一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力
const Schema = mongoose.Schema

const AppSchema = new Schema({
  name: { type: String, default: '' },
  title: { type: String, default: '' },
  icon: { type: String, default: '' },
  cover: { type: String, default: '' },
  url: { type: String, default: '' },
  desc: { type: String, default: '' },
  type: { type: Number, default: 0 },
  hits: { type: Number, default: 0 },
  removed: { type: Boolean, default: false },
  createdByID: { type: Schema.Types.ObjectId, required: true }
}, {
  collection: 'app',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

export default mongoose.model('App', AppSchema)
