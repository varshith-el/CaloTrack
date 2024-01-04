const express = require('express');
const router = express.Router();
//const fetch = require('node-fetch');
const config = require('config');
const fooduri = config.get('calorieNinjasURI');
const foodapiKey = config.get('calorieNinjasAPIKey');
const exerciseuri = config.get('caloriesburnedURI')
const exerciseapiKey = config.get('caloriesburnedKey')

let fetch;

import('node-fetch').then(nodeFetch => {
    fetch = nodeFetch;
});

// Search food,take req param and call external api.
router.get('food/:food', async (req, res) => {
  const food = req.params.food;
  const apiUrl = fooduri + food;
  try {
    const fetchResponse = await fetch(apiUrl, {
      headers: {
        'X-Api-Key': foodapiKey
      }
    });
    const resp = await fetchResponse.json();
    res.json(resp);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});


// Search exercise and call external API

router.get('exercise/:exercise', async (req, res) => {
  const food = req.params.food;
  const apiUrl = exerciseuri + food;
  try {
    const fetchResponse = await fetch(apiUrl, {
      headers: {
        'X-Api-Key': exerciseapiKey
      }
    });
    const resp = await fetchResponse.json();
    res.json(resp);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
