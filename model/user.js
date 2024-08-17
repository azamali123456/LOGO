import mongoose from "mongoose";
const schema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  imageUrl: { type: String, required: false },
  userType:{ type: String, required: true },
  registered: { type: Date, required: true , default: Date()}
});

export default mongoose.model("User", schema);
