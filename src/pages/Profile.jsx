import React, { Component } from "react";

export default class Profile extends Component {
  render() {
    return (
      <div className="container py-5">
        <h1 className="display-3 text-center">
          Bienvenid@, danniella@gmail.com
        </h1>
        <p className="lead text-center">Este es tu perfil</p>
        <button className="btn btn-primary d-block mx-auto">
          Cerrar sesión
        </button>
      </div>
    );
  }
}
