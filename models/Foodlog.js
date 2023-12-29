const db = require('../config/db');

module.exports = {

  findByUserIdAndDate: async (user_id, date) => {
    const foods = await db.manyOrNone(
    `SELECT FoodItems.* FROM Meals
     INNER JOIN FoodItems ON Meals.MealID = FoodItems.MealID
     WHERE Meals.Date = $2 AND Meals.userid = $1`,
    [user_id,date]
  );
  return foods;
  },
    //get fooditems on particular date 
  getMealsByDate: async (date, user_id) => {
    const meals = await db.manyOrNone(
      `SELECT * FROM Meals
       INNER JOIN FoodItems ON Meals.MealID = FoodItems.MealID
       WHERE Meals.Date = $1 AND Meals.userid = $2`,
      [date, user_id]
    );
    return meals;
  },

  //insert,update food

  addOrUpdateFoodItem: async (userId, date, mealType, foodItem) => {
    // First, try to find an existing meal of the same type on the same date for the user
    const meal = await db.oneOrNone(
      `SELECT * FROM Meals
       WHERE UserID = $1 AND Date = $2 AND MealType = $3`,
      [userId, date, mealType]
    );

    let mealId;
    if (meal) {
      // If the meal exists, use its MealID
      mealId = meal.MealID;
    } else {
      // If the meal doesn't exist, create a new one and use its MealID
      const newMeal = await db.one(
        `INSERT INTO Meals (UserID, Date, MealType)
         VALUES ($1, $2, $3)
         RETURNING MealID`,
        [userId, date, mealType]
      );
      mealId = newMeal.MealID;
    }

    // Then, try to find an existing food item in the meal
    const existingFoodItem = await db.oneOrNone(
      `SELECT * FROM FoodItems
       WHERE MealID = $1 AND Name = $2`,
      [mealId, foodItem.name]
    );

    if (existingFoodItem) {
      // If the food item exists, update its quantity
      await db.none(
        `UPDATE FoodItems
         SET Quantity = Quantity + $1
         WHERE FoodID = $2`,
        [foodItem.quantity, existingFoodItem.FoodID]
      );
    } else {
      // If the food item doesn't exist, create a new one
      await db.none(
        `INSERT INTO FoodItems (MealID, Name, Calories, Carbohydrates, Sugars, Protein, Fat, Quantity)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [mealId, foodItem.name, foodItem.calories, foodItem.carbohydrates, foodItem.sugars, foodItem.protein, foodItem.fat, foodItem.quantity]
      );
    }
  },


  // delete a fooditem on a particular date
  deleteFoodItem: async (foodId) => {
    const result = await db.result('DELETE FROM FoodItems WHERE FoodID = $1', [foodId]);
    return result.rowCount;  // returns the number of rows deleted
  },

  // Other methods for creating, updating, deleting logs...
};
