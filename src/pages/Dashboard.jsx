import StatCard from "../components/StatCard";
import { useContext } from "react";
import { PatientContext } from "../context/PatientContext.js";

import RecentPatientsTable from "../components/RecentPatientsTable";
import { isToday } from "../utils/date";

function Dashboard() {
  const { patients, resetDemo } = useContext(PatientContext);
  const todayPatients = patients.filter((patient) =>
    isToday(patient.createdAt),
  );
  const totalPatients = todayPatients.length;

  const todayCollection = todayPatients.reduce(
    (total, patient) => total + Number(patient.fee),
    0,
  );

  const lastRegistered = todayPatients[0]?.name || "—";
  
  return (
    <div className="dashboard">
      <div className="dashboard-heading">
        <div className="dashboard-header-row">
          <h1>Dashboard</h1>

          <div className="dashboard-actions">
            <span className="demo-label">DEMO DATA</span>

            <button
              className="reset-demo-button"
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to reset demo data?")
                ) {
                  resetDemo();
                }
              }}
            >
              Reset Demo
            </button>
          </div>
        </div>

        <p>Welcome back! Here's your clinic overview for today.</p>
      </div>

      <div className="stats-grid">
        <StatCard title="Total Patients Today" value={totalPatients} />
        <StatCard
          title="Today's Collection"
          value={`Rs. ${todayCollection.toLocaleString("en-PK")}`}
        />
        <StatCard title="Latest Token" value={todayPatients[0]?.token || "—"} />
        <StatCard title="Last Registered" value={lastRegistered} />
      </div>

      <div className="dashboard-content">
        <RecentPatientsTable todayOnly={false} />
      </div>
    </div>
  );
}

export default Dashboard;
