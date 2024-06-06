import "./index.scss";
import { Link } from "react-router-dom";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import logo from "../assets/logo.png";
import { Button } from "antd";

import { AiOutlineShoppingCart } from "react-icons/ai";

function Header() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="header">
      <div className={`header__search ${showSearch === true ? "active" : ""}`}>
        <input type="text" placeholder=" Search movie " />
        <CloseOutlined onClick={() => setShowSearch(false)} />
      </div>

      <div className="header__logo">
        <Link to={""}>
          <img src={logo} alt="" width={180} />
        </Link>
      </div>

      <nav className="header__nav">
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/bridal-page">BRIDAL</Link>
          </li>
          <li>
            <Link to="/diamond-page">DIAMOND</Link>
          </li>
          <li>
            <Link to="/ring-page">RINGS</Link>
          </li>
          <li>
            <Link to="/timepiece-page">TIMEPIECES</Link>
          </li>
          <li>
            <Link to="/designer-page">DESIGNERS</Link>
          </li>
          <li>
            <Link to="/ourstore-page">OUR STORE</Link>
          </li>
        </ul>
      </nav>
      <nav className="header-end">
        <ul>
          <li onClick={() => setShowSearch(true)}>
            <SearchOutlined />
          </li>

          <li className="cart">
            <span>0</span>
            <Link eventkey={2} to="/cart-page">
              <AiOutlineShoppingCart />
            </Link>
          </li>

          <li>
            <a>SIGN UP</a>
            <ul className="login-dropdown">
              <li>
                <Button type="primary">
                  <Link to="/login">Login</Link>
                </Button>
              </li>
              <li>
                <Button type="primary">
                  <Link to="/register-page">Register</Link>
                </Button>
              </li>
              <li></li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
