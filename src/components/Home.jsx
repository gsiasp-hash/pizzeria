import React, { Component } from "react";
import Header from "./Header";
import CardPizza from "./CardPizza";
import {pizzas} from "../assets/pizzas";

export default class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="d-flex flex-wrap justify-content-center gap-4 my-5">
          {pizzas.map((pizza) => (
            <CardPizza
              key={pizza.id}
              name={pizza.name}
              price={pizza.price}
              ingredients={pizza.ingredients}
              img={pizza.img}
              desc={pizza.desc}
            />
          ))}
        </div>
      </>
    );
  }
}
