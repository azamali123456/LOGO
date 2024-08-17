import mongoose from 'mongoose';
const schema = mongoose.Schema({
  title: { type: String, required: true },
  discription: { type: String, required: true },
  subTitle: { type: String, required: true },
  imageUrl: { type: String, required: true },
  craetedAt: { type: Date, required: true , default: Date()},
  servicesId:{ type: String, required: true },

});

export default mongoose.model('subServices', schema);
