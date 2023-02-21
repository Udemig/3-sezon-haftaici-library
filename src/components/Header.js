import React from "react";

import {Link} from "react-router-dom"

const Header = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-secondary">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"} >
          My Library
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active"  to="/list-categories">
                Kategori İşlemleri
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header
