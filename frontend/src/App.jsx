import { useContext } from "react";
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
import { PizzasProvider } from "./contexts/Pizzas.provider";
import UserContext, { UserProvider } from "./contexts/User.context";
import { Toaster } from "react-hot-toast";

function AuthChecking() {
  return (
    <div className="flex grow items-center justify-center py-24">
      <div className="size-10 animate-spin rounded-full border-4 border-cream-300 border-t-tomato-600" />
    </div>
  );
}

function RequireAuth({ children }) {
  const { isLoggedIn, isCheckingAuth } = useContext(UserContext);
  if (isCheckingAuth) return <AuthChecking />;
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const { isLoggedIn, isCheckingAuth } = useContext(UserContext);
  if (isCheckingAuth) return null;
  return !isLoggedIn ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <UserProvider>
          <PizzasProvider>
            <TotalProvider>
              <Toaster
                position="bottom-right"
                reverseOrder={false}
                toastOptions={{
                  style: {
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: 700,
                    borderRadius: "1rem",
                    border: "1px solid #fdf1e0",
                  },
                }}
              />
              <Navbar />

              <div className="grow">
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
