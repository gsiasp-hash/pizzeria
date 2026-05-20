import React, { Component } from "react";
import "../assets/css/header.css";

export default class Header extends Component {
  render() {
    return (
      <div className="header d-flex flex-column align-items-center justify-content-center text-white py-5 w-100 h-100">
        <h1 className="fs-2 pt-5">¡Pizzería Mamma Mia!</h1>
        <h2 className="text-sm fs-5 fw-light">
          ¡Tenemos las mejores pizzas que podrás encontrar!
        </h2>
        <hr className="w-75 pb-5" />
      </div>
    );
  }
}
