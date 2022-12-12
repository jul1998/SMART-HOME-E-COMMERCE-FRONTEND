import React, { useContext } from "react";
import "../../styles/navbar.css";
import { Link } from "react-router-dom";
import smartHomeImg from "../../img/LOGOTIPO.png";
import { Context } from "../store/appContext";
import { Total } from "./Productos/Comprar.jsx";

export const Navbar = () => {

  const { store, actions } = useContext(Context);
  let isToken = actions.showToken() //If token exists, then signup button will not be available
  //else it will appear in navbar

  return (
    <nav className="navbar navbar-expand-lg bg-dark" id="navbarcontent1">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src={smartHomeImg} width="350" height="100" alt="" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {" "}
              {!isToken ? (
                <Link to="/signup">
                  <button className="btn btn-primary">Sign Up</button>
                </Link>
              ) : null}
            </li>

          </ul>

          <ul className="d-flex nav-item" id="dropdowns">
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
                  <Link to="/login" className="dropdown-item" onClick={() => {
                    let response = actions.carritoCompras()
                  }}>
                    Login
                  </Link>
                  <Total />
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link to="/userProfile/:theid/settings" className="dropdown-item">
                    Configuracion
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link to="/logout" className="dropdown-item">
                    Logout
                  </Link>
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
                  <Link to="/products" className="dropdown-item">
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
                    Eliminar carrito
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />

          </form>
        </div>
      </div>
    </nav>
  );
};
