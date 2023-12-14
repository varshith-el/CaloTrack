const db = require('../config/db');
const calculateDailyCalories = require('../utils/calculateDailyCalories');

//import calculateDailyCalories from './calculateDailyCalories';


module.exports = {
  create: (name, email, password) => {
    return db.one(
      'INSERT INTO Users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
      [name, email, password]
    );
  },
  findById: (id) => {
    return db.one('SELECT * FROM Users WHERE user_id = $1', [id]);
  },
  findByEmail: (email) => {
    return db.one('SELECT * FROM Users WHERE email = $1', [email]);
  },
  update: (id, name, email, password, date, goal, targetCalories) => {
    return db.none(
      'UPDATE Users SET name = $1, email = $2, password = $3, date = $4, goal = $5, target_calories = $6 WHERE id = $7',
      [name, email, password, date, goal, targetCalories, id]
    );
  },

  // Other methods for update the user info...
  update: async (user_id, user_name, height,age, weight, gender, goal) => {
    // Calculate the target calories
    const target_calories = calculateDailyCalories(height, weight, gender, goal);

    return db.none(
      'UPDATE Users SET user_name = $1, height = $2, weight = $3, gender = $4, goal = $5, target_calories = $6, age = $7 WHERE user_id = $8',
      [user_name, height, weight, gender, goal, target_calories,age, user_id]
    );
  }
};
