const router = require('express').Router();
const db = require('../models');

router.get('/workouts', async (req, res) => {
    const workouts = await db.Workout.aggregate([
        {$addFields: {totalDuration: {$sum: '$exercises.duration'}}}
    ]);

    res.json(workouts);
})

router.get('/workouts/range', async (req, res) => {
    const workoutData = await db.Workout.aggregate([
        {$sort: {day: -1}},
        {$limit: 7},
        {$addFields: {totalDuration: {$sum: '$exercises.duration'}}}
    ]);

    res.json(workoutData);
})

router.post('/workouts', async (req, res) => {
    const addWorkout = await db.Workout.create(req.body);

    res.json(addWorkout)
});

router.put('/workouts/:id', async (req, res) => {
    Workout.findOne({_id: req.params.id})
        .then(workout => {
            workout.exericses.push(req.body)
            workout.save((error) => {
                if (error) {
                    res.status(400).json(error);
                }
                res.json(workout)
            })
        })
})



module.exports = router;