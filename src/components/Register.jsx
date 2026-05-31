import React, { Component } from "react";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert("Por favor, completa ambos campos");
      return;
    } else if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    } else if (passwordConfirm !== password) {
      alert("Las contraseñas no coinciden");
      return;
    } else {
      alert("Registro exitoso");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center">Register</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Escribe tu email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Escribe tu contraseña"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Confirma tu contraseña"
          onChange={(e) => setPasswordConfirm(e.target.value)}
          value={passwordConfirm}
        ></input>
        <button className="btn btn-primary w-100" type="submit">
          Registrarse
        </button>
      </form>
    </div>
  );
}
