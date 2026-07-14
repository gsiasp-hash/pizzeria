import React, { Component } from "react";
import {useContext} from "react";
import UserContext from "../contexts/User.context";

export default function Profile() {
  const { email, setIsLoggedIn } = useContext(UserContext);

  return (
    <div className="container py-5">
      <h1 className="display-3 text-center">Bienvenid@, {email}</h1>
      <p className="lead text-center">Este es tu perfil</p>
      <button className="btn btn-primary d-block mx-auto"
      onClick={() => setIsLoggedIn(false)}>Cerrar sesión</button>
    </div>
  );
}
