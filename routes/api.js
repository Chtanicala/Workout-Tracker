const router = require('express').Router();
const { Workout } = require('../models/');

router.get('api/workouts', (req, res) => {
    const workouts = Workout.aggregate([
        {$addFields: {totalDuration: {$sum: '$exercises.duration'}}}
    ]);

    res.json(workouts);
})

router.get('api/workouts/range', (req, res) => {
    const workoutData = Workout.aggregate([
        {$sort: {day: -1}},
        {$limit: 7},
        {$addFields: {totalDuration: {$sum: '$exercises.duration'}}}
    ]);

    res.json(workoutData);
})

router.post('api/workouts', ({body}, res) => {
    const addWorkout = Workout.create(body);

    res.json(addWorkout)
});

router.put('api/workouts/:id', (req, res) => {
    const updatedWorkout = Workout.updateOne(
        {_id: req.params.id},
        {$push: {exercises: req.body}}
    );

    res.json(updatedWorkout);
});



module.exports = router;