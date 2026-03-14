const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const responseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    workplace: { type: String, required: true, trim: true, maxlength: 200 },
    profession: { type: String, required: true, trim: true, lowercase: true },
    answers: {
      type: [answerSchema],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: "At least one answer is required",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Response", responseSchema);
