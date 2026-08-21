import { useState, useContext } from "react";
import { NavLink } from "react-router";
import { LogOut, Menu, Pizza, ShoppingBasket, X } from "lucide-react";
import { TotalContext } from "../contexts/Cart.context";
import UserContext from "../contexts/User.context";

export default function Navbar() {
  const { isLoggedIn, logout } = useContext(UserContext);
  const { total } = useContext(TotalContext);
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const linkClass = ({ isActive }) =>
    `block rounded-full px-4 py-2 text-sm font-bold transition-colors ${
      isActive
        ? "bg-tomato-600 text-white"
        : "text-crust-700 hover:bg-cream-200 hover:text-tomato-700"
    }`;

  const navLinks = (
    <>
      <NavLink to="/" className={linkClass} onClick={closeMenu}>
        Inicio
      </NavLink>
      {isLoggedIn && (
        <NavLink to="/profile" className={linkClass} onClick={closeMenu}>
          Perfil
        </NavLink>
      )}
      {isLoggedIn && (
        <button
          type="button"
          onClick={() => {
            closeMenu();
            logout();
          }}
          className="flex w-full items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-crust-700 transition-colors hover:bg-cream-200 hover:text-tomato-700"
        >
          <LogOut className="size-4" /> Cerrar sesión
        </button>
      )}
      {!isLoggedIn && (
        <NavLink to="/login" className={linkClass} onClick={closeMenu}>
          Iniciar sesión
        </NavLink>
      )}
      {!isLoggedIn && (
        <NavLink to="/register" className={linkClass} onClick={closeMenu}>
          Registrarse
        </NavLink>
      )}
    </>
  );

  const cartBadge = (
    <NavLink
      to="/cart"
      onClick={closeMenu}
      className="flex items-center gap-2 rounded-full bg-tomato-600 px-4 py-2 text-sm font-bold text-white shadow-sm shadow-tomato-200 transition-colors hover:bg-tomato-700"
    >
      <ShoppingBasket className="size-4" />
      Total: ${total.toLocaleString()}
    </NavLink>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-cream-200 bg-cream-50/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="grid size-10 place-items-center rounded-full bg-tomato-600 text-white shadow-md shadow-tomato-200">
            <Pizza className="size-5" />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-crust-950 sm:text-xl">
            Pizzería Mamma Mia
          </span>
        </NavLink>

        <div className="hidden items-center gap-1 lg:flex">{navLinks}</div>

        <div className="hidden lg:block">{cartBadge}</div>

        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
          className="grid size-10 place-items-center rounded-full border border-cream-300 bg-white text-crust-800 transition-colors hover:bg-cream-100 lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-cream-200 bg-cream-50 px-4 pb-4 pt-2 lg:hidden">
          <div className="flex flex-col items-stretch gap-1">{navLinks}</div>
          <div className="mt-3 flex justify-center">{cartBadge}</div>
        </div>
      )}
    </header>
  );
}
