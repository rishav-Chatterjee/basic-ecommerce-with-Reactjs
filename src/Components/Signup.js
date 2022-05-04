import React, { useState } from "react";
import { auth, fs } from "../Config/Config";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export const Signup = () => {
  const history = useHistory();

  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    // console.log(fullName, email, password);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((credentials) => {
        console.log(credentials);
        fs.collection("users")
          .doc(credentials.user.uid)
          .set({
            FullName: fullName,
            Email: email,
            Password: password,
          })
          .then(() => {
            setSuccessMsg(
              "Signup Successfull. You will now automatically get redirected to Login"
            );
            setFullname("");
            setEmail("");
            setPassword("");
            setErrorMsg("");
            setTimeout(() => {
              setSuccessMsg("");
              history.push("/login");
            }, 3000);
          })
          .catch((error) => setErrorMsg(error.message));
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  return (
    <div className="registerImg">
      {successMsg && (
        <>
          <div className="bg-success text-light p-3">{successMsg}</div>
        </>
      )}
      <div className="custwidth">
        <h1>Sign Up</h1>
        <hr></hr>
        <form
          className="form-group mx-auto"
          autoComplete="off"
          onSubmit={handleSignup}
        >
          <div className="form-group my-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control"
              required
              onChange={(e) => setFullname(e.target.value)}
              value={fullName}
              placeholder="Enter name"
            />
          </div>
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
          <div className="form-group">
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
              Already have an account Login{" "}
              <Link to="login" className="link">
                {" "}
                Here
              </Link>
            </span>
            <button type="submit" className="btn btn-primary m-3">
              SIGN UP
            </button>
          </div>
        </form>
      </div>
      {errorMsg && (
        <>
          <br></br>
          <div className="bg-danger text-light p-3">{errorMsg}</div>
        </>
      )}
    </div>
  );
};
