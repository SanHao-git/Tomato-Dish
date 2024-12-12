import React, { useState, useContext, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const { getTotalCartAmount, token, setToken, navbar, setNavbar } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  useEffect(() => {
    if (location.pathname === "/cart") {
      setNavbar("Cart");
    } else if (location.pathname === "/myorders") {
      setNavbar("Order");
    } else {
      setNavbar("Home");
    }
  }, [location.pathname]);

  return (
    <div className="navbar">
      <Link to="/" onClick={() => setNavbar("Home")}>
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      {navbar === "Home" && (
        <ul className="navbar-menu">
          <a
            href="#header"
            onClick={() => setMenu("Home")}
            className={menu === "Home" ? "active" : ""}
          >
            Home
          </a>
          <a
            href="#explore-menu"
            onClick={() => setMenu("Menu")}
            className={menu === "Menu" ? "active" : ""}
          >
            Menu
          </a>
          <a
            href="#app-download"
            onClick={() => setMenu("Mobile app")}
            className={menu === "Mobile app" ? "active" : ""}
          >
            Mobile app
          </a>
          <a
            href="#footer"
            onClick={() => setMenu("Contact us")}
            className={menu === "Contact us" ? "active" : ""}
          >
            Contact us
          </a>
        </ul>
      )}

      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart" onClick={() => setNavbar("Cart")}>
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li
                onClick={() => {
                  navigate("/myorders");
                  setNavbar("Order");
                }}
              >
                <img src={assets.bag_icon} alt="" />
                Orders
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
