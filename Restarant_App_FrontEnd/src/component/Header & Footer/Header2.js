import React from "react";
import "./Header.css";

function Header({ onMenuClick }) {
  return (
    <div className="header">
      <div className="logo">Logo</div>
      <div className="menu-items">
        <div className="menu-item" onClick={() => onMenuClick("resturant")}>
          Home
        </div>
        <div className="menu-item" onClick={() => onMenuClick("about")}>
          About Us
        </div>
        <div className="menu-item" onClick={() => onMenuClick("contact")}>
          Contact Us
        </div>
        {/* <div className="menu-item">Menu</div> */}
      </div>
      <div className="auth-buttons">
        <div className="auth-button" onClick={() => onMenuClick("register")}>
          Register
        </div>
        <div className="auth-button" onClick={() => onMenuClick("login")}>
          Login
        </div>
        <div className="auth-button" onClick={() => onMenuClick("logout")}>
          Logout
        </div>
      </div>
    </div>
  );
}

export default Header;
