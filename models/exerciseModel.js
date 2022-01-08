const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    required: "Select an exercise type",
    enum: ["resistance", "cardio"]
  },
  weight: {
    type: Number,
  },
  sets: {
    type: Number,
  },
  reps: {
    type: Number,
  },
  duration: {
    type: Number,
  },
});

module.exports = ExerciseSchema;
