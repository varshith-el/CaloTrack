const db = require('../config/db');

module.exports = {
  findByUserIdAndDate: (user_id, date) => {
    return db.any('SELECT * FROM ExerciseLogs WHERE user_id = $1 AND date = $2', [user_id, date]);
  },
  // Other methods for creating, updating, deleting logs...
};