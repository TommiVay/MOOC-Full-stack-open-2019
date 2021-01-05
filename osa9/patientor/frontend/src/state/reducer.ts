import { State } from "./state";
import { Patient, Diagnosis, Entry, AddEntryPayload } from "../types";

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload: patientListFromApi };
};

export const addPatient = (patient: Patient): Action => {
  return { type: "ADD_PATIENT", payload: patient };
};

export const setPatient = (patient: Patient): Action => {
  return { type: "SET_PATIENT", payload: patient };
};

export const setDiagnosis = (diagnosisFromApi: Diagnosis[]): Action => {
  return { type: "SET_DIAGNOSIS", payload: diagnosisFromApi };
};

export const addEntry = (entry: Entry, id: string): Action => {
  return { type: "ADD_ENTRY", payload: { entry: entry, id: id } };
};

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: AddEntryPayload;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: { ...action.payload },
      };
    case "SET_DIAGNOSIS":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnosis,
        },
      };

    default:
      return state;
  }
};
