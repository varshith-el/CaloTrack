
//export default function calculateDailyCalories(height, weight, gender, age, activityLevel, goal)

module.exports = function calculateDailyCalories(height, weight, gender, age, activityLevel, goal) {
    // Convert height from cm to m and weight from kg to lbs
    const heightInM = height / 100;
    const weightInLbs = weight * 2.20462;
  
    // Calculate BMR using the Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'M') {
      bmr = 10 * weight + 6.25 * heightInM - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * heightInM - 5 * age - 161;
    }
  
    // Adjust BMR based on activity level
    let tdee;
    switch (activityLevel) {
      case 'sedentary':
        tdee = bmr * 1.2;
        break;
      case 'light':
        tdee = bmr * 1.375;
        break;
      case 'moderate':
        tdee = bmr * 1.55;
        break;
      case 'active':
        tdee = bmr * 1.725;
        break;
      case 'very active':
        tdee = bmr * 1.9;
        break;
      default:
        tdee = bmr;
    }
  
    // Adjust TDEE based on goal
    let dailyCalories;
    if (goal === 'lose') {
      dailyCalories = tdee - 500; // Subtract 500 to lose about 0.5kg per week
    } else if (goal === 'gain') {
      dailyCalories = tdee + 500; // Add 500 to gain about 0.5kg per week
    } else {
      dailyCalories = tdee; // Maintain weight
    }
  
    return Math.round(dailyCalories);
  };
  