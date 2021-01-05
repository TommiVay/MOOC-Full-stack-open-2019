import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!height || !weight) {
    res.status(400).send(
      JSON.stringify({
        error: "malformatted parameters",
      })
    );
  }
  const obj = {
    weight: weight,
    height: height,
    bmi: calculateBmi(height, weight),
  };
  res.send(JSON.stringify(obj));
});

app.post("/exercises", (req, res) => {
  console.log(req);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!target || !daily_exercises) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (!Array.isArray(daily_exercises)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const targetHours = Number(target);
  const NaNInExcercises = daily_exercises.some((item) => isNaN(item));

  if (isNaN(targetHours) || NaNInExcercises) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const response = calculateExercises(daily_exercises, target);
  return res.send(JSON.stringify(response));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
