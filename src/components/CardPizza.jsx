import React, { Component } from "react";

export default class CardPizza extends Component {
  render(props) {
    return (
      <div className="card mt-4" style={{ width: "18rem" }}>
        <img src={this.props.img} className="card-img-top h-50" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{this.props.name}</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex flex-column text-center fw-bold">
              Ingredientes:
              <span className="fw-light">
                {this.props.ingredients.join(", ")}
              </span>
            </li>
            <li className="list-group-item fw-bold text-center">
              ${this.props.price.toLocaleString()}
            </li>
          </ul>
          <div className="d-flex justify-content-around">
            <button type="button" class="btn btn-dark">
              Ver más
            </button>
            <button type="button" class="btn btn-dark">
              Añadir
            </button>
          </div>
        </div>
      </div>
    );
  }
}
