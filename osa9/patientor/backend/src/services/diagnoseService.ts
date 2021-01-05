import diagnoseData from "../../data/diagnoses.json";
import { Diagnose } from "../types";

const diagnoses: Array<Diagnose> = diagnoseData as Array<Diagnose>;

const getDiagnoses = (): Array<Diagnose> => {
  console.log("DiagnosisSer");
  return diagnoses;
};

export default {
  getDiagnoses,
};
