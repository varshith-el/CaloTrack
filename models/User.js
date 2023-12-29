const db = require('../config/db');
const calculateDailyCalories = require('../utils/calculateDailyCalories');

//import calculateDailyCalories from './calculateDailyCalories';


module.exports = {
  create: (userid, email, password) => {
    return db.one(
      'INSERT INTO Users (username, email, password) VALUES ($1, $2, $3) RETURNING username',
      [userid, email, password]
    );
  }, 
  findById: (username) => {
    return db.oneOrNone('SELECT * FROM Users WHERE username = $1', [username]);
  },
  findByEmail: (email) => {
    return db.oneOrNone('SELECT * FROM Users WHERE email = $1', [email]);
  },
  /*
  update: (id, name, email, password, date, goal, targetCalories) => {
    return db.none(
      'UPDATE Users SET name = $1, email = $2, password = $3, date = $4, goal = $5, target_calories = $6 WHERE id = $7',
      [name, email, password, date, goal, targetCalories, id]
    );
  },*/

  // Other methods for update the user info...
  update: async (user_id, user_name, height, weight, gender,activityLevel, goal, age) => {
    // Calculate the target calories
    
    const target_calories = calculateDailyCalories(height, weight, gender,age,activityLevel, goal);

    return db.none(
      'UPDATE Users SET name = $2, height = $3, weight = $4, gender = $5, goal = $6, targetcalories = $7, age = $8 WHERE username = $1',
      [user_id, user_name, height, weight, gender, goal, target_calories,age]
    );
  }
};

