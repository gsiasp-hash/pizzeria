import { useContext } from "react";
import UserContext from "../contexts/User.context";

export default function Profile() {
  const { user, logout } = useContext(UserContext);

  return (
    <div className="container py-5">
      <h1 className="display-3 text-center">Bienvenid@, {user?.email || "Usuario"}</h1>
      <p className="lead text-center">Este es tu perfil</p>
      <button className="btn btn-primary d-block mx-auto" onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  );
}
