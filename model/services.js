import mongoose from "mongoose";
const schema = mongoose.Schema({
  title: { type: String, required: true },
  discription: { type: String, required: true },
  imageUrl: { type: String, required: true },
  craetedAt: { type: Date, required: true , default: Date()},
  firmType:{ type: String, required: false },
});
export default mongoose.model("Service", schema);
