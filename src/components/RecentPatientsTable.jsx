import { isToday } from "../utils/date";
import { useContext } from "react";
import { PatientContext } from "../context/PatientContext.js";

function RecentPatientsTable({ todayOnly = true }) {
  const { patients, searchTerm } = useContext(PatientContext);

  const visiblePatients = todayOnly
    ? patients.filter((patient) => isToday(patient.createdAt))
    : patients;

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredPatients = visiblePatients.filter(
    (patient) =>
      String(patient.name || "")
        .toLowerCase()
        .includes(normalizedSearch) ||
      String(patient.token || "")
        .toLowerCase()
        .includes(normalizedSearch),
  );

  return (
    <div className="recent-patients-card">
      <div className="table-heading">
        <h2>{todayOnly ? "Today's Patients" : "Recent Patients"}</h2>
        <span>{filteredPatients.length} Patients</span>
      </div>

      <div className="table-wrapper">
        <table className="patients-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Time</th>
              <th>Fee</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.id}>
                <td className="patient-token">{patient.token}</td>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td>
                  {new Date(patient.createdAt).toLocaleTimeString("en-PK", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td>Rs. {patient.fee}</td>
                <td>
                  <span className="status-badge">{patient.status}</span>
                </td>
              </tr>
            ))}

            {filteredPatients.length === 0 && (
              <tr>
                <td colSpan="7" className="empty-table">
                  No patients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentPatientsTable;
