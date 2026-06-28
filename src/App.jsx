import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router";
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

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-screen">
        <PizzasProvider>
          <TotalProvider>
            <Toaster position="bottom-right" reverseOrder={false} />
            <Navbar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/pizza/p001" element={<Pizza />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer />
          </TotalProvider>
        </PizzasProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
