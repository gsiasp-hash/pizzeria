import React, { Component } from "react";
import { TotalContext } from "../contexts/Cart.context";

export default function CardPizza({ name, price, ingredients, img, desc, id }) {
  const { addToCart } = React.useContext(TotalContext);

  return (
    <div className="card" style={{ width: "20rem", height: "100%" }}>
      <img
          src={img}
          className="card-img-top object-fit-cover"
          style={{ height: "180px" }}
          alt={name}
        />
        <div className="card-body">
          <h5 className="card-title fs-4 text-center">{name}</h5>
          <hr />
          <p className=" d-flex flex-column gap-1 text-center fw-bold">
            Ingredientes:
            <ul className="list-group list-group-flush">
              <span className="fw-light">
                {ingredients.map((ingredient) => (
                  <li className="list-group-item" key={ingredient}>
                    {ingredient}
                  </li>
                ))}
              </span>
            </ul>
          </p>

          <p className=" d-flex flex-column gap-1 text-center fw-bold">
            Descripción:
            <span className="fw-light">{desc}</span>
          </p>
        </div>

        <hr />
        <div className="card-body d-flex flex-column gap-3">
          <p className="list-group-item fw-bold text-center">
            Precio: ${price.toLocaleString()}
          </p>

          <div className="d-flex justify-content-around">
            <button type="button" className="btn btn-light" >
              Ver más <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <button type="button" className="btn btn-dark" onClick={() => addToCart(id)}>
              Añadir <i className="fa-solid fa-basket-shopping"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }

