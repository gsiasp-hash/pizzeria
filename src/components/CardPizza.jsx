import React, { Component } from "react";

export default class CardPizza extends Component {
  render(props) {
    return (
      <div className="card mt-4" style={{ width: "18rem" }}>
        <img src={this.props.img} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{this.props.name}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{this.props.ingredients.join(", ")}</li>
          <li className="list-group-item">${this.props.price.toLocaleString()}</li>
        </ul>
        <div className="card-body">
          <a href="#" className="card-link">
            Card link
          </a>
          <a href="#" className="card-link">
            Another link
          </a>
        </div>
      </div>
    );
  }
}
