import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import UserContext from "../contexts/User.context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      document.getElementById("password-error").textContent =
        "Por favor, completa ambos campos";
      return;
    }
    if (password.length < 6) {
      document.getElementById("password-error").textContent =
        "La contraseña debe tener al menos 6 caracteres";
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await login(email, password);
      if (res?.token) {
        alert("Inicio de sesión exitoso");
        setEmail("");
        setPassword("");
        navigate("/");
      } else {
        document.getElementById("password-error").textContent =
          res?.error || "Error al iniciar sesión";
      }
    } catch (err) {
      document.getElementById("password-error").textContent =
        err.message || "Error al iniciar sesión";
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <input
          type="email"
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
        />
        <p id="password-error" className="text-danger text-center"></p>
        <button
          className="btn btn-primary w-100"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
}
