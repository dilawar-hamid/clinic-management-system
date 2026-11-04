import { useEffect, useState } from "react";
import { PatientContext } from "./PatientContext";
import { STORAGE_KEY } from "../config";

function readStoredPatients() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function PatientProvider({ children }) {
  const [patients, setPatients] = useState(readStoredPatients);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
    } catch (error) {
      console.error("Unable to save clinic data in this browser.", error);
    }
  }, [patients]);

  function addPatient(patient) {
    setPatients((current) => [patient, ...current]);
  }

  function resetDemo() {
    setPatients([]);
  }

  return (
    <PatientContext.Provider
      value={{ patients, searchTerm, setSearchTerm, addPatient, resetDemo }}
    >
      {children}
    </PatientContext.Provider>
  );
}
