const router = require('express').Router();
const { Workout } = require('../models/schemas');

router.get('/workouts', (req, res) => {
    const workouts = Workout.aggregate([
        {$addFields: {totalDuration: {$sum: '$exercises.duration'}}}
    ]);

    res.json(workouts);
})

router.get('/workouts/range', (req, res) => {
    const workoutData = Workout.aggregate([
        {$sort: {day: -1}},
        {$limit: 7},
        {$addFields: {totalDuration: {$sum: '$exercises.duration'}}}
    ]);

    res.json(workoutData);
})

router.post('/workouts', (req, res) => {
    const addWorkout = Workout.create(req.body);

    res.json(addWorkout)
});

router.put('/workouts/:id', (req, res) => {
    const updatedWorkout = Workout.updateOne(
        {_id: req.params.id},
        {$push: {exercises: req.body}}
    );

    res.json(updatedWorkout);
});



module.exports = router;