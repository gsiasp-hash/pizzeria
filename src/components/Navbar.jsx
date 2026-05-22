import React, { Component } from "react";

export default class Navbar extends Component {
  render() {
    const total = 25000;
    const token = false;
    return (
      <nav className="navbar navbar-expand-lg py-1 bg-dark navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Pizzería Mamma Mia
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              {token && (
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Profile
                  </a>
                </li>
              )}
              {token && (
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Logout
                  </a>
                </li>
              )}
              {!token && (
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Login
                  </a>
                </li>
              )}
              {!token && (
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Register
                  </a>
                </li>
              )}
            </ul>

            <span className="navbar-text border border-info rounded px-3 py-0 text-white fw-light btn">
              <i className="fa-solid fa-basket-shopping"></i> Total: $
              {total.toLocaleString()}
            </span>
          </div>
        </div>
      </nav>
    );
  }
}
