import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Container, Form, Input, Spinner } from "reactstrap";
import { signIn } from "../store/actions/authActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading } = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      signIn(
        { email, password },
        () => {
          setEmail("");
          setPassword("");
        },
        (message) => {
          console.log("On error called", message);
          if (message) {
            setErrorMessage(message);
            setTimeout(() => {
              setErrorMessage("");
            }, 3000);
          }
        }
      )
    );
  };
  return (
    <Container>
      <Card className="ms-welcome__card px-3 py-4 mt-3 login-card">
        <Form onSubmit={handleSubmit}>
          <h2 className="ms-welcome__card-heading text-center mb-2 ">Welcome</h2>
          <h2 className="link-label ms-font-xl ms-fontWeight-semilight ms-fontColor-neutralPrimary ms-u-slideUpIn20">
            Email/Username*
          </h2>
          <Input
            placeholder="email/username"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errorMessage != "") {
                setErrorMessage("");
              }
            }}
            required
          />
          <h2 className="link-label mt-2 ms-font-xl ms-fontWeight-semilight ms-fontColor-neutralPrimary ms-u-slideUpIn20">
            Password*
          </h2>
          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errorMessage != "") {
                setErrorMessage("");
              }
            }}
            required
          />
          {errorMessage != "" && <p className="mt-3 text-danger text-small text-center">{errorMessage}</p>}

          <div className="ms-welcome__main d-flex justify-content-center align-items-center mt-3">
            <button type="submit" className="custom-btn" disabled={loading}>
              {loading ? <Spinner className="custom-spinner" size="sm" /> : "Login"}
            </button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
