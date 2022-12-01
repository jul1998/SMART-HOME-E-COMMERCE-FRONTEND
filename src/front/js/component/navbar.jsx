import React, {useContext} from "react";
import "../../styles/navbar.css";
import { Link } from "react-router-dom";
import smartHomeImg from "../../img/LOGOTIPO.png";
import { Context } from "../store/appContext";
export const Navbar = () => {


function showToken(){
  if (localStorage.getItem("token")){
    return true

  }else{
    return false
  }
}


  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src={smartHomeImg}
            width="300"
            height="100"
            alt=""
          />
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
              <Link to="/">
                <button className="btn btn-primary">Home</button>
              </Link>
            </li>
            <li className="nav-item">{!showToken()?<Link to="/login">
                <button className="btn btn-primary">Login</button>
              </Link>:null}
            </li>
            <li className="nav-item"> {!showToken()?<Link to="/signup">
                <button className="btn btn-primary">Sign Up</button>
              </Link>:null}
              
            </li>
            <li className="nav-item">
              <Link to="/logout">
                <button className="btn btn-primary">Logout</button>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Carrito
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
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Persona
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/products" className="dropdown-item">
                    Configuracion de la cuenta
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Ayuda y soporte tecnico
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Cerrar sesion
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled">Disabled</a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};
