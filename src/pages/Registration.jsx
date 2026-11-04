import RegisterForm from "../components/RegisterForm";
import TokenSlip from "../components/TokenSlip";
import RecentPatientsTable from "../components/RecentPatientsTable";

function Registration() {
  return (
    <div className="registration-page">
      <div className="registration-workspace">
        <RegisterForm />

        <TokenSlip />
      </div>

      <div className="registration-patients">
        <RecentPatientsTable />
      </div>
    </div>
  );
}

export default Registration;