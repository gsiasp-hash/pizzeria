import React, { Component } from "react";
import Header from "./Header";
import CardPizza from "./CardPizza";
import napolitana from "../assets/img/napolitana.jpg";
import española from "../assets/img/española.jpg";
import pepperoni from "../assets/img/pepperoni.jpg";

export default class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="d-flex flex-wrap justify-content-center gap-4 my-5">
          <CardPizza
            name="Napolitana"
            price={5950}
            ingredients={["mozzarella", "tomates", "jamón", "orégano"]}
            img={napolitana}
          />
          <CardPizza
            name="Española"
            price={6950}
            ingredients={["mozzarella", "gorgonzola", "parmesano", "provolone"]}
            img={española}
          />
          <CardPizza
            name="Pepperoni"
            price={6950}
            ingredients={["mozzarella", "pepperoni", "orégano"]}
            img={pepperoni}
          />
        </div>
      </>
    );
  }
}
