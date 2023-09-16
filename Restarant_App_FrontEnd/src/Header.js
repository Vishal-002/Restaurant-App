import React from "react";
import "./Header.css";

function Header({ onMenuClick, isLoggedIn, onLogout }) {
  return (
    <div className="header">
      <div className="logo">Logo</div>
      {isLoggedIn ? (
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
          <div className="menu-item" onClick={onLogout}>
            Logout
          </div>
        </div>
      ) : (
        <div className="auth-buttons">
          <div className="menu-item" onClick={() => onMenuClick("register")}>
            Register
          </div>
          <div className="menu-item" onClick={() => onMenuClick("login")}>
            Login
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
