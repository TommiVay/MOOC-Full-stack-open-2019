import React, { useState } from "react";
import { Dropdown, DropdownProps } from "semantic-ui-react";
import { EntryFormValues, EntryType } from "../types";
import HealthCheckEntryForm from "./HealthCheckEntryForm";
import HospitalEntryForm from "./HospitalEntryForm";
import OccupationalHealthcareEntryForm from "./OccupationalHealthcareEntryForm";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

interface RenderProps {
  entryType: EntryType;
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryTypes: EntryType[] = ["", "HealthCheck", "Hospital", "Occupational"];

const typeOptions = entryTypes.map((type) => ({
  key: type,
  text: type,
  value: type,
}));

const renderEntryForm = (
  entryType: EntryType,
  onSubmit: (values: EntryFormValues) => void,
  onCancel: () => void
) => {
  switch (entryType) {
    case entryTypes[1]:
      return <HealthCheckEntryForm onCancel={onCancel} onSubmit={onSubmit} />;
    case entryTypes[2]:
      return <HospitalEntryForm onCancel={onCancel} onSubmit={onSubmit} />;
    case entryTypes[3]:
      return (
        <OccupationalHealthcareEntryForm
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
      );
    default:
      return;
  }
};

const AddEntryForm: React.FC<Props> = ({ onCancel, onSubmit }) => {
  const [entryType, setEntryType] = useState<EntryType>("");

  const dropDownChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setEntryType(data.value as EntryType);
  };

  return (
    <div>
      <label>Entry Type</label>
      <Dropdown
        fluid
        search
        selection
        options={typeOptions}
        onChange={dropDownChange}
      />
      {renderEntryForm(entryType, onSubmit, onCancel)}
    </div>
  );
};

export default AddEntryForm;
