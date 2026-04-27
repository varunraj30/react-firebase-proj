import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap/";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Login user`);
    const result = await firebase.signinUser(email, password);
    console.log(`Success`);
    console.log(result);
  };

  console.log(firebase);

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/");
    }
  }, [firebase, navigate]);

  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <h2 className="mt-5 mb-5">OR</h2>
      <Button onClick={firebase.signinWithGoogl} variant="danger">
        Signin with Google
      </Button>
    </div>
  );
}

export default Login;
