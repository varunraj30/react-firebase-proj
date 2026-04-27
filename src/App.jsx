import { useState } from "react";
import Button from "react-bootstrap/Button";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyList from "./pages/MyList";
import MyNav from "./components/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <MyNav />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book/list" element={<MyList />} />
      </Routes>
    </div>
  );
}

export default App;
