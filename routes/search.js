const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const config = require('config');
const uri = config.get('calorieNinjasURI');
const apiKey = config.get('calorieNinjasAPIKey');


// Search food,take req param and call external api.
router.get('food/:food', async (req, res) => {
  const food = req.params.food;
  const apiUrl = uri + food;
  try {
    const fetchResponse = await fetch(apiUrl, {
      headers: {
        'X-Api-Key': apiKey
      }
    });
    const json = await fetchResponse.json();
    res.json(json);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Search exercise and call external API
// TO BE IMPLEMENTED...

module.exports = router;
