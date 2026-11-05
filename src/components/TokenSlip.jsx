import { useContext } from "react";
import { PatientContext } from "../context/PatientContext.js";
import { CLINIC_NAME, SHOW_FEE_ON_SLIP } from "../config";
import { isToday } from "../utils/date";

function TokenSlip() {
  const { patients } = useContext(PatientContext);
  const patient = patients.find((item) => isToday(item.createdAt));

  return (
    <div className="token-slip-card">
      <div className="token-slip-heading">
        <h2>Token Slip</h2>
        <button
          type="button"
          className="print-button"
          onClick={() => window.print()}
          disabled={!patient}
        >
          Print Slip
        </button>
      </div>

      {!patient ? (
        <p className="no-token">No patient registered yet.</p>
      ) : (
        <div className="token-slip">
          <h3>{CLINIC_NAME}</h3>
          <p className="slip-subtitle">Patient Token Slip</p>

          <div className="slip-token-number">{patient.token}</div>

          <div className="slip-details">
            <p>
              <strong>Patient:</strong> {patient.name}
            </p>
            <p>
              <strong>Age:</strong> {patient.age}
            </p>
            <p>
              <strong>Gender:</strong> {patient.gender}
            </p>
            {patient.phone && (
              <p>
                <strong>Phone:</strong> {patient.phone}
              </p>
            )}
            <p>
              <strong>Date:</strong>{" "}
              {new Date(patient.createdAt).toLocaleDateString("en-PK")}
            </p>
            <p>
              <strong>Time:</strong>{" "}
              {new Date(patient.createdAt).toLocaleTimeString("en-PK", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            {SHOW_FEE_ON_SLIP && (
              <p>
                <strong>Fee:</strong> Rs. {patient.fee}
              </p>
            )}
          </div>

          <p className="slip-footer">Thank you for visiting us.</p>
        </div>
      )}
    </div>
  );
}

export default TokenSlip;
