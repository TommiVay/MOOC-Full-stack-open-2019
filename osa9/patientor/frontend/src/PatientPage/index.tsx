import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Entry, EntryFormValues, Patient } from "../types";
import { setPatient, useStateValue } from "../state";
import { assertNever } from "../utils/assertNever";
import HospitalEntryDetails from "../components/HospitalEntryDetails";
import HealtcheckEntryDetails from "../components/HealthCheckEntryDetails";
import OccupationalHealthcareEntryDetails from "../components/OccupationalHealthcareEntryDetails";
import AddEntryModal from "../AddEntryModal";
import { Button } from "semantic-ui-react";

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();
  const [{ diagnosis }] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      await axios.post<Entry>(`${apiBaseUrl}/patients/${id}`, values);
      const { data: patient } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch(setPatient(patient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patient));
      } catch (e) {
        console.log(e);
      }
    };
    if (!patient || patient.id !== id) {
      fetchPatient();
    }
  });

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntryDetails entry={entry} />;
      case "HealthCheck":
        return <HealtcheckEntryDetails entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntryDetails entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  return (
    <div className="App">
      {patient && diagnosis && (
        <div>
          <h1>{patient.name}</h1>
          <div>Gender: {patient.gender}</div>
          <div>ssn: {patient.ssn}</div>
          <div>occupation: {patient.occupation}</div>
          <div>date of birth: {patient.dateOfBirth}</div>
          <h2>entries</h2>
          {patient.entries !== undefined
            ? patient.entries.map((entry) => (
                <EntryDetails key={entry.id} entry={entry} />
              ))
            : "No entries"}
        </div>
      )}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Patient</Button>
    </div>
  );
};

export default PatientPage;
