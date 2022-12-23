import React, { useContext, useState } from "react";
import "../../styles/navbar.css";
import { Link } from "react-router-dom";
import smartHomeImg from "../../img/LOGOTIPO.png";
import { Context } from "../store/appContext";
import ShoppingCartIcon from "./ProductComp/ShoppingCartComp.jsx";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  let isToken = actions.showToken(); //If token exists, then signup button will not be available
  //else it will appear in navbar
  let userId = localStorage.getItem("user_id")


  return (
    <nav className="navbar navbar-expand-lg bg-dark" id="navbarcontent1">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={smartHomeImg} width="350" height="100" alt="" />
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <Link to="/products/filtered"><button type="button" class="btn btn-info">Search product </button></Link>

          </ul>
          <li className="nav-item-signUp">
            {!isToken ? (
              <Link to="/signup">
                <button className="button">Sign Up</button>
              </Link>
            ) : null}
          </li>
          <ul className="btn-group dropstart" id="dropdowns">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="far fa-user nav-item"></i>
              </a>
              <ul className="dropdown-menu">
                <li>
                  {!isToken ? (
                    <Link to="/login" className="dropdown-item">
                      Login
                    </Link>
                  ) : (
                    <Link
                      to={`/userProfile/${userId}/settings`}
                      className="dropdown-item"
                    >
                      Settings
                    </Link>

                  )}

                  <hr className="dropdown-divider" />

                  <li>
                    {isToken ? (
                      <Link
                        to={`/userProfile/${userId}`}
                        className="dropdown-item"
                      >
                        Account
                      </Link>
                    ) : null}

                  </li>
                </li>
                {!isToken ? null : <hr className="dropdown-divider" />}

                <li>
                  {!isToken ? null : (
                    <Link to="/logout" className="dropdown-item">
                      <p className="logout-txt">Logout0</p>
                    </Link>
                  )}
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-shopping-cart"></i>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link to={`/user/${userId}/carritoCompras`} className="dropdown-item">
                    Productos
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Delete cart
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
