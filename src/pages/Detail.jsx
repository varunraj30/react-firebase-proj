import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { Button, Form } from "react-bootstrap";

function Detail() {
  const [data, setData] = useState(null);
  const [url, setUrl] = useState(null);
  const [qty, setQty] = useState(1);

  const params = useParams();
  const firebase = useFirebase();

  useEffect(() => {
    firebase.getBookById(params.bookId).then((value) => setData(value.data()));
  }, []);

  useEffect(() => {
    if (data) {
      const imageURL = data.imageURL;
      firebase.getImageURL(imageURL).then((url) => setUrl(url));
    }
  }, [data]);

  if (data == null) {
    return <h1>Loading</h1>;
  }

  const placeOrder = async () => {
    const res = await firebase.placeOrder(params.bookId, qty);
    console.log("Order placed", res);
  };

  return (
    <div className="container mt-5">
      <h1>{data.name}</h1>
      <img src={url} width="50%" style={{ borderRadius: "10px" }} alt="" />
      <h3>Details</h3>
      <p>Price RS.{data.price}</p>
      <p>ISBN Number: {data.isbn}</p>
      <h4>Owner Details</h4>
      {/* <img src={data?.photoURL} alt="" />
       */}
      <p>Owner: {data.displayName ? data.displayName : "Anonymous"}</p>
      <p>Email: {data.email}</p>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Qty</Form.Label>
        <Form.Control
          onChange={(e) => setQty(e.target.value)}
          value={qty}
          type="number"
          placeholder="Enter Qty"
        />
      </Form.Group>
      <Button onClick={placeOrder} variant="success">
        Buy now
      </Button>
    </div>
  );
}

export default Detail;
