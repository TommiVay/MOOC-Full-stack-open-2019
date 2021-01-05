import React from "react";
import { HospitalEntry } from "../types";
import "./Entry.css";
import { Icon } from "semantic-ui-react";

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({
  entry,
}) => {
  return (
    <div className="Entry">
      <div>
        <h3>
          <>
            {entry.date} <Icon size="big" name="ambulance"></Icon>
          </>
        </h3>
        <div>{entry.description}</div>
        <div>
          {entry.discharge.criteria} {entry.discharge.date}
        </div>
        <div>{entry.specialist}</div>
      </div>
    </div>
  );
};

export default HospitalEntryDetails;
