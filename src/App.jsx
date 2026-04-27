import { useState } from "react";
import Button from "react-bootstrap/Button";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyList from "./pages/MyList";
import MyNav from "./components/Navbar";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import ViewOrders from "./pages/ViewOrders";
import ViewOrderDetail from "./pages/ViewOrderDetail";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <MyNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book/list" element={<MyList />} />
        <Route path="/book/view/:bookId" element={<Detail />} />
        <Route path="/book/orders" element={<ViewOrders />} />
        <Route path="/books/orders/:bookId" element={<ViewOrderDetail />} />
      </Routes>
    </div>
  );
}

export default App;
