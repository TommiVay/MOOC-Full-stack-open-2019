export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export interface Discharge {
  date: string;
  criteria: string;
}
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}
export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface AddEntryPayload {
  entry: Entry;
  id: string;
}

export type OccupationalHealthcareFormValues = Omit<
  OccupationalHealthcareEntry,
  "id"
>;

export type HospitalEntryFormValues = Omit<HospitalEntry, "id">;

export type HealthCheckEntryFormValues = Omit<HealthCheckEntry, "id">;

export type EntryFormValues =
  | HospitalEntryFormValues
  | HealthCheckEntryFormValues
  | OccupationalHealthcareFormValues;

export type EntryType = "Hospital" | "HealthCheck" | "Occupational" | "";