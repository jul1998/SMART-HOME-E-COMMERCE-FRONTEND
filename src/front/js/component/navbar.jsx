import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div classNAme="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src="/workspace/SMART-HOME-E-COMMERCE-FRONTEND/docs/assets/LOGOTIPO-TECHLIGHT-ATODOCOLOR-PNG.png"
            width="30"
            height="30"
            alt=""
          />
        </a>
      </div>
      <div className="d-grid gap-2 d-md-block">
        <button class="btn border-secondary" type="button">
          <i class="fa-regular fa-user"></i>
        </button>
        <button class="btn border-secondary" type="button">
          <i class="fa-duotone fa-cart-shopping"></i>
        </button>
      </div>
    </nav>
  );
};
