import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Vehicle Service Management System</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">

            <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>

            <li className="nav-item">
                <Link className="nav-link" to="/component-details">Component Registration</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/vichecal">Vichel</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/issue-details">Issue</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/payment">Payment</Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
