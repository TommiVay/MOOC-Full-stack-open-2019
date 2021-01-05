import { uuid } from "uuidv4";
import patientData from "../../data/patients";
import { Entry, Patient, PublicPatient } from "../types";
import validEntry from "../utils/parseEntry";

const patients: Array<Patient> = patientData;

const getPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: Patient): Patient => {
  patients.push(patient);
  return patient;
};

const getOneByID = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addEntry = (entry: Entry, id: string): Patient | undefined => {
  if (validEntry(entry)) {
    const patient = patients.find((patient) => patient.id === id);
    entry.id = uuid();
    patient?.entries.push(entry);
    return patient;
  } else {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    throw new Error("Invalid entry: " + entry);
  }
};

export default { getPatients, addPatient, getOneByID, addEntry };
