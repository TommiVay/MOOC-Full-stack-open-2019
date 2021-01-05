type rating = 1 | 2 | 3;
type ratingDesc = "Pretty bad" | "Not too bad but could be better" | "Good!";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: rating;
  ratingDescription: ratingDesc;
  target: number;
  average: number;
}

const getRating = (avg: number, target: number): rating => {
  if (avg < target * 0.9) return 1;
  if (avg > target * 1.1) {
    return 3;
  } else {
    return 2;
  }
};

const getRatingDec = (rating: rating): ratingDesc => {
  if (rating === 1) return "Pretty bad";
  if (rating === 2) {
    return "Not too bad but could be better";
  } else {
    return "Good!";
  }
};

export const calculateExercises = (array: number[], target: number): Result => {
  const totalHours = array.reduce((a, b) => a + b, 0);
  const avg = totalHours / array.length;
  const rating = getRating(avg, target);

  return {
    periodLength: array.length,
    trainingDays: array.filter((item) => item != 0).length,
    success: avg > target,
    rating: rating,
    ratingDescription: getRatingDec(rating),
    target: target,
    average: avg,
  };
};
