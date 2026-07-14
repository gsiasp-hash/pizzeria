import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import UserContext from "../contexts/User.context";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useContext(UserContext);
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
    if (passwordConfirm !== password) {
      document.getElementById("password-error").textContent =
        "Las contraseñas no coinciden";
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await register(email, password);
      if (res?.token) {
        alert("Registro exitoso");
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
        navigate("/");
      } else {
        alert(res?.error || "Error al registrarse");
      }
    } catch (err) {
      alert(err.message || "Error al registrarse");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center">Register</h2>
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
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Confirma tu contraseña"
          onChange={(e) => setPasswordConfirm(e.target.value)}
          value={passwordConfirm}
        />
        <p id="password-error" className="text-danger text-center"></p>
        <button
          className="btn btn-primary w-100"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
}
