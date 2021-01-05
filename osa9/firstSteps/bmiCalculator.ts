export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);
  if (bmi < 18.5) {
    return "Underweight";
  }
  if (18.5 <= bmi && bmi < 25) {
    return "Normal (healty weight)";
  }
  if (bmi >= 25 && bmi < 30) {
    return "Overweight";
  } else return "Obese";
};
