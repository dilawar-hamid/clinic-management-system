import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReceptionLayout from "./layouts/ReceptionLayout";
import Dashboard from "./pages/Dashboard";
import Registration from "./pages/Registration";
import History from "./pages/History";

function App() {
  return (
    <BrowserRouter basename="/clinic-management-system">
      {" "}
      <Routes>
        <Route element={<ReceptionLayout />}>
          <Route path="/" element={<Registration />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/queue" element={<h1>Queue</h1>} />
          <Route path="/settings" element={<h1>Settings</h1>} />
          <Route path="/history" element={<History />} />
        </Route>

        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
