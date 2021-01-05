import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import "./Entry.css";
import { Icon } from "semantic-ui-react";

const OccupationalHealthcareEntryDetails: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <div className="Entry">
      <h3>
        <>
          {entry.date} <Icon size="big" name="stethoscope" />{" "}
          {entry.employerName}
        </>
      </h3>
      <div>{entry.description}</div>
      <div>{entry.specialist}</div>
    </div>
  );
};

export default OccupationalHealthcareEntryDetails;
