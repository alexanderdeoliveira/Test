import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

import request from "../../services/request";

import { Form, Container } from "./styles";

const SignUp = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async e => {
    e.preventDefault();

    await request.post("/api/v1/user", { name, email, password })
      .then(() => props.history.push("/"))
      .catch(() => {
        setPassword('');
        setError("There was an error registering your account. Try again!")
      });
  };

  return (
    <Container>
      <Form onSubmit={handleSignUp}>
        {error && <p>{error}</p>}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

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

        <button type="submit">Register</button>

        <hr />

        <Link to="/">Sign In</Link>
      </Form>
    </Container>
  );
}

export default withRouter(SignUp);
