import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert("Por favor, completa ambos campos");
      return;
    }
    else if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    else {
      alert("Inicio de sesión exitoso");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center">Login</h2>
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

        <button className="btn btn-primary w-100" type="submit">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
