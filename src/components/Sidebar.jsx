import { NavLink } from "react-router-dom";

function Sidebar({ mobileSidebarOpen, onNavigate }) {
  return (
    <aside className={`sidebar ${mobileSidebarOpen ? "mobile-open" : ""}`}>
      <div className="sidebar-brand">
        <div className="brand-mark" aria-hidden="true">
          N
        </div>
        <h2 className="sidebar-title">
          Noor Jahan <span>Memorial</span>
        </h2>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        <NavLink to="/" end onClick={onNavigate} title="Registration">
          <span className="nav-icon" aria-hidden="true">
            R
          </span>
          <span className="nav-label">Registration</span>
        </NavLink>

        <NavLink to="/dashboard" onClick={onNavigate} title="Dashboard">
          <span className="nav-icon" aria-hidden="true">
            D
          </span>
          <span className="nav-label">Dashboard</span>
        </NavLink>

        <NavLink to="/history" onClick={onNavigate} title="History">
          <span className="nav-icon" aria-hidden="true">
            H
          </span>
          <span className="nav-label">History</span>
        </NavLink>

        <span className="disabled-link" aria-disabled="true">
          <span className="nav-icon" aria-hidden="true">
            Q
          </span>
          <span className="nav-label">
            Queue <small>Coming soon</small>
          </span>
        </span>

        <span className="disabled-link" aria-disabled="true">
          <span className="nav-icon" aria-hidden="true">
            S
          </span>
          <span className="nav-label">
            Settings <small>Coming soon</small>
          </span>
        </span>
      </nav>

      <div className="sidebar-footer">Clinic Management</div>
    </aside>
  );
}

export default Sidebar;
