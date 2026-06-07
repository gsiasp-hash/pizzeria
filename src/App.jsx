import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import Login from "./components/Login";
// import Register from "./components/Register";
import Cart from "./components/Cart";

function App() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      {/* <Home /> */}
      {/* <Login />
      <Register /> */}
      <Cart />
      <Footer />
    </div>
  );
}

export default App;
