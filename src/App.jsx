import { useState } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
