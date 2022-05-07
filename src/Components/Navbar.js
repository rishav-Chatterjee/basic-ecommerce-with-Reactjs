import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { auth } from "../Config/Config";
import { useHistory } from "react-router-dom";

export const Navbar = ({ user, totalProducts }) => {
  const history = useHistory();

  const handleLogout = () => {
    auth.signOut().then(() => {
      history.push("/login");
    });
  };

  console.log(user);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-5">
      <Link className="navbar-brand" to="/">
        <abbr title="Dream busket">
          <div className="logoimage"></div>
        </abbr>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {/* <SearchBar></SearchBar> */}
        <ul className="navbar-nav navul-right">
          {!user && (
            <>
              <li className="nav-item active pt-2 px-1">
                <Link className="nav-link" to="signup">
                  SIGN UP
                </Link>
              </li>
              <li className="nav-item pt-2 px-1">
                <Link className="nav-link" to="login">
                  LOGIN
                </Link>
              </li>
            </>
          )}

          {user && (
            <>
              <li className="nav-item pt-2 px-1">
                <Link className="nav-link text-white" to="/">
                  {user}
                </Link>
              </li>
              <li className="nav-item pt-2">
                <Link className="nav-link text-white" to="usercart">
                  <FontAwesomeIcon icon={faShoppingCart} />
                  {totalProducts > 0 && (
                    <span className="cart-indicator">{totalProducts}</span>
                  )}
                </Link>
              </li>
              {user === "admin" ? (
                <li className="nav-item pt-2 px-1">
                  <Link className="nav-link text-white" to="addproduct">
                    {" "}
                    <FontAwesomeIcon icon={faCartPlus} />
                  </Link>
                </li>
              ) : (
                <span className="px-1"></span>
              )}

              <li className="nav-item pt-2 px-1">
                <button className="btn btn-secondary" onClick={handleLogout}>
                  LOGOUT
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
