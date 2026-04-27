import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

function ViewOrderDetail() {
  const [orders, setOrders] = useState([]);
  const params = useParams();
  const firebase = useFirebase();

  useEffect(() => {
    firebase.getOrders(params.bookId).then((orders) => setOrders(orders.docs));
  }, []);
  return (
    <div className="container mt-3">
      <h1>Orders</h1>

      {orders.map((order) => {
        const data = order.data();
        return (
          <div
            key={order.id}
            className="mt-5"
            style={{ border: "1px solid", padding: "10px" }}
          >
            <h5>{data.displayName}</h5>
            <h6>{data.qty}</h6>
            <p>{data.email}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ViewOrderDetail;
