const router = require('express').Router();
const { Exercise  } = require('../models/exercise');

router.get('/', async (req, res) => {
    try {
      res.render('index');
    } catch (err) {
      res.status(500).json(err);
    }
  });


  router.get('/exercise', async (req, res) => {
    try {
      res.render('exercise')
    }
    catch (err) {
      res.status(500).json(err);
    }
  })

  router.get('/stats', async (req, res) => {
    try {
      res.render('stats')
    }
    catch (err) {
      res.status(500).json(err);
    }
  })


  module.exports = router;