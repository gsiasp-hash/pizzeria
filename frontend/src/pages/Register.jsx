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
      if (res?.email) {
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
    <main className="mx-auto w-full max-w-md px-4 py-16">
      <div className="rounded-3xl border border-cream-200 bg-white p-8 shadow-xl shadow-cheese-100">
        <h2 className="mb-6 text-center text-2xl font-extrabold tracking-tight text-crust-950">
          Crear cuenta
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Escribe tu email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full rounded-xl border border-crust-200 bg-cream-50 px-4 py-3 text-sm font-semibold text-crust-950 outline-none transition placeholder:font-normal placeholder:text-crust-400 focus:border-tomato-500 focus:ring-2 focus:ring-tomato-200"
          />
          <input
            type="password"
            placeholder="Escribe tu contraseña"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full rounded-xl border border-crust-200 bg-cream-50 px-4 py-3 text-sm font-semibold text-crust-950 outline-none transition placeholder:font-normal placeholder:text-crust-400 focus:border-tomato-500 focus:ring-2 focus:ring-tomato-200"
          />
          <input
            type="password"
            placeholder="Confirma tu contraseña"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
            className="w-full rounded-xl border border-crust-200 bg-cream-50 px-4 py-3 text-sm font-semibold text-crust-950 outline-none transition placeholder:font-normal placeholder:text-crust-400 focus:border-tomato-500 focus:ring-2 focus:ring-tomato-200"
          />
          <p id="password-error" className="text-center text-sm font-bold text-tomato-600"></p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-tomato-600 py-3 text-sm font-bold text-white shadow-md shadow-tomato-200 transition-colors hover:bg-tomato-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Enviando..." : "Registrarse"}
          </button>
        </form>
      </div>
    </main>
  );
}
