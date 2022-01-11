const router = require('express').Router();
const { Workout } = require('../models/index.js');

router.get('/workouts', (req, res) => {
    Workout.aggregate(
        [
        {$sort: {day: 1, _id: 1}},
        {$addFields: {totalDuration: {$sum: '$exercises.duration'}}}
        ]
    ).then(workoutData => {
        res.json(workoutData);
      })
      .catch(err => {
        res.status(400).json(err);
      })
})

router.get('/workouts/range', (req, res) => {
    Workout.aggregate([
        {$sort: {day: -1, _id: -1}},
        {$limit: 7},
        {$sort: {day: 1, _id: 1}},
        {$addFields: {totalDuration: {$sum: '$exercises.duration'}}}
    ]).then(workoutData => {
        res.json(workoutData);
      })
      .catch(err => {
        res.status(400).json(err);
      })
})

router.post('/workouts', ({ body }, res) => {
    Workout.create(body)
    .then(workoutData => {
        res.json(workoutData);
      })
      .catch(err => {
        res.status(400).json(err);
      })
});

router.put('/workouts/:id', (req, res) => {
    Workout.findOne({_id: req.params.id})

    .then(workoutData => {
        workoutData.exercises.push(req.body)
        workoutData.save((error) => {
            if (error) {
                res.status(400).json(error)
            }
            res.json(workoutData)
        })
    })
});



module.exports = router;