const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Food_Log = require('../models/Foodlog');
const Exercise_Log = require('../models/ExerciseLogs');


router.get('/:user_id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);
    console.log(user)
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Calculate BMI
    const bmi = (user.weight / ((user.height / 100) ** 2)).toFixed(2);

    // Retrieve food and exercise logs for the user
    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().slice(0, 10);

    // Retrieve food and exercise logs for the user for today
    const foodLogs = await Food_Log.findByUserIdAndDate(req.params.user_id, todayStr);
    console.log(foodLogs)
    //const exerciseLogs = await Exercise_Log.findByUserIdAndDate(req.params.user_id, todayStr);

    // Calculate total consumed and burned calories
    const consumedCalories = foodLogs.reduce((total, log) => total + log.calories, 0);
    //const burnedCalories = exerciseLogs.reduce((total, log) => total + log.calories, 0);
    console.log()
    // Prepare the data to send to the client
    const data = {
      date: new Date().toISOString().slice(0, 10), // Today's date in YYYY-MM-DD format
      bmi,
      totalCalories: user.targetcalories,
      consumedCalories,
      //burnedCalories,
    };

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
