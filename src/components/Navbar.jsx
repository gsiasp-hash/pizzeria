import React, { Component } from "react";

export default class Navbar extends Component {
  render() {
    const total = 25000;
    const token = false;
    return (
      <nav class="navbar navbar-expand-lg py-1 bg-dark navbar-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Pizzería Mamma Mia
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Profile
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Logout
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Login
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Register
                </a>
              </li>
            </ul>
            <span class="navbar-text border border-info rounded px-3 py-0 text-white fw-light">
              <i class="fa-solid fa-basket-shopping"></i> Total: ${total.toLocaleString()}
            </span>
          </div>
        </div>
      </nav>
    );
  }
}
