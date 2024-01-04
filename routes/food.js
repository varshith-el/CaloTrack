const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Food = require('../models/Foodlog');


// get food by date
router.get('/:date', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const meals = await Food.getMealsByDate(req.params.date, req.user.id);

    if (!meals || meals.length === 0) {
      return res.status(404).json({ msg: 'Meal not found' });
    }

    res.json(meals);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

//Insert/Update food
router.post('/', auth, [
  check('date', 'Date is required').not().isEmpty(),
  check('mealType', 'Meal type is required').not().isEmpty(),
  check('foodItems', 'Food items are required').not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { date, mealType, foodItems } = req.body;

    for (const foodItem of foodItems) {
      await Food.addOrUpdateFoodItem(req.user_id, date, mealType, foodItem);
    }

    res.json({ msg: 'Food items added or updated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});


//delete food
router.delete('/:foodId', auth, async (req, res) => {
    try {
      const rowCount = await Food.deleteFoodItem(req.params.foodId);
  
      if (rowCount === 0) {
        return res.status(404).json({ msg: 'Food item not found' });
      }
  
      res.json({ msg: 'Food item deleted' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });

module.exports = router;
