import { useState } from "react";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!usuario || !password) {
      alert("Por favor, completa ambos campos");
      return (alert("Por favor, completa ambos campos"));
    }
  };
 

  return (
    <div className="container my-5">
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Escribe tu nombre de ususario"
          onChange={(e) => setUsuario(e.target.value)}
          value={usuario}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Escribe tu contraseña"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>

        <button className="btn btn-primary w-100" type="submit">
          Registrarse
        </button>
      </form>
    </div>
  );
}
