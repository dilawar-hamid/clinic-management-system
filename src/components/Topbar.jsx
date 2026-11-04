import { useContext } from "react";
import { PatientContext } from "../context/PatientContext.js";

function Topbar({ onMenuClick }) {
  const { searchTerm, setSearchTerm } = useContext(PatientContext);

  const today = new Date().toLocaleDateString("en-PK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="topbar">
      <button
        className="menu-toggle"
        type="button"
        onClick={onMenuClick}
        aria-label="Toggle navigation"
        title="Toggle navigation"
      >
        <span />
        <span />
        <span />
      </button>

      <div className="topbar-search">
        <input
          className="search-input"
          type="search"
          placeholder="Search patients..."
          aria-label="Search patients"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <div className="topbar-info">
        <span className="topbar-date">{today}</span>
        <span className="receptionist-label">Receptionist</span>
      </div>
    </header>
  );
}

export default Topbar;
