import mongoose from "mongoose";

const SummarySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  videoId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  flashcards: {
    type: [String],
    required: false,
  },
});

const Summary =
  mongoose.models.Summary || mongoose.model("Summary", SummarySchema);

export default Summary;
