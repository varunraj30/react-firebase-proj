import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

function MyCard(props) {
  const navigate = useNavigate();
  const [url, setUrl] = useState(null);

  const firebase = useFirebase();
  useEffect(() => {
    firebase.getImageURL(props.imageURL).then((url) => setUrl(url));
  }, []);

  return (
    <Card style={{ width: "18rem", margin: "15px" }}>
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          This book has a title {props.name} and this book is sold by{" "}
          {props.displayName ? props.displayName : "Anonymous"} and this book
          cost {props.price}rs
        </Card.Text>
        <Button onClick={(e) => navigate(props.link)} variant="primary">
          View
        </Button>
      </Card.Body>
    </Card>
  );
}

export default MyCard;
