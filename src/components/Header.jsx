import React, { Component } from "react";
import "../assets/css/header.css";

export default class Header extends Component {
  render() {
    return (
      <div className="header d-flex flex-column align-items-center justify-content-center text-white py-5">
        <h1 className="fs-1">¡Pizzería Mamma Mia!</h1>
        <h2 className="fs-5">¡Tenemos las mejores pizzas que podrás encontrar!</h2>
      </div>
    );
  }
}
