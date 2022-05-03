import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../Config/Config";
import { useHistory } from "react-router-dom";

export const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // console.log(email, password);
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setSuccessMsg(
          "Login Successfull. You will now automatically get redirected to Home page"
        );
        setEmail("");
        setPassword("");
        setErrorMsg("");
        setTimeout(() => {
          setSuccessMsg("");
          history.push("/");
        }, 1000);
      })
      .catch((error) => setErrorMsg(error.message));
  };

  return (
    <div className="container my-5">
      {successMsg && (
        <>
          <div className="bg-success text-light p-3">{successMsg}</div>
        </>
      )}
      <div className="row no-gutters custRow">
        <div className="col-md-6">
          <div className="loginImg"></div>
        </div>
        <div className="col-md-6">
          <h1>Login</h1>
          <hr></hr>
          <form
            className="form-group"
            autoComplete="off"
            onSubmit={handleLogin}
          >
            <div className="form-group my-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter email"
              />
            </div>
            <div className="form-group my-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <span>
                Don't have an account SignUp<Link to="signup"> Here</Link>
              </span>
              <button type="submit" className="btn btn-primary m-3">
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>

      {errorMsg && (
        <>
          <div className="bg-danger text-light p-3">{errorMsg}</div>
        </>
      )}
    </div>
  );
};
