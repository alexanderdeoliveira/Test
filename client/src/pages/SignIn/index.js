import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

import request from "../../services/request";
import { login } from "../../services/auth";

import { Form, Container } from "./styles";

const SignIn = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();

    await request.post("/api/v1/auth", { email, password })
      .then((res) => {
        login(res.data);
        props.history.push("/");
      })
      .catch((err) => {
        setPassword('');
        setError("There was a problem with the login, check your credentials.")
      });
  };

  return (
    <Container>
      <Form onSubmit={handleSignIn}>
        {error && <p>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <hr />

        <Link to="/signup">Sign Up</Link>
      </Form>
    </Container>
  );
}

export default withRouter(SignIn);
