import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      <Home />
      <Login />
      <Register />
      <Footer />
    </div>
  );
}

export default App;
