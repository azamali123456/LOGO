import mongoose from "mongoose";
const schema = mongoose.Schema({
  name : { type: String, required: true },
  phone : { type: String, required: true },
  query : { type: String, required: true },
  email : { type: String, required: true },
  userId : { type: String, required: true },
  contactedDate: { type: Date, required: true , default: Date()},

});
export default mongoose.model("contactus", schema);
