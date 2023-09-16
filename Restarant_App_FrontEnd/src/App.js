import React, { useState } from "react";
import Resturant from "./component/Basics/Resturant";
import Header from "./Header";
import Footer from "./component/Header & Footer/Footer";
import About from "./component/Header & Footer/About us & Contact us/About";
import Contact from "./component/Header & Footer/About us & Contact us/Contact";
import Register from "./component/Header & Footer/Register & Login/Register";
import Login from "./component/Header & Footer/Register & Login/Login";
import "./App.css";

const App = () => {
  const [activeComponent, setActiveComponent] = useState("register");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usertype, setUserType] = useState("customer");

  const handleMenuClick = (menu) => {
    setActiveComponent(menu);
    console.log("CLICKED FROM HEADER");
    console.log(menu);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveComponent("register");
  };

  const handleRegisterSuccess = (userType) => {
    setIsLoggedIn(true);
    setUserType(userType);
    setActiveComponent("resturant");
  };

  const handleLoginSuccess = (userType) => {
    setIsLoggedIn(true);
    setUserType(userType);
    setActiveComponent("resturant");
  };

  return (
    <div className="app-container">
      <Header
        onMenuClick={handleMenuClick}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      <div className="content">
        {activeComponent === "resturant" && <Resturant userType={usertype} />}
        {activeComponent === "about" && <About />}
        {activeComponent === "contact" && <Contact />}
        {activeComponent === "register" && (
          <Register onSuccess={handleRegisterSuccess} />
        )}
        {activeComponent === "login" && (
          <Login onSuccess={handleLoginSuccess} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
