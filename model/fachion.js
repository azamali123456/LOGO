import mongoose from "mongoose";
const schema = mongoose.Schema({
  ansStatement: { type: String, required: true },
  viewState: { type: String, required: true },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

export default mongoose.model("answer", schema);
