const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { exerciseSchema } = require('./exerciseSchema')

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

module.exports = Workout
