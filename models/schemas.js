const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    required: "Select an exercise type",
    trim: true,
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

const workoutSchema = new Schema({
  day: {
      type: Date,
      default: Date.now
  },
  exercises:
  {
      type: [exerciseSchema],
      default: []
  }
})

const Workout = mongoose.model("Workout", workoutSchema)

module.expiorts = Workout
