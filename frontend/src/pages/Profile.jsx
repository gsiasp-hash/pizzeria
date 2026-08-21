import { useContext } from "react";
import { CircleUserRound } from "lucide-react";
import UserContext from "../contexts/User.context";

export default function Profile() {
  const { user, logout } = useContext(UserContext);

  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center">
      <span className="mb-6 grid size-24 place-items-center rounded-full bg-tomato-100 text-tomato-600">
        <CircleUserRound className="size-12" />
      </span>
      <h1 className="text-3xl font-extrabold tracking-tight text-crust-950 sm:text-4xl">
        Bienvenid@, {user?.email || "Usuario"}
      </h1>
      <p className="mt-2 font-semibold text-crust-500">Este es tu perfil</p>
      <button
        type="button"
        onClick={logout}
        className="mt-8 rounded-full bg-tomato-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-tomato-200 transition-colors hover:bg-tomato-700"
      >
        Cerrar sesión
      </button>
    </main>
  );
}
