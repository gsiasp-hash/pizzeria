import React, { Component } from "react";

export default class CardPizza extends Component {
  render(props) {
    return (
      <div className="card" style={{ width: "18rem"}}>
        <img
          src={this.props.img}
          className="card-img-top object-fit-cover"
          style={{ height: "180px" }}
          alt={this.props.name}
        />
        <div className="card-body">
          <h5 className="card-title fs-4 text-center">{this.props.name}</h5>
          <hr />
          <div className="h-25">
            <p className="list-group-item d-flex flex-column gap-1 text-center fw-bold">
              Ingredientes:
              <span className="fw-light">
                {this.props.ingredients.join(", ")}
              </span>
            </p>
          </div>
          <hr />
          <div className="h-25">
            <p className="list-group-item fw-bold text-center">
              Precio: ${this.props.price.toLocaleString()}
            </p>

            <div className="d-flex justify-content-around">
              <button type="button" className="btn btn-light">
                Ver más <i className="fa-solid fa-magnifying-glass"></i>
              </button>
              <button type="button" className="btn btn-dark">
                Añadir <i className="fa-solid fa-basket-shopping"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
