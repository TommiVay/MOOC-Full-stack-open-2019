/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import patientService from "../services/patientService";
import { uuid } from "uuidv4";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatients());
});

router.get("/:id", (req, res) => {
  res.send(patientService.getOneByID(req.params.id));
});

router.post("/", (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation, entries } = req.body;
  const newPatient = patientService.addPatient({
    id: uuid(),
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    entries,
  });
  res.send(newPatient);
});

router.post("/:id", (req, res) => {
  try {
    const entry = req.body;
    res.send(patientService.addEntry(entry, req.params.id));
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

export default router;
