import React, { useContext } from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
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
import UserContext, { UserProvider } from "./contexts/User.context";
import { Toaster } from "react-hot-toast";

function RequireAuth({ children }) {
  const { isLoggedIn } = useContext(UserContext);
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const { isLoggedIn } = useContext(UserContext);
  return !isLoggedIn ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <UserProvider>
          <PizzasProvider>
            <TotalProvider>
              <Toaster position="bottom-right" reverseOrder={false} />
              <Navbar />

              <div className="flex-grow-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/register"
                    element={
                      <PublicRoute>
                        <Register />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      <PublicRoute>
                        <Login />
                      </PublicRoute>
                    }
                  />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/pizza/:id" element={<Pizza />} />
                  <Route
                    path="/profile"
                    element={
                      <RequireAuth>
                        <Profile />
                      </RequireAuth>
                    }
                  />
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>

              <Footer />
            </TotalProvider>
          </PizzasProvider>
        </UserProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
