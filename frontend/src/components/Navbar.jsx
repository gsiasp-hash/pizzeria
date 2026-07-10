import React, { Component } from "react";
import { NavLink } from "react-router";
import { useContext } from "react";
import { TotalContext } from "../contexts/Cart.context";
import UserContext from "../contexts/User.context";

export default function Navbar() {
  const { isLoggedIn, logout } = useContext(UserContext);
  const { total } = useContext(TotalContext);
  return (
    <nav className="navbar navbar-expand-lg py-1 bg-dark navbar-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Pizzería Mamma Mia
        </NavLink>
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
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  Profile
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/"
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                  }}
                >
                  Logout
                </NavLink>
              </li>
            )}
            {!isLoggedIn && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
            )}
            {!isLoggedIn && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            )}
          </ul>
          <NavLink className="nav-link" to="/cart">
            <span className="navbar-text border border-info rounded px-3 py-0 text-white fw-light btn">
              <i className="fa-solid fa-basket-shopping"></i> Total: $
              {total.toLocaleString()}
            </span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
