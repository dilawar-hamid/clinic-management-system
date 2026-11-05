
import { useContext, useState } from "react";
import { PatientContext } from "../context/PatientContext.js";
import StatCard from "../components/StatCard";
import RecentPatientsTable from "../components/RecentPatientsTable";

function getLocalDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function History() {
  const { patients } = useContext(PatientContext);

  const [selectedDate, setSelectedDate] = useState(
    getLocalDateKey(new Date()),
  );

  const [year, month, day] = selectedDate.split("-").map(Number);

  const dailyPatients = patients.filter((patient) => {
    if (!patient.createdAt) return false;

    return (
      getLocalDateKey(new Date(patient.createdAt)) === selectedDate
    );
  });

  const monthlyPatients = patients.filter((patient) => {
    if (!patient.createdAt) return false;

    const date = new Date(patient.createdAt);

    return (
      date.getFullYear() === year &&
      date.getMonth() + 1 === month
    );
  });

  const dailyCollection = dailyPatients.reduce(
    (total, patient) => total + Number(patient.fee || 0),
    0,
  );

  const monthlyCollection = monthlyPatients.reduce(
    (total, patient) => total + Number(patient.fee || 0),
    0,
  );

  const monthName = new Date(year, month - 1, 1).toLocaleDateString(
    "en-PK",
    { month: "long", year: "numeric" },
  );

  return (
    <div className="history-page">
      <div className="dashboard-heading">
        <div className="dashboard-header-row">
          <h1>Patient History</h1>
        </div>
        <p>View daily records and monthly collection.</p>
      </div>

      <div className="history-date-filter">
        <label htmlFor="history-date">Select Date</label>
        <input
          id="history-date"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <h2>Daily Summary</h2>

      <div className="history-stats-grid">
        <StatCard
          title="Total Patients"
          value={dailyPatients.length}
        />
        <StatCard
          title="Recorded Fees"
          value={`Rs. ${dailyCollection.toLocaleString("en-PK")}`}
        />
      </div>

      <h2>Monthly Summary — {monthName}</h2>

      <div className="history-stats-grid">
        <StatCard
          title="Total Patients This Month"
          value={monthlyPatients.length}
        />
        <StatCard
          title="Monthly Recorded Fees"
          value={`Rs. ${monthlyCollection.toLocaleString("en-PK")}`}
        />
      </div>

      <div className="history-patient-records">
        <RecentPatientsTable
          todayOnly={false}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  );
}

export default History;
