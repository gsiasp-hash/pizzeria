import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Pizza from "./pages/Pizza";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { TotalProvider } from "./contexts/Cart.context";
import { PizzasProvider } from "./contexts/Pizzas.context";
import { Toaster } from "react-hot-toast";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <div className="d-flex flex-column min-vh-100">
      <PizzasProvider>
        <TotalProvider>
          <Toaster position="bottom-right" reverseOrder={false} />
          <Navbar />
          <main className="flex-fill">
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/pizza/p001" element={<Pizza />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </TotalProvider>
      </PizzasProvider>
    </div>
  </BrowserRouter>,
);
