import React from "react";
import { HealthCheckEntry } from "../types";
import "./Entry.css";
import { Icon, SemanticCOLORS } from "semantic-ui-react";

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({
  entry,
}) => {
  const hearthColor = (): SemanticCOLORS | undefined => {
    switch (entry.healthCheckRating) {
      case 0:
        return "green";
      case 1:
        return "yellow";
      case 2:
        return "orange";
      case 3:
        return "red";
      default:
        return undefined;
    }
  };
  return (
    <div className="Entry">
      <h3>
        <>
          {entry.date} <Icon size="big" name="user md"></Icon>
        </>
      </h3>
      {entry.description}
      <div>
        <Icon name="heart" color={hearthColor()} />
      </div>
      <div>{entry.specialist}</div>
    </div>
  );
};

export default HealthCheckEntryDetails;
