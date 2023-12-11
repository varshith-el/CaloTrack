const db = require('../config/db');

module.exports = {
  create: (name, email, password) => {
    return db.one(
      'INSERT INTO Users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
      [name, email, password]
    );
  },
  findById: (id) => {
    return db.one('SELECT * FROM Users WHERE id = $1', [id]);
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
  // Other methods for deleting, etc...
};
