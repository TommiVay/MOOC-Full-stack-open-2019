/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Entry } from "../types";

const validEntry = (entry: Entry): boolean => {
  return validEntryType(entry.type) && validEntryFields(entry);
};

const validEntryType = (type: string): boolean => {
  return (
    typeof type === "string" &&
    (type === "HealthCheck" ||
      type === "Hospital" ||
      type === "OccupationalHealthcare")
  );
};

const validEntryFields = (entry: Entry): boolean => {
  if (
    isString(entry.description) &&
    isString(entry.date) &&
    isString(entry.specialist)
  ) {
    switch (entry.type) {
      case "Hospital":
        return (
          "discharge" in entry &&
          isString(entry.discharge.criteria) &&
          isString(entry.discharge.date)
        );
      case "OccupationalHealthcare":
        return isString(entry.employerName);
      case "HealthCheck":
        return isHealthCheckRating(entry.healthCheckRating);
    }
  }
  return false;
};

const isHealthCheckRating = (rating: any): boolean => {
  return rating === 0 || rating === 1 || rating === 2 || rating === 3;
};

const isString = (text: any): text is string => {
  return text && (typeof text === "string" || text instanceof String);
};

export default validEntry;
